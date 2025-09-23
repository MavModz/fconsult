<template>
  <Dialog v-model:visible="Transfer" modal :closable="false" class="w-[100vw] 2xl:w-[60vw] xl:w-[68vw] lg:w-[78vw] md:w-[85vw] sm:w-[90vw] " >
    <form @submit.prevent="submitForm">
      <div class="transport-form-container">
        <div class="form-header">
          <div class="d-flex gap-2 items-center">
            <i class="bi bi-arrow-left-right text-[#ff5757] text-xl"></i>
            <h2>Transfer Details</h2>
          </div>
          <button type="button" class="close-btn" @click="handleClose">&times;</button>
        </div>
        <div class="form-row-1 mb-[24px]">
          <div class="form-group">
            <label class="required">Transportation Type</label>
            <div class="select-option cursor-pointer">
              <select v-model="transportationType" class="custom-select cursor-pointer"  :disabled="action">
                <option value="">Select Type</option>
                <option value="Train">Train</option>
                <option value="Road">By Road</option>
              </select>
            </div>
                <p v-if="validationErrors.transportationType" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.transportationType }}
                        </p>
          </div>
          <div class="form-group">
            <label class="required">Transportation Company</label>
            <input v-model="transportationCompany" type="text" class="form-input" placeholder="SRS Travels" :readonly="action" />
               <p v-if="validationErrors.company" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.company }}
                        </p>
          </div>
          <div class="form-group">
            <label class="required">Transportation Class</label>
            <div class="select-option cursor-pointer" >
              <select v-model="transportationClass" class="custom-select cursor-pointer"  :disabled="action">
                <option value="">Select Class</option>
                <option value="General">General</option>
                <option value="AC">AC</option>
              </select>
            </div>
            <p v-if="validationErrors.class" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.class }}
                        </p>
          </div>
        </div>
        <div v-show="transportationType === 'Road'">
          <div class="form-grid mb-[24px]">
            <div class="form-group">
              <label>Vehicle Type</label>
              <input v-model="vehicleType" type="text" class="form-input" placeholder="Bus" :readonly="action"/>
            </div>
            <div class="form-group">
              <label>Vehicle Name / Company</label>
              <input v-model="vehicleName" type="text" class="form-input" placeholder="TATA STARBUS ULTRA" :readonly="action"/>
            </div>
          </div>
          <div class="form-row-1 mb-[24px]">
            <div class="form-group">
              <label>Pickup Point</label>
              <input type="text" v-model="pickupPoint" class="form-input" placeholder="pickup point" :readonly="action"/>
            </div>
            <div class="form-group">
              <label>Drop-off Point</label>
              <input type="text" v-model="dropOffPoint" class="form-input" placeholder="dropoff point" :readonly="action"/>
            </div>
            <div class="form-group">
              <label>Approximate Duration</label>
              <input v-model="approximateDuration" type="text" class="form-input" placeholder="3 Hours" :readonly="action"/>
            </div>
          </div>
        </div>

        <div class="form-grid mb-[24px]" v-show="transportationType === 'Train'">
          <div class="form-group">
            <label>Train Name / Number</label>
            <input v-model="trainName" type="text" class="form-input" placeholder="Shatabdi Express" :readonly="action"/>
          </div>
          <div class="form-group">
            <label>Boarding Station</label>
            <input v-model="boardingStation" type="text" class="form-input" placeholder="YESVANTPUR JN - YPR" :readonly="action"/>
          </div>
          <div class="form-group">
            <label>Destination Station</label>
            <input v-model="destinationStation" type="text" class="form-input" placeholder="WARANGAL - WL(WARANGAL)" :readonly="action"/>
          </div>
          <div class="form-group">
            <label>Platform Number</label>
            <input v-model="platformNumber" type="text" class="form-input" placeholder="Platform 24" :readonly="action"/>
          </div>
        </div>

        <div class="form-grid mb-[24px]">
          <div class="form-group">
            <label class="required">Departure Date & Time</label>
            <input v-model="departureDateTime" type="datetime-local" class="form-input"
              placeholder="Sun, 27 Apr 2024 | 10:30 PM" :min="departureCutoff" :readonly="action"/>
               <p v-if="validationErrors.departureDateTime" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.departureDateTime }}
                        </p>
          </div>
          <div class="form-group">
            <label class="required">Arrival Date & Time</label>
            <input v-model="arrivalDateTime" type="datetime-local" class="form-input"
              placeholder="Sun, 27 Apr 2024 | 10:30 PM" :readonly="action"/>
               <p v-if="validationErrors.arrivalDateTime" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.arrivalDateTime }}
                        </p>
          </div>
          <div class="form-group">
            <label class="required">Departure Location</label>
            <div class="icon-input">
              <i class="bi bi-geo-alt"></i>
              <input v-model="departureLocation" type="text" class="form-input"
                placeholder="Lorem ipsum dolor sit amet..." />
                <p v-if="validationErrors.departureLocation" class="!text-red-500 text-sm mt-1">
                                {{ validationErrors.departureLocation }}
                            </p>
            </div>
          </div>
          <div class="form-group">
            <label class="required">Destination Location</label>
            <div class="icon-input">
              <i class="bi bi-geo-alt"></i>
              <input v-model="destinationLocation" type="text" class="form-input"
                placeholder="Lorem ipsum dolor sit amet..." />
                <p v-if="validationErrors.destinationLocation" class="!text-red-500 text-sm mt-1">
                                {{ validationErrors.destinationLocation }}
                            </p>
            </div>
          </div>
        </div>
        <div class="form-group mb-[24px]" v-show="transportationType === 'Train'">
          <label class="checkbox-label">
            Layover / Stopover
            <input type="checkbox" v-model="layoverActive" class="custom-checkbox" :disabled="action"/>
          </label>
          <input v-if="layoverActive" type="text" v-model="layoverNotes" class="form-input" placeholder="add notes" :readonly="action"/>
        </div>
        
        <div class="form-group" >
          <label class="required"> Description</label>
          <QuillEditor :modules="modules" ref="qhtml" class="mb-3" style="height:120px" :read-only="action"/>
           <p v-if="validationErrors.layoverDescription" class="!text-red-500  text-sm mt-[-10px]">
    {{ validationErrors.layoverDescription }}
  </p>
        </div>

          <div class="form-group">
                    <label class="required">Add Tags</label>
                    <div class="input-container ">
                        <input type="text" class="location-input" placeholder="Press Enter to add tags" v-model="newTag"
                            @keydown.enter.prevent.stop="addTag" :readonly="action" />
                        <img @click="addTag" src="/public/img/png/plus-red.png" class="add-icon" v-if="!action">
                    </div>
                </div>
                <div class="tags-container">
                    <div v-for="(tag, index) in tags" :key="index" class="tag">
                        {{ tag }}
                        <img @click="removeTag(index)" class="cursor-pointer" src="/public/img/png/cross-vector.png">
                    </div>
                </div>
                 <p v-if="validationErrors.tags" class="!text-red-500 text-sm mt-[-29px]">
  {{ validationErrors.tags }}
