<template class="template">
  <div class="container py-5">
    <div class="row common">
      <div class="col-lg-12 pt-5 mb-sm-0">
        <div class="row px-5">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <span class="mb-3 cursor-pointer">
              <a class="text-decoration-none cursor-pointer" @click="back()" style="color: #8692a6; font-weight: 600">
                <i class="bi bi-chevron-left"></i> Back
              </a>
            </span>
          </div>
          <div class="col-sm-6 mb-3 mb-sm-0 d-flex flex-column justify-content-end">
            <span class="text-sm-end" style="color: #bdbdbd; font-weight: 500">STEP 03/4</span>
            <span class="text-sm-end" style="color: #8692a6; font-weight: 600">Business Info.</span>
          </div>
        </div>
        <!-- <center> -->
        <div id="residence-prem-padd-onbrd" style="width: -webkit-fill-available;"
          class="col-sm-10 mb-3 mt-5 d-flex flex-column align-items-center">
          <div class="card-row row justify-content-center gap-5 column-gap-5">
            <div class="card-col col-lg-5 "
              :style="{ background: checkboxStates.residency ? '#fff5f5' : 'initial', border: checkboxStates.residency ? '1.3px solid #ff6262' : '1.3px solid #d5d2dc' }">
              <div class="d-flex justify-content-between align-items-center" style=" height: -webkit-fill-available ">
                <div class="d-flex align-items-center">
                  <div class="image-holder" :style="{ background: checkboxStates.residency ? '#ff6262' : '#fff0f1' }">
                    <NuxtImg src="/img/svg/residency.svg" alt="" class="h-[30px] w-[30px]" />
                  </div>



                  <div class="px-4 d-flex flex-column" style="font-weight: 500">
                    Permanent Residency
                    <span v-if="checkboxStates.residency" style="color: #818caf">

                      <!-- If no countries are selected -->
                      <template v-if="this.$refs.prModal.selectedcountries.length === 0">
                        <span @click="$refs.prModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If one or two countries are selected -->
                      <template v-else-if="this.$refs.prModal.selectedcountries.length <= 2">
                        <span v-for="(country, index) in this.$refs.prModal.selectedcountries" :key="index"
                          class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.prModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If more than two countries are selected -->
                      <template v-else-if="this.$refs.prModal.selectedcountries.length > 2">
                        <span v-for="(country, index) in this.$refs.prModal.selectedcountries.slice(0, 2)" :key="index"
                          class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.prModal.selectModal = true"
                          style="color: #818caf; margin-left: 5px; font-weight: bold; font-size: 9.89px;">
                          +{{ this.$refs.prModal.selectedcountries.length - 2 }} more
                        </span>
                      </template>

                    </span>
                  </div>



                </div>
                <label class="containers">
                  <input type="checkbox" v-model="checkboxStates.residency" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>

            <div class="card-col col-lg-5"
              :style="{ background: checkboxStates.study ? '#fff5f5' : 'initial', border: checkboxStates.study ? '1.3px solid #ff6262' : '1.3px solid #d5d2dc' }">
              <div class="d-flex justify-content-between align-items-center" style=" height: -webkit-fill-available">
                <div class="d-flex align-items-center">
                  <div class="image-holder" :style="{ background: checkboxStates.study ? '#ff6262' : '#fff0f1' }">
                    <NuxtImg src="/img/svg/study.svg" alt="" class="h-[30px] w-[30px]" />
                  </div>
                  <div class="px-4 d-flex flex-column" style="font-weight: 500">
                    Study Visa
                    <span v-if="checkboxStates.study" style="color: #818caf">

                      <!-- If no countries are selected -->
                      <template v-if="this.$refs.studyModal.selectedcountries.length === 0">
                        <span @click="$refs.studyModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If one or two countries are selected -->
                      <template v-else-if="this.$refs.studyModal.selectedcountries.length <= 2">
                        <span v-for="(country, index) in this.$refs.studyModal.selectedcountries" :key="index"
                          class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.studyModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If more than two countries are selected -->
                      <template v-else-if="this.$refs.studyModal.selectedcountries.length > 2">
                        <span v-for="(country, index) in this.$refs.studyModal.selectedcountries.slice(0, 2)"
                          :key="index" class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.studyModal.selectModal = true"
                          style="color: #818caf; margin-left: 5px; font-weight: bold; font-size: 9.89px;">
                          +{{ this.$refs.studyModal.selectedcountries.length - 2 }} more
                        </span>
                      </template>

                    </span>
                  </div>

                </div>
                <label class="containers"><input type="checkbox" v-model="checkboxStates.study" /><span
                    class="checkmark"></span></label>
              </div>
            </div>

            <div class="card-col col-lg-5"
              :style="{ background: checkboxStates.business ? '#fff5f5' : 'initial', border: checkboxStates.business ? '1.3px solid #ff6262' : '1.3px solid #d5d2dc' }">
              <div class="d-flex justify-content-between align-items-center" style=" height: -webkit-fill-available">
                <div class="d-flex align-items-center">
                  <div class="image-holder" :style="{ background: checkboxStates.business ? '#ff6262' : '#fff0f1' }">
                    <NuxtImg src="/img/svg/business.svg" alt="" class="h-[30px] w-[30px]" />
                  </div>

                  <div class="px-4 d-flex flex-column" style="font-weight: 500">
                    Business Visa
                    <span v-if="checkboxStates.business" style="color: #818caf">

                      <!-- If no countries are selected -->
                      <template v-if="this.$refs.businessModal.selectedcountries.length === 0">
                        <span @click="$refs.businessModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If one or two countries are selected -->
                      <template v-else-if="this.$refs.businessModal.selectedcountries.length <= 2">
                        <span v-for="(country, index) in this.$refs.businessModal.selectedcountries" :key="index"
                          class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.businessModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If more than two countries are selected -->
                      <template v-else-if="this.$refs.businessModal.selectedcountries.length > 2">
                        <span v-for="(country, index) in this.$refs.businessModal.selectedcountries.slice(0, 2)"
                          :key="index" class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.businessModal.selectModal = true"
                          style="color: #818caf; margin-left: 5px; font-weight: bold; font-size: 9.89px;">
                          +{{ this.$refs.businessModal.selectedcountries.length - 2 }} more
                        </span>
                      </template>

                    </span>
                  </div>

                </div>
                <label class="containers"><input type="checkbox" v-model="checkboxStates.business" /><span
                    class="checkmark"></span></label>
              </div>
            </div>

            <div class="card-col col-lg-5"
              :style="{ background: checkboxStates.tourist ? '#fff5f5' : 'initial', border: checkboxStates.tourist ? '1.3px solid #ff6262' : '1.3px solid #d5d2dc' }">
              <div class="d-flex justify-content-between align-items-center" style=" height: -webkit-fill-available">
                <div class="d-flex align-items-center">
                  <div class="image-holder" :style="{ background: checkboxStates.tourist ? '#ff6262' : '#fff0f1' }">
                    <NuxtImg src="/img/svg/tourist.svg" alt="" class="h-[30px] w-[30px]" />
                  </div>

                  <div class="px-4 d-flex flex-column" style="font-weight: 500">
                    Tourist Visa
                    <span v-if="checkboxStates.tourist" style="color: #818caf">

                      <!-- If no countries are selected -->
                      <template v-if="this.$refs.touristModal.selectedcountries.length === 0">
                        <span @click="$refs.touristModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If one or two countries are selected -->
                      <template v-else-if="this.$refs.touristModal.selectedcountries.length <= 2">
                        <span v-for="(country, index) in this.$refs.touristModal.selectedcountries" :key="index"
                          class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.touristModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If more than two countries are selected -->
                      <template v-else-if="this.$refs.touristModal.selectedcountries.length > 2">
                        <span v-for="(country, index) in this.$refs.touristModal.selectedcountries.slice(0, 2)"
                          :key="index" class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.touristModal.selectModal = true"
                          style="color: #818caf; margin-left: 5px; font-weight: bold; font-size: 9.89px;">
                          +{{ this.$refs.touristModal.selectedcountries.length - 2 }} more
                        </span>
                      </template>

                    </span>
                  </div>

                </div>
                <label class="containers"><input type="checkbox" v-model="checkboxStates.tourist" /><span
                    class="checkmark"></span></label>
              </div>
            </div>

            <div class="card-col col-lg-5"
              :style="{ background: checkboxStates.visitor ? '#fff5f5' : 'initial', border: checkboxStates.visitor ? '1.3px solid #ff6262' : '1.3px solid #d5d2dc' }">
              <div class="d-flex justify-content-between align-items-center" style=" height: -webkit-fill-available">
                <div class="d-flex align-items-center">
                  <div class="image-holder" :style="{ background: checkboxStates.visitor ? '#ff6262' : '#fff0f1' }">
                    <NuxtImg src="/img/svg/visitor.svg" alt="" class="h-[30px] w-[30px]" />
                  </div>
                  <div class="px-4 d-flex flex-column" style="font-weight: 500">
                    Visitor Visa
                    <span v-if="checkboxStates.visitor" style="color: #818caf">

                      <!-- If no countries are selected -->
                      <template v-if="this.$refs.visitorModal.selectedcountries.length === 0">
                        <span @click="$refs.visitorModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If one or two countries are selected -->
                      <template v-else-if="this.$refs.visitorModal.selectedcountries.length <= 2">
                        <span v-for="(country, index) in this.$refs.visitorModal.selectedcountries" :key="index"
                          class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.visitorModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If more than two countries are selected -->
                      <template v-else-if="this.$refs.visitorModal.selectedcountries.length > 2">
                        <span v-for="(country, index) in this.$refs.visitorModal.selectedcountries.slice(0, 2)"
                          :key="index" class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.visitorModal.selectModal = true"
                          style="color: #818caf; margin-left: 5px; font-weight: bold; font-size: 9.89px;">
                          +{{ this.$refs.visitorModal.selectedcountries.length - 2 }} more
                        </span>
                      </template>

                    </span>
                  </div>

                </div>
                <label class="containers"><input type="checkbox" v-model="checkboxStates.visitor" /><span
                    class="checkmark"></span></label>
              </div>
            </div>

            <div class="card-col col-lg-5"
              :style="{ background: checkboxStates.work ? '#fff5f5' : 'initial', border: checkboxStates.work ? '1.3px solid #ff6262' : '1.3px solid #d5d2dc' }">
              <div class="d-flex justify-content-between align-items-center" style=" height: -webkit-fill-available">
                <div class="d-flex align-items-center">
                  <div class="image-holder" :style="{ background: checkboxStates.work ? '#ff6262' : '#fff0f1' }">
                    <NuxtImg src="/img/svg/work.svg" alt="" class="h-[30px] w-[30px]" />
                  </div>

                  <div class="px-4 d-flex flex-column" style="font-weight: 500">
                    Work Visa
                    <span v-if="checkboxStates.work" style="color: #818caf">

                      <!-- If no countries are selected -->
                      <template v-if="this.$refs.workModal.selectedcountries.length === 0">
                        <span @click="$refs.workModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If one or two countries are selected -->
                      <template v-else-if="this.$refs.workModal.selectedcountries.length <= 2">
                        <span v-for="(country, index) in this.$refs.workModal.selectedcountries" :key="index"
                          class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.workModal.selectModal = true" class="addCountry">+ Add Countries</span>
                      </template>

                      <!-- If more than two countries are selected -->
                      <template v-else-if="this.$refs.workModal.selectedcountries.length > 2">
                        <span v-for="(country, index) in this.$refs.workModal.selectedcountries.slice(0, 2)"
                          :key="index" class="selectedCountryName">
                          {{ country }}
                        </span>
                        <span @click="$refs.workModal.selectModal = true"
                          style="color: #818caf; margin-left: 5px; font-weight: bold; font-size: 9.89px;">
                          +{{ this.$refs.workModal.selectedcountries.length - 2 }} more
                        </span>
                      </template>

                    </span>
                  </div>

                </div>
                <label class="containers"><input type="checkbox" v-model="checkboxStates.work" /><span
                    class="checkmark"></span></label>
              </div>
            </div>
          </div>
          <div class="rounded-3 pt-5 col-md-5">
            <Button v-if="!update" class="w-100 btn btn-lg btn-primary mt-3" @click="submitForm" icon="pi pi-save"
              :loading="loading" label="Proceed" />
            <Button v-if="update" class="w-100 btn btn-lg btn-primary mt-3" @click="submitForm" icon="pi pi-save"
              :loading="loading" label="Update" />

            <div class="text-body-secondary">
              <span>
                <img src="/img/svg/lock.svg" style="width: 15px" alt="" />
              </span>
              <span class="text-align">Your Info is safely secured </span>
            </div>
          </div>
        </div>
        <!-- </center> -->
      </div>
    </div>
    <section :class="{ 'background-blur': isEditInvoice, 'd-none': !isEditInvoice, }">
    </section>
  </div>


  <!-- <AllModals :countries="countries" ref="allModal" /> -->
  <AllModals :countries="countries" ref="allModal" />
  <AllModals :countries="countries" ref="prModal" />
  <AllModals :countries="countries" ref="studyModal" />
  <AllModals :countries="countries" ref="touristModal" />
  <AllModals :countries="countries" ref="businessModal" />
  <AllModals :countries="countries" ref="visitorModal" />
  <AllModals :countries="countries" ref="workModal" />

