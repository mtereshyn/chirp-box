<template>
  <div class="user-profile__shell">
    <chirp-box-header />
    <div class="user-profile" v-if="user && isLoading">
      <div class="user-profile__container">
        <user-card-profile
          :user="user"
          :is-following="isFollowing"
          :followers-count="followersCount"
          :following-count="followingCount"
          @follow-user="followUser"
          @unfollow-user="unfollowUser"
        />
        <user-posts :posts="user.posts" />
      </div>
    </div>
  </div>
  <div class="user-profile__container" v-if="!user">loading</div>
</template>

<script>
import { db, auth } from "@/main";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

import UserCardProfile from "@/components/User/UserCardProfile";
import UserPosts from "@/components/User/UserPosts";

import ChirpBoxHeader from "@/components/ChirpBoxHeader";

export default {
  name: "user-profile",
  components: {
    ChirpBoxHeader,
    UserCardProfile,
    UserPosts,
  },
  data() {
    return {
      user: null,
      isFollowing: false,
      followersCount: 0,
      followingCount: 0,
      currentUser: null,
      isLoading: false,
    };
  },
  async mounted() {
    if (auth.currentUser) {
      this.currentUser = auth.currentUser;
    }

    await this.loadUser();
    await this.checkFollowingStatus();
    await this.getFollowersCount();
    await this.getFollowingCount();
    this.isLoading = true;
  },
  methods: {
    async loadUser() {
      try {
        const userId = this.$route.params.userId;
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          this.user = userDoc.data();
          await this.checkFollowingStatus();
        } else {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    },
    async checkFollowingStatus() {
      if (
        this.user &&
        this.currentUser &&
        this.user.followers &&
        this.user.followers.includes(this.currentUser.uid)
      ) {
        this.isFollowing = true;
      } else {
        this.isFollowing = false;
      }
    },
    async getFollowersCount() {
      if (this.user && this.user.followers) {
        this.followersCount = this.user.followers.length;
      }
    },
    async getFollowingCount() {
      if (this.user && this.user.following) {
        this.followingCount = this.user.following.length;
      }
    },
    async followUser() {
      const currentUserId = this.currentUser ? this.currentUser.uid : null;
      const targetUserId = this.user.userId;
      if (currentUserId === targetUserId) {
        return;
      }
      const currentFollowingDocRef = doc(db, "users", currentUserId);
      const targetUserDocRef = doc(db, "users", targetUserId);
      await Promise.all([
        updateDoc(currentFollowingDocRef, {
          following: arrayUnion(targetUserId),
        }),
        updateDoc(targetUserDocRef, {
          followers: arrayUnion(currentUserId),
        }),
      ]);
      this.isFollowing = true;
      this.followersCount++;
    },
    async unfollowUser() {
      const currentUserId = this.currentUser ? this.currentUser.uid : null;
      const targetUserId = this.user.userId;
      const currentFollowingDocRef = doc(db, "users", currentUserId);
      const targetUserDocRef = doc(db, "users", targetUserId);
      await Promise.all([
        updateDoc(currentFollowingDocRef, {
          following: arrayRemove(targetUserId),
        }),
        updateDoc(targetUserDocRef, {
          followers: arrayRemove(currentUserId),
        }),
      ]);
      this.isFollowing = false;
      this.followersCount--;
    },
  },
};
</script>

<style lang="scss">
.user-profile {
  padding: 1rem 4.125rem;
  &__container {
    background-color: #d2d3e3;
    border-radius: 1.0625rem;
    border: 0.0625rem solid #000;
    display: flex;
    gap: 1rem;

    padding: 3.25rem 3.5rem;
  }
}
</style>
