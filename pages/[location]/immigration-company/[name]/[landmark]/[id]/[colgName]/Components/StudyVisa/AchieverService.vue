<!-- @format -->
<template>
<div v-if="listingAchievers?.length > 0" class="achievers_box pt-[50px] relative">
    <h3 class="title_25-achiever text-[22px] sm:text-[24px] md:text-[26px] lg:text-[30px]">Achiever</h3>
    <Carousel :value="listingAchievers" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
            <div style="margin-inline: 6px;" class="cmp_achievers_box_slider_inner relative">
                <div @click="openAchieverPopup(slotProps.data)" class="cmp_achievers_section_img">
                    <div class="cmp_achievers_singlr">
                        <img :src="slotProps.data.image" alt="achievement-img" />
                    </div>

                    <!-- Gradient Overlay -->
                    <div
                        class="absolute inset-0 rounded-[12px]"
                        style="background: linear-gradient(0deg, rgba(255, 178, 64, 0.08), rgba(255, 178, 64, 0.08)), 
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
const props = defineProps({
    listingAchievers: {
    type: Array,
    required: true
  }
});

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
import AchieverPopup from '../../../../NewComponents/AchieverPopup.vue';
//add comments
//test
//hello
export default {
    name: 'CompanyOverviews',
    components: { AchieverPopup },
    props: {
        listingAchievers: {
            type: Array,
            required: true,
        },
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
            service_id:null
        };
    },
    async mounted() {
        if (this.listingAchievers) {
            this.achievers=this.listingAchievers
           
        }
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
/* @import url('../style.css'); */

/* achiever css popup and in content */
.title_25-achiever{
  font-size: 30px;
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