<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");

async function getResetLink() {
  await auth.requestPasswordRequestLink(email.value);
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="text-lg">Forgot your password?</h2>
    <form
      @submit.prevent="getResetLink"
      class="mt-6 flex w-full max-w-md flex-col gap-2"
    >
      <input
        type="email"
        v-model="email"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="email"
        required="true"
        placeholder="Enter your email"
      />
      <button
        type="submit"
        :disabled="!email"
        class="bg-brand-blue-primary! w-full cursor-pointer rounded p-3! text-white transition-all ease-in-out hover:brightness-120 disabled:saturate-0"
      >
        Send Link
      </button>
      <button type="button" @click="router.back" class="hover:underline cursor-pointer text-brand-blue-primary">
        Back
      </button>
    </form>
  </div>
</template>
