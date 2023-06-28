<template>
  <div class="chirp-box-account__shell">
    <chirp-box-header :is-logged-in="isLoggedIn" />
    <div class="chirp-box-account">
      <div class="chirp-box-account__container">
        <div class="chirp-box-account__wrapper">
          <user-card />
          <search-user />
        </div>
        <add-posts />
      </div>
    </div>
  </div>
</template>
<script>
import ChirpBoxHeader from "@/components/ChirpBoxHeader";
import UserCard from "@/components/User/UserCard";
import SearchUser from "@/components/SearchUser";
import AddPosts from "@/components/AddPosts";
export default {
  name: "chirp-box-account",
  components: { ChirpBoxHeader, SearchUser, UserCard, AddPosts },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.chirp-box-account {
  padding: 1rem 4.125rem;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__container {
    padding: 3.25rem 3.5rem;
    background-color: #feffca;
    border-radius: 1.0625rem;
    border: 0.0625rem solid #000;
    display: flex;
    gap: 1rem;
  }
}
</style>