</p>
        <div class="flex justify-start mt-5">
          <button type="submit" v-if="!action"
            class="bg-[#ff5757] border border-[#ff5757] text-[#ffffff] text-[16px] sm:text-[18px] hover:bg-white hover:text-[#ff5757] rounded-2xl py-[11px] sm:py-[15px]  px-[22px] sm:px-[30px]">Submit</button>
        </div>
      </div>
    </form>
  </Dialog>


</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  components: {
    QuillEditor
  },
  props: {
    showTransfer: Boolean,
    data: Array,
    doc: Object,
    ind: Number,
     action: Boolean,
     departureCutoff: String,
     returnCutoff:String,
  },
  watch: {
    showTransfer(val) {
      this.Transfer = val;
    },
    doc: {
      immediate: true,
      handler(newDoc) {
        if (newDoc) {
          this.transportationCompany = newDoc.transportationCompany || '';
          this.transportationClass = newDoc.transportationClass || '';
          this.trainName = newDoc.trainName || '';
          this.boardingStation = newDoc.boardingStation || '';
          this.destinationStation = newDoc.destinationStation || '';
          this.platformNumber = newDoc.platformNumber || '';
          this.departureDateTime = newDoc.departureDateTime || '';
          this.arrivalDateTime = newDoc.arrivalDateTime || '';
          this.departureLocation = newDoc.departureLocation || '';
          this.destinationLocation = newDoc.destinationLocation || '';
          this.transportationType = newDoc.transportationType || '';
          this.layoverActive = newDoc.layoverActive || '';
          this.layoverNotes = newDoc.layoverNotes || '';
          this.description = newDoc.description || '';
          this.vehicleType = newDoc.vehicleType || '';
          this.vehicleName = newDoc.vehicleType || '';
          this.pickupPoint = newDoc.pickupPoint || '',
            this.dropOffPoint = newDoc.dropOffPoint || '',
            this.approximateDuration = newDoc.approximateDuration || '',
            this.$nextTick(() => {
              setTimeout(() => {
                const quillRef = this.$refs.qhtml;
                if (quillRef && typeof quillRef.setHTML === 'function') {
                  quillRef.setHTML(this.description || '');
                }
              }, 100);
            });
          this.tags = newDoc.tags ? [...newDoc.tags] : [];
          this.layoverActive = !!(newDoc.layoverActive); // if you have it
        } else {
          // If doc is null, clear the form (optional)
          this.resetForm();
        }
      }
    },

    transportationType(newVal) {
      if (newVal === 'Road') {
        // Clear Train-specific fields
        this.trainName = '';
        this.boardingStation = '';
        this.destinationStation = '';
        this.platformNumber = '';
      } else if (newVal === 'Train') {
        // Clear Road-specific fields
        this.vehicleType = '';
        this.vehicleName = '';
        this.pickupPoint = '';
        this.dropOffPoint = '';
        this.approximateDuration = '';
      }


    }
  },
    data() {
      return {
        type: "Transfer",
        Transfer: false,
        layoverActive: false,
        layoverNotes: "",
        description: "",
        transportationType: '',
        tags: [],
        newTag: '',
        transportationCompany: '',
        transportationClass: '',
        //Train
        trainName: '',
        boardingStation: '',
        destinationStation: '',
        platformNumber: '',

        departureDateTime: '',
        arrivalDateTime: '',
        departureLocation: '',
        destinationLocation: '',
        transportationList: [],
        //road
        vehicleType: "",
        vehicleName: "",
        pickupPoint: "",
        dropOffPoint: "",
        approximateDuration: "",

 validationErrors: {},
      };
    },
     methods: {
      addTag() {
        const value = this.newTag.trim();
        if (value && !this.tags.includes(value)) {
          this.tags.push(value);
        }
        this.newTag = '';
      },
      removeTag(index) {
        if (this.action) return;
        this.tags.splice(index, 1);
      },

  formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
},


      submitForm() {
  if (!this.validateForm()) {
    return; // stop if validation fails
  }

  const payload = {
    icon: 'bi bi-arrow-left-right',
    type: this.type,
    layoverActive: this.layoverActive,
    layoverNotes: this.layoverNotes,
    description: this.$refs.qhtml.getHTML(),
    transportationType: this.transportationType,
    transportationCompany: this.transportationCompany,
    transportationClass: this.transportationClass,
    trainName: this.trainName,
    boardingStation: this.boardingStation,
    destinationStation: this.destinationStation,
    platformNumber: this.platformNumber,
    departureDateTime: this.departureDateTime,
    arrivalDateTime: this.arrivalDateTime,
    departureLocation: this.departureLocation,
    destinationLocation: this.destinationLocation,
    vehicleType: this.vehicleType,
    vehicleName: this.vehicleName,
    pickupPoint: this.pickupPoint,
    dropOffPoint: this.dropOffPoint,
    approximateDuration: this.approximateDuration,
    tags: [...this.tags],
  };

  if (this.ind !== null && this.ind !== undefined) {
    this.data[this.ind] = payload;
  } else {
    this.data.push(payload);
  }

  this.$emit('resetEditState');
  this.$emit('submit', payload);

  console.log("Submitted:", payload);

  this.resetForm();
  this.Transfer = false;
},
validateForm() {
  this.validationErrors = {}; // Clear previous errors

  if (!this.transportationType.trim()) {
    this.validationErrors.transportationType = 'Transportation Type is required.';
  }

  if (!this.transportationCompany.trim()) {
    this.validationErrors.company = 'Transportation Company is required.';
  }

  if (!this.transportationClass.trim()) {
    this.validationErrors.class = 'Transportation Class is required.';
  }

  // if (!this.departureDateTime.trim()) {
  //   this.validationErrors.departureDateTime = 'Departure Date & Time is required.';
  // }
  if (!this.departureDateTime.trim()) {
    this.validationErrors.departureDateTime = 'Departure Date & Time is required.';
  } else if (
    this.departureCutoff &&
    new Date(this.departureDateTime) < new Date(this.departureCutoff)
  ) {
    this.validationErrors.departureDateTime = `Departure cannot be before ${this.formatDate(this.departureCutoff)}`;
  }
  

  // if (!this.arrivalDateTime.trim()) {
  //   this.validationErrors.arrivalDateTime = 'Arrival Date & Time is required.';
  // } else if (new Date(this.arrivalDateTime) <= new Date(this.departureDateTime)) {
  //   this.validationErrors.arrivalDateTime = 'Arrival must be after Departure.';
  // }

    if (!this.arrivalDateTime.trim()) {
    this.validationErrors.arrivalDateTime = 'Arrival Date & Time is required.';
  } else if (new Date(this.arrivalDateTime) <= new Date(this.departureDateTime)) {
    this.validationErrors.arrivalDateTime = 'Arrival must be after Departure.';
  } else if (
    this.returnCutoff &&
    new Date(this.arrivalDateTime) > new Date(this.returnCutoff)
  ) {
    this.validationErrors.arrivalDateTime = `Arrival cannot be after ${this.formatDate(this.returnCutoff)}`;
  }

  if (!this.departureLocation.trim()) {
    this.validationErrors.departureLocation = 'Departure Location is required.';
  }

  if (!this.destinationLocation.trim()) {
    this.validationErrors.destinationLocation = 'Destination Location is required.';
  }

  const rawDescription = this.$refs.qhtml?.getText?.().trim();
  if (!rawDescription) {
    this.validationErrors.layoverDescription = 'Description is required.';
  }

  if (this.tags.length === 0) {
    this.validationErrors.tags = 'At least one tag is required.';
  }

  return Object.keys(this.validationErrors).length === 0;
}
,
      resetForm() {
        this.transportationType = '';
        this.transportationCompany = '';
        this.transportationClass = '';
        //train
        this.trainName = '';
        this.boardingStation = '';
        this.destinationStation = '';
        this.platformNumber = '';
        //
        this.departureDateTime = '';
        this.layoverNotes = "",
          this.arrivalDateTime = '';
        this.departureLocation = '';
        this.destinationLocation = '';
        this.tags = [];
        this.newTag = '';
        this.layoverActive = false;
        this.vehicleType = "",
          this.vehicleName = "",
          this.pickupPoint = "",
          this.dropOffPoint = "",
          this.approximateDuration = ""
      },

      handleClose() {
        this.Transfer = false
        this.$emit('close');
        this.resetForm()
        // Do NOT call submitForm here
      },

    }
  }
