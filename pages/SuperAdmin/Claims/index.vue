<template>

	<DataTable :value="claims" tableStyle="min-width: 50rem">

		<Column field="user_id.name" header="name"></Column>


		<Column field="email" header="email"></Column>
		<Column field="number" header="phone"></Column>

		<Column header="view">
			<template #body="slotProps">
				<a :href="slotProps.data.document_url" target="_blank" rel="noopener noreferrer">
					<BootstrapIcon class="icon2" name="eye" size="2rem" />
				</a>
			</template>
		</Column>
		<Column header="Action">
			<template #body="slotProps">
				<BootstrapIcon class="icon2" name="gear-wide-connected" size="2rem" @click="bind(slotProps.data._id)" />
			</template>
		</Column>
		<Column header="Reject">
			<template #body="slotProps">
				<BootstrapIcon class="icon2" name="gear-wide-connected" size="2rem" @click="reject(slotProps.data.company_id._id)" />
			</template>
		</Column>
		<Column header="Link">
			<template #body="slotProps">
				<BootstrapIcon class="icon2" name="copy" size="2rem" @click="copyToClipboard(slotProps.data)" />
			</template>
		</Column>





	</DataTable>

</template>


<script>

definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] })


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
		async bind(id) {
			try {
			
				if (await askConfirm('Do You Want to bind the company', 'Cancle', 'Confirm')) {
				
				
				const response = await superadminPut(`/superadmin-bind-company/${id}`)
				if (response.data.status) {
					successAlert("Company successfully bound to user")
				} else {
					errorAlert(response.data.msg || "Failed to bind company");
				}
			}
			} catch (error) {
				console.error("Error binding company:", error);
				errorAlert("Something went wrong. Please try again.");
			}
		},



		copyToClipboard(i) {
			const queryParams = new URLSearchParams({
				claimnow: 'yes' // Adding query parameter
			}).toString();
			const url = `${i?.company_id.state.replaceAll(' ', '-')}/immigration-company/${i.company_id.company_name?.replaceAll(' ', '-')}/${i?.company_id.landmark?.replaceAll(' ', '-')}/f&c-${i?.company_id._id}/about-us?${queryParams}`;

			navigator.clipboard.writeText(window.location.origin + '/' + url)
				.then(() => {
					successAlert('Link copied to clipboard!');
				})
				.catch(err => {
					console.error('Error copying to clipboard: ', err);
				});
		},


		async reject(id) {
			try {
			
				if (await askConfirm('Do You Want to reject the company', 'Cancle', 'Confirm')) {
				
				
				const response = await superadminPut(`/superadmin-reject-company/${id}`)
				if (response.data.status) {
					successAlert("Company rejected successfully")
				} else {
					errorAlert(response.data.msg || "Failed to rejected company");
				}
			}
			} catch (error) {
				console.error("Error binding company:", error);
				errorAlert("Something went wrong. Please try again.");
			}
		},



	}
}
</script>

<style scoped>
@import url("style.css");
</style>