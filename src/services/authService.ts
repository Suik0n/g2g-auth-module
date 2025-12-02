//? EMULATE API

import { emulateApiDelay } from "../lib/fakeDelay";
import { secureHash } from "../lib/hash";
import type { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";

const DATABASE_KEY = "EMULATE_BACKEND_DB";
const SESSION_KEY = "EMULATE_SESSION_DATA";

//++++++++++++++++++++++++

function readUsers(): User[] {
  return JSON.parse(localStorage.getItem(DATABASE_KEY) || "[]");
}
function writeUsers(users: User[]) {
  localStorage.setItem(DATABASE_KEY, JSON.stringify(users));
}
function setSession(userId: string | null) {
  if (userId) localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }));
  else localStorage.removeItem(SESSION_KEY);
}
function getSession(): { userId: string } | null {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

//++++++++++++++++++++++++

export async function getCurrentUser(): Promise<User | null> {
  const session = getSession();
  if (!session) return null;
  const usersList = readUsers();
  const user = usersList.find((u) => u.id === session.userId) || null;
  await emulateApiDelay(300);
  return user;
}

export async function login(email: string, password: string) {
  const hash = await secureHash(password);
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.passwordHash === hash);
  await emulateApiDelay(1700);
  if (!user) throw new Error("Invalid credentials");
  setSession(user.id);
  return user;
}

export function logout() {
  setSession(null);
  return emulateApiDelay(200);
}

export async function requestPasswordReset(email: string) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.email === email);
  await emulateApiDelay(1000);
  if (idx === -1) throw new Error("Email not found");
  const token = uuidv4();
  users[idx]!.resetToken = token;
  users[idx]!.resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
  writeUsers(users);
  // return a mock reset link
  const currentOrigin = window.location.origin;
  return `${currentOrigin}/new-password?token=${token}&email=${encodeURIComponent(email)}`;
}

export async function resetPassword(
  email: string,
  token: string,
  newPassword: string,
) {
  const users = readUsers();
  const idx = users.findIndex(
    (u) => u.email === email && u.resetToken === token,
  );
  await emulateApiDelay(700);
  if (idx === -1) throw new Error("Invalid token/email");
  if (
    !users[idx]!.resetTokenExpiry ||
    users[idx]!.resetTokenExpiry! < Date.now()
  ) {
    throw new Error("Token expired");
  }
  users[idx]!.passwordHash = await secureHash(newPassword);
  delete users[idx]!.resetToken;
  delete users[idx]!.resetTokenExpiry;
  writeUsers(users);
  return true;
}
export async function registerUser(
  email: string,
  password: string,
  profile: Partial<User>,
) {
  const passwordHash = await secureHash(password);
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    emulateApiDelay(1000);
    throw new Error("Email already exists");
  }
  const user: User = {
    id: uuidv4(),
    email,
    passwordHash,
    ...profile,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  await emulateApiDelay(2000);
  setSession(user.id);
  return user;
}

export async function updateProfile(updates: Partial<User>): Promise<User> {
  const session = getSession();
  if (!session) throw new Error("Not logged in");
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === session.userId);
  if (idx === -1) throw new Error("User not found");
  if (updates.passwordHash) {
    updates.passwordHash = await secureHash(updates.passwordHash);
  }
  users[idx] = {
    ...users[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  } as User;
  writeUsers(users);
  await emulateApiDelay(200);
  return users[idx]!;
}
