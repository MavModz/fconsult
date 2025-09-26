<template>

	<div class="card">
		<DataTable :value="x" tableStyle="min-width: 50rem">
			<Column field="title" header="User"></Column>
			<Column header="Image">
				<template #body="slotProps">
					<img :src="slotProps.data.img" style="height: 50px;" />
				</template>
			</Column>
			<Column field="status" header="status"></Column>

			<Column header="Start">
				<template #body="slotProps">
					<span>{{ slotProps.data.start_time.split("T")[0] }}</span>
				</template>
			</Column>
			<Column header="End">
				<template #body="slotProps">
					<span>{{ slotProps.data.end_time.split("T")[0] }}</span>
				</template>
			</Column>
		</DataTable>
	</div>

</template>


<script>
export default {
	props: {
		add: {}
	},
	data() {
		return {
			x: []
		}
	},
	mounted() {
		for (const i in this.add) {
			if (this.add[i].add_dimension == 'small') {
				this.x.push(this.add[i])
			}
		}
	}
}
</script>

<style scoped>
@import url('../style.css');;
</style>
