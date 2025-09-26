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
          <input class="form-control" v-model="invoice.billing.name" disabled>
        </div>

        <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Company Name</label>
          <input class="form-control" v-model="invoice.billing.company" disabled>
        </div>
      </div>


      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Country</label>
          <input type="text" id="datepicker" v-model="invoice.billing.country" class="form-control"
            placeholder="state/city" disabled/>
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">State</label>
          <input type="text" id="datepicker" v-model="invoice.billing.state" class="form-control"
            placeholder="state/city" disabled/>
        </div>
        
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">City</label>
          <input type="text" id="datepicker" v-model="invoice.billing.city" class="form-control"
            placeholder="state/city" disabled/>
        </div>
        
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Postal Code</label>
          <input type="text" id="datepicker" v-model="invoice.billing.postal_code" class="form-control"
            placeholder="state/city" disabled/>
        </div>
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Billing Phone</label>
          <input type="text" class="form-control" v-model="invoice.billing.phone" placeholder="+91123456789" disabled/>
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Billing Email</label>
          <input class="form-control" v-model="invoice.billing.email" disabled>
        </div>

      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-12 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Present Address</label>
          <input type="text" class="form-control" v-model="invoice.billing.address" placeholder="+91123456789" disabled/>
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
    };
  },
  mounted() {

  },
  methods: {

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
