<template>

    <div>
        <div class="flex justify-between ml-[30px] mr-[30px] bg-[#fff] rounded-md mb-[20px] p-[20px]">
            <p class="text-[#5a5b80] text-[24px] ">{{ servicename }}</p>
            <button @click="servicessubcategorylist" 
                 class="bg-[#ff2626] text-white px-[12px] py-[8px] rounded-full" v-if="permission?.service?.add">+Add
                Listing</button>
        </div>
    </div>

    <DataTable v-model:selection="selectedServiceListing" class="gallery-container leadabc" ref="dt"
        :value="service_list" paginator :rows="10" dataKey="_id">

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="name" header="Title" class="test" :filterMenuStyle="{ width: '14rem' }" style="max-width: 8rem">
            <template #body="{ data }">
                <div class="all-leads-tabl-eye">
                    <span class="leads-table-namee-wgt " style="cursor: pointer;">{{
                        data.title }}</span>
                </div>
            </template>
        </Column>

        <Column field="name" header="Service Name" class="test" :filterMenuStyle="{ width: '14rem' }"
            style="max-width: 8rem">
            <template #body="{ data }">
                <div class="all-leads-tabl-eye">
                    <span @click="this.$refs.canvas.openCanvas(data)" class="leads-table-namee-wgt "
                        style="cursor: pointer;">{{
                            data.service_name }}</span>
                </div>
            </template>
        </Column>

        <Column field="phone" header="Service Category" :filterMenuStyle="{ width: '14rem' }" style="max-width: 8rem">
            <template #body="{ data }">
                <span class="leads-table-namee-wgt-dtee">{{ data.sub_service_name }}</span>
            </template>
        </Column>

        <Column field="source" header="created Date" filterField="service" :showFilterMatchModes="false"
            :filterMenuStyle="{ width: '14rem' }" style="min-width: 4rem">
            <template #body="{ data }">
                <div class="all-atble-leds-srvc">
                    <span class="lead-date text-[#64748b]" style="display: block; margin-top: 4px">
                        {{ formatDate(data.createdAt) }}
                    </span>
                </div>
            </template>
        </Column>

        <Column field="phone" header="Action" :filterMenuStyle="{ width: '14rem' }" style="max-width: 8rem">
            <template #body="{ data }">
                <div class="action-icons flex gap-2 ">
                    <span @click="updateListing(data)" class=" pi pi-user-edit opacity-75" v-if="permission?.service?.edit"></span>
                    <span @click="deleteListing(data._id)" class="pi pi-trash opacity-75" v-if="permission?.service?.delete"></span>

                    <span @click="toggleSidebar(data)" class="pi pi-eye opacity-75"></span>
                </div>
            </template>
        </Column>


    </DataTable>

    <collegeView :visible="sidebarVisible" :listingData="selectedListing" @update:visible="sidebarVisible = $event" />
    <permanentView :visible="permanentresidency" :listing-data="selectedListing"
        @update:visible="permanentresidency = $event" />
    <visitorView :visible="visitorVisible" :listing-data="selectedListing" @update:visible="visitorVisible = $event" />
    <workView :visible="workVisible" :listing-data="selectedListing" @update:visible="workVisible = $event" />
    <touristView :visible="touristVisible" :listing-data="selectedListing" @update:visible="touristVisible = $event" />
    <Sidebar v-model:visible="showSidebar" position="right" class="w-[34rem] h-full overflow-y-auto px-2   sm:w-[30rem] md:w-[30rem] lg:w-[29rem] xl:w-[32rem]" appendTo="body"> <!-- **UPDATED DIV TO SIDEBAR** -->
    <template #header>
        <div class="flex p-[28px] mt-3  items-center justify-between w-full">
            <!-- <img @click="back" src="/img/png/bak.png" alt="" class="cursor-pointer h-[25px]" /> -->
            <span class="mx-auto font-[500] text-[25px]">Category List</span>
              <button @click="showSidebar = false" class="text-[#d8d8d8] text-[39px] mt-[-20px]">&times;</button>
        </div>
    </template>

    <div>
        <div v-if="subcategorylist.length && subcategorylist[0].subcategories?.length"
            v-for="ele in subcategorylist[0].subcategories"
            class="pl-[28px] pr-[28px] flex justify-between text-[#ff5757] bg-[#ffefef] mt-1 mb-[14px] p-[5px] text-[15px]">
            <span class="cursor-pointer" @click="$router.push(getSubcategoryRoute(ele))">{{ ele }} </span><span
                class="pi pi-external-link text-[#ff5757] text-center !leading-normal cursor-pointer"
                @click="$router.push(getSubcategoryRoute(ele))"></span>
        </div>
    </div>
