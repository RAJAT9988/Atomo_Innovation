const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// RTSP stream URL for Manager Office camera (credentials in URL)
const MANAGER_OFFICE_RTSP = 'rtsp://admin:admin123456@192.168.1.10:8554/profile0';

// Directory for HLS output (created if missing)
const STREAMS_DIR = path.join(__dirname, 'streams');
const MANAGER_OFFICE_STREAM_DIR = path.join(STREAMS_DIR, 'manager_office');

let ffmpegProcess = null;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function startManagerOfficeStream() {
  ensureDir(STREAMS_DIR);
  ensureDir(MANAGER_OFFICE_STREAM_DIR);

  const args = [
    '-rtsp_transport', 'tcp',
    '-fflags', 'nobuffer+discardcorrupt',
    '-flags', 'low_delay',
    '-analyzeduration', '1000000',
    '-probesize', '1000000',
    '-i', MANAGER_OFFICE_RTSP,
    '-c', 'copy',
    '-f', 'hls',
    '-hls_time', '0.5',
    '-hls_list_size', '2',
    '-hls_flags', 'delete_segments+append_list+omit_endlist',
    '-hls_segment_filename', path.join(MANAGER_OFFICE_STREAM_DIR, 'segment_%03d.ts'),
    path.join(MANAGER_OFFICE_STREAM_DIR, 'index.m3u8')
  ];

  ffmpegProcess = spawn('ffmpeg', args, {
    stdio: ['ignore', 'pipe', 'pipe']
  });

  ffmpegProcess.stderr.on('data', (data) => {
    const msg = data.toString();
    if (msg.includes('error') || msg.includes('Error')) {
      console.error('[ffmpeg]', msg.trim());
    }
  });

  ffmpegProcess.on('close', (code) => {
    console.log('[ffmpeg] Manager office stream process exited with code', code);
    ffmpegProcess = null;
  });

  ffmpegProcess.on('error', (err) => {
    console.error('[ffmpeg] Failed to start:', err.message);
    console.error('Make sure ffmpeg is installed (apt install ffmpeg / brew install ffmpeg)');
  });

  console.log('Started RTSP -> HLS conversion for Manager Office camera');
}

// Serve HLS stream - no cache so player always gets latest segments
app.use('/stream/manager_office', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.set('Pragma', 'no-cache');
  next();
}, express.static(MANAGER_OFFICE_STREAM_DIR));

// Serve static files (final.html, assets, etc.)
app.use(express.static(__dirname));

// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'final.html'));
});

// Start RTSP->HLS when server starts
startManagerOfficeStream();

app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
  console.log('Manager Office HLS stream: http://localhost:' + PORT + '/stream/manager_office/index.m3u8');
  console.log('Open http://localhost:' + PORT + ' and click the Manager Office camera to view the stream.');
});
