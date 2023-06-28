import { createRouter, createWebHistory } from "vue-router";

import { getCurrentUser } from "@/main.js";

import { ROUTES } from "@/router/routes";

import ChirpBoxHome from "@/Pages/ChirpBoxHome";
import ChirpBoxAccount from "@/Pages/ChirpBoxAccount";
import WorldFeed from "@/Pages/WorldFeed";
import SignIn from "@/Pages/Sign/SignIn";
import SignUp from "@/Pages/Sign/SignUp";

import UserProfile from "@/components/User/UserProfile";

const routes = [
  {
    path: "/:catchAll(.*)",
    name: ROUTES.app,
    component: ChirpBoxHome,
    props: true,
  },
  {
    path: "/account",
    name: ROUTES.account,
    component: ChirpBoxAccount,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/feed",
    name: ROUTES.worldFeed,
    component: WorldFeed,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/sign-in",
    name: ROUTES.signIn,
    component: SignIn,
    props: true,
  },
  {
    path: "/sign-up",
    name: ROUTES.signUp,
    component: SignUp,
    props: true,
  },
  {
    path: "/user/:userId",
    name: "UserProfile",
    component: UserProfile,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await getCurrentUser())) {
    return "/sign-in";
  }
});
