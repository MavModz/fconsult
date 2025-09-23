<template>
    <div class="card">

        <div class="col-xl-12">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <div class="col-sm-6">
                        <h3>Schedule</h3>
                    </div>
                    <div class="col-sm-6">
                        <h3>Available All Week
                            <InputSwitch v-model="week" @change="allWeek" />
                        </h3>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="mt-4">
                    <tr v-for="i in data">
                        <td>
                            <div class="day">{{ i.name }}</div>
                        </td>
                        <td>
                            <div class="status">
                                <InputSwitch v-model="i.status" /> Opened
                            </div>
                        </td>
                        <td>
                            <div v-if="i.status" class="starttime"><input type="time" v-model="i.from"></div>
                        </td>
                        <td>
                            <div v-if="i.status" class="to">To</div>
                        </td>
                        <td>
                            <div v-if="i.status" class="endtime"><input type="time" v-model="i.to"></div>
                        </td>
                    </tr>
                </table>
            </div>
            <center>
                <Button label="Save" class="btn btn-primary mb-4 mt-4" @click="saveappointment" />
            </center>
        </div>
    </div>

    <div class="card mt-4">

        <div class="col-xl-12">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <div class="col-sm-6">
                        <h3>Advance Settings</h3>
                    </div>
                </div>
            </div>
            <div class="card-body">

                <div class="col-sm-6 ms-4 mt-4 ">
                    <h3>Default Meeting Assign</h3>
                    <select class="mt-4 " v-model="defaultUser" @change="changeUser">
                        <option :value="i.value" v-for="i in users">{{ i.label }}</option>
                    </select>
                </div>

                <div class="col-sm-6 ms-4 mt-4 ">
                    <h3>Buffer Time</h3>
                    <select class="mt-4 " v-model="appointmentsfreq">
                        <option :value="i" v-for="i in [5, 10, 15, 20, 30, 35, 40, 45, 50, 55, 60]">{{ i }}</option>
                    </select>
                </div>

            </div>
            <center>
                <Button label="Save" class="btn btn-primary mb-4 mt-4" @click="saveappointmentFreq" />
            </center>
        </div>
    </div>
</template>




<script>
import axios from 'axios';
import { googleSdkLoaded } from "vue3-google-login"


definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});


export default {
    data() {
        return {
            defaultUser: null,
            google: false,
            googlebtn: false,
            loading: false,
            allAchievers: null,
            current_id: null,
            data: null,
            detailModal: false,
            totalListing: 0,
            appointmentsfreq: 0,
            week: false,
            users: [],
            w: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
        };
    },
    async mounted() {
        activateMenu('l2', 'All Appointments');
        this.init();
        this.users = (await adminGet(`/all-employe`)).data.emp.map((i) => ({
            label: i.user_id.name,
            value: `${i.user_id.email}_${i.user_id._id}`,
        }));
    },
    methods: {
        async changeUser() {
            if (await askConfirm('Do You Want to Change Default Appointment Assignee', 'Channge Assignee', 'Change', 'Cancel')) {
                await adminPut(`/admin-appointment-assign/${this.defaultUser}`)
                location.reload()
            }
        },
        allWeek() {
            if (this.week) {
                for (let i in this.w) {
                    this.data[this.w[i]].status = true
                }
            } else {
                for (let i in this.w) {
                    this.data[this.w[i]].status = false
                }
            }
        },

        async init() {
            await adminGet(`/company-settings`).then((r) => {
                this.defaultUser=r.data.data.appointmentsDefault
                this.data = (r.data.data.appointments)
                let flag = false
                for (let i in this.w) {
                    if (this.data[this.w[i]].status) { flag = true } else { flag = false }
                }
                this.week = flag
                this.appointmentsfreq = r.data.data.appointmentsfreq
            }).catch((e) => { console.error(e) })
            adminGet('/admin-google-token').then(async (r) => {
                if (r.data.data) {
                    this.google = true
                    this.googlebtn = true
                }
            }).catch((e) => { })

        },
        googleSignin() {
            googleSdkLoaded((google) => {
                google.accounts.oauth2.initCodeClient({
                    client_id: '1035753729216-m90u57e4p62iekvjg5b25mlknrnfttjj.apps.googleusercontent.com',
                    access_type: "offline",
                    scope: 'email profile openid https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/calendar',
                    callback: async (response) => {
                        if (response.code) {
                            try {
                                let d = await (await fetch(`/api/google?code=${response.code}`)).json();
                                await adminPost('/admin-google-token', d.tokens)
                            } catch (error) {
                                console.error("Error fetching Google token:", error);
                            }
                        }
                    }
                }).requestCode()
            })
            // userGet('/admin-google-token').then(async (r) => {
            //     if (await askConfirm('No Google Account Linked', 'Google Account', 'Link Now', 'Cancel')) {
            //         // const res = await axios.request({ method: 'get', url: `/api/google` });
            //         // if (res.data.status) {
            //         await adminPost('/admin-google-signin', this.data.tokens)
            //         location.reload()
            //         // this.addData(v)
            //         // } else {
            //         //     errorAlert(res.data.msg)
            //         // }
            //     }
            // })
        },
        async updateStatus(id, status) {
            await adminPut(`/admin-appointment/${id}/${status}`).then((r) => {
                successAlert("Appointment Updated!...")
                this.init()
            }).catch((e) => { })
        },
        async saveappointment() {
            await adminPut(`/setting-update`, { appointments: this.data }).then((r) => {
                successAlert("Appointment Updated!...")
                this.init()
            }).catch((e) => { })
        },
        async saveappointmentFreq() {
            await adminPut(`/setting-update`, { appointmentsfreq: this.appointmentsfreq }).then((r) => {
                successAlert("Appointment Updated!...")
                this.init()
            }).catch((e) => { })
        }
    }
}
</script>

<style scoped>
@import url('./style.css');
</style>