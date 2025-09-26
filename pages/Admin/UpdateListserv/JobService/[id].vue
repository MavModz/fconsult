<template>
  <div class="stepper-container">
    <div class="step-header">
      <div v-for="(step, index) in steps" :key="index" class="step-wrapper">
        <div :class="['step', { active: activeStep === index + 1, completed: index + 1 < activeStep }]">
          {{ step.label }}
        </div>
        <div v-if="index < steps.length - 1" :class="['line', { filled: index + 1 < activeStep }]"></div>
      </div>
    </div>

    <div class="step-content">
      <component :is="currentComponent" :formData="formData" ref="currentChildComponent"
        @basicInfoSubmit="handleBasicInfoSubmit" @jobDetailsSubmit="handleJobDetailsSubmit"
        @submit="submitCurrentStep" />
    </div>

    <div class="step-navigation">
      <button class="prevs-stepperbtn" v-if="activeStep !== 1 && activeStep !== 4"
        @click="goToStep(activeStep - 1)">Previous</button>
      <button v-if="activeStep !== 4" class="" @click="submitCurrentStep">Next</button>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});
import BasicInfo from './BasicInfo/Basic.vue';
import JobDetails from './JobDetails/job.vue';
import PostJob from './PostJob/postJob.vue';
import PrevJob from './PrevJob/preview.vue';

export default {
  components: {
    BasicInfo,
    JobDetails,
    PostJob,
    PrevJob,
  },
  data() {
    return {
      singleListindId: null,
      activeStep: 1,
      steps: [
        { label: "1", component: "BasicInfo" },
        { label: "2", component: "JobDetails" },
        { label: "3", component: "PrevJob" },
        { label: "4", component: "PostJob" },
      ],
      formData: {
        basicInfoData: {
          coverImage: '',
          logoImage: '',
          country: '',
          title: '',
          position: '',
          address: '',
          total_employees: '',
        },
        jobDetailsData: {
          overview: '',
          jobCategory_name: '',
          document_url: '',
          employement_type: '',
          salary_range: {
            currency: '',
            start: '',
            end: '',
            duration: '',
          },
          tab: [],
        },

      },
    };
  },
  computed: {
    currentComponent() {
      return this.steps[this.activeStep - 1].component;
    },
  },
  async mounted() {
    activateSubmenu('b3', 'Update Work Visa',true);
    this.singleListindId = this.$route.params.id;
    await this.workDetails();
  },
  methods: {
    async workDetails() {
      try {
        if (this.singleListindId) {
          const res = await adminGet(`/company-listing/${this.singleListindId}`);
          const data = res.data.data;
          this.formData.basicInfoData = {
          country: data?.country,
          address: data?.address,
          title: data?.title,
          coverImage: data?.work?.cover_image,
          logoImage: data?.work?.logo,
          total_employees: data?.work?.total_employees,
          position: data?.work?.position,
        };

        this.formData.jobDetailsData = {
          overview: data?.overview,
          document_url: data?.work.document_url,
          employement_type: data?.work.employement_type,
          jobCategory_name: data?.work?.jobCategory_name,
          salary_range: data?.work?.salary_range,
          tab: data?.work?.tabs.map((tab) => ({
            name: tab.tabname,
            description: tab.overview,
          })),
        };

        } else {
          console.error("Listing ID is missing. Cannot fetch update data.");
        }
      } catch (e) {
        console.error("Error fetching update data:", e);
      }
    },
    goToStep(step) {
      if (step >= 1 && step <= this.steps.length) {
        this.activeStep = step;
      }
    },
    handleBasicInfoSubmit(data) {
      this.formData.basicInfoData = { ...this.formData.basicInfoData, ...data };

    },
    handleJobDetailsSubmit(data) {
      this.formData.jobDetailsData = { ...this.formData.jobDetailsData, ...data };
    },
    submitCurrentStep() {
      const child = this.$refs.currentChildComponent;
      if (child && typeof child.submitData === 'function') {
        child.submitData();
        if (child.isValid) {
          if (this.activeStep < this.steps.length) {
            this.goToStep(this.activeStep + 1);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.stepper-container {}

.step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
  height: auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0px 4.934579372406006px 19.738317489624023px 0px #1F1B2D1F;
}

.step-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
}

.step {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.step.active {
  background-color: #ff5757;
  color: #fff;
}

.step.completed {
  background-color: #ff5757;
  color: #fff;
}

.line {
  flex: 1;
  height: 2px;
  background-color: #ccc;
  transition: background-color 0.3s;
  margin: 0 10px;
}

.line.filled {
  background-color: #ff5757;
}

.step-content {
  /* padding: 20px; */
  border-radius: 5px;
}

.step-navigation {
  margin-top: 20px;
  display: flex;
  justify-content: end;
  column-gap: 20px;
  margin-top: 10px;
  width: 100%;
  height: auto;
  padding: 25px 40px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0px 4.934579372406006px 19.738317489624023px 0px #1F1B2D1F;
}

button {
  padding: 5px 25px;
  border: none;
  border-radius: 20px;
  background-color: #ff5757;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* button:hover:not(:disabled) {
  background-color: #fff;
  color: #ff5757;
  border: 1px solid #ff5757;
} */



.prevs-stepperbtn {
  padding: 5px 25px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  color: #ff5757;
  border: 1px solid #ff5757;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.prevs-stepperbtn:disabled {
  background-color: #fff;
  cursor: not-allowed;
}

/* .prevs-stepperbtn:hover:not(:disabled) {
  background-color: #ff5757;
  color: #fff;
  border: 1px solid #ff5757;
} */
</style>
