<template>


    <div class="languages">
        <div class="btn-container">
            <span id="languages-heading">Email</span>
            <span class="cursor-pointer" id="add-btn" @click="addModal = true"><i class="bi bi-plus"
                    style="font-size: 1.25rem;"></i> Add</span>
        </div>
        <div class="break-line"></div>
        <div class="flex-container">
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Primary</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody v-if="loading">
                        <tr v-for="i in 2" :key="i">
                            <td v-for="j in 3" :key="j">
                                <Skeleton></Skeleton>
                            </td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <template v-if="fields?.length > 0">
                            <tr v-for="(i, index) in fields" :key="i._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ i.name }}</td>
                                <td>{{ i.email }}</td>
                                <td>
                                    <span class="text-white rounded-lg p-1" :class="{
                                        'bg-[#ff5757]': i.status === 'Pending',
                                        'bg-[#4CAF50]': i.status === 'Success'
                                    }">
                                        {{ i.status }}
                                    </span>
                                    <button v-if="shouldShowVerifyButton(i)" @click="resendVerification(i)"
                                        class="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                                        Verify Email
                                    </button>
                                </td>
                                <td>
                                    <span class="text-white rounded-lg p-1" :class="{
                                        'bg-[#ff5757]': i.primary === false,
                                        'bg-[#4CAF50]': i.primary === true
                                    }">
                                        {{ i.primary }}
                                    </span>
                                    <button v-if="shouldShowPrimaryButton(i)" @click="makePrimary(i)"
                                        class="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                                        Make Primary
                                    </button>
                                </td>
                                <td>
                                    <div class="btn-align-center split-custom-class-recommendations">
                                        <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(i)">
                                        </SplitButton>
                                    </div>
                                    <!-- <div class="btn-group">
                                        <span class="td-btn" @click="deleteStatus(i._id)">
                                            <img src="/img/svg/trash.svg" alt="" />
                                        </span>
                                    </div> -->
                                </td>
                            </tr>
                        </template>

                        <!-- Empty state row -->
                        <tr v-else>
                            <td colspan="5" class="text-center text-gray-700 text-[18px] py-4">
                                No data found
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </div>
    </div>

    <emailWebhook />


    <!-- <Dialog v-model:visible="addModal" modal header="Add New Status" :style="{ 'min-width': '350px' }"
        :draggable="false">
        <FormKit type="form" @submit="submitForm">
            <div class="input-field">
                <label>Name</label>
                <FormKit validation="required" name="name" type="text" placeholder="Enter name" />
            </div>
            <div class="input-field">
                <label>Email Address</label>
                <FormKit validation="required" name="email" type="text" placeholder="Enter email" />
            </div>
            <div class="button-container pt-2 pb-3 justify-content-center">
                <button type="submit" id="upload-btn">Submit</button>
            </div>
        </FormKit>
    </Dialog> -->
    <Dialog v-model:visible="addModal" modal header="Add New Status" :style="{ 'min-width': '350px' }"
        :draggable="false">
        <FormKit type="form" @submit="submitForm">
            <!-- Status Name -->
            <div class="input-field">
                <label class="required">Name</label>
                <FormKit name="name" type="text" placeholder="Enter name" validation="required"
                    validation-visibility="submit" :validation-messages="{
                        required: 'Name is required'
                    }" />
            </div>

            <!-- Email Address -->
            <div class="input-field">
                <label class="required">Email Address</label>
                <!-- <FormKit name="email" type="text" placeholder="Enter email" validation="required|email"
                    validation-visibility="submit" :validation-messages="{
                        required: 'Email address is required',
                        email: 'Please enter a valid email address'
                    }" /> -->
                <FormKit name="email"  validation="required" type="select"
                    placeholder="Select user" validation-visibility="submit" :validation-messages="{
                        required: 'Email address is required'
                    }" :options="users" />


            </div>

            <!-- Submit Button -->
            <div class="button-container pt-2 pb-3 justify-content-center">
                <button type="submit" id="upload-btn">Submit</button>
            </div>
        </FormKit>
    </Dialog>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import emailWebhook from './component/emailWebhook'
