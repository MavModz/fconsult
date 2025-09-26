<template>
  <div class="">
    <Dialog v-model:visible="addAutomationModal" modal header="Lead Automation" :style="{ 'min-width': '80%' }"
      class="">
      <div class="card-body round-robin-modal-style">
        <div class="flex gap-[26px]">
          <div class="w-[20%] min-w-[290px]">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Select Automation Method</h5>
              </div>
              <div class="card-body">
                <div class="flex align-items-center pb-[10px]">
                  <RadioButton v-model="type" inputId="rr" name="pizza" value="round_robin" class="custom-radio" />
                  <!-- <RadioButton v-model="type" inputId="rr" name="pizza" value="round_robin" /> -->
                  <label for="rr" class="ml-2">Round Robin</label>
                </div>
                <div class="flex align-items-center  pb-[10px]">
                  <RadioButton v-model="type" inputId="rr" name="pizza" value="category_based" class="custom-radio" />
                  <!-- <RadioButton v-model="type" inputId="cb" name="pizza" value="category_based" /> -->
                  <label for="cb" class="ml-2">Category based</label>
                </div>
                <div class="flex align-items-center  pb-[10px]">
                  <RadioButton v-model="type" inputId="rr" name="pizza" value="source_based" class="custom-radio" />
                  <!-- <RadioButton v-model="type" inputId="sb" name="pizza" value="source_based" /> -->
                  <label for="sb" class="ml-2">Source Based</label>
                </div>
                <div class="flex align-items-center  pb-[10px]">
                  <RadioButton v-model="type" inputId="rr" name="pizza" value="frequency_based" class="custom-radio" />
                  <!-- <RadioButton v-model="type" inputId="fb" name="pizza" value="frequency_based" /> -->
                  <label for="fb" class="ml-2">Frequency Based</label>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[80%]" v-if="type == 'round_robin'">
            <div class="flex gap-[26px]">
              <div class="w-[33%] min-w-[230px]">
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Select Subadmins</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="i in users" class="list-group-item">
                        <Checkbox v-model="selectedNames" :inputId="i.value" name="employees" :value="i.value" />
                        {{ i.label }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-[33%] min-w-[240px]">
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Shorted Names</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="(i, index) in selectedNames.length" class="list-group-item">{{ i }} {{
                        getName(selectedNames[index]) }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[80%]" v-if="type == 'category_based' && services">
            <div class="flex gap-[26px] ">
              <div class="w-[33.3%] min-w-[200px]">
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Select Visa</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="i in services" class="list-group-item" @click="current_category = i.name"
                        :class="{ 'active': i.name == current_category }">
                        {{ i.name }} ({{ i.subadmins.length }})
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-[33.3%] min-w-[230px]" v-for="j in services" v-show="j.name == current_category">
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Select Subadmin</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="i in users" class="list-group-item">
                        <Checkbox v-model="j.subadmins" :inputId="i.label" name="employees" :value="i.value" />
                        {{ i.label }}
                        {{ i.subadmins }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-[33.3%] min-w-[200px]" v-for="j in services" v-show="j.name == current_category">
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Shorting</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="(i, index) in j.subadmins.length" class="list-group-item">{{ i }} {{
                        getName(j.subadmins[index]) }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[80%]" v-if="type == 'source_based' && source">
            <div class="flex gap-[26px]">
              <div class="w-[33%] min-w-[200px]">
                <div class="card">
                  <div class="card-header">
                    <h5>Select Visa</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="i in source" class="list-group-item" @click="current_source = i.sourcename"
                        :class="{ 'active': i.sourcename == current_source }">
                        {{ i.sourcename }} ({{ i.subadmins.length }})
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-[33%] min-w-[230px]" v-for="j in source" v-show="j.sourcename == current_source">
                <div class="card">
                  <div class="card-header">
                    <h5>Select Subadmin</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="i in users" class="list-group-item">
                        <Checkbox v-model="j.subadmins" :inputId="i.label" name="employees" :value="i.value" />
                        {{ i.label }}
                        {{ i.subadmins }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-[33%] min-w-[230px]" v-for="j in source" v-show="j.sourcename == current_source">
                <div class="card">
                  <div class="card-header">
                    <h5>Shorting</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="(i, index) in j.subadmins.length" class="list-group-item">{{ i }} {{
                        getName(j.subadmins[index]) }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[80%]" v-if="type == 'frequency_based'">
            <div class="flex gap-[26px] ">
              <div class="w-[33.5%] min-w-[230px]">
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Select Subadmins</h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li v-for="i in users" class="list-group-item">
                        <Checkbox v-model="frequencySelected" :inputId="i.value" name="employees" :value="i.value"
                          @change="test" />
                        {{ i.label }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div  class="w-[66.5%] min-w-[250px]">
                <div class="card">
                  <div class="card-bodys">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Subadmin</th>
                          <th scope="col">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="i in frequencyData">
                          <td>{{ getName(i.subadmin) }}</td>
                          <td><input type="number" v-model="i.percentage"></td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <center>
            <button class="btn btn-primary m-4" @click="submit">Submit</button>
          </center>
        
      </div>
    </Dialog>
  </div>
</template>

<script>
import subadmin from '~/middleware/subadmin';

definePageMeta({ layout: 'admin', middleware: ['admincrm'] });
export default {
  data() {
    return {
      finalData: null,
      type: null,
      loading: false,
      addAutomationModal: false,
      employees: null,
      selectedNames: [],
      selectedVisa: [],
      current_visa: null,
      current_category: null,
      current_source: null,
      checked: true,
      settings: {},
      services: null,
      users: null,
      source: null,
      frequency: null,
      frequencySelected: [],
      frequencyData: null,
    };
  },
  async mounted() {
    this.services = (await adminGet(`/company-services`)).data.data.map(i => ({ name: i?.service, subadmins: [], current: 0 }));
    const c = (await adminGet(`/all-employe`)).data
    this.users = c.emp.map((i) => ({ label: i.user_id.name, value: i.user_id._id, }));
    this.frequency = c.emp.map((i) => ({ label: i.user_id.name, value: i.user_id._id, }));
    this.source = (await adminGet(`/leadsource`)).data.leadsource.map((i) => ({ sourcename: i.sourcename, value: i._id, subadmins: [], current: 0 }));
  },
  methods: {
    test() {
      this.frequencyData = []
      for (let i in this.frequencySelected) {
        this.frequencyData.push({ subadmin: this.frequencySelected[i], total_assigned: 0, percentage: 0 })
      }
    },
    async submit() {
      let data = {}
      switch (this.type) {
        case 'round_robin': {
          if (this.selectedNames.length == 0) {
            errorAlert("Please select subadmins...")
            return
          }
          data = { type: this.type, roundRobin: { subadmins: this.selectedNames } }
        }; break; case 'category_based': {
          for (let i in this.services) {
            if (this.services[i].subadmins.length == 0) {
              errorAlert("Please select subadmins in each category...")
              return
            }
          }
          data = { type: this.type, categoryBased: { subadmins: this.services } }
        }; break; case 'source_based': {
          for (let i in this.source) {
            if (this.source[i].subadmins.length == 0) {
              errorAlert("Please select subadmins in each source...")
              return
            }
          }
          data = { type: this.type, sourceBased: { subadmins: this.source } }
        }; break; case 'frequency_based': {
          let sum = 0;
          for (let i in this.frequencyData) {
            sum += this.frequencyData[i].percentage
            if (this.frequencyData[i].percentage == 0) {
              errorAlert("Please enter percentage for each subadmin...")
              return
            }
          }
          if (sum != 100) {
            errorAlert("Sum of percentage should be 100...")
            return
          }
          data = { type: this.type, frequencyBased: { subadmins: this.frequencyData } }
        }; break; default: {
          errorAlert("Please select a method...")
        }
      }
      this.finalData = data
      this.addAutomationModal = false
    },
    getName(id) {
      for (let i in this.users) {
        if (this.users[i].value == id) {
          return this.users[i].label;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url('style.css');

::v-deep(.custom-radio .p-radiobutton-box) {
  border: 2px solid #ff5757 !important;
  border-radius: 50%;
  box-shadow: none;
}
</style>