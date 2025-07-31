export async function parseJSONBody(req) {
  try {
    let body = "";

    for await (const chunk of req) {
      body += chunk;
    }

    return JSON.parse(body);
  } catch (error) {
    throw new Error(error);
  }
}
