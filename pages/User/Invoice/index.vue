<template>

    <div
    class="flex justify-center   border-[2px] border-[#ededed]  h-[650px] rounded-[12px] bg-[#ffffff] py-[140px] px-[95px]"
    v-if="!loading && invoice_list.length === 0">
    <div class=" flex items-start mt-4  gap-[32px] ">
      <img src="/public/img/png/natty-notebook-with-tasks 1.png" alt="Icon" height="165px"/>
      <div>
        <h2 class="text-[27px] font-bold text-[#000000] mb-2">No Invoices Generated</h2>
        <p class="text-[#9E9E9E] font-medium text-[18px] max-w-md mt-1 ">
         No invoices have been raised yet by your linked organization. Any billing details or payment requests will be shown here when generated.
        </p>
      </div>
    </div>
  </div>

    <section class="user-details" v-else>
        <div class="languages pb-[25px]">
            <div class="gallery-media-action">
                <div class="gallery-action">
                    <div class="search-container">
                        <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
                        <input type="text" placeholder="Search..." v-model="searchQuery" @input="searchbylisting" />
                    </div>
                    <div class="search-invoice-filter">
                        <div :class="{ active: activeFilter === 'All' }" @click="setActiveFilter('All')">
                            <p class="mb-0">All</p>
                        </div>
                        <div :class="{ active: activeFilter === 'EMI' }" @click="setActiveFilter('EMI')">
                            <p class="mb-0">EMI</p>
                        </div>
                        <div :class="{ active: activeFilter === 'Full Payment' }"
                            @click="setActiveFilter('Full Payment')">
                            <p class="mb-0">Full Payment</p>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Brand Name</th>
                            <th>Category</th>
                            <th>Listing</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <!-- <th>Status</th> -->
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="i in invoice_list">
                            <td>
                                <span class="recommend-user-tavle-side">
                                    {{ getSlicedContent(i.company_id.company_name,25) }}
                                </span>
                            </td>
                            <td>
                                <div class="details d-flex align-items-center flex-wrap gap-2">

                                    <span>{{ i.service }}</span>
                                </div>
                            </td>
                            <td>
                                <span>{{ i.service_listing?.title }}</span>

                            </td>
                            <td>
                                <span>{{ i.total_amount }}</span>{{ }}{{  }}
                                <span class="payment-full" v-if="i.emi.length == 0"> full</span>
                                <span class="payment-emi" v-if="i.emi.length > 0"> {{ getPaidEmiCount(i.emi) }} /{{ i.emi.length }}</span>
                            </td>
                            <td>
                                {{ DateFormat(i.created_at).month }}
                                {{ DateFormat(i.created_at).day }},
                                {{ DateFormat(i.created_at).year }}
                            </td>
                            <!-- <td>
                                <span>{{ i.payment_status }}</span>

                            </td> -->
                            <td>
                                <div class="btn-group">
                                    <span v-if="i.emi.length == 0" class="td-btn">
                                        <NuxtLink :to="`/user/invoice/component/fullpayment/${i._id}`">
                                            <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available" />
                                        </NuxtLink>


                                    </span>
                                    <span v-if="i.emi.length > 0" class="td-btn">
                                        <NuxtLink :to="`/user/invoice/component/emi/${i._id}`">
                                            <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available" />
                                        </NuxtLink>


                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </section>
</template>

<script>
definePageMeta({
    layout: 'user',
    middleware: ['user'],
});

export default {
    data() {
        return {
            loading: false,
            suggestion: null,
            searchQuery: "",
            activeFilter: "All",
            invoice_list: [],
        };
    },
    async setup() {
        const data = (await useFetch('/api/users/admin')).data.value;
        return { data }
    },
    async mounted() {
        activateMenu('invoice', 'Invoice');
        await this.invoiceUserData()
    },

    methods: {
        getPaidEmiCount(emiArray) {

            return emiArray.filter(emi => emi.status === "paid").length;
        },
        async setActiveFilter(filter) {
            this.activeFilter = filter;
            if (this.activeFilter === "All") {
                await this.invoiceUserData()
            }
            if (this.activeFilter === "EMI") {
                await this.invoiceUserData()
                this.invoice_list = this.invoice_list.filter(e => e.emi.length > 0)
            }
            if (this.activeFilter === "Full Payment") {
                await this.invoiceUserData()
                this.invoice_list = this.invoice_list.filter(e => e.emi.length <=0)
            }

        },

        async searchbylisting() {
            this.loading = true;
            await userGet(`/search-user-invoice-list/${this.data.user.user.email}?company_name=${encodeURIComponent(this.searchQuery)}`).then(
                (response) => {
                    if (response.status) {
                        this.invoice_list = response.data.data
                    }
                },
            );
            this.loading = false;
        },


        async invoiceUserData() {
            try {
                // Call the API to fetch the user's invoice list
                const response = await userGet(`/user-invoice-list/${this.data.user.user.email}`);

                // Check if the response indicates success
                if (response.data.status) {
                    // Assign the fetched invoice data to `invoice_list`
                    this.invoice_list = response.data.data;
                } else {
                    console.error("Failed to fetch invoice data:", response.data.message || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            }
        },

    },
};
</script>

<style scoped>
@import url('style.css');
</style>