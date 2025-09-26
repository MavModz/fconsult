<template>
    <Sidebar :visible="visible" @update:visible="$emit('close')" header="Upload Document" position="right" class=""
        :style="{ width: '500px' }">
        <div class="update-events-1stfrm">
            <div class="update-events-1sttitle">
                <span class="update-events-titleedit">
                    <p>Document Title</p>
                </span>
            </div>
            <div class="update-events-1stdrop">
                <div class="mb-3">
                    <input type="text" id="update-event-selet" v-model="form.title" disabled />
                </div>
            </div>
        </div>

        <div class="upload-container">
            <label for="file-upload" class="upload-label">
                <NuxtImg src="/img/png/Rectangle 2758.png" alt=""  />
                <span>
                    <NuxtImg src="/img/svg/upload-doc.svg" alt="upload icon" width="65" height="65" />
                </span>
                <p v-if="fileName">{{ fileName }}</p>
                <p v-else>Upload Document</p>
                <input type="file" id="file-upload" accept="application/pdf" @change="handleFileChange" hidden />
            </label>
            <span v-if="errors.file" class="text-danger">{{ errors.file }}</span>
        </div>

        <div class="d-flex justify-content-between gap-2 pt-4">
            <button class="btn-white" @click="$emit('close')">Go Back</button>
            <button class="btn-red" type="submit" @click.prevent="validateAndSubmit" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true"></span>
                Upload
            </button>
        </div>
    </Sidebar>
</template>


<script>

import { uploadUserDoc } from '~/utils/libs/services/api';

export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        documentData: {
            type: Object,
            required: true, // Pass the full document data (or at least the title) from the card
        },
    },
    data() {
        return {
            form: {
                title: this.documentData?.name || '',
                // category: '',
                // shareWith: '',
            },
            selectedFile: null, // To store the selected file
            fileName: '', // To store the name of the uploaded file (string)
            fileUrl: null, // To store the uploaded file's URL
            errors: {}, // To store validation errors
            loading: false,
            ffileurl: null
        };
    },
    methods: {

        // Reset file-related states when sidebar is closed
        resetFileInput() {
            this.selectedFile = null;
            this.fileName = '';
            this.ffileurl = null;
            this.errors = {}; // Clear any errors
        },
        async handleFileChange(event) {
            const file = event.target.files[0];
            // Validate file type (only allow PDFs)
            if (file && file.type !== "application/pdf") {
                this.errors.file = "Only PDF files are allowed.";
                this.selectedFile = null;
                this.fileName = ''; // Reset fileName
                return;
            }

            this.ffileurl =file


            // Clear errors and set selected file details
            this.errors.file = null;
            this.selectedFile = file;
            this.fileName = file.name; // Set file name for display
        },

        async validateAndSubmit() {
            this.errors = {}; // Reset errors

            // Validate form fields
            if (!this.form.title) {
                this.errors.title = "Document title is required.";
            }
            if (!this.selectedFile) {
                this.errors.file = "Please upload a PDF document.";
            }

            // Stop if there are any validation errors
            if (Object.keys(this.errors).length > 0) return;
            this.loading = true;
            try {
                // Upload the file and get its URL
                // const fileUrl = await uploadFile("123", this.ffileurl)

                this.fileUrl = await uploadFileUserLeadE2(this.ffileurl, `${Date.now()}.${this.ffileurl.name.split('.').pop()}`);

                // Call the API to save document data in the database
                const response = await uploadUserDoc(
                    // this.form.title,
                    // this.form.category,
                    this.documentData._id,
                    { link: this.fileUrl, }
                );
                if (response?.status === true) {
                     successAlert("Document uploaded successfully ✅");
                    this.$emit("close"); // Close the sidebar
                    window.location.reload();
                } else {
                    console.error("Failed to save document:", response?.data || "Unknown error");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                this.errors.file = "Failed to upload the document. Please try again.";
            }
            finally {
                this.loading = false; // Stop spinner
            }
        },
    },
    watch: {
        documentData: {
            immediate: true, // Watch for changes in documentData
            handler(newValue) {
                if (newValue) {
                    this.form.title = newValue.name || ''; // Update the form title
                }
            },
        },
        visible(newValue) {
            if (!newValue) {
                // Reset file input when the sidebar is closed
                this.resetFileInput();
            }
        },
    },
};
</script>


<style>
@import url('style.css');
</style>