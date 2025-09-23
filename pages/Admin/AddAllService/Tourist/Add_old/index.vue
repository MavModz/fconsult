<template>
  <div class="tourist-basic-container">
    <FormKit type="form" @submit="submitForm">
      <div class="tourist-basic-wrapper">
        <div class="tourist-basic-1st">
          <div class="tourist-basic-header">
            <div class="tourist-basic-header-inside">
              <div><img src="/img/png/info.png" /></div>
              <span class="tourist-basic-basdgn"> Basic info </span>
            </div>
            <div class="nights-5days">
              <span class="tourist-basic-he-4days">{{ night }} Nights</span>
              <span class="tourist-basic-he-5days">Or {{ days }} Days</span>
            </div>
          </div>

          <div class="tourist-bacs-1stbx">
            <div class="tourist-bsc-dic-wd">
              <label class="tourist-basc-lble">Destination Title</label><br />
              <FormKit type="text" validation="required" placeholder="Title" v-model="formData.destination" name="title"
                class="tourist-basc-inpt1st" />
            </div>
            <div class="tourist-bsc-dic-wd">
              <label class="tourist-basc-lble">Package Name</label><br />
              <FormKit type="text" validation="required" v-model="formData.package_name" name="package_name"
                placeholder="-----------" class="tourist-basc-inpt1st" />
            </div>
          </div>

          <div id="add-leads-clg-stl-ctr" class="row mt-2">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="">
                <label id="label-all-addclg" for="exampleFormControlInput1" class="form-label">Country</label>
                <FormKit validation="required" v-model="selectedcountry" type="select" name="country"
                  :options="allCountry" @change="getState()" />
              </div>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="input-field">
                <label for="field-name">pincode</label>
                <FormKit validation="required" name="pincode" type="text" placeholder="----------" />
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="mb-3">
                <label id="label-all-addclg" for="exampleFormControlInput1" class="form-label">State</label>
                <FormKit validation="required" v-model="selectedstate" type="select" name="state" :options="allState"
                  @change="getCity()" />
              </div>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="mb-3">
                <div class="mb-3">
                  <label id="label-all-addclg" for="exampleFormControlInput1" class="form-label">City</label>
                  <FormKit validation="required" type="select" name="city" :options="allCity"
                    placeholder="-----------------" />
                </div>
              </div>
            </div>
          </div>

          <div class="input-field">
            <label for="field-name">Destination Address</label>
            <FormKit validation="required" name="address" type="text" placeholder="address" />
          </div>

          <div class="input-field">
            <label for="field-name">Description</label>
            <FormKit validation="required" name="overview" as="textarea" placeholder="add your description here" />
          </div>

          <div class="input-field">
            <label for="field-name">Price</label>
            <FormKit validation="required" name="price" type="number" placeholder="28000" />
          </div>

          <div class="tourist-bacs-2stbx">
            <div class="tourist-bsc-dic-wd">
              <label class="tourist-basc-lble">Departure</label><br />
              <FormKit type="datetime-local" validation="required|date_after" v-model="formData.departure"
                name="departure" @change="addDate()" class="tourist-basc-inpt1st" />
            </div>
            <div class="tourist-bsc-dic-wd">
              <span class="tourist-bsc-dic-checkbx">
                <label class="tourist-basc-lble">Return</label>
              </span>
              <FormKit type="datetime-local" validation="required|date_after" v-model="formData.return"
                @change="addDate()" name="return" class="tourist-basc-inpt1st" />
            </div>
          </div>

          <div class="tourist-cont-uploadim">
            <div class="tourist-minwidth-qsr">
              <span class="tourist-dou-haveqst">Do you provide question !?</span>
              <FormKit type="radio" validation="required" :options="{
                true: 'Yes, we provide it',
                false: 'No, it’s not included',
              }" v-model="formData.questions" name="questions" class="styled-checkbox" id="styled-checkbox-1" />
            </div>

            <div class="tourist-back-addimg-after">
              <div class="tourist-back-addimg-brdr">
                <div v-if="cover_image" class="upload-image-after">
                  <!-- <div style="border: none;" class="upload p-3"> -->
                  <img :src="cover_image" alt="Cover" class="upload-image-content" />
                  <label data-kt-image-input-action="change">
                    <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                      @change="icon_handleImageChange" />
                    <FormKit validation="required" name="cover_image" type="text" v-model="cover_image" id="icon"
                      hidden />
                  </label>
                  <!-- </div> -->
                </div>
                <div v-else class="upload-image px-3 py-3 mx-3 my-3"
                  :style="'background-image:url(' + cover_image + ')'">
                  <div class="upload p-3">
                    <label data-kt-image-input-action="change" class="flex items-center gap-2">
                      <img src="/img/svg/camera.svg" />
                      <h4 class="m-0">Upload Cover Image</h4>

                      <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                        @change="icon_handleImageChange" />
                      <FormKit validation="required" name="cover_image" type="text" v-model="cover_image" id="icon"
                        hidden />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tourist-basic-wrapper-media">
          <AllImages ref="allimages" />
        </div>

        <div class="mt-4" v-if="allForm">
          <TabView :scrollable="true">
            <TabPanel v-for="(tab, index) in tabs" :key="tab.title" :header="tab.title">
              <div class="card">
                <Pkg :x="formData.days[index]" />
              </div>
            </TabPanel>
          </TabView>
        </div>

        <div class="joblis-lsr-nextbtn">
          <div></div>
          <Button type="submit" class="jobls-btnnxt" label="Add Listing" :loading="loading" />
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
      <Button label="Cancel" text severity="secondary" @click="addCoverModal = false" 
        class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage"  class="cropper-upload" />
    </template>
  </Dialog>
