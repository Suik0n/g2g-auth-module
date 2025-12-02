<script setup lang="ts">
import Spinner from "./components/Spinner.vue";

import { useAuthStore } from "./stores/auth";
const auth = useAuthStore();
</script>

<template>
  <div>
    <Spinner v-if="auth.loading" />
    <router-view />
  </div>
</template>

<style scoped></style>