export default {
    data() {
        return {
            addModal: false,
            fields: null,
            loading: false,
            id: null,
            statusname: null,
            subInput: '',
            subcategories: [],
            //check email
            pendingEmails: [],
            intervalId: null,
            users: []
        }
    },
    components: {
        emailWebhook
    },

    async mounted() {
        activateSubmenu('e1', 'Email Setting');
        this.alluser()
        // Check if current route is exactly the desired one
        if (this.$route.path === '/admin/notification/emails/emailsetting') {
            await this.init();

            this.interval = setInterval(() => {
                if (this.pendingEmails.length > 0) {
                    this.checkPendingEmails();
                }
            }, 10000);
        }
    },


    watch: {
        '$route.path'(newPath) {
            if (newPath === '/admin/notification/emails/emailsetting') {
                // Re-entered the page
                if (!this.interval) {
                    this.init();
                    this.interval = setInterval(() => {
                        if (this.pendingEmails.length > 0) {
                            this.checkPendingEmails();
                        }
                    }, 10000);
                }
            } else {
                // Left the page
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            }
        }
    },
    beforeUnmount() {
        // Also clear interval when component is destroyed
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    methods: {
        async alluser() {
            this.users = (await adminGet(`/all-employe`)).data.emp.map((i) => ({
                // label: getSlicedContent(i.user_id.name, 30),
                label:`${i.user_id.email}`,
                value: `${i.user_id.email}`,
            }));
        },
        getItems(i) {
            return [
                {
                    label: 'Delete',
                    command: () => {
                        this.deleteStatus(i._id)
                    },
                }
            ];
        },
        async init() {
            this.loading = true;

            try {
                const res = await adminGet(`/email-setting`);
                this.fields = res.data.leadstatus || [];

                this.pendingEmails = []; // reset

                const now = new Date();

                for (const item of this.fields) {
                    const createdTime = new Date(item.created_at);

                    // Only process items within 24 hours and still pending
                    if (item.status === 'Pending' && (now - createdTime < 24 * 60 * 60 * 1000)) {
                        try {
                            const checkRes = await adminPost(`/check-verification`, { email: item.email });

                            if (checkRes.data.status === 'Success') {
                                // Email verified but not updated in DB, update it now
                                await adminPatch(`/email-update-status`, {
                                    _id: item._id,
                                    status: 'Success',
                                });
                                this.init()
                            } else {
                                // Still not verified, keep in pending
                                this.pendingEmails.push(item);
                            }
                        } catch (checkErr) {
                            console.error(`Error verifying ${item.email}:`, checkErr);
                            this.pendingEmails.push(item); // still pending due to error
                        }
                    }
                }
            } catch (err) {
                console.error("INIT failed:", err);
            }

            this.loading = false;
        },

        shouldShowVerifyButton(item) {
            if (item.status !== 'Pending') return false;

            const createdTime = new Date(item.created_at);
            const now = new Date();

            return now - createdTime > 24 * 60 * 60 * 1000;
        },
        shouldShowPrimaryButton(item) {
            if (!item.primary && item.status == 'Success') return true;
            return false
        },

        async makePrimary(item) {
            try {
                const data = await adminPatch(`/email-update-primary`, {
                    _id: item._id,

                });
                this.init()
                successAlert("sucessfully make primary")
            } catch (error) {
                errorAlert("Somthing went wrong!")
            }
        },

        async resendVerification(item) {
            this.loading = true;

            try {
                const checkRes = await adminPost(`/check-verification`, { email: item.email });

                if (checkRes.data.status !== 'Success') {
                    await adminPost(`/send-email`, { email: item.email });

                    successAlert("Verification email sent successfully");
                }

                await this.init(); // refresh list
            } catch (err) {
                console.error("Verification error:", err);
                errorAlert("Failed to send verification email");
            } finally {
                this.loading = false;
            }
        },
        isExpired(createdAt) {
            const now = new Date();
            const created = new Date(createdAt);
            const diff = (now - created) / (1000 * 60 * 60); // hours
            return diff > 24;
        },
        async checkPendingEmails() {
            const now = new Date();
            // Copy array to safely modify during loop
            const emailsToCheck = [...this.pendingEmails];
            for (const item of emailsToCheck) {
                // Skip if > 24h
                if (now - new Date(item.created_at) >= 24 * 60 * 60 * 1000) {
                    this.pendingEmails = this.pendingEmails.filter(e => e.email !== item.email);
                    continue;
                }
                try {
                    const checkRes = await adminPost(`/check-verification`, { email: item.email });
                    console.log("checkres", checkRes.data.status)
                    if (checkRes.data.status === 'Success') {
                        console.log("hit me")
                        await adminPatch(`/email-update-status`, {
                            _id: item._id,
                            status: 'Success',
                        });
                        this.pendingEmails = this.pendingEmails.filter(e => e.email !== item.email);
                        // ✅ Refresh full list to update UI
                        await this.init();
                    }
                } catch (err) {
                    console.error(`Error checking email ${item.email}:`, err);
                }
            }
        },
        handleSubcategoryKey(event) {
            if (event.key === 'Enter' && this.subInput.trim()) {
                event.preventDefault();
                this.subcategories.push(this.subInput.trim());
                this.subInput = '';
            }
        },
        removeSubcategory(index) {
            this.subcategories.splice(index, 1);
        },
        // async submitForm(v) {
        //     this.loading = true;
        //     this.addModal = false;
        //     try {
        //         const res1 = await adminPost(`/email-add`, v);
        //        // ✅ Second API call — only if the first succeeds
        //         const res2 = await adminPost(`/send-email`, v);
        //         // ✅ Optional: success feedback or reload
        //         await this.init();
        //     } catch (error) {
        //         console.error('API error:', error);
        //         // ❗ Show error to user (toast, alert, etc.)
        //         errorAlert(error?.response?.data?.msg || "Something went wrong");
        //     } finally {
        //         // ✅ Always stop loading
        //         this.loading = false;
        //     }
        // },
        async submitForm(v) {
            this.loading = true;
            this.addModal = false;
            try {
                await this.init(); // this.initData should now be updated
                const checkRes = await adminPost(`/check-verification`, { email: v.email });
                const status = checkRes.data.status;
                console.log("Status:", status);
                const alreadySaved = this.fields?.some(item => item.email === v.email);
                if (status === 'NotFound') {
                    await adminPost(`/email-add`, v);
                    await adminPost(`/send-email`, v);
                }
                else if (status === 'Pending') {
                    if (!alreadySaved) {
                        await adminPost(`/email-add`, v);
                        await adminPost(`/send-email`, v);
                    }
                }
                else if (status === 'Success') {
                    if (!alreadySaved) {
                        await adminPost(`/email-add`, v);
                    }
                }
                await this.init(); // Refresh again after changes
            } catch (error) {
                console.error('API error:', error);
                errorAlert(error?.response?.data?.msg || "Something went wrong");
            } finally {
                this.loading = false;
            }
        },
        async deleteStatus(v) {
            if (await deleteConfirm('Do You Want to delete this email?')) {
                this.loading = true;

                const res = await adminDelete(`/email-delete/${v}`)

                if (res.status) {

                    await this.init();
                    successAlert('email Deleted Successfully');
                } else {

                    this.loading = false;
                }
            }
        },
    },
}
</script>

<style scoped>
@import url('style.css');
</style>