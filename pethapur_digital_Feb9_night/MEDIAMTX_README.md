# MediaMTX WebRTC (low-latency live stream)

Use MediaMTX to stream your RTSP camera as **WebRTC** in the browser with **minimal delay** (~sub-second).

## 1. Install MediaMTX

- **Linux (amd64):**
  ```bash
  wget https://github.com/bluenviron/mediamtx/releases/download/v1.8.3/mediamtx_v1.8.3_linux_amd64.tar.gz
  tar -xzf mediamtx_v1.8.3_linux_amd64.tar.gz
  ./mediamtx
  ```

- **Or with Go:** `go install github.com/bluenviron/mediamtx/cmd/mediamtx@latest`

- **Windows/macOS:** Download from [MediaMTX releases](https://github.com/bluenviron/mediamtx/releases).

## 2. Configure

Edit `mediamtx.yml` if your RTSP URL is different. Default path `manager_office` uses:

- **RTSP:** `rtsp://admin:admin123456@192.168.1.10:8554/profile0`
- **WebRTC (WHEP):** `http://localhost:8889/manager_office/whep`

## 3. Run MediaMTX

From this folder:

```bash
./mediamtx mediamtx.yml
```

Or with the full path to the binary:

```bash
/path/to/mediamtx mediamtx.yml
```

MediaMTX will:

- Listen for WebRTC on **port 8889**
- Pull the RTSP stream and serve it via WebRTC at path `manager_office`

## 4. Open the digital twin

1. Serve the app (e.g. `node server.js` or open `final.html` via your server).
2. Open the page and click the **Manager Office** camera.
3. The popup will connect to `http://localhost:8889/manager_office/whep` and show the **live WebRTC** stream with very low latency.

## Troubleshooting

- **"WebRTC error" / "stream not found"**  
  Make sure MediaMTX is running (`./mediamtx mediamtx.yml`) and the RTSP camera at `192.168.1.10` is reachable.

- **CORS**  
  If the app is on a different host/port, you may need to allow CORS in MediaMTX or use a reverse proxy.

- **Change port**  
  In `mediamtx.yml` set e.g. `webrtcAddress: :9999` and in `final.html` use `http://localhost:9999/manager_office/whep`.
