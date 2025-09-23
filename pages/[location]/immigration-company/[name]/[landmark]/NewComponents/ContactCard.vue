<!-- @format -->
<template>
  <div class="contact-card  mt-0">
    <!-- Tab Buttons -->
    <div class="flex justify-between items-center">
      <!-- Submit Enquiry Tab -->
      <div @click="toggleButton('enquiry')" class="py-[15px] text-center cursor-pointer font-bold w-full" :class="clickedButton === 'enquiry'
        ? 'border-bottoms text-[#F22C15]'
        : 'bg-[#FAFAFA] text-[#74767E] border-gray-bottom'
        ">
        <span>Submit Enquiry</span>
      </div>
      <!-- Book An Appointment Tab -->
      <div @click="toggleButton('appointment')" class="py-[15px] text-center cursor-pointer font-bold w-full"
        :class="clickedButton === 'appointment' ? 'border-bottoms text-[#F22C15]' : 'bg-[#FAFAFA] text-[#74767E] border-gray-bottom'"
        v-if="isAppointment">
        <span>Book An Appointment</span>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Enquiry Form -->
      <div v-if="clickedButton === 'enquiry'" class="tab-pane fade in active show" id="t1">
        <div class="contact-card-form">
          <FormKit type="form" @submit="addLead">
            <!-- Name Input -->
            <div class="input-field">
              <input v-model="selectName" type="text" name="name" maxlength="60" placeholder="Your name*" class="form-control" />
              <p v-if="nameError" class="error-message">Name is required</p>
            </div>

            <!-- Email Input -->
            <div class="input-field">
              <input v-model="selectEmail" type="email" name="email" maxlength="60" placeholder="Email*" class="form-control" />
              <p v-if="emailError" class="error-message">Email is required</p>
            </div>

            <!-- Phone Input -->
            <div class="input-field">
              <input v-model="selectPhone" type="text" name="phone" placeholder="Phone*" class="form-control"
                @keypress="restrictToNumbers" maxlength="10" />
              <p v-if="phoneError" class="error-message">Phone is required</p>
            </div>

            <!-- Country -->
            <div class="mb-[20px]">
              <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="country"
                placeholder="Country*" class="w-full md:w-14rem custom-class-cntprime-cntrr" @change="onCountryChange">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex align-items-center">
                    <div>{{ slotProps.value.country }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex align-items-center gap-2">
                    <img :src="slotProps.option.flag" style="width: 18px" />
                    <div>{{ slotProps.option.country }}</div>
                  </div>
                </template>
              </Dropdown>
              <p v-if="countryError" class="error-message">Please select country first.</p>
            </div>
            <!-- category Dropdown -->
            <div class="custom-class-cntprime mb-[20px]">
              <Dropdown v-model="selectedCategory" :options="categoryOptions" placeholder="Category*"
                class="w-full md:w-14rem" @change="onCategoryChange" @focus="checkCountrySelection" />
              <p v-if="categoryError" class="error-message">Please select category first.</p>
            </div>

            <!-- Services Dropdown -->
            <div class="custom-class-cntprime mb-[20px]">
              <Dropdown v-model="selectedService" :options="serviceOptions" optionLabel="title" placeholder="Service"
                class="w-full md:w-14rem" @focus="checkCategorySelection" />
              <p v-if="serviceError" class="error-message">Please select service first.</p>
            </div>

            <!-- Message Textarea -->
            <div class="input-field">
              <textarea 
  v-model="selectText" 
  name="enquiry_message" 
  placeholder="Message*" 
  rows="2"   maxlength="200" 
  class="textarea-class-cont">
</textarea>
              <p v-if="textError" class="error-message">Message is required</p>
              <p  class="text-[#8d6d16]">Message must be of max 200 Characters.</p>
            </div>

            <!-- Consent Checkbox -->
            <div class="flex items-start gap-[10px] mb-[20px]">
              <label class="checkbox mt-[5px]">
                <input v-model="selectCheckbox" class="checkbox-input" type="checkbox" />
                <svg class="checkbox-check" width="20" height="20">
                  <polyline points="10 4 6 10 4 7"></polyline>
                </svg>
              </label>
              <p class="font-normal text-[#666276]">
                Send me news, tips, and promos from Finder using my email.
              </p>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="site-btn-2 bg-[#ff5757] text-white font-bold hover-effect">
              Send request
            </button>

          </FormKit>
          <!-- <div class="border-line"></div> -->

          <!-- Contact Person Info -->
          <!-- <div v-if="company" class="flex gap-2 items-center mt-[20px] flex-wrap">
              <img class="aspect-square w-[70px] rounded-full" :src="company?.admin_id?.profile_image"
                alt="Floyd Miles" />
              <div class="flex flex-col">
                <span class="font-bold text-[#454056] text-[20px]">{{ company?.admin_id?.name }}</span>
                <span class="flex gap-2">
                  <img src="/img/svg/mail.svg" alt="Email Icon" />
                  <span class="text-[#454056]">{{ company?.admin_id?.email }}</span>
                </span>
              </div>
            </div> -->
        </div>
      </div>

      <!-- Appointment Form -->
      <div v-if="clickedButton === 'appointment'" class="tab-pane fade in active show" id="t2">
        <div class="contact-card-form" v-if="isAppointment">
          <FormKit type="form" @submit="addAppointment">
            <!-- Name Input -->
            <div class="input-field">
              <FormKit v-model="selectName" type="text" name="name" placeholder="Your name*" class="form-control"
                validation="required" />
              <p v-if="nameError" class="error-message">Name is required</p>
            </div>

            <!-- Email Input -->
            <div class="input-field">
              <FormKit v-model="selectEmail" type="email" name="email" placeholder="Email*" class="form-control"
                validation="required" />
              <p v-if="emailError" class="error-message">Email is required</p>
            </div>

            <!-- Phone Input -->
            <div class="input-field">
              <FormKit v-model="selectPhone" type="text" name="phone" placeholder="Phone" class="form-control"
                validation="required" @keypress="restrictToNumbers" maxlength="10" />
              <p v-if="phoneError" class="error-message">Phone is required</p>
            </div>

            <div class="custom-class-cntprime mb-[20px]">
              <FormKit type="select" validation="required" name="mode" :options="['online', 'offline']"
                v-model="currentAppointment.source" />
              <p v-if="categoryError" class="error-message">Please select mode first.</p>
            </div>

            <div class="mt-2" v-if="currentAppointment.source == 'offline'">
              <FormKit type="text" label="Location" name="location" v-model="currentAppointment.location" />
            </div>


            <!-- Country -->
            <div class="mb-[20px]">
              <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="country"
                placeholder="Country" class="w-full md:w-14rem custom-class-cntprime-cntrr" @change="onCountryChange">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex align-items-center">
                    <div>{{ slotProps.value.country }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex align-items-center gap-2">
                    <img :src="slotProps.option.flag" style="width: 18px" />
                    <div>{{ slotProps.option.country }}</div>
                  </div>
                </template>
              </Dropdown>
              <p v-if="countryError" class="error-message">Please select country first.</p>
            </div>
            <!-- category Dropdown -->
            <div class="custom-class-cntprime mb-[20px]">
              <Dropdown v-model="selectedCategory" :options="categoryOptions" placeholder="Category"
                class="w-full md:w-14rem" @change="onCategoryChange" @focus="checkCountrySelection" />
              <p v-if="categoryError" class="error-message">Please select category first.</p>
            </div>

            <!-- Services Dropdown -->
            <div class="custom-class-cntprime mb-[20px]">
              <Dropdown v-model="selectedService" :options="serviceOptions" optionLabel="title" placeholder="Service"
                class="w-full md:w-14rem" @focus="checkCategorySelection" />
              <p v-if="serviceError" class="error-message">Please select service first.</p>
            </div>


            <div class="dates mt-4">
              Available Dates :
              <Calendar v-model="selectedDate" view="month" dateFormat="mm/yy" :placeholder="'JAN 2025'"
                :month-change="fetchDates()" />
            </div>
            <Carousel class="mt-4" :value="timings" :numVisible="6" :numScroll="3" :showIndicators="false"
              :circular="true">

              <template #item="d">
                <center class="m-1">
                  <button class="alldates"
                    :class="{ 'activedate': selectedDate.getDate() == d.data.date, 'disableddate': isDatePast(d.data.date) }"
                    style="width: 100%;" type="button" @click="updateSelectedDate(d.data.date)">
                    <span style="font-size: 100%;">{{ d.data.date }}</span>
                    <br>
                    <small style="font-size: 70%;">{{ d.data.day }}</small>
                  </button>
                </center>
              </template>
            </Carousel>
            <div class="col-xl-12 mt-4">
              <small class="mt-4">Selected Date : {{ selectedDate.getDate() }}</small>

              <div class="row mt-2" v-if="timings.length > 0">
                <div class="times" v-for="i in timings.find(t => t.date === selectedDate.getDate())?.timings"
                  :class="{ 'activedate': (time == i) }" @click="time = i">
                  <small>{{ i }}</small>
                </div>
              </div>
            </div>

            <!-- Consent Checkbox -->
            <div class="flex items-start gap-[10px] mb-[40px] mt-[40px]">
              <label class="checkbox mt-[5px]">
                <input v-model="selectCheckbox" class="checkbox-input" type="checkbox" />
                <svg class="checkbox-check" width="20" height="20">
                  <polyline points="10 4 6 10 4 7"></polyline>
                </svg>
              </label>
              <p class="font-normal text-[#666276]">
                Send me news, tips, and promos from Finder using my email.
              </p>
            </div>

            <button type="submit" class="site-btn-2 bg-[#ff5757] text-white hover-effect">
              Send request
            </button>
          </FormKit>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { format, addMinutes } from 'date-fns';

export default {
  name: 'ContactCard',
  props: {
    value: {
      type: String,
      default: 'Home',
    },
    company: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      items: [],
      inputValue: null,
      dropdownVisible: false,
      clickedButton: 'enquiry',
      selectedCountry: null,
      selectedMode: null,
      countries: null,
      categoryOptions: null,
      selectedCategory: null,
      serviceOptions: null,
      selectedService: null,
      selectCheckbox: null,
      modeError: false,
      countryError: false,
      categoryError: false,
      serviceError: false,
      selectName: null,
      selectEmail: null,
      selectPhone: null,
      selectText: null,
      selectDate: null,
      nameError: false,
      phoneError: false,
      emailError: false,
      textError: false,
      dateError: false,
      minDateTime: '',
      time: "09:00",
      date: new Date().toISOString().split("T")[0],
      storeIdMount: null,
      storePermMount: null,
      modeOptions: [
        { label: "Online", value: "online" },
        { label: "Offline", value: "offline" }
      ],
      selectedStatus: 'All',
      appointment: [],
      first: 0,
      rows: 6,
      totalAppointments: 0,
      rescheduleModal: false,
      timings: null,
      year: 2025,
      selectedDate: new Date(),
      dateResult: null,
      month: 0,
      freq: 0,
      schedule: null,
      totalDays: null,
      currentStatus: null,
      currentAppointment: { source: 'online' },
      time: null,
      defaultAdmin: null,
      adminEmail: null,
      selectedTimings: [],
      isAppointment: false

    };
  },
  async setup() {
    const me = ((await useFetch('/api/users/admin')).data).value
    return { me }
  },

  async mounted() {
    this.selectedDate = new Date();
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;
    await this.countryDrop();
    document.addEventListener('click', this.handleClickOutside);
    this.reschedule(this.$route.params.id.split('-')[1]);
    this.updateSelectedDate(this.selectedDate.getDate());

  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {

    onMonthChange() {
      this.dateIndex = 0;
      this.selectedDate = new Date();
    },

    updateSelectedDate(date) {
      const selectedTiming = this.timings?.find(item => item.date === date);
      if (selectedTiming) {
        this.selectedDate = new Date(this.selectedDate);  // Ensure it's a Date object
        this.selectedDate.setDate(date); // Update the selected day

        this.date = date// Update the selected date to be shown in the UI
      }
    },
    isDatePast(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedMonth = this.selectedDate.getMonth();
      const selectedYear = this.selectedDate.getFullYear();

      if (selectedYear > today.getFullYear() || (selectedYear === today.getFullYear() && selectedMonth > today.getMonth())) {
        return false;
      }

      if (selectedYear === today.getFullYear() && selectedMonth === today.getMonth()) {
        const currentDate = new Date(today.getFullYear(), today.getMonth(), date);
        return currentDate < today;
      }

      return true;
    },


    async fetchDates() {
      if (this.selectedDate) {
        this.year = this.selectedDate.getFullYear();
        this.month = this.selectedDate.getMonth();
      }

      const result = [];
      // Get the total days in the current month
      const totalDays = new Date(this.year, this.month + 1, 0).getDate();

      for (let date = 1; date <= totalDays; date++) {
        const currentDate = new Date(this.year, this.month, date);

        let dayIndex = currentDate.getDay();
        if (dayIndex === 0) {
          dayIndex = 1;
        } else {
          dayIndex += 1;
        }

        const daySchedule = this.schedule[`day${dayIndex}`];


        if (daySchedule?.status) {
          const timings = this.generateTimings(
            daySchedule.from,
            daySchedule.to,
            this.freq
          );

          result.push({
            day: daySchedule.name.slice(0, 3),  // Get first 3 letters of the day name (e.g., Mon, Tue)
            date: date,  // The actual date
            timings,     // Generated timings for that day
          });
        }
      }

      // Set the result to timings
      this.timings = result;
    },

    reschedule(id) {
      const month = this.month;
      const year = this.year;
      userGet(`/appointment-buffer/${id}`).then(async (r) => {
        if (r.data.status) {
          this.schedule = r.data.data;
          this.freq = r.data.freq;
          this.defaultAdmin = r.data.defaultAdmin
          this.adminEmail = r.data.adminEmail
          this.totalDays = new Date(this.year, this.month + 1, 0).getDate();
          this.fetchDates()
          this.isAppointment = true
        }

      });
      this.rescheduleModal = true
    },

    generateTimings(from, to, frequency) {
      const timings = [];
      let startTime = new Date(`1970-01-01T${from}:00`);
      const endTime = new Date(`1970-01-01T${to}:00`);
      while (startTime < endTime) {
        timings.push(format(startTime, 'hh:mm a'));
        startTime = addMinutes(startTime, frequency);
      }
      return timings;
    },

    onPageChange(event) {
      this.first = event.first;  // Update the first index
      const page = Math.floor(event.first / this.rows) + 1;  // Calculate the current page
      this.fetchAppointments(page);
    },
    async fetchAppointments(page) {
      this.loading = true;
      try {
        const response = await userAppointement({ page, limit: this.rows });
        if (response.status === true) {
          this.appointment = response.data;
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        this.loading = false;
      }
    },
    convertDate(isoDate) {
      const date = new Date(isoDate);
      const year = date.toLocaleDateString('en-US', { year: 'numeric' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.toLocaleDateString('en-US', { day: '2-digit' });
      const hours24 = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const hours12 = (date.getHours() % 12 || 12).toString().padStart(2, '0');
      const ampm = date.getHours() < 12 ? 'AM' : 'PM';
      const time24 = `${hours24}:${minutes}`;
      const time12 = `${hours12}:${minutes} ${ampm}`;
      return { year, month, day, time24, time12 };
    },

    async countryDrop() {
      const res = await homeGet(`/company-country-list/${this.storePermMount}`)
      this.countries = res.data.data;
    },
    async categOptions(country) {
      const res = await homeGet(`/home-add-company-api/${country}/${this.$route.params.id.split('-')[1]}`)
      this.categoryOptions = res.data.category;
    },
    async serviceOpt(category) {
      const res = await homeGet(`/home-add-enquiry-services/${this.storePermMount}/${category}`)
      this.serviceOptions = res.data.category;
    },

    async onCountryChange() {
      if (this.selectedCountry) {
        await this.categOptions(this.selectedCountry.country);
        this.selectedCategory = null;
        this.selectedService = null;
        this.countryError = false;
      }
    },
    async onCategoryChange() {
      if (this.selectedCategory) {
        await this.serviceOpt(this.selectedCategory);
        this.selectedService = null;
        this.categoryError = false;
      }
    },
    checkCountrySelection() {
      if (!this.selectedCountry) {
        this.countryError = true;
        setTimeout(() => {
          this.countryError = false;
        }, 3000);
      }
    },
    checkModeSelection() {
      if (!this.selectedMode) {
        this.modeError = true;
        setTimeout(() => {
          this.modeError = false;
        }, 3000);
      }
    },
    checkCategorySelection() {
      if (!this.selectedCategory) {
        this.categoryError = true;
        setTimeout(() => {
          this.categoryError = false;
        }, 3000);
      }
    },
    toggleButton(buttonType) {
      this.clickedButton = buttonType;
      this.resetEnquiryForm();
    },
    validateForm() {
      this.nameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.textError = false;
      this.countryError = false;

      this.categoryError = false;
      let isValid = true;
      if (!this.selectName) {
        this.nameError = true;
      }
      if (!this.selectEmail) {
        this.emailError = true;
      }
      if (!this.selectPhone) {
        this.phoneError = true;

      }
      if (!this.selectText) {
        this.textError = true;

      }


      if (!this.selectedCountry) {
        this.countryError = true;
      }
      if (!this.selectedCategory) {
        this.categoryError = true;
      }
      if (this.countryError || this.categoryError || this.phoneError || this.textError || this.nameError || this.emailError) {
        setTimeout(() => {
          this.countryError = false;
          this.categoryError = false;
          this.nameError = false;
          this.emailError = false;
          this.phoneError = false;
          this.textError = false;

        }, 3000);
        return;
      }
      return isValid;
    },

    async addLead(formData) {
      if (this.me.isLogged) {
        const isFormValid = this.validateForm();
        if (!isFormValid) {
          return;
        }
        if (!this.selectCheckbox) {
          errorAlert('Please agree to receive news, tips, and promos.');
          return;
        }
        const payload = {
          ...formData,
          company_id: this.storePermMount,
          source: 'home',
          interested_country: this.selectedCountry?.country,

          listing: this.selectedService?._id,
          service: this.selectedCategory,
          name: this.selectName,
          email: this.selectEmail,
          phone: this.selectPhone,
          enquiry_message: this.selectText,
        };
        try {
          const response = await userPost('/home-add-leads', payload);
          if (response.data.status) {
            successAlert('Applied Successfully');
            this.resetEnquiryForm();
          } else {
            errorAlert(response.data.msg);
          }
        } catch (error) {
          console.error('Error submitting enquiry:', error);
          errorAlert('An error occurred while submitting your enquiry.');
        }
      } else {
        this.$router.push("/auth/login")
      }

    },


    async addAppointment(formData) {
      if (this.me.isLogged) {
        if (!this.selectedCountry) {
          errorAlert('Please select country');
          return;
        }
        if (!this.selectedCategory) {
          errorAlert('Please select category');
          return;
        }
        if (!this.time) {
          errorAlert('Please select time');
          return;
        }
        if ((this.date + 1) < new Date().getDate()) {
          errorAlert('Please select future date');
          return;
        }

        const [hour, minute, period] = (this.time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i) || []).slice(1);
        if (!hour) return console.error('Invalid time format:', this.time);
        let h = parseInt(hour), m = parseInt(minute), p = period.toUpperCase();
        if (p === 'PM' && h !== 12) h += 12;
        if (p === 'AM' && h === 12) h = 0;
        if (this.date.toString().includes("-")) {
          this.date = this.date.split('-')[2]
        }
        const start = new Date(this.year, this.month, this.date, h, m);
        if (isNaN(start)) return console.error('Invalid Date:', start);
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        const offsetIST = 5.5 * 60 * 60 * 1000;
        const istStart = new Date(start.getTime() + offsetIST);
        const istEnd = new Date(end.getTime() + offsetIST);
        const istStartISOString = istStart.toISOString().replace('Z', '+05:30');
        const istEndISOString = istEnd.toISOString().replace('Z', '+05:30');

        let d = {
          "lead_id": null,
          "admin_id": this.defaultAdmin.split('_')[1],
          "mode": formData.mode,
          "user_email": formData.email,
          "status": "home-appointment",
          "accept_user": false,
          "accept_admin": true,
          "company_id": this.$route.params.id,
          "created_by": this.defaultAdmin.split('_')[1],
          "summary": "HomePage Meeting",
          "event_id": null,
          "description": "Appointment Created Through Homepage",
          "location": null,
          "start": {
            "dateTime": istStartISOString
          },
          "end": {
            "dateTime": istEndISOString
          },
          "attendees": [
            { "email": formData.email },
            { "email": this.defaultAdmin.split('_')[0] },
            { "email": this.adminEmail },
          ],
          "organizer": {
            "email": this.defaultAdmin.split('_')[0]
          },
          "google_event": false,
          "userRequest": true,
        }
        d.selectedCountry = this.selectedCountry
        d.selectedCategory = this.selectedCategory
        d.selectedService = this.selectedService
        if (formData.mode == 'online') { d.google_event = true }
        d = { d, ...formData }


        await userPost('/home-add-appointments', d).then((r) => {
          successAlert('Appointment Requested Successfully');
          this.resetEnquiryForm();
        }).catch((e) => { })

      } else {
        this.$router.push("/auth/login")
      }

    },
    // Reset Enquiry Form Fields
    resetEnquiryForm() {
      this.selectName = null;
      this.selectEmail = null;
      this.selectPhone = null;
      this.selectText = null;
      this.selectedCountry = null;
      this.selectedCategory = null;
      this.selectedService = null;
      this.selectCheckbox = null;
      // Reset other form fields if necessary
    },
  },





};

</script>

<style scoped>
@import url('../style.css');

.hover-effect:hover {
  background: white !important;
  color: #FF5757 !important;
}

.hover-effect {
  border: 1px solid #ff5757;
}

.error-message {
  color: red;
  font-size: 0.85rem;
  /* margin-top: 0.5rem; */
}

.custom-class-cntprime-cntrr {
  border: 1.21px solid #d5d2dc;
  cursor: pointer;
  padding: 10px;
}

.custom-class-cntprime .p-dropdown {
  border: 1.21px solid #d5d2dc;
  padding: 10px;
  cursor: pointer;
}

.border-line {
  border: 1px solid #efecf3;
  margin: 20px 0px;
}

.border-bottoms {
  border-bottom: 3px solid #f22c15;
}

.p-dropdown-items li {
  padding: 8px 10px !important;
}

.border-gray-bottom {
  border-bottom: 1px solid #dadbdd;
}

.border-gray {
  border: 1.21px solid #d5d2dc;
}

.custom-dropdown {
  position: relative;
  display: inline-block;
  width: -webkit-fill-available;
  aspect-ratio: 9 / 1;
}

.dropdown-container {
  border: 1.21px solid #d5d2dc;
  padding: 10px;
  cursor: pointer;
  background: #fff;
  width: -webkit-fill-available;
  border-radius: 8px;
  aspect-ratio: 9 / 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9691a4;
}

.dropdown-options {
  position: absolute;
  transform: translate(0px, 66%);
  left: 0;
  right: 0;
  background: #fff;
  border: 1.21px solid #d5d2dc;
  z-index: 10;
  border-radius: 2% / 6%;
}

.dropdown-option {
  padding: 10px;
  cursor: pointer;
  aspect-ratio: 9/1;
}

.dropdown-option:hover {
  background-color: #f0f0f0;
}

/* From Uiverse.io by elijahgummer */
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

.checkbox:hover .checkbox-check {
  background: #ff475425;
}

.checkbox-input {
  width: 1px;
  height: 1px;
  opacity: 0;
}

.checkbox-input:checked+.checkbox-check {
  background: #fff;
  stroke-dashoffset: 0;
}

.checkbox-check {
  border: 3px solid #ff5757;
  stroke: #ff5757;
  stroke-dasharray: 25;
  stroke-dashoffset: 25;
  stroke-linecap: round;
  stroke-width: 0.14rem;
  border-radius: 0.2rem;
  fill: none;
  transition: background 0.4s, stroke-dashoffset 0.6s;
}

@media screen and (max-width:425px) {
  .site-btn-2 {
    height: 50px !important;
    line-height: 20px !important;
  }

}


/* Add styles for inactive buttons */

:deep(.p-paginator) {
  justify-content: flex-start;
  background-color: transparent;
}

.times {
  border: 0.1px solid #6B779A1A;
  margin: 5px;
  border-radius: 6px;
  height: 30px;
  padding: 5px 0px 0px 12px;
  flex: 0 0 90px;
}

.times:hover {
  background-color: #ff5757;
  color: #fff;
  cursor: pointer;
}

.p-carousel {
  position: relative !important;
}



/* Add styles for inactive buttons */

:deep(.p-paginator) {
  justify-content: flex-start;
  background-color: transparent;
}

/* media query here  */



/* Add styles for inactive buttons */

/* 
  /* media query here  */

.times {
  border: 0.1px solid #6B779A1A;
  margin: 5px;
  border-radius: 6px;
  height: 30px;
  padding: 5px 0px 0px 12px;
  flex: 0 0 90px;
}

.times:hover {
  background-color: #ff5757;
  color: #fff;
  cursor: pointer;
}



.reschedule {
  background-color: #008CE41A;
  color: #008CE4;
  border-radius: 100px;
  font-weight: 100;
}

.accept {
  background-color: #ff5757;
  color: #fff;
  border-radius: 100px;
  font-weight: 100;
}

.accept :hover {
  background-color: #fff;
  color: #ff5757;
  border-radius: 100px;
  font-weight: 100;
}

.times {
  border: 0.1px solid #6B779A1A;
  margin: 5px;
  border-radius: 6px;
  height: 30px;
  padding: 5px 0px 0px 12px;
  flex: 0 0 90px;
}

.alldates {
  border: 0.1px solid #6B779A1A;
  border-radius: 10px;
  padding: 15px 0px 10px 0px;
}

.disableddate {
  background-color: #f5f5f5;
  /* Light grey background */
  color: #b0b0b0;
  /* Grey text */
  border: 1px solid #e0e0e0;
  /* Optional: Grey border */
  pointer-events: none;
  /* Disable clicking */
}

.activedate,
.activetime,
.alldates:hover,
.times:hover {
  background-color: #ff5757;
  color: #fff;
  cursor: pointer;
}

.disableddate {
  background-color: #f5f5f5;
  /* Light grey background */
  color: #b0b0b0;
  /* Grey text */
  border: 1px solid #e0e0e0;
  /* Optional: Grey border */
  pointer-events: none;
  /* Disable clicking */
}
</style>