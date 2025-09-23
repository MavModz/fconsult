<!-- @format -->
<template>
  <div v-if="achievers?.length > 0" class="achievers_box pt-[50px] relative">
    <h3 class="title_25-achiever text-[22px] sm:text-[24px] md:text-[26px] lg:text-[30px]">Testimonials of 
      {{ company }}
      {{company?.company_name }}
    </h3>
    <Carousel :value="achievers" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <div style="margin-inline: 6px; cursor: pointer;" class="cmp_achievers_box_slider_inner relative">
          <div @click="openAchieverPopup(slotProps.data)" class="cmp_achievers_section_img">
            <div class="cmp_achievers_singlr">
              <img :src="slotProps.data.image" alt="achievement-img" />
            </div>

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 rounded-[12px]" style="background: linear-gradient(0deg, rgba(255, 178, 64, 0.08), rgba(255, 178, 64, 0.08)), 
              linear-gradient(0deg, rgb(0 0 0 / 97%) 0%, rgba(0, 0, 0, 0) 43.63%);">
            </div>

            <!-- Achiever Details -->
            <div class="cmp_ttachievement-details absolute bottom-4 left-[10px]">
              <span class="text-[#f8fcff]">{{ slotProps.data.title }}</span>
              <p class="text-[#d7dce4] pt-2">{{ slotProps.data.date.split('T')[0] }}</p>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
  <AchieverPopup v-if="showAchieverModal" :achiever="selectedAchiever" @close="toggleAchieverPopup(false)"
    :achievers="achievers" :achieverData="achieverData" />

</template>
<script setup>
const props = defineProps(['achievers']);

const showAchieverModal = ref(false);
const selectedAchiever = ref(null);
const achieverData = ref(null);

const toggleAchieverPopup = (isVisible) => {
  showAchieverModal.value = isVisible;
};

const openAchieverPopup = (achiever) => {
  selectedAchiever.value = achiever;
  achieverData.value = achiever;
  showAchieverModal.value = true;
};

// Emit event to parent with achiever data
const emit = defineEmits(['achiever-click']);
</script>
<script>
import AchieverPopup from './AchieverPopup.vue';
export default {
  name: 'CompanyOverviews',
  components: { AchieverPopup },
  props: {
    achievers: {
      type: Array,
      required: true,
      default: () => [],
    },
    company: {},
    c: { type: Array, required: true },
  },
  data() {
    return {
      countries: null,
      detailModal: false,
      currentPosition: 0,
      currentMargin: 0,
      slidesPerPage: 0,
      slidesCount: 0,
      prevKeyActive: false,
      nextKeyActive: false,
      data: [],
      loading: true, // Initialize loading state as true to show the loader
      isActive: 0,
      applyModal: false,
      compid_click: null,
      items: [],
      selectedOption: null,
      showFullText: false,
      achievers: null,
      // Responsive options for PrimeVue Carousel
      responsiveOptions: [
        {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 1
        },
        {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
        }
      ],
      storeIdMount: null,
      storePermMount: null,
    };
  },
  async mounted() {
    
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;
    this.achievers = (
      await homeGet(`/home-company-achievers/${this.storePermMount}`)
    ).data.data;

  },

  methods: {
    showAchieverModal(type) {
      this.showAchiever = type;
    },
    onAchieverClick(achiever) {
      this.$emit('achiever-click', achiever); // Send the clicked achiever's data to parent
    },


  },
};
</script>
<style scoped>
@import url('../style.css');

/* achiever css popup and in content */
.title_25-achiever {
  font-weight: 700;
  color: #11142d;
  padding-block-end: 12px;
}

.cmp_achievers_singlr {
  height: 240.14px;
  width: -webkit-fill-available;
  border-radius: 12px;
}

.cmp_achievers_singlr img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.achvr-overfl-adjustm {
  overflow-x: auto;
  scrollbar-width: none;
}

/* ......................... */
</style>