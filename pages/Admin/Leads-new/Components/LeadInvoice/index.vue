<template>
    <div class="a-container  mt-[32px]">
        <div class="top-bar">
            <div class="search-wrapper">
                <span class="search-icon"><i class="bi bi-search"></i></span>
                <input type="text" placeholder="Search by category or service listing" v-model="searchQuery" @input="applyfillter" />
            </div>
            <button class="shortlist-btn" @click="$router.push(`/admin/payments/${this.$route.params.id}/new`)">+
                Generate Invoice</button>
        </div>
        <div class="table-container" v-if="filterdata.length > 0">
    <table class="styled-table">
        <thead>
            <tr>
                <th>Brand Name</th>
                <th>Category</th>
                <th>Service Listing</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(ele, ind) in filterdata" :key="ind">
                <td>{{ ele.shipping.name }}</td>
                <td>{{ ele.service }}</td>
                <td>{{ ele.service_listing.title }}</td>
                <td>
                    <span>{{ ele.total_amount }}</span>
                    <span class="payment-full" v-if="ele.emi.length == 0">Full</span>
                    <span class="payment-emi" v-if="ele.emi.length > 0">
                        {{ getPaidEmiCount(ele.emi) }} / {{ ele.emi.length }}
                    </span>
                </td>
                <td>
                    {{ DateFormat(ele.created_at).month }}
                    {{ DateFormat(ele.created_at).day }},
                    {{ DateFormat(ele.created_at).year }}
                </td>
                <td>
                    <span class="capitalize">{{ ele.payment_status }}</span>
                </td>
                <td>
                    <div class="btn-align-center split-custom-class-recommendations">
                        <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(ele)">
                        </SplitButton>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<!-- No invoice fallback -->
<div v-else class=" text-muted no-invoice ">
    No Invoice found.
</div>

        <!-- <div class="table-container ">
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Category</th>
                        <th>Service Listing</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filterdata.length>0" v-for="(ele, ind) in filterdata">
                        <td>{{ ele.shipping.name }}</td>
                        <td>{{ ele.service }}</td>
                        <td>{{ ele.service_listing.title }}</td>
                        <td>
                            <span>{{ ele.total_amount }}</span>{{ }}
                            <span class="payment-full" v-if="ele.emi.length == 0">Full</span>
                            <span class="payment-emi" v-if="ele.emi.length > 0"> {{ getPaidEmiCount(ele.emi) }} /{{
                                ele.emi.length }}</span>
                        </td>
                        <td>
                            {{ DateFormat(ele.created_at).month }}
                            {{ DateFormat(ele.created_at).day }},
                            {{ DateFormat(ele.created_at).year }}
                        </td>
                        <td>
                            <span class="capitalize">{{ ele.payment_status }}</span>
                        </td>
                        <td>
                            <div class="btn-align-center split-custom-class-recommendation">
                                <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(ele)">
                                </SplitButton>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div> -->
        <!-- <div class="pagination mt-4 ">
            <span class="page active">1</span>
            <span class="page">2</span>
            <span class="page">3</span>
            <span class="dots">...</span>
            <span class="page">8</span>
            <span class="arrow"><i class="bi bi-chevron-right"></i></span>
        </div> -->
    </div>

</template>

<script>



definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
    data() {
        return {
            loading: false,
            suggestion: null,
            searchQuery: "",
            activeFilter: "All",
            invoice_list: [],
            items: [
                {
                    label: 'View Invoice',
                    command: (e) => { this.viewInvoice(e.i) }
                },
                {
                    label: 'Download Invoice',
                    command: (e) => { this.downloadInvoice(e.i) }
                },
                {
                    label: 'Edit Invoice', command: (e) => {

                        this.$router.push({
                            path: `/admin/payments/${e.i._id}/update`,

                        });
                    }
                },

            ],
            visible: false,
            infoModal: false,
            allSetup: false,
            settings: null,
            totalListing: 0,
            searchQuery: "",
            filterdata: []
        };
    },
    async setup() {
        const data = (await useFetch('/api/users/admin')).data.value;
        return { data }
    },
    async mounted() {
       
        this.totalListing = (await userGet('/total-listings')).data.data
        await this.init();

    },

    methods: {
        getItems(i) {

            let filteredItems = this.items.filter(item => {
                if (item.label === 'Edit Invoice' && i.payment_status === 'paid') {
                    return false;
                }
                return true;
            });


            return filteredItems.map(item => ({
                ...item,
                command: () => item.command({ i })
            }));
        },
        getPaidEmiCount(emiArray) {

            return emiArray.filter(emi => emi.status === "paid").length;
        },

        async init() {
            try {
                const response = await adminGet(`/admin-invoice-list-lead/${this.$route.params.id}`);
                if (response.data.status) {
                    this.invoice_list = response.data.data;
                    this.applyfillter()
                } else {
                    console.error("Failed to fetch invoices:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching invoices:", error);
            }

            await adminGet(`/company-settings`).then(async (res) => {
                this.settings = res.data.data
            })
            if (this.totalListing > 0 && this.settings.razor_setup && this.settings.bank_setup) {
                this.allSetup = true
            }
        },
        applyfillter() {
            if (this.searchQuery === "") {
                this.filterdata = this.invoice_list;
            } else {
                const query = this.searchQuery.toLowerCase(); // optional: for case-insensitive search
                this.filterdata = this.invoice_list.filter((ele) => {
                    return (
                        ele.service.toLowerCase().includes(query) ||
                        ele.service_listing.title.toLowerCase().includes(query)
                    );
                });
            }
        },


        sendaddpayment(id) {
            if (this.allSetup) {
                this.$router.push(`/admin/payments/${id}/new`);
            } else {
                this.infoModal = true
            }





        },
        async setActiveFilter(filter) {
            this.activeFilter = filter;
            if (this.activeFilter === "All") {
                await this.init()
            }
            if (this.activeFilter === "EMI") {
                await this.init()
                this.invoice_list = this.invoice_list.filter(e => e.emi.length > 0)
            }
            if (this.activeFilter === "Full Payment") {
                await this.init()
                this.invoice_list = this.invoice_list.filter(e => e.emi.length <= 0)
            }

        },

        async searchbylisting() {
            this.loading = true;
            await adminGet(`/search-admin-invoice-list-all?name=${encodeURIComponent(this.searchQuery)}`).then(
                (response) => {
                    if (response.status) {
                        this.invoice_list = response.data.data
                    }
                },
            );
            this.loading = false;
        },

        async delInvoice(i) {
            if (i.payment_status == "paid") {
                if (await askConfirm('This invoice cannot be deleted as the Invoice has already been paid within the system.')) {

                    this.init()
                }
            }
            if (i.payment_status == "unpaid") {
                if (await deleteConfirm('Are you sure you want to delete this invoice.')) {
                    await adminDelete(`/delete-invoice/${i._id}`).then(r => { })
                    successAlert('Invoice Deleted');
                    this.init()
                }

            }
        },

        async downloadInvoice(i) {
            if (i.emi.length == 0) {
                this.$router.push(`/invoice/full/${i._id}`)
            } else {
                this.$router.push(`/invoice/emifull/${i._id}`)
            }
        },
        async viewInvoice(i) {
            if (i.emi.length == 0) {
                this.$router.push({
                    path: `/admin/invoice/component/fullpayment/${i._id}`,

                });
            } else {
                this.$router.push({
                    path: `/admin/invoice/component/emi/${i._id}`,

                });
            }
        },

        async downloadFull(id) {
            this.visible = true;
            try {
                const response = await fetch(`/api/pdf?url=https://api.findandconsult.com/invoicepdf/full/${id}`);

                if (response.ok) {
                    const blob = await response.blob();
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'page.pdf'; // Specify the file name
                    link.click(); // Trigger the download
                    this.loading = false
                } else {
                    console.error('Error generating PDF:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                this.visible = false;
            }
        },
        async downloadEmiFull(id) {
            try {
                const response = await fetch(`/api/pdf?url=https://api.findandconsult.com/invoicepdf/emifull/${id}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'page.pdf'; // Specify the file name
                    link.click(); // Trigger the download
                } else {
                    console.error('Error generating PDF:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

    },

}
</script>



<style scoped>
@import url('style.css');
</style>