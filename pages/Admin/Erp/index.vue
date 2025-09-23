<template>

    <!-- {{ data }} -->
    <Dialog v-model:visible="congModal" modal header="" :style="{ 'min-width': '600px' }">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <img src="/public/img/png/congratulations.png" alt="" class="m-4 ps-1" style="height: 100px;">
                        <div>
                            <h3 class="mt-2">Congratulations {{ this.me.user.user.name }}</h3>
                            <small>
                                You've unlocked exclusive access to the ERP System for {{ getDaysLeft(this.me.user.plan.crm_trialTill) }} Days . Explore
                                powerful
                                features,
                                streamline tasks, and elevate your workflow today.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div >
                        <!-- <Button label="Go Back To Dashboard" class="dash ms-4"
                            @click="$router.push('/admin/dashboard')" /> -->
                        <Button label="Start Exploring Now" class="explore w-full"
                            @click="$router.push('/admin/dashboard')" />
                    </div>
                </div>
            </div>
        </div>
    </Dialog>

    <Dialog v-model:visible="reqModal" modal header="" :style="{ 'min-width': '600px' }">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <img src="/public/img/png/time.png" alt="" class="m-4 ps-1" style="height: 100px;">
                        <div>
                            <h3 class="mt-2">Request Received!</h3>
                            <small>
                                Please wait while our Find and Consult Team reviews and approves your ERP access
                                request.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center">
                        <Button label="Close" class="dash ms-4" @click="reqModal = false" />
                    </div>
                </div>
            </div>
        </div>
    </Dialog>



    <div class="col-xl-11 m-auto px-4 mb-3 topheader">
        <div class="d-flex justify-content-between">
            <h1 class="title">ERP Manager</h1>
            <div class="d-flex">
                <Button v-if="!me.user.plan.crm_trial && isDateExpired(this.me.user.plan.crm_trialTill)"
                    label="Get Free Trial" class="trialbtn" @click="startTrial" :loading="loading.tr" />
                <Button v-else-if="isDateExpired(this.me.user.plan.crm_trialTill) && !data?.crm_request"
                    label="Request Another Free Trial" class="trialbtn" @click="requestAnother" :loading="loading.rq" />
                <Button label="Buy Now" class="buybtn ms-4" @click="redirectPath"  />
            </div>
        </div>
    </div>

    <div class="col-xl-11 m-auto px-4 mb-3 warningheader" v-if="!isDateExpired(this.me.user.plan.crm_trialTill)">
        <div class="d-flex justify-content-between">
            <span style="padding-top: 6px;"><b class="tbold">Your ERP trial has {{
                getDaysLeft(this.me.user.plan.crm_trialTill) }} days left.</b> Don’t miss
                out—renew
                now to keep enjoying all features uninterrupted!</span>
            <div class="d-flex conf" v-if="me.user.plan.crm_request">
                <BootstrapIcon name="arrow-clockwise" class="mx-3" />
                Waiting For Confirmation
            </div>
        </div>
    </div>
    <div class="col-xl-11 m-auto px-4 mb-3 warningheader" v-if=" this.me.user.plan.crm_trialTill != null && isDateExpired(this.me.user.plan.crm_trialTill)">
        <div class="d-flex justify-content-between">
            <span style="padding-top: 6px;" v-if="!data?.crm_request"><b class="tbold">Your ERP trial has Expired.</b> Don’t miss out—renew now to
                keep enjoying all features uninterrupted!</span>
            <span style="padding-top: 6px;" v-else><b class="tbold">Your request has been submitted successfully and is
                    currently under review by the Find & Consult (F&C) Team. Please wait patiently.</b></span>
            <div class="d-flex conf" v-if="data?.crm_request">
                <BootstrapIcon name="arrow-clockwise" class="mx-3" />
                Waiting For Confirmation
            </div>
        </div>
    </div>

    <div class="col-xl-11 m-auto mt-4">

        <div class="row">
            <div class="col-xl-4">
                <video controls class="vidheader" poster="https://objectstore.e2enetworks.net/findandconsult/superadmin/F" controlslist="nodownload">
                    <source
                        src="https://firebasestorage.googleapis.com/v0/b/find-and-consult-8a01c.appspot.com/o/apersonal%2Ferp.mp4?alt=media&token=de647ac7-e30f-4374-85bd-ae11fbd47bee"
                        type="video/mp4">
                    Your browser does not support the video tag.
                </video>

            </div>
            <div class="col-xl-8">

                <span class="feature">Features</span>

                <p class="textcontent mt-3">
                    Find and Consult CRM is designed to simplify the operations of immigration companies by automating
                    key tasks, streamlining client management, and integrating with multiple platforms. It helps
                    businesses manage the entire client journey, from service recommendations to invoicing, all in one
                    place. With automated follow-ups and reminders, your team can ensure no step in the immigration
                    process is missed.
                </p>

                <p class="feature2 mt-4">Key Features of Find and Consult CRM:</p>

                <div class="my-3">
                    <p class="ftitle">Comprehensive Client and Case Management:</p>
                    <p class="fcontent mt-1">
                        Efficiently manage client details and track immigration cases from start to finish.
                    </p>
                </div>

                <div class="my-3">
                    <p class="ftitle">Automated Service Recommendations and Appointment Scheduling: </p>
                    <p class="fcontent mt-1">
                        Recommend tailored services and easily book appointments with automated synchronization across
                        platforms.
                    </p>
                </div>

                <div>
                    <p class="ftitle">Instant Invoicing and Automated Follow-ups:</p>
                    <p class="fcontent mt-1">
                        Generate invoices automatically and set reminders for timely follow-ups, keeping your
                        workflow efficient.
                    </p>
                </div>


            </div>
        </div>

    </div>

    <!-- <button class="btn btn-success" @click="adminRegenerateToken()">UpdateToken</button> -->

