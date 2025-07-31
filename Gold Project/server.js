import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { sendResponse } from "./utils/sendResponse.js";
import { getGoldPrice } from "./utils/getGoldPrice.js";
import { handlePost } from "./utils/handlePost.js";

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api")) {
    if (req.url === "/api/goldPrice") {
      const goldPrice = getGoldPrice();
      sendResponse(res, 200, "application/json", JSON.stringify(goldPrice));
    } else if (req.url === "/api/buyGold" && req.method === "POST") {
      await handlePost(req, res);
    } else {
      sendResponse(res, 200, "application/json", JSON.stringify("success"));
    }
  } else if (req.url.startsWith("/.well-known")) {
    res.writeHead(204); // No Content
    return res.end();
  } else if (!req.url.startsWith("/api")) {
    return await serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
