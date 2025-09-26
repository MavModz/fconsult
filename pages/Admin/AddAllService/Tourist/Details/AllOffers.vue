<template>

	<button class="btn-btn-success-allofr" @click="addModal = true">Add New Offer</button>

	<div class="card">
		<DataTable :value="offers" tableStyle="min-width: 50rem">

			<Column field="offer_name" header="Name"></Column>
			<Column field="offer_description" header="Description"></Column>
			
			<Column header="Start">
				<template #body="slotProps">
					<span>{{ slotProps.data.start_Date.split("T")[0] }}</span>
				</template>
			</Column>
			
			<Column header="Start">
				<template #body="slotProps">
					<span>{{ slotProps.data.end_Date.split("T")[0] }}</span>
				</template>
			</Column>
			<Column field="status" header="Status"></Column>
			<Column field="comment" header="Comment"></Column>
			<Column header="Action">
				<template #body="slotProps">
					<BootstrapIcon name="trash" class="icon1" @click="deleteOff(slotProps.data._id)"/>
				</template>
			</Column>

		</DataTable>
	</div>

	<Dialog v-model:visible="addModal" modal header="Add Offer">
		<FormKit type="form" @submit="addOffer">
			<div class="upload-image-box">
				<FormKit style="margin-bottom: 15px;" validation="required" name="offer_name" type="text" label="Offer Name" placeholder="Tesla Awards" />
				<FormKit style="margin-bottom: 15px;" validation="required" name="offer_description" type="text" label="Offer Description" placeholder="Tesla Awards" />
				<FormKit style="margin-bottom: 15px;" validation="required" name="start_Date" type="date" label="Start Date" placeholder="Tesla Awards" />
				<FormKit style="margin-bottom: 10px;" validation="required" name="end_Date" type="date" label="End Date" placeholder="Tesla Awards" />
				<div class="button-container py-3">
					<button class="cropper-upload " type="submit" id="upload-btn">Submit</button>
				</div>
			</div>
		</FormKit>
	</Dialog>

</template>

<script>
export default {
	data() {
		return {
			offers: null,
			addModal: false,
		}
	},
	async mounted() {
		await this.init()
	},
	methods: {
		async init() {
			this.offers = (await adminGet(`/company-listing-offer/${this.$route.params.id}`)).data.data;
		},
		async addOffer(v) {
			this.addModal=false
			v.listing_id = this.$route.params.id
			v.service_name='Tourist Visa'
			await adminPost(`/company-add-offer`, v)
			this.init()
		},
		async deleteOff(i){
			await adminDelete(`/company-delete-offer/${i}`)
			this.init()
		}
	}
}
</script>

<style scoped>
@import url("style.css");
</style>