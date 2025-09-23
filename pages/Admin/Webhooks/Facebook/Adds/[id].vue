<template>

    <div class="card">
        <DataTable :value="data" sortMode="multiple" tableStyle="min-width: 50rem" v-model:filters="filters" :globalFilterFields="['name']">
            <template #header>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" class=""/>
            </template>
            <Column field="name" header="Name" sortable style="width: 25%"></Column>
            <Column field="budget_remaining" header="Amount Left" sortable style="width: 25%"></Column>
            <Column field="status" header="Status" sortable style="width: 25%"></Column>
            <Column field="leads.length" header="Leads" sortable style="width: 25%"></Column>
            <Column header="Action">
                <template #body="{ data }">
                    <NuxtLink :to="`/admin/webhooks/facebook/leads/${data._id}`">
                        <BootstrapIcon name="eye" class="icon2" size="16" />
                    </NuxtLink>
                </template>
            </Column>
            <template #empty>
                <center class="m-5 p-5">Nothing To Show Here</center>
            </template>
        </DataTable>
    </div>

</template>


<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
</script>

<script>

export default {
    data() {
        return {
            filters: { global: { value: null, matchMode: this.$filterMatchMode.CONTAINS } },
            data: null,
        };
    },

    async mounted() {
        activateSubmenu('l4', 'Facebook');
        this.data = (await adminGet(`/compaigns/${this.$route.params.id}`)).data.data;
    },
    methods: {


    },
};
</script>

<style scoped>
@import url('./style.css');
</style>