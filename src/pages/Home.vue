<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
const router = useRouter();

async function logout() {
  await auth.logout();
  router.push("login");
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <h2 class="text-lg">Welcome to the homepage {{ auth.user?.name }}</h2>
    <div class="flex w-full max-w-md flex-col gap-4">
      <button
        @click="router.push('update-profile')"
        class="hover:bg-brand-blue-primary border-brand-blue-primary w-full max-w-md cursor-pointer rounded border p-3! transition-all ease-in-out hover:brightness-110"
      >
        Edit Profile
      </button>
      <button
        @click="logout"
        class="border-brand-red-primary hover:bg-brand-red-primary w-full max-w-md cursor-pointer rounded border p-3! transition-all ease-in-out hover:brightness-110"
      >
        Logout
      </button>
    </div>
  </div>
</template>
