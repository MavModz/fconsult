<template>
	<div class="languages webhook-container">
		<div class="webhook facebook-meta">

			<div class="heading-container">
				<span id="webhook-heading">Facebook Meta Leads Integration </span>
			</div>
			<p>
				Upon signing into your Facebook account, seamlessly automate lead
				retrieval to your CRM. Experience the convenience of auto-fetching leads
				for efficient and organized customer relationship management.
			</p>

			<Panel v-if="facebookdata" toggleable :collapsed="true">
				<template #header>
					<div class="flex align-items-center gap-2">
						<Avatar :image="facebookdata.profile" size="large" shape="circle" />
						<span class="font-bold">Hii, {{ facebookdata.name }}</span>
					</div>
				</template>
				<template #footer>
					<div class="flex flex-wrap align-items-center justify-content-between gap-3">
						<div class="flex align-items-center gap-2">
							<!-- <Button icon="pi pi-user" rounded text label="Logout" @click="logoutFun()"></Button> -->
						</div>
						<span class="p-text-secondary">Last Update : {{ facebookdata.updatedAt.split("T")[0] }}</span>
					</div>
				</template>
				<template #icons>
					<button class="p-panel-header-icon p-link mr-2" @click="toggle">
						<span class="pi pi-cog"></span>
					</button>
					<Menu ref="menu" id="config_menu" :model="items" popup />
				</template>

				<DataTable v-if="currentTable == 'account'" :value="facebookdata.pages" sortMode="multiple"
					tableStyle="min-width: 10rem">
					<Column header="Avatar">
						<template #body="{ data }">
							<Avatar :image="data.picture_link" shape="circle" />
						</template>
					</Column>
					<Column field="name" header="Name" sortable style="width: 25%"></Column>
					<!-- <Column field="amount_spent" header="Amount Spent" sortable style="width: 25%"></Column> -->
					<Column field="category" header="Category" sortable style="width: 25%"></Column>
					<Column header="Action">
						<template #body="{ data, index }">
							<Button v-if="data.id" class="btn btn-primary" label="View" :loading="btnloading[index]"
								@click="getOwnedAddForms(index, data)" />
						</template>
					</Column>

				</DataTable>

				<Button v-if="currentTable == 'formpage'" label="back" class="btn btn-primary"
					@click="currentTable = 'account'" />

				<DataTable v-if="currentTable == 'formpage'" :value="allForms" sortMode="multiple"
					tableStyle="min-width: 10rem">
					<Column field="name" header="Name" sortable style="width: 25%"></Column>
					<Column field="status" header="status" sortable style="width: 10%"></Column>
					<Column field="leads_count" header="Total Leads" sortable style="width: 15%"></Column>
					<Column header="Import" style="width: 15%">
						<template #body="{ data }">
							<Button v-if="data.leads_count > 0" class="btn btn-primary" label="Import Lead"
								@click="$refs.stdImport.lead_id = data; $refs.stdImport.importModal = true" />
						</template>
					</Column>
					<Column v-if="showConnectColumn" header="Connect" style="width: 15%">
						<template #body="{ data }">
							<Button v-if="findFormSubscription(data.id)" class="btn btn-primary" label="Unsubscribe"
								@click="unsubscribeFromLeadgen(data)" />
							<!-- <Button v-else class="btn btn-primary" label="Auto Import"
								@click="subscribeToLeadgen(data)" /> -->
						</template>
					</Column>


					<Column header="Connect" style="width: 25%">
						<template #body="{ data }">
							<Button v-if="findFormSubscription(data.id)" class="btn btn-primary" label="Connected"
								:disabled="true" />
							<Button v-else="findFormSubscription(data.id)" class="btn btn-primary"
								label="Connect Campaign" @click="tempdata = data; importPipelineModal = true" />
						</template>
					</Column>


					<!-- <Column header="Action">
						<template #body="{ data }">
							<BootstrapIcon name="eye" class="icon2" size="16" @click="selectAddAccount(data.id)" />
						</template>
					</Column> -->
				</DataTable>
			</Panel>

			<button v-else-if="!loading.fb" class="divhover" @click="launchFBE">
				<img src="/img/svg/meta.svg" alt="" />
				<span v-if="user">Facebook</span>
				<span v-else>Login To Your Facebook Account </span>
			</button>
			<button v-else class="divhover" @click="launchFBE">
				<ProgressSpinner style="width: 40px; height: 40px" strokeWidth="8" fill="#007ef2"
					animationDuration=".5s" aria-label="Custom ProgressSpinner" />
				<span v-if="user">Processing Request, {{ user.name }}</span>
				<span v-else>Processing</span>
			</button>

		</div>
	</div>



	<Dialog v-model:visible="pipelineModal" modal header="Select Pipeline" :style="{ 'min-width': '75vw' }"
		:draggable="false">
		<FormKit v-if="current" type="form" @submit="submitForm" :value="current">
			<div class="input-field">
				<FormKit disabled label="Id" type="text" name="id" :value="current.ads?.data[0]?.id" />
				<FormKit disabled label="Status" type="text" name="status" :value="current.ads?.data[0]?.status" />
				<FormKit disabled label="Total Leads" type="text" name="total_leads"
					:value="current.ads?.data[0]?.leads?.data?.length" />
				<FormKit disabled label="Amount Spend" type="text" name="spend"
					:value="current.ads?.data[0]?.insights?.data[0]?.spend" />
				<FormKit label="Select Pipeline to Import" validation="required" type="select" name="pipeline"
					placeholder="Select Pipeline" :options="allPipeline" @change="setCampaign()"
					v-model="currentPipe" />
				<FormKit label="Select campaign to Import" validation="required" type="select" name="campaign"
					placeholder="Select campaign" :options="allCampaign" />
			</div>

			<div class="button-container py-3 justify-content-center">
				<center>
					<Button type="submit" :loading="loading.i" label="Import With Pipeline" icon="pi pi-save"
						class="cropper-upload" />
				</center>
			</div>
		</FormKit>
	</Dialog>

	<ImportLead ref="stdImport" :page_id="page_id" :access_token="page_access_token" />



	<Dialog v-model:visible="importPipelineModal" modal header="Import Lead" :style="{ 'min-width': '25vw' }"
		:draggable="false">
		<FormKit type="form" @submit="connectPipeline">
			<!-- <FormKit label="Select Pipeline to Import" validation="required" type="select" name="pipeline"
				placeholder="Select Pipeline" :options="allPipeline" @change="setCampaign()" v-model="currentPipe" /> -->
			<FormKit label="Select campaign to Import" validation="required" type="select" name="campaign"
				placeholder="Select campaign" :options="allCampaign" />
			<div class="button-container py-3 justify-content-center">
				<center>
					<Button type="submit" :loading="loading.p" label="Import" icon="pi pi-save"
						class="cropper-upload" />
				</center>
			</div>
		</FormKit>
	</Dialog>
