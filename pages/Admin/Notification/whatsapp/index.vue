<template>
	<div class="whatsapp webhook-container">
		<div class="wa-company-details flex-wrap gap-2">
			<div class="wa-company-head-left ">
				<h3>{{ wabaData?.name ? wabaData.name : 'Company Name' }} <span class="waba-business-id"
						v-if="wabaData">• {{ wabaData?.business_id }}</span></h3>
				<h6>Status: <span :class="['wa-reg-status', wabaData?.profile_status === 'ACTIVE' ? 'active' : '']">{{
					wabaData?.profile_status ? 'Verified' : 'Not Registered' }}</span> | Active Plan: <span
						class="plan-tier">Free Plan</span> | Number: <span class="plan-tier">{{
							wabaData?.display_phone_number ? wabaData?.display_phone_number : 'No Phone Number Connected'
						}}</span></h6>
			</div>
			<div class="wa-company-head-right">
				<div class="wa-company-creation">
					<p v-if="wabaData">Created On <span>{{ formatDate(wabaData?.createdAt) }}</span></p>
				</div>
				<div class="wa-company-btn-stats flex-wrap">
					<p><span
							:class="['waba-status-notifier', wabaData?.code_verification_status === 'VERIFIED' ? 'approved' : 'pending']"></span>WhatsApp
						Business API</p>
					<p v-if="wabaData"><span>Messaging Quota <i class="bi bi-info-circle-fill" title="Daily Messaging Quota"></i></span> {{ wabaData?.messaging_limit }}</p>
				</div>
			</div>
		</div>
		<div class="wa-business-details">
			<div class="wa-business-details-wrapper">
				<div v-if="wabaData?.profile_status" class="wa-business-details-container">
					<div class="wa-messaging-tabs flex-wrap">
						<div class="waba-messaging-tabs-container cursor-pointer"
							@click="$router.push('/admin/notification/whatsapp/chat')">
							<NuxtImg src="/img/svg/live-chat.svg" class="tab-image" alt="live-chat-img" />
							<p><span class="waba-status-notifier approved"></span>Live Chat</p>
						</div>
						<!-- <div class="waba-messaging-tabs-container cursor-pointer"
							@click="$router.push('/admin/notification/whatsapp/campaigns/broadcast')">
							<NuxtImg src="/img/svg/broadcast.svg" class="tab-image" alt="broadcast-img" />
							<p>Broadcast</p>
						</div> -->
						<div class="waba-messaging-tabs-container cursor-pointer"
							@click="$router.push('/admin/notification/whatsapp/campaigns')">
							<NuxtImg src="/img/svg/campaign.svg" class="tab-image" alt="campaign-img" />
							<p>Campaign</p>
						</div>
						<div class="waba-messaging-tabs-container cursor-pointer"
							@click="$router.push('/admin/notification/whatsapp/flow')">
							<NuxtImg src="/svg-new-img/template-file.svg" class="tab-image" alt="flow-img" />
							<p>Flow</p>
						</div>
						<div class="waba-messaging-tabs-container cursor-pointer"
							@click="$router.push('/admin/notification/whatsapp/waflow')">
							<NuxtImg src="/img/svg/broadcast.svg" class="tab-image" alt="flow-img" />
							<p>WhatsApp Flow</p>
						</div>
					</div>
					<div class="wa-business-details-section">
						<div class="waba-business-name-wrapper">
							<div class="waba-business-name-container">
								<h6 class="mb-0">{{ wabaData?.verified_name ? wabaData.verified_name : 'Verified Name'
								}} | Chandigarh</h6>
								<span class="waba-number-profile">{{ wabaData?.display_phone_number }}</span>
							</div>
							<hr class="divider-wrapper" />
							<div class="waba-account-stats-container">
								<div class="waba-account-stats-tab">
									<div class="waba-account-stats-title">All Conversations <i
											class="bi bi-info-circle-fill" title="Total number of conversations including all categories"></i></div>
									<div class="waba-account-stats-data">{{ wabaData?.chat_count }}</div>
								</div>
								<div class="waba-account-stats-tab">
									<div class="waba-account-stats-title">Free Tier Conversations <i
											class="bi bi-info-circle-fill" title="Number of free tier conversations with users"></i></div>
									<div class="waba-account-stats-data">{{ wabaData?.free_tier_count }}</div>
								</div>
								<div class="waba-account-stats-tab">
									<div class="waba-account-stats-title">Quality Ratings <i
											class="bi bi-info-circle-fill" title="Quality ratings based on user interactions"></i></div>
									<div class="waba-account-stats-data">Healthy</div>
								</div>
								<div class="waba-account-stats-tab">
									<div class="waba-account-stats-title">Approximate Charges <i
											class="bi bi-info-circle-fill" title="Estimated charges for Paid WhatsApp conversations"></i></div>
									<div class="waba-account-stats-data">₹ {{ wabaData?.whatsapp_charges }}</div>
								</div>
							</div>
							<hr class="divider-wrapper" />
							<DataTable :value="wabaTableData">
								<Column field="display_phone_number" header="Phone Number"></Column>
								<Column field="verified_name" header="Name"></Column>
								<Column field="business_id" header="Business Id"></Column>
								<Column field="quality_rating" header="Quality"></Column>
							</DataTable>
						</div>
					</div>
				</div>
				<div class="wa-business-setup">
					<div class="wa-cloud-setup">
						<h6><i class="bi bi-whatsapp" style="font-size: 26px;"></i>Setup FREE WhatsApp Business Account
						</h6>
						<hr class="divider-wrapper" />
						<div class="apply-waba-container">
							<div class="apply-waba-wrapper">
								<div class="apply-waba-header">
									<h6 class="apply-waba-header-title">
										<NuxtImg src="/img/svg/whatsapp.svg" width="20" height="20" />Apply for WhatsApp
										Business API
										<NuxtImg src="/svg-new-img/prof-setup-complete.svg" width="25" height="25"
											v-if="wabaData?.profile_status === 'ACTIVE'" />
									</h6>
									<NuxtImg class="cursor-pointer" src="/img/png/drop-icon.png" width="17" height="10"
										@click="toggleApplyWabaInfo" />
								</div>
								<hr class="divider-wrapper" />
								<transition name="accordion-fade" @enter="accordionEnter"
									@after-enter="accordionAfterEnter" @leave="accordionLeave"
									@after-leave="accordionAfterLeave">
									<div class="apply-waba-info" v-show="showApplyWabaInfo">
										<h5>Click on Continue With Meta to apply for WhatsApp Business API</h5>
										<h6>Requirements to apply for WhatsApp Business API</h6>
										<ul class="waba-req-list">
											<li>• A Phone number that doesn't have WhatsApp App or WhatsApp Business App
												installed (Please DELETE if installed).</li>
											<li>• A Registered Business & Working Website.</li>
										</ul>
										<button @click="launchWhatsAppSignup" class="divhover" v-if="!wabaData">
											<NuxtImg src="/img/svg/meta.svg" alt="Login-meta" />
											<span>Continue with Meta</span>
										</button>
									</div>
								</transition>
								<div class="apply-waba"></div>
							</div>
							<div class="profile-setup-wrapper">
								<div class="profile-setup-header">
									<h6 class="profile-setup-header-title">
										<NuxtImg
											src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
											width="20" height="20" class="rounded-full" />Setup Your Profile
										<NuxtImg src="/svg-new-img/prof-setup-complete.svg" width="25" height="25"
											v-if="wabaData?.profile_status === 'ACTIVE'" />
									</h6>
									<NuxtImg src="/img/png/drop-icon.png" class="cursor-pointer" width="17" height="10"
										@click="toggleProfileSetup" />
								</div>
								<hr class="divider-wrapper" />
								<transition name="accordion-fade" @enter="accordionEnter"
									@after-enter="accordionAfterEnter" @leave="accordionLeave"
									@after-leave="accordionAfterLeave">
									<div v-show="showProfileSetup" class="profile-setup-content">
										<ul class="waba-req-list">
											<li>• Customize your WhatsApp profile, to help understand your customers
												well.</li>
											<li>• You can also edit profile using the edit button on profile card.</li>
										</ul>
										<button v-if="wabaData?.profile_status === 'ACTIVE'"
											@click="editProfileModal = true">Edit Profile</button>
									</div>
								</transition>
							</div>
							<div class="apply-tick-wrapper">
								<div class="apply-tick-header">
									<h6 class="apply-tick-header-title">
										<NuxtImg src="/img/svg/tick-decagram.svg" width="20" height="20"
											class="rounded-full" />Apply for Blue Tick
										<NuxtImg src="/svg-new-img/prof-setup-complete.svg" width="25" height="25"
											v-if="wabaData?.profile_status === 'ACTIVE'" />
									</h6>
									<NuxtImg src="/img/png/drop-icon.png" class="cursor-pointer" width="17" height="10"
										@click="toggleApplyTick" />
								</div>
								<hr class="divider-wrapper" />
								<transition name="accordion-fade" @enter="accordionEnter"
									@after-enter="accordionAfterEnter" @leave="accordionLeave"
									@after-leave="accordionAfterLeave">
									<div v-show="showApplyTick" class="apply-tick-content">
										<ul class="waba-req-list">
											<li>• Get Verified Blue Tick on your Whatsapp.</li>
										</ul>
										<button v-if="wabaData?.profile_status === 'ACTIVE'">Apply For Blue
											Tick</button>
									</div>
								</transition>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="wa-business-msg mb-4">
				<div :class="['waba-conversation-wrapper', wabaData?.profile_status === 'ACTIVE' ? '' : 'pending']">
					<div class="waba-wcc-header">
						<div class="wb-credits">WhatsApp Conversation Count (WCC)<i
								class="bi bi-info-circle-fill ml-2" title="WhatsApp Conversation Count"></i></div>
								<h5>₹ {{ wabaData?.whatsapp_charges }}</h5>
							</div>
					<ProgressBar :value="wabaData?.chat_count" :show-value="false"></ProgressBar>
					<div class="waba-cc-balance-wrapper flex-wrap gap-2">
						<span>{{ wabaData?.daily_messaging_quota }} Messages Left</span>
						<button><i class="bi bi-plus-circle-fill"></i>Add Balance</button>
					</div>
					<hr class="divider-wrapper" />
					<div class="waba-wcc-footer">
						<span>Free Service Conversation<i class="bi bi-info-circle-fill ml-2" title="Whenever a WhatsApp user messages you or calls you, a 24-hour timer called a customer service window starts"></i></span>
						<h5 class="flex items-center gap-2 mb-0">
							<NuxtImg src="/img/svg/mdi_infinity.svg" /> Unlimited
						</h5>
					</div>
				</div>
				<div class="waba-profile-detail-wrapper" v-if="wabaData">
					<div class="profile-details-section">
						<h6 class="edit-section-title" @click="editProfileModal = true">Edit Profile <i
								class="bi bi-pencil-square"></i></h6>
						<div class="profile-info">
							<div class="info-item-name" v-if="whatsappBusinessPofileData">
								<NuxtImg
									:src="whatsappBusinessPofileData?.profile_picture_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
									alt="Profile Image"
									class="rounded-full w-[60px] h-[60px] xl:w-[90px] xl:h-[90px]" />
								<div class="waba-profile-title">
									<h6>{{ wabaData?.verified_name }}</h6>
									<p>{{ whatsappBusinessPofileData?.vertical }}</p>
								</div>
							</div>
							<div class="info-item-number" v-if="whatsappBusinessPofileData" title="Copy Link"
								@click="copyWaLink">
								<p>https://wa.me/{{ cleanWhatsAppPhone }}</p>
							</div>
							<div class="info-item-description" v-if="whatsappBusinessPofileData">
								<label>Description</label>
								<p>{{ whatsappBusinessPofileData?.description }}</p>
							</div>
							<div class="info-item-address" v-if="whatsappBusinessPofileData">
								<label>Address</label>
								<p>{{ whatsappBusinessPofileData?.address }}</p>
							</div>
							<div class="info-item-email" v-if="whatsappBusinessPofileData">
								<label>Email</label>
								<p class="mb-0"><a :href="`mailto:${whatsappBusinessPofileData?.email}`">{{
									whatsappBusinessPofileData?.email }}</a></p>
							</div>
							<div class="info-item-website" v-for="(site, index) in whatsappBusinessPofileData?.websites"
								:key="index">
								<label>Website {{ index + 1 }}</label>
								<p class="mb-0"><a :href="`${site}`">{{ site }}</a></p>
							</div>
						</div>
					</div>
				</div>
				<div
					:class="['waba-explore-template-wrapper ', wabaData?.profile_status === 'ACTIVE' ? '' : 'pending']">
					<div class="my-template-cta cursor-pointer flex items-center justify-between py-1"
						@click="$router.push('/admin/notification/whatsapp/templates')">
						<div class="template-cta-container"><i class="bi bi-columns-gap"></i> My Templates</div>
						<i class="bi bi-arrow-up-right"></i>
					</div>
					<hr class="divider-wrapper" />
					<div class="template-library-cta cursor-pointer flex items-center justify-between py-1">
						<div class="template-cta-container"><i class="bi bi-stars"></i> Template Library</div>
						<i class="bi bi-arrow-up-right"></i>
					</div>
					<hr class="divider-wrapper" />
					<div class="template-library-cta cursor-pointer flex items-center justify-between py-1"
						@click="$router.push('/admin/notification/whatsapp/contactlist')">
						<div class="template-cta-container"><i class="bi bi-person-lines-fill"></i> Contact List</div>
						<i class="bi bi-arrow-up-right"></i>
					</div>
					<hr class="divider-wrapper" />
					<div class="template-library-cta cursor-pointer flex items-center justify-between py-1">
						<div class="template-cta-container"><i class="bi bi-gear"></i> More Settings</div>
						<i class="bi bi-arrow-up-right"></i>
					</div>
				</div>
			</div>
		</div>
	</div>

	<EditProfile v-model="editProfileModal" :phone-number-id="wabaData?.phone_number_id"
		:long-token="wabaData?.long_token" :appId="appid" :business-profile="whatsappBusinessPofileData"
		@profileUpdated="fetchWabaProfile" />
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import ProgressBar from 'primevue/progressbar';
import EditProfile from './components/EditProfile/EditProfile.vue'