</template>

<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import AllImages from './AllImages.vue';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import Pkg from './Package/package.vue';

definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
  components: {
    Cropper,
    Pkg,
    AllImages,
  },
  data() {
    return {
      formData: { days: [] },
      tabs: [],
      loading: false,
      allForm: false,
      allCountry: [],
      selectedcountry: null,
      allState: [],
      night: 0,
      days: 0,
      selectedstate: null,
      allCity: [],
      logo_url: null,
      addCoverModal: false,
      addLogoModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      logo_showCropper: true,
      logo_selectedImage: true,
      logo_updateCroppedData: true,
      cover_image: null,
      id:'123',
    };
  },
  mounted() {
    activateSubmenu('b3', 'All Services');
    adminGet('/countries').then((response) => { this.allCountry = response.data; })
  },
  methods: {
    async submitForm(v) {
      this.loading = true;
      const departureDate = new Date(v.departure);
      const returnDate = new Date(v.return);
      const timeDifference = returnDate - departureDate;
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
      let image = this.$refs.allimages.all_images;
      if (dayDifference < 0) {
        errorAlert('Return Cannot be Greater Than Departure');
      } else if (image.length < 5) {
        errorAlert("Please Add Atleast 5 images")
      } else {
        v.tourist = {};
        v.tourist = { ...this.formData };
        v.tourist.cover_image = v.cover_image;
        v.tourist.price = v.price;
        v.tourist.images = [];
        v.tourist.night = this.night;
        v.tourist.day = this.days;
        for (let i in image) {
          v.tourist.images[i] = await uploadImage(this.id, image[i]);
        }
        v.service_id = 'Tourist Visa';
        v.service_name = 'Tourist Visa';
        v.type = 'tourist';
        ;
        adminPost(`/add-listing`, v).then((response) => {
          
          this.loading = false;
          this.$router.push('/admin/services/tourist/view');
        });
      }
      this.loading = false;
    },
    addDate() {
      if (this.formData.departure && this.formData.return) {
        let x = this.calculateNightsAndDays(
          this.formData.departure,
          this.formData.return,
        );
        this.night = x.night;
        this.days = x.days;

        const departureDate = new Date(this.formData.departure);
        const returnDate = new Date(this.formData.return);
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
            this.formData.days.push({
              transportation_field: {},
              transfer_field: {},
              destination_field: {},
              accommodation_field: {},
              activities_field: {},
              custom_field: {},
            });
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
      const icon_selectedFile =event.target.files[0];
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
      const logo_selectedFile =event.target.files[0];
      if (logo_selectedFile) {
        this.logo_selectedImage = URL.createObjectURL(logo_selectedFile);
        this.logo_showCropper = true;
        this.addLogoModal = true;
      }
    },
    async icon_uploadImage() {
      this.cover_image = await uploadImage(this.id, this.icon_selectedImage);
      this.addCoverModal = false;
    },
    async logo_uploadImage() {
      this.logo_url = this.logo_selectedImage;
      
      this.addLogoModal = false;
    },
    async getState() {
      await adminGet(`/states/${this.selectedcountry}`).then((response) => {
        this.allState = response.data;
      });
    },
    async getCity() {
      await adminGet(`/city/${this.selectedstate}`).then((response) => {
        this.allCity = response.data;
      });
    },
    calculateNightsAndDays(from, to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const timeDifference = toDate - fromDate;
      const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const nights = totalDays;
      const days = totalDays - 1;
      return {
        night: nights,
        days: days,
      };
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
