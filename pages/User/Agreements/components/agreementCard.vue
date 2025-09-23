<template>
    <div class="document-card col-sm-3 m-0">
   
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div class="card-left-heading">
                <h5>{{ getSlicedContent(agreementName, 20) }}</h5>
                <p>{{ companyName }}</p>
            </div>
            <span class="light-red">{{ Date }}</span>
        </div>
        <div class="agreement-profile-container flex items-center gap-2 pt-3">
            <NuxtImg class="rounded-full"
                :src="companyLogo || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                width="24" height="24" />
            <p style="margin-bottom: 0 !important;">{{ requestedBy }}</p>
        </div>
        <div class="d-flex flex-wrap justify-content-between mt-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2"
                style="width: -webkit-fill-available">
                <div class="flex flex-wrap items-center gap-3">
                    <span :class="['status-wrapper', statusClass]">{{ statusText }}</span>
                    <span class="light-cool-grey">{{ getSlicedContent(serviceName, 4) }}</span>
                </div>
                <div class="d-flex justify-content-between gap-2">
                    <span class="btn-span cursor-pointer" @click="$router.push(`/user/agreements/${id}`)"><img
                            src="/img/svg/eye.svg" alt="" /></span>
                    <!-- <span class="btn-span cursor-pointer"><img src="/svg-new-img/material-symbols_download-rounded.svg" width="20" height="20" /></span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        agreementName: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        Date: {
            type: String,
            required: true,
        },
        requestedBy: {
            type: String,
            required: true,
        },
        serviceName: {
            type: String,
            required: true,
        },
        accepted: {
            type: Boolean,
            required: true,
        },
        agreementData: {
            type: Object,
            required: true,
        },
        companyLogo: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        statusClass() {
            // Return "accepted" or "waiting" class based on the "accepted" prop
            return this.accepted ? "accepted" : "waiting";
        },
        statusText() {
            // Return "Submitted" or "Waiting" text based on the "accepted" prop
            return this.accepted ? "Submitted" : "Waiting";
        },
    },
    methods: {
        triggerView() {
            this.$emit('viewAgreement', this.agreementData);
        }
    }
}
</script>

<style scoped>
@import url('../style.css');
</style>