<template>
   
    <div class="card">
        <DataTable :value="companies" tableStyle="min-width: 50rem">

            <Column field="name" header="Name"></Column>
            <Column field="email" header="email"></Column>
            <Column field="phone" header="phone"></Column>
            <Column field="message" header="message"></Column>
            <Column field="subject" header="subject"></Column>
            <Column field="company_name" header="company_name"></Column>
            <Column header="Delete">
                <template #body="slotProps">
                    <BootstrapIcon class="icon2" name="trash" size="2rem" @click="del(slotProps.data._id)" />
                </template>
            </Column>


        </DataTable>
    </div>

</template>

<script>
definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] })
export default {
    data() {
        return {
            companies: null
        }
    },
    mounted() {
        activateMenu('contactformfooter', "contactform");
        this.init()
    },
    methods: {
        async init() {
            this.companies = (await superadminGet(`/home-footer-contact-lead`)).data.data
        },
        async del(i) {
            if (await deleteConfirm('Do You Want to delete this Lead')) {
                await superadminDelete(`/home-footer-contact-lead/${i}`);
                this.init();
                successAlert('Lead Deleted');
            }
        },


    }
}
</script>
<style scopped>

</style>