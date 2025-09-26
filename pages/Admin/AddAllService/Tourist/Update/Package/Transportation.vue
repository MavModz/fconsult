<template>
	<FormKit type="group" name="child1">
		<div class="pricing-transport-conta">
			<div class="pricing-transport-heading">
				<div class="pricing-transport-heading-car">
					<span><img src="/img/png/car.png" alt="" /></span>
					<span class="pricing-trans-detais">Transportation Details</span>

				</div>
				<div class="">
					<span @click="opensidebar" class="pricing-right-transport-new">
						+ Add Pricing
						<span class="inside-addpricing" v-if="alltempUser?.length > 0">{{ alltempUser.length }}</span>
					</span>

					<!-- <span class="">
						<FormKit name="price" v-model="x.transportation_field.price" type="text" />
					</span> -->
				</div>
			</div>

			<div>
				<div class="pricing-trans-cmpny-flx">
					<div class="mb-3 jobliscmp-dro">
						<label class="tourist-transport-lable">Transportation Type</label>
						<FormKit v-model="x.transportation_field.type" type="select"
							:options="['Road Transportation', 'Sea Transportation', 'Rail Transportation', 'Air Transportation', 'Multimodal Transportation']"
							id="updateevents-drpsemi" class="form-select" />
					</div>

					<div class="tourist-bsc-dic-wd">
						<label class="tourist-transport-lable">Transportation Company</label><br />
						<FormKit v-model="x.transportation_field.company" name="company" type="text"
							placeholder="Indigo" class="tourist-transport-inpt1st" />
					</div>

					<div class="mb-3 jobliscmp-dro">
						<label class="tourist-transport-lable">Transportation Class</label>
						<FormKit v-model="x.transportation_field.class" id="updateevents-drpsemi" name="class"
							class="form-select" type="select" :options="['Bus', 'Aeroplane']" />
					</div>
				</div>

				<div class="tourist-transport-2stbx">
					<div class="tourist-bsc-dic-wd2">
						<label class="tourist-transport-lable">Departure</label><br />
						<FormKit v-model="x.transportation_field.departure" type="datetime-local" name="departure"
							class="tourist-transport-inpt1st" />
					</div>
					<div class="tourist-bsc-dic-wd2">
						<span class="tourist-bsc-dic-checkbx">
							<label class="tourist-basc-lble">Layover / Stopage</label>
							<FormKit v-model="x.transportation_field.stopage" type="checkbox" name="stopage" />
						</span>
						<FormKit v-model="x.transportation_field.arrival" type="datetime-local" name="arrival"
							class="tourist-transport-inpt1st" />
					</div>
				</div>

				<div class="tourist-transport-2stbx">
					<div class="tourist-bsc-dic-wd2">
						Departure Location
						<FormKit v-model="x.transportation_field.departure_location" type="text"
							name="departure_location" placeholder="Lorem ipsum dolor sit amet consectetur. Urna."
							class="tourist-transport-inpt1st-depart" />
					</div>
					<div class="tourist-bsc-dic-wd2">
						<label class="tourist-transport-lable">Destination Location</label>
						<FormKit v-model="x.transportation_field.destination_location" type="text"
							name="destination_location" placeholder="Lorem ipsum dolor sit amet consectetur. Urna."
							class="tourist-transport-inpt1st-depart" />
					</div>
				</div>

				<div class="tourist-transport-despstbx">
					<label class="tourist-transport-lable">Description*</label><br />
					<FormKit v-model="x.transportation_field.description" type="textarea" name="description"
						class="tourist-transport-inpt1st" />
				</div>

				<div class="tourist-trans-delt-paddng">
					<div class="tourist-trans-delt-additm">
						<span>Add Tags</span>
						<Chips class="Transportation-addtags" v-model="x.transportation_field.tags" name="tags" />
					</div>
				</div>
			</div>
		</div>
	</FormKit>

	<Sidebar v-model:visible="visibleRight" header="" position="right">
		<div class="px-[2px] py-[40px] parent-sidebar-touristt">
			<div class="d-flex justify-between mb-[20px]">
				<span class="text-[#000] font-bold text-[20px]">Transportation Details</span>
				<span class="cursor-pointer" @click="closeSidebar"><i class="bi bi-x-lg"></i></span>
			</div>
			<FormKit type="form" @submit="submitForm">
				<div class="mb-[15px]">
					<label class="text-[#0f172a] text-[20px] font-medium py-[12px]">Add User Name</label>
					<FormKit type="text" validation="required" placeholder="-------" v-model="objUser.username"
						name="username" class="" />
				</div>
				<div class="mb-[25px]">
					<label class="text-[#0f172a] text-[20px] font-medium py-[12px]">Pricing</label>
					<FormKit type="text" validation="required" placeholder="" v-model="objUser.pricing" name="pricing"
						class="" />
				</div>
				<button type="submit" class="btnuser-pricing">Add</button>
			</FormKit>
			<div class="mt-[25px]" v-if="allUsers && allUsers.length > 0">
				<p style="border-bottom: 1px solid #e0e4ec; padding-bottom: 10px; margin-bottom: 12px;"
					class="text-[20px] font-bold">Users Pricing</p>
				<div class="max-overflow">
					<div class="d-flex justify-between pb-[10px]" v-for="i in allUsers" :key="index">
						<span class="text-[#000000] text-[18px] font-normal">{{ i.username?.slice(0, 20) }}</span>
						<span class="text-[#000000] text-[18px] font-bold">₹ {{ i.pricing }}</span>
					</div>
				</div>
			</div>

			<p @click="closefinal" class="btnuser-pricing-submit cursor-pointer">Submit</p>
		</div>
	</Sidebar>
</template>

<!-- <script >
defineProps<{
	x: any;
}>()
</script> -->
<script>
export default {
	props: {
		x: null
	},
	data() {
		return {
			objUser: {
				username: "",
				pricing: "",
			},
			allUsers: [],
			alltempUser: [],
			visibleRight: false,
		}
	},
	mounted() {
		if (this.x.transportation_field.price) {
			this.allUsers = [...this.x.transportation_field.price];
			this.alltempUser = [...this.x.transportation_field.price];
		}
	},
	methods: {
		submitForm(v) {
			this.allUsers.push(v)
		},
		closefinal() {
			this.alltempUser.push({ ...this.allUsers })
			this.x.transportation_field.price = [...this.alltempUser];
			this.visibleRight = false;
		},
		opensidebar() {
			this.visibleRight = true;
		},
		closeSidebar() {
			this.visibleRight = false;
		},

	}
}

</script>

<style scoped>
@import url('./style.css');

.btnuser-pricing {
	background-color: #ff5757;
	color: #fff;
	font-weight: 550;
	padding: 6px 15px;
	border-radius: 12px;
}

.btnuser-pricing-submit {
	position: absolute;
	left: 50%;
	bottom: 10px;
	transform: translate(-50%, -50%);
	background-color: #ff5757;
	color: #fff;
	font-weight: 550;
	padding: 8px 15px;
	border-radius: 12px;
	width: 87%;
	text-align: center;
}

.pricing-right-transport-new {
	background-color: #ffefef;
	border-radius: 10px;
	padding: 6px 12px;
	color: #ff5757;
	font-weight: 600;
}

.inside-addpricing {
	background-color: #ff5757;
	color: #fff;
	border-radius: 50%;
	padding: 1px 6px;
}

.max-overflow {
	max-height: 380px;
	overflow-y: scroll;
	scrollbar-width: none;
}

.tourist-trans-delt-additm .p-component .p-chips-multiple-container {
	column-gap: 15px !important;
}
</style>