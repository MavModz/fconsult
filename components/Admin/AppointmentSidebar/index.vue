    <template>
        <Sidebar v-model:visible="onsiteAppointmentSidebar"  :header="false" position="right" :showCloseIcon="false"
            :style="{ 'width': '480px', 'overflow': 'hidden scroll', 'paddingTop':'40px' }">
            <div class="card-header" style="padding: 15px 8px;">
                <div class="d-flex justify-content-between">
                    <div class="col-sm-11">
                        <h2 class="text-[24px]">Onsite Appointment</h2>
                    </div>
                    <div class="col-sm-6">
                        <BootstrapIcon name="x-lg" class="icon1" @click="this.onsiteAppointmentSidebar = false" />
                    </div>
                </div>
            </div>
            <div class="card-body px-2">
                <div class="col-sm-12">
                    <FormKit type="form" @submit="addOnsite">
                        <div class="mt-2">
                            <FormKit type="select" validation="required" name="client" label="Select Client"
                                v-model="client" :options="clients" :disabled="isSelectedClient" input-class="form-select"/>
                        </div>
                        <div class="mt-4">
                            <label class="formkit-label mb-1 block text-sm font-medium text-gray-700 required"> Host Name</label>
                            <FormKit type="select" validation="required" name="host" input-class="form-select py-[10px]" 
                             placeholder="Host" :options="users" />
                        </div>
                        <div class="mt-4">
                            <label
                                class="formkit-label mb-1 block text-sm font-medium text-gray-700 required">Title</label>
                            <FormKit type="text" validation="required|noLeadingSpace" name="Title" :validation-rules="{ noLeadingSpace }"
  :validation-messages="{ 
    required: 'Title is required.', 
    noLeadingSpace: 'Title cannot start with a space.' 
  }" placeholder="add title" />
                        </div>
                        <div class="col-sm-12 mt-3">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label class="formkit-label mb-1 block text-sm font-medium text-gray-700 required">
                                        Start Date </label>
                                    <FormKit type="datetime-local" validation="required" name="Start Time"
                                        :min="onsiteForm.minStartDate" v-model="onsiteForm.st" />
                                </div>
                                <div class="col-sm-6">
                                    <label
                                        class="formkit-label mb-1 block text-sm font-medium text-gray-700 required">End
                                        Date</label>
                                    <FormKit type="datetime-local" validation="required" name="End Time"
                                        v-model="onsiteForm.en"
                                     :min="onsiteForm.st ? new Date(new Date(onsiteForm.st).getTime() + (6 * 60 + 30) * 60 * 1000).toISOString().slice(0,16) : onsiteForm.minStartDate"
                                        placeholder="End Date" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-2">
                            <FormKit type="text" label="Location" name="location" placeholder="add location" />
                        </div>
                        <div class="mt-4">
                            <label class="formkit-label mb-1 block text-sm font-medium text-gray-700 required">Meeting
                                Agenda</label>
                            <FormKit type="textarea"  name="description"
  v-model="onsiteForm.description"
  validation="required|minChars:60"
  :validation-rules="{ minChars }"
  :validation-messages="{
    required: 'Description is required.',
    minChars: 'Description must be at least 60 characters.'
  }"
  validation-visibility="live"
                                placeholder="-----------" />
                                <small
  :class="(onsiteForm.description?.trim().length || 0) < 60 ? 'text-red-500' : 'text-green-600'"
>
  {{ (onsiteForm.description?.trim().length || 0) }}/60 characters
