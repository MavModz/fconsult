<!-- @format -->

<template>
    <div class="generate-url-screen">
        <div class="generate-url-wrapper">

            <section v-if="form" class="recmd-tbl-sec">
                <table class="table-recmd-dsnn">
                    <thead class="thead-tbl-recmd">
                        <tr class="url-tr-size">
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="url-generate-back" v-for="(item, index) in form.formResponse" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.phone }}</td>
                             <td>
  {{
    new Date(item.date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).replace(",", " •")
  }}
</td>
                            <td>
                                <div class="btn-align-center">
                                    <BootstrapIcon v-tooltip.top="'Convert To Lead'" name="person-add"
                                        class=" ms-3 icon1" @click="toLead(item.email)" />
                                    <BootstrapIcon v-tooltip.top="'Delete Response'" name="trash" class=" ms-3 icon1"
                                        @click="deleteRes(item.email)" />
                                    <BootstrapIcon v-tooltip.top="'View Response'" name="arrow-right"
                                        class=" ms-3 icon1" @click="this.$router.push(`/form/${this.$route.params.id}?email=${item.email}&name=${item.name}&phone=${item.phone}`)" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <Dialog v-model:visible="confirmation" modal header="Conversion Confirmation">
            <div class="modal-body-del">
                <p class="event-mdl-par">
                    Do you confirm that you want to Convert this Visitor into a Lead
                </p>
            </div>
            <div class="modal-footer-section">
                <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal">
                    Cancel
                </button>
                <button class="btn-btn-dle" @click="toLead">Confirm</button>
            </div>
        </Dialog>
    </div>
</template>

<script>
definePageMeta({
    layout: 'subadmin',
    middleware: ['subadmin'],
});

export default {
    name: 'LeadsTable',
    data() {
        return {
            confirmation: false,
            loading: true,
            forms: null,
            form: null,
            id: null,
        };
    },
    async mounted() {
        activateMenu('visitorRegister', "Visitor Register Responses",true);
        await this.init();
    },
    methods: {
        async init() {
            this.loading = true;
            this.form = (await homeGet(`/home-forms/${useRoute().params.id}`)).data.data;
            this.loading = false;
        },
        async toLead(e) {
            if (await askConfirm('Do You Want to Convert this response To Lead','Convert Lead','Convert','No')) {
                this.loading = true;
                const res =await subadminGet(`/subadmin-form-to-lead/${this.$route.params.id}/${e}`) 
                if(res){
                    successAlert('Response convert to lead successfully!')
                }
                this.init();
            }
        },
        async deleteRes(i) {
            if (await deleteConfirm('Do You Want to Delete This Response')) {
                this.loading = true;
                const res= await subadminDelete(`/subadmin-delete-response/${this.$route.params.id}/${i}`)
                if(res){
                    successAlert('Response deleted successfully!')
                }
                this.init();
            }
        },
    },
};
</script>

<style scoped>
@import url('./style.css');
</style>