<template>
  <header class="chirp-box-header">
    <div class="chirp-box-header__container">
      <div class="chirp-box-header__wrapper">
        <router-link to="/">
          <img :src="logo" alt="chirp box logo" class="header-nav-logo" />
        </router-link>
      </div>
      <nav class="header-nav">
        <ul class="header-nav__list">
          <router-link class="header-nav__item" to="/" exact
            ><img
              class="header-nav__item-icon"
              :src="home"
              alt="home icon"
            />Home</router-link
          >
          <router-link class="header-nav__item" to="/feed"
            ><img
              class="header-nav__item-icon"
              :src="blog"
              alt="blog icon"
            />Feed</router-link
          >
          <router-link to="/account" class="header-nav__item"
            ><img
              class="header-nav__item-icon"
              :src="account"
              alt="profile icon"
            />Account</router-link
          >
        </ul>
        <router-link v-if="!isLoggedIn" class="header-nav__item" to="/sign-in">
          <img class="header-nav__item-icon" :src="sign" alt="sign icon" />Sign
          In
        </router-link>
        <app-button
          v-if="isLoggedIn"
          class="header-nav__item"
          @click="handleSignOut"
        >
          <img
            class="header-nav__item-icon"
            :src="sign"
            alt="logout icon"
          />LogOut
        </app-button>
      </nav>
    </div>
  </header>
</template>

<script>
import logo from "@/assets/svg/chirp-box-logo.svg";
import home from "@/assets/svg/home-icon.svg";
import blog from "@/assets/svg/blog-icon.svg";
import sign from "@/assets/svg/sign-icon.svg";
import account from "@/assets/svg/profile-icon.svg";

import { auth } from "@/main.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

// import { doc, getDoc } from "firebase/firestore";

export default {
  name: "chirp-box-header",
  data() {
    return {
      logo,
      home,
      blog,
      sign,
      account,
      isLoggedIn: false,
    };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },

  methods: {
    handleSignOut() {
      signOut(auth).then(() => {
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chirp-box-header {
  margin-bottom: 1rem;
}
.chirp-box-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4.125rem 0;
}
.chirp-box-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-nav {
  width: 60%;

  display: flex;
  justify-content: space-between;
}
.header-nav__list {
  display: flex;
  justify-content: space-around;
  width: 50%;
}
.header-nav__item {
  min-width: 2.25rem;
  min-height: 2.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;

  text-decoration: none;
  color: #000;
  font-size: 0.625rem;
  font-weight: 500;
}
.router-link-exact-active {
  opacity: 1;
}
</style>
