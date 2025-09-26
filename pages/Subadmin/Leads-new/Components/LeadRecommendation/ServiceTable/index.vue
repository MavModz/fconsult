<template>
    <div class="r-container mt-[32px] ">
        <div class="top-bar flex-wrap ">
            <div class="flex items-center gap-4">
                <div class="search-wrapper">
                    <span class="search-icon"><i class="bi bi-search"></i></span>
                    <input type="text" placeholder="Search" />
                </div>
                <div class="flex items-center gap-2 text-[#6B7280] text-[18px] font-medium cursor-pointer"
                    @click="FilterTable = true"><i class="bi bi-filter"></i>
                    Filter
                </div>
            </div>
            <button class="addDocumnetButton" @click="suggesstionList">Submit</button>
        </div>

        <div class=" recommend-table rounded-xl overflow-hidden">
            <DataTable v-model:selection="selectedRows"
                class=" mt-4  recommend-t leadabc gallery-container  overflow-hidden " :value="rows" dataKey="_id"
                paginator :rows="10" :rowClass="getRowClass">
                <Column selectionMode="multiple" headerStyle="width: 2rem" :selectableRowDisabled="isRowDisabled">
                </Column>
                <Column field="collegeName" header="Service Title" style="max-width: 15rem;">
                    <template #body="{ data }">
                        <span class=" text-[16px]">{{ data.title }}</span>
                        <p v-if="data.isSuggested" class="text-red-600"> All Ready Selected</p>
                    </template>
                </Column>
                <Column field="serviceName" header="Service Name" style="max-width: 17rem;">
                    <template #body="{ data }">
                        <span class="table-listing  text-[16px]">{{ data.service_name }}</span>
                    </template>
                </Column>
                <Column field="serviceCategory " header="Service Category" style="max-width: 15rem;">
                    <template #body="{ data }">
                        <span class="table-listing  text-[16px]">{{ data.sub_service_name }}</span>
                    </template>
                </Column>

                <Column field="date" header="Date" style="max-width: 16rem;" class="text-center table-stat">
                    <template #body="{ data }">
                        <span class="table-date  text-[16px]">{{ formatDate(data.createdAt) }}</span>
                    </template>
                </Column>
                <Column header="Action" style="min-width: 6rem;" class="text-center ">
                    <template #body="{ data }">
                        <span class="flex items-center"><i
                                class="pi pi-eye text-[#a5a5a5]  text-[19px] cursor-pointer mr-2"
                                @click="toggleSidebar(data)"></i>View Details</span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <Sidebar v-model:visible="FilterTable" position="right" class="  w-[98vw] sm:w-[40rem] md:w-[25rem] lg:w-[33rem]">
        <h2 class="text-[26px] font-semibold text-[#3C3C3C]  mt-4 mb-3 ">Filter</h2>
        <button class="absolute top-5 right-5 text-gray-600 hover:text-black text-3xl focus:outline-none mt-1"
            @click="FilterTable = false">
            <i class="pi pi-times text-xl"></i>
        </button>
        <div class="flex flex-col justify-between h-[88vh]">
            <div class="flex flex-col gap-[29px] mt-5">
                <div>
                    <label class="block text-[#1a1a1a] text-[18px]  font-semibold mb-2">Service</label>
                    <div class="relative">
                        <select v-model="selectedService" @change="onServiceChange"
                            class="w-full bg-[#f9fbfd] border border-[#d6dce5] rounded-xl py-3 px-4 text-[#7b8499] text-[16px] appearance-none focus:outline-none">
                            <option value="">select</option>
                            <option v-for="service in serviceslist" :key="service" :value="service">{{ service }}
                            </option>
                        </select>
                        <span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7b8499]">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div>
                    <label class="block text-[#1a1a1a] text-[18px] font-semibold mb-2">Sub Service</label>
                    <div class="relative">
                        <select v-model="selectedSubService" :disabled="!selectedService"
                            class="w-full bg-[#f9fbfd] border border-[#d6dce5] rounded-xl py-3 px-4 text-[#7b8499] text-[16px] appearance-none focus:outline-none">
                            <option value="">select</option>
                            <option v-for="sub in subServiceslist" :key="sub" :value="sub">{{ sub }}</option>
                        </select>
                        <span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7b8499]">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div>
                    <label class="block text-[#1a1a1a] text-[18px] font-semibold mb-2">Country</label>
                    <div class="relative">
                        <select v-model="selectedCountry"
                            class="w-full bg-[#f9fbfd] border border-[#d6dce5] rounded-xl py-3 px-4 text-[#7b8499] text-[16px] appearance-none focus:outline-none">
                            <option value="">select</option>
                            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                        </select>
                        <span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7b8499]">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div v-if="selectedService == 'Study Visa' && selectedSubService == 'collegeStudyVisa'">
                    <label class="block text-[#1a1a1a] text-[18px] font-semibold mb-2">Field of Study</label>
                    <div class="relative">
                        <select v-model="dynamicField"
                            class="w-full bg-[#f9fbfd] border border-[#d6dce5] rounded-xl py-3 px-4 text-[#7b8499] text-[16px] appearance-none focus:outline-none">
                            <option :value="dynamicField">{{ dynamicField }}</option>
                            <option v-for="field in fieldsOfStudy" :key="field" :value="field">{{ field }}</option>
                        </select>
                        <span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7b8499]">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="pt-0 space-y-4 text-center">
                <button @click="applyFilter"
                    class="w-full bg-[#FF5757] text-white  font-medium md:font-semibold py-[12px] md:py-[16px] rounded-2xl  text-[19px] md:text-[21px]">
                    Apply Filter
                </button>
                <button @click="resetFilters"
                    class="text-[#93989A]  font-medium md:font-semibold text-[19px] md:text-[21px] flex items-center justify-center gap-2 mx-auto">
                    <i class="bi bi-arrow-clockwise text-[21px]"></i>
                    Reset filters
                </button>
            </div>
        </div>
    </Sidebar>

    <collegeView :visible="sidebarVisible" :listingData="selectedListing" @update:visible="sidebarVisible = $event" />
    <permanentView :visible="permanentresidency" :listing-data="selectedListing"
        @update:visible="permanentresidency = $event" />
    <visitorView :visible="visitorVisible" :listing-data="selectedListing" @update:visible="visitorVisible = $event" />
    <workView :visible="workVisible" :listing-data="selectedListing" @update:visible="workVisible = $event" />
    <touristView :visible="touristVisible" :listing-data="selectedListing" @update:visible="touristVisible = $event" />
