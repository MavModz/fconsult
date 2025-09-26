<template>
    <Sidebar :visible="visible" @update:visible="$emit('close')" header="Select Company" position="right" class=""
        :style="{ width: '550px' }">
        <div class="search-container mb-4" style="max-width: -webkit-fill-available">
            <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
            <input type="text" placeholder="Search Company" v-model="searchQuery" @input="filterCompanies"
                style="max-width: 90%" />
        </div>

        <div class="company-list">
            <div v-for="(company, index) in visibleCompanies" :key="company._id"
                class="d-flex justify-content-between gap-2 py-4">
                <div class="d-flex align-items-center gap-3">
                    <!-- Company Logo -->
                    <div>
                        <NuxtImg :src="company.symbol || 'https://via.placeholder.com/50'" width="50" height="50"
                            alt="company logo" class="rounded-full w-[50px] h-[50px] object-cover" />
                    </div>

                    <!-- Company Details -->
                    <div class="pyramid">
                        <h6>{{ company.company_name }}</h6>
                        <p>{{ company.address }}</p>
                    </div>

                    <!-- Checkbox -->
                    <Checkbox v-model="selectedCompanies" :inputId="'checkbox-' + company._id" :value="company._id" />
                </div>
            </div>
            <!-- Observer Element for Loading More -->
            <div ref="observer" class="observer"></div>
        </div>

        <!-- No Data State -->
        <p v-if="filteredCompanies.length === 0 && !loading" class="text-center">No companies found.</p>

        <!-- Fixed Footer -->
        <div class="fixed-footer">
            <button class="btn-white" @click="$emit('close')">Go Back</button>
            <button class="btn-red" :disabled="loading" @click="applyChanges">Apply Changes</button>
        </div>
    </Sidebar>
</template>

<script>
import { companyList, companyAccess, revokeCompanyAccess } from '~/utils/libs/services/api';

