<template>
  <div class="tourist-basic-container">

    <FormKit type="form" @submit="handleFormSubmit">
      <div class="tourist-basic-wrapper">
        <div class="tourist-basic-1st">
          <div class="tourist-basic-header">
            <div class="tourist-basic-header-inside">
              <div><img src="/img/png/info.png" /></div>
              <span class="tourist-basic-basdgn">Program Details </span>
            </div>
            <div class="nights-5days">
              <span class="tourist-basic-he-4days">{{ night }} Nights</span>
              <span class="tourist-basic-he-5days">Or {{ days }} Days</span>
            </div>
          </div>
          <div class="tourist-bacs-1stbx">
            <div class="tourist-bsc-dic-wd">
              <label class="tourist-basc-lble required">Package Name</label><br />
              <FormKit type="text" validation="required" placeholder=" add title" name="title" v-model="title"
                class="tourist-basc-inpt1st" validation-label="Destination Title" />

            </div>
            <div class="tourist-bsc-dic-wd">

              <label class="tourist-basc-lble required">Destination Title</label><br />
              <FormKit type="text" validation="required" v-model="destination_title" name="destination_title"
                placeholder="add name" class="tourist-basc-inpt1st" validation-label="Destination Title" />
            </div>

          </div>
          <div class="tourist-bacs-2stbx">
            <div class="tourist-bsc-dic-wd">
              <label class="tourist-basc-lble required">Departure</label><br />
              <FormKit type="datetime-local" validation="required|date_after" v-model="departure" name="departure"
                @change="addDate()" class="tourist-basc-inpt1st" validation-label="Departure date" />
            </div>
            <div class="tourist-bsc-dic-wd">
              <span class="tourist-bsc-dic-checkbx">
                <label class="tourist-basc-lble required">Return </label>
              </span>

              <FormKit type="datetime-local" validation="required|date_after" v-model="returndate" @change="addDate()"
                name="return" class="tourist-basc-inpt1st" validation-label="Return date" />
            </div>
          </div>

          <div class="">
            <!-- <label class="required">Country</label> -->

            <div class=" select-option cursor-pointer  items-center mt-[25px]">
            
              <label class="tourist-basc-lble required">Country</label><br />
              <FormKit type="select" name="country" v-model="country" validation="required"
                placeholder="Select a Country" :options="adminCountries" />

            </div>

            <!-- <p v-if="validationErrors.country" class="!text-red-500 text-sm mt-1">
              {{ validationErrors.country }}
            </p> -->
          </div>

          <div class="tourist-cont-uploadim">
            <div class="d-flex items-start gap-[10px] transport-p">
              <div class="tourist-minwidth-qsr">

                <span class="tourist-dou-haveqst">Do you provide Transportation !?</span>

                <FormKit type="radio" validation="required" :options="[
                  { label: 'Yes, we provide it', value: true },
                  { label: 'No, it’s not included', value: false }
                ]" v-model="formData.questions" class="styled-checkbox" id="styled-checkbox-1" />

              </div>
              <div class="custom-dropdown">
                <button type="button" class="dropdown-toggle" @click="TransportationOpen = !TransportationOpen"><span
                    class="dropdown-head">{{ selectedTransport }}</span> <i class="bi bi-chevron-down"></i></button>
                <div class="dropdown-menu" v-if="TransportationOpen">
                  <div class="dropdown-item-1" v-for="option in transportOptions" :key="option"
                    @click="selectTransport(option)"> {{ option }}</div>
                </div>
              </div>
            </div>


            <div class="tourist-back-addimg-after">
              <div class="tourist-back-addimg-brdr">
                <!-- {{ "kj" }} {{ cover_image }} -->
                <div v-if="cover_image" class="upload-image-after relative">
                  <!-- Cover Image -->
                  <img :src="cover_image" alt="Cover" class="upload-image-content w-full rounded-md" />

                  <!-- Edit Button in Top-Right Corner -->
                  <button type="button"
                    class="absolute top-2 right-2 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-100"
                    @click="$refs.icon_imageInput.click()">
                    <i class="bi bi-pencil-square text-gray-700 text-sm"></i>
                  </button>


                  <!-- Hidden File Input -->
                  <input ref="icon_imageInput" id="icon_imageInput" type="file" accept="image/*" style="display: none"
                    @change="icon_handleImageChange" />

                  <!-- Hidden FormKit Binding -->
                  <FormKit name="cover_image" type="text" v-model="cover_image" id="icon" hidden />
                </div>

                <div v-else class="upload-image" :style="'background-image:url(' + cover_image + ')'">
                  <div class="upload p-3">
                    <label data-kt-image-input-action="change" class="flex items-center gap-2">
                      <img src="/img/svg/camera.svg" />
                      <h4 class="m-0 upload-text">Upload Cover Image</h4>

                      <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                        @change="icon_handleImageChange" accept="image/*" />
                      <FormKit name="cover_image" type="text" validation="required" v-model="cover_image" id="icon"
                        hidden />
                    </label>
                    <!-- <p v-if="!cover_image && imageError" class="!text-[#ff0000] text-xs mt-2">
  Cover Image is required.