</script>
<style scoped>
.transport-form-container {
  padding: 0px 24px 24px;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  padding-bottom: 12px;
  margin-bottom: 24px;
}

.tag-section p {
  font-weight: 400;
  margin-bottom: 6px !important;
  font-size: 17px;
  color: #1F1B2D;
}

.form-header h2 {
  font-size: 23px;
  font-weight: 700;
  color: #1F1B2D;
  margin-bottom: 0px;
}

.required::after {
  content: " *";
  color: #ff5757;
}

.close-btn {
  background: none;
  font-size: 27px;
  border: none;
  cursor: pointer;
  color: #838383;
}

.required::after {
  content: " *";
  color: #ff5757;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-row-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

label {
  font-weight: 400;
  margin-bottom: 6px;
  font-size: 17px;
  color: #1F1B2D;
}

.select-option {
  padding: 0rem 1.5rem 0rem 0.5rem;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;

}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
    margin-bottom: 18px;
  }
  .add-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #f44336;
    cursor: pointer;
  }

  .location-input {
    font-size: 16px;
    color: #333;
  }
.input-container {
    position: relative;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }
select {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

.custom-select {
  border: none !important;
  outline: none !important;
}


.form-input {
  padding: 13px 17px;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  font-size: 17px;
  width: 100%;
}

.icon-input {
  position: relative;
}

.icon-input i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 17px;
  color: #ff5757;
}

