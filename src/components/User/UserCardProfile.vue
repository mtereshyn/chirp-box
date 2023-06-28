<template>
  <div class="user-card-profile" v-if="!user.photoURL"></div>
  <div class="user-card-profile" v-if="user.photoURL">
    <div class="user-card-profile__image-wrapper">
      <img
        :src="user.photoURL"
        alt="user avatar"
        class="user-card-profile__image"
      />
    </div>
    <div class="user-card-profile__text">
      <div class="user-card-profile__text-name">
        <p class="user-card-profile__text-name--first">{{ user.firstName }}</p>
        <p class="user-card-profile__text-name--last">{{ user.lastName }}</p>
      </div>
      <p class="user-card-profile__text-nickname">@{{ user.nickname }}</p>
    </div>

    <div class="user-card-profile__counts">
      <p class="user-card-profile__counts-followers">
        Followers: {{ followersCount }}
      </p>
      <p class="user-card-profile__counts-following">
        Following: {{ followingCount }}
      </p>
    </div>
    <div class="user-card-profile__follow" @click="toggleFollow">
      <app-button
        class="app-button--follow"
        v-if="!isFollowing"
        @click="followUser"
        >Follow</app-button
      >
      <app-button
        class="app-button--unfollow"
        v-if="isFollowing"
        @click="unfollowUser"
        >Unfollow</app-button
      >
    </div>
  </div>
</template>

<script>
import AppButton from "@/Common/AppButton";
export default {
  name: "user-card-profile",
  components: {
    AppButton,
  },
  props: {
    user: {
      type: Object,
      required: false,
    },
    followersCount: {
      type: Number,
      required: true,
    },
    followingCount: {
      type: Number,
      required: true,
    },
    isFollowing: {
      type: Boolean,
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    followUser() {
      this.$emit("follow-user");
    },
    unfollowUser() {
      this.$emit("unfollow-user");
    },
  },
};
</script>

<style lang="scss">
.user-card-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

.user-card-profile__text {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.user-card-profile__counts {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 300;
  font-size: 10px;
  color: #000;
}

.user-card-profile__counts-followers,
.user-card-profile__counts-following {
  font-weight: bold;
}
</style>
