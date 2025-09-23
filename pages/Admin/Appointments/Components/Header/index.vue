
<template #header>
    <div class="gallery-media-action">
      
      <div class="leads-filter-design">
      
       
         <div class="leads-filter-left">
        <div style="display: flex; align-items: center; width: 250px; background-color: #f4f7fe; border-radius: 24px; padding: 0px 5px;">
        <i class="pi pi-search" style="margin-right: 8px; font-size: 1.2rem; color: #888;padding-left: 10px"></i>
        <input 
          @change="applySearch"
          type="text" 
          placeholder="Search Leads" 
          style="border: none; outline: none; background: transparent; flex: 1;" 
        />
       
      </div>

       
      <Calendar v-model="buttondisplay" showIcon :showOnFocus="false" />
       
        <Button class="your-events-btn-icon" type="button" icon="pi pi-sort-amount-down" label="filter" outlined
          @click="filterBar = true" />
        </div>
        
        <div class="leads-filter-right">
          <Button class="your-events-btn-icon"  @click="$router.push('/admin/settings/LeadManagement')" 
          icon="pi pi-cog"   />
         
          <div class="btn-align-center split-custom-class-lead-header">
            <SplitButton class="leads-customopent-dropdown custom-split-button" label="Add Appointments " menuButtonIcon="pi pi-angle-down"  :model="generateMenuItems()"></SplitButton>
          </div>
        </div>
       
      </div>
    </div> 
  
  </template>

<script>
export default {
data(){
  return{
   
  }
},
async mounted(){

},
methods: {
  isActiveTab(route) {
    return this.$route.path === route;
  },
  
  generateMenuItems() {
  return [
    
    {
      label: "Add Online Appointment",
      icon: "pi pi-plus-circle",
      command: () => this.addlead(),
    },
    {
      label: "Add Onsite Appointment",
      icon: "pi pi-file-import",
      command: () => this.metagoogle()
    },
    
   
  ];
},


},
};
</script>
<script setup>
import { ref } from "vue";

const buttondisplay = ref();
const icondisplay = ref();
const templatedisplay = ref();
</script>
<style scoped>
@import url('./style.css');


.lead-tab {
border: 1px solid #a5a5a5;
padding: 10px 15px;
color: #676b6c;
border-radius: 5px;
transition: all 0.3s ease;
background-color: #fff;
}

.lead-tab.active {
background-color: #ff5757;
color: #fff;
border: none;
}

.lead-tab.highlighted {
color: #ff5757;
font-weight: 400;

}

.lead-tab.followHigh {
color: #676b6c;
font-weight: 400;

}

.incomplete-tab.highlighted {
color: red;
}

.incomplete-lead-count.highlight-count {
background-color: #ff5757;
color: #fff;
padding: 3px;
border-radius: 15px;
margin-inline-end: 5px;
}
.follow-up-count{
padding: 3px;
border-radius: 15px;
margin-inline-end: 5px;
}
.follow-up-count.follow-active {
background-color: #fff;
color: #ff5757;
}
.follow-up-count.follow-default {
background-color: #5d6b98;
color: #fff;
}

.incomplete-lead-count{
padding: 3px;
border-radius: 15px;
margin-inline-end: 5px;
}
.incomplete-lead-count.incomplete-active {
background-color: #fff;
color: #ff5757;
}
.incomplete-lead-count.incomplete-default {
background-color: #ff5757;
color: #fff;
}

</style>
