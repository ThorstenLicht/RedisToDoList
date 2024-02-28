import { createClient, RedisClientType } from "redis";

let clientInstance: RedisClientType | null = null;

export async function getClient() {
  if (!clientInstance) {
    clientInstance = createClient();
    clientInstance.on("error", (err) => console.log("Redis Client Error", err));
    await clientInstance.connect();
    console.log("New Client created");
  }
  return clientInstance;
}
