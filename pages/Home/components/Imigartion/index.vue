<!-- @format -->

<template>

</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    range(start, end) {
      return Array.from({ length: end - start + 1 }, (v, k) => k + start);
    },
    async init() {
      await homeGet(
        `/home-companies?la=${localStorage.getItem(
          'la',
        )}&lo=${localStorage.getItem('lo')}`,
      ).then((response) => {
        if (response.status) {
          this.data = response.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
