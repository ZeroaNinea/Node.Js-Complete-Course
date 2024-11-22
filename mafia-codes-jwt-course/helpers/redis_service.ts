import client from "./init_redis";

export async function redis_setValue(key: string, value: string) {
  // if (!client.isOpen) {
  //   await client.connect();
  // }

  try {
    await client.set(key, value);
  } catch (err) {
    console.error(`Error setting key "${key}" in Redis:`, err);
  }
}

export async function redis_setValueWithExpiry(
  key: string,
  value: string,
  expiryInSeconds: number
) {
  try {
    await client.set(key, value, {
      EX: expiryInSeconds,
    });
  } catch (err) {
    console.error(`Error setting key "${key}" in Redis with expiry:`, err);
  }
}

export async function redis_getValue(key: string): Promise<string | null> {
  // if (!client.isOpen) {
  //   await client.connect();
  // }

  try {
    return await client.get(key);
  } catch (err) {
    console.error(`Error getting key "${key}" from Redis:`, err);
    return null;
  }
}
