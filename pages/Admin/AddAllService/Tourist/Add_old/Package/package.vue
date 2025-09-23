<template>
  <div class="pricing-basic-container">
    <FormKit type="form" :value="x">
      <div class="pricing-basic-wrapper">
        <div class="pricing-transport-conta">
          <div class="pricing-transport-heading">
            <div class="pricing-transport-heading-car">
              <span><img src="/img/png/car.png" alt="" /></span>
              <span class="pricing-trans-detais">Transportation Details</span>
              <span class="pricing-trans-detais"><InputSwitch v-model="x.transportation" /></span>
            </div>
            <div class="pricing-right-transport" v-if="x.transportation">
              <span class="pricing-right-trans-prc">Pricing</span>
              <span class="pricing-right-transpt-rss" ><FormKit validation="required" name="price" v-model="x.transportation_field.price" type="text"/></span>
            </div>
          </div>

          <div v-if="x.transportation">
            <div class="pricing-trans-cmpny-flx" >
              <div class="mb-3 jobliscmp-dro">
                <label class="tourist-transport-lable">Transportation Type</label>
                <FormKit v-model="x.transportation_field.type" type="select" :options="['Road Transportation','Sea Transportation','Rail Transportation','Air Transportation','Multimodal Transportation']" id="updateevents-drpsemi" class="form-select"/>
              </div>

              <div class="tourist-bsc-dic-wd">
                <label class="tourist-transport-lable">Transportation Company</label><br />
                <FormKit v-model="x.transportation_field.company" type="text" placeholder="Indigo" class="tourist-transport-inpt1st" />
              </div>

              <div class="mb-3 jobliscmp-dro">
                <label class="tourist-transport-lable">Transportation Class</label>
                <FormKit v-model="x.transportation_field.class" id="updateevents-drpsemi" class="form-select" type="select" :options="['Bus','Aeroplane']"/>
              </div>
            </div>

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2">
                <label class="tourist-transport-lable">Departure</label><br />
                <FormKit v-model="x.transportation_field.departure" type="datetime-local" class="tourist-transport-inpt1st" />
              </div>
              <div class="tourist-bsc-dic-wd2">
                <span class="tourist-bsc-dic-checkbx">
                  <label class="tourist-basc-lble">Layover / Stopage</label>
                  <FormKit v-model="x.transportation_field.stopage" type="checkbox" />
                </span>
                <FormKit v-model="x.transportation_field.arrival" type="datetime-local" class="tourist-transport-inpt1st" />
              </div>
            </div>

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2">
                Departure Location
                  <FormKit v-model="x.transportation_field.departure_location" type="text" placeholder="Lorem ipsum dolor sit amet consectetur. Urna." class="tourist-transport-inpt1st-depart" />
              </div>
              <div class="tourist-bsc-dic-wd2">
                <label class="tourist-transport-lable">Destination Location</label>
                  <FormKit v-model="x.transportation_field.destination_location" type="text" placeholder="Lorem ipsum dolor sit amet consectetur. Urna." class="tourist-transport-inpt1st-depart" />
              </div>
            </div>

            <div class="tourist-transport-despstbx">
              <label class="tourist-transport-lable">Description*</label><br />
              <FormKit v-model="x.transportation_field.description" type="textarea" class="tourist-transport-inpt1st"/>
            </div>

            <div class="tourist-trans-delt-paddng">
              <div class="tourist-trans-delt-additm">
                <span>Add Tags</span>
                  <Chips class="Transportation-addtags" v-model="x.transportation_field.tags" />
              </div>
            </div>
          </div>
        </div>

        <div class="pricing-transport-conta">
          <div class="pricing-transport-heading">
            <div class="pricing-transport-heading-car">
              <span><img src="/img/png/car.png" alt="" /></span>
              <span class="pricing-trans-detais">Transfer Details</span>
              <span class="pricing-trans-detais"><InputSwitch v-model="x.transfer"/></span>
            </div >
            <div class="pricing-right-transport" v-if="x.transfer">
              <span class="pricing-right-trans-prc">Pricing</span>
              <span class="pricing-right-transpt-rss"><FormKit validation="required" name="price" v-model="x.transfer_field.price" type="text"/></span>
            </div>
          </div>


          <div v-if="x.transfer">
            <div class="pricing-trans-cmpny-flx" >
              <div class="mb-3 jobliscmp-dro">
                <label class="tourist-transport-lable">Transportation Type</label>
                <FormKit v-model="x.transfer_field.type" type="select" :options="['it','technology']" id="updateevents-drpsemi" class="form-select"/>
              </div>

              <div class="tourist-bsc-dic-wd">
                <label class="tourist-transport-lable">Transportation Company</label><br />
                <FormKit v-model="x.transfer_field.company" type="text" placeholder="Indigo" class="tourist-transport-inpt1st" />
              </div>

              <div class="mb-3 jobliscmp-dro">
                <label class="tourist-transport-lable">Transportation Class</label>
                <FormKit v-model="x.transfer_field.class" id="updateevents-drpsemi" class="form-select" type="select" :options="['it','technology']"/>
              </div>
            </div>

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2">
                <label class="tourist-transport-lable">Departure</label><br />
                <FormKit v-model="x.transfer_field.departure" type="datetime-local" class="tourist-transport-inpt1st" />
              </div>
              <div class="tourist-bsc-dic-wd2">
                <span class="tourist-bsc-dic-checkbx">
                  <label class="tourist-basc-lble">Layover / Stopage</label>
                  <FormKit v-model="x.transfer_field.stopage" type="checkbox" />
                </span>
                <FormKit v-model="x.transfer_field.arrival" type="datetime-local" class="tourist-transport-inpt1st" />
              </div>
            </div>

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2">
                Departure Location
                <FormKit v-model="x.transfer_field.departure_location" type="text" placeholder="Lorem ipsum dolor sit amet consectetur. Urna." class="tourist-transport-inpt1st-depart" />
              </div>
              <div class="tourist-bsc-dic-wd2">
                <label class="tourist-transport-lable">Destination Location</label>
                <FormKit v-model="x.transfer_field.destination_location" type="text" placeholder="Lorem ipsum dolor sit amet consectetur. Urna." class="tourist-transport-inpt1st-depart" />
              </div>
            </div>

            <div class="tourist-transport-despstbx">
              <label class="tourist-transport-lable">Description*</label><br />
              <FormKit v-model="x.transfer_field.description" type="textarea" class="tourist-transport-inpt1st"/>
            </div>

            <div class="tourist-trans-delt-paddng">
              <div class="tourist-trans-delt-additm">
                <span>Add Tags</span>
                <Chips v-model="x.transfer_field.tags" />
              </div>
            </div>
          </div>

        </div>

        <div class="pricing-transport-conta">
          <div class="pricing-transport-heading">
            <div class="pricing-transport-heading-car">
              <span><i id="tourist-transp-loction" class="bi bi-geo-alt"></i></span>
              <span class="pricing-trans-detais">Destination Details</span>
              <span class="pricing-trans-detais"><InputSwitch v-model="x.destinations"/></span>
            </div>
            <div class="pricing-right-transport" v-if="x.destinations">
              <span class="pricing-right-trans-prc">Pricing</span>
              <span class="pricing-right-transpt-rss"><FormKit validation="required" name="price" v-model="x.destination_field.price" type="text"/></span>
            </div>
          </div>
          <div v-if="x.destinations">
            <div class="pricing-trans-cmpny-flx">
              <div class="mb-3 jobliscmp-dro-destination">
                <label class="tourist-transport-lable">Country / region*</label>
                <FormKit v-model="x.destination_field.country" id="updateevents-drpsemi" />
              </div>
              <div class="mb-3 jobliscmp-dro-destination">
                <label class="tourist-transport-lable">City*</label>
                <FormKit v-model="x.destination_field.city" id="updateevents-drpsemi" />
              </div>
            </div>
            <div class="tourist-transport-2stbx">
              <div class="mb-3 jobliscmp-dro-destination-district">
                <label class="tourist-transport-lable">District*</label>
                <FormKit v-model="x.destination_field.state" id="updateevents-drpsemi" />
              </div>
              <div class="tourist-bsc-dic-wd2-zipcde">
                <label class="tourist-transport-lable">Zip code*</label><br />
                <FormKit v-model="x.destination_field.zip_code" type="text" placeholder="" class="tourist-transport-inpt1st" />
              </div>
            </div>
            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2-zipcde-blw">
                <label class="tourist-transport-lable">Street name*</label><br />
                <FormKit v-model="x.destination_field.street" type="text" placeholder="" class="tourist-transport-inpt1st" />
              </div>
              <div class="mb-3 jobliscmp-dro-destination-ratingg">
                <label class="tourist-transport-lable">Select Rating</label>
                <FormKit v-model="x.destination_field.rating" id="updateevents-drpsemi" />
              </div>
              <div class="tourist-trans-delt-additm-trns">
                <span>Add Tags</span>
                <div class="tourist-trans-delt-paddng">
                  <div class="tourist-trans-delt-additm">
                    <span>Add Tags</span>
                    <Chips v-model="x.destination_field.tags" />
                  </div>
                </div>
              </div>
            </div>
            <div class="tourist-transport-despstbx">
              <label class="tourist-transport-lable">Description*</label><br />
              <FormKit v-model="x.destination_field.description" type="textarea" class="tourist-transport-inpt1st" placeholder="Describe your object"/>
            </div>
            <div class="pricing-destination-dsp-map">
              <span>Display on the map</span>
              <div class="pricing-destination-dsp-innermap"></div>
            </div>
            <div class="pricing-destination-map-dotted">
              <div class="pricing-destination-map-dotted-inner">
                <span class="pricing-destination-map-dotted-inn-spn">
                  <span><i class="bi bi-cloud-upload"></i></span>
                  <span>Upload photos & video</span>
                </span>

                <div class="pricng-destin-dragthem">
                  or drag them in
                </div>
              </div>
            </div>
            <div class="pricing-destination-map-infocl">
              <span class="pricing-destin-map-inffw">
                <i id="tourist-transp-loction" class="bi bi-info-circle"></i>
                <span class="pricing-destination-map-infocl-parg">The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first. The maximum video size is 10 MB. Formats: mp4, mov.</span>
              </span>
            </div>
            <div class="tourist-trans-delt-paddng">
              <div class="tourist-trans-delt-flx">
                <i id="tourist-transp-loction" class="bi bi-trash3"></i>
                <span class="tourist-transport0delete">Delete</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pricing-transport-conta">
          <div class="pricing-transport-heading">
            <div class="pricing-transport-heading-car">
              <span><img src="/img/png/accd.png" alt="" /></span>
              <span class="pricing-trans-detais">Accommodation Details</span>
              <span class="pricing-trans-detais"><InputSwitch v-model="x.accommodation"/></span>
            </div>
            <div class="pricing-right-transport" v-if="x.accommodation">
              <span class="pricing-right-trans-prc">Pricing</span>
              <span class="pricing-right-transpt-rss"><FormKit validation="required" name="price" v-model="x.accommodation_field.price" type="text"/></span>
            </div>
          </div>

          <div v-if="x.accommodation">

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2">
                <label class="tourist-transport-lable">Hotel / Lodge Name</label>
                <span class="tourist-transp-spnnd">
                  <FormKit v-model="x.accommodation_field.hotel" type="text" placeholder="your Company name" class="tourist-transport-inpt1st-depart" />
                </span>
              </div>
              <div class="tourist-bsc-dic-wd2">
                <label class="tourist-transport-lable">Costing Per Person</label>
                <span class="tourist-transp-spnnd">
                  <FormKit v-model="x.accommodation_field.price" type="text" placeholder="$$$$" class="tourist-transport-inpt1st-depart" />
                </span>
              </div>
            </div>

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2">
                <label class="tourist-transport-lable">Checkin</label><br />
                <FormKit v-model="x.accommodation_field.checkin" type="datetime-local" class="tourist-transport-inpt1st" />
              </div>
              <div class="tourist-bsc-dic-wd2">
                <span class="tourist-bsc-dic-checkbx">
                  <label class="tourist-basc-lble">Checkout</label>
                  <FormKit v-model="x.accommodation_field.checkout" type="checkbox" />
                </span>
                <FormKit v-model="x.accommodation_field.checkout_date" type="datetime-local" class="tourist-transport-inpt1st" />
              </div>
            </div>

            <div class="pricing-trans-cmpny-flx">
              <div class="mb-3 jobliscmp-dro-destination">
                <label class="tourist-transport-lable">Country / region*</label>
                <FormKit v-model="x.accommodation_field.country" id="updateevents-drpsemi" />
              </div>
              <div class="mb-3 jobliscmp-dro-destination">
                <label class="tourist-transport-lable">City*</label>
                <FormKit v-model="x.accommodation_field.city" />
              </div>
            </div>

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2-zipcde-blw">
                <label class="tourist-transport-lable">Zip Code</label><br />
                <FormKit v-model="x.accommodation_field.zipcode" type="text" placeholder="--------" class="tourist-transport-inpt1st" />
              </div>
              <div class="mb-3 jobliscmp-dro-destination-ratingg">
                <label class="tourist-transport-lable">Select Rating</label>
                <FormKit v-model="x.accommodation_field.rating" id="updateevents-drpsemi" />
              </div>
              <div class="tourist-trans-delt-additm-trns">
                <span>Add Tags</span>
                <div class="tourist-trans-delt-paddng">
                  <div class="tourist-trans-delt-additm">
                    <span>Add Tags</span>
                    <Chips v-model="x.accommodation_field.tags" />
                  </div>
                </div>
              </div>
            </div>

            <div class="tourist-transport-despstbx">
              <label class="tourist-transport-lable">Description*</label><br />
              <FormKit v-model="x.accommodation_field.description" as="textarea" class="tourist-transport-inpt1st" placeholder="Describe your object"/>
            </div>

            <div class="tourist-bsc-dic-wd2-accd">
              <label class="tourist-transport-lable">Hotel Location</label>
              <span class="tourist-transp-spnnd">
                <i id="tourist-transp-loction" class="bi bi-geo-alt"></i>
                <FormKit v-model="x.accommodation_field.hotel_location" type="text" placeholder="Lorem ipsum dolor sit amet consectetur. Urna." class="tourist-transport-inpt1st-depart" />
              </span>
            </div>

            <div class="pricing-destination-dsp-map">
              <span>Display on the map</span>
              <div class="pricing-destination-dsp-innermap"></div>
            </div>
            <div class="pricing-destination-map-dotted">
              <div class="pricing-destination-map-dotted-inner">
                <span class="pricing-destination-map-dotted-inn-spn">
                  <span><i class="bi bi-cloud-upload"></i></span>
                  <span>Upload photos & video</span>
                </span>

                <div class="pricng-destin-dragthem">
                  or drag them in
                </div>
              </div>
            </div>
            <div class="pricing-destination-map-infocl">
              <span class="pricing-destin-map-inffw">
                <i id="tourist-transp-loction" class="bi bi-info-circle"></i>
                <span class="pricing-destination-map-infocl-parg">The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first. The maximum video size is 10 MB. Formats: mp4, mov.</span>
              </span>
            </div>
            <div class="tourist-trans-delt-paddng">
              <div class="tourist-trans-delt-flx">
                <i id="tourist-transp-loction" class="bi bi-trash3"></i>
                <span class="tourist-transport0delete">Delete</span>
              </div>
            </div>
          </div>

        </div>

        <div class="pricing-transport-conta">
          <div class="pricing-transport-heading">
            <div class="pricing-transport-heading-car">
              <span><i class="bi bi-clock"></i></span>
              <span class="pricing-trans-detais">Activities</span>
              <span class="pricing-trans-detais"><InputSwitch v-model="x.activities"/></span>
            </div>
            <div class="pricing-right-transport" v-if="x.activities">
              <span class="pricing-right-trans-prc">Pricing</span>
              <span class="pricing-right-transpt-rss"><FormKit validation="required" name="price" v-model="x.activities_field.price" type="text"/></span>
            </div>
          </div>

          <div v-if="x.activities">

            <div class="pricing-trans-cmpny-flx">
              <div class="tourist-bsc-dic-wd">
                <label class="tourist-transport-lable">Activity Title</label><br />
                <FormKit v-model="x.activities_field.title" type="text" placeholder="our national park" class="tourist-transport-inpt1st" />
              </div>

              <div class="tourist-bsc-dic-wd">
                <label class="tourist-transport-lable">Activity Type</label><br />
                <FormKit v-model="x.activities_field.type" type="text" placeholder="Sightseeing" class="tourist-transport-inpt1st" />
              </div>

              <div class="tourist-bsc-dic-wd">
                <label class="tourist-transport-lable">Places Covered</label><br />
                <FormKit v-model="x.activities_field.places" type="text" placeholder="Sedan" class="tourist-transport-inpt1st" />
              </div>
            </div>

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2-activities">
                <label class="tourist-transport-lable">Duration</label>
                <span class="tourist-transp-spnnd">
                  <i id="tourist-transp-loction" class="bi bi-clock"></i>
                  <FormKit v-model="x.activities_field.duration" type="text" placeholder="2hr 40 min" class="tourist-transport-inpt1st-depart" />
                </span>
              </div>
              <div class="tourist-bsc-dic-wd2-activities">
                <label class="tourist-transport-lable">Location</label>
                <span class="tourist-transp-spnnd">
                  <i id="tourist-transp-loction" class="bi bi-geo-alt"></i>
                  <FormKit v-model="x.activities_field.location" type="text" placeholder="-----" class="tourist-transport-inpt1st-depart" />
                </span>
              </div>
              <div class="tourist-bsc-dic-wd2-image">
                <label class="tourist-transport-lable">Image</label>
                <span class="tourist-transp-spnnd">
                  <FormKit v-model="x.activities_field.image" type="text" placeholder="--------" class="tourist-transport-inpt1st-depart" />
                  <i id="tourist-transp-upld" class="bi bi-upload"></i>
                </span>
              </div>
            </div>

            <div class="tourist-transport-despstbx">
              <label class="tourist-transport-lable">Description*</label><br />
              <FormKit v-model="x.activities_field.description" as="textarea" class="tourist-transport-inpt1st" />
            </div>

            <div class="tourist-trans-delt-paddng">
              <div class="tourist-trans-delt-flx">
                <i id="tourist-transp-loction" class="bi bi-trash3"></i>
                <span class="tourist-transport0delete">Delete</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pricing-transport-conta">
          <div class="pricing-transport-heading">
            <div class="pricing-transport-heading-car">
              <span><img src="/img/png/cust.png" alt="" /></span>
              <span class="pricing-trans-detais">Custom Tab</span>
              <span class="pricing-trans-detais"><InputSwitch v-model="x.custom"/></span>
            </div>
            <div class="pricing-right-transport" v-if="x.custom">
              <span class="pricing-right-trans-prc">Pricing</span>
              <span class="pricing-right-transpt-rss"><FormKit validation="required" name="price" v-model="x.custom_field.price" type="text"/></span>
            </div>
          </div>

          <div v-if="x.custom">

            <div class="tourist-transport-2stbx">
              <div class="tourist-bsc-dic-wd2-custom">
                <label class="tourist-transport-lable">Tab Title</label>
                <span class="tourist-transp-spnnd">
                  <FormKit v-model="x.custom_field.title" type="text" placeholder="-----" class="tourist-transport-inpt1st-depart" />
                </span>
              </div>
              <div class="tourist-bsc-dic-wd2-image-cus">
                <label class="tourist-transport-lable">Image</label>
                <span class="tourist-transp-spnnd">
                  <FormKit v-model="x.custom_field.image" type="text" placeholder="--------" class="tourist-transport-inpt1st-depart" />
                  <i id="tourist-transp-upld" class="bi bi-upload"></i>
                </span>
              </div>
            </div>

            <div class="tourist-transport-despstbx">
              <label class="tourist-transport-lable">Description*</label><br />
              <FormKit v-model="x.custom_field.description" type="textarea" class="tourist-transport-inpt1st"/>
            </div>

            <div class="tourist-trans-delt-paddng">
              <div class="tourist-trans-delt-flx">
                <i id="tourist-transp-loction" class="bi bi-trash3"></i>
                <span class="tourist-transport0delete">Delete</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </FormKit>
  </div>
</template>



<script>
export default {
  props:{
    x:{
      transportation:false,
      transfer:false,
      destination:false,
      accommodation:false,
      activities:false,
      custom:false,
    }
    },
  data() {
    return {

    };
  },

  methods: {


  }


};

</script>

<style scoped>
@import url('./style.css');
</style>