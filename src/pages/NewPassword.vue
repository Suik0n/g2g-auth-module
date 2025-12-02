<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const token = route.query.token as string;
const email = route.query.email as string;

const newPassword = ref("");

async function resetPassword() {
  try {
    await auth.updateNewPassword(email, token, newPassword.value);
    router.push("login");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="text-lg">Enter your new password</h2>
    <form
      @submit.prevent="resetPassword"
      class="mt-6 flex w-full max-w-md flex-col gap-2"
    >
      <input
        type="password"
        v-model="newPassword"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="password"
        required="true"
        placeholder="**********"
      />
      <button
        type="submit"
        :disabled="!newPassword"
        class="bg-brand-blue-primary! w-full cursor-pointer rounded p-3! text-white transition-all ease-in-out hover:brightness-120 disabled:saturate-0"
      >
        UpdatePassword
      </button>
    </form>
  </div>
</template>
