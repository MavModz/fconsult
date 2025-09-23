<!-- @format -->

<template>
  <div class="lead-setting">
    <h2>Shipping Address</h2>
  </div>
  <div class="lead-detail row px-5 pb-5">
    <div class="col-12 col-md-8 d-md-flex flex-md-column">

      <div class="row">
        <div class="form-group col-12 col-md-8 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Full Name</label>
          <input class="form-control" v-model="invoice.shipping.name" @input="searchCustomers"
            @focus="dropdownVisible = true" @blur="handleBlur" :class="{ 'input-invalid': !isValidName }" required>

          <ul v-show="dropdownVisible && searchResults.length > 0"
            class="bg-white border rounded shadow-md w-full max-h-48 overflow-auto z-10 p-0">
            <li v-for="item in searchResults" :key="item._id" class="p-2 cursor-pointer hover:bg-gray-200 leading-0"
              @click="selectCustomer(item)">
              {{ item.name }} ({{ item.unique_id }})
            </li>
          </ul>
        </div>
        <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">GSTIN Number</label>
          <input type="text" v-model="invoice.shipping.gstin" placeholder="------------" />
        </div>
        <!-- <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
    <label for="datepicker">Shipping Date</label>
    <input type="date" id="datepicker" v-model="invoice.shipping.date" class="form-control" placeholder="DD/MM/YYYY" />
  </div> -->
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Country</label>
          <select id="datepicker" v-model="invoice.shipping.country" class="form-control" @change="getState">
            <option :value="i" v-for="i in allCountry">{{ i }}</option>
          </select>
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">State</label>
          <input type="text" id="datepicker" v-model="invoice.shipping.state" class="form-control"
            placeholder="state" />
        </div>

      </div>

      <div class="row mt-4">

        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">City</label>
          <input type="text" id="datepicker" v-model="invoice.shipping.city" class="form-control" placeholder="city" />
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Postal Code</label>
          <input type="text" id="datepicker" v-model="invoice.shipping.postal_code" class="form-control"
            placeholder="state/city" />
        </div>
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Phone Number</label>
          <input type="text" class="form-control" v-model="invoice.shipping.phone" placeholder="+91123456789"
            disabled />
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Email ID</label>
          <input class="form-control" v-model="invoice.shipping.email" disabled>
        </div>

      </div>


      <div class="row mt-4">
        <div class="form-group col-12 col-md-12 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Present Address</label>
          <input type="text" class="form-control" v-model="invoice.shipping.address" placeholder="" />
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
      allCountry:[]
    };
  },
  mounted() {
    this.getCountry();
  },
  methods: {
    async getCountry() {
      await adminGet('/countries').then(response => {
        this.allCountry = response.data
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