</small>
                                               </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary rounded-[12px] text-[18px] py-3 w-[100%]"
                                style="margin-top: 2rem;margin-bottom: 2rem;" type="submit">Submit</button>
                        </div>
                    </FormKit>
                </div>
            </div>
        </Sidebar>

        <Sidebar v-model:visible="onlineAppointmentSidebar" modal :header="false" position="right" :showCloseIcon="false"
            :style="{ 'width': '480px', 'overflow': 'hidden scroll' , 'paddingTop':'40px'}">
            <div class="card-header" style="padding: 15px 8px;">
                <div class="d-flex justify-content-between">
                    <div class="col-sm-11">
                        <h3 class="text-[24px]">Online Appointment</h3>
                    </div>
                    <div class="col-sm-6">
                        <BootstrapIcon name="x-lg" class="icon1" @click="this.onlineAppointmentSidebar = false" />
                    </div>
                </div>
            </div>
            <div class="card-body px-2">
                <div class="col-sm-12">
                    <FormKit type="form" @submit="addOnline">
                        <div class="mt-2">
                            <FormKit type="select" validation="required" name="client" label="Select Client"
                                v-model="client" :options="clients" :disabled="isSelectedClient" />
                        </div>
                        <div class="mt-4">
                            <label class="formkit-label mb-1 block text-sm font-medium required text-gray-700">Host Name</label>
                            <FormKit type="select" validation="required" name="host" placeholder="Host" :options="users" />
                        </div>
                        <div class="mt-4">
                            <label
                                class="formkit-label mb-1 block text-sm font-medium text-gray-700 required">Title</label>
                            <FormKit type="text" validation="required|noLeadingSpace" name="Title"  :validation-rules="{ noLeadingSpace }"
  :validation-messages="{ 
    required: 'Title is required.', 
    noLeadingSpace: 'Title cannot start with a space.' 
  }" placeholder="add title" />
                        </div>
                        <div class="col-sm-12 mt-4">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label
                                        class="formkit-label mb-1 block text-sm font-medium text-gray-700 required">Start
                                        Time</label>
                                    <FormKit type="datetime-local" validation="required" name="Start Time"
                                        v-model="onlineForm.st" :min="currentTime" />
                                </div>
                                <div class="col-sm-6">
                                    <label class="formkit-label mb-1 block text-sm font-medium text-gray-700 required">
                                        End Time </label>
                                    <FormKit type="datetime-local" validation="required" name="End Time"
                                        v-model="onlineForm.en"
                                        :min="onlineForm.st ? new Date(new Date(onlineForm.st).getTime() + (6 * 60 + 30) * 60 * 1000).toISOString().slice(0,16) : currentTime"
/>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="formkit-label mb-1 block text-sm font-medium text-gray-700 required"> Meeting
                                Agenda </label>
                            <FormKit type="textarea" placeholder="--------" validation="required|minChars:60" name="description"  v-model="onlineForm.description"
  :validation-rules="{ minChars }" :validation-messages="{
    required: 'Description is required.',
    min: 'Description must be at least 60 characters long.'
  }"  validation-visibility="live" />
                                <small
  :class="(onlineForm.description?.trim().length || 0) < 60 ? 'text-red-500' : 'text-green-600'"
>
  {{ (onlineForm.description?.trim().length || 0) }}/60 characters
