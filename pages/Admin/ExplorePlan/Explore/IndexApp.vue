<!-- @format -->

<template>
  <div class="explore-container">
    <div class="explore-wrapper">
      <div class="explore-section1">
        <div class="explore-section1-wrapper">
          <div class="explore-row1">
            <NuxtLink to="/admin/dashboard"><img src="/img/png/logo F&C.png" alt="logo" /></NuxtLink>
          </div>
          <div class="explore-row2">
            <img src="/img/png/Frame.png" alt="share-link" />
          </div>
          <div class="explore-row3">
            <h2 class="font-bold">Unlimited Leads</h2>
            <p>
              Say goodbye to complicated pricing structures and hello to
              streamlined lead management. Sign up today and take control of
              your business growth
            </p>
          </div>
        </div>
      </div>
      <div class="explore-section2">
        <div class="explore-section2-row1">
          <div class="explore-section-wrapper">
            <div class="expolore-back-button">
              <!-- <i class="bi bi-chevron-left" id="back-logo"></i>
              <h3>Back</h3> -->
            </div>
            <div class="explore-section2-row1-col2">
              <!-- <p>sub Title here</p> -->
              <h4>Choose Your Addons!</h4>
            </div>
          </div>
          <div class="explore-section2-row2">
            <div class="explore-card-wrapper">
              <!-- <div class="explore-box-error">
                <i class="bi bi-info-circle" id="error-icon"></i>
              </div> -->
              <div class="explore-row2-col1">
                <div class="explore-row2-part1">
                  <!-- <p @click="toggleValue" :id="dynamicId">
                    <i class="bi bi-check" id="check-btn"></i>
                  </p> -->
                  <h4>Company Management System (ERP)</h4>
                  <!-- <button>OFFER TAG</button> -->
                </div>
                <div class="explore-row2-part2">
                  <!-- <h2>AVAILABLE ON</h2> -->
                </div>
              </div>
              <div class="explore-row3-col1">
                <p>Manage everything from one Place</p>
                <div @click="openExplorePlan" class="explore-row3-ios">
                  <button
                    class="bg-[#ff5757] text-[#fff] px-[12px] py-[6px] rounded-[10px]  custom-explore-comming hover-effect">Buy
                    Now</button>
                </div>
              </div>
            </div>
          </div>


          <div class="explore-section2-row2">
            <div class="explore-card-wrapper">
              <!-- <div class="explore-box-error">
                <i class="bi bi-info-circle" id="error-icon"></i>
              </div> -->
              <div class="explore-row2-col1">
                <div class="explore-row2-part1">
                  <!-- <p @click="toggleValue" :id="dynamicId">
                    <i class="bi bi-check" id="check-btn"></i>
                  </p> -->
                  <h4>Your Own App</h4>
                  <!-- <button>OFFER TAG</button> -->
                </div>
                <div class="explore-row2-part2">
                  <!-- <h2>AVAILABLE ON</h2> -->
                </div>
              </div>
              <div class="explore-row3-col1">
                <p>Available on iOS & Android</p>
                <div @click="openExploreYourOwnApp" class="explore-row5-col3">
                  <button
                    class="bg-[#ff5757] text-[#fff] px-[12px] py-[6px] rounded-[10px] custom-explore-comming hover-effect">Buy
                    Now</button>
                </div>
                <!-- <div class="explore-row3-ios"> -->
                <!-- <button style="border: 2px solid #ff5757;"
                    class="bg-[#fff] text-[#ff5757] px-[12px] py-[6px] rounded-[18px] font-bold custom-explore-comming">Comming
                    Soon</button> -->
                <!-- </div> -->
              </div>
            </div>
          </div>
         

          <div class="explore-section2-row5 mb-4">
            <div class="explore-card-wrapper">
              <!-- <div class="explore-row5-error">
                <i class="bi bi-info-circle" id="error-icon"></i>
              </div> -->
              <div class="explore-row2-col1">
                <div class="explore-row2-part1">
                  <!-- <p :id="dynamicId2" @click="togglememb">
                    <i class="bi bi-check" id="check-btn"></i>
                  </p> -->
                  <h4 class="">Add Members</h4>
                </div>
                <div class="explore-row5-btn">
                  <!-- <button class="bg-[#ff5757] text-[#fff] px-[12px] py-[6px] rounded-[10px]">Buy Now</button> -->
                </div>
              </div>
              <div class="explore-row5-col1">
                <div class="explore-row5-col2">Add More Team Member to your System</div>
                <!-- <div @click="openExplorePlan" class="explore-row5-col3">
                  <button
                    class="bg-[#ff5757] text-[#fff] px-[12px] py-[6px] rounded-[10px] custom-explore-comming hover-effect">Buy Now</button>
                </div> -->

                <div class="explore-row3-gst">
                  <button style="border: 2px solid #ff5757;"
                    class="bg-[#fff] text-[#ff5757] px-[12px] py-[6px] rounded-[18px] font-bold  custom-explore-comming">Coming
                    Soon</button>
                </div>
              </div>
            </div>
          </div>

          <div class="explore-section2-row3">
            <div class="explore-card-wrapper-row3">
              <!-- <div class="explore-box-error">
                <i class="bi bi-info-circle" id="error-icon"></i>
              </div> -->
              <div class="explore-row2-col1">
                <div class="explore-row2-part1">
                  <!-- <p @click="toggleprom" :id="dynamicId1">
                    <i class="bi bi-check" id="check-btn"></i>
                  </p> -->
                  <h4>AD Promotion</h4>
                </div>
                <div class="explore-row3-btn">
                  <!-- <button>OFFER TAG</button> -->
                </div>
              </div>
              <div class="explore-row3-col1">
                <p>Locations: Home</p>
                <div class="explore-row3-gst">
                  <button style="border: 2px solid #ff5757;"
                    class="bg-[#fff] text-[#ff5757] px-[12px] py-[6px] rounded-[18px] font-bold  custom-explore-comming">Coming
                    Soon</button>
                </div>
              </div>
            </div>
            <!-- <div class="explore-row4">
              <div class="explore-row4-sec1">
                <i class="bi bi-x-circle" id="explore-cross"></i>
                <p>You Get 1 Month For Free</p>
              </div>
              <div class="explore-row4-sec2">
                <p>Offer Expires on 17 FEB 2024</p>
              </div>
            </div> -->
          </div>

          <div class="explore-section2-row6" v-if="plan || prom || memb">
            <div>
              <img src="/img/png/app-build.png" alt="app-builder-logo" />
            </div>
            <div class="exp-app-text">
              <input type="text" placeholder="Have Coupon Code" />
              <p>Apply</p>
            </div>
            <div class="exp-app-builter-btn">
              <NuxtLink to="/admin/ExplorePlan/Builder">
                <button class="exp-built-btn">Let's Build Your App</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Sidebar v-model:visible="visibleRight" header="" position="right" class="explore-plans-sidebarr">
    <div class="px-[15px] py-[20px]">
      <div class="d-flex items-center gap-x-[30px] mb-[20px]">
        <span><img src="/img/png/explore.png" alt=""></span>
        <span class="text-[030229] font-bold text-[20px]">Plan Info & Details</span>
      </div>
      <div class="explore-body-plans">
        <p class="text-[#000000] font-bold text-[35px] mb-[0px]">₹{{ price.toLocaleString('en-IN') }}/- </p>
        <p class="text-[#64748b] font-normal text-[14px]">Inclusive of 10 users</p>
        <div class="mt-[15px]">
          <span class="text-[#3c3c3c] font-bold text-[24px]">Features</span>
          <p style="opacity: 0.8;" class="text-[#3c3c3c] font-normal text-[14px]">Streamline your immigration business
            operations with our ERP
            system manage everything from lead generation to client onboarding in one place</p>
        </div>
        <div class="mt-[10px]">
          <div class="d-flex items-center gap-x-[10px] pb-[18px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Lead Management System</span>
          </div>
          <div class="d-flex items-center gap-x-[10px] pb-[18px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Customer Management System</span>
          </div>
          <div class="d-flex items-center gap-x-[10px] pb-[18px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Appointment Management System</span>
          </div>
          <div class="d-flex items-center gap-x-[10px] pb-[18px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Visitor management system</span>
          </div>
          <div class="d-flex items-center gap-x-[10px] pb-[18px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Invoice & EMI Management</span>
          </div>
          <div class="d-flex items-center gap-x-[10px] pb-[18px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Online Payment Gateway</span>
          </div>
        </div>
        <div class="mt-[20px]">

          <Button @click="generateLinkFull('crm', price)"
            class="bg-[#ff5757] px-[15px] py-[10px] w-[100%] text-[#fff] rounded-[10px] text-center m-[0px]"
            type="submit" :loading="loading.c" label="Buy Now" />
          <p class="text-[#64748b] text-[15px] text-center mt-[5px]">Additional 18% GST Applicable</p>
        </div>

      </div>
    </div>
  </Sidebar>
  <Sidebar v-model:visible="visibleOwnApp" header="" position="right" class="explore-plans-sidebarr ">
    <div class="px-[15px] py-[18px]">
      <div class="d-flex items-center gap-x-[30px] mb-[17px]">
        <span><img src="/img/png/explore.png" alt=""></span>
        <span class="text-[030229] font-bold text-[20px]">White-Label App</span>
      </div>
      <div class="explore-body-plans">
        <p class="text-[#000000] font-bold text-[35px] mb-[0px]">₹{{ appPrice.toLocaleString('en-IN') }}/-</p>
        <!-- <p class="text-[#64748b] font-normal text-[14px]">Inclusive of 10 users</p> -->
        <div class="mt-[15px]">
          <span class="text-[#3c3c3c] font-bold text-[24px]">Features</span>
          <p style="opacity: 0.8;" class="text-[#3c3c3c] font-normal text-[14px]">Take your immigration business to the
            next level with your own branded mobile app!
          </p>
        </div>
        <div class="mt-[9px]">
          <div class="d-flex items-center gap-x-[10px] pb-[1px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Branded App</span>
          </div>
          <span class="text-[#3c3c3c] text-[14px] font-normal ">Unique identity for your immigration business.</span>
          <div class="d-flex items-center gap-x-[10px] pt-[16px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Client & Appointment Management</span>
          </div>
          <span class="text-[#3c3c3c] text-[14px] font-normal ">Easy client tracking and appointment scheduling.</span>
          <div class="d-flex items-center gap-x-[10px] pt-[16px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Business Showcase</span>
          </div>
          <span class="text-[#3c3c3c] text-[14px] font-normal ">Display services, expertise, and achievements.</span>
          <div class="d-flex items-center gap-x-[10px] pt-[16px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal"> Invoicing & Payments</span>
          </div>
          <span class="text-[#3c3c3c] text-[14px] font-normal ">Create invoices, accept, and track payments.
          </span>
          <div class="d-flex items-center gap-x-[10px] pt-[16px]">
            <span><img class="w-[15px] h-[15px]" src="/img/png/check.png" alt=""></span>
            <span class="text-[#000000] text-[18px] font-normal">Agreements & Documentation</span>
          </div><span class="text-[#3c3c3c] text-[14px] font-normal ">Handle contracts and essential documents.</span>
        </div>
        <div class="mt-[20px]">

          <Button @click="generateLinkFull('app', appPrice)"
            class="bg-[#ff5757] px-[15px] py-[10px] w-[100%] text-[#fff] rounded-[10px] text-center m-[0px]"
            type="submit" :loading="loading.c" label="Buy Now" />
          <p class="text-[#64748b] text-[15px] text-center mt-[5px]">Additional 18% GST Applicable</p>
        </div>

      </div>
    </div>
  </Sidebar>



