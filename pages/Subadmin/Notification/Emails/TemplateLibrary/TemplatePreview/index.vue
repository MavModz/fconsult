<template>
    <div class="flex justify-end  text-[#ff5757] ">
        <span class="bg-[#FF57571A] rounded-full px-[16px]  font-semibold text-[15px] py-[7px]">EMAIL</span>
    </div>
    <div class="mt-3 min-h-screen mb-3 pb-3 flex justify-center items-start">
        <div class="w-full compiler  flex justify-center xl:gap-5 2xl:gap-6">
            <div
                class="left-editor mb-3  max-w-[770px] py-[43px]  rounded-[12px] border-[2px] border-[#EDEDED] bg-[#ffffff]">
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
                    <label class="block text-[17px] text-[#1C1C1E] font-medium mb-1">Media</label>
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
                        <label class=" text-[#1C1C1E] required">CTA Text</label>
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
                    <p v-if="validationErrors.template_tag" class="text-red-500 text-sm mt-1">{{ validationErrors.template_tag}}
                    </p>
                </div>
                <div class="mb-3">
                    <label class="block text-[17px]  text-[#1C1C1E] font-medium mb-1 required">Body Text</label>
                    <div class="study-visa-description-block">
                        <QuillEditor ref="qhtml" :modules="modules" class="mb-4" style="height:150px"
                            @text-change="updateHtml" />
                        <p v-if="validationErrors.body" class="text-red-500 text-sm mt-1">{{ validationErrors.body }}
                        </p>
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
                    <label class="block text-[17px]  text-[#1C1C1E] font-medium mb-1 required">Footer Text</label>
                    <textarea v-model="dynamicData.footerText" rows="3" class="border rounded w-full p-2"></textarea>
                    <p v-if="validationErrors.footerText" class="text-red-500 text-sm mt-1">{{
                        validationErrors.footerText }}</p>
                </div>
                <button v-if="edit" @click="publish"
                    class="w-full p-[14px] rounded-[4px] text-[#FF5757] mt-4 text-[19px] font-semibold bg-[#FF57571A]  flex items-center justify-center gap-2">
                    Edit
                    <i class="bi bi-send"></i>
                </button>
                <button v-else @click="publish"
                    class="w-full p-[14px] rounded-[4px] text-[#FF5757] mt-4 text-[19px] font-semibold bg-[#FF57571A]  flex items-center justify-center gap-2">
                    Publish
                    <i class="bi bi-send"></i>
                </button>
            </div>
            <div class="right-editor max-w-[770px]">
                <div class="p-[35px]   md:px-[16px] rounded-[12px] border-[2px] border-[#ededed] bg-white">
                    <div class="pb-6 border-b-[2px] border-[#ededed] mb-4 flex justify-between">
                        <h2 class="text-[20px] font-semibold text-[#282823] ">Preview</h2>
                        <span @click="this.showDialog = true"
                            class="border-[1px] text-[#ff5757] font-semibold rounded-full cursor-pointer border-[#ff5757] py-[6px] px-[12px]">Send
                            test Email</span>
                    </div>
                    <div ref="preview" class="bg-[#f7f5fe]  xl:px-3 xl:py-5 md:px-2 md:py-4">
                        <component :is="currentTemplate.component" :data="dynamicData" companyName="Your Company Name" />
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
                    <!-- <Button label="Submit" type="submit"
                        class="bg-[#ff5757] text-[#ffffff] text-[17px] rounded-lg py-[10px] w-[30%] px-3" /> -->
                    <Button :disabled="loadingUpload" type="submit"
                        class="w-[30%] bg-[#FF5757] text-white  py-[10px] rounded-lg px-3  flex justify-center items-center">
                        <span v-if="!loadingUpload">Submit</span>
                        <span v-else>
                            <i class="pi pi-spinner pi-spin mr-2"></i>Submitting...
                        </span>
                    </Button>
                    <Button label="Cancel" @click="showDialog = false"
                        class="bg-[#ffffff] text-gray-600 border rounded-lg w-[30%] py-[10px] px-3" />
                </div>
            </div>
        </form>
    </Dialog>
