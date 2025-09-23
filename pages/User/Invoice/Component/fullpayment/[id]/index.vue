<template>
    <section class="user-details">
        <div v-if="visible" class="loader-overlay">
            <div class="loader">
                <ProgressSpinner />
            </div>
        </div>
        <div class="user-invoice-container-main-heading">
            <p>{{ invoice?.company_id.comapny_name }}</p>
        </div>
        <section class="user-invoice-container">
            <div class="user-invoice-main-container">
                <div class="user-invoice-main-first-container">
                    <div class="user-invoice-main-first-container-fees">
                        <div class="user-invoice-main-first-container-fees-first">
                            <p>Consultation Fee&nbsp; : <span>Rs {{ invoice?.total_amount }}/-</span></p>
                        </div>
                        <div class="user-invoice-main-first-container-fees-second">
                      
                            <a  style="cursor: pointer;" :href="`/invoice/full/${invoice?._id}`" target="_blank" class="pi pi-download"> Invoice</a>

                        </div>
                    </div>
                    <div class="user-invoice-main-first-container-fees-message">
                        <p class="mb-0">Invoice For
                            <span>{{ invoice?.service_listing.title }}</span>{{ }}
                            <span>{{ invoice?.service }}</span> - <span>Full Payment</span>
                        </p>
                    </div>
                    <div class="user-invoice-main-first-container-fees-long-message">
                        <p>Please retain this document for your records.</p>
                    </div>
                </div>
                <div class="user-invoice-main-second-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Payable Amount</th>
                                <th>Method</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <span class="recommend-user-tavle-side">
                                        {{ invoice?.total_amount }}
                                    </span>
                                </td>
                                <td>
                                    <div class="details d-flex align-items-center flex-wrap gap-2">

                                        <span class="capitalize">{{ invoice?.payment_method }}</span>

                                    </div>
                                </td>
                                <td>
                                    {{ DateFormat(invoice?.created_at).month }}
                                    {{ DateFormat(invoice?.created_at).day }},
                                    {{ DateFormat(invoice?.created_at).year }}

                                </td>
                                <td class="capitalize">
                                    <span :class="invoice?.payment_status === 'paid' ? 'bg-green' : 'bg-red'">{{
                                        invoice?.payment_status }}</span>
                                </td>

                                <td>
                                    <div class="user-invoice-action">
                                        <span
                                            :style="invoice?.payment_status === 'paid' ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;'"
                                        
                                            @click="invoice?.payment_status!=='paid' && generateLinkFull(invoice._id, invoice.total_amount, invoice.customer_id, invoice.company_id._id)"
                                            class="pi pi-wallet">
                                            Pay Online
                                        </span>
                                        <!-- <span style="opacity: 0.5;" class="pi pi-money-bill">
                                            Deposit Cash
                                        </span> -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
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
            invoice: null,
            visible: false
        };
    },

    async mounted() {
        activateMenu('invoice', 'Invoice',true);
        await this.invoicedetails()
    },

    methods: {
        async invoicedetails() {
            this.loading = true;
            await userGet(`/user-invoice-list-view/${this.$route.params.id}`).then(
                (response) => {
                    if (response.status) {
                        this.invoice = response.data.data
                    }
                },
            );
            this.loading = false;
        },

        async downloadFull(id) {
            try {
                this.visible = true
                const response = await fetch(`/api/pdf?url=https://api.findandconsult.com/invoicepdf/full/${id}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'page.pdf'; // Specify the file name
                    link.click(); // Trigger the download
                    successAlert("Invoice download successfully")
                } else {
                    console.error('Error generating PDF:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                this.visible = false;
            }
        },

        async generateLinkFull(id, amt, lid, cid, type) {
            amt = amt * 100;
            let data = {
                notes: {
                    lid: lid,
                    cid: cid,
                    pid: id,
                    paymentFor: 'lead_payment',
                    paymentType: "full",
                    returnUrl: this.$route.fullPath,
                },
                amount: amt,
                callbackUrl: `${window.location.origin}/user/verifypayment/${cid}`,
                description: 'This is desc',
            };
            this.loading = true;
            await userPost(`/generate-payment-link-admin/${cid}`, data).then((response) => {
                if (response.status) {
                    window.location.replace(response.data.data.short_url);

                }
            });
            this.loading.c = false;
        },

    },
};
</script>

<style scoped>
@import url('style.css');

.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Ensure it appears on top */
}

.loader {

    border-radius: 50%;
    width: 40px;
    height: 40px;

}
</style>