.icon-input input {
  padding-left: 41px;
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}

.form-footer {
  display: flex;
  justify-content: end;
  align-items: flex-start;
  margin-top: 49px;
}


.tag-section span {
  font-size: 16px;
  color: #1F1B2D;
  margin-right: 6px;
}

.tags {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  border: 1.24px solid #D5D2DC;
  border-radius: 10px;
  padding: 10px 13px;
  white-space: nowrap;
  overflow-x: auto;
  justify-content: space-between;
  scrollbar-width: none;
}

.tag {
  background-color: #ffeef0;
  color: #ff5757 !important;
  padding: 9px 17px;
  border-radius: 20px;
  font-size: 14px !important;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.tags-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.tags::-webkit-scrollbar {
  display: none;
}

.fade {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
  pointer-events: none;
}

.add-tag-btn {
  padding: 4px 8px;
  cursor: pointer;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.custom-checkbox {
  appearance: none;
  width: 17px;
  height: 16px;
  border: 2px solid #ff5757;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  background-color: white;
}

.custom-checkbox:checked {
  background-color: #ff5757;
}

.custom-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  font-size: 12px;
  color: white;
}

@media screen and (min-width: 600px) and (max-width: 950px) {
.form-row-1 {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}
}
@media screen and  (max-width: 600px) {
  .form-row-1, .form-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;  
}
.transport-form-container {
    padding: 0px 0px 24px;
}
}
</style>