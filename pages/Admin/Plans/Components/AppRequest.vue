<template>

	<div class="card">
		<DataTable :value="app" tableStyle="min-width: 50rem">

			<Column field="app_name" header="App Name"></Column>
			<Column header="App Logo">
				<template #body="slotProps">
					<img :src="slotProps.data.logo" style="height: 50px;" />
				</template>
			</Column>
			<Column field="status" header="status"></Column>

		</DataTable>
	</div>

</template>

<script>
export default {
	props: {
		app: {}
	},
	data() {
		return {
		}
	},
	async mounted() {
	},

}
</script>

<style scoped>
@import url("../style.css");
</style>