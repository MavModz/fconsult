<template>

    <section class="my-xl-7 py-5">
        <div class="container pb-lg-5">
            <div  v-if="data" v-for="i in data" class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12 order-lg-2 order-1">
                    <div class="position-relative rellax mb-7 mb-lg-0 text-center" data-rellax-percentage="1"
                        data-rellax-speed="0.8" data-disable-parallax-down="md">
                        <div class="col">
                            <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">{{ i.name }}</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">₹ {{ i.final_price }}</h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>10 users included</li>
                                        <li>2 GB of storage</li>
                                        <li>Email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 offset-lg-1 col-md-6 col-12 order-lg-2">
                    <div class="mt-md-5">
                        <div class="mb-5">
                            <h2 class="mb-3">{{ i.type }}</h2>
                        </div>
                        <ul class="list-unstyled mb-5">
                            <li class="mb-2 d-flex" v-for="j in i.features">{{ j.title }} <span v-if="j.featured">✅</span> <span v-else>❌</span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </section>

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
            this.data = (await adminGet(`/admin-special-plan`)).data.data;

        },
    }
}
</script>