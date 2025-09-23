<template>
    <div class="card-list-top-header flex flex-col gap-8">
      <div class="category-title-area" style="margin-top: 20px;">
        <h3> Popular {{ title }} Assistance in {{ city }}</h3>
      </div>
      <div class="result-info-wrapper flex items-center justify-between">
        <div class="sorting-area flex items-center gap-3">
          <span class="flex gap-1 items-center min-w-[73px]">
            <NuxtImg src="/svg-new-img/align-left.svg" width="18" height="18" />
            Sort By:
          </span>
          <!-- Use v-bind for modelValue and listen for update -->
          <Dropdown
            :modelValue="internalSortingModel"
            @update:modelValue="onUpdateSortingModel"
            :options="sortingOptions"
            optionLabel="name"
            class="sorting-wrapper"
            placeholder="Popular"
          />
        </div>
        <div class="card-head-count">
          <span class="flex gap-1 items-center justify-center"> <NuxtImg src="/svg-new-img/circle.svg" width="20" height="20"/> {{ resultsCount }} results</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Dropdown from 'primevue/dropdown';
  
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      resultsCount: {
        type: Number,
        required: true,
      },
      sortingModel: {
        type: Object,
        required: true,
      },
      sortingOptions: {
        type: Array,
        required: true,
      },
    },

    data() {
      return {
        city: "",
      }
    },
    methods: {
      async fetchLocation() {
        try {
          const myLocation = useCookie('city');
          this.city = myLocation;
        } catch (error) {
          console.error('Error while fetching location', error);
        }
      }
    },
    mounted() {
      this.fetchLocation()
    },
    computed: {
      internalSortingModel: {
        get() {
          return this.sortingModel;
        },
        set(value) {
          this.$emit('update:sortingModel', value); // Emit the event to update the parent
        }
      }
    },
    components: {
      Dropdown,
    },
  };
  </script>
  
  <style scoped>
  @import url('./style.css');
  </style>
  