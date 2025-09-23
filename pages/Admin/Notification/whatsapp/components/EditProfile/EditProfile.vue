<template>
    <Dialog v-model:visible="dialogVisible" modal header="Edit Profile" :style="{ 'width': '750px' }"
        :draggable="false">
        <div class="profile-picture-container mb-3">
            <h6 class="edit-profile-title">Profile Picture</h6>
            <ul class="profile-field-requirement">
                <li>• Max size of 5MB allowed.</li>
                <li>• Image size of 640x640 is recommended.</li>
                <li>• Images with a height or width of less than 192px may cause issues.</li>
            </ul>
            <div class="profile-image-wrapper">
                <input ref="fileInput" type="file" accept=".jpg,.jpeg" @change="handleImageUpload"
                    style="display: none;" />
                <img v-if="previewImage" :src="previewImage" alt="Profile Preview" width="55" height="55"
                    class="rounded-full" />
                <img v-else-if="form.profile" :src="form.profile" alt="Profile Image" width="55" height="55"
                    class="rounded-full" />
                <img v-else src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    width="55" height="55" alt="Default Profile" class="rounded-full" />
                <button class="profile-img-change" @click="triggerFileInput">Change</button>
                <button class="profile-img-remove" @click="removeImage" v-if="previewImage">Remove</button>
            </div>
        </div>
        <div class="edit-profile-details-container grid gap-2 sm:gap-5">
            <div class="description-wrapper">
                <h6 class="edit-profile-title">Decription</h6>
                <ul class="profile-field-requirement">
                    <li>• Description of the business.</li>
                    <li>• Maximum of 256 characters.</li>
                </ul>
                <input type="text" v-model="form.about">
            </div>
            <div class="address-wrapper">
                <h6 class="edit-profile-title">Address</h6>
                <ul class="profile-field-requirement">
                    <li>• Address of the business.</li>
                    <li>• Maximum of 256 characters.</li>
                </ul>
                <input type="text" v-model="form.address">
            </div>
            <div class="email-wrapper">
                <h6 class="edit-profile-title">Email</h6>
                <ul class="profile-field-requirement">
                    <li>• Email address to contact the business.</li>
                </ul>
                <input type="text" v-model="form.email">
            </div>
            <div class="vertical-wrapper">
                <h6 class="edit-profile-title">Vertical</h6>
                <ul class="profile-field-requirement">
                    <li>• Industry of the business.</li>
                </ul>
                <select v-model="form.vertical">
                    <option disabled value="">Select an industry</option>
                    <option v-for="option in verticalOptions" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
            </div>
            <div class="website-wrapper">
                <h6 class="edit-profile-title">Websites</h6>
                <ul class="profile-field-requirement">
                    <li>• URLs (including http:// or https://) associated with the business (e.g., website, Facebook
                        Page, Instagram).</li>
                    <li>• Maximum of 2 websites with a maximum of 256 characters each.</li>
                </ul>
                <div v-for="(website, idx) in form.websites" :key="idx" class="website-input-row"
                    style="display: flex; align-items: center; gap: 8px;">
                    <input type="text" v-model="form.websites[idx]"
                        :placeholder="idx === 0 ? 'Website (required)' : 'Website (optional)'" maxlength="256"
                        style="flex: 1;" />
                    <button v-if="form.websites.length === 1 && idx === 0" type="button" @click="addWebsite"
                        style="background: none; border: none; font-size: 20px; cursor: pointer;"
                        title="Add another website">+</button>
                    <button v-if="form.websites.length > 1" type="button" @click="removeWebsite(idx)"
                        style="background: none; border: none; font-size: 20px; color: red; cursor: pointer;"
                        title="Remove this website">&#x2715;</button>
                </div>
            </div>
        </div>
        <div class="edit-profile-footer">
            <button class="profile-img-remove" @click="dialogVisible = false">Cancel</button>
            <button class="profile-img-change" @click="updateWabaProfile()">Save</button>
        </div>
    </Dialog>
</template>

