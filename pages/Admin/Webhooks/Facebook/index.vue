<template>


    <div>
        <button class="btn btn-primary" @click="launchFBE">Sign in With Facebook</button>
    </div>


    <Dialog v-model:visible="AccountModal" modal header="Select Add Account" :style="{ width: '55vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="card">
            <DataTable :value="data.accounts" sortMode="multiple" tableStyle="min-width: 10rem">
                <Column field="name" header="Name" sortable style="width: 25%"></Column>
                <Column field="amount_spent" header="Amount Spent" sortable style="width: 25%"></Column>
                <Column field="balance" header="Baalance" sortable style="width: 25%"></Column>
                <Column field="account_id" header="Account Id" sortable style="width: 25%"></Column>
                <Column header="Action">
                    <template #body="{ data }">
                        <BootstrapIcon name="eye" class="icon2" size="16" @click="selectAddAccount(data.account_id)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </Dialog>


    <Dialog v-model:visible="CompaninModal" modal header="Select Add Account" :style="{ width: '55vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="card" v-if="campain">
            <DataTable :value="campain" sortMode="multiple" tableStyle="min-width: 10rem">
                <template #header>
                    <button class="btn btn-primary" @click="CompaninModal = false; AccountModal = true">Back</button>
                </template>
                <Column field="name" header="Name" sortable style="width: 25%"></Column>
                <Column field="budget_remaining" header="Amount Left" sortable style="width: 25%"></Column>
                <Column field="status" header="Status" sortable style="width: 25%"></Column>
                <Column field="leads.length" header="Leads" sortable style="width: 25%"></Column>
                <Column header="Action">
                    <template #body="{ data }">
                        <BootstrapIcon name="eye" class="icon2" size="16" @click="getLeads(data._id)" />
                    </template>
                </Column>
                <template #empty>
                    <center class="m-5 p-5">Nothing To Show Here</center>
                </template>
            </DataTable>
        </div>
    </Dialog>

    <Dialog v-model:visible="LeadModal" modal header="Import Lead" :style="{ width: '55vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <button class="btn btn-primary" @click="LeadModal = false; CompaninModal = true">Back</button>
        <button class="btn btn-danger" @click="importLeadsAll(lead._id)">Import All Leads</button>
        <div class="card" v-if="lead">
            <table class="table">
                <thead>
                    <tr>
                        <th>Import</th>
                        <th scope="col" v-for="(i, index) in lead.leads[0].field_data">{{ i.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(l, index) in lead.leads">
                        <td>
                            <BootstrapIcon name="floppy-fill" v-tooltip="'Save Lead'" class="icon2" size="16"
                                @click="importLeads(lead._id, index)" />
                        </td>
                        <td v-for="i in l.field_data">
                            <div>
                                {{ i.values[0] }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Dialog>

</template>


<script setup>
import { onMounted, ref } from 'vue'
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});

const appid = ref('1485989862168061')
const data = ref(null);
let campain = ref(null);
const lead = ref(null);
const res = ref(null);
let AccountModal = ref(false)
let CompaninModal = ref(false)
let LeadModal = ref(false)

onMounted(() => {
    // Load the JavaScript SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')

    window.fbAsyncInit = function () {
        // FB JavaScript SDK configuration and setup
        FB.init({
            appId: appid.value, // FB App ID
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true, // parse social plugins on this page
            version: 'v20.0' // uses graph api version v20.0
        })
    }
})

async function fetchlead(t) {
    await adminPost(`/fb-fetch-leads`, { token: t })
    data.value = (await adminGet(`/addaccounts`)).data.data;
    AccountModal.value = true
    // location.reload()
}

async function selectAddAccount(i) {
    AccountModal.value = false
    campain.value = (await adminGet(`/compaigns/${i}`)).data.data;
    CompaninModal.value = true
}

async function getLeads(i) {
    CompaninModal.value = false
    lead.value = (await adminGet(`/compaigns-leads/${i}`)).data.data;
    LeadModal.value = true
}

async function importLeads(i, n) {
    await adminGet(`/add-lead-facebook/${i}/${n}`)
    successAlert("Lead Added Successfully")
}

async function importLeadsAll(i) {
    await adminGet(`/add-lead-facebook/${i}`)
    successAlert("All Lead Imported Successfully")
    LeadModal.value = false
    CompaninModal.value = true
}

function launchFBE() {
    FB.login(function (response) {
        if (response.authResponse) {
            res.value = response.authResponse
            fetchlead(res.value.accessToken)

        } else {
        }
    }, {
        scope: 'catalog_management,ads_management'
    })
}
</script>

<script>


export default {
    data() {
        return {
            data: null,
        };
    },

    async mounted() {
        activateSubmenu('l4', 'Facebook');
    },
    methods: {

    },
};
</script>

<style scoped>
@import url('./style.css');
</style>