<template>
	<div class="pricing-transport-conta">
		<div class="pricing-transport-heading">
			<div class="pricing-transport-heading-car">
				<span><img src="/img/png/cust.png" alt="" /></span>
				<span class="pricing-trans-detais">Custom Tab</span>
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

			<div class="tourist-transport-2stbx">
				<div class="tourist-bsc-dic-wd2-custom">
					<label class="tourist-transport-lable">Tab Title</label>
					<span class="tourist-transp-spnnd-custom">
						<FormKit v-model="x.custom_field.title" type="text" placeholder="-----"
							class="tourist-transport-inpt1st-depart" />
					</span>
				</div>
				<div class="tourist-bsc-dic-wd2-image-cus">
					<label class="tourist-transport-lable">Image</label>
					<span class="tourist-transp-spnnd-custom">
						<FormKit v-model="x.custom_field.image" type="text" placeholder="--------"
							class="tourist-transport-inpt1st-depart" />
						<!-- <i id="tourist-transp-upld" class="bi bi-upload"></i> -->
					</span>
				</div>
			</div>

			<div class="tourist-transport-despstbx">
				<label class="tourist-transport-lable">Description*</label><br />
				<FormKit v-model="x.custom_field.description" type="textarea" class="tourist-transport-inpt1st" />
			</div>

			<div class="tourist-trans-delt-paddng">
				<div class="tourist-trans-delt-flx">
					<i id="tourist-transp-loction" class="bi bi-trash3"></i>
					<span class="tourist-transport0delete">Delete</span>
				</div>
			</div>
		</div>

	</div>

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
						<span class="text-[#000000] text-[18px] font-normal">{{ i.username?.slice(0,20) }}</span>
						<span class="text-[#000000] text-[18px] font-bold">₹ {{ i.pricing }}</span>
					</div>
				</div>
			</div>

			<p @click="closefinal" class="btnuser-pricing-submit cursor-pointer">Submit</p>
		</div>
	</Sidebar>
</template>

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
	mounted(){
if (this.x.custom_field.price) {
      this.allUsers = [...this.x.custom_field.price];
      this.alltempUser = [...this.x.custom_field.price];
    }
	},
	methods: {
		submitForm(v) {
			this.allUsers.push(v)
		},
		closefinal() {
			this.alltempUser.push({...this.allUsers})
			this.x.custom_field.price= [...this.alltempUser];
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