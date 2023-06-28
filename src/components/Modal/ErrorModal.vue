<template>
  <transition name="modal">
    <div class="error-modal-mask">
      <div class="error-modal-wrapper">
        <div class="error-modal-container">
          <modal-header>Errors</modal-header>
          {{ this.ErrorMessage }}
          <app-button @click="$emit('close')">Close</app-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeader from "@/layout/ModalText/ModalHeader";
import AppButton from "@/Common/AppButton";

export default {
  nmae: "error-modal",
  components: {
    ModalHeader,
    AppButton,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/mixins.scss";
.error-modal {
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
</style>
