<template>
    <div class="document-card col-xl-3">
        <!-- Header Section -->
        <div class="d-flex gap-2 flex-col">
            <div class="card-left-heading flex  align-items-center justify-content-between gap-2">
                <h5>{{ getSlicedContent(cardTitle,15) }}</h5>
                <!-- <p>{{ companyName }} • <span>{{ cardStatus }}</span></p> -->
                <span class="light-cool-grey">{{ getSlicedContent(documentCategory,12) }}</span>
            </div>
            <p>{{ Date }} • <span
                    :class="{ 'status-shared': documentData.is_shared, 'status-requested': !documentData.is_shared }">
                    {{ dynamicStatus }}
                </span></p>

        </div>

        <!-- Actions Section -->
        <div class="d-flex items-center justify-content-between gap-2 py-3">
            <div class="flex flex-wrap gap-2 justify-between w-full">
                <button icon="pi pi-arrow-left" class="light-grey" @click="openUploadSidebar">
                    <NuxtImg src="/img/svg/editz.svg" />
                    <span class="cursor-pointer">{{ documentData.is_shared ? 'Update' : 'Upload' }}</span>
                </button>
                <button icon="pi pi-arrow-left" class="light-grey" @click="manageAccess"
                    :disabled="!documentData.is_shared">
                    <span>Revoke Access</span>
                </button>
            </div>
        </div>

        <!-- Footer Section -->
        <div class="d-flex justify-content-between align-items-center gap-2 pt-lg-2">
            <!-- <span class="light-cool-grey"><span>{{ documentCategory }}</span></span> -->
            <span class="light-red"><span>{{ getSlicedContent(companyName,15) }}</span></span>
            <a class="underline" @click="viewComment">View Comment</a>
        </div>
    </div>
</template>

<script>

import { revokeDoc } from '~/utils/libs/services/api';

export default {
    props: {
        cardTitle: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        cardStatus: {
            type: String,
            required: true
        },
        Date: {
            type: String,
            required: true,
        },
        documentCategory: {
            type: String,
            required: true,
        },
        documentData: {
            type: Object,
            required: true, // The complete document data passed from the parent
        },
    },
    data() {
        return {
            isProcessing: false, // Loading state for API call
            uploadDone: false
        };
    },
    computed: {
        // Compute the status dynamically
        dynamicStatus() {
            return this.documentData.is_shared ? "Shared" : "Requested";
        }
    },
    methods: {
        // Triggered when the user clicks the "Update" button
        openUploadSidebar() {
            this.$emit("uploadDocument", this.documentData); // Emit the documentData to the parent
            this.uploadDone=true
        },

        // Triggered when the user clicks the "Access" button
        async manageAccess() {
            if (!this.documentData.is_shared) {
                console.error("Access cannot be revoked as the document is not uploaded!");
                return;
            }

            this.isProcessing = true; // Set the loading state
            try {
                const response = await revokeDoc(this.documentData._id); // Call the API with the document ID

                if (response?.status) {
                    this.documentData.is_shared = false; // Update the status locally
                    this.$emit("documentUpdated", this.documentData); // Emit the updated document
                    successAlert("Access revoked successfully!");
                } else {
                    console.error("Failed to revoke access:", response?.msg || "Unknown error");
                    errorAlert(response?.msg || "Failed to revoke access.");
                }
            } catch (error) {
                console.error("Error revoking access:", error);
                errorAlert("An error occurred while revoking access. Please try again.");
            } finally {
                this.isProcessing = false; // Reset the loading state
            }
        },


        // Triggered when the user clicks the "Delete" button
        deleteDocument() {
            this.$emit('DocumentDeleted', this.documentData._id);
        },

        viewComment() {
            this.$emit('viewComment', this.documentData);
        }
    },
};
</script>

<style>
@import url('style.css');
</style>