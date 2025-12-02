<script setup lang="ts">
import type { Gender } from "../../types/user";

const props = defineProps<{
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  address?: string;
  age?: number;
  gender?: Gender;
}>();
</script>

<template>
  <div class="flex flex-col gap-6 items-start shadow-lg p-4 rounded">
    <p class="text-lg font-semibold">Confirm your information</p>

    <div class="flex w-full flex-col gap-4 items-start">
      <p><span class="font-semibold">Email: </span>{{ props.email }}</p>
      <p><span class="font-semibold">Password: </span>{{ props.password }}</p>
      <p><span class="font-semibold">Name: </span>{{ props.name }}</p>
      <p><span class="font-semibold">Phone Number: </span>{{ props.phone }}</p>
      <p><span class="font-semibold">Address: </span>{{ props.address }}</p>
      <p><span class="font-semibold">Age: </span>{{ props.age }}</p>
      <p><span class="font-semibold">Gender: </span>{{ props.gender }}</p>
    </div>
  </div>
</template>
