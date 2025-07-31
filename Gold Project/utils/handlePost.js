import { parseJSONBody } from "./pasreJSONBody.js";
import { sanitizeBody } from "./sanitizeBody.js";
import { sendResponse } from "./sendResponse.js";
import { addPurchase } from "./addPurchase.js";
import { v4 as uuidv4 } from "uuid";

export async function handlePost(req, res) {
  const data = await parseJSONBody(req);
  const sanitizedData = sanitizeBody(data);
  const date = new Date();
  const sanitizedDataWithUUID = {
    ...sanitizedData,
    UUID: uuidv4(),
    createDate: date.toLocaleTimeString("en-us", { timeStyle: "long" }),
  };
  await addPurchase(sanitizedDataWithUUID);
  sendResponse(
    res,
    201,
    "application/json",
    JSON.stringify(sanitizedDataWithUUID)
  );
}
