<script setup>
import BackendError from './pages/ExtraPages/BackendError/index.vue';
const props = defineProps({
  error: Object,
});
</script>

<template>
  <div>
    <div v-if="error?.statusCode === 500">
      <!-- <BackendError /> -->

        {{ error }}
    </div>
  </div>
</template>
