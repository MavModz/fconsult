<template>
    <div class="cards process-card">
        <div class="card-col doc-card">
          <!-- Document Name Row -->
          <div class="flex justify-between items-center">
            <h6 class="doc-title">{{ getSlicedContent(cardTitle,15) }}</h6>
            <div class="document-name-view">
              <span @click="downloadDocument">
                <i class="bi bi-download"></i>
              </span>
            </div>
          </div>
  
          <!-- Upload Date Row -->
          <div class="flex items-center">
            <h6 style="margin-bottom: 0px !important;">Uploaded on:&nbsp;</h6>
            <span class="upload-date">{{ Date }}</span>
          </div>
          <div class="mt-2">
            <span class="light-red">{{ getSlicedContent(companyName,32) }}</span>
          </div>
        </div>
      </div>
  </template>
  

<script>
export default {
    props: {
        cardTitle: {
            type: String,
            required: true,
        },
        Date: {
            type: String,
            required: true,
        },
        documentLink:{
            type:String,
            required:true,
        },
        companyName: {
            type: String,
            required: true,
        },
    },
    methods:{
        downloadDocument(){
            const link=document.createElement('a');
            link.href=this.documentLink
            link.click();
        }
    }    
}

</script>

<style>
@import url('./style.css');
</style>