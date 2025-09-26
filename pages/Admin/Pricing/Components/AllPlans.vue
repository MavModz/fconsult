<template>
    <div v-if="data" class="row row-cols-1 row-cols-md-3 mb-3 text-center p-4">


        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Listing</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.listing.price }}<small
                            class="text-body-secondary fw-light">/Listing</small>
                    </h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary"
                        @click="listing.modal = true">Buy</button>
                </div>
            </div>
        </div>



        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">CRM</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.crm.price }}</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>{{ data.fixed.crm.validity }} {{ data.fixed.crm.validity_type }}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Buy</button>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Events</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.events.price }}<small
                            class="text-body-secondary fw-light">/Event</small>
                    </h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Buy</button>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">App</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.app.price }}</h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Buy</button>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Second Company</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.secondary_company.price }}</h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Buy</button>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Branch</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">₹ {{ data.fixed.branch.price }}</h1>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Buy</button>
                </div>
            </div>
        </div>


        <Dialog v-model:visible="listing.modal" modal header="Company Overview" :style="{'min-width': '350px'}"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <center>
                <div>
                    <span class="minus" @click="listing.qty>1?listing.qty--:listing.qty=1">-</span>
                    <span class="num">{{listing.qty}}</span>
                    <span class="plus" @click="listing.qty>0?listing.qty++:listing.qty=1">+</span>
                </div>
            </center>
        </Dialog>


    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            listing: {
                modal: false,
                qty:0
            }
        }
    },
    async mounted() {
        this.init()

    }, methods: {
        async init() {
            this.data = (await adminGet(`/admin-fix-plan`)).data.data;
        },
    }
}
</script>

<style scoped>
.minus, .plus {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: #EA6A9E;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    font-size: 30px;
}
.num {
    padding: 0 10px;
}
</style>