import path from "node:path";
import fs from "node:fs/promises";
import { getContentType } from "./getContentType.js";

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
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(pageData);
  } catch (err) {
    console.log(err);
  }
}
