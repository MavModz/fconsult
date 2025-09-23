<template>
    <div class="form-url-wrapper">
        <div class="your-events-addbtn flex-wrap">
            <div >
            <div class="form-name-container flex items-center gap-2 cursor-pointer">

                <input ref="formNameInput" type="text" v-model="formName" :readonly="!isEditable"
                    placeholder="Add Your Form Name" class="addFromName w-full placeholder-gray-700" @input="checkFormName">

                    <i v-if="formName && !isEditable" class="bi bi-pencil-square" @click="toggleEditMode" style="font-size: 1.5rem;"></i>
                    </div>
                         <p v-if="formNameError" class="text-red-500 text-sm mt-1">{{ formNameError }}</p>
                        </div>
            
            <div>
                <Button class="your-event-addsign" @click="generateLink" label="Get link" icon="pi pi-save"
                    :loading="loading" :disabled="!formName" />
            </div>
        </div>
    </div>
    <div class="form-url-wrapper">
        <div class="url-frm-options">
            <div class="url-frmsopt-flx">
                <span class="frm-url-fopt">Form Fields</span>
                <span class="frm-url-enble">
                    <span class="frm-url-disalbl">Disable All</span>
                    <span @click="toggle('all')" class="toggle-form" :class="{ active: toggles.all }">
                        <span class="frm-toggle-inside" :class="{ active: toggles.all }"></span>
                    </span>
                    <span class="frm-url-disalbl">Enable All</span>
                </span>
            </div>

            <div class="url-frm-four-grd">
                <div v-for="(i, index) in ['Name', 'Email', 'Phone']" :key="index" class=" url-frm-four">
                    <span class="url-innr-frm-togle">

                        <span class="toggle-form active">
                            <span class="frm-toggle-inside active"></span>
                        </span>
                        <span>{{ i }}</span>
                    </span>
                </div>
                <div v-for="(i, index) in allItems" :key="index" class=" url-frm-four">
                    <span class="url-innr-frm-togle">

                        <span @click="toggle(`${i.key}`)" class="toggle-form" :class="{ active: toggles[i.key] }">
                            <span class="frm-toggle-inside" :class="{ active: toggles[i.key] }"></span>
                        </span>
                        <span>{{ i.label }}</span>
                    </span>
                </div>
            </div>

        </div>


    </div>

</template>

<script>

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})
export default {
    name: 'FormGenerate',
    data() {
        return {
            loading: false,
            allItems: [
                { key: 'dob', label: 'Date of Birth' },
                { key: 'country', label: 'Country' },
                { key: 'state', label: 'State' },
                { key: 'city', label: 'City' },
                { key: 'pincode', label: 'PIN Code' },
                { key: 'gender', label: 'Gender' },
                { key: 'age', label: 'Age' },
                { key: 'per_address', label: 'Present Address' },
                { key: 'corr_address', label: 'Corrosponding Address' },
                { key: 'refusal', label: 'Refusal' },
                { key: 'family', label: 'Family Details' },
                { key: 'primary', label: 'Primary Education' },
                { key: 'professional', label: 'Professional Course' },
                { key: 'languages', label: 'Language' },
                { key: 'job', label: 'Job' },
            ],
            name: null,
            email: null,
            toggles: {
                all: false,
                // for basic details of a lead
                dob: false,
                country: false,
                state: false,
                city: false,
                pincode: false,
                gender: false,
                age: false,
                per_address: false,

                // for personal details
                corr_address: false,
                refusal: false,
                family: false,

                // For educational details
                primary: false,
                professional: false,

                // for language proficiency
                languages: false,

                // for job details
                job: false,

            },
            isEditable: true,
            formName: '',
             formNameError: '',
        }
    },
    async mounted() {
        activateMenu('visitorRegister', "Visitor Register",true);
        if (this.formName) {
            this.isEditable = false;  // If formName is already filled, input is non-editable
        }
    },
    methods: {
        preventLeadingSpace() {
        if (this.formName.startsWith(' ')) {
            this.formName = this.formName.trimStart(); // remove leading spaces
        }
    },
     checkFormName() {
        // Remove leading spaces
        if (this.formName.startsWith(' ')) {
            this.formNameError = "First character cannot be a space";
            this.formName = this.formName.trimStart();
        } else {
            this.formNameError = "";
        }
    },
        async generateLink() {
           
            if (this.isEditable) {
                this.isEditable = false;  // After saving, set the input field back to non-editable state
            }

            var d = { formFields: this.toggles }
            d.formName = this.formName
            this.loading = true
            await adminPost(`/add-forms`, d)
            this.$router.go(-1)
            this.loading = false
        },
        toggle(key) {
            if (key === 'all') {
                this.toggleAll();
            } else {
                this.toggleSwitch(key);
            }
        },
        toggleEditMode() {
            this.isEditable = !this.isEditable;  // Toggle the editable state
            if (this.isEditable) {
                this.$nextTick(() => {
                    this.$refs.formNameInput.focus();
                });
            }
        },
        // toggleAll() {
        //     this.toggles.all = !this.toggles.all;
        //     for (const i in this.allItems) {
        //         this.toggles[this.allItems[i].key] = true
        //     }
        // },
        toggleAll() {
            this.toggles.all = !this.toggles.all; // Flip the main toggle
            const newState = this.toggles.all;   // Store the new state of "all"

            // Update all individual toggles to match the new state
            for (const item of this.allItems) {
                this.toggles[item.key] = newState;
            }
        },

        toggleSwitch(key) {
            this.toggles[key] = !this.toggles[key];
        },

    }

};
</script>

<style scoped>
@import url('./style.css');
</style>