<template>
  <button class="app-button" v-bind="$attrs"><slot /></button>
</template>

<script>
export default {
  name: "app-button",
};
</script>

<style lang="scss">
.app-button {
  border-radius: 0.5rem;
  border: 0.0625rem solid #000;

  cursor: pointer;

  max-width: 9.375rem;
  &--sign-in {
    background-color: #497ff3;
    color: #fff;
    padding: 0.5625rem 5.625rem;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    max-width: 14.375rem;
  }
  &--sign-up {
    background-color: #feffba;
    color: #000;
    padding: 0.5625rem 5.3125rem;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    max-width: 14.375rem;
  }
  &--add {
    background-color: #cdff7b;
    padding: 0.6875rem 3.125rem;
    align-self: flex-end;
  }

  &--delete {
    cursor: pointer;
    color: #fff;
    background-color: #ff0000;
    border-radius: 0.5rem;
    border: none;
    padding: 0.3125rem 0.625rem;
  }
  &--cancel {
    cursor: pointer;
    background-color: #e5e5e5;
    border-radius: 0.5rem;
    border: none;
    padding: 0.3125rem 0.625rem;
  }

  &--search {
    background-color: #fff;
    border: 0.0625rem solid #000;
    padding: 0.3125rem;
    width: 40px;
    height: 40px;
    border-radius: 0 0.5rem 0.5rem 0;
    border-left: none;
  }

  &--follow {
    text-align: center;
    color: #fff;
    background-color: #000;
    border: none;
    font-size: 10px;
    font-weight: 500;
    padding: 0.375rem 1.25rem;
    border-radius: 5px;
  }
  &--unfollow {
    text-align: center;
    color: #000;
    background-color: #e5e5e5;
    border: none;
    font-size: 10px;
    font-weight: 500;
    padding: 0.375rem 1.25rem;
    border-radius: 5px;
  }
}
</style>
