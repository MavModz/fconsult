<template>

	<DataTable :value="blog" tableStyle="min-width: 50rem">
		<Column field="title" header="title"></Column>
		<Column header="Image">
			<template #body="slotProps">
				<img :src="slotProps.data.cover_image" class="rounded-[12px] w-[100px] h-[90px] object-cover" />
			</template>
		</Column>
		<Column field="su.status" header="Status"></Column>
		<Column header="Action">
			<template #body="slotProps">
				<BootstrapIcon v-if="slotProps.data.su.status!='approved'" name="check-circle" class="icon2" v-tooltip.top="'Approve Request'"
				@click="this.id = slotProps.data; approve()" />
				<BootstrapIcon v-if="slotProps.data.su.status!='rejected'" name="x" class="icon2" v-tooltip.top="'Reject Request'"
				@click="this.id = slotProps.data; reject()" />
				<BootstrapIcon v-if="slotProps.data.su.status!='pending'" name="exclamation-circle" class="icon2" v-tooltip.top="'Mark Pending'"
				@click="this.id = slotProps.data; pending()" />
				<BootstrapIcon v-if="slotProps.data.su.status!='new'" name="plus" class="icon2" v-tooltip.top="'Mark New'"
				@click="this.id = slotProps.data; neww()" />
			</template>
		</Column>
	</DataTable>

</template>


<script>

export default {
	data() {
		return {
			blog: null,
			id: null,
		};
	},
	async mounted() {
		await this.init()
	},
	methods: {
		async init() {
			this.blog = (await superadminPost(`/superadmin-all-blog`, { filter: {'su.status':'rejected'} })).data.data;
		},
		async approve() {
			await superadminPut(`/superadmin-update-blog/${this.id._id}`,
				{su: { is_publish: true, is_applied: true, status: 'approved', comment: 'congrulations your request has been approved' }})
				successAlert("Request Approved")
			location.reload()
		},
		async reject() { 
			await superadminPut(`/superadmin-update-blog/${this.id._id}`,
				{su: { is_publish: false, is_applied: true, status: 'rejected', comment: 'your request has been rejected' }})
				successAlert("Request Rejected")
			location.reload()
		},
		async pending() { 
			await superadminPut(`/superadmin-update-blog/${this.id._id}`,
				{su: { is_publish: false, is_applied: true, status: 'pending', comment: 'Working On Your Request' }})
				successAlert("Request Marked Pending")
			location.reload()
		},
		async neww() { 
			await superadminPut(`/superadmin-update-blog/${this.id._id}`,
				{su: { is_publish: false, is_applied: true, status: 'new', comment: 'Request Received' }})
				successAlert("Request Marked New")
			location.reload()
		},
		
	}
}
</script>

<style scoped>
@import url("style.css");
</style>