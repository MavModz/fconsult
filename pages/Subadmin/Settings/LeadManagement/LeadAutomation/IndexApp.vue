<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Lead Automation</span>
      <div class="custom">
        <span id="add-btn">{{ settings.leadAutomation ? 'on' : 'off' }}</span>
        <label class="switch"><input type="checkbox" v-model="settings.leadAutomation"
            @change="changeAutomation" /><span class="sliders round"></span></label>
      </div>
    </div>

    <div class="isActiveShow"></div>
    <div class="break-line"></div>

    <div :class="{ '': isLeadAutomation, 'd-none': !isLeadAutomation }">
      <LeadAutomation />
    </div>

    <div class="m-5" v-if="settings.loading || loading">
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
    </div>

    <div v-else v-if="settings.leadAutomation" class="overflow-auto" style="max-height: 410px">
      <div class="mt-5 lead-table">
        <div class="automation">
          <div class="auto-row">
            <div class="auto-col"></div>
            <div class="auto-col"><span>Automation Method</span></div>
          </div>
          <div class="auto-row">
            <div class="auto-col">
              <label class="containers">
                <Checkbox v-model="checked" :binary="true" />
              </label>
            </div>
            <div class="auto-col"><span>Round Robin</span></div>
          </div>
        </div>
        <div class="name">
          <div class="auto-row-name">
            <div class="auto-col border-zero auto-name"><span>Name</span></div>
          </div>

          <div class="auto-row-name" v-for="i of employees" :key="i._id">
            <div class="auto-col border-zero auto-checkbox">
              <label class="containers">
                <Checkbox v-model="selectedNames" :inputId="i._id" name="employees" :value="i._id" />
              </label>
            </div>
            <div class="auto-col border-zero auto-name">
              <span>{{ i.name }}</span>
            </div>
          </div>
        </div>

        <div class="selected-name">
          <div class="auto-row-name">
            <div class="auto-col border-zero"><span>Selected Names</span></div>
          </div>
          <div class="auto-row-name" v-for="i in selectedNames">
            <div class="auto-col border-zero">
              <span>{{ getName(i) }}</span>
            </div>
          </div>
        </div>
        <div class="sorting">
          <div class="auto-row-name">
            <div class="auto-col border-zero"><span>Sorting</span></div>
          </div>
          <div class="auto-row-name" v-for="(i, index) in selectedNames">
            <div class="auto-col border-zero">
              <span>{{ index + 1 }}</span>
            </div>
          </div>
        </div>
        <button @click="submitForm">
          <img src="/img/svg/save.svg" alt="" /><span>Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    settings: {},
  },
  data() {
    return {
      method: null,
      loading: false,
      employees: null,
      selectedNames: null,
      checked: true,
    };
  },
  async mounted() {
    if (this.settings.leadAutomation) {

      await this.getSubadmin();
      await this.init();
    }
  },
  methods: {

    async getSubadmin() {
      await subadminGet(`/all-employe`).then(async (response) => {
        this.employees = response.data.emp;
      });
    },
    async init() {
      await subadminGet(`/lead-settings`).then((response) => {
        console.log("hjghh",response.data)
        this.method = response.data.method;

        // ⚠️ Defensive check
        if (this.method && this.method.Round_Robin) {
          this.selectedNames = [...this.method.Round_Robin.subadmin_id]; // set pre-selected users
        } else {
          this.selectedNames = [];
        }

        this.checked = this.method.current_type === "Round_Robin"; // make sure toggle switch is set
      });
    },
 
  async submitForm() {
    this.loading = true;
    let d = { current_type: 'Round_Robin', subadmin_id: this.selectedNames };
    await subadminPost(`/update-lead-settings`, d).then(async (response) => {
    });
    this.loading = false;
  },
  getName(id) {
    for (let i in this.employees) {
      if (this.employees[i].user_id._id == id) {
        return this.employees[i].user_id.name;
      }
    }
  },
},
};
</script>

<style scoped>
@import url('style.css');
</style>
