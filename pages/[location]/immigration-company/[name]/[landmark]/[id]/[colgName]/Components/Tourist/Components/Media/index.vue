<template>
    <div v-if="data" class="containers">
      <figure v-for="(image, index) in data?.tourist?.images" :key="index">
        <img :src="image" :alt="image.alt" />
      </figure>
    </div>
  </template>


<script>

export default {
    data() {
        return {
        };
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    async mounted() {

    },
};
</script>

<style scoped>
@import url('./style.css');
</style>