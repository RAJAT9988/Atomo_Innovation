import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Hls from "hls.js";

type Walker = {
  group: THREE.Group;
  waypoints: { x: number; z: number }[];
  progress: number;
  speed: number;
};

type CamInfo = { id: string; label: string };

const DigitalTwin = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeCam, setActiveCam] = useState<CamInfo | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const webrtcReaderRef = useRef<{ close: () => void } | null>(null);

  const streamUrls = useMemo<Record<string, string>>(
    () => ({
      // Match the original HTML mapping. You can replace these with your real URLs.
      manager_office_front: "/asdf.mp4",
      manager_office_back: "/1.mp4",

      GODOWN_1_front_top_left: "",
      GODOWN_1_front_top_right: "",
      GODOWN_1_front_left_shelter: "",
      GODOWN_1_front_right_shelter: "",
      GODOWN_1_back_left: "",
      GODOWN_1_back_center: "",
      GODOWN_1_back_right: "",

      GODOWN_2_front_top_left: "",
      GODOWN_2_front_top_right: "",
      GODOWN_2_front_left_shelter: "",
      GODOWN_2_front_right_shelter: "",
      GODOWN_2_back_left: "",
      GODOWN_2_back_center: "",
      GODOWN_2_back_right: "",

      GODOWN_3_front_top_left: "/person.mp4",
      GODOWN_3_front_top_right: "",
      GODOWN_3_front_left_shelter: "/sack.mp4",
      GODOWN_3_front_right_shelter: "/cow.mp4",
      GODOWN_3_back_left: "",
      GODOWN_3_back_center: "",
      GODOWN_3_back_right: "",
    }),
    [],
  );

  const cleanupPlayback = () => {
    const videoEl = videoRef.current;
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (webrtcReaderRef.current) {
      webrtcReaderRef.current.close();
      webrtcReaderRef.current = null;
    }
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute("src");
      // @ts-expect-error: srcObject exists in browsers
      videoEl.srcObject = null;
      videoEl.load();
    }
  };

  const ensureMediaMtxReader = async () => {
    if ((window as any).MediaMTXWebRTCReader) return;
    await new Promise<void>((resolve) => {
      const existing = document.querySelector('script[data-mediamtx-reader="true"]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => resolve(), { once: true });
        return;
      }
      const s = document.createElement("script");
      s.src = "/digital-twin/mediamtx-reader.js";
      s.async = true;
      s.dataset.mediamtxReader = "true";
      s.addEventListener("load", () => resolve(), { once: true });
      s.addEventListener("error", () => resolve(), { once: true });
      document.head.appendChild(s);
    });
  };

  const playUrlInPopup = async (url: string) => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    cleanupPlayback();

    const trimmed = (url || "").trim();
    if (!trimmed) return;

    // WebRTC (MediaMTX WHEP)
    if (trimmed.includes("/whep")) {
      await ensureMediaMtxReader();
      const Reader = (window as any).MediaMTXWebRTCReader;
      if (!Reader) {
        throw new Error("WebRTC reader not available. Place a real MediaMTX reader at public/digital-twin/mediamtx-reader.js");
      }
      webrtcReaderRef.current = new Reader({
        url: trimmed,
        onError: (err: any) => {
          setError(`WebRTC error: ${String(err)}`);
        },
        onTrack: (evt: any) => {
          setError(null);
          // @ts-expect-error: srcObject exists in browsers
          videoEl.srcObject = evt.streams[0];
          videoEl.play().catch(() => {});
        },
      });
      return;
    }

    // HLS (.m3u8)
    if (trimmed.includes(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 0.5,
          maxMaxBufferLength: 1,
          liveSyncDuration: 0.5,
          liveMaxLatencyDuration: 1,
        });
        hlsRef.current = hls;
        hls.loadSource(trimmed);
        hls.attachMedia(videoEl);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoEl.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data?.fatal) setError(`Stream error: ${data.details || "Unknown"}`);
        });
        return;
      }

      // Safari native HLS
      videoEl.src = trimmed;
      videoEl.play().catch(() => {});
      return;
    }

    // Regular MP4/WEBM/etc
    videoEl.src = trimmed;
    videoEl.play().catch(() => {});
  };

  const openCameraPopup = async (cam: CamInfo) => {
    setActiveCam(cam);
    setPopupOpen(true);
    setError(null);
  };

  const closeCameraPopup = () => {
    setPopupOpen(false);
    setActiveCam(null);
    setError(null);
    cleanupPlayback();
  };

  // Start/refresh playback only after popup + <video> are mounted
  useEffect(() => {
    if (!popupOpen || !activeCam) return;
    const url = (streamUrls[activeCam.id] || "").trim();
    if (!url) return;
    let cancelled = false;
    (async () => {
      try {
        await playUrlInPopup(url);
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [popupOpen, activeCam, streamUrls]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let animationId = 0;

    // Scene
    const scene = new THREE.Scene();

    // Background gradient
    const skyCanvas = document.createElement("canvas");
    skyCanvas.width = 2;
    skyCanvas.height = 256;
    const skyCtx = skyCanvas.getContext("2d");
    if (skyCtx) {
      const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 256);
      skyGrad.addColorStop(0, "#4A90D9");
      skyGrad.addColorStop(0.5, "#7EB8E8");
      skyGrad.addColorStop(0.85, "#B8D4EC");
      skyGrad.addColorStop(1, "#D4E4F0");
      skyCtx.fillStyle = skyGrad;
      skyCtx.fillRect(0, 0, 2, 256);
      const skyTexture = new THREE.CanvasTexture(skyCanvas);
      skyTexture.magFilter = THREE.LinearFilter;
      skyTexture.minFilter = THREE.LinearFilter;
      scene.background = skyTexture;
      scene.fog = new THREE.Fog(0xb8d4ec, 120, 360);
    }

    // Camera + renderer
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 50, 80);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(50, 80, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(600, 400);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x5a6258, roughness: 0.92, metalness: 0.03 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, 0, 15);
    ground.receiveShadow = true;
    scene.add(ground);

    const baseFloorGeometry = new THREE.PlaneGeometry(180, 90);
    const baseFloorMaterial = new THREE.MeshStandardMaterial({ color: 0x6b7268, transparent: true, opacity: 0.96, roughness: 0.9, metalness: 0.02 });
    const baseFloor = new THREE.Mesh(baseFloorGeometry, baseFloorMaterial);
    baseFloor.rotation.x = -Math.PI / 2;
    baseFloor.position.set(0, 0.01, 15);
    baseFloor.receiveShadow = true;
    scene.add(baseFloor);

    const createLabelSprite = (text: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true }));
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 128, 32);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText(text, 128, 32);
      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(12, 3, 1);
      return sprite;
    };

    const createCameraLabelSprite = (text: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 96;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true }));
      ctx.clearRect(0, 0, 640, 96);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 320, 48);
      const tex = new THREE.CanvasTexture(canvas);
      tex.premultiplyAlpha = false;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(10, 1.5, 1);
      return sprite;
    };

    // Camera model template
    let cameraModelTemplate: THREE.Object3D | null = null;
    const clickableCameras: THREE.Object3D[] = [];

    const createCameraMesh = () => {
      if (!cameraModelTemplate) return new THREE.Group();
      const g = cameraModelTemplate.clone(true);
      g.traverse((o) => {
        const mesh = o as THREE.Mesh;
        const mat = (mesh as any).material as THREE.Material | THREE.Material[] | undefined;
        if ((mesh as any).isMesh && mat) {
          if (Array.isArray(mat)) {
            (mesh as any).material = mat.map((m) => m.clone());
          } else {
            (mesh as any).material = mat.clone();
          }
          (mesh as any).castShadow = true;
        }
      });
      return g;
    };

    const createWarehouse = (offsetX: number, name: string, cameraList: THREE.Object3D[]) => {
      const warehouseGroup = new THREE.Group();

      const floorGeo = new THREE.PlaneGeometry(40, 30);
      const floorMat = new THREE.MeshStandardMaterial({ color: 0xd4c4a8, transparent: true, opacity: 0.95, roughness: 0.75 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0.02;
      floor.receiveShadow = true;
      warehouseGroup.add(floor);

      const wallMat = new THREE.MeshStandardMaterial({ color: 0xe8e2d4, transparent: true, opacity: 0.96, side: THREE.DoubleSide, roughness: 0.65 });
      const backWall = new THREE.Mesh(new THREE.BoxGeometry(40, 8, 0.3), wallMat);
      backWall.position.set(0, 4, -15);
      backWall.castShadow = true;
      warehouseGroup.add(backWall);
      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8, 30), wallMat);
      leftWall.position.set(-20, 4, 0);
      leftWall.castShadow = true;
      warehouseGroup.add(leftWall);
      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 8, 30), wallMat);
      rightWall.position.set(20, 4, 0);
      rightWall.castShadow = true;
      warehouseGroup.add(rightWall);
      const frontLeft = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 0.3), wallMat);
      frontLeft.position.set(-14, 4, 15);
      frontLeft.castShadow = true;
      warehouseGroup.add(frontLeft);
      const frontRight = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 0.3), wallMat);
      frontRight.position.set(14, 4, 15);
      frontRight.castShadow = true;
      warehouseGroup.add(frontRight);
      const frontTop = new THREE.Mesh(new THREE.BoxGeometry(16, 2.5, 0.3), wallMat);
      frontTop.position.set(0, 6.75, 15);
      frontTop.castShadow = true;
      warehouseGroup.add(frontTop);

      const door = new THREE.Mesh(
        new THREE.BoxGeometry(15, 5, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x6b6b6b, transparent: true, opacity: 0.95, roughness: 0.5, metalness: 0.3 }),
      );
      door.position.set(0, 2.5, 14.9);
      door.castShadow = true;
      warehouseGroup.add(door);

      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(41, 0.3, 31),
        new THREE.MeshStandardMaterial({ color: 0x5b7c99, transparent: true, opacity: 0.98, metalness: 0.3, roughness: 0.6 }),
      );
      roof.position.set(0, 8.15, 0);
      roof.castShadow = true;
      (roof as any).userData = { isRoof: true };
      warehouseGroup.add(roof);

      const shelterMat = new THREE.MeshStandardMaterial({ color: 0x6b7b8a, metalness: 0.35, roughness: 0.55 });
      const shelterRoof = new THREE.Mesh(new THREE.BoxGeometry(18, 0.18, 8), shelterMat);
      shelterRoof.position.set(0, 6.0, 18);
      shelterRoof.castShadow = true;
      warehouseGroup.add(shelterRoof);

      const label = createLabelSprite(name);
      label.position.set(0, 10, 0);
      warehouseGroup.add(label);

      const camScale = 0.03;
      const shortName = name.replace(" ", "_");
      const frontWallZ = 15.15;
      const camHeight = 7.2;

      const frontCams = [
        { pos: [-20, camHeight, frontWallZ], rot: 0, id: `${shortName}_front_top_left`, label: name === "GODOWN 3" ? "Face Detection Cam" : `${name} - Front Top Left Corner` },
        { pos: [20, camHeight, frontWallZ], rot: 0, id: `${shortName}_front_top_right`, label: `${name} - Front Top Right Corner` },
        { pos: [-14, camHeight, frontWallZ], rot: 0, id: `${shortName}_front_left_shelter`, label: name === "GODOWN 3" ? "Sack Detection Cam" : `${name} - Front Left Shelter` },
        { pos: [14, camHeight, frontWallZ], rot: 0, id: `${shortName}_front_right_shelter`, label: name === "GODOWN 3" ? "Animal Detection Cam2" : `${name} - Front Right Shelter` },
      ];
      frontCams.forEach((c) => {
        const cam = createCameraMesh();
        cam.position.set(c.pos[0], c.pos[1], c.pos[2]);
        cam.rotation.y = c.rot;
        cam.scale.setScalar(camScale);
        (cam as any).userData = { type: "camera", id: c.id, label: c.label };
        cam.name = c.label;
        const camLabel = createCameraLabelSprite(c.label);
        camLabel.position.set(c.pos[0], c.pos[1] + 2.5, c.pos[2]);
        warehouseGroup.add(camLabel);
        warehouseGroup.add(cam);
        cameraList.push(cam);
      });

      const backCams = [
        { pos: [-12, 6.2, -15.2], id: `${shortName}_back_left`, label: `${name} - Back Left` },
        { pos: [0, 6.2, -15.2], id: `${shortName}_back_center`, label: `${name} - Back Center` },
        { pos: [12, 6.2, -15.2], id: `${shortName}_back_right`, label: `${name} - Back Right` },
      ];
      backCams.forEach((c) => {
        const cam = createCameraMesh();
        cam.position.set(c.pos[0], c.pos[1], c.pos[2]);
        cam.rotation.y = Math.PI;
        cam.scale.setScalar(camScale);
        (cam as any).userData = { type: "camera", id: c.id, label: c.label };
        cam.name = c.label;
        const camLabel = createCameraLabelSprite(c.label);
        camLabel.position.set(c.pos[0], c.pos[1] + 2.5, c.pos[2]);
        warehouseGroup.add(camLabel);
        warehouseGroup.add(cam);
        cameraList.push(cam);
      });

      warehouseGroup.position.x = offsetX;
      return warehouseGroup;
    };

    // Movement / orbit controls (same feel as your HTML)
    let moveSpeed = 2;
    let radius = 100;
    const target = new THREE.Vector3(0, 0, 0);
    let targetRotationX = Math.PI / 4;
    let targetRotationY = Math.PI / 4;
    let currentRotationX = Math.PI / 4;
    let currentRotationY = Math.PI / 4;
    const keys = { w: false, s: false, a: false, d: false };
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w") keys.w = true;
      if (k === "s") keys.s = true;
      if (k === "a") keys.a = true;
      if (k === "d") keys.d = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w") keys.w = false;
      if (k === "s") keys.s = false;
      if (k === "a") keys.a = false;
      if (k === "d") keys.d = false;
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      mouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
    };

    const onMouseUp = (e: MouseEvent) => {
      if (mouseDown && Math.abs(e.clientX - mouseX) < 5 && Math.abs(e.clientY - mouseY) < 5) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableCameras, true);
        if (intersects.length > 0) {
          let obj: THREE.Object3D | null = intersects[0].object;
          while (obj && !(obj as any).userData?.type) obj = obj.parent;
          const camGroup = obj;
          const cam = camGroup ? (camGroup as any).userData : null;
          if (cam && cam.type === "camera") {
            const camInfo: CamInfo = { id: cam.id, label: cam.label || cam.id };
            openCameraPopup(camInfo);
          }
        }
      }
      mouseDown = false;
      renderer.domElement.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseDown) return;
      const deltaX = e.clientX - mouseX;
      const deltaY = e.clientY - mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetRotationY -= deltaX * 0.01;
      targetRotationX -= deltaY * 0.01;
      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      radius -= e.deltaY * 0.5;
      radius = Math.max(40, Math.min(350, radius));
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("mouseleave", onMouseUp);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
    renderer.domElement.style.cursor = "grab";

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", resize);

    const createMinecraft = (gender: Gender) => {
      const character = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffff00, // bright yellow
        roughness: 0.25,
        metalness: 0.75,
        emissive: 0x665500,
        emissiveIntensity: 0.35,
      });

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), mat);
      head.position.y = 2.2;
      head.castShadow = true;
      character.add(head);

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.5, 0.5), mat);
      body.position.y = 1.15;
      body.castShadow = true;
      character.add(body);

      const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.1, 0.28), mat);
      leftArm.position.set(-0.55, 1.15, 0.15);
      leftArm.rotation.z = 0.15;
      leftArm.rotation.x = 0.1;
      character.add(leftArm);

      const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.1, 0.28), mat);
      rightArm.position.set(0.55, 1.15, 0.15);
      rightArm.rotation.z = -0.15;
      rightArm.rotation.x = 0.1;
      character.add(rightArm);

      const legGeo = new THREE.BoxGeometry(0.30, 0.95, 0.35);
      const leftLeg = new THREE.Mesh(legGeo, mat);
      leftLeg.position.set(-0.18, 0.35, 0);
      character.add(leftLeg);
      const rightLeg = new THREE.Mesh(legGeo, mat);
      rightLeg.position.set(0.18, 0.35, 0);
      character.add(rightLeg);

      // Slightly bigger characters for better visibility
      character.scale.setScalar(1.8);
      return character;
    };

    const walkers: Walker[] = [];

    const initScene = () => {
      const godownCameras: THREE.Object3D[] = [];
      scene.add(createWarehouse(0, "GODOWN 1", godownCameras));
      scene.add(createWarehouse(50, "GODOWN 2", godownCameras));
      scene.add(createWarehouse(-50, "GODOWN 3", godownCameras));

      // Road (front)
      const road = new THREE.Mesh(
        new THREE.PlaneGeometry(180, 14),
        new THREE.MeshStandardMaterial({ color: 0x3d4245, roughness: 0.92, metalness: 0.02 }),
      );
      road.rotation.x = -Math.PI / 2;
      road.position.set(0, 0.02, 67);
      road.receiveShadow = true;
      scene.add(road);

      // Perimeter fences + border labels (same as original HTML)
      const fenceMat = new THREE.MeshStandardMaterial({ color: 0x888888, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      const postMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a });

      // SOUTH BORDER
      const southBorderFence = new THREE.Mesh(new THREE.PlaneGeometry(180, 4), fenceMat);
      southBorderFence.position.set(0, 2, -30);
      scene.add(southBorderFence);
      for (let i = -90; i <= 90; i += 15) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 4, 8), postMat);
        post.position.set(i, 2, -30);
        post.castShadow = true;
        scene.add(post);
      }
      const southBorderLabel = createLabelSprite("SOUTH BORDER");
      southBorderLabel.position.set(0, 5, -30);
      scene.add(southBorderLabel);

      // WEST BORDER
      const westBorderFence = new THREE.Mesh(new THREE.PlaneGeometry(90, 4), fenceMat);
      westBorderFence.rotation.y = Math.PI / 2;
      westBorderFence.position.set(-90, 2, 15);
      scene.add(westBorderFence);
      for (let i = -30; i <= 60; i += 15) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 4, 8), postMat);
        post.position.set(-90, 2, i);
        post.castShadow = true;
        scene.add(post);
      }
      const westBorderLabel = createLabelSprite("WEST BORDER");
      westBorderLabel.position.set(-90, 5, 15);
      scene.add(westBorderLabel);

      // EAST BORDER
      const eastBorderFence = new THREE.Mesh(new THREE.PlaneGeometry(90, 4), fenceMat);
      eastBorderFence.rotation.y = -Math.PI / 2;
      eastBorderFence.position.set(90, 2, 15);
      scene.add(eastBorderFence);
      for (let i = -30; i <= 60; i += 15) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 4, 8), postMat);
        post.position.set(90, 2, i);
        post.castShadow = true;
        scene.add(post);
      }
      const eastBorderLabel = createLabelSprite("EAST BORDER");
      eastBorderLabel.position.set(90, 5, 15);
      scene.add(eastBorderLabel);

      // NORTH BORDER (MAIN GATE) with opening segment
      const northBorderFenceRight = new THREE.Mesh(new THREE.PlaneGeometry(155, 4), fenceMat);
      northBorderFenceRight.position.set(12.5, 2, 60);
      scene.add(northBorderFenceRight);
      const northBorderFenceLeft = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), fenceMat);
      northBorderFenceLeft.position.set(-85, 2, 60);
      scene.add(northBorderFenceLeft);

      for (let i = -85; i <= -80; i += 5) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 4, 8), postMat);
        post.position.set(i, 2, 60);
        post.castShadow = true;
        scene.add(post);
      }
      for (let i = -90; i <= 90; i += 15) {
        if (i >= -80 && i <= -65) continue; // gate opening
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 4, 8), postMat);
        post.position.set(i, 2, 60);
        post.castShadow = true;
        scene.add(post);
      }
      const northBorderLabel = createLabelSprite("NORTH BORDER (MAIN GATE)");
      northBorderLabel.position.set(0, 5, 60);
      scene.add(northBorderLabel);

      // Main gate structure (pillars, caps, arch, gates, lights)
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.4, metalness: 0.5 });
      const cornerPillar1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6, 1.5), pillarMat);
      cornerPillar1.position.set(-80, 3, 60);
      cornerPillar1.castShadow = true;
      scene.add(cornerPillar1);
      const cornerPillar2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6, 1.5), pillarMat);
      cornerPillar2.position.set(-65, 3, 60);
      cornerPillar2.castShadow = true;
      scene.add(cornerPillar2);

      const capMat = new THREE.MeshStandardMaterial({ color: 0x34495e, metalness: 0.55 });
      const cap1 = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 2), capMat);
      cap1.position.set(-80, 6.25, 60);
      scene.add(cap1);
      const cap2 = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 2), capMat);
      cap2.position.set(-65, 6.25, 60);
      scene.add(cap2);
      const arch = new THREE.Mesh(new THREE.BoxGeometry(16, 1.5, 1), pillarMat);
      arch.position.set(-72.5, 5.5, 60);
      scene.add(arch);

      const gateMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, transparent: true, opacity: 0.98, metalness: 0.5, roughness: 0.45, side: THREE.DoubleSide });
      const leftGate = new THREE.Mesh(new THREE.BoxGeometry(7, 5, 0.3), gateMat);
      leftGate.position.set(-76.5, 2.5, 60);
      scene.add(leftGate);
      const rightGate = new THREE.Mesh(new THREE.BoxGeometry(7, 5, 0.3), gateMat);
      rightGate.position.set(-68.5, 2.5, 60);
      scene.add(rightGate);

      const gateLightMat = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.8, transparent: true, opacity: 0.9 });
      const gateLight1 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), gateLightMat);
      gateLight1.position.set(-65, 6.5, 60);
      scene.add(gateLight1);
      const gateLight2 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), gateLightMat);
      gateLight2.position.set(-80, 6.5, 60);
      scene.add(gateLight2);
      const gatePointLight1 = new THREE.PointLight(0xffffcc, 0.6, 15);
      gatePointLight1.position.set(-65, 6.5, 60);
      scene.add(gatePointLight1);
      const gatePointLight2 = new THREE.PointLight(0xffffcc, 0.6, 15);
      gatePointLight2.position.set(-80, 6.5, 60);
      scene.add(gatePointLight2);

      const managerOffice = new THREE.Mesh(
        new THREE.BoxGeometry(8, 4, 10),
        new THREE.MeshStandardMaterial({ color: 0xd4c8b8, transparent: true, opacity: 0.98, roughness: 0.65 }),
      );
      managerOffice.position.set(-85, 2, 48);
      scene.add(managerOffice);

      const managerOfficeRoof = new THREE.Mesh(
        new THREE.BoxGeometry(9, 0.3, 11),
        new THREE.MeshStandardMaterial({ color: 0x6b5b4f, transparent: true, opacity: 0.98, roughness: 0.6, metalness: 0.1 }),
      );
      managerOfficeRoof.position.set(-85, 4.15, 48);
      scene.add(managerOfficeRoof);

      const managerOfficeLabel = createLabelSprite("MANAGER OFFICE");
      managerOfficeLabel.position.set(-85, 5.5, 48);
      scene.add(managerOfficeLabel);

      const officeCameraFront = createCameraMesh();
      officeCameraFront.position.set(-85, 4.5, 53);
      officeCameraFront.scale.setScalar(0.02);
      (officeCameraFront as any).userData = { type: "camera", id: "manager_office_front", label: "Number Plate Detection Cam" };
      clickableCameras.push(officeCameraFront);
      scene.add(officeCameraFront);
      const officeCamFrontLabel = createCameraLabelSprite("Number Plate Detection Cam");
      officeCamFrontLabel.position.set(-85, 7, 53);
      scene.add(officeCamFrontLabel);

      const officeCameraBack = createCameraMesh();
      officeCameraBack.position.set(-85, 4.5, 43);
      officeCameraBack.rotation.y = Math.PI;
      officeCameraBack.scale.setScalar(0.02);
      (officeCameraBack as any).userData = { type: "camera", id: "manager_office_back", label: "Animal Detection Cam1" };
      clickableCameras.push(officeCameraBack);
      scene.add(officeCameraBack);
      const officeCamBackLabel = createCameraLabelSprite("Animal Detection Cam1");
      officeCamBackLabel.position.set(-85, 7, 43);
      scene.add(officeCamBackLabel);

      godownCameras.forEach((c) => clickableCameras.push(c));

      const waypointsPath1 = [{ x: 0, z: 18 }, { x: 23, z: 18 }, { x: 23, z: 0 }, { x: 23, z: -18 }, { x: 0, z: -18 }, { x: -23, z: -18 }, { x: -23, z: 0 }, { x: -23, z: 18 }, { x: 0, z: 18 }];
      const waypointsPath2 = [{ x: 50, z: 18 }, { x: 73, z: 18 }, { x: 73, z: 0 }, { x: 73, z: -18 }, { x: 50, z: -18 }, { x: 27, z: -18 }, { x: 27, z: 0 }, { x: 27, z: 18 }, { x: 50, z: 18 }];
      const waypointsPath3 = [{ x: -50, z: 18 }, { x: -27, z: 18 }, { x: -27, z: 0 }, { x: -27, z: -18 }, { x: -50, z: -18 }, { x: -73, z: -18 }, { x: -73, z: 0 }, { x: -73, z: 18 }, { x: -50, z: 18 }];

      // Create 18 moving persons (same count as requested)
      const paths = [waypointsPath1, waypointsPath2, waypointsPath3];
      const baseSpeeds = [0.00016, 0.00014, 0.00015, 0.000145, 0.00013, 0.000135];
      const totalPersons = 18;

      for (let i = 0; i < totalPersons; i++) {
        const path = paths[i % paths.length];
        const person = createMinecraft("male");
        person.position.set(path[0].x, 0, path[0].z);
        scene.add(person);
        walkers.push({
          group: person,
          waypoints: path,
          progress: (i / totalPersons) % 1,
          speed: baseSpeeds[i % baseSpeeds.length] * (0.9 + (i % 5) * 0.03),
        });
      }

      // Add 2 more persons near the MAIN GATE side (north border) moving locally
      const gatePath = [
        // keep below the north border line (z=60) so they don't "cross the gate"
        { x: -78, z: 54 },
        { x: -70, z: 54 },
        { x: -70, z: 58 },
        { x: -78, z: 58 },
        { x: -78, z: 54 },
      ];

      for (let j = 0; j < 2; j++) {
        const p = createMinecraft("male");
        p.position.set(gatePath[0].x, 0, gatePath[0].z);
        scene.add(p);
        walkers.push({
          group: p,
          waypoints: gatePath,
          progress: j * 0.5,
          speed: 0.00018 + j * 0.00001,
        });
      }

      setTotalCount(walkers.length);
    };

    const updateCamera = () => {
      const viewDir = new THREE.Vector3();
      camera.getWorldDirection(viewDir);
      viewDir.y = 0;
      if (viewDir.length() > 0.01) {
        const forward = viewDir.clone().normalize();
        const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), forward).normalize();
        if (keys.w) {
          target.x += forward.x * moveSpeed;
          target.z += forward.z * moveSpeed;
        }
        if (keys.s) {
          target.x -= forward.x * moveSpeed;
          target.z -= forward.z * moveSpeed;
        }
        if (keys.a) {
          target.x += right.x * moveSpeed;
          target.z += right.z * moveSpeed;
        }
        if (keys.d) {
          target.x -= right.x * moveSpeed;
          target.z -= right.z * moveSpeed;
        }
      }
      currentRotationX += (targetRotationX - currentRotationX) * 0.1;
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;
      camera.position.x = target.x + radius * Math.sin(currentRotationY) * Math.cos(currentRotationX);
      camera.position.y = target.y + 8 + radius * Math.sin(currentRotationX);
      camera.position.z = target.z + radius * Math.cos(currentRotationY) * Math.cos(currentRotationX);
      camera.lookAt(target.x, target.y, target.z);
    };

    const animate = () => {
      if (disposed) return;
      animationId = window.requestAnimationFrame(animate);
      updateCamera();

      walkers.forEach((d) => {
        d.progress += d.speed;
        if (d.progress >= 1) d.progress -= 1;
        const pts = d.waypoints;
        const n = pts.length;
        const seg = (d.progress * n) % n;
        const i0 = Math.floor(seg) % n;
        const i1 = (i0 + 1) % n;
        const t = seg - Math.floor(seg);
        const x = pts[i0].x + t * (pts[i1].x - pts[i0].x);
        const z = pts[i0].z + t * (pts[i1].z - pts[i0].z);
        d.group.position.x = x;
        d.group.position.z = z;
        d.group.position.y = 0;
        const dx = pts[i1].x - pts[i0].x;
        const dz = pts[i1].z - pts[i0].z;
        if (dx * dx + dz * dz > 0.0001) d.group.rotation.y = Math.atan2(-dx, dz);
      });

      renderer.render(scene, camera);
    };

    // Load GLB (try both paths: original "/cctv_camera.glb" and "/digital-twin/cctv_camera.glb")
    const loader = new GLTFLoader();
    const glbCandidates = ["/cctv_camera.glb", "/digital-twin/cctv_camera.glb"];
    const loadGlbAt = (idx: number) => {
      if (idx >= glbCandidates.length) {
        cameraModelTemplate = null;
        initScene();
        animate();
        return;
      }
      loader.load(
        glbCandidates[idx],
        (gltf) => {
          cameraModelTemplate = gltf.scene;
          cameraModelTemplate.traverse((o) => {
            const mesh = o as any;
            if (mesh?.isMesh) mesh.castShadow = true;
          });
          const box = new THREE.Box3().setFromObject(cameraModelTemplate);
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetSize = 0.008;
          if (maxDim > 0) cameraModelTemplate.scale.setScalar(targetSize / maxDim);
          initScene();
          animate();
        },
        undefined,
        () => loadGlbAt(idx + 1),
      );
    };
    loadGlbAt(0);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("mouseleave", onMouseUp);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("wheel", onWheel as any);

      scene.traverse((obj) => {
        const mesh = obj as any;
        if (mesh?.geometry) mesh.geometry.dispose?.();
        if (mesh?.material) {
          if (Array.isArray(mesh.material)) mesh.material.forEach((m: any) => m.dispose?.());
          else mesh.material.dispose?.();
        }
        if (mesh?.texture) mesh.texture.dispose?.();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [streamUrls]);

  return (
    <div className="-m-4 md:-m-6 relative h-[calc(100vh-3.5rem)] min-h-[600px]">
      <div ref={mountRef} className="absolute inset-0" />

      <div className="absolute bottom-5 left-5 bg-black/80 text-white p-4 rounded-xl text-[13px] border border-white/20 max-w-[520px]">
        <div className="font-semibold">Secured Complex:</div>
        <div className="opacity-90">3 Warehouses | Main Gate (North Border) | Perimeter: North, South, East, West Borders | Manager Office</div>
        <div className="mt-2">
          <span className="font-semibold">Controls:</span> WASD – Move | Mouse drag – Orbit | Scroll – Zoom
        </div>
        <div className="mt-2 opacity-80 text-[12px]">Tip: click a camera to open its stream URL in a new tab.</div>
      </div>

      <div className="absolute top-5 right-5 bg-black/85 text-[#4CAF50] px-5 py-4 rounded-xl text-[14px] border-2 border-[#4CAF50]">
        <div className="font-bold mb-2">Person detected</div>
        <div className="text-white">
          Total: <span className="font-semibold">{totalCount}</span>
        </div>
      </div>

      {/* Camera popup overlay (same behavior as original HTML) */}
      {popupOpen ? (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/75"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCameraPopup();
          }}
        >
          <div className="w-[min(90vw,980px)] max-h-[90vh] rounded-xl border-2 border-[#4CAF50] bg-[#1a1a1a] shadow-2xl overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-3 bg-[#2d2d2d]">
              <div className="text-[#4CAF50] font-bold text-lg flex-1 min-w-0 truncate">
                {activeCam?.label || "Camera Live Stream"}
              </div>
              <button
                type="button"
                onClick={closeCameraPopup}
                className="w-10 h-10 rounded-lg bg-[#444] hover:bg-[#666] text-white text-2xl leading-none flex items-center justify-center"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <video ref={videoRef} autoPlay playsInline controls className="w-full bg-black rounded-lg" />
              {activeCam && !(streamUrls[activeCam.id] || "").trim() ? (
                <div className="mt-3 text-sm text-zinc-300">
                  No stream URL set for <span className="font-semibold">{activeCam.label}</span>. Edit the mapping in <code className="px-1 py-0.5 bg-black/40 rounded">streamUrls</code>.
                </div>
              ) : null}
              {error ? (
                <div className="mt-3 text-sm text-red-300 border border-red-500/60 rounded-lg p-3 bg-black/40">
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DigitalTwin;