export default {
	data() {
		return {
			wabaData: null,
			whatsappData: null,
			appid: '1566916050907333',
			configrationId: '10085631441525529',
			clientSecret: '18d75725fa6ed2731d6b3d980e4c2d3d',
			longLiveToken: null,
			showApplyWabaInfo: true,
			showProfileSetup: false,
			showApplyTick: false,
			editProfileModal: false,
			form: {
				profile_handle: '',
				about: '',
				address: '',
				email: '',
				vertical: '',
				websites: ['']
			},
			whatsappBusinessPofileData: null,
		}
	},

	components: {
		ProgressBar,
		EditProfile
	},

	async mounted() {
		activateSubmenu('w1', 'WhatsApp Integration');
		await this.fetchWabaData();
		if (this.wabaData) {
			await this.fetchWabaProfile();
		}
		// SDK initialization
		window.fbAsyncInit = function () {
			FB.init({
				appId: '1566916050907333',
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v20.0'
			});
		};

		// Load the SDK asynchronously
		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');

		// Session logging message event listener
		window.addEventListener('message', (event) => {
			if (!event.origin.endsWith('facebook.com')) return;
			try {
				const data = JSON.parse(event.data);
				if (data.type === 'WA_EMBEDDED_SIGNUP') {
					// Handle different status cases
					switch (data.event) {
						case 'FINISH':
							// Store the WhatsApp business account data
							this.whatsappData = {
								waba_id: data?.data?.waba_id,
								phone_number_id: data?.data?.phone_number_id,
								business_id: data?.data?.business_id
							};

							// Send data to your backend
							successAlert('WhatsApp Business account setup is pending. Please complete the verification process.');
							break;

						case 'CANCEL':
							errorAlert('WhatsApp Business account setup is canceled. Try again.');
							break;

						case 'FAILED':
							errorAlert('WhatsApp Business account setup failed. Please try again.');
							break;

						default:
							console.log('Unknown status:', data.event);
					}
				}
			} catch (error) {
				console.error('Error processing message:', error);
				console.log('Raw message data:', event.data);
			}
		});
	},

	computed: {
		wabaTableData() {
			return this.wabaData ? [this.wabaData] : [];
		},

		cleanWhatsAppPhone() {
			return this.wabaData?.display_phone_number?.replace(/\s+/g, '') || '';
		}
	},
	methods: {
		// Response callback
		async fbLoginCallback(response) {
			if (response.authResponse) {
				const code = response.authResponse.code;
				await this.exchangeToken(code);
			} else {
				console.log('Login Response:', response);
				errorAlert('Login failed. Please try again.');
			}
		},

		// Launch method and callback registration
		launchWhatsAppSignup() {
			FB.login(this.fbLoginCallback, {
				config_id: this.configrationId,
				response_type: 'code',
				override_default_response_type: true,
				extras: {
					setup: {
						business: {
							id: '1182416029691469',
						},
					},
					featureType: 'whatsapp_business',
					sessionInfoVersion: '3',
				}
			});
		},

		async exchangeToken(authCode) {
			try {
				const response = await fetch(
					`https://graph.facebook.com/v20.0/oauth/access_token?` +
					`client_id=${this.appid}&` +
					`client_secret=${this.clientSecret}&` +
					`code=${authCode}&` +
					`grant_type=authorization_code&`
				)
				const data = await response.json();
				console.log(data.access_token);
				this.longLiveToken = data.access_token;
				this.fetchProfileData(this.longLiveToken);
			} catch (error) {
				console.error('Token exchange error:', error);
				errorAlert('An error occurred while exchanging the token.');
			}
		},

		async fetchProfileData(accessToken) {
			try {
				const wabaprofileDataResponse = await fetch(`https://graph.facebook.com/v20.0/${this.whatsappData?.waba_id}?fields=name,message_templates,phone_numbers,status`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					}
				});

				const profileData = await wabaprofileDataResponse.json();

				// Extract phone number data from the response
				const phoneNumberData = profileData?.phone_numbers?.data?.[0];

				this.whatsappData = {
					...this.whatsappData,
					name: profileData?.name,
					profile_status: profileData?.status,
					display_phone_number: phoneNumberData?.display_phone_number,
					verified_name: phoneNumberData?.verified_name,
					code_verification_status: phoneNumberData?.code_verification_status,
					quality_rating: phoneNumberData?.quality_rating,
					long_token: accessToken,
				}
				await this.twoFactorAuth();
				await this.saveWhatsAppData();
			} catch (error) {
				console.error("Error Fetching Profile Data from Meta: ", error);
				errorAlert("Failed to retreive Data from Meta");
			}
		},

		// Set Two Factor Auth
		async twoFactorAuth() {
			try {
				const rawPhone = this.whatsappData?.display_phone_number || '';
				let cleanedNumber = rawPhone.replace(/\D/g, '');
				if (cleanedNumber.startsWith('91') && cleanedNumber.length > 10) {
					cleanedNumber = cleanedNumber.slice(2);
				}
				const pin = cleanedNumber.slice(-6);
				// const twoAuth = await fetch(`https://graph.facebook.com/v20.0/${this.whatsappData?.phone_number_id}`, {
				// 	method: "POST",
				// 	headers: {
				// 		Authorization: `Bearer ${this.whatsappData?.long_token}`,
				// 	},
				// 	body: JSON.stringify({ messaging_product: "whatsapp", pin }),
				// });

				const twoAuth = await fetch(`https://graph.facebook.com/v20.0/${this.whatsappData?.phone_number_id}/register`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${this.whatsappData?.long_token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ messaging_product: "whatsapp", pin }),
				});

				const authTwo = await twoAuth.json();
				console.log("This is auth response: ", authTwo)
				successAlert("PIN SET SUCCESSFULLY");
			} catch (error) {
				console.log("Error setting Two Factor Auth: ", error);
				errorAlert("Failed to set Two Factor Auth");
			}
		},

		// Save WhatsApp data to backend
		async saveWhatsAppData() {
			try {
				if (this.whatsappData) {
					// Send data to your backend
					await adminPost('/whatsapp-login', { ...this.whatsappData });
					successAlert('WhatsApp Business account created successfully!');
					location.reload();
				}
			} catch (error) {
				console.error('Error saving WhatsApp data:', error);
				errorAlert('Failed to save WhatsApp Business account data');
			}
		},

		// Fetch WhatsApp data from backend
		async fetchWabaData() {
			try {
				const response = await adminGet('/whatsapp-login');
				this.wabaData = response?.data?.wabaData;
			} catch (error) {
				console.error("Error Fetching WhatsApp Data: ", error);
				errorAlert("Failed to Fetch WhatsApp Data");
			}
		},

		// FETCH PROFILE DATA FROM WHATSAPP CLOUD API
		async fetchWabaProfile() {
			try {
				const response = await fetch(
					`https://graph.facebook.com/v20.0/${this.wabaData?.phone_number_id}/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${this.wabaData?.long_token}`,
						},
					}
				);
				const result = await response.json();
				this.whatsappBusinessPofileData = result.data?.[0] || {};
				this.form.profile = this.whatsappBusinessPofileData.profile_picture_url || '';
				this.form.about = this.whatsappBusinessPofileData.about || '';
				this.form.address = this.whatsappBusinessPofileData.address || '';
				this.form.email = this.whatsappBusinessPofileData.email || '';
				this.form.vertical = this.whatsappBusinessPofileData.vertical || '';
				this.form.websites = this.whatsappBusinessPofileData.websites || [];
			} catch (error) {
				console.error("Error Fetching WhatsApp Business Profile: ", error);
				errorAlert("Error fetching Business Profile");
			}
		},

		formatDate(date) {
			const options = { year: 'numeric', month: 'short', day: 'numeric' };
			const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
			return formattedDate.toUpperCase();
		},

		copyWaLink() {
			const waLink = `https://wa.me/${this.cleanWhatsAppPhone}`;
			navigator.clipboard.writeText(waLink).then(() => {
				successAlert('Link Copied');
			}).catch(error => {
				errorAlert("Failed to copy Link");
				console.log("Failed to copy link: ", error);
			})
		},

		toggleApplyWabaInfo() {
			this.showApplyWabaInfo = !this.showApplyWabaInfo;
		},
		toggleProfileSetup() {
			this.showProfileSetup = !this.showProfileSetup;
		},
		toggleApplyTick() {
			this.showApplyTick = !this.showApplyTick;
		},
		accordionEnter(el) {
			el.style.height = '0';
			el.style.opacity = '0';
			el.style.overflow = 'hidden';
			const height = el.scrollHeight;
			requestAnimationFrame(() => {
				el.style.transition = 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s';
				el.style.height = height + 'px';
				el.style.opacity = '1';
			});
		},
		accordionAfterEnter(el) {
			el.style.height = 'auto';
			el.style.overflow = '';
			el.style.transition = '';
		},
		accordionLeave(el) {
			el.style.height = el.scrollHeight + 'px';
			el.style.opacity = '1';
			el.style.overflow = 'hidden';
			requestAnimationFrame(() => {
				el.style.transition = 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s';
				el.style.height = '0';
				el.style.opacity = '0';
			});
		},
		accordionAfterLeave(el) {
			el.style.height = '';
			el.style.overflow = '';
			el.style.transition = '';
		},
	}
};
</script>
<style scoped>
@import url('style.css');
</style>