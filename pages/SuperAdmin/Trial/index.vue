<template>
    <div class="col-xl-12">
        <div class="card p-4">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <Button label="Active Accounts" @click="init('active')"
                            :class="activeTab === 'active' ? 'activebtn' : 'expirebtn'" />
                        <Button label="Expired" class="ms-4" @click="init('expire')"
                            :class="activeTab === 'expire' ? 'activebtn' : 'expirebtn'" />
                    </div>
                    <Button label="Requesting" @click="init('requested')"
                        :class="activeTab === 'requested' ? 'activebtn' : 'requestbtn'" />
                </div>
            </div>
            <div class="card-body">
                <table style="width: 100%;">
                    <thead>
                        <tr>
                            <th>User</th>
                        <th>Company Name</th>
                        <th>Company Location</th>
                        <th>Requested Date</th>
                        <th>Valid Until</th>
                        <th>Process Type</th>
                        <th v-if="activeTab == 'expire'">Action</th>
                        <th v-if="activeTab == 'requested'">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in data">
                            <td>abc</td>
                            <td>{{ i.company_id.company_name }}</td>
                            <td>{{ i.company_id.state }}</td>
                            <td>{{ i.updatedAt?.split("T")[0] }}</td>
                            <td>{{ i.crm_trialTill?.split("T")[0] }}</td>
                            <td>{{ i.type }}</td>
                            <td v-if="activeTab == 'expire'">
                                <div class="d-flex">
                                    <Button label="Reminder" class="reminderbtn" @click="sendReminderEmail(i)" />
                                    <Button label="Extend Trial" class="extendbtn ms-2" @click="temp = i; approveModal = true" />
                                </div>
                            </td>
                            <td v-if="activeTab == 'requested'">
                                <div class="d-flex">
                                    <Button label="Approve Request" class="extendbtn ms-2"
                                        @click="temp = i; approveModal = true" />
                                    <BootstrapIcon name="x-circle" class="crossbtn" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="approveModal" modal header="Approve Request" :style="{ 'min-width': '600px' }">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <FormKit type="form" @submit="approveRequest">
                        <div class="mt-2">
                            <FormKit type="number" validation="required" name="duration" label="Set Access Duration" />
                        </div>
                        <div class="d-flex justify-content-center">
                            <Button class="btn btn-primary w-75 mt-4" type="submit" label="Submit" />
                        </div>
                    </FormKit>
                </div>
            </div>
        </div>
    </Dialog>

</template>

<script>
definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] })

export default {
    data() {
        return {
            data: null,
            activeTab: 'active',
            approveModal: false
        }
    },
    mounted() {
        activateMenu('trial', "ERP Trials");
        this.init('active')
    },
    methods: {
        async approveRequest(v) {
            await superadminPut(`/superadmin-admin-trial-plan-extend/${this.temp._id}/${v.duration}`).then(async (r) => {
                await useNuxtApp().$reloadAdmin(this.temp.company_id.admin_id);
                await this.init(this.activeTab)
                this.approveModal = false
            }).catch((e) => { });
        },
        async init(i) {
            this.activeTab = i
            await superadminGet(`/superadmin-admin-trial-plan-${i}`).then(async (r) => {
                this.data = r.data.data
            }).catch((e) => { });
        },
        async sendReminderEmail(i) {
            this.activeTab = i
            await superadminGet(`/superadmin-admin-trial-reminderemail/${i}`).then(async (r) => {
                this.data = r.data.data
            }).catch((e) => { });
        },

    }
}
</script>

<style scoped>
@import url("style.css");
</style>