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
        <span>{{formData.basicInfoData?.position}}</span>
      </div>

      <!-- <div class='prev-featmedia'>
        <span class='preview-job-par-fat'>Featured</span><br/>
        <span class='preview-job-par-hrs'>2 hours ago</span>
      </div> -->
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
  <span class='preview-job-partech-gry'>{{formData?.basicInfoData?.phone}}<span class='preview-job-partech-showphn'></span></span>
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
  Company Offers:
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
import TouristCard from '~/pages/Search/components/TouristCard/TouristCard.vue';

export default {
  data() {
    return {
      isValid: false,
    };
  },
  async mounted() {
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async submitData() {
      if(this.$route.query.id){
        this.submitColleageStudyVisaEdit()
        return
      }
      this.isValid = true;

      const timestamp = Date.now();
      const coverImageFileName = `cover_image_${timestamp}`;
      const logoFileName = `logo_${timestamp}`;
      const document_urlName = `document_url_${timestamp}`
      const uploadedCoverImageUrl = await uploadImageAdminE2(this.formData.basicInfoData.coverImage, coverImageFileName);
      const uploadedLogoUrl = await uploadImageAdminE2(this.formData.basicInfoData.logoImage
        , logoFileName);
      console.log(this.formData)
      console.log(uploadedCoverImageUrl, uploadedLogoUrl)
      const payload = {
        cover_image: uploadedCoverImageUrl,
        logo: uploadedLogoUrl,
        country: this.formData.basicInfoData.country,

        title: this.formData.basicInfoData.title,
        description: this.formData.jobDetailsData.overview,
        service_name: 'Work',
        sub_service_name: "work_visa",
        type: 'work',
        work_visa: {
          phone:this.formData.basicInfoData.phone,
          address: this.formData.basicInfoData.address,
          document_url: await uploadImageAdminE2(this.formData.jobDetailsData.document_url, document_urlName),
          document_file_name: this.formData.jobDetailsData.document_file_name,
          employement_type: this.formData.jobDetailsData.employement_type,
          jobCategory_name: this.formData.jobDetailsData.jobCategory_name,
          total_employees: this.formData.basicInfoData.total_employees,
          position: this.formData.basicInfoData.position,
          salary_range: this.formData.jobDetailsData.salary_range,

        },
        tabs: this.formData.jobDetailsData.tab.map(tab => ({
          title: tab.name,
          overview: tab.description
        }))
      };
      try {
        this.loading = true;
        const res = await adminPost('/admin-study-add', payload);
        if (res.status === true) {

        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }

    },

    async submitColleageStudyVisaEdit() {
      this.isValid = true;

      const timestamp = Date.now();
      const coverImageFileName = `cover_image_${timestamp}`;
      const logoFileName = `logo_${timestamp}`;
      const document_urlName = `document_url_${timestamp}`;

      let uploadedCoverImageUrl = this.formData.basicInfoData.coverImage;
      let uploadedLogoUrl = this.formData.basicInfoData.logoImage;
      let uploadedDocumentUrl = this.formData.jobDetailsData.document_url;

      // Upload only if it's a file (e.g., not already a URL string)
      if (this.formData.basicInfoData.coverImage instanceof File || this.formData.basicInfoData.coverImage?.startsWith('data:')) {
        uploadedCoverImageUrl = await uploadImageAdminE2(this.formData.basicInfoData.coverImage, coverImageFileName);
      }

      if (this.formData.basicInfoData.logoImage instanceof File || this.formData.basicInfoData.logoImage?.startsWith('data:')) {
        uploadedLogoUrl = await uploadImageAdminE2(this.formData.basicInfoData.logoImage, logoFileName);
      }

      if (this.formData.jobDetailsData.document_url instanceof File || this.formData.jobDetailsData.document_url?.startsWith('data:')) {
        uploadedDocumentUrl = await uploadImageAdminE2(this.formData.jobDetailsData.document_url, document_urlName);
      }

      const payload = {
        cover_image: uploadedCoverImageUrl,
        logo: uploadedLogoUrl,
        country: this.formData.basicInfoData.country,
        title: this.formData.basicInfoData.title,
        description: this.formData.jobDetailsData.overview,
        service_name: 'Work',
        sub_service_name: "work_visa",
        type: 'work',
        work_visa: {
          phone:this.formData.basicInfoData.phone,
          address: this.formData.basicInfoData.address,
          document_url: uploadedDocumentUrl,
          document_file_name: this.formData.jobDetailsData.document_file_name,
          employement_type: this.formData.jobDetailsData.employement_type,
          jobCategory_name: this.formData.jobDetailsData.jobCategory_name,
          total_employees: this.formData.basicInfoData.total_employees,
          position: this.formData.basicInfoData.position,
          salary_range: this.formData.jobDetailsData.salary_range,
        },
        tabs: this.formData.jobDetailsData.tab.map(tab => ({
          title: tab.name,
          overview: tab.description
        }))
      };

      try {
        const res = await adminPut(`/admin-study-update/${this.$route.query.id}`, payload);
        if (res.status === true) {
          successAlert("Listing updated successfully");
          this.resetForm();
          this.$router.push({ path: '/admin/Categories/Work' });
        }
        this.loading = false;
      } catch (error) {
        console.error("Error during submission:", error);
        this.loading = false;
      }
    }

  }


};

</script>

<style scoped>
@import url('./style.css');
</style>