</Sidebar>
    <!-- <div class="offcanvas offcanvas-end offcanv-strst-filter max-w-[360px!important] w-[30%!important] " tabindex="-1"
        id="staticBackdrop" aria-labelledby="staticBackdropLabel" data-bs-backdrop="false">
        <div class="modal-body-offcan-trst">
            <div class="flex p-[20px] items-center">
                <img @click="back" src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas"
                    class="cursor-pointer h-[25px]" />
                <span class="mx-auto font-[500] text-[25px]">Category List</span>

            </div>
            <div>
                <div v-if="subcategorylist.length && subcategorylist[0].subcategories?.length"
                    v-for="ele in subcategorylist[0].subcategories"
                    class="pl-[20px] pr-[20px] flex justify-between text-[#ff5757] bg-[#ffefef] mb-[14px] p-[5px] text-[15px]">
                    <span class="cursor-pointer" @click="$router.push(getSubcategoryRoute(ele))">{{ ele }} </span><span
                        class="pi pi-external-link text-[#ff5757] text-center !leading-normal cursor-pointer"
                        @click="$router.push(getSubcategoryRoute(ele))"></span>
                </div>
            </div>
        </div>
    </div> -->
</template>


<script>

import permanentView from "@/pages/Serviceview/Settle/Permanent_Residency/index.vue"
import collegeView from "@/pages/Serviceview/Studyvisa/Collegestudyvisa/index.vue"
import visitorView from "@/pages/Serviceview/Travel/Visitor_visa/index.vue"
import workView from "@/pages/Serviceview/Work/work_visa/index.vue"
import touristView from "@/pages/Serviceview/Travel/TouristVisa/index.vue"
definePageMeta({
    layout: 'subadmin',
    middleware: ['subadmin'],
});

export default {
    data() {
        return {
            service_list: [],
            subcategorylist: [],
            servicename: null,
            sidebarVisible: false,
            showSidebar:false,
            selectedListing: null,
            selectedServiceListing: [],
            permanentresidency: false,
            visitorVisible: false,
            workVisible: false,
            touristVisible:false,
        };
    },
    components: {
        collegeView,
        permanentView,
        visitorView,
        workView,
        touristView
    },
    async mounted() {
        activateSubmenu('b3', 'Services');
        console.log("router.check", useRoute().fullPath.split("/")[3].split("%20").join(" "))
        this.servicename = useRoute().fullPath.split("/")[3].split("%20").join(" ")
        console.log("servicename", this.servicename)
        this.servicename = this.servicename.split("?")[0]

        await this.init();
    },
    methods: {
        async init() {
            this.loading = true;
            await subadminGet(`/subadmin-study-get/${this.servicename}`).then(async (response) => {
                this.service_list = response.data.data;
                this.loading = false;
            });
            this.loading = false;
        },
        async servicessubcategorylist() {
            console.log('hello')
            await subadminGet(`/admin/category/subcategory/${this.servicename}`).then(async (response) => {
                this.subcategorylist = response.data.data
                 this.showSidebar = true;
            })
        },
        toggleSidebar(data) {
            this.selectedListing = data
            const name = this.servicename.trim().toLowerCase();
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

        async deleteListing(i) {
            if (await deleteConfirm('Do You Want to delete this Listing')) {
                await subadminDelete(`/company-listing/${i}`);
                this.init();
                successAlert('Listing Deleted');
            }
        },

        getSubcategoryRoute(ele) {
            const name = this.servicename.trim().toLowerCase();
            console.log("name", name)
            if (name === "study visa") {
                return "/subadmin/study-form";
            } else if (name === "settle abroad") {
                return "/subadmin/addservice/settle/Pr";
            } else if (name === "travel" && ele == "Tourist Visa") {
                return "/subadmin/addservice/travel/TouristVisa";
            } else if (name === "travel" && ele == "Visitor Visa") {
                return "/subadmin/addservice/travel/VisitorVisa";
            }
            else if (name === "work" && ele == "Work Visa") {
                return "/subadmin/addallservice/jobservice/";
            }
            else {
                return "/subadmin/default-route";
            }
        },
        updateListing(data) {
            const name = this.servicename.trim().toLowerCase();
            console.log("Navigating based on service name:", name);

            if (name === "study visa") {
                this.$router.push({ path: "/subadmin/study-form", query: { id: data._id } });
            } else if (name === "settle abroad") {
                this.$router.push({ path: "/subadmin/addservice/settle/Pr", query: { id: data._id } });
            } else if (name === "travel" && data.sub_service_name == "Tourist Visa") {
                this.$router.push({ path: "/subadmin/addservice/travel/TouristVisa", query: { id: data._id } })
            } else if (name === "travel" && data.sub_service_name == "visitor_visa") {
                this.$router.push({ path: `/subadmin/addservice/travel/VisitorVisa`, query: { id: data._id } })
            } else if (name === "work" && data.sub_service_name == "work_visa") {
                this.$router.push({ path: `/subadmin/addallservice/jobservice/`, query: { id: data._id } })
            }
            else {
                this.$router.push({ path: "/subadmin/default-route", query: { id: data._id } });
            }
        }

    },


}

</script>

<style scoped></style>