</template>
<script setup>
const config = useRuntimeConfig();
const price = Number(config.public.PLAN_PRICE); // Convert to Number
const appPrice=Number(config.public.appPrice)
</script>
<script>
export default {
  name: 'AllTodos',
  data() {
    return {
      loading: { c: false },
      plan: false,
      prom: false,
      memb: false,
      visibleRight: false,
      visibleOwnApp: false,
      route: useRoute(),
      data: "",
      price: Number(this.$config.public.PLAN_PRICE), // Convert to Number
      appPrice: Number(this.$config.public.appPrice)
    };
  },
  async setup(){
        const appData = (await useFetch('/api/users/admin')).data
        return {appData};
    },
  mounted() {
    this.fetchData(); // Fetch API data when the component mounts
  },
  methods: {
    async fetchData() {
      try {
        const response = await useFetch('/api/users/admin');
        this.data = response.data.value;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async generateLinkFull(type, amt) {
      // const data_res = (await useFetch('/api/users/admin')).data.value
      amt = amt * 100;
      let data = {
        notes: {
          cid: this.data.user.company_id,
          type: type,
          returnUrl: '/admin/dashboard',
        },
        amount: amt,
        callbackUrl: `${window.location.origin}/admin/verifyplanpayment`,
        description: 'Buy Plan',
      };
      this.loading.c = true;
      await userPost(`/generate-payment-link`, data).then((response) => {
        if (response.status) {
          window.location.replace(response.data.data.short_url)
        }
      });
      this.loading.c = false;
    },

    async openRazorpay() {

    },

    openExplorePlan() {
      this.visibleRight = true;
    },
    openExploreYourOwnApp() {
      this.visibleOwnApp = true;
    },
    openExploreYourOnDomain() {
      this.visibleOnDomain = true;
    },
    toggleValue() {
      this.plan = !this.plan;
      this.prom = false;
      this.memb = false;
      this.$router.push('/admin/ExplorePlan/Builder');
    },
    toggleprom() {
      this.prom = !this.prom;
      this.memb = false;
      this.plan = false;
      this.$router.push('/admin/ExplorePlan/Memberplan');
    },
    togglememb() {
      this.memb = !this.memb;
      this.prom = false;
      this.plan = false;
      this.$router.push('/admin/ExplorePlan/AddMember');
    },
  },
  computed: {
    dynamicId() {
      return this.plan ? 'exp-circle-true' : 'exp-circle-box';
    },
    dynamicId1() {
      return this.prom ? 'exp-circle-true1' : 'exp-circle-box1';
    },
    dynamicId2() {
      return this.memb ? 'exp-circle-true2' : 'exp-circle-box2';
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
