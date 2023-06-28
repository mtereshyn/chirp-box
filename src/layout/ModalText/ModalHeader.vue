<template>
  <div class="modal-header"><slot /></div>
</template>

<script>
export default {
  name: "modal-header",
};
</script>

<style lang="scss">
.modal-header {
  font-size: 22px;
  font-weight: 500;
  color: #000;
}
</style>
