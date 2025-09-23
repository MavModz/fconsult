<!-- @format -->

<template>
  <div class="educational-details-container">
    <div v-if="form.formFields.languages" class="primary-education-container">
      <div class="course-section">
        <div class="course-heading">
          <span class="fs-4 fw-semibold">Language Proficiency Details</span>
        </div>
        <button class="course-add-details" @click="addModal = true">+ Add Details
        </button>
      </div>
      <div class="education-course-details-pts">
        <div id="scrollableDiv" class="education-course-details" ref="scrollableDiv">
          <div class="education-course-details-conatiner-1" v-if="lead.languages" v-for="(i, index) in lead.languages">
            <div class="course-profile-heading">
              <div class="course-profile-name">
                <h5>{{ i.examination_name }}</h5>
              </div>
              <div class="course-profile-score">
                <h6>Type</h6>
              </div>
            </div>
            <div class="course-description">
              <div class="course-description-board">
                <h6>IDP</h6>
              </div>
              <div class="course-description-dot">
                <i class="bi bi-dot"></i>
              </div>
              <div class="course-description-passing-year">
                <h6>{{ i.completion_year }}</h6>
              </div>
            </div>
            <div class="lang-lead-secnd-prof">
              <div class="course-profile-status" v-for="j in i.score">
                <div class="course-profile-status-detail">
                  <h5>{{ j.name }}-{{ j.value }}</h5>
                </div>
              </div>
            </div>
            <div class="course-profile-comments-section">
              <div class="course-profile-comment-type">
                <h5>Score : {{ i.overall_scrore }}</h5>
              </div>
              <div class="course-profile-comment-icons">
                <div class="course-profile-comment-type-icon">
                  <i class="bi bi-pencil-square"></i>
                </div>
                <div @click="deleteLanguages(index)" class="course-profile-comment-delete-icon">
                  <i class="bi bi-trash3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="lead.languages && lead.languages.length >= 2" class="scroll-abs-ledsaptt">
          <i @click="scrollLeft" id="scroller-leadss" class="fa fa-angle-down"></i>
        </div>
        <div v-if="lead.languages && lead.languages.length >= 2" class="scroll-abs-ledsaptt-left">
          <i @click="scrollRight" id="scroller-leadss" class="fa fa-angle-down"></i>
        </div>
      </div>
    </div>
  </div>



  <Dialog v-model:visible="addModal" modal header="Add Family Details">
    <FormKit type="form" @submit="addLanguages">
      <div>
        <label class="leads-label-assign-add">Examination Name</label>
        <FormKit validation="required" v-model="selectedLanguage" id="update-events-drpsem-add" class="form-select"
          placeholder="Select Language" name="examination_name" type="select" @change="initField"
          :options="languages" />
      </div>
      <div class="mb-3">
        <label class="leads-label-assign-add">Completion Year</label><br />
        <FormKit validation="required" type="date" id="update-events-drpsem-add" name="completion_year" />
      </div>
      <div>
        <label class="leads-label-assign-add">Overall Score</label><br>
        <FormKit validation="required" name="overall_scrore" id="update-events-drpsem-add" type="text"
          placeholder="CGPA / Points / Grade" />
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div v-if="currentField" v-for="i in currentField">
          <label class="leads-label-assign-add">{{ i }}</label><br>
          <FormKit validation="required" :name="i" id="update-events-drpsem-add-btw" type="text" placeholder="------" />
        </div>

      </div>
      <div class="modal-footer-section">
        <button @click="addModal = false" type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go
          back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>


</template>

<script>


export default {
  props: {
    lead: {},
    form: {}
  },
  async mounted() {
    if (this.$refs.scrollableDiv) {
      const containerWidth = this.$refs.scrollableDiv?.offsetWidth || 0;
      const scrollWidth = this.$refs.scrollableDiv.scrollWidth;
      this.$refs.scrollableDiv.scrollRight = scrollWidth - containerWidth;
    }
    this.languagesAll = (await homeGet(`/form-languages/${this.form.company_id._id}`)).data.languages
    this.languages = this.languagesAll.map(i => ({ label: i.name, value: i._id }));

  },
  data() {
    return {
      languagesAll: [],
      languages: [],
      addModal: false,
      selectedLanguage: null,
      currentField: null,
      currentName: null,
      data: null,
    };
  }, methods: {
    scrollLeft() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft += 200;
      }
    },
    scrollRight() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft -= 200;
      }
    },

    addLanguages(v) {
      this.addModal = false
      let d = { ...v };
      delete d.completion_year;
      delete d.examination_name;
      delete d.overall_scrore;
      let score = []
      for (const key in d) {
        score.push({ name: key, value: d[key] });
      }
      if (typeof this.lead.languages == null || typeof this.lead.languages == 'undefined') { this.lead.languages = [] }
      v.examination_name = this.currentName
      v.score = score
      this.lead.languages.push({ ...v })
    },
    deleteLanguages(i) {
      this.lead.languages.splice(i, 1);
    },
    initField() {
      this.languagesAll.forEach(l => {
        if (l._id == this.selectedLanguage) {
          this.currentField = l.label
          this.currentName = l.name
        }
      })
    }

  }

};
</script>

<style scoped>
@import url('./style.css');
</style>