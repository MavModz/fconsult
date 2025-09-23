<template>

    <Dialog v-model:visible="CommonTransportation" modal :closable="false"
        class="w-[100vw] 2xl:w-[60vw] xl:w-[68vw] lg:w-[78vw] md:w-[85vw] sm:w-[90vw] ">
        <!-- {{ form }} -->
        <form @submit.prevent="submitForm">
            <div class="transport-form-container">
                <div class="form-header">
                    <div class="d-flex gap-2 items-center">
                        <i class="bi bi-train-front text-[#ff5757] text-xl"></i>
                        <h2>Transportation Details</h2>
                    </div>
                    <button type="button" class="close-btn" @click="handleClose">&times;</button>
                </div>
                <div class="form-row-1 mb-[24px]">
                    <div class="form-group">
                        <label class="required">Transportation Type</label>
                        <div class="select-option cursor-pointer">
                            <select v-model="form.transportationType" class="custom-select cursor-pointer"
                                :disabled="action">
                                <option value="">Select Type</option>
                                <option value="Flight">Flight</option>
                                <option value="Water">Water</option>
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
                        <input type="text" v-model="form.company" class="form-input" placeholder="Indigo"
                            :readonly="action" />
                        <p v-if="validationErrors.company" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.company }}
                        </p>
                    </div>
                    <div class="form-group">
                        <label class="required">Transportation Class</label>
                        <div class="select-option cursor-pointer">
                            <select v-model="form.class" class="custom-select cursor-pointer" :disabled="action">
                                <option value="">Select Class</option>
                                <option value="Economy">Economy</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                        <p v-if="validationErrors.class" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.class }}
                        </p>
                    </div>
                </div>
                <div class="form-row-1 mb-[24px]" v-show="form.transportationType === 'Flight'">
                    <div class="form-group">
                        <label>Flight Name / Code</label>
                        <input type="text" class="form-input" placeholder="Flight IBIS212" v-model="form.flightNameCode"
                            :readonly="action" />
                    </div>
                    <div class="form-group">
                        <label>Departure Terminal</label>
                        <input type="text" class="form-input" placeholder="Terminal 1" v-model="form.departureTerminal"
                            :readonly="action" />
                    </div>
                    <div class="form-group">
                        <label>Arrival Terminal</label>
                        <input type="text" class="form-input" placeholder="Terminal 3" v-model="form.arrivalTerminal"
                            :readonly="action" />
                    </div>
                </div>
                <div v-show="form.transportationType === 'Water'">

                    <div class="form-group mb-[24px]">
                        <label>Vessel / Ferry Name</label>
                        {{ form.vesselName }}
                        <input type="text" class="form-input" placeholder="River Sprinter" v-model="form.vesselName"
                            :readonly="action" />
                    </div>

                    <div class="form-grid mb-[24px]">
                        <div class="form-group">
                            <label>Boarding Port</label>
                            <input type="text" class="form-input" placeholder="Jawaharlal Nehru Port(JNPT)"
                                v-model="form.boardingPort" :readonly="action" />
                        </div>
                        <div class="form-group">
                            <label>Disembarking Port</label>
                            <input type="text" class="form-input" placeholder="Boston Port"
                                v-model="form.disembarkingPort" :readonly="action" />
                        </div>
                    </div>
                </div>

                <div class="form-grid mb-[24px]" v-show="form.transportationType === 'Train'">
                    <div class="form-group">
                        <label>Train Name / Number</label>
                        <input type="text" class="form-input" placeholder="Shatabdi Express"
                            v-model="form.trainNameNumber" :readonly="action" />
                    </div>
                    <div class="form-group">
                        <label>Boarding Station</label>
                        <input type="text" class="form-input" placeholder="YESVANTPUR JN - YPR"
                            v-model="form.boardingStation" :readonly="action" />
                    </div>
                    <div class="form-group">
                        <label>destination Station</label>
                        <input type="text" class="form-input" placeholder="WARANGAL - WL(WARANGAL)"
                            v-model="form.destinationStation" :readonly="action" />
                    </div>
                    <div class="form-group">
                        <label>Platform Number</label>
                        <input type="text" class="form-input" placeholder="Platform 24" v-model="form.platformNumber"
                            :readonly="action" />
                    </div>
                </div>

                <div v-show="form.transportationType === 'Road'">
                    <div class="form-grid mb-[24px]">
                        <div class="form-group">
                            <label>Vehicle Type</label>
                            <div class="select-option cursor-pointer">
                            <select v-model="form.vehicleType" class="custom-select cursor-pointer" :disabled="action">
                                <option value="">Select Vehicle</option>
                                <option value="Bus">By Bus</option>
                                <option value="car">By Car/ Cab</option>
                            </select>
                        </div>
                            
                        </div>
                        <div class="form-group">
                            <label>Vehicle Name / Company</label>
                            <input type="text" class="form-input" placeholder="TATA STARBUS ULTRA"
                                v-model="form.vehicleNameCompany" :readonly="action" />
                        </div>
                    </div>
                    <div class="form-row-1 mb-[24px]">
                        <div class="form-group">
                            <label>Pickup Point</label>
                            <input type="text" class="form-input" placeholder="pickup point" v-model="form.pickupPoint"
                                :readonly="action" />
                        </div>
                        <div class="form-group">
                            <label>Drop-off Point</label>
                            <input type="text" class="form-input" placeholder="dropoff point"
                                v-model="form.dropoffPoint" :readonly="action" />
                        </div>
                        <div class="form-group">
                            <label>Approximate Duration</label>
                            <input type="text" class="form-input" placeholder="3 Hours" v-model="form.duration"
                                :readonly="action" />
                        </div>
                    </div>
                </div>
                <div class="form-grid mb-[24px]">
                    <div class="form-group">
                        <label class="required">Departure Date & Time</label>
                        <input type="datetime-local" v-model="form.departureDateTime" class="form-input"
                            placeholder="Sun, 27 Apr 2024 | 10:30 PM" :readonly="action" />
                        <p v-if="validationErrors.departureDateTime" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.departureDateTime }}
                        </p>
                    </div>
                    <div class="form-group">
                        <label class="required">Arrival Date & Time</label>
                        <input type="datetime-local" v-model="form.arrivalDateTime" class="form-input"
                            placeholder="Sun, 27 Apr 2024 | 10:30 PM" :readonly="action" />
                        <p v-if="validationErrors.arrivalDateTime" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.arrivalDateTime }}
                        </p>
                    </div>
                    <div class="form-group">
                        <label class="required">Departure Location</label>
                        <div class="icon-input">
                            <i class="bi bi-geo-alt"></i>
                            <input type="text" v-model="form.departureLocation" class="form-input"
                                placeholder="Lorem ipsum dolor sit amet..." :readonly="action" />
                            <p v-if="validationErrors.departureLocation" class="!text-red-500 text-sm mt-1">
                                {{ validationErrors.departureLocation }}
                            </p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="required">Destination Location</label>
                        <div class="icon-input">
                            <i class="bi bi-geo-alt"></i>
                            <input type="text" v-model="form.destinationLocation" class="form-input"
                                placeholder="Lorem ipsum dolor sit amet..." :readonly="action" />
                            <p v-if="validationErrors.destinationLocation" class="!text-red-500 text-sm mt-1">
                                {{ validationErrors.destinationLocation }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-[24px]">
                    <label class="checkbox-label">

                        Layover / Stopover
                        <input type="checkbox" v-model="layoverActive" class="custom-checkbox" :disabled="action" />
                    </label>
                    <input v-show="layoverActive" type="text" v-model="form.layoverNote" class="form-input"
                        placeholder="add notes" :readonly="action" />
                </div>
                <div class="form-group ">
                    <label class="required">Description</label>
                    <div class="study-visa-description-block">
                        <QuillEditor v-model="form.layoverDescription" :modules="modules" ref="qhtml" class="mb-3"
                            style="height:120px" :read-only="action" />
 <p v-if="validationErrors.layoverDescription" class="!text-red-500  text-sm mt-[-10px]">
    {{ validationErrors.layoverDescription }}
  </p>
                    </div>
                </div>
                <!-- <div class="form-footer"> -->
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
            <div class="flex justify-start  mt-3 sm:mt-5">
                <button type="submit" v-if="!action"
                    class="bg-[#ff5757] border border-[#ff5757] text-[#ffffff] text-[16px] sm:text-[18px] hover:bg-white hover:text-[#ff5757] rounded-2xl py-[9px] sm:py-[13px]  px-[20px] sm:px-[26px]">Submit</button>
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
    name: 'DialogWrapper',
    props: {
        showCommon: Boolean,
        data: Array,
        doc: Object,
        ind: Number,
        action: Boolean,
        departureCutoff: String,
        returnCutoff:String,
    },
    watch: {
        showCommon(val) {
            this.CommonTransportation = val;
        },
        doc: {
            immediate: true,
            handler(newDoc) {
                if (newDoc && typeof newDoc === 'object') {
                    Object.keys(this.form).forEach(key => {
                        this.form[key] = newDoc[key] !== undefined ? newDoc[key] : '';
                    });

                    this.tags = Array.isArray(newDoc.tags) ? [...newDoc.tags] : [];
                    this.layoverActive = !!newDoc.hasLayover;

                    // 🟢 Force QuillEditor update on next tick
                    this.$nextTick(() => {
                        setTimeout(() => {
                            const quillRef = this.$refs.qhtml;
                            if (quillRef && typeof quillRef.setHTML === 'function') {
                                quillRef.setHTML(this.form.layoverDescription || '');
                            }
                        }, 100);
                    });

                } else {
                    this.resetForm()
                }
            }
        }
    },
    data() {
        return {
            CommonTransportation: false,
            layoverActive: false,
            tags: [],
            newTag: '',
            transportationList: [],
            validationErrors: {},
            form: {
                type: "Transportation",
                transportationType: '',
                company: '',
                class: '',
                departureDateTime: '',
                arrivalDateTime: '',
                departureLocation: '',
                destinationLocation: '',
                layoverNote: '',
                layoverDescription: '',
                // Flight-specific
                flightNameCode: '',
                departureTerminal: '',
                arrivalTerminal: '',
                // Water-specific
                vesselName: '',
                boardingPort: '',
                disembarkingPort: '',
                // Train-specific
                trainNameNumber: '',
                boardingStation: '',
                destinationStation: '',
                platformNumber: '',
                // Road-specific
                vehicleType: '',
                vehicleNameCompany: '',
                pickupPoint: '',
                dropoffPoint: '',
                duration: '',
            }
        };
    },
    methods: {
        addTag() {
              if (this.action) return;
            const value = this.newTag.trim();
            if (value && !this.tags.includes(value)) {
                this.tags.push(value);
            }
            this.newTag = '';
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
        removeTag(index) {
            if (this.action) return;
            this.tags.splice(index, 1);
        },
        submitForm() {
            if (!this.validateForm()) return;

            const payload = {
                ...this.form,
                layoverDescription: this.$refs.qhtml.getHTML(),
                tags: [...this.tags],
                hasLayover: this.layoverActive,
                type: "Transportation",
                icon: 'bi bi-train-front'
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
            this.CommonTransportation = false;

        },
        // validateForm() {
        //     this.validationErrors = {}; // clear previous errors
        //     if (!this.form.transportationType.trim()) {
        //         this.validationErrors.transportationType = 'Transportation Type is required.';
        //     }
        //     if (!this.form.company.trim()) {
        //         this.validationErrors.company = 'Transportation Company is required.';
        //     }

        //     if (!this.form.class.trim()) {
        //         this.validationErrors.class = 'Transportation Class is required.';
        //     }
        //     if (!this.form.departureDateTime.trim()) {
        //         this.validationErrors.departureDateTime = 'Departure Date & Time is required.';
        //     }

        //     if (!this.form.arrivalDateTime.trim()) {
        //         this.validationErrors.arrivalDateTime = 'Arrival Date & Time is required.';
        //     }
        //     if (!this.form.departureLocation.trim()) {
        //         this.validationErrors.departureLocation = 'Departure Location is required.';
        //     }
        //     if (!this.form.destinationLocation.trim()) {
        //         this.validationErrors.destinationLocation = 'Destination Location is required.';
        //     }

        //     // Return true only if there are no errors
        //     return Object.keys(this.validationErrors).length === 0;
        // },
       validateForm() {
    this.validationErrors = {}; // Clear previous errors

    const {
        transportationType,
        company,
        class: travelClass,
        departureDateTime,
        arrivalDateTime,
        departureLocation,
        destinationLocation,
        layoverDescription
    } = this.form;

    if (!transportationType.trim()) {
        this.validationErrors.transportationType = 'Transportation Type is required.';
    }

    if (!company.trim()) {
        this.validationErrors.company = 'Transportation Company is required.';
    }

    if (!travelClass.trim()) {
        this.validationErrors.class = 'Transportation Class is required.';
    }

    // if (!departureDateTime.trim()) {
    //     this.validationErrors.departureDateTime = 'Departure Date & Time is required.';
    // }
      if (!departureDateTime.trim()) {
    this.validationErrors.departureDateTime = 'Departure Date & Time is required.';
  } else if (
    this.departureCutoff &&
    new Date(departureDateTime) < new Date(this.departureCutoff)
  ) {
    this.validationErrors.departureDateTime = `Departure cannot be before ${this.formatDate(this.departureCutoff)}`;
  }

  
    if (!arrivalDateTime.trim()) {
    this.validationErrors.arrivalDateTime = 'Arrival Date & Time is required.';
  } else if (new Date(arrivalDateTime) <= new Date(departureDateTime)) {
    this.validationErrors.arrivalDateTime = 'Arrival must be after Departure.';
  } else if (
    this.returnCutoff &&
    new Date(arrivalDateTime) > new Date(this.returnCutoff)
  ) {
    this.validationErrors.arrivalDateTime = `Arrival cannot be after ${this.formatDate(this.returnCutoff)}`;
  }
    // if (!arrivalDateTime.trim()) {
    //     this.validationErrors.arrivalDateTime = 'Arrival Date & Time is required.';
    // } else if (departureDateTime && new Date(arrivalDateTime) <= new Date(departureDateTime)) {
    //     this.validationErrors.arrivalDateTime = 'Arrival must be after Departure.';
    // }

    if (!departureLocation.trim()) {
        this.validationErrors.departureLocation = 'Departure Location is required.';
    }

    if (!destinationLocation.trim()) {
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
},

        resetForm() {
            Object.keys(this.form).forEach(key => {
                this.form[key] = '';
            });
            this.tags = [];
            this.newTag = '';
            this.layoverActive = false;
        },
        handleClose() {
            this.CommonTransportation = false;
            this.$emit('close');
            this.resetForm()
        },
    }
}
</script>
<style scoped>
@import url('style.css');
</style>