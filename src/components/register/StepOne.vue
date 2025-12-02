<script setup lang="ts">
const email = defineModel("email");
const password = defineModel("password");
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <label class="text-start font-medium">Email</label>
      <input
        type="email"
        v-model="email"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="sd"
        required
        placeholder="Enter your email"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-start font-medium">Password</label>
      <input
        type="password"
        v-model="password"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="password"
        required="true"
        placeholder="Password"
      />
    </div>
  </div>
</template>
