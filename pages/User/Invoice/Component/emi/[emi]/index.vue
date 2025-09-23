<template>
    <section class="user-details">
        <div v-if="visible" class="loader-overlay">
            <div class="loader">
                <ProgressSpinner />
            </div>
        </div>
        <div class="user-invoice-container-main-heading">
            <p>{{ invoice?.company_id.company_name }}</p>
        </div>
        <section class="user-invoice-container">
            <div class="user-invoice-main-container">
                <div class="user-invoice-main-first-container">
                    <div class="user-invoice-main-first-container-fees">
                        <div class="user-invoice-main-first-container-fees-first">
                            <p>Consultation Fee&nbsp; : <span>Rs {{ invoice?.total_amount }}/-</span></p>
                        </div>
                        <div class="user-invoice-main-first-container-fees-second">
                            <!-- <p class="pi pi-eye"> invoice</p> -->
                            <a style="cursor: pointer;" :href="`/invoice/emifull/${invoice?._id}`" target="_blank"
                                class="pi pi-download"> Invoice</a>
                        </div>
                    </div>
                    <div class="user-invoice-main-first-container-fees-message">
                        <p class="mb-0">
                            Invoice For
                            <span>{{ invoice?.service_listing?.title || 'N/A' }}</span>
                            {{ }}
                            <span>
                                {{ invoice?.service || 'N/A' }} - <span> {{ }}Payment</span>
                            </span>
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
                        <tbody v-if="invoice">

                            <tr v-for="(i, index) in invoice?.emi">
                                <td>
                                    <span class="recommend-user-tavle-side">
                                        {{ i.amount }}
                                    </span>
                                </td>
                                <td>
                                    <div class="details d-flex align-items-center flex-wrap gap-2 ">

                                        <span class="capitalize">{{ i.method }}</span>

                                    </div>
                                </td>
                                <td>
                                    {{ DateFormat(i.date).month }}
                                    {{ DateFormat(i.date).day }},
                                    {{ DateFormat(i.date).year }}

                                </td>
                                <td class="capitalize">
                                    <span :class="i?.status === 'paid' ? 'bg-green' : 'bg-red'">{{ i.status }}</span>
                                </td>



                                <!-- <td>
                                    <div class="user-invoice-action">

                                        <span
                                            :style="i.status === 'paid' ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;'"
                                            @click="i.status !== 'paid' && generateLinkEMI(invoice._id, i.amount, i._id, invoice.customer_id, invoice.company_id._id)"
                                            class="pi pi-wallet">
                                            Pay Online
                                        </span>
                                        <span style="opacity: 0.5;cursor:not-allowed"class="pi pi-money-bill">
                                            Deposit Cash
                                        </span>
                                    </div>
                                </td> -->
                                <td>
                                    <div user-invoice-action v-if="i.status == 'paid'">
                                        <a style="cursor: pointer;" :href="`/invoice/emisingle/${invoice?._id}_${index}`" target="_blank"
                                        class="pi pi-download"></a>
                                    </div>
                                    <div v-else class="gap-2 flex items-center">
                                        <span :style="i.status === 'paid' ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;'"
                                            @click="i.status !== 'paid' && generateLinkEMI(invoice._id, i.amount, i._id, invoice.customer_id, invoice.company_id._id)"
                                            class="pi pi-wallet">
                                            Pay Online
                                        </span>
                                        <span style="opacity: 0.5;cursor:not-allowed"class="pi pi-money-bill">
                                            Deposit Cash
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="invoice?.emi.length >= 0" class="user-invoice-main-bottom-container">
                    <p class="user-invoice-main-bottom-container-heading">Remaining Balance&nbsp; : <span>RS
                            {{ getUnpaidAmount(invoice?.emi) }}/-</span></p>
                    <!-- <p class="user-invoice-main-bottom-container-heading-emi-left">{{ getPaidEmiCount(invoice?.emi)
                        }}/{{
                        invoice?.emi.length }}<span>EMI
                            PAID</span></p> -->

                    <p v-if="invoice?.emi.length > 0" class="user-invoice-main-bottom-container-heading-emi-left">
                        {{ getPaidEmiCount(invoice?.emi) }}/{{ invoice?.emi.length || 0 }}
                        <span>EMI PAID</span>
                    </p>
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
        activateMenu('invoice', 'Invoice-EMI', true);
        await this.invoicedetails()
    },

    methods: {

        getUnpaidAmount(emiArray) {
            return emiArray
                .filter(emi => emi.status === "unpaid") // Filter only unpaid EMIs
                .reduce((total, emi) => total + emi.amount, 0); // Sum the amounts
        },


        getPaidEmiCount(emiArray) {

            return emiArray.filter(emi => emi.status === "paid").length || 0;
        },

        async invoicedetails() {
            this.loading = true;
            await userGet(`/user-invoice-list-view/${this.$route.params.emi}`).then(
                (response) => {
                    if (response.status) {
                        this.invoice = response.data.data
                    }
                },
            );
            this.loading = false;
        },

        async downloadEmiFull(id) {
            try {
                this.visible = true
                const response = await fetch(`/api/pdf?url=https://api.findandconsult.com/invoicepdf/emifull/${id}`);
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
            }
            finally {
                this.visible = false;
            }
        },

        async generateLinkEMI(id, amt, emiId, lid, cid) {
            amt = amt * 100;
            let data = {
                notes: {
                    lid: this.$route.params.id,
                    cid: this.$route.params.cid,
                    pid: id,
                    emiId: emiId,
                    paymentFor: 'lead_payment',
                    paymentType: 'emi',
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
            this.loading.b = false;
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