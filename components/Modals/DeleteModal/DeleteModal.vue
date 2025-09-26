<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close-btn" @click="closeModal">×</button>
          </div>
          <div class="modal-body">
            <p class="modal-title">Are you sure you want to delete?</p>
            <p class="modal-description">
                Deleting this item will permanently remove it from your account. This action cannot be undone. 
            </p>
          </div>
          <div class="modal-footer">
            <button class="cancel-btn" @click="closeModal" :disabled="isLoading">Cancel</button>
            <button class="confirm-btn" @click="confirmAction" :disabled="isLoading">
              <span v-if="isLoading" class="spinner"></span>
              <span v-if="isLoading">Deleting...</span>
              <span v-else>Confirm</span>
            </button>
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
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close", "confirm"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmAction() {
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>