import { getClient } from "../GetClient";

async function test() {
  try {
    const client = await getClient();
    const result = await client.set("Jonas", "Julian");
    console.log("Value set successfully:", result);
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

export default test;
