<!-- @format -->

<template>
    <div class="fixed inset-0 bg-[#00000080] z-[1003]">
      <div
        class="bg-white w-[50%] max-[1400px]:w-[60%] max-[1200px]:w-[70%] max-[1000px]:w-[80%] max-[860px]:w-[75%] max-[767px]:w-[98%] absolute aspect-[1.4/1] max-[600px]:aspect-[1.4/0.9] max-[550px]:aspect-[1.4/1.1] max-[480px]:aspect-[1.4/1.4] max-[425px]:aspect-[1.4/1.8] max-[375px]:aspect-[1.4/2.5] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] rounded-xl px-[25px] py-[45px]"
        v-if="activeAwardData">
        <!-- Previous Button -->
        <div v-if="!(isMobile && showDetails)"
          class="btn-rounded cursor-pointer absolute top-[46%] left-[-80px] -translate-x-[5%] -translate-y-[5%] backdrop-blur-[40.116668701171875px]"
          @click="previousAward">
          <i class="bi bi-chevron-left text-white"></i>
        </div>
  
        <!-- Achiever Image and Information -->
        <div class="w-full h-[60%] relative mddawa-brkpt">
          <img class="h-[-webkit-fill-available] w-[-webkit-fill-available] object-cover rounded-xl"
            :src="activeAwardData?.image || '/img/webp/boy.webp'" alt="Achiever Image" />
          <img @click="toggleDetails" class="w-[24px] md:hidden first-crsr" src="/img/svg/info.svg" alt="" />
          <span class="text-[#F8FCFF] bg-[#FF5757] px-[10px] py-[5px] absolute top-[12px] left-[12px] rounded-sm">{{
            new Date(activeAwardData.date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
          }}
          </span>
          <div id="bg-back" class="rounded-xl w-[-webkit-fill-available]"></div>
        </div>
        <!-- Achiever Details -->
        <div v-if="!isMobile || (isMobile && showDetails)" class="px-[10px] pt-[20px] customcontent-rightside">
          <img v-if="isMobile" @click="toggleDetails" class="cursor-pointer-bck" src="/img/png/crossBack.png" alt='cross'>
          <span class="text-[#364045] font-[500] text-[25px]">{{
            activeAwardData.title || 'Customer Service Award Title and Name'
            }}</span>
          <p class="font-normal text-[#3C3C3C] text-[14px] pt-[10px] leading-7 cstaw-pargnr-class">
            {{
              activeAwardData.description ||
              `Striking pewter studded epaulettes silver zips inner drawstring waist
            channel urban edge single-breasted jacket. Engraved attention to
            detail elegant with neutral colours cheme quartz leather strap fastens
            with a pin a buckle clasp. Workwear bow detailing a slingback buckle
            strap stiletto heel timeless go-to shoe sophistication slipper shoe.
            Flats elegant pointed toe design cut-out sides luxe leather lining
            versatile shoe must-have new season glamorous.`
            }}
          </p>
        </div>
  
        <!-- Close Button -->
        <span @click="$emit('close')" class="cursor-pointer absolute top-[16px] right-[16px]"><img class="w-[16px]"
            src="/img/svg/closed.svg" alt="Close modal" /></span>
  
        <!-- Next Button -->
        <div v-if="!(isMobile && showDetails)"
          class="btn-rounded cursor-pointer absolute top-[46%] right-[-80px] -translate-x-[5%] -translate-y-[5%] backdrop-blur-[40.116668701171875px]"
          @click="nextAward">
          <i class="bi bi-chevron-right text-white"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AwardPopup',
    props: {
      awards: {
        type: Array,
        required: true,
        default: () => [],
      },
      awardData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isMobile: false,
        showDetails: false,
        activeAwardData: { ...this.awardData }, // Initialize with the passed awardData
        currentAwardIndex: 0, // Tracks the index of the current award
      };
    },
    mounted() {
      // Detect screen size on mount
      this.isMobile = window.innerWidth < 768;
      //window.addEventListener('resize', this.handleResize);
  
      // Initialize currentAwardIndex based on the passed awardData
      this.currentAwardIndex = this.awards.findIndex(
        (award) => award.id === this.awardData.id,
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
      nextAward() {
        if (this.currentAwardIndex < this.awards.length - 1) {
          this.currentAwardIndex++;
        } else {
          this.currentAwardIndex = 0; // Loop back to the first award
        }
        this.activeAwardData = {
          ...this.awards[this.currentAwardIndex],
        };
      },
      previousAward() {
        if (this.currentAwardIndex > 0) {
          this.currentAwardIndex--;
        } else {
          this.currentAwardIndex = this.awards.length - 1; // Loop to the last award
        }
        this.activeAwardData = {
          ...this.awards[this.currentAwardIndex],
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .break-line {
    border: 0.51px solid #e3e3e3;
    margin: 10px 20px;
  }
  
  .first-crsr {
    position: absolute;
    right: 20px;
    bottom: 12px;
    z-index: 10;
  }
  
  .cursor-pointer-bck {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
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
  
  @media screen and (max-width:767px) {
    .mddawa-brkpt {
      height: 565px;
    }
  
    .customcontent-rightside {
      width: auto;
      background-color: #fff;
      position: absolute;
      height: 375px;
      padding: 20px;
      bottom: 0;
      border-radius: 15px 15px;
      left: 25px;
      right: 25px;
    }
  
    .cstaw-pargnr-class {
      max-height: 250px;
      overflow-y: scroll;
      scrollbar-width: none;
    }
  }
  </style>
  