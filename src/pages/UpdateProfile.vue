<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import type { Gender, User } from "../types/user";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const email = ref(auth.user?.email || "");
const password = ref("");
const name = ref(auth.user?.name || "");
const phone = ref(auth.user?.phone || "");
const address = ref(auth.user?.address || "");
const age = ref(auth.user?.age || 0);
const gender = ref<Gender>(auth.user?.gender || "male");

const hasChanges = computed(() => {
  return (
    email.value !== auth.user?.email ||
    password.value !== "" || // if user entered a new password
    name.value !== auth.user?.name ||
    phone.value !== auth.user?.phone ||
    address.value !== auth.user?.address ||
    age.value !== auth.user?.age ||
    gender.value !== auth.user?.gender
  );
});

async function callUpdateFunction() {
  console.log("function calling");

  if (!auth.user) return;

  const updates: Partial<User> = {};

  if (email.value !== auth.user.email) updates.email = email.value;
  if (password.value !== "") updates.passwordHash = password.value;
  if (name.value !== auth.user.name) updates.name = name.value;
  if (phone.value !== auth.user.phone) updates.phone = phone.value;
  if (address.value !== auth.user.address) updates.address = address.value;
  if (age.value !== auth.user.age) updates.age = age.value;
  if (gender.value !== auth.user.gender) updates.gender = gender.value;

  try {
    await auth.updateProfile(updates);
    password.value = "";
    alert("Profile updated successfully!");
  } catch (err) {
    alert(err instanceof Error ? err.message : "Failed to update profile");
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <h2>Edit your profile details here</h2>

    <form
      @submit.prevent="callUpdateFunction"
      class="flex w-full max-w-md flex-col gap-2"
    >
      <div class="flex flex-col gap-2">
        <label class="text-start font-medium">Email</label>
        <input
          type="text"
          v-model="email"
          class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
          name="name"
          required
          placeholder="Full Name"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-start font-medium">Password</label>
        <input
          type="text"
          v-model="password"
          class="h-6 rounded bg-white px-3 py-6 text-black outline-0"
          name="name"
          placeholder="New Password (leave blank to keep)"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-start font-medium">Name</label>
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
          placeholder="Age"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-start font-medium">Gender</label>
        <select v-model="gender" class="input bg-white px-3 py-3 text-black">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="mt-6 flex gap-4">
        <button
          type="button"
          @click="router.back"
          class="border-brand-grey-secondary hover:text-brand-black hover:bg-brand-grey-secondary w-full cursor-pointer rounded border p-3"
        >
          Go back
        </button>
        <button
          type="submit"
          :disabled="!hasChanges || auth.loading"
          class="bg-brand-blue-primary w-full cursor-pointer rounded p-3 disabled:saturate-0"
        >
          {{ auth.loading ? "Updating..." : "Update Profile" }}
        </button>
      </div>
    </form>
  </div>
</template>
