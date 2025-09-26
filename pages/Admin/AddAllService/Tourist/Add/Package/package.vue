<template>
  <div class="pricing-basic-container">
    <FormKit type="group" :value="localX">
      <div class="pricing-basic-wrapper">
        <label style="padding-left: 12px;" for="">Select field type</label>
        <FormKit type="select" v-model="selectedOption" label="" @change="addOptions" :options="allOptions" />

        <div v-for="(i, index) in localX" :key="i.uid">
          <button @click="removeItem(index)">Remove</button>
          <Transportation v-if="i.type == 'transportation'" :x="i" @update:x="val => updateItem(index, val)" />

          <Transfer v-if="i.type == 'transfer'" :x="i" />
          <Destination v-if="i.type == 'destination'" :x="i" />
          <Accommodation v-if="i.type == 'accommodation'" :x="i" />
          <Activities v-if="i.type == 'activities'" :x="i" />
          <Custom v-if="i.type == 'custom'" :x="i" />
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
import cloneDeep from 'lodash/cloneDeep'
import { v4 as uuidv4 } from 'uuid'; 

export default {
  props: {
    x: [],
  },
  emits: ['update:x'],
  data() {
    return {
      localX: [],
      opt: [],
      selectedOption: 'Select Options',
      allOptions: ['Select Options', 'Transportation', 'Transfer', 'Destination', 'Accommodation', 'Activities', 'Custom'],
      items: []
    };
  },
  watch: {
    x: {
      handler(val) {
        this.localX = cloneDeep(val); // keep local copy in sync
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    // filteredOptions() {
    //   return this.allOptions.filter(option => !this.opt.includes(option));
    // },
  },
  methods: {
    // addOptions(event) {
    //   this.x.push(test[event.target.value])

    //   const value = event.target.value;
    //   if (value && !this.opt.includes(value)) {
    //     this.opt.push(value);
    //   }
    // },

    // addOptions() {
    //   const type = this.selectedOption;
    //   console.log(type)
    //   if (type !== 'Select Options' && test[type]) {
    //     this.x.push(test[type]); // Add from test.json
    //     console.log("this.x",this.x)
    //     this.selectedOption = 'Select Options'; // Reset select box
    //   }

    // },


addOptions() {
  const type = this.selectedOption;
  if (type !== 'Select Options' && test[type]) {
    const newItem = cloneDeep(test[type]);
    newItem.uid = uuidv4(); // 👈 Add unique ID for reactivity tracking
    this.localX.push(newItem);
    this.$emit('update:x', this.localX);
    this.selectedOption = 'Select Options';
  }
}
,
removeItem(index) {
  this.localX.splice(index, 1);
  this.$emit('update:x', this.localX);
},

updateItem(value, index) {
  this.localX.splice(index, 1, value);
  this.$emit("update:x", this.localX);
}


  },
  components: { Transportation, Transfer, Destination, Accommodation, Activities, Custom },
};
</script>

<style scoped>
@import url('./style.css');

.pricing-basic-wrapper .formkit-outer {
  max-width: 25%;
  padding-inline-start: 10px;
}
</style>
