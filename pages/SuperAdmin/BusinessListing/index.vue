<template>
    <div class="mb-[10px] ">
        <button class="cursor-pointer bg-[#ff5757] text-white p-2 " @click="$router.push('/superadmin/addBusiness')">Add
            Business Listing</button>
    </div>
    <div class="card">
        <DataTable :value="companies" tableStyle="min-width: 50rem">

            <Column field="company_name" header="Name"></Column>

            <Column header="Image">
                <template #body="slotProps">
                    <img :src="slotProps.data.symbol" style="height: 50px;" class="rounded-circle" />
                </template>
            </Column>

            <Column field="company_email" header="email"></Column>
            <Column field="phone" header="phone"></Column>


            <Column header="Action">

                <template #body="slotProps">
                    <BootstrapIcon class="icon2" name="eye" size="2rem" @click="del(slotProps.data._id)" />
                </template>
            </Column>

            <Column header="Link">

                <template #body="slotProps">
                    <BootstrapIcon class="icon2" name="copy" size="2rem" @click="copyToClipboard(slotProps.data)" />
                </template>
            </Column>
            <Column header="Edit">
                <template #body="slotProps">
                    <BootstrapIcon class="icon2" name="pencil-square" size="2rem"
                    @click="$router.push({ path: '/superadmin/addBusiness', query: { company_id: slotProps.data._id } })" 
                      />
                </template>
            </Column>
            <Column header="Gallery">
                <template #body="slotProps">
                    <BootstrapIcon class="icon2" name="image" size="2rem"
                    @click="$router.push({ path: '/superadmin/companyGallery/Image', query: { company_id: slotProps.data._id } })" 
                      />
                </template>
            </Column>

        </DataTable>
    </div>

</template>

<script>
definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] })
export default {
    data() {
        return {
            companies: null
        }
    },
    mounted() {
        activateMenu('listing', "Business Listing");
        this.init()
    },
    methods: {
        async init() {
            this.companies = (await superadminGet(`/superadmin-business-listing-all-company`)).data.data
        },

        async del(v) {
            this.$router.push(`/superadmin/company/detail/${v}`)
        },
        copyToClipboard(i) {
            const queryParams = new URLSearchParams({
                claimnow: 'yes' // Adding query parameter
            }).toString();

            const url = `${i?.state.replaceAll(' ', '-')}/immigration-company/${i.company_name?.replaceAll(' ', '-')}/${i?.landmark?.replaceAll(' ', '-')}/f&c-${i?._id}/about-us?${queryParams}`;

            navigator.clipboard.writeText(window.location.origin + '/' + url)
                .then(() => {
                    successAlert('Link copied to clipboard!');
                })
                .catch(err => {
                    console.error('Error copying to clipboard: ', err);
                });
        }

    }
}
</script>
<style scopped>

</style>