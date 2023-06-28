<template>
  <div class="sign-up__shell">
    <div class="sign-up">
      <section class="sign-up__left">
        <div class="sign-up__container">
          <div class="sign-up__wrapper">
            <form class="sign-up__form" @submit.prevent="register">
              <div class="sign-up__input-field__wrapper">
                <label>Nickname</label>
                <input
                  required
                  class="sign-up__input-field"
                  type="text"
                  v-model="formData.nickname"
                  placeholder="Come up your nickname"
                />
              </div>
              <div class="sign-up__input-field__wrapper">
                <label>First name</label>
                <input
                  required
                  class="sign-up__input-field"
                  type="text"
                  v-model="formData.firstName"
                  placeholder="Enter your first name"
                  @input="handleInputFirstName"
                />
              </div>
              <div class="sign-up__input-field__wrapper">
                <label>Last Name</label>
                <input
                  required
                  class="sign-up__input-field"
                  type="text"
                  v-model="formData.lastName"
                  placeholder="Enter your last name"
                  @input="handleInputLastName"
                />
              </div>
              <div class="sign-up__input-field__wrapper">
                <label>Email</label>
                <input
                  required
                  class="sign-up__input-field"
                  type="email"
                  v-model="formData.email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="sign-up__input-field__wrapper">
                <label>Password</label>
                <input
                  required
                  class="sign-up__input-field"
                  type="password"
                  v-model="formData.password"
                  placeholder="Сome up your password"
                />
              </div>
              <select-logo @select-avatar="handleSelectAvatar" />
              <app-button type="submit" class="app-button--sign-up"
                >Sign Up</app-button
              >
            </form>
            <sign-up-modal
              :show-modal="showModal"
              v-if="showModal"
              @close="showModal = false"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/main.js";
import { collection, doc, setDoc } from "firebase/firestore";

import AppButton from "@/Common/AppButton";
import SelectLogo from "@/Common/SelectLogo";
import SignUpModal from "@/components/Modal/SignUpModal";

import google from "@/assets/svg/google-icon.svg";

export default {
  name: "sign-up",
  components: {
    AppButton,
    SignUpModal,
    SelectLogo,
  },

  data() {
    return {
      areImagesLoading: false,
      formData: {
        nickname: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      selectedImageUrl: "",
      isDropdownOpen: false,
      google,
      showModal: false,
      images: [],
      errorMessage: "",
    };
  },

  methods: {
    async register() {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          this.formData.email,
          this.formData.password
        );

        const userId = user.uid;

        const userRef = doc(collection(db, "users"), user.uid);
        const selectedPhoto = this.selectedImageUrl;

        await setDoc(userRef, {
          userId: userId,
          nickname: this.formData.nickname,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          photoURL: selectedPhoto,
        });
        this.showModal = true;
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
    handleSelectAvatar(url) {
      this.selectedImageUrl = url;
    },
    handleInputFirstName() {
      this.formData.firstName =
        this.formData.firstName.charAt(0).toUpperCase() +
        this.formData.firstName.slice(1);
    },
    handleInputLastName() {
      this.formData.lastName =
        this.formData.lastName.charAt(0).toUpperCase() +
        this.formData.lastName.slice(1);
    },
  },
};
</script>

<style lang="scss">
.chirp-box-header__container {
  margin: 0;
  padding: 0;
}
.sign-up__shell {
  padding: 1rem 4.125rem;
}
.sign-up {
  display: flex;
  justify-content: center;
  background-color: #feffba;
  border-radius: 1.0625rem;
  border: 0.0625rem solid #000;

  &__logo {
    width: 20px;
    height: 20px;
  }
}

.sign-up__left {
  padding: 5.625rem 3.125rem;
}

.sign-up__container {
  padding: 5rem 6.0625rem;

  background-color: #fff;

  border-radius: 0.8125rem;
  border: 0.0625rem solid #000;

  max-width: 31.75rem;
}

.sign-up__wrapper {
  min-width: 19.5625rem;
}

.sign-up__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sign-up__input-field {
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

.select-field {
  position: relative;
}
.select-image {
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.field {
  padding: 0;

  padding: 0.3125rem 0.3125rem;
}

.dropdown {
  position: absolute;
  display: flex;
  gap: 0.3125rem;
  padding: 0;

  padding: 0.3125rem 0.3125rem;
}
</style>
