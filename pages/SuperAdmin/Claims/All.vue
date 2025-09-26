<template>

	<DataTable :value="claims" tableStyle="min-width: 50rem">

		<Column field="email" header="company"></Column>
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

</template>


<script>

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
	data() {
		return {
			claims: null,
			id: null,
		};
	},
	async mounted() {
		await this.init()
	},
	methods: {
		async init() {
			this.claims = (await superadminGet(`/superadmin-all-claim`)).data.data;
		},

		
		
	}
}
</script>

<style scoped>
@import url("style.css");
</style>