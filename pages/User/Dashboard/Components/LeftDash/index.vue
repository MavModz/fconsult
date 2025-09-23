<template>
    <div class="left-dashboard-container">
        <div  class="left-dashboard-user">
            <div class="left-dashboard-profile-image">
                <div class="user-frame1-image">
                    <img :src="userData?.profile_image || '/img/png/userProf.png'" alt="">
                </div>
                <div class="left-user-name">
                    <p>{{userData?.name || 'Hi, Charles Robbie'}}</p>
                    <span>Welcome to Find and Consult! Explore top-rated immigration consultants near you .</span>
                </div>
            </div>
            <div class="left-dashboard-profile-data">
                <div class="left-data-dash-frame1">
                    <p class="mb-0">Date Of Birth</p>
                    <span v-if="userData?.dob">
                            {{ userData?.dob?.split('T')[0] }}
                    </span>
                    <span v-else>
                        <NuxtLink class="text-[#3c3c3c] hover:underline" to="/user/profile">
                            Add My DOB 
                        </NuxtLink>
                    </span>
                </div>
                <div class="left-data-dash-frame1">
                    <p class="mb-0">Gender</p>
                    <span v-if="userData?.gender">
                            {{ userData?.gender }}
                    </span>
                    <span v-else>
                        <NuxtLink class="text-[#3c3c3c] hover:underline" to="/user/profile">
                            Mention Gender
                        </NuxtLink>
                    </span>

                </div>
                <div class="left-data-dash-frame1">
                    <p class="mb-0">Email ID</p>
                    <span v-if="userData?.email">
                            {{ userData?.email.length > 25 ? userData.email.slice(0, 24) + '...' : userData.email }}
                    </span>
                    <span v-else>
                        <NuxtLink class="text-[#3c3c3c] hover:underline" to="/user/profile">
                            charles@gmail.com
                        </NuxtLink>
                    </span>

                </div>
                <div class="left-data-dash-frame1">
                    <p class="mb-0">Mobile Number</p>
                    <span v-if="userData?.phone">
                            {{ userData?.phone }}
                    </span>
                    <span v-else>
                        <NuxtLink class="text-[#3c3c3c] hover:underline" to="/user/profile">
                            Add Phone Number
                        </NuxtLink>
                    </span>

                </div>
            </div>
        </div>
        <div  :class="customerStatus.isUser ? 'left-blow-user-side' : 'mt-4'">
            <!-- <p class="left-below-interested">Interested Categories</p> -->
            <div class="user-left-side-register">
                <div class="user-left-bottom-content-button">
                    <p class="text-[#64748b] font-bold text-[11px] leading-[25px]">WANT TO</p>
                    <span class="text-[#000000] font-bold text-[16px]">REGISTER MY</span>
                    <P class="text-[#ff5757] font-bold text-[16px]">Immigration Company</P>
                    <span class="text-[#64748b] font-medium text-[12px] leading-[23px]">You have a Company and want to
                        List it at Find and Consult , List your Company Free Today.</span>
                    <p @click="handleGetStarted"
                        class="hover-effect text-[#fff] font-medium text-[16px] bg-[#ff5757] rounded-[15px] px-[12px] py-[4px] w-[fit-content] mt-[10px] cursor-pointer">
                        Free Listing</p>
                </div>
                <div class="user-image-bottom-listing">
                    <img src="/img/png/image 77.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
definePageMeta({
    layout: 'user',
    middleware: ['user'],
})

export default {
    props:{
        customerStatus:{
            type:Boolean
        }
    },
    data() {
        return {
            userData: null,
        }
    },
    async mounted() {
        await this.initProfile();

    },
    methods: {
        async initProfile() {
            const res = await userGet(`/view-user-details`)
            this.userData = res.data.user
        },
        getUniqueDeviceId() {
            let deviceId = localStorage.getItem("device_id");
            if (!deviceId) {
                deviceId = crypto.randomUUID();
                localStorage.setItem("device_id", deviceId);
            }
            return deviceId;
        },
        async handleGetStarted() {
            await userGet(`/check-user-profile`).then((response) => {
                if (response.data.status) {
                    this.$router.push({ path: '/addbusiness' });
                } else {
                    serverErrorMessage(null, response.data.msg, 'Profile Verification is Incomplete')
                }
            })


        }
    }
}
</script>

<style scoped>
@import url("style.css");
</style>