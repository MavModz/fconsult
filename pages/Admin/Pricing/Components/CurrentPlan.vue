<template>
    <div v-if="data" class="row row-cols-1 row-cols-md-3 mb-3 text-center p-4">


        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Listing</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">Listing</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>Total Listing : {{ data.listing_total }}</li>
                        <li>Available Listing : {{ data.listing_limit }}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy
                        More</button>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Events</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">Events</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>Total Events : {{ data.event_total }}</li>
                        <li>Available Events : {{ data.event_limit }}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy
                        More</button>
                </div>
            </div>
        </div>


        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">CRM</h4>
                </div>
                <div class="card-body" v-if="data.crm">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.crm.price }}</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>{{ data.fixed.crm.validity }} {{ data.fixed.crm.validity_type }}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy</button>
                </div>
                <div class="card-body" v-else">
                    <h1 class="card-title pricing-card-title">No Plan Found</h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy
                        Now</button>
                </div>
            </div>
        </div>



        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">App</h4>
                </div>
                <div class="card-body" v-if="data.app">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.crm.price }}</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>{{ data.fixed.crm.validity }} {{ data.fixed.crm.validity_type }}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy</button>
                </div>
                <div class="card-body" v-else">
                    <h1 class="card-title pricing-card-title">No Plan Found</h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy
                        Now</button>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Branch</h4>
                </div>
                <div class="card-body" v-if="data.branch">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.crm.price }}</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>{{ data.fixed.crm.validity }} {{ data.fixed.crm.validity_type }}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy</button>
                </div>
                <div class="card-body" v-else">
                    <h1 class="card-title pricing-card-title">No Plan Found</h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy
                        Now</button>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Second Company</h4>
                </div>
                <div class="card-body" v-if="data.secondary_company">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.crm.price }}</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>{{ data.fixed.crm.validity }} {{ data.fixed.crm.validity_type }}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy</button>
                </div>
                <div class="card-body" v-else">
                    <h1 class="card-title pricing-card-title">No Plan Found</h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="shiftTab">Buy
                        Now</button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null
        }
    },
    async mounted() {
        this.init()

    }, methods: {
        async init() {
            this.data = (await adminGet(`/admin-current-plan`)).data.data;
            

        },
        shiftTab() {
            this.$emit('planTab')
        }
    }
}
</script>