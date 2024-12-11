const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

// List of videos with metadata
const videos = [
  { id: "./videos/sample.mp4", title: "Video 1", description: "Sample Video 1" },
  { id: "./videos/sample.mp4", title: "Video 2", description: "Sample Video 2" },
  { id: "./videos/sample.mp4", title: "Video 3", description: "Sample Video 3" },
];

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Serve the index.html file
    const filePath = path.join(__dirname, "Public", "trial.html");
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading page.");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.url === "/Trial.css") {
    // Serve the CSS file
    const filePath = path.join(__dirname, "Public", "Trial.css");
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading CSS.");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(content);
      }
    });
  } else if (req.url.startsWith("/video?id=")) {
    // Stream the selected video
    const videoId = req.url.split("=")[1];
    const video = videos.find((v) => v.id === videoId);

    if (video) {
      const videoPath = path.join(__dirname, "videos", `${videoId}.mp4`);
      fs.stat(videoPath, (err, stats) => {
        if (err) {
          res.writeHead(404);
          res.end("Video not found.");
          return;
        }

        const { range } = req.headers;
        const videoSize = stats.size;

        if (range) {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

          const chunkSize = end - start + 1;
          const fileStream = fs.createReadStream(videoPath, { start, end });

          res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
          });

          fileStream.pipe(res);
        } else {
          res.writeHead(200, {
            "Content-Length": videoSize,
            "Content-Type": "video/mp4",
          });

          fs.createReadStream(videoPath).pipe(res);
        }
      });
    } else {
      res.writeHead(404);
      res.end("Video not found.");
    }
  } else {
    res.writeHead(404);
    res.end("Not found.");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
