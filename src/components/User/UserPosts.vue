<template>
  <div class="user-posts" v-if="!posts">loading</div>
  <div class="user-posts" v-if="posts">
    <div class="user-posts__posts">
      <div
        v-for="post in getReversedPosts"
        :key="post.id"
        class="user-posts__post"
      >
        <p class="user-posts__post-content">{{ post.content }}</p>
        <div class="user-posts__post-wrapper">
          <p class="user-posts__post-date">{{ post.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-posts",
  props: {
    posts: {
      type: Array,
      required: false,
    },
  },

  computed: {
    getReversedPosts() {
      return this.posts.slice().reverse();
    },
  },
};
</script>

<style lang="scss">
.user-posts {
  width: 100%;
  max-width: 59rem;
}
.user-posts__posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.user-posts__post-wrapper {
  display: flex;
  flex-direction: column;

  align-self: flex-end;
}
.user-posts__post {
  position: relative;
  border-radius: 8px;
  padding: 2.1875rem 0.625rem 0.625rem;
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

.user-posts__button--like {
  cursor: pointer;
  position: absolute;
  top: 0.3125rem;
  right: 1.5625rem;
}
</style>