</template>


<script>
import AllModals from "./Components/AllModals.vue";
import { ref } from 'vue';

export default {
  props: {
    company: {},
    user: {}
  },
  components: { AllModals },
  name: 'PhoneNumberVerification',
  data() {
    return {
      loading: false,
      checkboxStates: {
        residency: false,
        study: false,
        business: false,
        tourist: false,
        visitor: false,
        work: false,
        update: false
      },
      residency_c: [],
      countries: [],
      selectedCountries: [],
      isEditInvoice: false,
      allCountry: null,
      myForm: null,
      isLoadingCountries: true,
      isLoadingAdminCountries: true,
      update: false,
      categoryUpdate: true
    };
  },
  computed: {
    displayedCountries() {
      if (this.selectedCountries.length <= 2) {
        return this.selectedCountries.join(', ');
      } else {
        return `${this.selectedCountries.slice(0, 2).join(', ')} +${this.selectedCountries.length - 2} more`;
      }
    }
  },
  methods: {
    async category_update() {

      const payload = { category_update: false }
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
    updateSelectedCountries(selected) {
      this.selectedCountries = selected;
      this.residency_c = selected;

    },

    handleEditInvoice(type) {
      this.isEditInvoice = type;
    },
    async submitForm() {
      this.loading = true;
      const services = [
        { key: 'residency', label: 'Permanent Residency', ref: 'prModal' },
        { key: 'study', label: 'Study Visa', ref: 'studyModal' },
        { key: 'business', label: 'Business Visa', ref: 'businessModal' },
        { key: 'tourist', label: 'Tourist Visa', ref: 'touristModal' },
        { key: 'visitor', label: 'Visitor Visa', ref: 'visitorModal' },
        { key: 'work', label: 'Work Visa', ref: 'workModal' }
      ];

      const data = [];

      for (const service of services) {
        if (this.checkboxStates[service.key]) {
          const modal = this.$refs[service.ref];
          if (!modal.selectedcountries || modal.selectedcountries.length < 1) {
            errorAlert(`Please select atleast two countries for selected services!`);
            this.loading = false;
            return;
          }
          data.push({ flag: true, service: service.label, countries: modal.selectedcountries, countriesID: modal.countryID });
        }
      }

      if (data.length === 0) {
        errorAlert("Please select atleast one service with minimum two countries!");
        this.loading = false;
        return;
      }

      let payload = this.update ? {} : { step: this.company.step === 2 ? 3 : undefined, update: false };
      // if (!this.update &&this.company.is_claim && this.company.update_step==0) {
      //    payload = this.update ? {} : { step: this.company.step === 3 ? 4 : undefined, update: false };
         
      //   }
      try {
        await userPost(`/company-reapply/${this.user.company_id}`, { services: data, ...payload });
        if (this.categoryUpdate) {
          await this.category_update()
          return this.$router.push({ path: '/admin/Categories' })
        }
        this.update ? this.$router.push({ path: '/admin/business-profile' }) : this.$emit('nextPage');
      } catch (error) {
        this.loading = false;
        await serverErrorMessage(() => this.submitForm());
        return;
      }

      this.loading = false;
    },
    async back() {
      if (this.categoryUpdate) {
        await this.category_update()
        return this.$router.push({
          path: '/admin/Categories'
        })
      }
      if (this.update) {
        return this.$router.push({
          path: '/admin/business-profile'
        })
      }
      if (!this.update) {
        this.$emit("prevPage")
      }
    },

  },
  async setup() {
    let countries = ref([]);
    let allCountry = ref(null);
    let user = ref(null);
    let company = ref(null);
    await userGet('/countries_id').then(response => {
      allCountry = response.data;
      for (const c in allCountry) {
        countries.value.push({ code: allCountry[c]._id, name: allCountry[c].country })
      }
    })

    return { allCountry, countries }
  },
  async mounted() {
    this.loading = true;
    this.categoryUpdate = this.company.category_update
    if (this.company.update_step > 0) {

      this.update = true
    }
    for (let i in this.company.services) {
      let c = this.company.services[i];
    }

    if (this.company.step >= 2) {
      for (let i in this.company.services) {
        let c = this.company.services[i]
        if (c.service === 'Permanent Residency') {
          this.$refs.prModal.selectedcountries = c.countries;
          this.$refs.prModal.countrySelect = c.countries;
          this.$refs.prModal.countryID = c.countriesID; this.checkboxStates.residency = true
        }
        if (c.service === 'Study Visa') {
          this.$refs.studyModal.selectedcountries = c.countries;
          this.$refs.studyModal.countrySelect = c.countries;
          this.$refs.studyModal.countryID = c.countriesID; this.checkboxStates.study = true
        }
        if (c.service === 'Business Visa') {
          this.$refs.businessModal.selectedcountries = c.countries;
          this.$refs.businessModal.countrySelect = c.countries;
          this.$refs.businessModal.countryID = c.countriesID; this.checkboxStates.business = true
        }
        if (c.service === 'Tourist Visa') {
          this.$refs.touristModal.selectedcountries = c.countries;
          this.$refs.touristModal.countrySelect = c.countries;
          this.$refs.touristModal.countryID = c.countriesID; this.checkboxStates.tourist = true
        }
        if (c.service === 'Visitor Visa') {
          this.$refs.visitorModal.selectedcountries = c.countries;
          this.$refs.visitorModal.countrySelect = c.countries;
          this.$refs.visitorModal.countryID = c.countriesID; this.checkboxStates.visitor = true
        }
        if (c.service === 'Work Visa') {
          this.$refs.workModal.selectedcountries = c.countries;
          this.$refs.workModal.countrySelect = c.countries;
          this.$refs.workModal.countryID = c.countriesID; this.checkboxStates.work = true
        }
      }
    }

    this.loading = false;
  }
}

</script>



<style scoped>
@import url('./style.css');
</style>