</template>
<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import TemplateOne from "../Components/TemplateOne.vue";
import TemplateTwo from "../Components/TemplateTwo.vue";
import TemplateThree from '../Components/TemplateThree.vue';
import TemplateFour from '../Components/TemplateFour.vue';
export default {
    components: {
        QuillEditor,
    },
    name: "BuilderPage",
    data() {
        return {
            emaillists: [],
            senderEmail: '',
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
                template_tag:"",
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
            edit: false,
            edit_id: null,
            showDialog: false,
            testEmail: '',
            editorInstance: null,
        };
    },
    mounted() {
        this.emaillist();
        console.log("query", this.$route.query.data);
        if (this.$route.query.data) {
            try {
                const parsed = JSON.parse(this.$route.query.data);
                this.dynamicData = {
                    ...this.dynamicData,
                    template_id: parsed.template_id || '',
                    image: parsed.image || '',
                    logo: parsed.logo || '',
                    logo_file_name: parsed.logo_file_name || '',
                    title: parsed.title || '',
                    image_file_name: parsed.image_file_name || '',
                    titleColor: parsed.titleColor || '#DC2626',
                    body: this.$refs.qhtml.setHTML(parsed.body) || '',
                    footerText: '',
                    bgColor: parsed.bgColor || '#DC2626',
                    ctaText: parsed.ctaText || '',
                    template_tag: parsed.template_tag || '',
                    ctaLink: parsed.ctaLink || '',
                    headerBorder: parsed.headerBorder || '#eb1000',
                    ctaColor: parsed.ctaColor || '#ff5757',
                    scheduleDate: '',
                    scheduleTime: '',
                    htmlContent: parsed.htmlContent || '',
                };
                this.edit_id = parsed._id
                console.log("data", this.dynamicData)
            } catch (e) {
                console.error("Failed to parse template data from query:", e);
            }
        }
        if (this.$route.query.edit) {
            this.edit = true
        }
    },
    computed: {
        currentTemplate() {
            let templateId = 1;
            if (this.$route.query.data) {
                try {
                    const parsedData = JSON.parse(this.$route.query.data); // <--- FIXED
                    templateId = parseInt(parsedData.template_id, 10);
                } catch (e) {
                    console.error("Error parsing template data:", e);
                }
            } else if (this.$route.query.id) {
                templateId = parseInt(this.$route.query.id, 10);
            }
            if (isNaN(templateId)) templateId = 1;
            return this.templates[templateId - 1] || this.templates[0];
        },
        currentTemplateId() {
            let templateId = 1;
            if (this.$route.query.data) {
                try {
                    const parsedData = JSON.parse(this.$route.query.data); // <--- FIXED
                    templateId = parseInt(parsedData.template_id, 10);
                } catch (e) {
                    console.error("Error parsing template_id:", e);
                }
            } else if (this.$route.query.id) {
                templateId = parseInt(this.$route.query.id, 10);
            }
            return isNaN(templateId) ? 1 : templateId;
        }
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.testEmail = '';
                this.senderEmail = '';
            }
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
        async submitEmail() {
            if (!this.validateForm()) {
                return;
            }
            this.loadingUpload = true;
            try {
                if (this.testEmail) {
                    console.log('Submitted Email:', this.testEmail, this.email);
                    let html = this.$refs.preview.innerHTML;
                    const timestamp = Date.now();
                    const base64Images = [...html.matchAll(/<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g)];
                    for (let i = 0; i < base64Images.length; i++) {
                        const base64 = base64Images[i][1];
                        const url = await uploadImageAdminE2(base64, `body_img_${timestamp}_${i}`);
                        html = html.replace(base64, url);
                    }
                    this.dynamicData.htmlContent = html;
                    console.log("html", html)
                    const data = {
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
                    console.log("datra", data)
                    const sendEmaildata = await subadminPost("/send-test-email", data)
                    if (sendEmaildata.data.status) {
                        successAlert("Successfully sent the test email");
                        this.showDialog = false;
                    } else {
                        errorAlert("Something went wrong!");
                    }
                }
            } catch (error) {
                console.log(error)
                errorAlert("Something went wrong!");
            }
            this.loadingUpload = false;
        },
        updateHtml() {
            if (this.$refs.qhtml) {
                this.dynamicData.body = this.$refs.qhtml.getHTML();
            }
        },
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
        validateForm() {
            this.validationErrors = {
                logo: '',
                image: '',
                title: '',
                ctaText: '',
                ctaLink: '',
                template_tag : '',
                body: '',
                footerText: ''
            };
            const {
                logo,
                image,
                title = '',
                ctaText = '',
                ctaLink = '',
                footerText = '',
                template_tag = ''
            } = this.dynamicData;
            const templateId = this.currentTemplateId;
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
            
            else {
                const urlPattern = new RegExp(
                    '^(https?:\\/\\/)' + // protocol (required)
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*))\\.)+[a-z]{2,}' + // domain
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port/path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i' // fragment
                );
                if (!urlPattern.test(ctaLink)) {
                    errors.push("CTA Link must be a valid URL (e.g., https://example.com).");
                    this.validationErrors.ctaLink = "CTA Link must be a valid URL.";
                }
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
            console.log("hello" , this.dynamicData)
            console.log("validation result:", this.validateForm());
            if (!this.isScheduled) {
                this.dynamicData.scheduleDate = '';
                this.dynamicData.scheduleTime = '';
            }
            const timestamp = Date.now();
            if (this.dynamicData.logo?.startsWith('data:')) {
                const logoUrl = await uploadImageAdminE2(this.dynamicData.logo, `logo_${timestamp}`);
                this.dynamicData.logo = logoUrl;
            }
            if (this.dynamicData.image?.startsWith('data:')) {
                const imageUrl = await uploadImageAdminE2(this.dynamicData.image, `image_${timestamp}`);
                this.dynamicData.image = imageUrl;
            }
            let html = this.$refs.preview.innerHTML;
            const base64Images = [...html.matchAll(/<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g)];
            for (let i = 0; i < base64Images.length; i++) {
                const base64 = base64Images[i][1];
                const url = await uploadImageAdminE2(base64, `body_img_${timestamp}_${i}`);
                html = html.replace(base64, url);
            }
            this.dynamicData.htmlContent = html;
           
                
            if (this.edit) {
                const res = await subadminPatch(`/email-template/${this.edit_id}`, this.dynamicData)
                if (res.status === true) {
                    successAlert("Template edit successfully");

                    this.$router.push({
                        path: '/subadmin/notification/emails/templatelibrary/templates'
                    });
                }
            } else {
                const res = await subadminPost("/email-template", this.dynamicData)
                if (res.status === true) {
                    successAlert("Template added successfully");

                    this.$router.push({
                        path: '/subadmin/notification/emails/templatelibrary/templates'
                    });
                }
            }
            console.log('Final Data to Save:', this.dynamicData);
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
@media(max-width:1584px){
    .left-editor {
    width: 35% ;
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
