<template>
  <div class="cnt">
    <div class="achievers-publs pt-2">
      <div class="pbl-clr">
        <p>Achievers</p>
      </div>
      <div class="achiever-add" v-if="permission?.achievers?.add">
          <button class="your-events-btn" @click="addAchieverPage">
            <i class="bi bi-plus" style="font-size: 1.25rem;"></i> Add Achiever
          </button>
      </div>
    </div>

    <DataView :value="allAchievers" paginator :rows="8" :alwaysShowPaginator="false" class="mt-3">
      <template #empty>
        <div class="row" v-if="loading">
          <div class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="i in 8">
            <Skeleton class="m-2" width="16rem" height="400px"></Skeleton>
          </div>
        </div>
        <EmptyContent :title="'Add First Achievement'" :desc="'No Achievements Found'" />
      </template>
      <template #list="s">
        <div class="w-[100%] flex flex-row py-3 px-4 items-center gap-4 flex-wrap ">
          <div class=" " v-for="(item, index) in s.items" :key="index">
            <div class="card w-[280px] shadow shadow-xs ">
              <img :src="item.image+`?t=${new Date().getDay()}`" alt="image" />
              <div class="card-img-overlay">
                 <div class="tooltip-gallery-cont-ach">
                  <!-- <SplitButton
                  icon="none"
                  dropdownIcon="pi pi-check"
                  :model="generateMenuItems(item)"
                /> -->
                <div class="dropdown-center"
                  v-if="permission?.achievers?.edit || permission?.achievers?.delete">
                  <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon2" />
                  </button>
                  <ul class="dropdown-menu">
                    <li v-if="permission?.achievers?.edit" class="cursor-pointer">
                      <a class="dropdown-item" @click="editBlog(item)">
                        <BootstrapIcon name="pencil-square" class="icon5" />Edit
                      </a>
                    </li>
                    <li v-if="permission?.achievers?.delete" class="cursor-pointer">
                      <a class="dropdown-item" @click="deleteEvent(item)">
                        <BootstrapIcon name="trash" class="icon5" />Delete
                      </a>
                    </li>
                  </ul>
                  </div>
                </div>
                </div>
                <div class="achiever_details">
                  <h4>{{ item.title }}</h4>
                  <span class="mb-4">{{ item.service }} -
                    {{ item.country }}</span>
                </div>
              </div>
            </div>
          </div>
          </template>
        
      
    </DataView>




  </div>

  <Dialog v-model:visible="detailModal" modal header="Achiever" :style="{ width: 'max-content' }">
    <div v-if="data" class="modal-body achvr-detls-flxnxt">
      <div class="achvr-leftimg-vw">
        <img class="card-img-top" :src="data?.image" alt="..." />
        <div class="achvr-namabs">
          <p class="achv-jagdep">{{ data?.title }}</p>
          <p class="achvr-vsa">
            {{ data?.service_name }} -
            {{ data?.country}}
          </p>
        </div>
      </div>
      <div class="achvr-leftimg-newdivrght">
        <h5 class="card-title">{{ data?.listing_id?.title }}</h5>
        <div class="achvr-hr"></div>
        <span class="achvr-descpt">
          <p>Description</p>
        </span>
       
        <p class="card-text max-h-[140px] sm:max-h-[110px] md:max-h-[250px] overflow-y-auto" v-html="data?.description"></p>
        <div class="achvr-last">
          <div class="achvr-cmp">
            <div class="achvr-aside-serv">
              <img src="/img/png/icon.png" alt="" />
            </div>
            <div class="achvr-cntr">
              
              <p>{{ data?.country }}</p>
            </div>
          </div>
        
        </div>
      </div>

    </div>
  </Dialog>


</template>

<script>
import EmptyContent from '~/components/ExtraComponents/EmptyContent.vue';
definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
});

export default {
  components: { EmptyContent },
  name: 'BusinessAchievers',
  data() {
    return {
      // userData: useState('userData'),
      loading: false,
      allAchievers: null,
      current_id: null,
      data: null,
      detailModal: false,
      totalListing:0,
      permission:null,
    };
  },
  async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  async mounted() {
    this.totalListing=(await userGet('/total-listings')).data.data
    activateSubmenu('b4', 'Achievers');
    this.init();
    this.getPermission();
  },
  methods: {
    async deleteEvent(i) {
      if (await deleteConfirm('Do You Want to delete this Achiever')) {
        await subadminDelete(`/company-achievers/${i._id}`);
        this.init();
        successAlert('Achiever Deleted');
      }
    },
    
    async init() {
      this.loading = true
      await subadminGet(`/subadmin-company-achievers`).then((response) => {
        this.allAchievers = response.data.data;
      });
      this.loading = false
    },
    async addAchieverPage(){
      if(this.totalListing>0){
        this.$router.push("/subadmin/achievers/add")
      }else{
        errorAlert("Please Add Atleast One Listing To Add Achievers")
      }
    },

    async editBlog(i){
      this.$router.push({
      path: `/subadmin/Achievers/Update/${i._id}`,
      state: { fromForm: true },
    });
    },
    async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
    async setDet(detailsId) {
      this.data = detailsId;
      this.detailModal = true
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
