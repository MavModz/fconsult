<template>
    <div class="form-url-screen" v-if="item">

        <div class="form-url-wrapper">
            <div class="your-events-addbtn">
                <div class="form-name-container flex items-center gap-2 cursor-pointer">
                    <input ref="formNameInput" type="text" v-model="item.formName" :readonly="!isEditable"
                        placeholder="Add Your Form Name" class="addFromName w-full placeholder-gray-700">
                    <i v-if="item.formName" class="bi bi-pencil-square" @click="toggleEditMode"
                        style="font-size: 1.5rem;"></i>
                </div>
                <div>
                    <Button class="your-event-addsign" @click="updateLink" label="Update Link" icon="pi pi-save"
                        :loading="loading" :disabled="!item.formName" />
                </div>
            </div>
        </div>

        <div class="form-url-wrapper">
            <div class="url-frm-options">
                <div class="url-frmsopt-flx">
                    <span class="frm-url-fopt">Form Fields</span>
                    <span class="frm-url-enble">
                        <span class="frm-url-disalbl">Disable All</span>
                        <span @click="toggle('all')" class="toggle-form" :class="{ active: item.formFields.all }">
                            <span class="frm-toggle-inside" :class="{ active: item.formFields.all }"></span>
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

                            <span @click="toggle(`${i.key}`)" class="toggle-form" :class="{ active: item.formFields[i.key] }">
                                <span class="frm-toggle-inside" :class="{ active: item.formFields[i.key] }"></span>
                            </span>
                            <span>{{ i.label }}</span>
                        </span>
                    </div>
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
            isEditable: false,
            item:null
        }
    },

    async mounted() {
        this.item = (await adminGet(`/admin-form/${useRoute().params.id}`)).data.data
        activateMenu('visitorRegister', "Update Form", true);
    },
    methods: {
        async updateLink() {
            this.loading = true
            await adminPut(`/update-forms/${this.$route.params.id}`, this.item)
            this.loading = false
            successAlert("Form Updated Successfully")
            this.$router.go(-1)

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

        toggleAll() {
            this.item.formFields.all = !this.item.formFields.all; // Flip the main toggle
            const newState = this.item.formFields.all;   // Store the new state of "all"

            // Update all individual toggles to match the new state
            for (const toggleItem of this.allItems) {
                this.item.formFields[toggleItem.key] = newState;
            }
        },

        toggleSwitch(key) {
            this.item.formFields[key] = !this.item.formFields[key];
        },

    }

};
</script>

<style scoped>
@import url('./style.css');
</style>