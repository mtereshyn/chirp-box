<template>
  <div class="world-feed__shell">
    <chirp-box-header />
    <div class="world-feed">
      <div v-if="isLoading">Loading...</div>
      <div v-else class="world-feed__container">
        <div
          v-for="post in sortedPosts"
          :key="post.id"
          class="world-feed__post"
        >
          <div class="world-feed__post-wrapper" @click="redirectToUser(post)">
            <img class="world-feed__post-image" :src="post.avatar" />
            <p class="world-feed__post-nickname">@{{ post.nickname }}</p>
          </div>
          <p class="world-feed-content">{{ post.content }}</p>
          <p class="world-feed-date">{{ post.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/main";
import { getDoc, doc } from "firebase/firestore";
import ChirpBoxHeader from "@/components/ChirpBoxHeader";

export default {
  components: { ChirpBoxHeader },
  name: "world-feed",
  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },
  computed: {
    sortedPosts() {
      return this.posts.slice().sort((a, b) => b.id.localeCompare(a.id));
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.loadPosts();
    this.isLoading = false;
  },
  methods: {
    async loadPosts() {
      try {
        const currentUser = auth.currentUser;
        const followingDoc = doc(db, "users", currentUser.uid);
        const followingSnapshot = await getDoc(followingDoc);

        if (followingSnapshot.exists()) {
          const followingData = followingSnapshot.data();
          const followingList = followingData.following || [];
          this.posts = [];
          for (const userId of followingList) {
            const userDoc = doc(db, "users", userId);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              const posts = userData.posts || [];

              posts.forEach((post) => {
                this.posts.push({
                  id: post.id,
                  content: post.content,
                  nickname: userData.nickname,
                  date: post.date,
                  avatar: userData.photoURL,
                  userId: userData.userId,
                });
              });
            }
          }
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    },
    redirectToUser(post) {
      this.$router.push({
        name: "UserProfile",
        params: { userId: post.userId },
      });
    },
  },
};
</script>

<style lang="scss">
.world-feed__shell {
  background: linear-gradient(180deg, #ffffff 0%, #497ff3 100%);
  min-height: 900px;
}
.world-feed__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.world-feed {
  padding: 1rem 18px;

  &__post {
    width: 100%;
    position: relative;
    border-radius: 30px;
    padding: 0.8125rem 1.125rem;
    background-color: #fff;
    border: 0.0625rem solid #000;

    box-shadow: 0px 4px 7px #d9d9d9;

    display: flex;
    flex-direction: column;
    gap: 10px;

    max-width: 58rem;

    &-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &-image {
      width: 50px;
      height: 50px;
    }

    &-nickname {
      color: rgba(0, 0, 0, 0.5);
      font-size: 17px;
    }
  }
  &-content {
    word-wrap: break-word;
    font-size: 16px;
    font-weight: 500;
  }

  &-date {
    color: #e5e5e5;
    align-self: flex-end;
  }
}
</style>
