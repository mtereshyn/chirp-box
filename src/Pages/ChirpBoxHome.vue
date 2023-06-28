<template>
  <div class="chirp-box-home">
    <chirp-box-header :is-logged-in="isLoggedIn" />
    <div class="chirp-box-home__shell">
      <div class="chirp-box-home__container">
        <div class="chirp-box-home__wrapper">
          <div class="chirp-box-home__left">
            <h1 class="chirp-box-home__title">
              ChirpBox, <br />
              good to see you!!!
            </h1>
            <p class="chirp-box-home__text">
              Connect with friends, share your thoughts, and discover what's
              happening in the world. Our social network is the place to express
              yourself, engage in meaningful conversations, and stay updated
              with the latest trends and news.
            </p>
            <router-link class="chirp-box-home__link" to="/sign-in"
              >Log In</router-link
            >
          </div>
          <div class="chirp-box-home__right">
            <div class="chirp-box-home__user">
              <div class="chirp-box-home__user-image__wrapper">
                <img
                  :src="userLogo"
                  alt=""
                  class="chirp-box-home__user-image"
                />
              </div>
              <div class="chirp-box-home__user-text">
                <p class="chirp-box-home__user-name">ChirpBox</p>
                <p class="chirp-box-home__user-nickname">@chirpbox</p>
              </div>
            </div>
            <div class="chirp-box-home__message">
              <p class="chirp-box-home__message-text">Hello, how are you?</p>
              <div class="chirp-box-home__message-image__wrapper">
                <img
                  :src="userLogo"
                  alt="chirpbox avatar"
                  class="chirp-box-home__message-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChirpBoxHeader from "@/components/ChirpBoxHeader";

import userLogo from "@/assets/svg/first-user.svg";

export default {
  name: "chirp-box-home",
  components: { ChirpBoxHeader },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      userLogo,
    };
  },
};
</script>

<style lang="scss">
.chirp-box-home {
  &__shell {
    padding: 1rem 4.125rem;
  }
  &__container {
    padding: 5.5rem 3.25rem;
    background-color: #cdff7b;
    border: 1px solid #000000;
    border-radius: 17px;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-size: 43px;
    font-weight: 600;
    line-height: 52.42px;
    text-transform: uppercase;
  }

  &__text {
    font-size: 1.6875rem;
  }

  &__left {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3.75rem;
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;
  }

  &__link {
    background: #000;
    border: 2px solid #fff;
    border-radius: 45px;
    text-align: center;

    color: #fff;

    text-decoration: none;

    padding: 0.6875rem 5.625rem;

    align-self: center;
  }
}

.chirp-box-home__user {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f5f5f5;
  border: 1px solid #000000;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  padding: 4.375rem 4.5rem 3.125rem;

  &-image {
    width: 5.625rem;
    height: 5.625rem;
    &__wrapper {
      position: absolute;
      top: -2.8125rem;
    }
  }

  &-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &-name {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
  }

  &-nickname {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;

    color: #595959;
  }
}

.chirp-box-home__message {
  position: absolute;
  display: flex;
  align-items: center;

  gap: 0.5rem;

  background-color: #497ff3;
  border: 1px solid #000000;
  border-radius: 25px;

  bottom: 27%;
  left: 20%;

  padding: 0.3125rem 0.8125rem;

  &-text {
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
    color: #f5f5f5;
  }

  &-image {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
