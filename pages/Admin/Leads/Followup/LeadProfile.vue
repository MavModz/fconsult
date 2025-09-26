<template>

  <Sidebar v-if="data" v-model:visible="offCanvas" header="Lead Profile"  position="right" style="width: 40vw;">
    <div class="single-lead-det-left">
         <div class="single-lead-profile">
            <div class="single-lead-backg-clr-viewpf">
               <div class="single-lead-abs-image-view">
                  <img :src="data.image" alt="">
               </div>
            </div>
            <div class="single-lead-inside-name-view">
               <span class="single-lead-actmae">
                  <p>{{data.name}}</p> 
               </span>
               <span>
                  <div id="single-leads-sdwedk">
                    <div class="single-lead-name">
                      <div class="single-lead-inside-name">
                          <span class="single-lead-actmae-chat">
                          <span><i class="bi bi-chat-left"></i></span>
                          <span>Chat</span>
                          </span>
                      </div>
                    </div>
                  </div>
               </span>
            </div>
            
         </div>
         <div class="col-md-12 mt-4">
            <div class="card">
              <div class="single-overview-email">
                <div class="single-eml-wdth">
                    <label class="single-view-nmbr">Phone Number</label>
                    <div class="single-ovr-spn">
                      <i id="single-over-phn-icn" class="bi bi-telephone"></i>
                      <input class="single-lead-nptphn" :value="data.phone" type="text" placeholder="enter your phone number">
                    </div>
                </div>
                <div class="single-eml-wdth">
                    <label class="single-view-nmbr">Email ID</label><br/>
                    <div class="single-ovr-spn">
                      <i id="single-over-phn-icn" class="bi bi-envelope"></i>
                      <input class="single-lead-nptphn" :value="data.email" type="email" placeholder="enter your email">
                    </div>
                </div>
              </div>
              <div class="single-eml-wdth-lnk">
                <label class="single-view-nmbr">Lead Source</label>
                <div class="single-lead-nptphn-lnkk">
                    <span class=""><i id="single-over-phn-lnkicn" class="bi bi-link-45deg"></i></span>
                    <span class="single-lds-yetnot">
                      <p>{{data.source}}</p>
                    </span>
                </div>
              </div>
              <div class="single-eml-wdth-lnk">
                <label v-if="data.is_assigned" class="single-view-nmbr">Assigned To</label>
                <label v-else class="single-view-nmbr">Not Assigned Yet</label>
                <div  v-if="data.is_assigned" class="single-lead-nptphn-del">
                    <span class="single-lds-yetnot">
                      <p>{{data.assigned_to.name}}</p>
                    </span>
                    <span class="single-lead-nptphn-spn">
                    <!-- <i class="bi bi-trash3"></i>
                    <i class="bi bi-pencil-square"></i> -->
                    </span>
                </div>
              </div>
              <div class="single-eml-wdth-lnk">
                <label class="single-view-nmbr">Service Opted</label><br/>
                <div class="single-lead-nptphn-opted">
                    <span class="single-lds-yetnot-opted">
                      <p class="single-lead-stdyvsa">{{data.service}}</p>
                    </span>
                </div>
              </div>
              <div class="single-leads-teck-container">
                <div class="mb-3">
                    <label class="leads-label-assign-ovrvw">Lead Status {{ data.lead_status }}</label>
                    <FormKit v-model="data.lead_status" id="update-events-drpsemi-drop" class="form-select" type="select" name="lead_status" :options="leadstatus" @change="changeStatus()"/>
                </div>
                <div class="mb-3">
                    <label class="leads-label-assign-ovrvw">Pipeline</label>
                    <FormKit v-model="data.pipeline" id="update-events-drpsemi-drop" class="form-select" type="select"  :options="pipeline" @change="changePipeline()"/>
                </div>
                <!-- <div class="mb-3">
                    <label class="leads-label-assign-ovrvw">Select Stage of Pipeline</label>
                    <FormKit validation="required" v-model="selectedTab" id="update-events-drpsemi-drop" class="form-select" name="event_type" type="select"  :options="['1','2']" />
                </div> -->
                <span class="single-lead-ovre-cmprfle">
                    <p><NuxtLink :to="'/admin/leads/detail/'+data._id">View Complete Profile</NuxtLink></p>
                </span>
                <span>
                <button class="single-lead-ovre-cmprfle-btn" @click="counsellorModal=true">Convert to Customer</button>
                </span>
              </div>
            </div>
         </div>
      </div>
  </Sidebar>

<!--{{users}}-->

  <Dialog v-model:visible="counsellorModal" modal header="Convert To Customer">
    <FormKit type="form" @submit="convertCustomer"  class="leads-form-style">
      <div>
        <label class="single-lead-cmttitls">Assign Counsellor</label><br />
        <FormKit validation="required" type="select" name="assigned_to" class="single-lead-cmt-mdlo" placeholder="Task title"  @change="getSubCouncellor" :options="items" v-model="selectedOption"/>
      </div>
      <span>
        <label class="leads-label-assign-add">Assign Description</label>
        <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn" />
      </span>
      <div class="modal-footer-section">
        <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close" @click="counsellorModal = false">Go back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>

  </Dialog>

</template>
<script>


export default {
  name: 'LeadProfile',
  props: {
    users: {},
    Customer_data: {},
    pipeline:{},
    leadstatus:{},
  },
  data() {
    return {
      counsellorModal: false,
      loading: false,
      offCanvas: false,
      data:null,
      items: [],
      selectedOption: '',
    }
  },
  async mounted(){
    await this.getSubCouncellor();
  },
  methods:{
    async getSubCouncellor() {
      this.loading = true
      this.items = (await adminGet(`/select-employes-list/?role=counsellor`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
      this.loading = false
    },
    openCanvas(i){
      this.offCanvas=true
      this.data=i
    },
    async changeStatus(){
      if (await askConfirm('Do You Want to Update The Status', 'Update Status', 'Update', 'No')) {
        this.loading = true
        await adminPut(`/update-leads-status/${this.data._id}`,{lead_status:this.data.lead_status})
        successAlert('Lead Status Updated Successfully');
        this.$parent.init()
      }
    },
    async changePipeline(){
      if (await askConfirm('Do You Want to change pipeline', 'Change Pipeline', 'Change', 'No')) {
        this.loading = true
        await adminPut(`/update-leads/${this.data._id}`,{pipeline:this.data.pipeline})
        successAlert('Pipeline Updated Successfully');
      }
    },
    async convertCustomer(v){
      
      this.counsellorModal=false 
      this.offCanvas=false
      this.loading=true
      await adminPut(`/assign-leads/${this.data._id}`,v).then(async (response) => {
        await adminPut(`/convert-customer/${this.data._id}`).then(async (response) => {
          this.$router.push("/admin/customers/view")
        })
      })
      this.loading=false
      this.$parent.init()
    }
  }
}
</script>

<style scoped>
@import url('style.css');
</style>