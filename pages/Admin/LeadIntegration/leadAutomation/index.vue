<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Lead Automation</span>
      <div class="custom">
        <span id="add-btn">{{ settings?.leadAutomation ? 'on' : 'off' }}</span>
        <label class="switch"><input type="checkbox" v-model="leadAutomation" @change="changeAutomation" />
          <span class="sliders round"></span></label>
      </div>
    </div>

    <div class="isActiveShow"></div>
    <div class="break-line"></div>

    <div class="mt-5 lead-table" v-if="settings?.leadAutomation && settings2">
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

      <div class="automation" v-if="settings2[0]?.children?.length > 0">
        <div class="auto-row">
          <div class="auto-col"><span>Select Team</span></div>
        </div>
        <div class="auto-row">
          <div class="auto-col">
            <select name="" id="" v-model="team">
              <option :value="index" v-for="(i, index) in settings2[0].children">{{ i.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="automation" v-if="team >= 0 && settings2[0].children[team].children.length > 0">
        <div class="auto-row">
          <div class="auto-col"><span>Select Sub Team</span></div>
        </div>
        <div class="auto-row">
          <div class="auto-col">
            <select name="" id="" v-model="subteam">
              <option :value="index" v-for="(i, index) in settings2[0].children[team].children">{{ i.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div
        v-if="subteam >= 0 && settings2[0].children[team].children.length > 0 && settings2[0].children[team].children[subteam].children.length > 0"
        class="name">
        <div class="auto-row-name">
          <div class="auto-col border-zero auto-name"><span>Name</span></div>
        </div>

        <div v-if="subteam >= 0" class="auto-row-name"
          v-for="i of settings2[0].children[team].children[subteam].children" :key="i._id">
          <div class="auto-col border-zero auto-checkbox">
            <label class="containers">
              <!-- {{ i.user_id }} -->
              <Checkbox v-model="selectedNames" :inputId="i.user_id._id" name="employees" :value="i.user_id._id" />
            </label>
          </div>
          <div class="auto-col border-zero auto-name">
            <span>{{ i.user_id.name }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="subteam >= 0 && settings2[0].children[team].children.length > 0 && settings2[0].children[team].children[subteam].children.length > 0"
        class="selected-name">
        <div class="auto-row-name">
          <div class="auto-col border-zero"><span>Selected Names</span></div>
        </div>
        <div class="auto-row-name" v-for="i in selectedNames">
          <div class="auto-col border-zero">
            <span>{{ getName(i) }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="subteam >= 0 && settings2[0].children[team].children.length > 0 && settings2[0].children[team].children[subteam].children.length > 0"
        class="sorting">
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
    <!-- </div> -->
  </div>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {

  data() {
    return {
      method: null,
      loading: false,
      employees: null,
      selectedNames: null,
      checked: true,
      settings: {},
      settings2: null,
      team: -1,
      subteam: -1,
    };
  },
  async mounted() {
    activateSubmenu('l3', 'Lead Automation', true);
    await this.getSubadmin();
    await this.initi();
    await this.init();

  },
  computed: {
    leadAutomation: {
      get() {
        return this.settings?.leadAutomation || false;
      },
      set(value) {
        if (this.settings) {
          this.settings.leadAutomation = value;
        }
      },
    },
  },

  methods: {
    async changeAutomation() {
      if (this.employess !== null && this.employees.length > 0) {
        this.settings.loading = true;
        await adminPut(`/setting-update`, {
          leadAutomation: this.settings.leadAutomation,
        }).then((response) => { });
        this.settings.loading = false;
      } else {
        this.settings.leadAutomation = false;
        errorAlert("Add your employe")
      }
    },
    async initi() {
      this.settings.loading = true;
      await adminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      });
      await adminGet(`/company-hierarchy`).then(async (response) => {
        this.settings2 = response.data.data.hierarchy;
        this.settings2 = this.settings2.map((i) => ({
          type: '_id',
          user_id: i.user_id,
          subadmin_id: i.subadmin_id,
          level: i.level,
          _id: i._id,
          children: i.children || [],
        }));
      });
      this.settings.loading = false;
    },
    async getSubadmin() {
      await adminGet(`/all-employe`).then(async (response) => {
        this.employees = response.data.emp;
      });
    },
    async init() {
      await adminGet(`/lead-settings`).then(async (response) => {
        this.method = response.data.method;
        this.selectedNames = response.data.method.Round_Robin.subadmin_id;
      });
    },
    async submitForm() {
      this.loading = true;
      let d = { current_type: 'Round_Robin', subadmin_id: this.selectedNames };
      await adminPost(`/update-lead-settings`, d).then(async (response) => {
      });
      successAlert("Updated Lead Automation Succesfully")
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