</p> -->
                  </div>
                </div>
              </div>
            </div>



          </div>
          <div class="input-gp">
            <div>
              <label class="required">Description</label>
            </div>
            <div class="study-visa-description-block">
              <QuillEditor v-model="description" :modules="modules" ref="qhtml" class="mb-3" style="height:150px" />
              <p v-if="descriptionError" class="!text-[#ff0000] description-error text-xs  mt-[-5px] mb-5">
                {{ descriptionError }}
              </p>
            </div>
          </div>

          <div class="toggle-container">
  <label class="switch">
    <input type="checkbox" v-model="pricingEnabled" />
    <span class="slider"></span>
  </label>
  <span class="label-text">Add Pricing</span>
</div>

<!-- Pricing Inputs -->
<div
  class="mt-4 flex items-center gap-[9px] sm:gap-[18px] flex-wrap justify-content-between"
  v-if="pricingEnabled"
>
  <div class="flex items-center gap-[10px] sm:gap-4 inputs">
    <!-- User Name -->
    <div class="input-groups">
      <label>Add User Name</label>
      <input type="text" class="outline-none" v-model="userName" placeholder="-------------------" />
    </div>

    <!-- Pricing with Currency -->
    <div class="input-groups">
      <label>Pricing</label>
      <div class=" flex  price  border-[1px] border-[#D5D2DC] rounded-[10px] ">
        <select v-model="currency" class="pl-[20px] outline-none border-0 leading-[28px] rounded-[10px] py-[10px] w-[70px] ">
          <option value="" ></option>
          <option value="₹">₹</option>
          <option value="$">$</option>
        </select>
         <span class="border-r-[1px] ml-2 rounded-0 border-l-[0px] border-y-[0px]"></span>
        <input
          v-model="userPrice"
          @keypress="onlyNumber($event)"
          class=" border-0   outline-none"
          type="text"
          placeholder="enter price"
        />
      </div>
    </div>
  </div>

  <!-- Add Pricing Button -->
  <button type="button" class="pricing-btn flex flex-nowrap" @click="addPricing">
    + Add Pricing
  </button>
</div>

<!-- Added Tags -->
<div class="tags mt-4" v-if="tags.length > 0">
  <div v-for="(tag, index) in tags" :key="index" class="tag">
    <span class="flex items-center justify-between">
      {{ tag.userName }}
      <span class="close" @click="removeTag(index)">×</span>
    </span>
    <div class="amount">{{ tag.currency }}{{ tag.userPrice }}/-</div>
  </div>
