<!-- @format -->

<template>
  <div class="fixed inset-0 bg-[#00000080] z-[1003]">
    <div
      class="bg-white w-[30%] max-[1400px]:w-[60%] max-[1200px]:w-[70%] max-[1000px]:w-[80%] max-[860px]:w-[75%] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] rounded-xl mediacustom-popwdt"
      v-if="activeMediaData"
    >
      <!-- Previous Button -->
      <div
        class="btn-rounded cursor-pointer absolute top-[46%] left-[-80px] -translate-x-[5%] -translate-y-[5%] backdrop-blur-[40.116668701171875px]"
        @click="previousMedia"
      >
        <i class="bi bi-chevron-left text-white"></i>
      </div>

      <!-- Image Display -->
      <figure class="w-full h-full relative">
        <img
          class="h-[-webkit-fill-available] w-[-webkit-fill-available] object-cover rounded-xl"
          :src="activeMediaData?.url || '/img/webp/boy.webp'"
          alt="Media Image"
        />
        <div id="bg-back" class="rounded-xl w-[-webkit-fill-available]"></div>
        <div class="absolute px-[30px] bottom-[30px] text-[#D7DCE4]">
          <p class="font-normal">
            <!-- <span class="font-bold">Image alt description</span> -->
          </p>
        </div>
      </figure>

      <!-- Close Button -->
      <span
        @click="$emit('close')"
        class="cursor-pointer absolute top-[8px] right-[16px]"
        ><i class="bi bi-x text-white text-[40px]"></i
      ></span>

      <!-- Next Button -->
      <div
        class="btn-rounded cursor-pointer absolute top-[46%] right-[-80px] -translate-x-[5%] -translate-y-[5%] backdrop-blur-[40.116668701171875px]"
        @click="nextMedia"
      >
        <i class="bi bi-chevron-right text-white"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaPopup',
  props: {
    medias: {
      type: Array,
      required: true, // Array of media objects
    },
    startIndex: {
      type: Number,
      required: true, // The index at which the modal should start
    },
  },
  data() {
    return {
      activeMediaData: null, // Active media object
      currentMediaIndex: 0, // Initialize current index
    };
  },
  watch: {
    // Watch for changes in the startIndex and update activeMediaData accordingly
    startIndex: {
      immediate: true,
      handler(newIndex) {
        this.setActiveMedia(newIndex); // Set the active media as soon as startIndex changes
      },
    },
  },
  methods: {
    setActiveMedia(index) {
      this.currentMediaIndex = index;
      this.activeMediaData = { ...this.medias[this.currentMediaIndex] }; // Set active media based on the index
    },
    nextMedia() {
      if (this.currentMediaIndex < this.medias.length - 1) {
        this.currentMediaIndex++;
      } else {
        this.currentMediaIndex = 0; // Loop back to the first media
      }
      this.setActiveMedia(this.currentMediaIndex);
    },
    previousMedia() {
      if (this.currentMediaIndex > 0) {
        this.currentMediaIndex--;
      } else {
        this.currentMediaIndex = this.medias.length - 1; // Loop to the last media
      }
      this.setActiveMedia(this.currentMediaIndex);
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
.break-line {
  border: 0.51px solid #e3e3e3;
  margin: 10px 20px;
}

#bg-back {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 43.63%
  );
  height: -webkit-fill-available;
  position: absolute;
  top: 0;
}

.btn-rounded {
  border: 2.42px solid #fff5f566;
  width: fit-content;
  padding: 11px 15px;
  border-radius: 50%;
}
@media screen and (max-width:767px) {
  .mediacustom-popwdt{
    width: auto;
  }
}

</style>