</template>
<script>
import permanentView from "@/pages/Serviceview/Settle/Permanent_Residency/index.vue"
import collegeView from "@/pages/Serviceview/Studyvisa/Collegestudyvisa/index.vue"
import visitorView from "@/pages/Serviceview/Travel/Visitor_visa/index.vue"
import workView from "@/pages/Serviceview/Work/work_visa/index.vue"
import touristView from "@/pages/Serviceview/Travel/TouristVisa/index.vue"
export default {
    data() {
        return {
            selectedRows: [],
            selectedService: '',
            selectedSubService: '',
            services: [],
            subServicesMap: {},   // key: service_name, value: sub_service_names[]
            subServices: [],
            selectedCountry: '',
            dynamicField: '',
            serviceslist: [],
            subServiceslist: [],
            countries: [],
            fieldsOfStudy: ['Engineering', 'Business', 'Arts'],
            FilterTable: false,
            rows: [],
            //view
            permanentresidency: false,
            visitorVisible: false,
            workVisible: false,
            touristVisible: false,
            sidebarVisible: false,
            selectedListing: null,
        };
    },
    components: {
        collegeView,
        permanentView,
        visitorView,
        workView,
        touristView
    },
    props: {
        service: { type: String, default: "" },
        subservice: { type: String, default: "" },
    },
    mounted() {
        this.listingdata(this.service, this.subservice)
        this.fetchServices();

    },
    watch: {
        selectedSubService(newVal) {
            if (this.selectedSubService && newVal) {
                this.countrylist(); // already called
            }

            if (
                this.selectedService === 'Study Visa' &&
                newVal === 'collegeStudyVisa'
            ) {
                this.filedList(); // call only in this condition
            }
        },
    },
    methods: {
        isRowDisabled(rowData) {
            console.log("checking row", rowData.isSuggested); // Should log for each row
            return rowData.isSuggested === true;
        },
        async fetchServices() {
            try {
                const response = await subadminGet('/grouped-service-subservice');
                const result = response.data.data;

                this.serviceslist = result.map(item => item.service_name);
                result.forEach(item => {
                    this.subServicesMap[item.service_name] = item.sub_service_names;
                });
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        onServiceChange() {
            // When service is selected, update subServices
            this.selectedSubService = ''; // reset subService selection
            this.subServiceslist = this.subServicesMap[this.selectedService] || [];
        },
        applyFilter() {
            if (!this.selectedService || !this.selectedSubService) {
                errorAlert('Please select both service and sub-service');
                return;
            }
            this.listingdata(this.selectedService, this.selectedSubService)
            // Submit logic here
            this.FilterTable = false

            console.log('Submitting:', this.selectedService, this.selectedSubService);
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },

        async listingdata(service, subservice) {
            let url = `/service-subservice-listing/${this.$route.params.id}/${service}/${subservice}`;
            const params = [];

            if (this.selectedCountry) {
                params.push(`country=${encodeURIComponent(this.selectedCountry)}`);
            }

            if (this.dynamicField) {
                params.push(`dynamicFields=${encodeURIComponent(this.dynamicField)}`);
            }

            if (params.length) {
                url += `?${params.join('&')}`;
            }

            const listing = await subadminGet(url);
            this.rows = listing.data.data;
            this.selectedService = ""
            this.selectedSubService = ""
            this.selectedCountry = ""
            this.dynamicField = ""
        },

        async countrylist() {
            try {
                const data = await subadminGet(`/countries-by-service-subservice/?service=${this.selectedService}&subservice=${this.selectedSubService}`)
                this.countries = data.data.data
            } catch (error) {
                this.countries = [];

            }
        },
        async filedList() {
            try {
                const data = await subadminGet(`/program-categories/${this.selectedService}/${this.selectedSubService}`)
                this.fieldsOfStudy = data.data.data
            } catch (error) {
                this.fieldsOfStudy = []
            }
        },

        // async suggesstionList() {
        //     console.log("dhbhdhddededehdevdevdhed", this.selectedRows)
        // },
        async suggesstionList(v) {
            if (this.selectedRows.length == 0) {
                return errorAlert("At least select one recommendation")
            }
            v.listing_id = this.selectedRows.map(row => row._id);
            v.customer_id = this.$route.params.id
            // this.loading = true
            await subadminPost(`/add-suggestions`, v).then(async (response) => {
            }).then((r) => {
                this.$emit('fetch-services');
                this.$emit('close-new-table');
            }).catch((e) => { })
            // this.loading = false
            // this.init()
        },

        toggleSidebar(data) {

            this.selectedListing = data
            const name = data.service_name.trim().toLowerCase();
            console.log("visiblename", name)
            if (name === "study visa") {
                this.sidebarVisible = !this.sidebarVisible;
            } else if (name === "settle abroad") {
                this.permanentresidency = !this.permanentresidency;
            }
            else if (name === "travel" && data.sub_service_name == "visitor_visa") {

                this.visitorVisible = !this.visitorVisible;
            } else if (name === "work" && data.sub_service_name == "work_visa") {
                this.workVisible = !this.workVisible
            }
            else if (name === "travel" && data.sub_service_name == "Tourist Visa") {
                console.log("right clickss")
                this.touristVisible = !this.touristVisible;
            }
            else {

            }

            const currentQuery = { ...this.$route.query };
            currentQuery.id = data._id; // always set or replace the id

            this.$router.replace({ query: currentQuery });
        },

        getRowClass(rowData) {

            console.log("djhbjbh", rowData)
            if (rowData.isSuggested) {
                return "row-red";
            }

            return ""; // Default class
        },

    },
};
</script>
<style scoped>
.r-container {
    background-color: #ffffff;
    padding: 38px 30px;
    border-radius: 16px;
    box-shadow: 7.83px 7.83px 19.58px 0px #00000014;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 20px; */
    gap: 20px;
}

.search-wrapper {
    display: flex;
    align-items: center;
    background-color: #F4F7FE;
    border-radius: 45px;
    padding: 2px 19px;
    width: 100%;
    max-width: 270px;

}

.addDocumnetButton {
    background: linear-gradient(135deg, #FF8686 0%, #FF2618 100%);
    color: #f4f7fe;
    padding: 12px 16px;
    border-radius: 80px;
    font-size: 16px;
    font-weight: 600;
    width: fit-content;
    cursor: pointer;
    line-height: 150%;
}

.search-icon i {
    color: #2B3674;
    font-size: 12px;
    margin-right: 0.3rem;
}

.search-wrapper input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    width: 100%;
    color: #8F9BBA;
}
</style>