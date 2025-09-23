<template>

	<div class="card">
		<DataTable :value="listing" tableStyle="min-width: 50rem">

			<Column field="title" header="Title"></Column>
			<Column field="description" header="Description"></Column>
			<Column field="listing_name.title" header="Listing"></Column>

			<Column header="Start">
				<template #body="slotProps">
					<span>{{ slotProps.data.starttime.split("T")[0] }}</span>
				</template>
			</Column>
			<Column header="End">
				<template #body="slotProps">
					<span>{{ slotProps.data.endtime.split("T")[0] }}</span>
				</template>
			</Column>

		</DataTable>
	</div>

</template>

<script>
export default {
	props: {
		listing: {}
	},
	data() {
		return {
		}
	},
	async mounted() {
		
	},
	methods: {

	}
}
</script>

<style scoped>
@import url("../style.css");
</style>