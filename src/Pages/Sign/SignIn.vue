<template>
  <div class="container">
    <chirp-box-header />
    <div class="sign-in__shell">
      <div class="sign-in">
        <section class="sign-in__left">
          <div class="sign-in__container">
            <div class="sign-in__wrapper">
              <form class="sign-in__form" @submit.prevent="login">
                <div class="sign-in__input-field__wrapper">
                  <label>Email</label>
                  <input
                    required
                    class="sign-in__input-field"
                    type="email"
                    v-model="email"
                  />
                </div>
                <div class="sign-in__input-field__wrapper">
                  <label>Password</label>
                  <input
                    required
                    class="sign-in__input-field"
                    type="password"
                    v-model="password"
                  />
                </div>
                <app-button type="submit" class="app-button--sign-in"
                  >Log In</app-button
                >
                <app-button
                  @click="redirect"
                  class="app-button app-button--sign-up"
                  >Sign Up</app-button
                >
              </form>
              <sign-in-modal
                :show-modal="showModal"
                v-if="showModal"
                @close="showModal = false"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/main.js";

import AppButton from "@/Common/AppButton";
import SignInModal from "@/components/Modal/SignInModal";
import ChirpBoxHeader from "@/components/ChirpBoxHeader";

export default {
  name: "sign-in",
  components: {
    AppButton,
    SignInModal,
    ChirpBoxHeader,
  },

  data() {
    return {
      email: "",
      password: "",
      showModal: false,
      errorMessage: "",
      images: [],
    };
  },

  methods: {
    async login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.showModal = true;
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage.value = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errorMessage.value = "No account with this email was found";
              break;
            case "auth/wrong-password":
              this.errorMessage.value = "Incorrect password";
              break;
            default:
              this.errorMessage.value = "Email or password is incorrect";
              break;
          }
        });
    },

    redirect() {
      this.$emit("redirect", this.images);
      this.$router.push("/sign-up");
    },
  },
};
</script>

<style lang="scss">
.chirp-box-header__container {
  margin: 0;
  padding: 0;
}
.sign-in__shell {
  padding: 1rem 4.125rem;
}
.sign-in {
  display: flex;
  background-color: #72cdfa;
  border-radius: 1.0625rem;
  border: 0.0625rem solid #000;
  justify-content: center;
}

.sign-in__left {
  padding: 5.625rem 3.125rem;
}

.sign-in__container {
  padding: 5rem 6.0625rem;

  background-color: #fff;

  border-radius: 0.8125rem;
  border: 0.0625rem solid #000;

  max-width: 31.75rem;
}

.sign-in__wrapper {
  min-width: 19.5625rem;
}

.sign-in__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sign-in__input-field {
  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  font-size: 18px;

  background-color: #eeeeee;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 0.875rem 0.625rem;
}

.app-button--sign-up {
  align-self: center;
  text-decoration: none;
  max-width: 14.375rem;
}

.app-button--sign-in {
  align-self: center;
  text-decoration: none;
  max-width: 14.375rem;
}
</style>
