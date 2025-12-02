<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("home");
    console.log("Login successful!");
  } catch (err) {
    alert(err instanceof Error ? err.message : "Login failed");
  }
};
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-8">
    <h2 class="text-2xl font-semibold">Login Page</h2>
    <form @submit.prevent="login" class="flex w-full max-w-md flex-col gap-10">
      <div class="flex flex-col gap-4">
        <input
          type="email"
          v-model="email"
          class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
          name="email"
          required="true"
          placeholder="Enter your email"
        />
        <input
          type="password"
          v-model="password"
          class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
          name="password"
          required="true"
          placeholder="Password"
        />
        <div class="flex w-full flex-col items-center gap-2">
          <button
            type="submit"
            class="bg-brand-blue-primary! w-full cursor-pointer rounded p-3! text-white transition-all ease-in-out hover:brightness-120"
          >
            Login
          </button>
          <a
            class="text-brand-grey-secondary hover:text-brand-blue-primary w-fit text-sm hover:underline"
            href="/reset-password"
            >Forgot Password</a
          >
        </div>
      </div>
    </form>
    <router-link
      to="/register"
      class="bg-brand-grey-primary text-brand-grey-secondary hover:bg-brand-green-primary hover:text-brand-black flex w-full max-w-md cursor-pointer justify-center rounded p-3 transition-all ease-in-out"
    >
      Sign up
    </router-link>
  </div>
</template>

<style scope></style>
