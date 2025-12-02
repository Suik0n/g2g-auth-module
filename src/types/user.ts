export type Gender = "male" | "female" | "other";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  phone?: string;
  address?: string;
  age?: number;
  gender?: Gender;
  createdAt: string;
  updatedAt?: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}
