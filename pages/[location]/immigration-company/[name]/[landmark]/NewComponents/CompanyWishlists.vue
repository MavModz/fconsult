<!-- @format -->

<template>
  <div class="" v-if="data?.isLogged">
    <a v-if="!wish" @click="addWishlists" class="ms-auto"><img src="/img/svg/bookmark.svg" alt="" />Bookmarks</a>
    <a v-else @click="removeWishlists" class="ms-auto"><img src="/img/svg/bookmark2.svg" alt="" />Bookmark</a>
  </div>
  <div class="" v-else>
    <a @click="this.$router.push('/auth/login')"
      class="ms-auto d-flex align-items-center gap-2 bg-white text-[#1F1B2D] text-[14px] font-bold shadow w-fit px-2.5 py-2 rounded-[25px]"><span
        class="span-bookmark-bg bg-[#FD31311A] rounded-full px-[10px] py-[8px]"><i
          class="bi bi-bookmark actuall-book"></i></span>Bookmark</a>
  </div>
</template>
<script>
export default {
  name: 'CompanyWishlists',
  data() {
    return {
      wish: false,
      data: useNuxtApp(),
    };
  },
  async mounted() {
    if (this.data?.isLogged) {
      await userGet(`/check-wishlist/${this.$route.params.id}`).then(
        (response) => {
          if (response.data.status) {
            this.wish = true;
          } else {
            this.wish = false;
          }
        },
      );
    }
  },
  methods: {
    async addWishlists() {
      let x = await userGet(`/add-user-wishlist/${this.$route.params.id}`);

      this.wish = true;
    },
    async removeWishlists() {
      await userDelete(`/remove-user-wishlist/${this.$route.params.id}`);
      this.wish = false;
    },
   
  },
};
</script>

<style scoped>
@import url('../style.css');

.span-bookmark-bg {
  position: relative;
}

.actuall-book {
  color: red;
}
</style>
