
<template>
    <section class="user-details">
        <div class="user-invoice-container-main-heading">
            <p>{{ invoice?.company_id.company_name }}</p>
        </div>
        <section class="user-invoice-container">
            <div class="user-invoice-main-container">   
                <div class="user-invoice-main-first-container">
                    <div class="user-invoice-main-first-container-fees">
                        <div class="user-invoice-main-first-container-fees-first">
                            <p>Consultation Fee&nbsp;: <span>Rs {{ invoice?.total_amount }}/-</span></p>
                        </div>
                        <div class="user-invoice-main-first-container-fees-second">
                            <!-- <p class="pi pi-eye"> invoice</p> -->
                            <a  style="cursor: pointer;" :href="`/invoice/emifull/${invoice?._id}`" target="_blank" class="pi pi-download"> Invoice</a>
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

                            <tr v-for="(i,index) in invoice?.emi">
                                <td>
                                    <span class="recommend-user-tavle-side">
                                        {{ i.amount }}
                                    </span>
                                </td>
                                <td>
                                    <div class="details d-flex align-items-center flex-wrap gap-2 capitalize">

                                        <span>{{ i.method }}</span>

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
                                <td>
                                    <div class="user-invoice-action">
                                        <span :class="{ 'disabled-btn': i?.status === 'paid' }"  style="cursor: pointer;" @click="sendReminder(invoice._id,i.date,i.amount)" class="pi pi-bell">
                                            Send Reminder
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="invoice?.emi.length >= 0" class="user-invoice-main-bottom-container">
                    <p class="user-invoice-main-bottom-container-heading">Remaining Balance&nbsp;: <span>RS
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
    layout: 'admin',
    middleware: ['admin'],
});

export default {
    data() {
        return {
            loading: false,
            invoice: null,

        };
    },

    async mounted() {
        activateMenu('admin-invoices', 'Invoice-EMI', true);
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
        },


        async sendReminder(id,date,amount) {
            try {
                const response = await adminGet(`/send-invoice-reminder-due-date/${id}/${amount}/${date}/`);

                if (response.data.status) {
                    successAlert("Reminder sent successfully!");
                } else {
                    errorAlert("Failed to send the reminder.");
                }
            } catch (error) {
                console.error("Error sending reminder:", error);
                errorAlert("An error occurred while sending the reminder.");
            }
        }

       

    },
};
</script>

<style scoped>
@import url('style.css');
.disabled-btn {
    pointer-events: none;  
    opacity: 0.5;         
}
</style>