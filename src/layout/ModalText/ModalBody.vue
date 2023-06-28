<template>
  <div class="modal-body"><slot /></div>
</template>

<script>
export default {
  name: "modal-body",
};
</script>

<style lang="scss">
.modal-body {
  font-size: 18px;
  color: #04f20c;
  font-weight: 300;
}
</style>
