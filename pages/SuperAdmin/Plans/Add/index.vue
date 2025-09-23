<template>
    <div class="card p-4">

        <FormKit type="form" @submit="add">

            <FormKit type="text" validation="required" v-model="d.name" label="Plan Name" />
            <FormKit type="text" validation="required" v-model="d.type" label="Plan Type" />

            <fieldset class="mt-2" v-if="d.features.length > 0">
                <legend>Features</legend>

                <div v-for="(i, index) in d.features" class="ms-2 row">
                    <div class="col-sm-3">
                        <FormKit type="text" validation="required" v-model="i.title"
                            :placeholder="`Feature ${index + 1}`" />
                    </div>
                    <div class="col-sm-3">
                        Featured :
                        <InputSwitch v-model="i.featured" />
                    </div>
                </div>
            </fieldset>



            <center>
                <button class="btn btn-success mt-2" type="button" @click="addFeature">Add Feature</button>
            </center>


            <fieldset class="mt-2">
                <legend>CRM
                    <InputSwitch v-model="s.cr" />
                </legend>
                <div v-if="s.cr" class="ms-4">
                    <FormKit type="select" validation="required" label="Validity Type" v-model="d.crm.validity_type"
                        :options="['days', 'month', 'year']" />
                    <FormKit type="number" validation="required" label="Validity" v-model="d.crm.validity" />
                </div>
            </fieldset>

            <fieldset class="mt-2">
                <legend>Listing
                    <InputSwitch v-model="s.l" />
                </legend>
                <div v-if="s.l" class="ms-4">
                    <FormKit type="number" validation="required" label="No Of Listing" v-model="d.listing.no" />
                </div>
            </fieldset>


            <fieldset class="mt-2">
                <legend>Secondary Company
                    <InputSwitch v-model="s.c" />
                </legend>
                <div v-if="s.c" class="ms-4">
                    <FormKit type="number" validation="required" label="No Of Secondary Companies"
                        v-model="d.secondary_company.no" />
                </div>
            </fieldset>


            <fieldset class="mt-2">
                <legend>Company Branches
                    <InputSwitch v-model="s.b" />
                </legend>
                <div v-if="s.b" class="ms-4">
                    <FormKit type="number" validation="required" label="No Of Company Branches" v-model="d.branch.no" />
                </div>
            </fieldset>


            <fieldset class="mt-2">
                <legend>App
                    <InputSwitch v-model="s.a" />
                </legend>
                <div v-if="s.a" class="ms-4">
                    <FormKit type="number" validation="required" label="No Of Company Apps" v-model="d.app.no" />
                </div>
            </fieldset>

            <fieldset class="mt-2">
                <legend>Events
                    <InputSwitch v-model="s.a" />
                </legend>
                <div v-if="s.a" class="ms-4">
                    <FormKit type="number" validation="required" label="No Of Company Events" v-model="d.events.no" />
                </div>
            </fieldset>

            <FormKit type="select" v-model="d.discount_type" :options="discount" validation="required"
                placeholder="Select Discount" />

            <fieldset class="mt-2" v-if="d.discount_type == 'percentage'">
                <legend>Discount Percentage</legend>
                <div class="ms-4">
                    <FormKit type="number" @keyup="calc" validation="required" label="Original Amount"
                        v-model="d.price" />
                    <FormKit type="number" @keyup="calc" validation="required" label="Discount Percentage"
                        v-model="d.discount_per" />
                    <FormKit type="number" validation="required" label="Total Amount" v-model="d.total_price" />
                </div>
            </fieldset>

            <fieldset class="mt-2" v-if="d.discount_type == 'fixed'">
                <legend>Fixed Discount</legend>
                <div class="ms-4">
                    <FormKit type="number" validation="required" label="Original Amount" v-model="d.original_price" />
                    <FormKit type="number" validation="required" label="Total Amount" v-model="d.discounted_price" />
                </div>
            </fieldset>

            <fieldset class="mt-2 mb-4" v-if="d.discount_type == 'no'">
                <legend>Total</legend>
                <div class="ms-4">
                    <FormKit type="number" validation="required" label="Total Amount" v-model="d.total_price" />
                </div>
            </fieldset>


            <FormKit type="select" v-model="d.tax_class" :options="taxs" validation="required"
                placeholder="Select Tax" />

            <FormKit @keyup=calcTax type="number" validation="required" v-model="d.tax_per" label="Tax Percentage" />

            <FormKit type="number" validation="required" v-model="d.final_price" label="Final Amount" />



            <center>
                <button type="submit" class="btn btn-success">Add Plan</button>
            </center>

        </FormKit>

    </div>
</template>

<script>
definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
    data() {
        return {
            checked: false,
            visibleLeft: true,
            width: null,
            d: {
                crm: {},
                listing: {},
                secondary_company: {},
                branch: {},
                app: {},
                events: {},
                features: [],
                price: 0,
                discount_per: 0,
                final_price: 0,

            },
            s: { cr: false, c: false, l: false, s: false, b: false, a: false, e: false, },
            discount: [
                { label: 'No Discount', value: 'no' },
                { label: 'Discount Percentage', value: 'percentage' },
                { label: 'Fixed Price', value: 'fixed' },
            ],
            taxs: [
                { label: 'IGST', value: 'IGST' },
                { label: 'CGST', value: 'CGST' },
                { label: 'SGST', value: 'SGST' },
            ]
        }
    },
    mounted() {
        activateMenu('plans', "Plans");
    },
    methods: {
        addFeature() {
            this.d.features.push({ title: null, featured: false })
        },
        async add() {
            
            await superadminPost(`/superadmin-special-plan`, this.d)
            this.$router.go(-1);
        },
        calc() {
            if (this.d.price > 0 && this.d.discount_per >= 0) {
                this.d.total_price = this.d.price - (this.d.price * this.d.discount_per / 100);
            } else {
                this.d.total_price = this.d.price;
            }
        },
        calcTax() {
            if (this.d.tax_per > 0 && this.d.total_price >= 0) {
                this.d.final_price = parseInt(this.d.total_price) + (this.d.total_price * this.d.tax_per / 100);
            } else {
                this.d.total_price = this.d.price;
            }
        }

    },

}
</script>

<style scoped>
@import url("style.css");
</style>