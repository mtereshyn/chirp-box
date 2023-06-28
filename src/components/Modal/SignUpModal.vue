<template>
  <transition name="modal">
    <div class="sign-in-modal-mask">
      <div class="sign-in-modal-wrapper">
        <div class="sign-in-modal-container">
          <modal-header>Sign Up</modal-header>
          <modal-body>Successfully Register</modal-body>
          <router-link class="link" @click="$emit('close')" to="/account"
            >Close</router-link
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeader from "@/layout/ModalText/ModalHeader";
import ModalBody from "@/layout/ModalText/ModalBody";

export default {
  nmae: "sign-in-modal",
  components: {
    ModalHeader,
    ModalBody,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/mixins.scss";
.sign-in-modal {
  &-mask {
    @include modal-mask;
  }
  &-wrapper {
    @include modal-wrapper;
  }
  &-container {
    @include modal-container;
  }
}

.link {
  text-decoration: none;
  color: #000;
  cursor: pointer;
}
</style>
