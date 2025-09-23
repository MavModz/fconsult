<template>
    <div class="flex justify-end  text-[#ff5757] ">
        <span class="bg-[#FF57571A] rounded-full px-[16px]  font-semibold text-[15px] py-[7px]">EMAIL</span>
    </div>
    <div class="mt-3 min-h-screen mb-3 pb-3  flex justify-center items-start">
        <div class="w-full compiler  flex justify-center xl:gap-5 2xl:gap-6">
            <!-- Editor -->
            <div
                class="left-editor mb-3 py-[43px] max-w-[770px]  rounded-[12px] border-[2px] border-[#EDEDED] bg-[#ffffff]">
                <h2 class="text-[20px] font-semibold text-[#282823] pb-6 border-b-[2px] border-[#ededed] mb-4">Email
                    Name</h2>

                <div class="mb-4">
                    <label class="block text-[17px] text-[#1C1C1E] font-medium mb-1 required">Logo</label>
                    <div
                        class="relative flex items-center justify-between border-[1.2px] border-[#E5E5EA] rounded-[12px] p-4">
                        <div class="flex-1 text-gray-700 text-sm truncate">
                            <span v-if="dynamicData.logo_file_name">{{ dynamicData.logo_file_name }}</span>
                            <span v-else class="text-gray-400">file_name.jpeg</span>
                        </div>
                        <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="w-6 h-6 ml-4 flex-shrink-0" />
                        <input type="file" accept="image/png, image/jpeg, image/jpg" @change="handleLogoUpload"
                            class="absolute inset-0 opacity-0 cursor-pointer" required />
                    </div>
                    <p v-if="validationErrors.logo" class="text-red-500 text-sm mt-1">{{ validationErrors.logo }}</p>
                </div>
                <div class="mb-4" v-if="currentTemplateId === 1 || currentTemplateId === 2">
                    <label class="block text-[17px] text-[#1C1C1E] font-medium mb-1 required">Media</label>
                    <div
                        class="relative flex items-center justify-between border-[1.2px] border-[#E5E5EA] rounded-[12px] p-4">
                        <div class="flex-1 text-gray-700 text-sm truncate">
                            <span v-if="dynamicData.image_file_name">{{ dynamicData.image_file_name }}</span>
                            <span v-else class="text-gray-400">file_name.jpeg</span>
                        </div>
                        <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="w-6 h-6 ml-4 flex-shrink-0" />
                        <input type="file" accept="image/png, image/jpeg, image/jpg" @change="handleImageUpload"
                            class="absolute inset-0 opacity-0 cursor-pointer" required />
                    </div>
                    <p v-if="validationErrors.image" class="text-red-500 text-sm mt-1">{{ validationErrors.image }}</p>
                </div>
                <div class="mb-4" v-if="currentTemplateId === 2">
                    <label class="block text-[17px]  text-[#1C1C1E] font-medium mb-1">Border Color</label>

                    <div
                        class="flex items-center gap-3 px-[21px] py-[17px] border-[1.2px] border-[#E5E5EA] rounded-[12px]">
                        <span class="w-[22px] h-[22px] rounded-full"
                            :style="{ backgroundColor: dynamicData.headerBorder }"></span>
                        <InputText v-model="dynamicData.headerBorder" readonly
                            class="flex-1 outline-none bg-transparent" />
                        <input type="color" v-model="dynamicData.headerBorder" class="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <div class="mb-4" v-if="currentTemplateId === 3 || currentTemplateId === 4">
                    <label class="block text-[17px]  text-[#1C1C1E] font-medium mb-1">Background Color</label>

                    <div
                        class="flex items-center gap-3 px-[21px] py-[17px] border-[1.2px] border-[#E5E5EA] rounded-[12px]">
                        <span class="w-[22px] h-[22px] rounded-full"
                            :style="{ backgroundColor: dynamicData.bgColor }"></span>
                        <InputText v-model="dynamicData.bgColor" readonly class="flex-1 outline-none bg-transparent" />
                        <input type="color" v-model="dynamicData.bgColor" class="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between mb-1 font-medium text-[17px]">
                        <label class="  text-[#1C1C1E] required">Main Title / Subject</label>
                        <span class="text-[#909090]">
                            H1
                        </span>
                    </div>
                    <input v-model="dynamicData.title"
                        class="py-[17px] px-[21px] rounded-[12px] w-full border-[1.2px] border-[#E5E5EA]"
                        placeholder="e.g., Package Expiring" />
                    <p v-if="validationErrors.title" class="text-red-500 text-sm mt-1">{{ validationErrors.title }}</p>
                </div>
                <div class="mb-4" v-if="currentTemplateId === 3">
                    <label class="block text-[17px]  text-[#1C1C1E] font-medium mb-1">Title Color</label>

                    <div
                        class="flex items-center gap-3 px-[21px] py-[17px] border-[1.2px] border-[#E5E5EA] rounded-[12px]">
                        <span class="w-[22px] h-[22px] rounded-full"
                            :style="{ backgroundColor: dynamicData.titleColor }"></span>
                        <InputText v-model="dynamicData.titleColor" readonly
                            class="flex-1 outline-none bg-transparent" />
                        <input type="color" v-model="dynamicData.titleColor" class="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between mb-1 font-medium text-[17px]">
                        <label class=" text-[#1C1C1E] required ">CTA Text</label>
                        <span class="text-[#909090]">
                            p
                        </span>
                    </div>
                    <input v-model="dynamicData.ctaText"
                        class="py-[17px] px-[21px] rounded-[12px] w-full border-[1.2px] border-[#E5E5EA]"
                        placeholder="e.g., Confirm Email" />
                    <p v-if="validationErrors.ctaText" class="text-red-500 text-sm mt-1">{{ validationErrors.ctaText }}
                    </p>
                </div>
                <div class="mb-4">
                    <label class=" text-[#1C1C1E] required">CTA Link</label>
                    <input v-model="dynamicData.ctaLink"
                        class="py-[17px] px-[21px] rounded-[12px] w-full border-[1.2px] border-[#E5E5EA]"
                        placeholder="https://mail.google.com/" />
                    <p v-if="validationErrors.ctaLink" class="text-red-500 text-sm mt-1">{{ validationErrors.ctaLink }}
                    </p>
                </div>
                <div class="mb-4">
                    <label class="block text-[17px]  text-[#1C1C1E] font-medium mb-1">CTA Color</label>

                    <div
                        class="flex items-center gap-3 px-[21px] py-[17px] border-[1.2px] border-[#E5E5EA] rounded-[12px]">
                        <span class="w-[22px] h-[22px] rounded-full"
                            :style="{ backgroundColor: dynamicData.ctaColor }"></span>
                        <InputText v-model="dynamicData.ctaColor" readonly class="flex-1 outline-none bg-transparent" />
                        <input type="color" v-model="dynamicData.ctaColor" class="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <div class="mb-4">
                    <div class=" mb-1 font-medium text-[17px]">
                        <label class=" text-[#1C1C1E] required">Add Tag</label>
                    </div>
                    <input v-model="dynamicData.template_tag"
                        class="py-[17px] px-[21px] rounded-[12px] w-full border-[1.2px] border-[#E5E5EA]"
                        placeholder="e.g., Study Visa" />
                    <p v-if="validationErrors.template_tag" class="text-red-500 text-sm mt-1">{{
                        validationErrors.template_tag }}
                    </p>
                </div>
                <div class="mb-3">
                    <label class="block text-[17px] required text-[#1C1C1E] font-medium mb-1">Body Text</label>

                    <div class="study-visa-description-block">
                        <!-- <QuillEditor ref="qhtml"   :read-only="isReadOnly"  :modules="modules" class="mb-4" style="height:150px"
                            @text-change="updateHtml" /> -->
                        <!-- <ClientOnly>
                            <QuillEditor ref="qhtml" :modules="modules" v-model:content="dynamicData.body"
                                content-type="html" class="mb-4" style="height:150px" />
                            </ClientOnly> -->

                        <!-- <ClientOnly> -->
                        <QuillEditor v-if="isClientReady" ref="qhtml" :modules="modules"
                            v-model:content="dynamicData.body" content-type="html" class="mb-4" style="height:150px" />
                        <!-- </ClientOnly> -->
                        <!-- <QuillEditor ref="qhtml" :modules="modules" v-model:content="dynamicData.body"
                                content-type="html" class="mb-4" style="height:150px" /> -->
                        <p v-if="validationErrors.body" class="text-red-500 text-sm mt-1">{{ validationErrors.body
                            }}</p>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block text-[16px] font-medium text-[#1C1C1E] mb-2">Merge Tags</label>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="(label, key) in placeholderMap" :key="key" @click="insertChip(key)"
                            class="px-3 py-1 rounded-full border border-[#E5E5EA] bg-white text-sm text-[#1C1C1E] hover:bg-[#FF57571A] hover:text-[#FF5757] transition-all">
                            {{ label }}
                        </button>
                    </div>
                </div>

                <div class="mb-4" v-if="currentTemplateId === 2 || currentTemplateId === 3 || currentTemplateId === 4">
                    <label class="block text-[17px] required text-[#1C1C1E] font-medium mb-1">Footer Text</label>

                    <textarea v-model="dynamicData.footerText" rows="3" class="border rounded w-full p-2"></textarea>
                    <p v-if="validationErrors.footerText" class="text-red-500 text-sm mt-1">{{
                        validationErrors.footerText }}</p>
                </div>

                <div class="flex items-center gap-2  mt-2 pt-6 border-t-[2px] border-[#ededed] mb-4">
                    <label class="inline-flex items-center cursor-pointer">

                        <input type="checkbox" class="sr-only peer" v-model="isScheduled" />
                        <div
                            class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#56CD54] relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full">
                        </div>
                    </label>
                    <span class="text-[18px] font-medium text-[#0D062D]">Schedule</span>
                </div>

                <div v-if="isScheduled">
                    <div class="mb-4">
                        <label class="block mb-1 text-[17px]  text-medium text-[#1C1C1E]">Date</label>
                        <input type="date" v-model="dynamicData.scheduleDate"
                            class="py-[19px] px-[21px] rounded-[12px] w-full border-[1.2px] border-[#E5E5EA]" />
                    </div>

                    <div class="pb-6 border-b-[2px] border-[#ededed] mb-4">
                        <label class="block mb-1 text-[17px]  text-medium text-[#1C1C1E]">Time</label>
                        <input type="time" v-model="dynamicData.scheduleTime"
                            class="py-[17px] px-[21px] rounded-[12px] w-full border-[1.2px] border-[#E5E5EA]" />
                    </div>
                </div>

                <button v-if="resend" @click="updateDetailsResend"
                    class="w-full p-[14px] rounded-[4px] text-[#FF5757] mt-4 text-[19px] font-semibold bg-[#FF57571A]  flex items-center justify-center gap-2">
                    Resend
                    <i class="bi bi-send"></i>
                </button>
                <button v-else @click="publish"
                    class="w-full p-[14px] rounded-[4px] text-[#FF5757] mt-4 text-[19px] font-semibold bg-[#FF57571A]  flex items-center justify-center gap-2">
                    Publish
                    <i class="bi bi-send"></i>
                </button>

            </div>
            <!-- Preview -->
            <div class="right-editor max-w-[770px] ">
                <div class="p-[35px] md:px-[16px] rounded-[12px] border-[2px] border-[#ededed] bg-white">
                    <div class="pb-6 border-b-[2px] border-[#ededed] mb-4 flex justify-between">
                        <h2 class="text-[20px] font-semibold text-[#282823] ">Preview</h2>
                        <span @click="this.showDialog = true"
                            class="border-[1px] text-[#ff5757] font-semibold rounded-full border-[#ff5757] py-[6px] px-[12px]">Send
                            test Email</span>
                    </div>
                    <div ref="preview" class="bg-[#f7f5fe] p-4">
                        <component :is="currentTemplate.component" :data="dynamicData" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="showDialog" modal :style="{ width: '400px' }" :closable="false" header="Send Test Mail">
        <form @submit.prevent="submitEmail">
            <div class="p-fluid">
                <div>
                    <label for="email" class="block mb-2 text-[17px] text-[#000000] font-medium required">Email
                        Address</label>
                    <input id="email" type="email" v-model="testEmail" placeholder="test@123gmail.com" required
                        class="p-inputtext p-component" />
                </div>
                <div class="mt-3">
                    <label class="block mb-2 text-[17px] text-[#000000] font-medium required">Sender ID</label>
                    <div class="select-option"><select
                            class="w-full text-[14px] custom-select text-gray-900 bg-[#F1F5F966]  text-[17px] focus:outline-none px-3 py-3"
                            v-model="senderEmail">
                            <option value="" disabled>Select Sender Email</option>
                            <option v-for="item in emaillists" :key="item._id" :value="item.email">
                                {{ item.email }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="mt-4 flex justify-center gap-4">
                    <Button :disabled="loadingUpload" type="submit"
                        class="w-[30%] bg-[#FF5757] text-white  py-[10px] rounded-lg px-3  flex justify-center items-center">
                        <span v-if="!loadingUpload">Submit</span>
                        <span v-else>
                            <i class="pi pi-spinner pi-spin mr-2"></i>Submitting...
                        </span>
                    </Button>
                    <!-- <Button label="Submit" type="submit"
                        class="bg-[#ff5757] text-[#ffffff] text-[17px] rounded-lg py-[10px] w-[30%] px-3" /> -->
                    <Button label="Cancel" @click="showDialog = false"
                        class="bg-[#ffffff] text-gray-600 border rounded-lg w-[30%] py-[10px] px-3" />
                </div>
            </div>
        </form>
    </Dialog>

    <Dialog v-model:visible="showCampaignDialog" modal :style="{ width: '24vw' }" :closable="false"
        header="Send Test Mail">
        <form @submit.prevent="resendCampaign">
            <div class="p-fluid">
                <label for="email" class="text-[17px] font-semibold required">Campaign Name</label>
                <input id="email" type="text" v-model="campaignDetail.campaign_name" required
                    class="p-inputtext p-component" />
                <div class="mt-3">
                    <label class="block mb-2 text-[17px] text-[#000000] font-medium required">Sender ID</label>
                    <div class="select-option"><select
                            class="w-full text-[14px] custom-select text-gray-900 bg-[#F1F5F966]  text-[17px] focus:outline-none px-3 py-3"
                            v-model="campaignDetail.sender_email">
                            <option value="" disabled>Select Sender Email</option>
                            <option v-for="item in emaillists" :key="item._id" :value="item.email">
                                {{ item.email }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="mt-4 flex justify-end gap-2">
                    <Button label="Submit" type="submit"
                        class="bg-[#ff5757] text-[#ffffff] text-[17px] rounded-lg py-[10px] w-[30%] px-3" />
                    <Button label="Cancel" @click="showDialog = false"
                        class="bg-[#ffffff] text-gray-600 border rounded-lg w-[30%] py-[10px] px-3" />
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useNuxtApp } from '#app';


import TemplateOne from "../Components/TemplateOne.vue";
import TemplateTwo from "../Components/TemplateTwo.vue";
import TemplateThree from '../Components/TemplateThree.vue';
import TemplateFour from '../Components/TemplateFour.vue';
export default {
    // components: {
    //     QuillEditor,
    // },
    components: {
        QuillEditor: defineAsyncComponent(() =>
            process.client
                ? import('@vueup/vue-quill').then(m => m.QuillEditor)
                : Promise.resolve({ render() { return null } }) // no-op on server
        ),
    },

    name: "BuilderPage",
    data() {
        return {
            emaillists: [],
            senderEmail: '',
            isClientReady: false,

            validationErrors: {
                logo: '',
                image: '',
                title: '',
                ctaText: '',
                ctaLink: '',
                template_tag: '',
                body: '',
                footerText: ''
            },
            isScheduled: false,
            loadingUpload: false,
            resend: false,
            campaignDetail: null,
            dynamicData: {
                template_id: this.$route.query.id || 1,
                image: "",
                logo: "",
                logo_file_name: "",
                title: "",
                image_file_name: "",
                titleColor: "#DC2626",
                body: "",
                footerText: "",
                bgColor: "#DC2626",
                ctaText: "",
                ctaLink: "",
                template_tag: "",
                headerBorder: "#eb1000",
                ctaColor: "#ff5757",
                scheduleDate: '',
                scheduleTime: '',
                htmlContent: '',
            },
            templates: [
                { component: TemplateOne },
                { component: TemplateTwo },
                { component: TemplateThree },
                { component: TemplateFour },
            ],
            placeholderMap: {
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                companyName: 'Company Name',
            },


            showDialog: false,
            showCampaignDialog: false,
            testEmail: '',
            editorInstance: null,
            emaillists: []
        };
    },
    watch: {
        '$route.query': {
            handler() {
                this.parseTemplateData();
            },
            deep: true,
            immediate: false, // `true` not needed since `mounted()` already handles first load
        },
        'dynamicData.body': {
            immediate: false, // ✅ no need to run on mount
            handler(newVal, oldVal) {
                if (!oldVal && newVal && this.$refs.qhtml) {
                    // ✅ Only set HTML the first time (when loading data)
                    this.$refs.qhtml.setHTML(newVal);
                }
            }
        }


    },
    props: {
        email: { type: String, default: null }
    },
    // mounted() {
    //     console.log("query adata", this.$route.query);
    //     if (this.$route.query.data) {
    //         try {
    //             const parsed = JSON.parse(this.$route.query.data);
    //             this.dynamicData = {
    //                 ...this.dynamicData,
    //                 template_id: parsed.template_id || '',
    //                 image: parsed.image || '',
    //                 logo: parsed.logo || '',
    //                 logo_file_name: parsed.logo_file_name || '',
    //                 title: parsed.title || '',
    //                 image_file_name: parsed.image_file_name || '',
    //                 titleColor: parsed.titleColor || '#DC2626',
    //                 body: this.$refs.qhtml.setHTML(parsed.body) || '',
    //                 footerText: '',
    //                 bgColor: parsed.bgColor || '#DC2626',
    //                 ctaText: parsed.ctaText || '',
    //                 headerBorder: parsed.headerBorder || '#eb1000',
    //                 ctaColor: parsed.ctaColor || '#ff5757',
    //                 scheduleDate: '',
    //                 scheduleTime: '',
    //                 htmlContent: parsed.htmlContent || '',
    //             };
    //             this.edit_id = parsed._id
    //             console.log("data", this.dynamicData)
    //         } catch (e) {
    //             console.error("Failed to parse template data from query:", e);
    //         }
    //     }
    //     if (this.$route.query.edit) {
    //         this.edit = true
    //     }
    // },

    // mounted() {
    //     let data = this.$route.query.data;
    //     console.log("data mounted", data);
    //     if (data) {
    //         data = JSON.parse(data);
    //         this.dynamicData = {
    //             ...this.dynamicData,
    //             ...data,
    //         };
    //         this.$refs.qhtml.setHTML(data.body);
    //         this.edit_id = data._id;
    //     }
    // },
    mounted() {

        // Safely call $userOnline only on client
        if (this.$route.query.resend && this.$route.query.id) {
            this.resend = true
            console.log("id.resend")
            this.campaignDetails()
        }
        if (this.$route.query.id) {
            this.dynamicData.template_id = parseInt(this.$route.query.id);
        }
        if (process.client) {
            const nuxtApp = useNuxtApp();
            if (typeof nuxtApp.$userOnline === 'function') {
                nuxtApp.$userOnline();
            }
        }

        this.isClientReady = true;
        this.emaillist();
        this.parseTemplateData(); // You can keep your logic here
    },



    // computed: {
    //     currentTemplate() {
    //         let templateId = 1;

    //         if (this.$route.query.data) {
    //             try {
    //                 const parsedData = JSON.parse(this.$route.query.data); // <--- FIXED
    //                 templateId = parseInt(parsedData.template_id, 10);
    //             } catch (e) {
    //                 console.error("Error parsing template data:", e);
    //             }
    //         } else if (this.$route.query.id) {
    //             templateId = parseInt(this.$route.query.id, 10);
    //         }

    //         if (isNaN(templateId)) templateId = 1;

    //         return this.templates[templateId - 1] || this.templates[0];
    //     },

    //     currentTemplateId() {
    //         let templateId = 1;

    //         if (this.$route.query.data) {
    //             try {
    //                 const parsedData = JSON.parse(this.$route.query.data); // <--- FIXED
    //                 templateId = parseInt(parsedData.template_id, 10);
    //                 console.log("templateId",templateId)
    //             } catch (e) {
    //                 console.error("Error parsing template_id:", e);
    //             }
    //         } else if (this.$route.query.id) {
    //             templateId = parseInt(this.$route.query.id, 10);
    //         }

    //         return isNaN(templateId) ? 1 : templateId;
    //     }
    // },


    // computed: {
    //     currentTemplate() {
    //         let templateId = 1;
    //         try {
    //             if (this.$route.query.data) {
    //                 const parsed = JSON.parse(decodeURIComponent(this.$route.query.data));
    //                 templateId = parseInt(parsed.template_id, 10);
    //             } else if (this.$route.query.id) {
    //                 templateId = parseInt(this.$route.query.id, 10);
    //             }
    //         } catch (e) {
    //             console.error("Failed to determine currentTemplate:", e);
    //         }

    //         return this.templates[templateId - 1] || this.templates[0];
    //     },
    //     currentTemplateId() {
    //         let templateId = 1;
    //         try {
    //             if (this.$route.query.data) {
    //                 const parsed = JSON.parse(decodeURIComponent(this.$route.query.data));
    //                 templateId = parseInt(parsed.template_id, 10);
    //             } else if (this.$route.query.id) {
    //                 templateId = parseInt(this.$route.query.id, 10);
    //             }
    //         } catch (e) {
    //             console.error("Failed to determine currentTemplateId:", e);
    //         }
    //         return isNaN(templateId) ? 1 : templateId;
    //     }
    // },


    computed: {
        currentTemplate() {
            let templateId = 1;
            try {


                if (this.$route.query.data) {
                    const parsed = JSON.parse(decodeURIComponent(this.$route.query.data));
                    templateId = parseInt(parsed.template_id, 10);
                }
                else if (this.$route.query.resend && this.dynamicData.template_id) {
                    templateId = Number(this.dynamicData.template_id);
                }
                else if (this.$route.query.id) {
                    templateId = parseInt(this.$route.query.id, 10);
                }
            } catch (e) {
                console.error("Failed to determine currentTemplate:", e);
            }

            return this.templates[templateId - 1] || this.templates[0];
        },
        currentTemplateId() {
            let templateId = 1;
            try {
                if (this.$route.query.data) {
                    const parsed = JSON.parse(decodeURIComponent(this.$route.query.data));
                    templateId = parseInt(parsed.template_id, 10);
                } else if (this.$route.query.resend && this.dynamicData.template_id) {
                    templateId = Number(this.dynamicData.template_id);
                }
                else if (this.$route.query.id) {
                    templateId = parseInt(this.$route.query.id, 10);
                }
            } catch (e) {
                console.error("Failed to determine currentTemplateId:", e);
            }
            return isNaN(templateId) ? 1 : templateId;
        }
    },
    methods: {
        async emaillist() {
            try {
                const res = await subadminGet(`/email-setting`);
                this.emaillists = res.data.leadstatus.filter(e => e.status === 'Success');
            } catch (error) {
                console.error("Error fetching email list", error);
            }
        },
        async campaignDetails() {
            const res = await subadminGet(`/email-campaign-list/${this.$route.query.id}`)
            const data = res.data.data
            this.campaignDetail = data
            this.dynamicData = {
                ...this.dynamicData,
                template_id: data.template_id.template_id || '',
                image: data.template_id.image || '',
                logo: data.template_id.logo || '',
                logo_file_name: data.template_id.logo_file_name || '',
                title: data.template_id.title || '',
                image_file_name: data.template_id.image_file_name || '',
                titleColor: data.template_id.titleColor || '#DC2626',
                body: data.template_id.body || '', // ✅ Just store it here
                footerText: data.template_id.footerText || '',
                bgColor: data.template_id.bgColor || '#DC2626',
                ctaText: data.template_id.ctaText || '',
                template_tag: data.template_id.template_tag || '',
                ctaLink: data.template_id.ctaLink || '',
                headerBorder: data.template_id.headerBorder || '#eb1000',
                ctaColor: data.template_id.ctaColor || '#ff5757',
                scheduleDate: data.scheduleDate,
                scheduleTime: data.scheduleTime,
                htmlContent: data.template_id.htmlContent || '',
                _id: data.template_id._id || '',
            };
            this.isScheduled = data.isSchedule
            console.log("data", this.dynamicData)
        },
        async updateDetailsResend() {
            this.showCampaignDialog = true
        },
        async resendCampaign() {
            if (!this.campaignDetail.campaign_name) {
                return errorAlert("campaignName is required")
            }
            if (!this.campaignDetail.sender_email) {
                return errorAlert("Sender Id is required")
            }
            const payload = {
                templateData: this.dynamicData,
                campaign_name: this.campaignDetail.campaign_name,
                sender_email: this.campaignDetail.sender_email,
                group_id: this.campaignDetail.group_id || null,
                recipient: this.campaignDetail.recipient,
                contact_list_rejected_id: this.campaignDetail.contact_list_rejected_id,
                isSchedule: this.campaignDetail.isScheduled,
                scheduleDate: this.campaignDetail.scheduleDate,
                scheduleTime: this.campaignDetail.scheduleTime,
                template_id: this.campaignDetail.template_id._id,
                sourceType: this.campaignDetail.sourceType,
            }
            console.log(payload)
            const data = await subadminPost('/resend-create-campaign', payload)
            if (data.data.status) {
                this.showCampaignDialog = false
                successAlert("Resend Campaign sucessfully")
                this.$router.push("/subadmin/notification/emails/campaign/viewallcampaigns")
            }
        },

        initEditor(Quill) {
            this.quill = new Quill(this.$refs.qhtml, {
                theme: 'snow',
                modules: {
                    toolbar: true
                }
            });

            // Optional: Set initial content from parsed body
            if (this.dynamicData.body) {
                this.quill.root.innerHTML = this.dynamicData.body;
            }
        },
        parseTemplateData() {
            if (this.$route.query.id) {
                this.dynamicData.template_id = parseInt(this.$route.query.id);
            }
            if (this.$route.query.data) {
                try {
                    const parsed = JSON.parse(decodeURIComponent(this.$route.query.data));

                    this.dynamicData = {
                        ...this.dynamicData,
                        template_id: parsed.template_id || '',
                        image: parsed.image || '',
                        logo: parsed.logo || '',
                        logo_file_name: parsed.logo_file_name || '',
                        title: parsed.title || '',
                        image_file_name: parsed.image_file_name || '',
                        titleColor: parsed.titleColor || '#DC2626',
                        body: parsed.body || '', // ✅ Just store it here
                        footerText: parsed.footerText || '',
                        bgColor: parsed.bgColor || '#DC2626',
                        ctaText: parsed.ctaText || '',
                        ctaLink: parsed.ctaLink || '',
                        template_tag: parsed.template_tag || '',
                        headerBorder: parsed.headerBorder || '#eb1000',
                        ctaColor: parsed.ctaColor || '#ff5757',
                        scheduleDate: '',
                        scheduleTime: '',
                        htmlContent: parsed.htmlContent || '',
                        _id: parsed._id || '',
                    };

                    this.edit_id = parsed._id || '';
                    this.edit = !!this.$route.query.edit;

                    // ✅ Wait for DOM + Quill to mount
                    this.$nextTick(() => {
                        setTimeout(() => {
                            if (this.$refs.qhtml && parsed.body) {
                                this.$refs.qhtml.setHTML(parsed.body);
                            }
                        }, 100); // small delay to ensure <ClientOnly> is hydrated
                    });

                    console.log("Parsed data from query:", this.dynamicData);

                } catch (e) {
                    console.error("Failed to parse template data from query:", e);
                }
            }
        },


        updateHtml() {
            if (this.$refs.qhtml) {
                this.dynamicData.body = this.$refs.qhtml.getHTML();
            }
        },


        // ... keep your file upload methods here ...
        insertChip(key) {
            if (!key || !this.$refs.qhtml) return;
            const quill = this.$refs.qhtml.getQuill();
            const cursorPos = quill.getSelection()?.index || 0;
            quill.insertText(cursorPos, `{{${key}}}`);
            quill.setSelection(cursorPos + `{{${key}}}`.length);
        },


        handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.dynamicData.image = e.target.result;
                this.dynamicData.image_file_name = file.name;
            };
            reader.readAsDataURL(file);
        },
        handleLogoUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.dynamicData.logo = e.target.result;
                this.dynamicData.logo_file_name = file.name;
            };
            reader.readAsDataURL(file);
        },
        extractFileName(url) {
            if (url.startsWith('data:')) return 'uploaded_image.jpeg';
            return url.split('/').pop();
        },
        // publish() {
        //     if (!this.isScheduled) {
        //         this.dynamicData.scheduleDate = '';
        //         this.dynamicData.scheduleTime = '';
        //     }
        //     const previewHtml = this.$refs.preview.innerHTML;
        //     const prettyHtml = previewHtml.replace(/></g, '>\n<');
        //     console.log("Generated Preview HTML:\n", prettyHtml);
        // },
        // publish() {
        //     if (!this.isScheduled) {
        //         this.dynamicData.scheduleDate = '';
        //         this.dynamicData.scheduleTime = '';
        //     }


        //     const previewHtml = this.$refs.preview.innerHTML;

        //     const prettyHtml = previewHtml.replace(/></g, '>\n<');
        //     this.dynamicData.body = prettyHtml
        //     console.log("Generated Preview HTML:\n", prettyHtml);


        // },

        validateForm() {
            // Reset inline error state
            this.validationErrors = {
                logo: '',
                image: '',
                title: '',
                ctaText: '',
                ctaLink: '',
                template_tag: '',
                body: '',
                footerText: ''
            };

            const {
                logo,
                image,
                title = '',
                ctaText = '',
                ctaLink = '',
                template_tag = '',
                footerText = ''
            } = this.dynamicData;

            const templateId = this.currentTemplateId;
            //    return  console.log(templateId)
            const bodyHTML = this.$refs.qhtml?.getHTML?.() || '';
            const isBodyEmpty = !bodyHTML || bodyHTML.trim() === '' || bodyHTML.trim() === '<p><br></p>';
            this.dynamicData.body = bodyHTML;

            const errors = [];

            if (!logo) {
                errors.push("Logo is required.");
                this.validationErrors.logo = "Logo is required.";
            }
            if ((templateId === 1 || templateId === 2) && !image) {
                errors.push("Media is required for Template 1 and 2.");
                this.validationErrors.image = "Media is required.";
            }
            if (!title?.trim()) {
                errors.push("Main Title is required.");
                this.validationErrors.title = "Main Title is required.";
            }
            if (!ctaText?.trim()) {
                errors.push("CTA Text is required.");
                this.validationErrors.ctaText = "CTA Text is required.";
            }
            if (!ctaLink?.trim()) {
                errors.push("CTA Link is required.");
                this.validationErrors.ctaLink = "CTA Link is required.";
            }
            if (!template_tag?.trim()) {
                errors.push("Tag is required.");
                this.validationErrors.template_tag = "Tag is required.";
            }
            if (isBodyEmpty) {
                errors.push("Body Text is required.");
                this.validationErrors.body = "Body Text is required.";
            }
            if ((templateId === 2 || templateId === 3 || templateId === 4) && !footerText?.trim()) {
                errors.push("Footer Text is required.");
                this.validationErrors.footerText = "Footer Text is required.";
            }

            if (errors.length > 0) {
                errorAlert(errors.join('\n')); // keep this!
                return false;
            }

            return true;
        },
        async publish() {
            if (!this.validateForm()) {
                return;
            }
            if (!this.isScheduled) {
                this.dynamicData.isScheduled = this.isScheduled,
                    this.dynamicData.scheduleDate = '';
                this.dynamicData.scheduleTime = '';
            }
            if (this.isScheduled) {
                this.dynamicData.isScheduled = this.isScheduled,
                    this.dynamicData.scheduleDate = this.dynamicData.scheduleDate
                this.dynamicData.scheduleTime = this.dynamicData.scheduleTime
            }

            const timestamp = Date.now();

            // Upload logo if needed
            if (this.dynamicData.logo?.startsWith('data:')) {
                const logoUrl = await uploadImageAdminE2(this.dynamicData.logo, `logo_${timestamp}`);
                this.dynamicData.logo = logoUrl;
            }

            // Upload image if needed
            if (this.dynamicData.image?.startsWith('data:')) {
                const imageUrl = await uploadImageAdminE2(this.dynamicData.image, `image_${timestamp}`);
                this.dynamicData.image = imageUrl;
            }

            // Extract raw HTML from preview
            let html = this.$refs.preview.innerHTML;
            console.log(html)
            // Replace base64 inline <img> tags in HTML body
            const base64Images = [...html.matchAll(/<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g)];

            for (let i = 0; i < base64Images.length; i++) {
                const base64 = base64Images[i][1];
                const url = await uploadImageAdminE2(base64, `body_img_${timestamp}_${i}`);
                html = html.replace(base64, url);
            }

            // OPTIONAL: Inject actual static values (if you want to avoid {{}} placeholders)
            // html = html.replaceAll('{{name}}', this.dynamicData.name || '');
            // html = html.replaceAll('{{companyName}}', this.dynamicData.companyName || '');

            // Finally set the processed HTML as `body`this.dyn
            this.dynamicData.htmlContent = html;
            if (this.editorInstance) {
                this.dynamicData.body = this.editorInstance.root.innerHTML;
            }
            console.log("html", this.dynamicData.htmlContent)
            // Submit to backend



            // if (this.edit) {
            //     const res = await adminPatch(`/email-template/${this.edit_id}`, this.dynamicData)
            //     if (res.status === true) {
            //         successAlert("Template edit successfully");
            //         // this.resetForm();
            //         // this.$router.push({
            //         //     path: '/admin/notification/emails/templatelibrary/templates'
            //         // });
            //     }
            // } else {
            //     const res = await adminPost("/email-template", this.dynamicData)
            //     if (res.status === true) {
            //         successAlert("Template added successfully");
            //         // this.resetForm();
            //         // this.$router.push({
            //         //     path: '/admin/notification/emails/templatelibrary/templates'
            //         // });
            //     }
            // }
            console.log("under preview", this.dynamicData)
            this.$emit('proceed', this.dynamicData)


            // await axios.post('/api/save-template', this.dynamicData);
        },
        async submitEmail() {
            if (!this.validateForm()) {
                return;
            }
            this.loadingUpload = true;
            try {
                if (this.testEmail) {
                    console.log('Submitted Email:', this.testEmail, this.email);


                    let data = {
                        senderEmail: this.senderEmail,
                        receiverEmail: this.testEmail,
                        subject: this.dynamicData.title,
                        htmlContent: this.dynamicData.htmlContent,
                        dynamicData: {
                            name: " test user",
                            companyName: "test company",
                            phone: "XXXXXXXXXX",
                            email: "testuser@gmail.com",
                        }
                    }
                    if (this.$route.query.id) {
                        data.htmlContent = this.$refs.preview.innerHTML
                        const timestamp = Date.now();
                        const base64Images = [...data.htmlContent.matchAll(/<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g)];

                        for (let i = 0; i < base64Images.length; i++) {
                            const base64 = base64Images[i][1];
                            const url = await uploadImageAdminE2(base64, `body_img_${timestamp}_${i}`);
                            data.htmlContent = data.htmlContent.replace(base64, url);
                        }

                    }
                    console.log(data.htmlContent)
                    const sendEmaildata = await subadminPost("/send-test-email", data)
                    if (sendEmaildata.data.status) {
                        successAlert("Successfully send the test email");
                        this.showDialog = false;
                    } else {
                        errorAlert("Something went wrong!")
                    }
                }
            } catch (error) {
                console.log(error)
                errorAlert("Something went wrong!")
            }
            this.loadingUpload = false;

        },

    }

};
</script>
<style scoped>
.p-inputtext {
    box-shadow: 0 0 0;
}

input[type='text'] {
    border-radius: 12px;
    padding: 17px 19px;
}

.left-editor {
    width: 41%;
    padding-left: 28px;
    padding-right: 28px;
}

.right-editor {
    width: 59%;
}

.compiler {
    flex-direction: row;

}

@media(max-width:1584px) {
    .left-editor {
        width: 35%;
        padding-left: 18px;
        padding-right: 18px;

    }

    .right-editor {
        width: 65%;
    }
}

@media (max-width: 1400px) {

    .left-editor,
    .right-editor {
        width: 100%;
    }

    .compiler {
        flex-direction: column;
        align-items: center;
    }
}
</style>
