import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Home from "../pages/Home.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import UpdateProfile from "../pages/UpdateProfile.vue";
import NewPassword from "../pages/NewPassword.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/reset-password", name: "reset", component: ResetPassword },
  { path: "/new-password", name: "password", component: NewPassword },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-profile",
    name: "update-profile",
    component: UpdateProfile,
    meta: { requiresAuth: true },
  },
  { path: "/", redirect: "/login" },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, _, next) => {
  const auth = useAuthStore();

  if (!auth.user && !auth.loading) {
    await auth.init();
  }

  const isLoggedIn = !!auth.user;

  if (
    isLoggedIn &&
    ["login", "register", "reset"].includes(to.name as string)
  ) {
    return next({ name: "home" });
  }

  if (to.meta.requiresAuth && !auth.user) {
    console.log("Not logged in");
    return next({ name: "login" });
  }
  next();
});

export default router;
