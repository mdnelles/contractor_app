import { seedUsers } from "@/data/seed";
import { User } from "@/types";
import crypto from "crypto";

const JWT_SECRET = "dpc-demo-secret-2026";

export function createToken(user: User): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      email: user.email,
      userLevel: user.userLevel,
      homeStore: user.homeStore,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    })
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token: string): { email: string; userLevel: number; homeStore: number } | null {
  try {
    const [header, payload, signature] = token.split(".");
    const expectedSig = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url");
    if (signature !== expectedSig) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
}

export function authenticateUser(email: string, password: string): User | null {
  const user = seedUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && !u.isDeleted
  );
  return user || null;
}