<script>
export default {
    name: "EditProfile",
    props: {
        modelValue: Boolean,
        phoneNumberId: {
            type: String,
            required: true
        },
        longToken: {
            type: String,
            required: true
        },
        appId: {
            type: String,
            required: true
        },
        businessProfile: {
            type: Object,
            required: false,
            default: () => ({}),
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            }
        }
    },

    data() {
        return {
            form: {
                profile_handle: '',
                about: '',
                address: '',
                email: '',
                vertical: '',
                websites: ['']
            },
            initialForm: {
                profile_handle: '',
                about: '',
                address: '',
                email: '',
                vertical: '',
                websites: ['']
            },
            selectedFile: null,
            previewImage: null,
            whatsappBusinessPofileData: null,
            profileHandle: null,
            verticalOptions: ['OTHER', 'AUTO', 'BEAUTY', 'APPAREL', 'EDU', 'ENTERTAINMENT', 'EVENT_PLAN', 'FINANCE', 'GROCERY', 'GOVT', 'HOTEL', 'HEALTH', 'NONPROFIT', 'PROF_SERVICES', 'RETAIL', 'TRAVEL', 'RESTAURANT']
        }
    },

    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        removeImage() {
            this.selectedFile = null;
            this.previewImage = null;
        },
        async handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // File type validation
            if (!file.type.startsWith("image/jpeg")) {
                return alert("Only JPG/JPEG images are allowed.");
            }

            // File size validation
            if (file.size > 5 * 1024 * 1024) {
                return alert("Max file size is 5MB.");
            }

            this.selectedFile = file;
            this.previewImage = URL.createObjectURL(file);

            const fileName = file.name;
            const fileLength = file.size;
            const fileType = file.type;
            try {
                const accessToken = this.longToken;

                const response = await fetch(
                    `https://graph.facebook.com/v20.0/${this.appId}/uploads` +
                    `?file_name=${encodeURIComponent(fileName)}` +
                    `&file_length=${fileLength}` +
                    `&file_type=${encodeURIComponent(fileType)}` +
                    `&access_token=${encodeURIComponent(accessToken)}`,
                    {
                        method: 'POST'
                    }
                );

                const result = await response.json();
                if (result.id) {
                    const sessionId = result.id;
                    const base64Data = await this.fileToBase64(file);
                    const uploadResponse = await adminPost(
                        '/whatsapp-profile-upload',
                        {
                            sessionId: sessionId,
                            accessToken: accessToken,
                            fileData: base64Data,
                            fileName: fileName
                        }
                    );

                    if (uploadResponse.data.status = true) {
                        const profile_handle_id = uploadResponse?.data?.data?.h
                        this.form.profile_handle = profile_handle_id
                    } else {
                        errorAlert("Failed to upload profile picture: " + uploadResponse.data.message);
                    }
                } else {
                    console.error("Upload session failed:", result);
                    alert("Failed to create upload session");
                }
            } catch (error) {
                console.error("Error during image upload:", error);
                alert("Error uploading image: " + error.message);
            }
        },
        // async fetchWabaProfile() {
        //     try {
        //         const response = await fetch(
        //             `https://graph.facebook.com/v20.0/${this.phoneNumberId}/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`,
        //             {
        //                 method: "GET",
        //                 headers: {
        //                     Authorization: `Bearer ${this.longToken}`,
        //                 },
        //             }
        //         );
        //         const result = await response.json();
        //         this.whatsappBusinessPofileData = result.data?.[0] || {};
        //         this.form.profile = this.whatsappBusinessPofileData.profile_picture_url || '';
        //         this.form.about = this.whatsappBusinessPofileData.about || '';
        //         this.form.address = this.whatsappBusinessPofileData.address || '';
        //         this.form.email = this.whatsappBusinessPofileData.email || '';
        //         this.form.vertical = this.whatsappBusinessPofileData.vertical || '';
        //         this.form.websites = this.whatsappBusinessPofileData.websites || [];
        //     } catch (error) {
        //         console.error("Error Fetching WhatsApp Business Profile: ", error);
        //         errorAlert("Error fetching Business Profile");
        //     }
        // },
        addWebsite() {
            if (this.form.websites.length < 2) {
                this.form.websites.push('');
            }
        },
        removeWebsite(idx) {
            if (this.form.websites.length > 1) {
                this.form.websites.splice(idx, 1);
            }
        },

        hasFormChanged() {
            // Check if any form field has changed
            const fieldsToCheck = ['about', 'address', 'email', 'vertical', 'profile_handle'];
            
            for (let field of fieldsToCheck) {
                if (this.form[field] !== this.initialForm[field]) {
                    return true;
                }
            }
            
            // Check websites array
            if (JSON.stringify(this.form.websites) !== JSON.stringify(this.initialForm.websites)) {
                return true;
            }
            
            // Check if a new image was uploaded
            if (this.selectedFile || this.previewImage) {
                return true;
            }
            
            return false;
        },

        async updateWabaProfile() {
            // Check if there are any changes before making API call
            if (!this.hasFormChanged()) {
                // No changes detected, just close the dialog
                this.dialogVisible = false;
                return successAlert("WhatsApp Business Profile Updated");
            }

            try {
                const payload = new URLSearchParams();
                payload.append('messaging_product', 'whatsapp');
                payload.append('about', this.form.about || '');
                payload.append('address', this.form.address || '');
                payload.append('email', this.form.email || '');
                payload.append('vertical', this.form.vertical || '');
                if (Array.isArray(this.form.websites)) {
                    this.form.websites.forEach((site, index) => {
                        if (site) payload.append(`websites[${index}]`, site);
                    });
                }
                if (this.form?.profile_handle) {
                    payload.append('profile_picture_handle', this.form.profile_handle);
                }
                await fetch(
                    `https://graph.facebook.com/v20.0/${this.phoneNumberId}/whatsapp_business_profile`,
                    {
                        method: 'POST',
                        body: payload,
                        headers: {
                            Authorization: `Bearer ${this.longToken}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );
                successAlert("WhatsApp Business Profile Updated");
                this.resetForm();
                this.dialogVisible = false;
                this.$emit('profileUpdated');
            } catch (error) {
                console.log("Error updating Profile: ", error);
                errorAlert("Error updating Profile");
            }
        },

        resetForm() {
            this.form = {
                profile_handle: '',
                about: '',
                address: '',
                email: '',
                vertical: '',
                websites: [''],
            };
            this.selectedFile = null;
            this.previewImage = null;
        },

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },
    },

    watch: {
        modelValue(newVal) {
            if (newVal) {
                const data = this.businessProfile || {};
                this.form.profile = data.profile_picture_url || '';
                this.form.about = data.about || '';
                this.form.address = data.address || '';
                this.form.email = data.email || '';
                this.form.vertical = data.vertical || '';
                this.form.websites = data.websites && data.websites.length ? data.websites : [''];
                
                // Store initial form data for comparison
                this.initialForm = {
                    profile_handle: this.form.profile_handle,
                    about: this.form.about,
                    address: this.form.address,
                    email: this.form.email,
                    vertical: this.form.vertical,
                    websites: [...this.form.websites]
                };
            }
        }
    }
};
</script>

<style scoped>
.edit-profile-title {
    color: #4a4a4a;
    font-size: 16px;
    font-weight: 400;
}

.profile-field-requirement {
    padding: 0;
    color: #4a4a4a;
    font-size: 12px;
}

.profile-image-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
}

.profile-img-change,
.profile-img-remove {
    border: 1px solid #0A474C;
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 13px;
    font-weight: 500;
}

.profile-img-change {
    background-color: #0A474C;
    color: #fff;
}

.profile-img-remove {
    color: #0A474C;
}

.edit-profile-details-container {
 grid-template-columns: 1fr 1fr; 
    margin-bottom: 16px;
}

.edit-profile-details-container input,
.edit-profile-details-container select {
    outline: none;
    padding: 10px;
    background-color: #f0f0f0;
    font-size: 14px;
}

.edit-profile-footer {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: end;
}
@media (max-width:650px){
    .edit-profile-details-container {
 grid-template-columns: 1fr; 
}
}
</style>
