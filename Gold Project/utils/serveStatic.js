import path from "node:path";
import fs from "node:fs/promises";
import { getContentType } from "./getContentType.js";
import { sendResponse } from "./sendResponse.js";

export async function serveStatic(req, res, pathToFiles) {
  const publicDir = path.join(pathToFiles, "public");
  const filePath = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url
  );
  const ext = path.extname(filePath);

  const contentType = getContentType(ext);

  try {
    const pageData = await fs.readFile(filePath);
    await sendResponse(res, 200, contentType, pageData);
  } catch (err) {
    if (err.code !== "ENOENT") console.error(err);
    try {
      const errorFilePath = path.join(publicDir, "404.html");
      const notFOundPage = await fs.readFile(errorFilePath);
      await sendResponse(res, 404, "text/html", notFOundPage);
    } catch (error) {
      console.log(error);
    }
  }
}
