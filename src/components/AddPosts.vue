<template>
  <div class="add-posts__container">
    <div class="add-posts">
      <form class="add-posts__form" @submit.prevent="submitPost">
        <textarea
          class="add-posts__form-input"
          placeholder="Type new post here"
          v-model="newPostContent"
          @input="handleInput"
        ></textarea>
        <app-button type="submit" class="app-button--add add-posts__form-button"
          >Add</app-button
        >
      </form>
    </div>

    <div class="add-posts__posts">
      <div v-for="post in reversedPosts" :key="post.id" class="add-posts__post">
        <p class="add-posts__post-content">{{ post.content }}</p>
        <div class="add-posts__post-wrapper">
          <p class="add-posts__post-date">{{ post.date }}</p>
          <div class="add-posts__button--delete">
            <img :src="trash" @click="showDeleteConfirmation(post.id)" />
          </div>
        </div>
      </div>
    </div>
    <confirm-delete-modal
      v-if="showModal"
      @delete="deletePost"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script>
import { auth, db } from "@/main";
import { onAuthStateChanged } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";

import AppButton from "@/Common/AppButton";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";

import trash from "@/assets/svg/trash-icon.svg";

export default {
  name: "add-posts",

  components: {
    AppButton,
    ConfirmDeleteModal,
  },

  data() {
    return {
      newPostContent: "",
      currentUser: null,
      posts: [],
      deletingPostId: null,
      showModal: false,
      trash,
    };
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.loadPosts();
      } else {
        this.currentUser = null;
        this.posts = [];
      }
    });
  },

  methods: {
    async loadPosts() {
      const userRef = doc(db, "users", this.currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.posts = userData.posts || [];
      } else {
        this.posts = [];
      }
    },

    async submitPost() {
      if (this.newPostContent.trim() === "") {
        return;
      }
      const userRef = doc(db, "users", this.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        let postsArray = userData.posts;

        if (!Array.isArray(postsArray)) {
          postsArray = [];
        }
        const newPost = {
          id: Date.now().toString(),
          content: this.newPostContent,
          date: new Date()
            .toLocaleString()
            .replace(/(.*)\D\d+/, "$1")
            .replace(/\//g, "."),
        };
        postsArray.push(newPost);
        await updateDoc(userRef, { posts: postsArray });
        this.loadPosts();
      }
      this.newPostContent = "";
    },

    showDeleteConfirmation(postId) {
      this.deletingPostId = postId;
      this.showModal = true;
    },

    async deletePost() {
      const index = this.posts.findIndex(
        (item) => item.id === this.deletingPostId
      );
      if (index !== -1) {
        this.posts.splice(index, 1);
        const userRef = doc(db, "users", this.currentUser.uid);
        await updateDoc(userRef, { posts: this.posts });
      }
      this.cancelDelete();
    },

    cancelDelete() {
      this.deletingPostId = null;
      this.showModal = false;
    },

    handleInput() {
      this.newPostContent =
        this.newPostContent.charAt(0).toUpperCase() +
        this.newPostContent.slice(1);
    },
  },

  computed: {
    reversedPosts() {
      return this.posts.slice().reverse();
    },
  },
};
</script>

<style lang="scss">
.add-posts__container {
  width: 100%;
  max-width: 59rem;
}

.add-posts {
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
}

.add-posts__form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
  &-button {
    align-self: flex-end;
  }
}

.add-posts__form-input {
  font-size: 18px;
  background-color: #eeeeee;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 0.875rem 0.625rem 4rem;
  padding-right: 0;
  resize: vertical;
  min-width: 58rem;
}

.add-posts__posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-posts__post-wrapper {
  display: flex;
  flex-direction: column;

  align-self: flex-end;
}

.add-posts__post {
  position: relative;
  border-radius: 8px;
  padding: 1.875rem 0.625rem 0.625rem;
  background-color: #fff;
  border: 0.0625rem solid #000;

  box-shadow: 0px 4px 7px #d9d9d9;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  max-width: 58rem;

  &-content {
    word-wrap: break-word;
    font-size: 16px;
    font-weight: 500;
  }

  &-date {
    color: #e5e5e5;
  }
}

.add-posts__button--delete {
  cursor: pointer;
  position: absolute;
  top: 0.3125rem;
  right: 0.3125rem;
}
</style>
