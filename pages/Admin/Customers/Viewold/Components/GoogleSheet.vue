<template>

	<!-- <button @click="sheetModal = true" class="your-events-btn">Sheet</button> -->


	<Dialog v-model:visible="sheetModal" modal header="Import Sheet From Google Sheet" :style="{ 'min-width': '75vw' }" :draggable="false">
		<FormKit type="form" @submit="findSheet">
			<div class="webhook">
				<p>
					Automate your Google Sheets with CRM integration
				</p>
			</div>
			<div class="warning">
				<p>
					<img src="/img/svg/alert.svg" alt="" />
					Allowed Column Names : Role , Email , Organisation , State , Full Name ,
					Country , City , Phone Number
				</p>
			</div>
			<div class="code">
				<FormKit validation="required" type="textarea" name="url" placeholder="google sheet url" />
			</div>
			<div class="modal-footer-section">
				<button @click="sheetModal = false" type="button" class="btn-btn-cancel">Go back</button>
				<Button type="submit" class="btn-btn-dle-appt" label="Submit" icon="pi pi-save" :loading="loading.a" />
			</div>
		</FormKit>
	</Dialog>

	<Dialog v-model:visible="leadModal" modal header="Preview Leads" :style="{ 'min-width': '75vw' }" :draggable="false">
		<DataTable :value="leadData" tableStyle="min-width: 50rem">
			<!-- Dynamically render columns based on the data keys -->
			<Column v-for="(value, key) in leadData[0]" :key="key" :field="key" :header="key"></Column>
		</DataTable>
		<div class="modal-footer-section">
			<button type="button" class="btn-btn-cancel">Cancel</button>
			<Button type="submit" @click="addLead" class="btn-btn-dle-appt" label="Add Lead" icon="pi pi-save"
				:loading="loading.b" />
		</div>
	</Dialog>
</template>

<script>
export default {
	data() {
		return {
			loading: { a: false, b: false },
			sheetModal: false,
			leadModal: false,
			leadData: null
		}
	},
	async setup() {
		const data = (await useFetch('/api/users/admin')).data.value;
		return { data }
	},
	mounted() {
    // Check if the query parameter 'openModal' is true
    const shouldOpenModal = this.$route.query.openModal === 'true';
    if (shouldOpenModal) {
      this.sheetModal = true;
    }
  },
	methods: {
		async findSheet(v) {
			this.loading.a = true
			await adminPost(`/read-google-sheet`, v).then(async (response) => {
				this.leadData = response.data.data
				this.sheetModal = false
				this.leadModal = true
			}).catch((e)=>{})
			this.loading.a = false
		},
		async addLead() {
			this.loading.b = true

			for (let i = 0; i < this.leadData.length; i++) {
				this.leadData[i].company_id = this.data.user.company_id
				this.leadData[i].status = 'Added'
				this.leadData[i].source = "Sheet"

				await adminPost(`/add-leads-google-spreadsheet`, this.leadData[i]).catch((e)=>{})
			}
			setTimeout(() => {
				this.leadModal = false
				// location.reload()
			}, 1000)
            this.$router.push({ path: '/admin/leads/view'});
		}
	}
}
</script>


<style scoped>
@import url('../style.css');
</style>
