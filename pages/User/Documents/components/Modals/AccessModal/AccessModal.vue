<template>
  <div v-if="isVisible" class="access-modal-overlay">
    <div class="access-modal-dialog">
      <div class="access-modal-content">
        <div class="access-modal-header">
          <button type="button" class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="access-modal-body">
          <NuxtImg src="" />
          <p class="access-modal-title">Access Granted</p>
          <p class="access-modal-description">
            You have Provided the Access to this document to the organization Selected Before
          </p>
        </div>
        <div class="access-modal-footer">
          <button class="confirm-btn" @click="confirmAction">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["confirm", "close"],
  methods: {
    confirmAction() {
      this.$emit("confirm");
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>