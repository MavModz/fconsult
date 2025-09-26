<!-- @format -->

<template>
  <div class="lead-setting">
    <h2>Billing Address</h2>
  </div>
  <div class="lead-detail row px-5 pb-5">
    <div class="col-12 col-md-8 d-md-flex flex-md-column">

      <div class="row">
        <div class="form-group col-12 col-md-8 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Full Name</label>
          <!-- {{ isEditable }} -->
          <input class="form-control" v-model="invoice.billing.name" :disabled="isEditable">
        </div>
        <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Company Name</label>
          <input class="form-control" v-model="invoice.billing.company" :disabled="isEditable">
        </div>
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Country</label>
          <select id="datepicker" v-model="invoice.billing.country" class="form-control" @change="getState" :disabled="isEditable">
            <option :value="i" v-for="i in allCountry">{{ i }}</option>
          </select>
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">State</label>
          <input id="datepicker" v-model="invoice.billing.state" class="form-control"  :disabled="isEditable">
            <!-- <option :value="i" v-for="i in allState">{{ i }}</option> -->
          </input>
        </div>
        
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">City</label>
          <input id="datepicker" v-model="invoice.billing.city" class="form-control" :disabled="isEditable">
            <!-- <option :value="i" v-for="i in allCity">{{ i }}</option> -->
          </input>
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Postal Code</label>
          <input type="text" id="datepicker" v-model="invoice.billing.postal_code" class="form-control"
            placeholder="state/city" :disabled="isEditable"/>
        </div>
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Billing Phone</label>
          <input type="text" class="form-control" v-model="invoice.billing.phone" placeholder="+91123456789" @keypress="restrictToNumbers" :disabled="isEditable"/>
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Billing Email</label>
          <input class="form-control" v-model="invoice.billing.email" :disabled="isEditable">
        </div>

      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-12 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Present Address</label>
          <input type="text" class="form-control" v-model="invoice.billing.address" placeholder="+91123456789" :disabled="isEditable"/>
        </div>


      </div>


    </div>
    <div class="image-section col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
      <div class="d-flex justify-content-center flex-column align-items-center">
        <div class="input-field col-12 col-md-9 d-md-flex flex-md-column mt-4 pt-md-0">
          <label for="datepicker">GSTIN Number</label>
          <input type="text" v-model="invoice.billing.gstin" placeholder="------------" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    invoice: {},
  },
  data() {
    return {
      isButtonClick: 'lead',
      imageUrl: null,

      dropdownVisible: false,
      searchResults: [],
      timeoutId: null,
      allCountry: [],
      allState: [],
      allCity: [],
      isEditable:true
    };
  },
  mounted() {
    this.getCountry();
    if(this.invoice.billing.name && this.invoice.billing.company && this.billing.country && this.invoice.billing.state && this.invoice.billing.city && this.invoice.billing.postal_code && this.invoice.billing.phone && this.invoice.billing.email && this.invoice.billing.address){
      this.isEditable=false;
    }
  },
  methods: {
    async getCountry() {
      await adminGet('/countries').then(response => {
        this.allCountry = response.data
        this.loading = false
      })
    },
  },
};
</script>
<style scoped>
/* .profile-image {
  width: 100%;
  height: auto;
} */

/* Importing styles */
@import url('./style.css');
</style>
