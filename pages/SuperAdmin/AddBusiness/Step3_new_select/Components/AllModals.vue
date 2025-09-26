<template>
  <div v-if="selectModal" class="modal" @click="closeModal">
    <div class="sidebar bg-white p-4 w-[400px]" @click.stop>

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">{{ currentCard?.title }}</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
      </div>


      <div v-for="(sub, index) in currentCard?.subcategories" :key="index" class="flex gap-4 items-center mb-2">
        <label class="custom-checkbox">
          <input type="checkbox" :checked="selected.includes(sub)" @change="toggleSub(sub)" />
          <span class="checkmark"></span>
          <span class="text-[#524b6b] text-[19px] leading-[125% ]">{{ sub }}</span>
        </label>

      </div>

      <div class="text-center">
        <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded" @click="submitSubs">Save & Exit</button>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      selectModal: false,
      currentCard: null,
      selected: []
    };
  },
  methods: {
    open(card) {
      this.currentCard = card;
      this.selected = [...card.selectedSubcategories];
      this.selectModal = true;
    },
    toggleSub(sub) {
      if (this.selected.includes(sub)) {
        this.selected = this.selected.filter(s => s !== sub);
      } else {
        this.selected.push(sub);
      }
    },
    submitSubs() {
      this.$emit('subCategorySelected', this.currentCard.value, this.selected);
      this.selectModal = false;
    },
    closeModal() {
      this.selectModal = false;
    }
  }
}

</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
}

.sidebar {
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox .checkmark {
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox input:checked~.checkmark {
  background-color: #ff5757;
  border-color: #ff5757;
}

.custom-checkbox .checkmark::after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked~.checkmark::after {
  display: block;
  left: 5px;
  top: 2px;
  width: 6px;
  height: 11px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
