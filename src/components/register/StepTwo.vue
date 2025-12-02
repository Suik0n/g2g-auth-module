<script setup lang="ts">
const name = defineModel("name");
const phone = defineModel("phone");
const address = defineModel("address");
const age = defineModel("age");
const gender = defineModel("gender");
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <label class="text-start font-medium">Full Name</label>
      <input
        type="text"
        v-model="name"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="name"
        required
        placeholder="Full Name"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-start font-medium">Phone Number</label>
      <input
        type="tel"
        v-model="phone"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="phone number"
        required="true"
        placeholder="Phone Number"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-start font-medium">Address</label>
      <input
        type="text"
        v-model="address"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="address"
        required="true"
        placeholder="Address"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-start font-medium">Age</label>
      <input
        type="number"
        v-model="age"
        class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
        name="age"
        required="true"
        placeholder="Age"
      />
    </div>
    <div class="flex flex-col items-start gap-2">
      <label class="font-medium">Gender</label>

      <div class="flex flex-row gap-4">
        <label class="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            value="male"
            v-model="gender"
            name="gender"
            required
          />
          <span>Male</span>
        </label>

        <label class="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            value="female"
            v-model="gender"
            name="gender"
            required
          />
          <span>Female</span>
        </label>

        <label class="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            value="other"
            v-model="gender"
            name="gender"
            required
          />
          <span>Other</span>
        </label>
      </div>
    </div>
  </div>
</template>
