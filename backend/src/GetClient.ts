import { createClient, RedisClientType } from "redis";

let clientInstance: RedisClientType | null = null;

export async function getClient() {
  if (!clientInstance) {
    clientInstance = createClient();
    clientInstance.on("error", (err) => console.log("redis Client Error", err));
    await clientInstance.connect();
    console.log("New redis Client created");
  }
  return clientInstance;
}
