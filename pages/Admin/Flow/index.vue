<template>
  <div class="pipeline-container">
    <div class="pipeline-header">
    </div>
    <div class="pipeline-header-wrapper">
      <div class="pipline-row12-container">
        <div class="pipeline-header-row1">
          <div class="pipe-header-logo">
            <img src="/img/png/pipeline.png" alt="logo" />
          </div>
          <h2>My Boards</h2>
        </div>
        <div class="pipeline-header-row2">
          <button class="pipeline-header-btn1" :class="{ active: activeTab === 'All' }"
            @click="setActiveTab('All')">All</button>
          <button class="pipeline-header-btn2" :class="{ active: activeTab === 'Events' }"
            @click="setActiveTab('Events')">Events</button>
          <button class="pipeline-header-btn3" :class="{ active: activeTab === 'Leads' }"
            @click="setActiveTab('Leads')">Leads</button>
          <button class="pipeline-header-btn4" :class="{ active: activeTab === 'Customer' }"
            @click="setActiveTab('Customer')">Customer</button>
        </div>
      </div>

      <div class="pipeline-header-row3">
        <input type="search" placeholder="Search-pipeline" />
        <i class="bi bi-search" id="search-bar"></i>
      </div>
    </div>

    <div class="pipeline-third-section-container">
      <div class="pipeline-third-section-wrapper">

        <div class="pipeline-section3-row1" @click="sidebar = true">
          <div class="pipeline-section3-border">
            <i class="bi bi-plus-circle" id="plus" data-bs-toggle="modal" data-bs-target="#postmodal"></i>
            <h2>Create new Flow</h2>
          </div>
        </div>

        <div class="pipeline-section3-row2" v-for="(item, index) in data" :key="index">
          <div class="pipeline-section3-row2-col1">
            <div class="pipeline-section3-row2-content">
              <h3 id="act">{{ item.pipeline_type }}</h3>
            </div>
            <div>
              <div class="your-events-1stbox-content-threedots" id="three-dots">
                <div class="dropdown">
                  <button class="action_btn" type="button" id="dots" data-bs-toggle="dropdown" aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon1"/>
                  </button>
                  <ul class="dropdown-menu" id="pipeline-drop">
                    <NuxtLink to="/admin/pipeline/view" class="drop-one"> <i class="bi bi-eye" id="eye"></i>View</NuxtLink>

                    <li class="drop-three" @click="hidden(index)"><i class="bi bi-power" id="power" </i>
                        <span v-if="item.is_active">Deactivate</span>
                        <span v-else>activate</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <div class="pipeline-section3-row2-col2">
            <span id="act-two" v-if="!item.is_active"></span>
            <span id="act-dot" v-else></span>

            <h2>{{ item.pipeline_name }}</h2>
          </div>

          <div class="pipline-deactivate" v-if="!item.is_active">
            <h2>DEACTIVATED</h2>
          </div>
          <div v-else class="pipeline-section3-row2-col3">
            <p>18 jun 2024, <span>2:00pm</span></p>
          </div>
          <div class="pipeline-section3-row2-col4">
            <div class="pipeline-section3-row2-col4-wrapper">
              <div class="pipeline-section3-row2-admin">
                <img src="/img/jpg/pro.jpg" alt="profile " />
              </div>
              <div class="pipeline-section3-row2-name">
                <p>Created by</p>
                <h5>{{ item.user_id }}</h5>
              </div>
            </div>
            <div v-if="!item.is_active" class="pipeline-card-delete">
              <i class="bi bi-trash3" id="del1"></i>
              <h3 id="del-tex">Delete</h3>
            </div>
            <div v-else class="pipeline-card-delete">
              <i class="bi bi-trash3" id="del"></i>
              <h3>Delete</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>


  <Sidebar v-model:visible="sidebar" header="Sidebar" position="right" :style="{'min-width': '350px'}">
       
    <FormKit type="form" @submit="submitForm"   ref="myForm"
      class="offcanvas-body-wrapper-pipline">
      <div>
        <span class="pipline-offcanvas-create">
          <p>Create Your Pipeline</p>
        </span>
        <span class="pipline-offcanvas-purpose">
          <p>For the purpose of industry regulation, your details are required.</p>
        </span>
        <span>
          <FormKit validation="required" class="pipline-offcanvas-create-input" type="text" placeholder="Pipeline System  Name"
            name="pipeline_name" />
        </span>
      </div>
      <div class="off-canvas-pipline-chse-top">
        <span class="pipline-choose-type-offcanvas">
          <p>Choose Pipeline Type</p>
        </span>

        <!-- <div class="pipline-off-cnvs-chedk-flx">
            <span>
              <input class="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1">
              <label for="styled-checkbox-1"></label>
            </span>
            <span class="pipline-offcanvas-lble-cls">
              <p>Pipeline for Leads</p>
            </span>
          </div> -->


        <div v-for="(pipeline, index) in pipelines" :key="index" class="pipline-off-cnvs-chedk-flx">
          <input @change="handleCheckboxChange(index)" class="styled-checkbox" :id="'styled-checkbox-' + (index + 1)"
            type="checkbox" v-model="pipeline.selectedpip" :values="pipeline.values">
          <label :for="'styled-checkbox-' + (index + 1)"></label>
          <span class="pipeline-offcanvas-lble-cls">
            <p>{{ pipeline.label }}</p>
          </span>
        </div>

        <!-- <div class="pipline-off-cnvs-chedk-flx">
            <span>
              <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value1">
              <label for="styled-checkbox-2"></label>
            </span>
            <span class="pipline-offcanvas-lble-cls">
              <p>Pipeline for Events</p>
            </span>
          </div>
          <div class="pipline-off-cnvs-chedk-flx">
            <span>
              <input class="styled-checkbox" id="styled-checkbox-3" type="checkbox" value="value1">
              <label for="styled-checkbox-3"></label>
            </span>
            <span class="pipline-offcanvas-lble-cls">
              <p>Pipeline for Customers</p>
            </span>
          </div> -->


      </div>
      <div class="off-canvas-pipline-padd-stages">
        <div class="pipline-offcanvas-stages">
          <span class="offcanvas-Stages-ofPipeline">
            <p>Stages of Pipeline</p>
          </span>
          <span @click="showLms">
            <img src="/img/png/pluspip.png" alt="">
          </span>
        </div>
        <!-- <div v-if="piplinr_varr" class="pipline-offcanvas-stages-dynamic">
            <div class="pipline-offcanvas-stages-dynamic-spn">
              <span class="pipline-offcanvas-stages-dynamic-scold"><p>{{ pipline_inpt }}</p></span>
              <span class="pipline-offcanvas-stages-dynamic-leads"><p v-for="i in selectedOptions" :key="i">{{ i }}</p></span>
            </div>
            <div class="pipline-offcanvas-stages-dynamic-imgs">
              <span><img src="/img/png/edtt.png" alt=""></span>
              <span><img src="/img/png/updn.png" alt=""></span>
            </div>
          </div> -->

        <div v-show="selectedTab">
          <div class="pipline-offcanvas-stages-inptdrpp">
            <div class="pipline-offcanvas-stages-inptt">
              <FormKit validation="required" class="pipline-offcanvas-stages-inptt-typee" type="text" placeholder="Type the Pipeline Name "
                name="stage" />
            </div>
            <div class="pipline-offcanvas-stages-dropdnwn">
              <div class="mb-3">
                <label class="pipline-offcanvas-stages-choosetheleads">Choose the Lead Status</label>
                <Multiselect mode="tags" :close-on-select="false" :searchable="true" :allow-absent="true"
                  placeholder="Select Countries" class="form-control" v-model="selectedOptions_status"
                  :options="value" />
              </div>
            </div>
          </div>
          <span>
            <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">Cancel</button>
            <button class="pipline-button-create-mybrd">Create My Board</button>
          </span>
        </div>
      </div>
    </FormKit>
  
    </Sidebar>

