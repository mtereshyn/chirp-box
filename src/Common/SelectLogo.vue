<template>
  <div class="select-field">
    <label>Logo</label>
    <app-button
      type="button"
      class="select-field__button"
      @click="toggleDropdown"
    >
      <div v-if="areImagesLoading">loading...</div>
      <img
        v-if="selectedImageUrl"
        :src="selectedImageUrl"
        alt="selected image"
        class="select-image"
      />
    </app-button>
    <div class="select-field__dropdown" v-if="isDropdownOpen">
      <app-button
        type="button"
        v-for="image in images"
        :key="image.id"
        @click="selectImage(image.url)"
      >
        <img :src="image.url" alt="logo image" class="select-image" />
      </app-button>
    </div>
  </div>
</template>

<script>
import { storage } from "@/main.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import AppButton from "@/Common/AppButton";
export default {
  name: "select-logo",
  components: {
    AppButton,
  },
  props: {},

  data() {
    return {
      images: [],
      selectedImageUrl: "",
      areImagesLoading: false,
      isDropdownOpen: false,
    };
  },

  async mounted() {
    await this.getImages();
    this.selectedImageUrl = this.images[0].url;
  },

  methods: {
    async getImages() {
      this.areImagesLoading = true;
      const storageRef = ref(storage, "/logo");
      const list = await listAll(storageRef);
      await Promise.all(
        list.items.map(async (l) => {
          const url = await getDownloadURL(l);
          this.images.push({ url });
          return url;
        })
      );
      this.areImagesLoading = false;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectImage(url) {
      this.$emit("select-avatar", url);
      this.selectedImageUrl = url;
      this.toggleDropdown();
    },
  },
};
</script>

<style lang="scss">
.select-field {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

.select-field__button {
  font-size: 18px;

  background-color: #eeeeee;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 0.875rem 0.625rem;
}

.select-field__dropdown {
  position: absolute;
  left: -25%;
  top: 10%;
  display: flex;
  gap: 0.3125rem;
  padding: 0;

  padding: 0.3125rem 0.3125rem;
}
</style>
