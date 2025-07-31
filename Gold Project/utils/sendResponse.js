export async function sendResponse(
  res,
  statusCode,
  contentType = "text/html",
  content
) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(content);
}