</template>

<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
<script>
import $ from 'jquery'
// import Multiselect from '@vueform/multiselect'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

export default {
  data() {
    return {
      sidebar: false,
      pipelines: [
        { label: 'Pipeline for Leads', values: 'leads', selectedpip: false },
        { label: 'Pipeline for Events', values: 'events', selectedpip: false },
        { label: 'Pipeline for Customers', values: 'customers', selectedpip: false }
      ],
      value: [
        { value: 'newLead', label: 'newLead' },
        { value: 'leads', label: 'leads' },
        { value: 'leads2', label: 'leads2' },
      ],
      selectedOptions: [],
      selectedOptions_status: [],
      data: [],
      selectedTab: false,
      activeTab: 'All',

    };
  },

  async mounted() {
    this.loading = true
    await this.initGet()
    this.loading = false
    activateMenu('Flow', "All Flows");
  },

  methods: {

    async hidden(index) {
      this.loading = true
      this.data[index].is_active = !this.data[index].is_active;
      const pipelineId = this.data[index]._id;
      const isActive = this.data[index].is_active;
      await adminPut(`/pipeline/${pipelineId}`, { is_active: isActive })
      this.initGet();
      this.loading = false
    },

    showLms() {
      this.selectedTab = true
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    handleCheckboxChange(index) {
      this.pipelines.forEach((pipeline, i) => {
        if (i !== index) {
          pipeline.selectedpip = false;
        }
      });
      const selectedPipeline = this.pipelines[index];
      if (selectedPipeline.selectedpip) {
        this.selectedOptions = [selectedPipeline.values];
      } else {
        this.selectedOptions = [];
      }
    },

    async submitForm(v) {
      v.lead_status = this.selectedOptions_status
      const selectedPipelines = this.pipelines.filter(pipeline => pipeline.selected).map(pipeline => pipeline.values);
      v.pipeline_type = this.selectedOptions[0]
      await adminPost(`/pipeline`, v)
      this.initGet();
    },

    async initGet() {
      await adminGet(`/pipelines`).then(response => {
        this.data = response.data.data
      })
    },
  },

  components: {
    Multiselect,

  },
}
</script>

<style scoped>
@import url('./style.css');;
</style>
