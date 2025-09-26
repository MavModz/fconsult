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
                                draggable="true" @dragstart="onDragStart($event, detail.text)">
                                <NuxtImg :src= "detail.path" alt="" />
                                <span class="customer-name-agrmt-generte">{{ detail.text }}</span>
                                <img src="/img/svg/drag.svg" alt="">
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
                                <img :src="detail.path" alt="">
                                <span class="customer-name-agrmt-generte">{{ detail.text }}</span>
                                <img src="/img/svg/drag.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <button class="btn_agreement">Create Agreement</button>
                </div>

                <div class="generate-agreement-right">
                    <div class="agreement-editor">
                        <QuillEditor :modules="modules" toolbar="full" ref="qhtml"  style="height:632px"/>
                    </div>
                </div>

            </div>
        </FormKit>

    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

definePageMeta({ layout: 'subadmin',middleware: ['subadmin'] })
export default {
    data() {
        return {
            receivedTitle: null,
            receivedService: null,
            customer_details: true,
            company_details: true,
            customerDetails: [
                {text: 'Customer Name', path: '/img/svg/c_name.svg'},
                // 'Address',
                {text: 'Customer Address', path: '/img/svg/c_location.svg'},
                // 'Phone Number',
                {text: 'Customer Number', path: '/img/svg/c_phone.svg'},
                // 'Email ID',
                {text: 'Customer Email', path: '/img/svg/c_mail.svg'},
                {text: 'Sales Person', path: '/img/svg/c_sale.svg'},
                {text: 'Councilor', path: '/img/svg/c_councilor.svg'},
                {text: 'Date & Time', path: '/img/svg/c_date.svg'},
                {text: 'Listing', path: '/img/svg/c_listing.svg'},
            ],
            companyDetails: [
                {text: 'Company Name', path: '/img/svg/c_name.svg'},
                {text: 'Address', path: '/img/svg/c_location.svg'},
                {text: 'Phone Number', path: '/img/svg/c_phone.svg'},
                {text: 'Email ID', path: '/img/svg/c_mail.svg'},
            ],
        };
    },
    components: {
        QuillEditor,
    },
    mounted() {
        activateMenu('Agrement', "Add Agreements");

        this.receivedTitle = this.$route.query.title;
        this.receivedService = this.$route.query.service;
    },
    methods: {
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
        }
        ,
        async submitForm(v) {
            v.document_title = this.receivedTitle,
            v.service_name = this.receivedService,
            v.html_content = this.$refs.qhtml.getHTML()
            v.admin_sign=this.$route.query.image
            v.sign_file_name=this.$route.query.file
            if(!v.html_content || v.html_content==='<p><br></p>'){
                errorAlert('Agreement content is required!!');
                return
            }

            await subadminPost(`/add-agreement`, v).then((response) => {
                this.$router.push('/subadmin/Agreement');
            })
        }
    }
}

</script>

<style scoped>
@import url('./style.css');;
</style>