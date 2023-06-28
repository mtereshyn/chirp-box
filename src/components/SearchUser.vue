<template>
  <div class="search-user">
    <div class="search-user__container">
      <form class="search-user__wrapper" @submit.prevent="searchUser">
        <input
          class="search-user__input"
          type="text"
          v-model="searchQuery"
          placeholder="Enter username"
        />
        <app-button class="search-button app-button--search" type="submit">
          <img :src="search" alt="search icon" />
        </app-button>
      </form>

      <div v-if="searchResults.length" class="search-user__result">
        <p class="search-user__result-message">Found users</p>
        <div
          class="search-user__users"
          v-for="user in searchResults"
          :key="user.nickname"
        >
          <div class="search-user__user" @click="redirectToUser(user)">
            <img class="search-user__user-avatar" :src="user.photoURL" alt="" />
            <p class="search-user__user-nickname">{{ user.nickname }}</p>
          </div>
        </div>
      </div>
      <div v-if="showNoResultsMessage">
        <p>No search results found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { getDocs, query, where, collection } from "firebase/firestore";

import AppButton from "@/Common/AppButton";

import search from "@/assets/svg/search-icon.svg";

export default {
  name: "search-user",
  components: { AppButton },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      search,
    };
  },

  computed: {
    showNoResultsMessage() {
      return this.searchQuery && this.searchResults.length === 0;
    },
  },

  methods: {
    async searchUser() {
      try {
        if (this.searchQuery.trim() === "") {
          this.searchResults = [];
          return;
        }

        const q = query(
          collection(db, "users"),
          where("nickname", "==", this.searchQuery)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          this.searchResults = [];
          return;
        }

        this.searchResults = querySnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        console.error("Error searching user:", error);
      }
    },
    redirectToUser(user) {
      this.$router.push({
        name: "UserProfile",
        params: { userId: user.userId },
      });
    },
  },
};
</script>

<style lang="scss">
.search-user {
  display: flex;
  flex-direction: column;
  &__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__input {
    width: 80%;
    border: 0.0625rem solid #000;
    border-radius: 0.5rem 0 0 0.5rem;
    border-right: none;

    padding: 0.3125rem;
  }

  &__wrapper {
    display: flex;
    width: 100%;

    cursor: pointer;
  }
}

.search-button {
  width: 20%;
}

.search-user__result {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &-message {
    font-weight: 600;
    font-size: 14px;
    color: #000;
  }
}

.search-user__users {
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
}

.search-user__user {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  padding: 0.3125rem;
  background-color: #fff;
  border-radius: 8px;
  border: 0.0625rem solid #000;

  &-avatar {
    width: 30px;
    height: 30px;
  }

  &-nickname {
    font-size: 14px;
    color: #000;
    font-weight: 900;
  }
}
</style>