</div>

          <!-- <div class="toggle-container">
            <label class="switch ">
              <input type="checkbox" v-model="pricingEnabled">
              <span class="slider "></span>
            </label>
            <span class="label-text ">Add Pricing</span>
          </div>
          <div class="mt-4 flex items-center  gap-[9px] sm:gap-[18px] flex-wrap justify-content-between"
            v-if="pricingEnabled">
            <div class="flex items-center  gap-[10px] sm:gap-4 inputs">
              <div class="input-groups ">
                <label>Add User Name</label>
                <input type="text" v-model="userName" placeholder="-------------------" />
              </div>
              <div class="input-groups">
                <label>Pricing</label>
                <div class="input-money flex items-center ">
                  <div class="money-fixed">₹</div>
                  <input v-model="userPrice" @keypress="onlyNumber($event)" class="border-input" type="text"
                    placeholder="enter price" />
                </div>
              </div>
            </div>
            <button type="button" class="pricing-btn flex flex-nowrap " @click="addPricing">
              + Add Pricing
            </button>
          </div>
          <div class="tags mt-4" v-if="tags.length > 0">
            <div v-for="(tag, index) in tags" :key="index" class="tag"><span class="flex items-center justify-between">
                {{ tag.userName }} <span class="close" @click="removeTag(index)">×</span></span>
              <div class="amount">₹{{ tag.userPrice }}/-</div>
            </div>
          </div> -->
        </div>

        <!-- <div class="mt-4" v-if="allForm">
          <TabView :scrollable="true">
            <TabPanel v-for="(tab, index) in tabs" :key="tab.title" :header="tab.title">
              <div class="card">
                <Pkg :x="formData.days[index]" />
              </div>
            </TabPanel>
          </TabView>
        </div> -->

        <div v-for="(day, index) in formData.days" :key="index" class="joblis-lsr-nextbtn">
          <div class="day-section">
            <div class="day-header">
              <div class="flex items-center gap-[7px] sm:gap-[15px]">
                <img src="/public/img/png/6-dots-Vector.png">
                <div class="day-title d-flex gap-[10px]">
                  <i class="bi bi-calendar4"></i>
                  <strong>Day {{ index + 1 }}</strong>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="add-details-btn flex items-center" @click="toggleDayDetails(index)">
                  + Add Details <i class="bi bi-chevron-down"></i>
                </div>
                <div class="add-details-drop" v-if="openDayDetails[index]">
                  <div v-for="(item, ind) in dropdownDetails" :key="ind"
                    class="drop-card-content d-flex gap-[6px] mb-[18px]">
                    <i :class="item.icon"></i>
                    <span @click="checkdailog(item, index); openDayDetails[ind] = false">{{ item.label }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-for="(item, i) in formData.days[index]" :key="i" class="detail-card" draggable="true"
              @dragstart="onDragStart(index, i)" @dragover.prevent @drop="onDrop(index, i)">
              <div class=" flex items-center gap-[15px]">
                <img src="/public/img/png/6-dots-Vector.png" width="11px">
                <div class="card-content d-flex gap-[10px]">
                  <i :class="item.icon"></i>
                  <span>{{ item.type }}</span>
                </div>
              </div>
              <div class="card-actions flex items-center gap-[18px]">
                <i class="bi bi-eye" @click="viewItem(item, i, index)"></i>
                <i class="bi bi-pencil-square" @click="editItem(item, i, index)"></i>
                <i class="bi bi-trash3" @click="deleteItem(i, index)"></i>
              </div>
            </div>
          </div>
        </div>


        <div class="custom-section mt-4">
          <div class="custom-header d-flex align-items-center gap-2 mb-[20px]">
            <img src="/public/img/png/custom-tab.png">
            Custom Tab
          </div>

          <div v-for="(tab, index) in listService.tabs" :key="index" class="mt-[25px]">

            <div class="input-group">
              <label>Tab Title</label>
              <input v-model="tab.title" type="text" placeholder="-------------------" required />
            </div>


            <div class="input-group mt-[32px]">
              <label>Description</label>
              <textarea v-model="tab.overview" placeholder="Describe your object" rows="5" required></textarea>
            </div>

            <div class="delete-sec d-flex gap-2 align-items-center sm:mt-5 mt-3 ml-2 cursor-pointer"
              @click="handleCustomTabDelete(index)">
              <i class="bi bi-trash"></i>
              Delete
            </div>
          </div>
        </div>
        <div class="mt-[28px] flex justify-end align-items-center gap-[14px] buttons">
          <button class="custom-tab-btn d-flex align-items-center bg-[#ffffff] " @click="handleCustomTabClick"> <i
              class="bi bi-plus"></i>Add Custom Tab
          </button>
          <!-- <Button type="submit" class="jobls-btnnxt" label="Add Listing" :loading="loading" /> -->
          <button class=" jobls-btnnxt Submit-btn d-flex align-items-center bg-[#ff5757]" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span>{{ loading ? 'Submitting...' : 'Submit' }}</span>
            <i class="bi bi-chevron-right ms-2" v-if="!loading"></i>
          </button>
        </div>
      </div>
    </FormKit>
  </div>
  <Dialog v-model:visible="addCoverModal" modal header="Crop Image" :style="{ width: '35rem' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="icon_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 3 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="addCoverModal = false" class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>

  <Transportation :showCommon="showCommon" :key="ind !== null ? `transporation-${ind}` : 'transpotaion-new'"
    :data="formData.days[currentDayIndex]" :doc="doc" :ind="ind" :action="isViewMode" :departureCutoff="departure"
    :returnCutoff="returndate" @submit="data => { console.log('RECEIVED IN PARENT:', data); handleSubmit(data); }"
    @resetEditState="resetEditState" @close="handleDialogClose" />

  <Transfer :showTransfer="showTransfer" :key="ind !== null ? `transfer-${ind}` : 'transfer-new'"
    :data="formData.days[currentDayIndex]" :doc="doc" :ind="ind" :action="isViewMode" :departureCutoff="departure"
    :returnCutoff="returndate" @submit="data => { console.log('RECEIVED IN PARENT:', data); handleSubmit(data); }"
    @resetEditState="resetEditState" @close="handleDialogClose" />

  <Accommodation :showAccommodation="showAccommodation" :key="ind !== null ? `accomodation-${ind}` : 'accomodation-new'"
    :data="formData.days[currentDayIndex]" :doc="doc" :ind="ind" :action="isViewMode" :departureCutoff="departure"
    :returnCutoff="returndate" @submit="data => { console.log('RECEIVED IN PARENT:', data); handleSubmit(data); }"
    @resetEditState="resetEditState" @close="handleDialogClose" />

  <Activities :showActivities="showActivities" :key="ind !== null ? `activity-${ind}` : 'activity-new'"
    :data="formData.days[currentDayIndex]" :doc="doc" :ind="ind" :action="isViewMode"
    @submit="data => { console.log('RECEIVED IN PARENT:', data); handleSubmit(data); }" @resetEditState="resetEditState"
    @close="handleDialogClose" />
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Transportation from './Components/Transportation/index.vue';
import Transfer from './Components/Transfer/index.vue';
import Accommodation from './Components/Accommodation/index.vue';
import Activities from './Components/Activities/index.vue';

definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

export default {
  components: {
    Cropper,
    QuillEditor,
    Transportation,
    Transfer,
    Accommodation,
    Activities
  },
  data() {
    return {
      //formdata
      destination_title: "",
      currency: '',
      title: "",
      destination_title: "",
      departure: "",
      returndate: "",
      draggedIndex: null,
      draggedElement: null,
      descriptionError: '',
      draggedItem: null,
      details: [
        { id: 1, icon: 'bi bi-train-front', label: 'Transportation Details' },
        { id: 2, icon: 'bi bi-arrow-left-right', label: 'Transfer Details' },
        { id: 3, icon: 'bi bi-building', label: 'Accommodation Details' },
        { id: 4, icon: 'bi bi-clock-history', label: 'Activities' },
      ],
      dropdownDetails: [
        { icon: 'bi bi-train-front', label: 'Transportation Details' },
        { icon: 'bi bi-arrow-left-right', label: 'Transfer Details' },
        { icon: 'bi bi-building', label: 'Accommodation Details' },
        { icon: 'bi bi-clock-history', label: 'Activities' },
      ],
      formData: { days: [], questions: false, },
      tabs: [],
      openDayDetails: [],
      loading: false,
      pricingEnabled: false,
      userName: null,
      userPrice: null,
      showCommon: false,
      isViewMode: false,
      currentDayIndex: null,
      doc: null,
      ind: null,
      isViewMode: false,
      showActivities: false,
      showAccommodation: false,
      allTransportationData: [],
      showActivities: false,
      showTransfer: false,
      tags: [],
      AddDetailsOpen: false,
      TransportationOpen: false,
      selectedTransport: 'Flight',
      transportOptions: ['Flight', 'Train', 'By Water', 'By Road'],
      allForm: false,
      allCountry: [],
      selectedcountry: null,
      allState: [],
      night: 0,
      days: 0,
      selectedstate: null,
      allCity: [],
      logo_url: null,
      listService: {
        tab: [],
        tabs: [],
      },
      CustomTabOpen: false,
      customtabcount: 0,
      addCoverModal: false,
      addLogoModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,

      cover_image: null,
      country: "",
      adminCountries: [],
      sid: 'Travel',
      id: '123',
      //add form
      currentDayIndex: null,
      data: [],
      doc: null,
      ind: null,

    };
  },
  async mounted() {
    activateSubmenu('b3', 'Tourist Visa', true);
    this.fetchAdminCountries('Travel')
    if (this.$route.query.id) {
      this.listingEditView()
    }
  },
  methods: {

    restrictToNumbers(event) {
      const charCode = event.charCode || event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
    // onDragStart(index, i) {
    //   console.log("index", index, i)
    //   this.draggedIndex = index;
    //   this.draggedElement = i

    // },
    // onDrop(dropIndex, i) {
    //   console.log("dropIndex", dropIndex, i)
    //   if (this.draggedIndex === null || (this.draggedIndex === dropIndex && this.draggedElement == i)) return;
    //   this.formData.days[dropIndex][i] = this.formData.days[this.draggedIndex][this.draggedElement]
    //   this.formData.days[this.draggedIndex].splice(this.draggedElement, 1)
    //   this.draggedIndex = null;
    //   this.draggedElement = null;
    // },


    onDragStart(dayIndex, itemIndex) {
      this.draggedIndex = dayIndex;
      this.draggedElement = itemIndex;
      this.draggedItem = this.formData.days[dayIndex][itemIndex];
    },
    onDrop(targetDayIndex, targetItemIndex) {
      if (
        this.draggedIndex === null ||
        this.draggedElement === null ||
        (this.draggedIndex === targetDayIndex && this.draggedElement === targetItemIndex)
      ) {
        return;
      }

      // Remove from old position
      this.formData.days[this.draggedIndex].splice(this.draggedElement, 1);

      // Insert at new position
      this.formData.days[targetDayIndex].splice(targetItemIndex, 0, this.draggedItem);

      // Reset drag state
      this.draggedIndex = null;
      this.draggedElement = null;
      this.draggedItem = null;
    },

    checkdailog(item, index) {
      this.currentDayIndex = index;
      this.openDayDetails[index] = false
      console.log("chcekdailog", item, index)
      console.log(item.label, this.selectedTransport)
      if (item.label === "Transportation Details") {
        this.showCommon = false;
        this.$nextTick(() => {
          this.showCommon = true;
        });
      }
      else if (item.label === "Transfer Details") {
        this.showTransfer = false;
        this.$nextTick(() => {
          this.showTransfer = true;
        });
      }
      else if (item.label === "Accommodation Details") {
        this.showAccommodation = false;
        this.$nextTick(() => {
          this.showAccommodation = true;
        });
        console.log("hgghfjh");
      }
      else if (item.label === "Activities") {
        this.showActivities = false;
        this.$nextTick(() => {
          this.showActivities = true;
        });
        console.log("hgghfjh");
      }
    },
    selectTransport(option) {
      this.selectedTransport = option;
      console.log(this.selectedTransport)
      this.TransportationOpen = false;
    },
    toggleDayDetails(index) {
      this.openDayDetails[index] = !this.openDayDetails[index];
    },
    handleCustomTabClick() {
      const lastTab = this.listService.tabs[this.listService.tabs.length - 1];
      if (lastTab && (!lastTab.title || !lastTab.overview)) {
        errorAlert("Please fill the previous custom tab before adding a new one.");
        return;
      }


      this.listService.tabs.push({
        title: '',
        overview: ''
      });
    },
    handleCustomTabDelete(index) {
      this.listService.tabs.splice(index, 1);
    },
    addPricing() {
      if (this.userName && this.userName.trim() !== '' && this.userPrice !== null && !isNaN(this.userPrice)) {
        this.tags.push({
          userName: this.userName.trim(),
          userPrice: Number(this.userPrice),
          currency: this.currency
        });
        this.userName = "";
        this.userPrice = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    handleTransportationSubmit(data) {
      console.log('Received from child:', data);

      this.allTransportationData.push(data);
    },
    async fetchAdminCountries(category_name) {

      try {
        const response = await subadminGet(`/admin-company-country-providing-service/${category_name}`);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
      }
    },
    initData() {
    },
    stripHtml(html) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    },
    handleFormSubmit(v) {

      const plainText = this.stripHtml(this.$refs.qhtml.getHTML()).trim();

      if (!plainText) {
        this.descriptionError = 'Description is required.';
        return;
      } else {
        this.descriptionError = '';
      }

      const listingId = this.$route.query.id;
      if (listingId) {
        this.editListingForm(v);
      } else {
        this.submitForm(v);
      }

    },
    async submitForm(v) {
      this.loading = true;
      try {
        console.log(this.data);
        console.log(this.formData.days[0]);
        console.log("Initial form data", v);

        const departureDate = new Date(this.departure);
        const returnDate = new Date(this.returndate);
        const timeDifference = returnDate - departureDate;
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (dayDifference < 0) {
          errorAlert('Return Cannot be Greater Than Departure');
          return;
        }

        // Add tourist details
        v.tourist = {
          price: this.tags,
          night: this.night,
          day: this.days,
          destination_title: v.destination_title,
          departure: this.departure,
          return: this.returndate,
          provide_transpotation: this.formData.questions,
          transpotation_type: this.selectedTransport,
          days: this.formData.days
        };
        v.country = this.country
        v.description = this.$refs.qhtml.getHTML();
        v.tabs = this.listService.tabs;
        v.cover_image = v.cover_image;
        v.sub_service_name = 'Tourist Visa';
        v.service_name = 'Travel';

        // Upload images in nested media_list arrays
        if (Array.isArray(v.tourist.days)) {
          for (let dayArray of v.tourist.days) {
            if (Array.isArray(dayArray)) {
              for (let obj of dayArray) {
                if (Array.isArray(obj.media_list)) {
                  obj.media_list = await Promise.all(
                    obj.media_list.map(async (media, i) => {
                      const mediaUrl = typeof media === 'string' ? media : media.media_url;
                      return {
                        media_url: await uploadImageAdminE2(mediaUrl, `tourist_day_media_${Date.now()}_${i}`),
                        alt_tag: media.alt_tag || "media_tourist_day"
                      };
                    })
                  );
                }
              }
            }
          }
        }


        console.log("Final payload:", v);

        // Submit data
        const res = await subadminPost('/admin-study-add', v);

        if (res.status === true) {
          successAlert("Listing added successfully");
          this.resetForm();
          this.$router.push({
            path: '/subadmin/Categories/Travel'
          });
        } else {
          errorAlert("Something went wrong while submitting.");
        }

      } catch (err) {
        console.error("Submit Error:", err);
        errorAlert("An error occurred while submitting the form.");
      } finally {
        this.loading = false;
      }
    },
    //edit
    async listingEditView() {
      try {
        const response = await subadminGet(`/admin-study-get-listing/${this.$route.query.id}`);
        const data = response.data.data[0];

        // Assign main fields
        this.country = data.country
        this.title = data.title
        this.destination_title = data.tourist.destination_title
        this.departure = data.tourist.departure
        this.returndate = data.tourist.return
        this.pricingEnabled = data.tourist?.price.length > 0 ? true : false
        this.tags = data.tourist?.price || [];
        this.night = data.tourist?.night || 0;
        this.days = data.tourist?.day || 0;
        this.formData.questions = data.tourist?.provide_transpotation || 'false';
        this.selectedTransport = data.tourist?.transpotation_type || 'Flight';
        this.formData.days = data.tourist?.days || [];
        this.title = data.title
        // Tabs
        this.listService.tabs = data.tabs || [];

        // Description (quill)
        this.$nextTick(() => {
          if (this.$refs.qhtml && data.description) {
            this.$refs.qhtml.setHTML(data.description);
          }
        });

        // Cover image
        this.cover_image = data.cover_image || null;

        // Country/State/City (optional based on your structure)
        this.selectedcountry = data.country || null;
        if (this.selectedcountry) {
          await this.getState();
          this.selectedstate = data.state || null;

          if (this.selectedstate) {
            await this.getCity();
            this.selectedcity = data.city || null;
          }
        }

        // Tabs and openDayDetails
        this.tabs = data.tourist?.days?.map((_, index) => ({
          title: `Day ${index + 1}`,
        })) || [];

        this.openDayDetails = Array(this.tabs.length).fill(false);
        this.allForm = true;

        // If you're storing activities, transport, etc. separately, populate them too:
        this.allTransportationData = data.transportationData || [];

      } catch (error) {
        console.error("Error loading listing:", error);
        errorAlert("Failed to load listing for editing.");
      }
    },

    async editListingForm(v) {
      this.loading = true;
      try {
        const departureDate = new Date(this.departure);
        const returnDate = new Date(this.returndate);
        const timeDifference = returnDate - departureDate;
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (dayDifference < 0) {
          errorAlert('Return Cannot be Greater Than Departure');
          return;
        }

        // Update tourist details
        v.tourist = {
          price: this.tags,
          night: this.night,
          day: this.days,
          destination_title: v.destination_title,
          departure: this.departure,
          return: this.returndate,
          provide_transpotation: this.formData.questions,
          transpotation_type: this.selectedTransport,
          days: this.formData.days
        };
        v.country = this.country;
        v.description = this.$refs.qhtml.getHTML();
        v.tabs = this.listService.tabs;
        v.cover_image = v.cover_image;
        v.sub_service_name = 'Tourist Visa';
        v.service_name = 'Travel';


        // if (Array.isArray(v.tourist.days)) {
        //   for (let dayArray of v.tourist.days) {
        //     if (Array.isArray(dayArray)) {
        //       for (let obj of dayArray) {
        //         if (obj.media_list && Array.isArray(obj.media_list)) {
        //           obj.media_list = await Promise.all(
        //             obj.media_list.map(async (img, i) => {
        //               if (img && img.startsWith && img.startsWith('data:')) {
        //                 const uploadedUrl = await uploadImageAdminE2(img, `tourist_day_media_${Date.now()}_${i}`);
        //                 return {
        //                   media_url: uploadedUrl,
        //                   alt_tag: "media_tourist_day"
        //                 };
        //               } else if (img && img.media_url) {
        //                 return img;
        //               } else {
        //                 return null;
        //               }
        //             })
        //           );

        //           // Clean up null entries (in case some were not valid)
        //           obj.media_list = obj.media_list.filter(Boolean);
        //         }
        //       }
        //     }
        //   }
        // }


        if (Array.isArray(v.tourist.days)) {
          for (let dayArray of v.tourist.days) {
            if (Array.isArray(dayArray)) {
              for (let obj of dayArray) {
                if (Array.isArray(obj.media_list)) {
                  obj.media_list = await Promise.all(
                    obj.media_list.map(async (media, i) => {
                      if (media && typeof media === 'object') {
                        if (media.media_url && media.media_url.startsWith('data:')) {
                          // It's a base64 image, upload it
                          const uploadedUrl = await uploadImageAdminE2(
                            media.media_url,
                            `tourist_day_media_${Date.now()}_${i}`
                          );
                          return {
                            media_url: uploadedUrl,
                            alt_tag: media.alt_tag || "media_tourist_day"
                          };
                        } else {
                          // Already uploaded image
                          return media;
                        }
                      }
                      return null; // fallback if media is not valid
                    })
                  );

                  // Remove any null entries
                  obj.media_list = obj.media_list.filter(Boolean);
                }
              }
            }
          }
        }



        console.log("Final Edit Payload:", v);


        const res = await subadminPut(`/admin-study-update/${this.$route.query.id}`, v);



        if (res.status === true) {
          successAlert("Listing updated successfully");
          this.$router.push({
            path: '/subadmin/Categories/Travel'
          });
        } else {
          errorAlert("Something went wrong while updating.");
        }
        this.loading = false;
      } catch (err) {
        console.error("Edit Submit Error:", err);
        this.loading = false;
        errorAlert("An error occurred while editing the form.");
      } finally {
        this.loading = false;
      }
    },



    resetForm() {
      this.formData = {
        days: [],
        questions: 'false'
      };
      this.tabs = [];
      this.openDayDetails = [];
      this.loading = false;
      this.pricingEnabled = false;
      this.userName = null;
      this.userPrice = null;
      this.showCommon = false;
      this.showAccommodation = false;
      this.allTransportationData = [];
      this.showActivities = false;
      this.showTransfer = false;
      this.tags = [];
      this.AddDetailsOpen = false;
      this.TransportationOpen = false;
      this.selectedTransport = 'Flight';
      this.selectedcountry = null;
      this.allState = [];
      this.night = 0;
      this.days = 0;
      this.selectedstate = null;
      this.allCity = [];
      this.logo_url = null;
      this.cover_image = null;
      this.customtabcount = 0;
      this.listService = {
        tab: [],
        tabs: [],
      };
      this.addCoverModal = false;
      this.addLogoModal = false;
      this.icon_showCropper = true;
      this.icon_croppedDataUrl = null;
      this.icon_selectedImage = null;
      this.logo_showCropper = true;
      this.logo_selectedImage = true;
      this.logo_updateCroppedData = true;

      this.currentDayIndex = null;
      this.data = [];
      this.doc = null;
      this.ind = null;

      // Reset Quill content
      if (this.$refs.qhtml && this.$refs.qhtml.setHTML) {
        this.$refs.qhtml.setHTML('');
      }

      // Scroll to top or any additional UI feedback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },


    addDate() {
      if (this.departure && this.returndate) {
        let x = this.calculateNightsAndDays(
          this.departure,
          this.returndate,
        );
        this.night = x.night;
        this.days = x.days;

        const departureDate = new Date(this.departure);
        const returnDate = new Date(this.returndate);
        const timeDifference = returnDate - departureDate;
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
        if (dayDifference < 0) {
          this.allForm = false;
          errorAlert('Return Cannot be Greater Than Departure');
        } else {
          this.tabs = [];
          this.formData.days = [];

          for (let i = 0; i < dayDifference; i++) {
            this.tabs.push({ title: `Day ${i + 1}` });
            this.formData.days.push([]);
            this.openDayDetails = Array(dayDifference).fill(false);
          }
          this.allForm = true;
        }
      }
    },
    icon_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.addCoverModal = true;
      }
    },
    uploadLogo(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const logo_selectedFile = event.target.files[0];
      if (logo_selectedFile) {
        this.logo_selectedImage = URL.createObjectURL(logo_selectedFile);
        this.logo_showCropper = true;
        this.addLogoModal = true;
      }
    },
    async icon_uploadImage() {

      const timestamp = Date.now();
      const fileName = `tourist_visa_cover_image_${timestamp}`;
      const x = await uploadImageAdminE2(this.icon_croppedDataUrl, fileName);
      this.cover_image = x
      // console.log("this.cover",this.cover_image)
      this.addCoverModal = false;
    },
    async logo_uploadImage() {
      this.logo_url = this.logo_selectedImage;
      this.addLogoModal = false;
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
    async getState() {
      await subadminGet(`/states/${this.selectedcountry}`).then((response) => {
        this.allState = response.data;
      });
    },
    async getCity() {
      await subadminGet(`/city/${this.selectedstate}`).then((response) => {
        this.allCity = response.data;
      });
    },
    onlyNumber(event) {
      const key = event.key;
      // Allow only digits (0–9)
      if (!/^\d$/.test(key)) {
        event.preventDefault();
      }
    },
    calculateNightsAndDays(from, to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const timeDifference = toDate - fromDate;
      const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const nights = totalDays;
      const days = totalDays + 1;
      return {
        night: nights,
        days: days,
      };
    },
    // editItem(item, index, i) {
    //   this.currentDayIndex = i
    //   this.doc = item
    //   this.ind = index
    //   console.log(item.type,index,i)
    //   if (item.type == "Transfer") {
    //     this.showTransfer = false;
    //     this.$nextTick(() => {
    //       this.showTransfer = true;
    //     });
    //     this.showCommon = false
    //     this.showAccommodation = false
    //     this.showActivities = false;
    //   } else if (item.type == "Transportation") {
    //     this.showCommon = false;
    //     this.$nextTick(() => {
    //       this.showCommon = true;
    //     });
    //     this.showTransfer = false
    //     this.showAccommodation = false
    //     this.showActivities = false;
    //   } else if (item.type == "Accommodation") {
    //     this.showAccommodation = false;
    //     this.$nextTick(() => {
    //       this.showAccommodation = true;
    //     });
    //     this.showTransfer = false
    //     this.showCommon = false
    //     this.showActivities = false;
    //   }
    //   else if (item.type == "Activity") {
    //     this.showActivities = false;
    //     this.$nextTick(() => {
    //       this.showActivities = true;
    //     });
    //     this.showAccommodation = false
    //     this.showTransfer = false
    //     this.showCommon = false
    //   }

    // },
    // editItem(item, index, i) {
    //   this.currentDayIndex = i;
    //   this.doc = item;
    //   this.ind = index;

    //   // Reset all
    //   this.showTransfer = false;
    //   this.showCommon = false;
    //   this.showAccommodation = false;
    //   this.showActivities = false;

    //   this.$nextTick(() => {
    //     if (item.type === "Transfer") {
    //       this.showTransfer = true;
    //     } else if (item.type === "Transportation") {
    //       this.showCommon = true;
    //     } else if (item.type === "Accommodation") {
    //       this.showAccommodation = true;
    //     } else if (item.type === "Activity") {
    //       this.showActivities = true;
    //     }
    //   });
    // },
    editItem(item, index, i) {
      this.isViewMode = false;
      this.setItemState(item, index, i);
    },

    viewItem(item, index, i) {
      this.isViewMode = true;
      this.setItemState(item, index, i);
    },

    setItemState(item, index, i) {
      this.currentDayIndex = i;
      this.doc = item;
      this.ind = index;

      // Reset all
      this.showTransfer = false;
      this.showCommon = false;
      this.showAccommodation = false;
      this.showActivities = false;

      this.$nextTick(() => {
        if (item.type === "Transfer") {
          this.showTransfer = true;
        } else if (item.type === "Transportation") {
          this.showCommon = true;
        } else if (item.type === "Accommodation") {
          this.showAccommodation = true;
        } else if (item.type === "Activity") {
          this.showActivities = true;
        }
      });
    },

    handleSubmit(updatedData) {
      // Optional: handle global updates
      this.openDayDetails.fill(false);
      console.log("Child submitted data:", updatedData);
    },
    resetEditState() {
      console.log('Resetting doc and ind');
      this.doc = null;
      this.ind = null;
      console.log('After reset:', this.doc, this.ind);
    },
    handleDialogClose() {
      if (this.ind !== null) {
        this.openDayDetails[this.ind] = false
      }

      this.doc = null;
      this.ind = null;
      this.showCommon = false;
      console.log("final clossed")
    },
    async deleteItem(i, index) {
      if (await deleteConfirm('Do you want to delete this itinerary?')) {
        this.formData.days[index].splice(i, 1)
        successAlert('Itinerary Deleted');
      }

    }

  },
};
</script>

<style scoped>
@import url('style.css');
</style>
