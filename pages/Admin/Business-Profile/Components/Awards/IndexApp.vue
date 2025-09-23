<template>
  <div class="cards" style="box-shadow: none;">
    <div class="card-title" id="addcmp-dtls-brk">
      <h4>Company Awards</h4>

      <span class="add-btn hover-effect" @click="$refs.awardModal.addAwardModal = true">
        <i class="bi bi-plus"></i> Add Award</span>
    </div>

    <!-- <div v-if="awards">
      <Carousel class="row" :value="awards" :responsiveOptions="responsiveOptions" :numVisible="3" :numScroll="1" circular>
        <template #item="i" class="pl-[20px]">
          <div class="px-2  shadow-lg mx-2 rounded-lg mb-[40px] awards-cardwidth" style="position: relative;">

              <div class="awards-splitbutton">
                <SplitButton
                  icon="none"
                  dropdownIcon="pi pi-check"
                  :model="generateMenuItems(i.data)"
                  class="absolute top-2 right-0"
                />
              </div>
          
            
            <img style="auto" :src="i.data.image" alt=""
              class="h-[inherit] w-[-webkit-fill-available] mx-auto max-h-[250px] min-h-[250px] " />
            <span>{{ i.data.date.split('T')[0] }}</span>
            <h4>{{ i.data.title }}</h4>
           
          </div>
        </template>
</Carousel>
</div> -->


    <DataView :value="awards" paginator :rows="3" :alwaysShowPaginator="false" class="mt-3">
      <template #list="s">
        <div class="">
          <div class="flex items-center gap-[20px]  mb-sm-0 " v-for="(item, index) in s.items" :key="index">
            <div class="card mb-4 awards-cardwidth">
              <div class="tooltip-gallery-cont-ach">
                <SplitButton dropdownIcon="pi pi-check" :model="generateMenuItems(item)" class="absolute" />
              </div>
              <img style="auto" :src="item.image" alt="" class="object-cover max-h-[200px] min-h-[200px] " />

              <div class="p-[10px]">
                <span class="text-[#808080] text-right">{{ item.date.split('T')[0] }}</span>
                <h5>{{ item.title }}</h5>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>

    <!-- <div class="">
      <Carousel :value="awards" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
        <template #item="i" class="w-[250px]">
          <div class="px-2  mx-2 rounded-lg mb-[40px] awards-cardwidth w-[300px]" style="position: relative;">
            <div class="awards-splitbutton">
              <SplitButton icon="none" dropdownIcon="pi pi-check" :model="generateMenuItems(i.data)"
                class="absolute top-2 right-0" />
            </div>

            <img style="auto" :src="i.data.image" alt="" class="mx-auto max-h-[200px] min-h-[200px] " />
            <div class="p-[10px]">
              <span>{{ i.data.date.split('T')[0] }}</span>
              <h4>{{ i.data.title }}</h4>
            </div>
          </div>
        </template>
      </Carousel>
    </div> -->
  </div>

  <div class="cards">
    <div class="card-title py-3">
      <h4>Company Documents</h4>
      <span @click="document_section" class="edit_btn award-add-mdl-stl divhover"><img src="/img/svg/dark-edit.svg"
          alt="" />&nbsp;Edit</span>
    </div>
    <div class="card-row">

      <div class="card-col doc-card" v-if="company.pan">
        <h6>Company Pan Card</h6>
        <div class="document-name-view">
          <span class="trash-icon">{{ company.pan }}</span>
        </div>

      </div>
      <div class="card-col doc-card" v-if="company.business_license_number">
        <h6>Company License Number</h6>
        <div class="document-name-view">
          <span class="trash-icon">{{ company.business_license_number }}</span>
        </div>
      </div>

      <div class="card-col doc-card" v-if="company.company_gst">
        <h6>Company GST</h6>
        <div class="document-name-view">
          <span class="trash-icon">{{ company.company_gst }}</span>
        </div>

      </div>
      <div class="card-col doc-card" v-if="additional?.length > 0" v-for="(doc, index) in additional" :key="index">
        <h6>Addtional </h6>
        <div class="document-name-view">
          <span>{{ doc.filename.length > 15 ? doc.filename.slice(0, 15) + '...' : doc.filename }}</span>
          <span @click="deleteAddtional(doc._id)"><i class="pi pi-trash"
              :style="{ fontSize: '1rem', cursor: 'pointer' }"></i></span>
          <a :href="doc.url" target="_blank" rel="noopener noreferrer" :style="{ color: 'black' }">
            <span><i class="pi pi-eye" :style="{ fontSize: '1rem' }"></i></span>
          </a>
        </div>
      </div>



    </div>
  </div>




  <div class="cards">
    <div class="card-title py-3">
      <h4>Company Social Links</h4>
      <!-- <span class="edit_btn divhover award-add-mdl-stl" @click="$refs.modals.DocumentModal = true"><img
          src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit</span> -->
      <span class="edit_btn divhover award-add-mdl-stl" @click="update_social_link"><img src="/img/svg/dark-edit.svg"
          alt="" />&nbsp;Edit</span>
    </div>
    <div class="input-field">
      <label for="field-name">Company Website Link</label><input type="text" v-model="company.website"
        placeholder="-----------------------" disabled />
    </div>
    <div class="input-field">
      <label for="field-name">Facebook Link</label><input type="text" v-model="company.facebook"
        placeholder="-----------------------" disabled />
    </div>
    <div class="input-field">
      <label for="field-name">Instagram Link</label><input type="text" v-model="company.instagram"
        placeholder="-----------------------" disabled />
    </div>
    <div class="input-field">
      <label for="field-name">YouTube Link </label><input type="text" v-model="company.youtube"
        placeholder="-----------------------" disabled />
    </div>
  </div>



  <AddAwardModal ref="awardModal" @awardAdded="refreshAwards" />
  <UpdateModals ref="updateAwards" :data="awardData" @awardAdded="refreshAwards" />
