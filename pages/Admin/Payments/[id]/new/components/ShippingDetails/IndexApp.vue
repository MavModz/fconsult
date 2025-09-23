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
        <div class="input-field col-12 col-md-4 d-md-flex flex-md-column pt-md-0">
          <label for="datepicker">GSTIN Number</label>
          <input type="text" v-model="invoice.shipping.gstin" placeholder="------------" />
        </div>
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
          <select id="datepicker" v-model="invoice.shipping.state" class="form-control" @change="getCity">
            <option :value="i" v-for="i in allState">{{ i }}</option>
          </select>
        </div>

      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">City</label>
          <select id="datepicker" v-model="invoice.shipping.city" class="form-control">
            <option :value="i" v-for="i in allCity">{{ i }}</option>
          </select>
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Postal Code</label>
          <input type="text" id="datepicker" v-model="invoice.shipping.postal_code" class="form-control"
            placeholder="Pin Code" @keypress="restrictToNumbers" />
        </div>
      </div>

      <div class="row mt-4">
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Phone Number</label>
          <input type="text" class="form-control" v-model="invoice.shipping.phone" placeholder="+91"
            :disabled="!isEditable" @keypress="restrictToNumbers" :maxlength="10" />
        </div>
        <div class="form-group col-12 col-md-6 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="exampleInputPassword1">Email ID</label>
          <input class="form-control" v-model="invoice.shipping.email" placeholder="Email" :disabled="!isEditable">
        </div>

      </div>


      <div class="row mt-4">
        <div class="form-group col-12 col-md-12 d-md-flex flex-md-column pt-4 pt-md-0">
          <label for="datepicker">Present Address</label>
          <input type="text" class="form-control" v-model="invoice.shipping.address" placeholder="Present Address" />
        </div>


      </div>


    </div>
    <!-- <div class="image-section col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
      <div class="d-flex justify-content-center flex-column align-items-center">
        <div class="input-field col-12 col-md-9 d-md-flex flex-md-column mt-4 pt-md-0">
          <label for="datepicker">GSTIN Number</label>
          <input type="text" v-model="invoice.shipping.gstin" placeholder="------------" />
        </div>
      </div>
    </div> -->
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
      // invoice: {
      //   shipping: {
      //     name: "",
      //     company: "",
      //     email: "",
      //     phone: "",
      //     city: "",
      //     state: "",
      //     country: "",
      //     postal_code: "",
      //     address: "",
      //     gstin: "",
      //     date: new Date().toISOString().slice(0, 10),
      //   },
      // },
      customer_id: null,
      dropdownVisible: false,
      searchResults: [],
      timeoutId: null,
      isValidName: true,
      selectedCountry: null,
      allCountry: [],
      allState: [],
      allCity: [],
      isEditable: true
    };
  },
  mounted() {
    this.getCountry()

  },
  watch: {
    'invoice.shipping.country'(newVal) {
      if (newVal) {
        this.getState();
      }
    },
    'invoice.shipping.state'(newVal) {
      if (newVal) {
        this.getCity();
      }
    }
  },
  methods: {
    async getCountry() {
      await adminGet('/countries').then(response => {
        this.allCountry = response.data
        this.loading = false
      })
    },
    async getState() {
      await adminGet(`/states/${this.invoice.shipping.country}`).then(response => {
        this.allState = response.data
      })
    },
    async getCity() {
      await adminGet(`/city/${this.invoice.shipping.state}`).then(response => {
        this.allCity = response.data
      })
    },
    async searchCustomers() {
      clearTimeout(this.timeoutId);
      if (!this.invoice.shipping.name.trim()) {
        this.searchResults = [];
        this.isValidName = true;
        return;
      }
      this.timeoutId = setTimeout(async () => {
        try {
          const response = await adminGet(
            `/search-customers?q=${encodeURIComponent(this.invoice.shipping.name.trim())}`
          );
          if (response.data.status) {
            this.searchResults = response.data.data.exactMatches.concat(
              response.data.data.fuzzyMatches
            );
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }, 500);
    },


    selectCustomer(customer) {

      this.invoice.shipping.name = customer.name;
      this.invoice.shipping.city = customer.city
      this.invoice.shipping.country = customer.country
      this.invoice.shipping.state = customer.state
      this.invoice.shipping.postal_code = customer.pincode
      this.invoice.shipping.address=customer.per_address
      this.customer_id = customer._id
      this.isValidName = true;
      this.dropdownVisible = false;
      this.$emit('updateCustomerDetails', customer)

      if (this.invoice.shipping.phone) {
        this.isEditable = false;
      }
      if (this.invoice.shipping.email) {
        this.isEditable = false;
      }
     
    },

    handleBlur() {
      setTimeout(() => {
        this.dropdownVisible = false;
      }, 200);
      if (this.searchResults.length > 0 && !this.searchResults.some(item => item.name === this.invoice.shipping.name)) {
        this.isValidName = false; // Invalid if name is not in the list
      } else {
        this.isValidName = true; // Valid if the name is in the list or empty
      }
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
