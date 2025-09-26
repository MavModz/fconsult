<!-- @format -->

<template lang="">
    <div class="preview-jb-container">
    <div class="preview-jb-wrapper">
  <div class='preview-jb-header'>
<div class='preview-jb-eye-head'>
  <div class=prev-jbeye-icn>
    <img src ='/img/png/on.png'/>
</div>
<div class='preview-jb-vacn'>
  <span>Preview your vacancy</span>
</div>
</div>

<div class=prev-jbeye-icnmon>
  <img src ='/img/png/monitor.png'/>
</div>
  </div>

  <div class='jblst-brd-cmp'></div>

  <div class='preview-jb-back-shad'>
  <div class='preview-jb-back-shad-wht'>
    <div class='preview-job-partener'>
       <div class='preview-job-manager'>
        <span>Partnership Manager</span>
      </div>

      <div class='prev-featmedia'>
        <span class='preview-job-par-fat'>Featured</span><br/>
        <span class='preview-job-par-hrs'>2 hours ago</span>
      </div>
    </div>

<div>

<div class='preview-job-par-zalo'>
  <span><i id='preview-job-stlcn' class="bi bi-pencil-square"></i></span>
  <span class='preview-job-partech'>{{formData?.basicInfoData?.title}}</span>
</div>
<div class='preview-job-par-zalo'>
  <span class='preview-job-par-boots'><i class="bi bi-geo-alt"></i></span>
  <span class='preview-job-partech-gry'>{{formData?.basicInfoData?.country}}</span>
</div>
<div class='preview-job-par-zalo'>
  <span class='preview-job-par-boots'><i class="bi bi-cash-stack"></i></span>
  <span class='preview-job-partech-gry'>{{formData?.jobDetailsData?.salary_range.currency}} {{formData?.jobDetailsData?.salary_range.start}}-{{formData?.jobDetailsData?.salary_range.end}}</span>
</div>
<div class='preview-job-par-zalo'>
  <span class='preview-job-par-boots'><i class="bi bi-telephone"></i></span>
  <span class='preview-job-partech-gry'>Bessie Cooper, HR Manager <span class='preview-job-partech-showphn'>Show phone</span></span>
</div>
<div class='preview-job-par-zalo'>
  <span class='preview-job-par-boots'><i class="bi bi-clock"></i></span>
  <span class='preview-job-partech-gry'>{{formData?.jobDetailsData?.employement_type
  }}</span>
</div>

</div>

<div class='jblst-brd-cmp'></div>



  <div class='prev-jb-cntmax style-4'>
<div class='prev-jb-cntmax-reqr'>
  Requirements:
</div>
<div>
  <ul class='prev-job-listl'>
    <li v-for="(item, index) in formData?.jobDetailsData?.tab" :key="index">
      <strong>{{ item.name }}</strong> 
    <span v-html="item.description"></span>
  </li> 

  </ul>
</div>
<div class='prev-jb-cntmax-reqr'>
  Company Offers::
</div>
<div>
  <ul class='prev-job-listl'>
    <li v-html="formData?.jobDetailsData?.overview"></li>

  
  </ul>
</div>
</div>
</div>
  </div>
        </div>

        </div>
    </template>

<script>
export default {
  data() {
    return {
      isValid: false,
      storeLastId:null,
    };
  },
  async mounted() {
    this.storeLastId = this.$route.params.id;
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async submitData() {
      this.isValid = true;
      const payload = {
        country: this.formData.basicInfoData.country,
        address: this.formData.basicInfoData.address,
        title: this.formData.basicInfoData.title,
        overview: this.formData.jobDetailsData.overview,
        service_name: 'Work Visa',
        type: 'work',
        work: {
          document_url: this.formData.jobDetailsData.document_url,
          employement_type: this.formData.jobDetailsData.employement_type,
          jobCategory_name: this.formData.jobDetailsData.jobCategory_name,
          cover_image: this.formData.basicInfoData.coverImage,
          logo: this.formData.basicInfoData.logoImage,
          total_employees: this.formData.basicInfoData.total_employees,
          position: this.formData.basicInfoData.position,
          salary_range: this.formData.jobDetailsData.salary_range,
          tabs: this.formData.jobDetailsData.tab.map(tab => ({
            tabname: tab.name,
            overview: tab.description
          }))
        },
      };
      try {
        this.loading = true;
        const res = await adminPut(`/company-listing/${this.storeLastId}`, payload);
        if (res.status === true) {
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }

    },
  }


};

</script>

<style scoped>
@import url('./style.css');
</style>