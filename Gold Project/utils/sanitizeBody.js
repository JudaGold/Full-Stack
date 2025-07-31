import sanitizeHtml from "sanitize-html";

export function sanitizeBody(data) {
  const sanitizedData = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitizedData[key] = sanitizeHtml(value, {
        allowedTags: ["b"],
        allowedAttributes: {},
      });
    } else {
      //dates/numbers....
      sanitizedData[key] = value.trim();
    }
  }

  return sanitizedData;
}
