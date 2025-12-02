<script setup lang="ts">
import { ref } from "vue";
import StepOne from "../components/register/StepOne.vue";
import type { Gender } from "../types/user";
import StepTwo from "../components/register/StepTwo.vue";
import StepThree from "../components/register/StepThree.vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const step = ref(0);

const userEmail = ref("");
const userPassword = ref("");
const userName = ref("");
const userPhone = ref("");
const userAddress = ref("");
const userAge = ref(0);
const userGender = ref<Gender>("male");

async function createAccount() {
  console.log("Creating Account");

  await auth.createAccount(userEmail.value, userPassword.value, {
    name: userName.value,
    phone: userPhone.value,
    address: userAddress.value,
    age: userAge.value,
    gender: userGender.value,
  });
}

function stepBack() {
  if (step.value > 0) {
    step.value--;
  } else {
    router.back();
  }
}

async function stepFront() {
  if (step.value < 2) {
    step.value++;
  } else {
    await createAccount();
    router.push("home");
  }
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-8">
    <h2 class="text-2xl font-semibold">Create New Account</h2>
    <form
      @submit.prevent="stepFront"
      class="flex w-full max-w-md flex-col gap-6"
    >
      <StepOne
        v-if="step === 0"
        v-model:email="userEmail"
        v-model:password="userPassword"
      />
      <StepTwo
        v-if="step === 1"
        v-model:name="userName"
        v-model:phone="userPhone"
        v-model:address="userAddress"
        v-model:age="userAge"
        v-model:gender="userGender"
      />
      <StepThree
        v-if="step === 2"
        v-model:email="userEmail"
        v-model:password="userPassword"
        v-model:name="userName"
        v-model:phone="userPhone"
        v-model:address="userAddress"
        v-model:age="userAge"
        v-model:gender="userGender"
      />
      <div class="flex w-full gap-4">
        <button
          type="button"
          @click="stepBack"
          class="bg-brand-grey-primary text-brand-grey-secondary w-full max-w-md cursor-pointer rounded p-3! transition-all ease-in-out hover:bg-black"
        >
          {{ step > 0 ? "Back" : "Cancel" }}
        </button>
        <button
          type="submit"
          class="bg-brand-blue-primary w-full max-w-md cursor-pointer rounded p-3! transition-all ease-in-out hover:brightness-110"
        >
          {{ step >= 2 ? "Create" : "Next" }}
        </button>
      </div>
    </form>
  </div>
</template>

<style></style>