export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        documentTitle: {
            type: String,
            required: true,
        },
        documentLink: {
            type: String,
            required: true, // Add the document link as a prop
        }
    },
    data() {
        return {
            companies: [], // Full list of companies from API
            filteredCompanies: [], // Filtered companies
            visibleCompanies: [], // Currently visible companies for rendering
            searchQuery: "", // Search query for filtering
            selectedCompanies: [], // Array of selected companies
            batchSize: 10, // Number of companies to render at a time
            startIndex: 0, // Start index for visible companies
            loading: false, // Loading state
            observer: null, // IntersectionObserver instance
        }
    },
    async mounted() {
        // await this.fetchCompanyList();
        this.setupObserver();
    },
    methods: {
        // async fetchCompanyList() {
        //     if (!this.documentTitle) {
        //         errorAlert("No document title provided to fetch company list!");
        //         return;
        //     }
        //     this.loading = true;
        //     try {
        //         const response = await companyList(this.documentTitle);
        //         if (response?.status === true) {
        //             this.companies = response.data;
        //             this.selectedCompanies = this.companies
        //                 .filter((company) => company.status === true)
        //                 .map((company) => company._id);
        //             this.filteredCompanies = [...this.companies];
        //             this.visibleCompanies = this.filteredCompanies.slice(
        //                 this.startIndex,
        //                 this.startIndex + this.batchSize
        //             );
        //         } else {
        //             console.error("Failed to fetch companies:", response?.data || "Unknown error");
        //         }
        //     } catch (error) {
        //         console.error("Error fetching companies:", error);
        //     } finally {
        //         this.loading = false;
        //     }
        // },

        async fetchCompanyList() {
            if (!this.documentTitle) {
                console.error("No document title provided to fetch company list!");
                return;
            }
            this.loading = true;
            try {
                const response = await companyList(this.documentTitle);
                if (response?.status === true) {
                    this.companies = response.data;

                    // Initialize the selectedCompanies array based on status
                    this.selectedCompanies = this.companies
                        .filter((company) => company.status === true) // Only include companies with status: true
                        .map((company) => company._id); // Add their IDs to selectedCompanies

                    this.filteredCompanies = [...this.companies];
                    this.visibleCompanies = this.filteredCompanies.slice(
                        this.startIndex,
                        this.startIndex + this.batchSize
                    );
                } else {
                    console.error("Failed to fetch companies:", response?.data || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                this.loading = false;
            }
        },

        // filterCompanies() {
        //     const query = this.searchQuery.toLowerCase();
        //     this.filteredCompanies = this.companies.filter((company) =>
        //         company.company_name.toLowerCase().includes(query)
        //     );
        //     // Reset visible companies after filtering
        //     this.startIndex = 0;
        //     this.visibleCompanies = this.filteredCompanies.slice(
        //         this.startIndex,
        //         this.startIndex + this.batchSize
        //     );
        // },

        filterCompanies() {
            const query = this.searchQuery.toLowerCase();
            this.filteredCompanies = this.companies.filter((company) =>
                company.company_name.toLowerCase().includes(query)
            );
            this.startIndex = 0;
            this.visibleCompanies = this.filteredCompanies.slice(
                this.startIndex,
                this.startIndex + this.batchSize
            );
        },

        loadMoreCompanies() {
            // Load the next batch of companies
            const nextBatch = this.filteredCompanies.slice(
                this.startIndex + this.batchSize,
                this.startIndex + this.batchSize * 2
            );
            if (nextBatch.length) {
                this.visibleCompanies = [...this.visibleCompanies, ...nextBatch];
                this.startIndex += this.batchSize;
            }
        },
        setupObserver() {
            const options = {
                root: null, // Use the viewport as the root
                rootMargin: "0px",
                threshold: 1.0, // Trigger when the observer element is fully visible
            };
            this.observer = new IntersectionObserver(this.handleIntersect, options);
            const observerElement = this.$refs.observer;
            if (observerElement) {
                this.observer.observe(observerElement);
            }
        },
        handleIntersect(entries) {
            const [entry] = entries;
            if (entry.isIntersecting && this.visibleCompanies.length < this.filteredCompanies.length) {
                this.loadMoreCompanies();
            }
        },
        // applyChanges() {
        //     this.$emit("openModal", this.selectedCompanies);
        // },

        // async applyChanges() {
        //     if (this.selectedCompanies.length === 0) {
        //         alert("Please select at least one company to grant access!");
        //         return;
        //     }

        //     this.loading = true;
        //     try {
        //         // Call the API for each selected company
        //         const promises = this.selectedCompanies.map(async (companyId) => {
        //             const response = await companyAccess(companyId, this.documentTitle, this.documentLink); // Pass companyId, documentTitle, and documentLink
        //             if (!response?.status) {
        //                 throw new Error(`Failed to grant access for company ID: ${companyId}`);
        //             }
        //             return response.data;
        //         });

        //         // Wait for all API calls to complete
        //         await Promise.all(promises);
        //         successAlert("Access granted successfully!");

        //         // Reset the selection and close the sidebar
        //         this.selectedCompanies = [];
        //         this.$emit("close"); // Close the sidebar
        //     } catch (error) {
        //         console.error("Error granting access:", error);
        //         alert("An error occurred while granting access. Please try again.");
        //     } finally {
        //         this.loading = false; // Hide loading state
        //     }
        // },

        async applyChanges() {
            const previouslySharedCompanies = this.companies
                .filter((company) => company.status === true) // Companies with existing access
                .map((company) => company._id);

            const companiesToGrantAccess = this.selectedCompanies.filter(
                (companyId) => !previouslySharedCompanies.includes(companyId) // Newly checked companies
            );

            const companiesToRevokeAccess = previouslySharedCompanies.filter(
                (companyId) => !this.selectedCompanies.includes(companyId) // Newly unchecked companies
            );

            if (companiesToGrantAccess.length === 0 && companiesToRevokeAccess.length === 0) {
                successAlert("No changes to apply.");
                return;
            }

            this.loading = true;
            try {
                // Grant access for newly checked companies
                const grantPromises = companiesToGrantAccess.map(async (companyId) => {
                    const response = await companyAccess(companyId, this.documentTitle, this.documentLink);
                    if (!response?.status) {
                        throw new Error(`Failed to grant access for company ID: ${companyId}`);
                    }
                    return response.data;
                });

                // Revoke access for newly unchecked companies
                const revokePromises = companiesToRevokeAccess.map(async (companyId) => {
                    const response = await revokeCompanyAccess(companyId, this.documentTitle);
                    if (!response?.status) {
                        throw new Error(`Failed to revoke access for company ID: ${companyId}`);
                    }
                    return response.data;
                });

                // Wait for all API calls to complete
                await Promise.all([...grantPromises, ...revokePromises]);

                successAlert("Changes applied successfully!");
                await this.fetchCompanyList(); // Refresh the list to reflect updated statuses
                this.$emit("close");
            } catch (error) {
                console.error("Error applying changes:", error);
                errorAlert("An error occurred while applying changes. Please try again.");
            } finally {
                this.loading = false;
            }
        },
    },

    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    watch: {
        visible(newValue) {
            // if (!newValue) {
            //     this.searchQuery = ""; // Reset search query
            //     this.filteredCompanies = [...this.companies]; // Reset filtered companies
            //     this.selectedCompanies = []; // Reset selected companies
            // }
            if (newValue) {
                this.fetchCompanyList();
            } else {
                this.searchQuery = ""; // Reset search query
                this.filteredCompanies = []; // Clear filtered companies
                this.visibleCompanies = []; // Clear visible companies
                this.selectedCompanies = []; // Reset selected companies
            }
        },
    },
};
</script>

<style>
@import url('style.css');
</style>