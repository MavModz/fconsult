<template>
    <div class="generate-agreement-container">
        <FormKit type="form" @submit="submitForm">
            <div class="generate-agreement-wrapper">
                <div class="generate-agreement-left">
                    <div class="generate-agreement-left-1st-content">
                        <div class="gerner-agreement-dropdwn">
                            <span>Customer Details</span>
                            <img style="cursor: pointer;" src="/img/png/paw.png" alt="" @click="open_customer">
                        </div>
                        <div v-if="customer_details" class="generate-agreem-beldrop">
                            <div v-for="detail in customerDetails" :key="index" class="genrt-agremt-1stcustomer"
                                draggable="true" @dragstart="onDragStart($event, detail)">
                                <!-- <img src="/img/png/drop.png" alt=""> -->
                                <span class="customer-name-agrmt-generte">{{ detail }}</span>
                                <img src="/img/png/drag.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="generate-agreement-left-1st-content">
                        <div class="gerner-agreement-dropdwn">
                            <span>Company Details</span>
                            <img style="cursor: pointer;" src="/img/png/paw.png" alt="" @click="open_company">
                        </div>
                        <div v-if="company_details" class="generate-agreem-beldrop">
                            <div v-for="detail in companyDetails" :key="index" class="genrt-agremt-1stcustomer"
                                draggable="true" @dragstart="onDragStart($event, detail)">
                                <!-- <img src="/img/png/drop.png" alt=""> -->
                                <span class="customer-name-agrmt-generte">{{ detail }}</span>
                                <img src="/img/png/drag.png" alt="">
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn_agreement">Update Agreement</button>
                </div>

                <div class="generate-agreement-right">
                    <div v-if="agreementStore">
                        <h3>Title</h3>
                        <FormKit validation="required" type="text" name="document_title" class="form-control blog-adpbls" v-model="agreementStore.document_title" />
                    </div>
                    <div class="agreement-editor ">
                        <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />
                    </div>
                </div>

            </div>
        </FormKit>

    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

definePageMeta({ layout: 'admin' ,middleware: ['admincrm']})
export default {
    data() {
        return {
            agreementStore: null,
            receivedData: null,
            customer_details: true,
            company_details: true,
            customerDetails: [
                'Customer Name',
                'Address',
                'Phone Number',
                'Email ID',
                'Sales Person',
                'Councilor',
                'Date & Time',
                'Listing',
            ],
            companyDetails: [
                'Company Name',
                'Address',
                'Phone Number',
                'Email ID',
            ],
        };
    },
    components: {
        QuillEditor,
    },
    async mounted() {
        activateMenu('Agrement', "Update Agreements", true);
        this.receivedData = this.$route.query.data;
        await this.getagreement_data();

    },
    methods: {
        async getagreement_data() {
            await adminGet(`/view-agreement-details/${this.receivedData}`).then((response) => {
                this.agreementStore = response.data.data;
                this.$refs.qhtml.setHTML(this.agreementStore.html_content)
            });
        },
        open_customer() {
            this.customer_details = !this.customer_details;
        },
        open_company() {
            this.company_details = !this.company_details;
        },
        onDragStart(event, detail) {
            event.dataTransfer.setData('text/plain', `[${detail}]`);
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const editor = this.$refs.qhtml.quill;
            const cursorPosition = editor.getSelection().index;
            editor.insertText(cursorPosition, data);
            editor.setSelection(cursorPosition + data.length);
        },
        async submitForm(v) {
            // v.html_content=this.agreementStore.html_content;
            v.html_content = this.$refs.qhtml.getHTML()

            if(!v.html_content || v.html_content==='<p><br></p>'){
                errorAlert('Agreement content is required!!');
                return
            }
            await adminPatch(`/update-agreement/${this.receivedData}`, v).then((response) => {
                this.$router.go(-1);
            }) 
        }
    }
}

</script>

<style scoped>
@import url('./style.css');;
</style>