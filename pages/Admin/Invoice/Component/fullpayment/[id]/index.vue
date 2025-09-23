
<template>
    <section class="user-details">
        <div class="user-invoice-container-main-heading">
            <p>{{ invoice?.company_id.comapny_name }}</p>
        </div>
        <section class="user-invoice-container">
            <div class="user-invoice-main-container">
                <div class="user-invoice-main-first-container">
                    <div class="user-invoice-main-first-container-fees">
                        <div class="user-invoice-main-first-container-fees-first">
                            <p>Consultation Fee <span>.Rs {{ invoice?.total_amount }}/-</span></p>
                        </div>
                        <div class="user-invoice-main-first-container-fees-second">
                            <!-- <p class="pi pi-eye"> invoice</p> -->
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

                                        <span>{{ invoice?.payment_method }}</span>

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

                                        <span style="cursor: pointer;" @click="setpaid(invoice._id)" :class="{ 'disabled-btn': invoice?.payment_status === 'paid' }" class="pi pi-wallet">
                                            Set paid
                                        </span>
                                        <span style="cursor: pointer;" @click="sendReminder(invoice)" :class="{ 'disabled-btn': invoice?.payment_status === 'paid' }" class="pi pi-bell">
                                            Send Reminder
                                        </span>
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
        activateMenu('admin-invoices', 'Invoice', true);
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
            }
        },

        async setpaid(i) {

            if (await askConfirm(`Are you sure you want to make this payment paid?`)) {
                try {
                    const response = await adminPut(`/set-status-paid/${i}`);


                    await this.invoicedetails();
                } catch (error) {
                    console.error("Error updating payment status:", error);

                }
            }




        },

        async sendReminder(i) {
            try {
                const response = await adminGet(`/send-invoice-reminder-due-date/${i._id}/${i.total_amount}/${i.shipping.date}/`);

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
    }


};
</script>

<style scoped>
@import url('style.css');
.disabled-btn {
    pointer-events: none;  
    opacity: 0.5;         
}

</style>