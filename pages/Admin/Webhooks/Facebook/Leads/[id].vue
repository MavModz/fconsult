<template>



    <div v-if="data">
        Name : {{ lead.name }}
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" v-for="(i, index) in lead.leads[0].field_data">{{ i.name }}</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(l, index) in lead.leads">
                    <td v-for="i in l.field_data">
                        <div>
                            {{ i.values[0] }}
                        </div>
                    </td>
                    <td><button class="btn btn-success">Convert To Lead</button></td>
                </tr>
            </tbody>
        </table>
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
            data: null,
        };
    },

    async mounted() {
        activateSubmenu('l4', 'Facebook');
        this.data = (await adminGet(`/compaigns-leads/${this.$route.params.id}`)).lead.data;
    },
    methods: {


    },
};
</script>

<style scoped>
@import url('./style.css');
</style>