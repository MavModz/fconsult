<!-- @format -->

<template>
  
  <div class="fixed inset-0 bg-[#00000080] z-[1003]">
    <div
      class="custoom-parentclas-achvrpp bg-white fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-3xl"
      v-if="activeAchieverData">
      <!-- Previous Button -->
      <div v-if="!(isMobile && showDetails)"
        class="btn-rounded-left cursor-pointer absolute top-[46%] left-[-80px] -translate-x-[5%] -translate-y-[5%] backdrop-blur-[40.116668701171875px]"
        @click="previousAchiever">
        <i class="bi bi-chevron-left text-white"></i>
      </div>

      <!-- Achiever Image and Information -->
      <div class="right-sideim-rel relative">
        <div class="custom-classimagesize">
          <img class="h-[100%] w-[100%] object-cover rounded-3xl"
            :src="activeAchieverData?.image" alt="Achiever Image" />

        </div>
        <div
          class="absolute flex justify-between items-center bottom-[30px] px-[30px] translate-x-[0%] translate-y-[0%] w-[-webkit-fill-available]">
          
          <div class="flex flex-col gap-3">
            <span class="font-[500] text-white text-[25px]">{{
              activeAchieverData?.title 
              }}</span>
            <span class="text-[#D7DCE4] font-normal text-[14px]">
              {{
                activeAchieverData?.service_id?.service_name 
              }}
              - {{ activeAchieverData?.country  }}
            </span>
          </div>
          <img @click="toggleDetails" class="w-[24px] md:hidden first-crsr" src="/img/svg/info.svg" alt="" />
        </div>
      </div>

      <!-- Achiever Details -->
      <div v-if="!isMobile || (isMobile && showDetails)" class="customcontent-rightside relative">
        <img v-if="isMobile" @click="toggleDetails" class="cursor-pointer-bck" src="/img/png/crossBack.png" alt='cross'>
        <p class="font-semibold text-[#364045] text-[20px] mt-[20px]">
          {{
            activeAchieverData?.listing_id?.title 
          }}
        </p>
        <div class="break-line px-[20px]"></div>
        <span class="text-[#3C3C3C] font-semibold text-[16px]">Description</span>
        <!-- <p class="font-normal text-[#121416] text-[12px] leading-7 mt-[10px] customparag-details">
          {{
            activeAchieverData?.description?.slice(0, 620)
          }}
        </p> -->
        <p class="font-normal text-[#121416] text-[12px] leading-7 mt-[10px] customparag-details"
          v-html="activeAchieverData?.description?.slice(0, 620)"></p>
        <div class="custom-bottom-icncls">
          <div class="flex items-center gap-2">
            <img class="w-[25%]" src="/img/svg/degree.svg" alt="" />
            <div class="flex flex-col">
              <span class="text-[#48555B] font-[500]">{{
                activeAchieverData?.service_name || 'Service Name'
                }}</span>
              <span class="text-[#5E6F78] font-normal text-[13px]">{{
                activeAchieverData?.country || 'Country'
                }}</span>
            </div>
          </div>
          <img class="w-[8%]" src="/img/svg/ic.svg" alt="" />
        </div>
      </div>

      <!-- Close Button -->
      <span style="cursor: pointer;" @click="$emit('close')"
        class="cursor-pointer-closeall absolute top-[22px] right-[22px]">
        <img class="w-[16px]" src="/img/svg/closed.svg" alt="Close modal" />
      </span>

      <!-- Next Button -->
      <div v-if="!(isMobile && showDetails)"
        class="btn-rounded cursor-pointer absolute top-[46%] right-[-80px] -translate-x-[5%] -translate-y-[5%] backdrop-blur-[40.116668701171875px]"
        @click="nextAchiever">
        <i class="bi bi-chevron-right text-white"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchieverPopup',
  props: {
    achievers: {
      type: Array,
      required: true,
      default: () => [],
    },
    achieverData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMobile: false,
      showDetails: false,
      activeAchieverData: { ...this.achieverData }, // Initialize with the passed achieverData
      currentAchieverIndex: 0, // Tracks the index of the current achiever
    };
  },
  mounted() {
    // Detect screen size on mount
    this.isMobile = window.innerWidth < 768;
    //window.addEventListener('resize', this.handleResize);


    // Initialize currentAchieverIndex based on the passed achieverData
    this.currentAchieverIndex = this.achievers.findIndex(
      (achiever) => achiever.id === this.achieverData.id,
    );


  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    handleResize() {
      this.isMobile = window.innerWidth < 768;
    },
    nextAchiever() {
      if (this.currentAchieverIndex < this.achievers.length - 1) {
        this.currentAchieverIndex++;
      } else {
        this.currentAchieverIndex = 0; // Loop back to the first achiever
      }
      this.activeAchieverData = {
        ...this.achievers[this.currentAchieverIndex],
      };
    },
    previousAchiever() {
      if (this.currentAchieverIndex > 0) {
        this.currentAchieverIndex--;
      } else {
        this.currentAchieverIndex = this.achievers.length - 1; // Loop to the last achiever
      }
      this.activeAchieverData = {
        ...this.achievers[this.currentAchieverIndex],
      };
    },
  },
};
</script>

<style scoped>
.break-line {
  border: 0.51px solid #e3e3e3;
  margin: 10px 0px;
}

.right-sideim-rel {
  width: 50%;
  height: 600px;

}

.custoom-parentclas-achvrpp {
  display: flex;
  width: 50%;

}

.custom-classimagesize {
  width: -webkit-fill-available;
  height: 100%;
}

.customcontent-rightside {
  width: 50%;
  height: 600px;
  padding: 20px;

}

.custom-bottom-icncls {
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: space-between;
  width: 85%;
}

#bg-back {
  background: linear-gradient(0deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0) 43.63%);
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

.btn-rounded-left {
  border: 2.42px solid #fff5f566;
  width: fit-content;
  padding: 11px 15px;
  border-radius: 50%;

}

@media screen and (max-width:1400px) {
  .custoom-parentclas-achvrpp {
    width: 60%;

  }
}

@media screen and (max-width:1100px) {
  .custoom-parentclas-achvrpp {
    width: 75%;

  }
}

@media screen and (max-width:900px) {
  .custoom-parentclas-achvrpp {
    width: 80%;

  }
}

@media screen and (max-width:830px) {
  .custoom-parentclas-achvrpp {
    width: 82%;

  }
}

@media screen and (max-width:850px) {
  .btn-rounded {
    right: -64px;

  }

  .btn-rounded-left {
    left: -60px;
  }
}

@media screen and (max-width:767px) {
  .custoom-parentclas-achvrpp {
    flex-direction: column;
  }

  .right-sideim-rel {
    position: relative;
    width: 100%;
    height: 650px;
  }

  .customcontent-rightside {
    width: 100%;
    background-color: #fff;
    position: absolute;
    height: 500px;
    padding: 20px;
    bottom: 0;
    border-radius: 15px 15px;

  }

  .cursor-pointer-bck {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .cursor-pointer-closeall {
    position: absolute;
    left: 20px;

  }

  .customparag-details {
    max-height: 280px;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .btn-rounded-left {
    left: 0;
    z-index: 1000;
  }

  .btn-rounded {
    right: 0;
    z-index: 1000;
  }
}
</style>
