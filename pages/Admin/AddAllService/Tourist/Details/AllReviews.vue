<template>

	<div class="card">
		<DataTable :value="reviews" tableStyle="min-width: 50rem">

			<Column field="user_id.name" header="User"></Column>
			<Column header="Image">
				<template #body="slotProps">
					<img :src="slotProps.data.user_id.profile_image" style="height: 50px;" class="rounded-circle" />
				</template>
			</Column>
			<Column field="review" header="Review"></Column>

			<Column header="Date">
				<template #body="slotProps">
					<span>{{slotProps.data.created_at.split("T")[0]}}</span>
				</template>
			</Column>

			<Column header="Rating">
				<template #body="slotProps">
					<Rating :modelValue="slotProps.data.rating" readonly :cancel="false" />
				</template>
			</Column>

		</DataTable>
	</div>

</template>

<script>
export default {
	data() {
		return {
			reviews: null
		}
	},
	async mounted() {
		this.reviews = (await adminGet(`/admin-listing-reviews/${this.$route.params.id}`)).data.data;
		
	},
	methods: {

	}
}
</script>

<style scoped>
@import url("style.css");
</style>