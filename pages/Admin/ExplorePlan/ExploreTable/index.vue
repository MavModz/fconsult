<template>
    <div class="offer-Header-parent">
        <!-- <div class="offer-Header-parent-1st">
            <div class="offer-search-query">
                <span><i class="bi bi-search"></i></span>
                <input type="search">
            </div>
        </div> -->
    </div>
    <div class="offer-parent">
        <div class="offer-parent-inside">
            <table class="offer-parent-table">
                <thead class="offer-study-head">
                    <tr>
                        <th>Addons</th>
                        <th>Purchased On</th>
                        <th>Valid Till</th>
                        <th>Purchased By</th>
                        <th>Status</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="me.user?.plan?.crm">
                        <td>CRM</td>
                        <!-- <td>{{ me.user.plan.crm_plan[0].start.split("T")[0] }}</td>
                        <td>{{ me.user.plan.crm_plan[0].end.split("T")[0] }}</td>
                        <td>{{ me.user.plan.crm_plan[0].validity }} Days</td>
                        <td>{{ remainingDays(me.user.plan.crm_plan[0].end) }} Days</td>
                        <td>{{ remainingDays(me.user.plan.crm_plan[0].end) > 0 ? 'Active' : 'Expired' }}</td> -->
                        <td>{{ formatDate(me.user?.plan?.crm_plan[0]?.start) }}</td>
                        <td>{{ formatDate(me.user?.plan?.crm_plan[0]?.end) }}</td>
                        <td>{{ me.user?.user?.name }}</td>
                        <td>
                            <div class="plan-status" :class="remainingDays(me?.user?.plan?.crm_plan[0]?.end) > 0 ? 'active' : 'expired'"> {{
                                remainingDays(me?.user?.plan?.crm_plan[0]?.end) > 0 ? 'Active' : 'Expired' }}</div>
                        </td>
                        <td><a :href="`/invoice/fc/${me.user.plan._id}`" target="_blank" class="invoice-download cursor-pointer">Download <NuxtImg src="/img/svg/download.svg" /> </a></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>


</template>

<script>

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
export default {
    data() {
        return {
            data: null,
        }
    },
    async setup() {
        const me = (await useFetch('/api/users/admin')).data.value;
        return { me }
    },


    async mounted() {
        // activateSubmenu('e2', 'My Plans');
    },

    methods: {
        remainingDays(endDate) {
            const today = new Date();
            const end = new Date(endDate);
            const diffTime = end - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 0;
        },

        formatDate(dateString) {
            if (!dateString) return '';
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
        },
    },
}
</script>
<style scoped>
.offer-parent {
    background-color: #fff;
    border-radius: 14px;
    min-width: 650px;
    box-shadow: 0 4.934579372406006px 19.738317489624023px #1f1b2d1f;
    padding: 35px 25px 60px
}

.offer-parent-inside {
    border: 1px solid #e4e4ef;
    border-radius: 8px;
    min-height: 540px
}

.offer-parent-table {
    border-collapse: collapse;
    caption-side: bottom;
    min-width: max-content;
    min-width: max-content;
    width: -webkit-fill-available;
    margin-inline: 20px
}

.offer-study-head {
    border-bottom: 1px solid #e4e4ef;
    height: 4rem
}

.offer-study-head>tr>th {
    color: #767676;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
}

.offer-study-head>tr>th:first-child {
    text-align: start;
}

/* .offer-study-head>tr>th:last-child {
    text-align: end;
} */

.offer-Header-parent {
    margin-bottom: 15px
}

.offer-search-query {
    background-color: #fff;
    padding: 8px 12px;
    border-radius: 20px;
    max-width: 30%;
    width: 100%
}

.offer-search-query input {
    outline: 0;
    text-indent: 10px
}

td {
    color: #1A1A1A;
    padding: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}

td:first-child {
    text-align: start;
}

td:last-child {
    text-align: end;
}

.plan-status {
    display: inline-block;
    text-align: center;
    min-width: 105px;
    max-width: 105px;
    padding: 10px 20px;
    border-radius: 50px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
}

td>.active {
    background-color: #EBF6EB;
    color: #31AA27;
    border-radius: 50px;
    text-align: center;
}

td>.expired {
    background-color: #feeeee;
    color: #FF5757;
}

.invoice-download {
    color: #64748B;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px
}

</style>