</template>

<script>
import Carousel from 'primevue/carousel';
import AddAwardModal from './AddAwardModal.vue';
import UpdateModals from './UpdateModals.vue';

export default {
  disableDelete: true,
  name: 'BusinessAwards',
  components: { UpdateModals, AddAwardModal, Carousel },
  props: {
    company: {},
  },
  data() {
    return {
      awardData: {},
      awards: null, 
      // responsiveOptions: [
      //   {
      //     breakpoint: '1500px',
      //     numVisible: 4,
      //     numScroll: 1
      //   },
      //   {
      //     breakpoint: '1233px',
      //     numVisible: 3,
      //     numScroll: 2
      //   },
      //   {
      //     breakpoint: '878px',
      //     numVisible: 1,
      //     numScroll: 1
      //   },

      // ],
      additional: null,
    };
  },
  async mounted() {
    this.loading = true;
    this.companyData = { ...this.company }; // Deep copy of the props.company object
    this.additional = this.companyData.Additional_document;
    await this.init();
    this.loading = false;

  },
  methods: {
    generateMenuItems(i) {
      return [

        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => this.deleteBlog(i),
        },
        {
          label: "Edit",
          icon: "pi pi-pen-to-square",
          command: () => this.openEditAwardModal(i),
        },
        // {
        //   label: "View",
        //   icon: "pi pi-eye",
        //   command:()=>this.setDet(i)
        // }
      ];
    },
    async deleteBlog(i) {
      this.loading = true;
      if (await deleteConfirm("Do You Want to delete this awards?")) {
        await adminDelete(`/company-awards/${i._id}`)
        this.init();
        successAlert("Award deleted successfully!");
      }
    },
    async openEditAwardModal(i) {
      if (i.date) {
        i.date = new Date(i.date).toISOString().split('T')[0];
      }
      this.awardData = { ...i }
      this.$refs.updateAwards.updateAward = true
    },
    async deleteAddtional(i) {
      this.loading = true;
      if (await deleteConfirm(`Do you want delete this Addtional document?`)) {
        const res = await adminDelete(`/company/additional-document/${i}`);
        if (res.status) {
          this.additional = res.data.company.Additional_document
        }
        await this.init();
        successAlert('Addtional document image deleted successully!');

      }
    },
    async update_social_link() {
      const payload = { update_step: 6 }
      try {
        await adminPatch(`/company-update/${this.company._id}`, payload)
          .then((response) => {
            this.$router.push({
              path: `/addBusiness`,
              state: { fromForm: true },
            })
          })
          .catch((error) => {
          });
      } catch (error) {

      }

    },
    async document_section() {
      const payload = { update_step: 5 }
      try {
        await adminPatch(`/company-update/${this.company._id}`, payload)
          .then((response) => {
            this.$router.push({
              path: `/addBusiness`,
              state: { fromForm: true },
            })
          })
          .catch((error) => {
          });
      } catch (error) {

      }

    },

    async init() {
      await adminGet(`/company-awards`).then(async (response) => {
        this.awards = response.data.data;
      });
    },
    refreshAwards() {
      this.init(); // Refresh the awards list
    },
    updateCompanyData() {
      this.$parent.init();
    },
  },
};
</script>

<style scoped>
@import url('./style.css');

.hover-effect:hover {
  background: white !important;
  color: #FF5757 !important;
}

.trash-icon {
  font-size: 1rem;
  color: #d5d2dc;
  /* Light blue color */
}
</style>
