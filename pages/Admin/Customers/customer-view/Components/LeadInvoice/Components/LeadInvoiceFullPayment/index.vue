<template>

    <div class="header mt-[32px]">
        <button class="back-btn" @click="goBack"><img src="/public/img/svg/backBtn.svg"></button>
        <h2>Sunrise Immigration Visa Company</h2>
    </div>
    <div class="invoice-card">
        <div class="invoice-card-top">
        <div class="invoice-summary">
            <h3>
                Consultation Fee • <span class="amount">Rs 30,00,000/-</span>
            </h3>
            <div class="invoice-label">
                Invoice For <span>Australia Study Visa – </span><span class="status-label">Full Payment</span>
            </div>
        </div>
        <div class="action-buttons">
            <button class="icon-button">
                <i class="bi bi-eye text-xl"  style="font-weight: bold;"></i> Invoice
            </button>
            <button class="icon-button">
                <i class="bi bi-download"  style="font-weight: bold;"></i> Invoice
            </button>
        </div>
        </div>
         <p class="note">Please retain this document for your records.</p>
        <div class="table-wrapper">
            <table class="styled-table">
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
                        <td>10,00,000</td>
                        <td>Cash</td>
                        <td>22 Dec 2025</td>
                        <td><span class="badge paid">Paid</span></td>
                        <td>
                            <div class="d-flex align-items-center">
                            <button class="btn-action"><i class="bi bi-credit-card-fill"></i> Pay Online</button>
                            <button class="btn-action"><i class="bi bi-cash-stack"></i>  Deposit Cash</button>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$emit('close');
    }
  }
}
</script>
<style scoped>
@import url('style.css');
</style>