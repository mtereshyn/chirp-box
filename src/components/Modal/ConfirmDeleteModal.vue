<template>
  <transition name="modal">
    <div class="confirm-delete-modal-mask">
      <div class="confirm-delete-modal-wrapper">
        <div class="confirm-delete-modal-container">
          <modal-header>Do you agree to delete this post?</modal-header>
          <div class="button-container">
            <app-button class="app-button--delete" @click="$emit('delete')"
              >Delete</app-button
            >
            <app-button class="app-button--cancel" @click="$emit('cancel')"
              >Cancel</app-button
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeader from "@/layout/ModalText/ModalHeader";

export default {
  nmae: "confirm-delete-modal",
  components: {
    ModalHeader,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/mixins.scss";
.confirm-delete-modal {
  &-mask {
    @include modal-mask;
  }
  &-wrapper {
    @include modal-wrapper;
  }
  &-container {
    @include modal-container;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.button-container {
  display: flex;
  justify-content: space-between;
}
</style>
