import fs from "node:fs/promises";

export async function getData(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.log(error);
    return [];
  }
}
