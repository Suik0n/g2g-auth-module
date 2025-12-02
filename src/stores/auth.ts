import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types/user";
import * as authService from "../services/authService";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);

  async function init() {
    loading.value = true;
    console.log("Initiating App");
    try {
      const userData = await authService.getCurrentUser();
      console.log(userData);
      user.value = userData;
    } catch (e) {
      console.error("Init failed:", e);
    } finally {
      loading.value = false;
      console.log("Finished Initiating");
    }
  }
  async function login(email: string, password: string) {
    loading.value = true;
    try {
      console.log("Logging In");
      user.value = await authService.login(email, password);
    } catch (e: any) {
      throw new Error(e);
    } finally {
      loading.value = false;
      console.log("Login Completed");
    }
  }
  async function logout() {
    loading.value = true;
    await authService.logout();
    user.value = null;
    loading.value = false;
  }
  async function updateProfile(updates: Partial<User>) {
    loading.value = true;
    user.value = await authService.updateProfile(updates);
    loading.value = false;
    return user;
  }

  async function createAccount(
    email: string,
    password: string,
    userData: Partial<User>,
  ) {
    loading.value = true;
    try {
      user.value = await authService.registerUser(email, password, userData);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Account creation failed");
    } finally {
      loading.value = false;
    }
  }

  async function requestPasswordRequestLink(email: string) {
    loading.value = true;
    try {
      const link = await authService.requestPasswordReset(email);
      alert(link);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Generating reset link failed",
      );
    } finally {
      loading.value = false;
    }
  }

  async function updateNewPassword(
    email: string,
    token: string,
    newPassword: string,
  ) {
    loading.value = true;
    try {
      await authService.resetPassword(email, token, newPassword);
      alert("Password updated successfully");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Resetting password failed");
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    loading,
    init,
    login,
    logout,
    updateProfile,
    createAccount,
    requestPasswordRequestLink,
    updateNewPassword,
  };
});