</template>

<script>
import ImportLead from './ImportLead.vue'

definePageMeta({ layout: 'admin', middleware: ['admin'] });
import { reactive, nextTick } from 'vue';

export default {
	components: { ImportLead },
	data() {
		return {
			facebookdata: null,
			appid: '1566916050907333',
			currentTable: 'account',
			currentPageData: null,
			page_id: null,
			page_access_token: null,

			data: null,
			loading: reactive({ fb: false, i: false, p: false }),
			campain: null,
			lead: null,
			res: null,
			current: null,
			AccountModal: false,
			CompaninModal: false,
			pipelineModal: false,
			importModal: false,
			importPipelineModal: false,
			LeadModal: false,
			selectedPipeline: null,
			allPipelines: [],
			allPipeline: [],
			allCampaign: [],
			user: null,
			currentPipe: null,
			accounts: [],
			allForms: null,
			btnloading: new Array(100).fill(false),
			items: [
				{
					label: 'Refresh',
					icon: 'pi pi-refresh',
					command: () => {
						this.init()
					}

				},
			],
			currentPipe: null,
			allPipelines: [],
			allPipeline: [],
			allCampaign: [],
			tempdata: null,

		};
	},
	async created() {
		this.allPipelines = (await adminGet(`/pipelines`)).data.data
		this.allPipeline = this.allPipelines.map(i => ({
			label: i.pipeline_name,
			value: i._id,
		}));
	},
	computed: {
		showConnectColumn() {
			// Check if ANY item in allForms has subscription
			return this.allForms.some(form => this.findFormSubscription(form.id));
		}
	},
	async mounted() {
		activateSubmenu('l3', 'Meta Integation', true);
		await this.init();
		this.allPipelines = (await adminGet(`/pipelines`)).data.data
		this.allPipeline = this.allPipelines.map(i => ({
			label: i.pipeline_name,
			value: i._id,
		}));
		this.fetchCampaigns();
	},
	methods: {
		async connectPipeline(v) {
			this.loading.p = true
			await this.subscribeToLeadgen(this.tempdata, v.campaign)
			this.loading.p = false
			this.importPipelineModal = false
		},
		setCampaign() {
			for (let i = 0; i < this.allPipelines.length; i++) {
				if (this.allPipelines[i]._id == this.currentPipe) {
					this.allCampaign = this.allPipelines[i].campaigns.map(i => ({
						label: i.name,
						value: i._id,
					}));
				}
			}
		},
		findFormSubscription(id) {
			return this.facebookdata.subscribed.some(e => e.form_id === id);
		},

		
		async init() {
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s);
				js.id = id;
				js.src = 'https://connect.facebook.net/en_US/sdk.js';
				fjs.parentNode.insertBefore(js, fjs);
			})(document, 'script', 'facebook-jssdk');

			window.fbAsyncInit = () => {
				// FB JavaScript SDK configuration and setup
				FB.init({
					appId: this.appid, // FB App ID
					cookie: true, // enable cookies to allow the server to access the session
					xfbml: true, // parse social plugins on this page
					version: 'v20.0', // uses graph api version v20.0
				});
				// this.getUser()
			};
			adminGet('/fb-login').then((r) => {
				this.facebookdata = r.data.data
				// this.fetchAndSubscribeToPages(this.facebookdata.long_token)
			}).catch((e) => { })
		},


		launchFBE() {
			this.loading.fb = true;
			FB.login(response => {
				if (response.authResponse) {
					this.res = response.authResponse;
					FB.api('/me', { fields: 'name,email,picture' }, async userInfo => {
						this.user = userInfo
						let x = await this.exchangeForLongLivedToken(this.res.accessToken);
						FB.api("/me/accounts",
							{ access_token: x.long_token, fields: 'business,access_token,category,category_list,name,id,picture' },
							async (response) => {
								if (response.data && response.data.length) {
									x.profile = userInfo.picture.data.url
									x.name = userInfo.name
									x.email = userInfo.email
									x.pages = response.data.map(page => {
										return { ...page, picture_link: page.picture?.data?.url || null, business_id: page.business?.id || null };
									});
									adminPost('/fb-login', x).then((r) => {
										location.reload()
									}).catch((e) => { })
								} else {
									console.error("No managed pages found.");
								}
							}
						);
						// this.init()
					});
				} else {
					this.loading.fb = false;
				}
				nextTick();
			}, {
				scope: 'catalog_management,ads_management,public_profile,email,pages_manage_metadata,pages_manage_ads', // Added public_profile and email scopes
			});

		},
		async exchangeForLongLivedToken(shortLivedToken) {
			try {
				const response = await fetch(
					`https://graph.facebook.com/v20.0/oauth/access_token?` +
					`grant_type=fb_exchange_token&` +
					`client_id=${this.appid}&` +
					`client_secret=18d75725fa6ed2731d6b3d980e4c2d3d&` + // Replace with your Facebook app's secret
					`fb_exchange_token=${shortLivedToken}`
				);
				const data = await response.json();
				// this.storeTokenInCookies(data.access_token, data.expires_in);
				// this.longLivedToken = data.access_token;
				return { long_token: data.access_token, expire: data.expires_in }
			} catch (error) {
			}
		},


		async getOwnedAddForms(i, data) {
			this.page_id = data.id
			this.page_access_token = (data.access_token)
			this.btnloading[i] = true
			await FB.api(`/${data.id}/leadgen_forms`,
				{ access_token: data.access_token, fields: 'id,name,status,leads_count' },
				async (response) => {
					this.currentPageData = data
					this.currentTable = 'formpage'
					this.allForms = response.data
					this.btnloading[i] = false
				}
			);
		},

		async subscribeToLeadgen(data, campaign_id = null) {
			await adminPost(`/fb-subscribe/${this.facebookdata._id}`, { form_id: data.id, form_name: data.name, campaign_id: campaign_id })
			try {
				const response = await fetch(
					`https://graph.facebook.com/v20.0/${this.page_id}/subscribed_apps`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							subscribed_fields: ["leadgen"],
							access_token: this.page_access_token
						}),
					}
				);
				const d = await response.json();
				if (response.ok) {
					successAlert(`Successfully subscribed page`);
				} else {
					errorAlert(`Failed to subscribe for page `, d);
				}
				this.init()
			} catch (error) {
				errorAlert("Error subscribing to leadgen:", error);
			}
		},

		async unsubscribeFromLeadgen(data, campaign_id = null) {
			await adminPost(`/fb-unsubscribe/${this.facebookdata._id}`, { form_id: data.id, campaign_id: campaign_id })
			try {
				const response = await fetch(
					`https://graph.facebook.com/v20.0/${this.page_id}/subscribed_apps`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							access_token: this.page_access_token
						}),
					}
				);
				const data = await response.json();
				if (response.ok) {
					successAlert(`Successfully unsubscribed from`);
				}
				this.init()
			} catch (error) {
				console.error("Error unsubscribing from leadgen:", error);
			}
		},

		getAccounts(t) {
			FB.api('/me', { fields: 'adaccounts{id,account_id,name}', access_token: t }, data => {
				this.accounts = data.adaccounts.data
			}).then((e) => { console.error(e) });
		},

		selectImport(i) {
			if (i.ads?.data[0]?.leads?.data?.length > 0) {
				this.current = i; this.CompaninModal = false; this.importModal = true
			} else {
				errorAlert("There is no Leads To Import")
			}
		},
		toggle(event) {
			this.$refs.menu.toggle(event);
		},
		getUser() {
			if (localStorage.getItem('fbtoken')) {
				FB.api('/me', { fields: 'name,email,picture', access_token: localStorage.getItem('fbtoken') }, userInfo => {
					this.user = userInfo
					this.getAccounts()
				});
			}
		},
		async submitForm(v) {
			this.loading.i = true
			v.token = localStorage.getItem('fbtoken')
			v.id = v.ads.data[0].id

			if (v.pipeline) {
				await adminPost(`/fb-lead-import-pipeline/${v.campaign}`, v)
			} else {
				v.pipeline = null
				await adminPost(`/fb-lead-import`, v)
			}
			this.loading.i = false
			this.pipelineModal = false
			this.importModal = false
			successAlert('Lead Imported Successfully');
		},
		logoutFun() {
			localStorage.removeItem('fbtoken');
			location.reload()
		},
		getAccounts(t) {
			FB.api('/me', { fields: 'adaccounts{id,account_id,name,balance}', access_token: t }, data => {
				this.accounts = data.adaccounts.data
			});
		},
		async selectAddAccount(accountId) {
			await FB.api(`/${accountId}/campaigns?`, { fields: `ads{id,name,status,leads{id},insights}`, access_token: localStorage.getItem('fbtoken') }, data => {
				this.campain = data
			});
			this.CompaninModal = true;
		},
		storeTokenInCookies(accessToken, expiresIn) {
			// Convert expires_in from seconds to a valid date format
			const expiryDate = new Date();
			expiryDate.setTime(expiryDate.getTime() + (expiresIn * 1000)); // Convert seconds to milliseconds
			// Create the cookie string
			const cookieString = `fbtoken=${accessToken}; expires=${expiryDate.toUTCString()}; path=/`;
			localStorage.setItem("fbtoken", accessToken)
			// Store the cookie
			document.cookie = cookieString;

		},

		// Fetch pages and subscribe to `leadgen`
		async fetchAndSubscribeToPages(t) {
			try {
				FB.api("/me/accounts",
					{ access_token: t },
					async (response) => {
						if (response.data && response.data.length) {
							for (const page of response.data) {
								await this.unsubscribeFromLeadgen(page.id, page.access_token);
							}
						} else {
							console.error("No managed pages found.");
						}
					}
				);
			} catch (error) {
				console.error("Error fetching pages:", error);
			}
		},

		// async subscribeToLeadgedn(pageId, pageAccessToken) {
		// 	try {
		// 		const response = await fetch(
		// 			`https://graph.facebook.com/v20.0/${pageId}/subscribed_apps`,
		// 			{
		// 				method: "POST",
		// 				headers: {
		// 					"Content-Type": "application/json",
		// 				},
		// 				body: JSON.stringify({
		// 					subscribed_fields: ["leadgen"],
		// 					access_token: pageAccessToken,
		// 				}),
		// 			}
		// 		);
		// 		const data = await response.json();
		// 		if (response.ok) {
		// 		} else {
		// 			console.error(`Failed to subscribe for page ${pageId}:`, data);
		// 		}
		// 	} catch (error) {
		// 		console.error("Error subscribing to leadgen:", error);
		// 	}
		// },

		async fetchCampaigns() {
			await adminGet(`/campaigns/is_active`)
				.then(response => {
					this.campaign = response.data.data;
					this.allCampaign = this.campaign.map(i => ({
						label: i.campaign_name,
						value: i._id,
					}));
				})
				.catch(error => {
					console.error('Error fetching campaigns:', error);
				});
		}


	},
};
</script>

<style scoped>
@import url('style.css');
</style>