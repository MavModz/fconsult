<template>
  <div class="overflow">
    <div class="row giving-hght-onbording" style="">
      <div class="col-lg-6 mb-sm-0 bimg">
        <div class="image-background">
          <img src="/img/png/iPhone.png" alt="" />
        </div>
      </div>
      <div id="cstwidth-stp1-right" class="col-lg-6 mt-sm-5 px-lg-5 mb-sm-0">
        <div class="row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <span class="mb-3 cursor-pointer">
              <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
                <i class="bi bi-chevron-left"></i> Back
              </a>
            </span>
          </div>
          <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="mb-3">
              <span class="float-end" style="color: rgb(189, 189, 189); font-weight: 500">STEP 01/7</span>
            </div>
          </div>
        </div>
        <FormKit type="form" :value="company" @submit="submitForm">
          <center>
            <div class="col-sm-8 mb-3 mt-5 py-5-custom">
              <div class="text-center text-lg-start">
                <p class="h4 fw-bold lh-1 text-body-emphasis mb-3">
                  Register Business Account!
                </p>
                <p class="para">
                  For the purpose of company regulation your details are
                  required
                </p>
              </div>
              <div id="background-tertiorary" class="rounded-3 mt-5 bg-body-tertiary">
                <div class="form-group pt-4 pt-md-0 pb-3">
                  <label for="" class="mb-1">Add Company Title*</label>
                  <!-- <FormKit type="text" label="" name="company_name" validation="required" placeholder="-------------"
                    v-model="name" @keyup="searchCompany()" @focus="isFocused = true" @blur="isFocused = false"
                    validation-label="Company Name" /> -->
                  <FormKit type="text" label="" name="company_name" validation="required" placeholder="-------------"
                    v-model="name" @focus="isFocused = true" @blur="isFocused = false"
                    validation-label="Company Name" />
                  <!-- 
                  <div v-if="companyList.length >= 0 && isFocused == true && name.length > 0">
                    <div class="shadow-lg bg-white border rounded-2xl p-[20px]">
                      <div v-for="i in companyList" :key="i._id">
                        <NuxtLink class="flex flex-col" @mousedown="openModal(i._id)">
                          <span class="text-[#49445A] font-normal text-[20px] text-left">{{ `${i.company_name.slice(0,
                            15)}...` }}</span>
                          <span class="text-[#909090] font-normal text-left">{{ `${i.address.slice(0, 15)}.` }}</span>
                          <div class="border my-2"></div>
                        </NuxtLink>
                      </div>
                      <div v-if="companyList.length == 0" class="text-[#909090] font-normal text-[20px] text-left">😊 No
                        Other Company With Similar Names Found</div>
                    </div>
                  </div> -->
                </div>
                <div class="position-relative d-flex justify-content-center" style="height: 75px">
                  <p class="position-absolute cst-step-lastchec" style="
                bottom: 0;
                font-weight: 500;
                color: #696f79;
                font-size: 16px;
              ">
                    <FormKit type="checkbox" label=" I Agree to Terms and Conditions" name="terms_and_condition"
                      :value="false" validation="accepted" v.model="terms" validation-visibility="dirty" />
                    <!-- <span>I Agree to </span><span class="text-[#ff5757]">Terms and Conditions</span> -->
                  </p>
                </div>
                <Button class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save" :loading="loading"
                  label="PROCEED" />
              </div>
            </div>
          </center>

        </FormKit>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="md-warningclm-ppp">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="cstm-modalbd-pp">
          <p class="text-[22px] font-medium text-[#000000] mt-[50px] pb-[20px]">Someone Else May Be Managing This
            Listing !</p>
          <p>Think this is your company but it's listed on Find and Consult without your management? Take control and
            ensure accurate details.
          </p>
        </div>
        <div class="warning-claimpop">

          <button @click="navigateToClaim" type="button" class="warning-clm-ppp" data-bs-dismiss="modal">Claim This
            Business</button>
          <button type="button" class="cancel-claimppe" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    company: {},
    user: {}
  },
  data() {
    return {
      loading: false,
      data: null,
      timer: null,
      companyList: [],
      isFocused: false,
      name: "",
      terms_and_condition: "",
      // isFocused: true,  
      selectedCompanyId: null,
      showModal: false,
    };
  },
  mounted() {
    this.whatsappMessage()
  },

  methods: {
    async whatsappMessage() {
      await userPost(`/whatsapp-user_trying_to_register`).then((response) => { }).catch((e) => { });
    },
    back() {
      const isAdmin = this.$route.query.adminuser === 'true';

      if (isAdmin) {
        this.$router.push({ path: '/adminProfile', query: { newUser: 'true' } });
      } else {
        this.$router.push('/user/dashboard');
      }
    },
    searchCompany() {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (this.name !== null && this.name !== "") {
          await userGet(`/search-company/${this.name}`).then((response) => {
            this.companyList = response.data.companies;
          });
        }
      }, 800);
    },
    openModal(companyId) {
      this.selectedCompanyId = companyId;
      this.showModal = true;
      const modalElement = document.getElementById('staticBackdrop');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    },
    navigateToClaim() {
      if (this.selectedCompanyId) {
        this.$router.push(`/addbusiness/claim/${this.selectedCompanyId}`);
      }
    },

    setCookie(name, value, days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    },

    async submitForm(v) {
      await userGet(`/check-company-name/${v.company_name}`).then((r) => {
        if (r.data.data > 0) {
          errorAlert("Company Name Already Exists")
        } else {
          this.addCompany(v)
        }
      }).catch(async (e) => {
        await serverErrorMessage(() => this.submitForm(v))
      });
    },
    async addCompany(v) {

      this.loading = true;
      if (v.phone_verified == false) {
        v.phone = ""
      }
      if (v.email_verified == false) {
        v.company_email = ""
      }
      if (!this.user.company_apply) {
        v.step = 1;
        v.location = {
          type: 'Point',
          coordinates: [0.0, 0.0],
        };
        await userPost('/add-new-company', v).then(async (response) => {
          await userGet(`/regenerate-token-admin`).then((r) => {
            localStorage.setItem('token', r.data.token);
            useNuxtApp().token = r.data.token;
            this.setCookie('token', r.data.token, 180);
            location.reload()
          }).catch((e) => { });
        }).catch((e) => { });
      } else {
        await userPost(`/company-reapply/${this.user.company_id}`, v).then(async (response) => {
          if (response.data.status) {
            await userGet(`/regenerate-token-admin`).then((r) => {
              localStorage.setItem('token', r.data.token);
              useNuxtApp().token = r.data.token;
              this.setCookie('token', r.data.token, 180);
              location.reload()
            }).catch((e) => { });
            location.reload()
          }
        }).catch((e) => { });
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
