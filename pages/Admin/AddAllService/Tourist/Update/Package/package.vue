<template>
  <div class="pricing-basic-container">
    <FormKit type="group" :value="x">
      <div class="pricing-basic-wrapper">
        <label style="padding-left: 12px;" for="">Select field type</label>
        <FormKit type="select" label="" @change="addOptions" :options="filteredOptions" />

        
        <div v-for="i in x">
          <Transportation v-if="i.type=='transportation'" :x="i" />
          <Transfer v-if="i.type=='transfer'" :x="i" />
          <Destination v-if="i.type=='destination'" :x="i" />
          <Accommodation v-if="i.type=='accommodation'" :x="i" />
          <Activities v-if="i.type=='activities'" :x="i" />
          <Custom v-if="i.type=='custom'" :x="i" />
        </div>
        
      </div>
    </FormKit>
  </div>
</template>

<script>
import Transportation from './Transportation.vue'
import Transfer from './Transfer.vue'
import Destination from './Destination.vue'
import Accommodation from './Accommodation.vue'
import Activities from './Activities.vue'
import Custom from './Custom.vue'
import test from './test.json'

export default {
  props: {
    x: [],
  },
  data() {
    return {
      opt: [],
      allOptions: ['Select Options','Transportation', 'Transfer', 'Destination', 'Accommodation', 'Activities', 'Custom'],
    };
  },
  mounted(){
  },
  computed: {
    // filteredOptions() {
    //   return this.allOptions.filter(option => !this.opt.includes(option));
    // },
    filteredOptions() {
      const existingTypes = this.x.map(item => item.type);
      return this.allOptions.filter(option => !existingTypes.includes(option.toLowerCase()));
    },
  },
  methods: {
    addOptions(event) {
      this.x.push(test[event.target.value])
      
      const value = event.target.value;
      if (value && !this.opt.includes(value)) {
        this.opt.push(value);
      }
    },
  },
  components: { Transportation, Transfer, Destination, Accommodation, Activities, Custom },
};
</script>

<style scoped>
@import url('./style.css');
.pricing-basic-wrapper .formkit-outer{
  max-width: 25%;
    padding-inline-start: 10px;
}
</style>