</template>

<script>
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})

export default {
    data() {
        return {
            data: null,
            loading: { tr: false, rq: false },
            listing: {
                modal: false,
                qty: 0
            },
            congModal: false,
            days: 0,
            name: null,
            reqModal: false
        }
    },
    async mounted() {
        activateMenu('mgt', null);
        await this.init();

        const hasSeenModal = sessionStorage.getItem("hasSeenCongModal");

        if (!this.isDateExpired(this.me.user.plan.crm_trialTill) && !hasSeenModal) {
            this.congModal = true;
            sessionStorage.setItem("hasSeenCongModal", "true");
        }
    },
    async setup() {
        const me = (await useFetch('/api/users/admin')).data.value;
        return { me }
    },
    methods: {
        async startTrial() {
            this.loading.tr = true;
            await adminGet("/activate-trial").then(async (r) => {
                if (r.status) {
                    this.days = r.data.days;
                    this.name = r.data.name;
                    await adminRegenerateToken();
                    location.reload();
                }
            }).catch((e) => { });
            this.loading.tr = false;
        },
        async init() {
            this.data = (await adminGet(`/my-plan`)).data.data;
        },
        async requestAnother() {
            this.loading.rq = true;
            await adminGet("/request-trial").then(async (r) => {
                this.reqModal = true
                this.init()
            }).catch((e) => { });
            this.loading.rq = false;
        },
        isDateExpired(end) {
            const now = new Date();
            const endTime = new Date(end);
            return now >= endTime;
        },
        isLessThanOrEqualTo3Days(end) {
            const now = new Date();
            const endTime = new Date(end);
            const diffInMs = endTime - now;
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            return diffInDays <= 3;
        },
        getDaysLeft(end) {
            const now = new Date();
            const endTime = new Date(end);
            const diffInMs = endTime - now;
            const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
            return diffInDays;
        },
        redirectPath() {
                this.$router.push('/admin/exploreplan')
        },
    }
}
</script>

<style scoped>
@import url('./style.css');
</style>