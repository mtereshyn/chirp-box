<template>
  <div class="user-card" v-if="!avatar">Loading...</div>
  <div class="user-card" v-if="avatar">
    <div class="user-card__image-wrapper">
      <img :src="avatar" alt="user avatar" class="user-card__image" />
    </div>
    <div class="user-card__text">
      <div class="user-card__text-name">
        <p class="user-card__text-name--first">{{ firstName }}</p>
        <p class="user-card__text-name--last">{{ lastName }}</p>
      </div>
      <p class="user-card__text-nickname">@{{ nickname }}</p>
    </div>
    <div class="user-card__counts">
      <p class="user-card__counts-followers">Followers: {{ followersCount }}</p>
      <p class="user-card__counts-following">Following: {{ followingCount }}</p>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";

export default {
  name: "user-card",

  data() {
    return {
      nickname: "",
      firstName: "",
      lastName: "",
      avatar: null,
      currentUser: null,
      followersCount: 0,
      followingCount: 0,
    };
  },

  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.currentUser = user;
        const userRef = doc(collection(db, "users"), user.uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          this.nickname = snapshot.data().nickname;
          this.firstName = snapshot.data().firstName;
          this.lastName = snapshot.data().lastName;
          this.avatar = snapshot.data().photoURL;
          this.firstName = snapshot.data().firstName;

          this.getFollowersCount();
          this.getFollowingCount();

          console.log(snapshot.data().following);
        }
      } else {
        this.currentUser = null;
      }
    });
  },
  methods: {
    async getFollowersCount() {
      const userRef = doc(collection(db, "users"), this.currentUser.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        const user = snapshot.data();
        if (user.followers) {
          this.followersCount = user.followers.length;
        }
      }
    },

    async getFollowingCount() {
      const userRef = doc(collection(db, "users"), this.currentUser.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        const user = snapshot.data();
        if (user.following) {
          this.followingCount = user.following.length;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 0.0625rem solid #000;
  padding: 0.8125rem 1.625rem 4.4375rem;

  min-width: 10.625rem;

  max-width: 10.625rem;
  max-height: 12.5rem;

  align-self: flex-start;

  border-radius: 0.625rem;

  &__image {
    max-width: 6.25rem;
  }
}

.user-card__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  &-name {
    display: flex;
    gap: 0.3125rem;

    &--first {
      font-weight: 400;
      font-size: 14px;
    }
    &--last {
      font-weight: 400;
      font-size: 14px;
    }
  }
  &-nickname {
    font-weight: 400;
    font-size: 14px;
    color: #595959;
  }
}

.user-card__counts {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 300;
  font-size: 10px;
  color: #000;
}

.user-card__counts-followers,
.user-card__counts-following {
  font-weight: bold;
}
</style>