</small>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary rounded-[12px] text-[18px] py-3 w-[100%]"
                                style="margin-top: 2rem;margin-bottom: 2rem;" type="submit">Submit</button>
                        </div>
                    </FormKit>
                </div>
            </div>
        </Sidebar>

        <Sidebar v-model:visible="updateAppointmentSidebar" modal :header="false" position="right" :showCloseIcon="false"
            :style="{ 'width': '480px', 'overflow': 'hidden scroll', 'paddingTop':'40px' }">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <div class="col-sm-11">
                        <h3 v-if="updateData.mode == 'online'">Online Appointment</h3>
                        <h3 v-else>Onsite Appointment</h3>
                    </div>
                    <div class="col-sm-6">
                        <BootstrapIcon name="x-lg" class="icon1" @click="this.updateAppointmentSidebar = false" />
                    </div>
                </div>
            </div>
            <div class="card-body px-2">
                <div v-if="updateData" class="col-sm-12">
                    <FormKit type="form" @submit="updateOnline">
                        <div class="mt-2">
                            <FormKit type="select" validation="required" name="host" label="Host Name"
                                placeholder="Host" :options="users"
                                :value="`${updateData.organizer.email}_${updateData.admin_id._id}`" />
                        </div>
                        <div class="mt-2">
                            <FormKit type="text" v-model="updateData.summary" validation="required" name="summary"
                                label="Title" />
                        </div>
                        <div class="col-sm-12 mt-2">
                            <div class="row">
                                <div class="col-sm-6">
                                    <FormKit type="datetime-local" validation="required" name="st"
                                        :min="new Date().toISOString().slice(0, 16)"
                                        v-model="(updateData.start.dateTime).split('.')[0]" label="Start Time" />
                                </div>
                                <div class="col-sm-6">
                                    <FormKit type="datetime-local" validation="required" name="en"
                                        :min="new Date().toISOString().slice(0, 16)"
                                        v-model="(updateData.end.dateTime).split('.')[0]" label="End Time" />
                                </div>
                            </div>
                        </div>
                        <div v-if="updateData.mode == 'offline'" class="mt-2">
                            <FormKit type="text" label="Location" validation="required" name="location"
                                v-model="updateData.location" />
                        </div>
                        <div class="mt-2">
                            <FormKit type="textarea" validation="required" name="description"
                                v-model="updateData.description" label="Meeting Agenda" />
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary m-4 w-75" type="submit">Submit</button>
                        </div>
                    </FormKit>
                </div>
            </div>
        </Sidebar>

    </template>
