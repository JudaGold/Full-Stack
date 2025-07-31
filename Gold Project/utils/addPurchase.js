import fs from "node:fs/promises";
import path from "node:path";
import { getData } from "./getData.js";

export async function addPurchase(sanitizedData) {
  try {
    const pathToFile = path.join("data", "data.json");
    const data = await getData(pathToFile);
    data.push(sanitizedData);
    await fs.writeFile(pathToFile, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    throw new Error(error);
  }
}