<script>
export default {
    props: {
        selectedClient: {},
        isSelectedClient: { type: Boolean }
    },
    data() {
        return {
            onsiteAppointmentSidebar: false,
            onlineAppointmentSidebar: false,
            updateAppointmentSidebar: false,
            client: this.selectedClient || null,
            users: [],
            onsiteForm: {
                st: '',   
                en: '',
                minStartDate: this.getISTTime(),
                description: ''
            },
            onlineForm: {
                st: '',
                en: ''
            },
            clients: [],
            updateData: null,
            admin: null,
             currentTime: this.getISTTime(),
        }
    },
    async setup() {
        const admin = (await useFetch('/api/users/admin')).data.value;
        return { admin };
    },watch:{
        onlineAppointmentSidebar(newValue) {
        if (newValue) {
            this.onlineForm.st = '';
            this.onlineForm.en ='';  
             this.onlineForm.description = '';
        }
    },
     onsiteAppointmentSidebar(newValue) {
        if (newValue) {
            this.onsiteForm.st = '';
            this.onsiteForm.en ='';  
            this.onsiteForm.description = '';
        }
    }
    },
    async mounted() {
    const currentTime = new Date().toISOString().slice(0, 16);
    this.onlineForm.st = currentTime;
        this.users = (await adminGet(`/all-employe`)).data.emp.map((i) => ({
            label: getSlicedContent(i.user_id.name, 30),
            value: `${i.user_id.email}_${i.user_id._id}`,
        }));
        this.clients = (await adminGet(`/all-clients`)).data.client.map((i) => ({
            label: getSlicedContent(i.name, 30),
            value: `${i.email}_${i._id}`,
        }))
        if (!this.client && this.clients.length) {
            this.client = this.clients[0].value
        }
    },
    methods: {
        noLeadingSpace(node) {
  const value = String(node.value || '');
  return value.length === 0 || value[0] !== ' ';
},
        minChars(node, min) {
      const len = String(node.value || '').trim().length
      return len >= Number(min)
    },
        async addOnsite(v) {
             // +6h 30m
             if (!v.description || v.description.trim().length < 60) {
        errorAlert('Description must be at least 60 characters.')
        return
      }
           

            v.st = this.onsiteForm.st;
            v.en = this.onsiteForm.en;
            v.organizer = { email: v.host.split("_")[0] }
            v.lead_id = v.client.split("_")[1]
            v.admin_id = v.host.split("_")[1]
            v.start = { dateTime: v.st }
            v.end = { dateTime: v.en }
            v.attendees = [{ email: v.client.split("_")[0] }, { email: v.host.split("_")[0] }]
            v.mode = 'offline'
            v.user_email = v.client.split("_")[0]
            v.accept_admin = true
            // adminGet('/admin-google-token').then(async (r) => {
            //     if (r.data.data) {
            this.addData(v)
            //     } else {
            //         if (await askConfirm('No Google Account Linked', 'Google Account', 'Link Now', 'Cancel')) {
            //             // const res = await axios.request({ method: 'get', url: `/api/google` });
            //             // if (res.data.status) {
            //                 await adminPost('/admin-google-signin', res.data.data)
            //                 this.addData(v)
            //             // } else {
            //             //     errorAlert(res.data.msg)
            //             // }
            //         }
            //     }
            // })
            this.onsiteAppointmentSidebar = false;
        },
      getISTTime() {
         const now = new Date();

        // Calculate IST (UTC +5:30)
        const ISTOffset = ""; // 5 hours 30 minutes in minutes
        const localOffset = now.getTimezoneOffset(); // Get local timezone offset
        const ISTTime = new Date(now.getTime() + (ISTOffset - localOffset) * 60000); // Adjust to IST

        // Return the IST time formatted as YYYY-MM-DDTHH:mm
        return ISTTime.toISOString().slice(0, 16);
    },
        async addOnline(v) {
            //         if (new Date(v.en) <= new Date(v.st)) {
            //   errorAlert("End date must be after Start date");
            //   return;
            // }
            if (new Date(this.onlineForm.st) < new Date()) {
        errorAlert("Start time cannot be in the past");
        return;
    }
            if (new Date(this.onlineForm.en) <= new Date(this.onlineForm.st)) {
                errorAlert("End date must be after Start date");
                return;
            }
            v.st = this.onlineForm.st;
            v.en = this.onlineForm.en;
            v.organizer = { email: v.host.split("_")[0] }
            v.lead_id = v.client.split("_")[1]
            v.admin_id = v.host.split("_")[1]
            v.start = { dateTime: v.st }
            v.end = { dateTime: v.en }
            v.attendees = [{ email: v.client.split("_")[0] }, { email: v.host.split("_")[0] }]
            v.mode = 'online'
            v.user_email = v.client.split("_")[0]
            v.accept_admin = true
            v.attendees.push({ email: this.admin.user.user.email })
            // adminGet('/admin-google-token').then(async (r) => {
            //     if (r.data.data) {
            this.addData(v)
            // } else {
            //     if (await askConfirm('No Google Account Linked', 'Google Account', 'Link Now', 'Cancel')) {
            //         const res = await axios.request({ method: 'get', url: `/api/google` });
            //         if (res.data.status) {
            //             await adminPost('/admin-google-token', res.data.data)
            //             this.addData(v)
            //         } else {
            //             errorAlert(res.data.msg)
            //         }
            //     }
            // }
            // })
            this.onlineAppointmentSidebar = false
        },
        async addData(v) {
            await adminPost(`/admin-appointment`, v).then((r) => {
                this.$emit("appointmentAdded");
            }).catch((e) => { })
        },
        async updateOnline(v) {
            if (new Date(v.en) <= new Date(v.st)) {
                errorAlert("End date must be after Start date");
                return;
            }
            v.organizer = { email: v.host.split("_")[0] }
            v.admin_id = v.host.split("_")[1]
            v.start = { dateTime: v.st }
            v.end = { dateTime: v.en }
            v.userRequest = false
            v.status = 'rescheduled'
            this.updateAppointmentSidebar = false
            await adminPut(`/admin-appointment/${this.updateData._id}`, v).then((r) => {
                this.$emit("appointmentAdded");
            }).catch((e) => { })
        },
        async update(i) {
            this.updateData = i
            this.updateAppointmentSidebar = true
        },
    }
}
</script>
<style scoped>
.formkit-select select {
  appearance: auto;        /* standard */
  -webkit-appearance: auto; /* Safari/Chrome */
  -moz-appearance: auto;   /* Firefox */
  background-image: none;  /* ensure browser arrow is used */
}
</style>