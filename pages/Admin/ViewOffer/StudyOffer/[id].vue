<template>
    <div class="offer-Header-parent">
        <div class="offer-Header-parent-1st">
            <div class="offer-search-query">
                <span><i class="bi bi-search"></i></span>
                <input type="search">
            </div>
            <span class="tab" :class="{ activeTab: selectedTab === 'All' }" @click="selectedTab = 'All'">All</span>
            <span class="tab" :class="{ activeTab: selectedTab === 'Active' }"
                @click="selectedTab = 'Active'">Active</span>
            <span class="tab" :class="{ activeTab: selectedTab === 'Expired' }"
                @click="selectedTab = 'Expired'">Expired</span>
        </div>
        <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" class="offer-add-button hover-effect">
            <span>+ Add New Offer</span>
        </div>
    </div>
    <div class="offer-parent">
        <div class="offer-parent-inside">
            <table class="offer-parent-table">
                <thead class="offer-study-head">
                    <tr>
                        <!-- <th><input type="checkbox"></th> -->
                        <th>Offer Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status </th>
                        <th>Action</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody v-for="(i, index) in filteredOffers" :key="index">
                    <tr class="offer-study-table-row">
                        <!-- <td><input type="checkbox"></td> -->
                        <td class="text-[#1a1a1a] text-[16px]">{{ i?.offer_name }}</td>
                        <td>
                            <span>
                                <div class="text-[#0e0e0f] text-[14px] opacity-0.8">
                                    {{ new Date(i.start_Date).toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    }) }}
                                </div>
                                <div class="offer-time-class">
                                    {{ new Date(i.start_Date).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    }) }}
                                </div>
                            </span>


                        </td>
                        <td>
                            <span>
                                <div class="text-[#0e0e0f] text-[14px] opacity-0.8">
                                    {{ new Date(i.end_Date).toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    }) }}
                                </div>
                                <div class="offer-time-class">
                                    {{ new Date(i.end_Date).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    }) }}
                                </div>
                            </span>


                        </td>
                        <td>
                            <span :class="i?.active ? 'status-active' : 'status-expired'">
                                {{ i?.active ? 'Active' : 'Expired' }}
                            </span>

                        </td>
                        <td :key="refreshKey">
                            <label class="switch">
                                <input type="checkbox" :checked="i.active" @click.prevent="statusUpdate(i)" />
                                <span class="sliders round"></span>
                            </label>
                        </td>
                        <td class="d-flex gap-x-[12px] pt-[12px]">
                            <span @click="editOffer(i)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightEdit"
                                class="cursor-pointer"><i class="bi bi-pencil-square"></i></span>
                            <span @click="deleteOffer(i._id)" class="cursor-pointer"><i class="bi bi-trash3"></i></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <Dialog v-model:visible="ConfModal" modal header="Confirmation" :style="{ width: '25rem' }">
        <div>
            <p>You already have an active offer. Do you want to disable the previous one and activate this offer?</p>
        </div>
        <div class="flex justify-end gap-2 mt-[20px]">
            <Button class="cancel-offr-btnn" type="button" label="Cancel" severity="secondary"
                @click="ConfModal = false"></Button>
            <Button class="submit-offr-btnn" type="button" label="Save" @click="confirmChange"></Button>
        </div>
    </Dialog>

    <!--Add offer modal -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" ref="offcanvasadd"
        aria-labelledby="offcanvasRightLabel">
        <div class="modal-body-offcan-trst">
            <div class="flex p-[20px] items-center">
                <img data-bs-dismiss="offcanvas" src="/img/png/bak.png" alt="Back" class="cursor-pointer h-[25px]" />
                <span class="mx-auto font-[500] text-[25px]">Offer Listing</span>
            </div>
            <div class="modal-content h-[80vh] overflow-auto">
                <div v-if="OfferListingDetails"
                    class="px-[20px] py-[20px] flex flex-col gap-4 rounded-lg w-[70%] mx-auto shadow-sm mb-4">
                    <div class="relative">
                        <img class="aspect-[1.4/1] rounded-xl" :src="OfferListingDetails?.study?.cover_image"
                            alt="Selected Image" />
                        <div
                            class="absolute bg-gradient top-0 h-[-webkit-fill-available] w-[-webkit-fill-available] rounded-[18px]">
                        </div>
                    </div>
                    <div class="flex justify-between flex-wrap items-center gap-2 w-full">
                        <div class="flex flex-col gap-1">
                            <span class="text-[#2D3134] text-[18px] font-[500]">{{ OfferListingDetails.title
                                }}</span><span class="text-[#8A8A8A] text-[10px] font-[500]">{{
                                    OfferListingDetails.country }}</span>
                        </div>
                        <div class="d-flex align-items-center gap-1">
                            <img src="/img/svg/Star.svg" alt="" /><span class="rating-text">5</span><span
                                class="rating-percent">(1)</span>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="addOffer">
                    <div class="mb-4">
                        <label class="text-[#282823] px-[25px] font-bold mb-3" for="">Offer Name</label>
                        <input type="text" v-model="offer_name"
                            class="border-gray mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important]"
                            placeholder="Offer Name" />
                        <p v-if="validationError.offer_name" class="text-red-500 text-sm mt-1 pl-[30px]">{{
                            validationError.offer_name }}</p>
                    </div>
                    <div class="mb-4 relative px-[25px]">
                        <label class="text-[#282823] font-bold mb-3" for="">Description</label>
                        <QuillEditor :modules="modules" ref="description" />
                        <p v-if="validationError.offer_descriptions" class="text-red-500 text-sm mt-1">{{
                            validationError.offer_descriptions }}</p>
                    </div>
                    <div class="mb-4 relative">
                        <label class="text-[#282823] px-[25px] font-bold mb-3" for="">Start Date</label>
                        <input type="datetime-local" v-model="start_Date"
                            class="border-gray pl-[10px!important] mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important] min-h-[48px]"
                            placeholder="Sun, 27 Apr 2024 | 10:30 PM" />
                        <p v-if="validationError.start_Date" class="text-red-500 text-sm mt-1 pl-[30px]">{{
                            validationError.start_Date }}</p>
                    </div>
                    <div class="mb-4 relative">
                        <label class="text-[#282823] px-[25px] font-bold mb-3" for="">End Date</label>
                        <input type="datetime-local" v-model="end_Date"
                            class="border-gray pl-[10px!important] mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important] min-h-[48px]"
                            placeholder="Thu, 31 Apr 2024 | 09:00 AM" />
                        <p v-if="validationError.end_Date" class="text-red-500 text-sm mt-1 pl-[30px]">{{
                            validationError.end_Date
                        }}</p>
                    </div>
                    <div class="grid">
                        <button
                            class="bg-[#ff5757] px-[70px] py-[17px] text-[25px] mx-[25px] text-white rounded-[20px] mb-2">
                            Promote
                        </button>
                        <button data-bs-dismiss="offcanvas" class="text-[#9691A4]" type="button">Go Back</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <!--Edit offer modal -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRightEdit" ref="offcanvas"
        aria-labelledby="offcanvasRightLabel">
        <div class="modal-body-offcan-trst">
            <div class="flex p-[20px] items-center">
                <img data-bs-dismiss="offcanvas" src="/img/png/bak.png" alt="Back" class="cursor-pointer h-[25px]" />
                <span class="mx-auto font-[500] text-[25px]">Offer Listing</span>
            </div>
            <div class="modal-content h-[80vh] overflow-auto">
                <div v-if="OfferListingDetails"
                    class="px-[20px] py-[20px] flex flex-col gap-4 rounded-lg w-[70%] mx-auto shadow-sm mb-4">
                    <div class="relative">
                        <img class="aspect-[1.4/1] rounded-xl" :src="OfferListingDetails?.study?.cover_image"
                            alt="Selected Image" />
                        <div
                            class="absolute bg-gradient top-0 h-[-webkit-fill-available] w-[-webkit-fill-available] rounded-[18px]">
                        </div>
                    </div>
                    <div class="flex justify-between flex-wrap items-center gap-2 w-full">
                        <div class="flex flex-col gap-1">
                            <span class="text-[#2D3134] text-[18px] font-[500]">{{ OfferListingDetails.title
                                }}</span><span class="text-[#8A8A8A] text-[10px] font-[500]">{{
                                    OfferListingDetails.country }}</span>
                        </div>
                        <div class="d-flex align-items-center gap-1">
                            <img src="/img/svg/Star.svg" alt="" /><span class="rating-text">5</span><span
                                class="rating-percent">(1)</span>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="EditOfferButton">
                    <div class="mb-4">
                        <label class="text-[#282823] px-[25px] font-bold mb-3" for="">Offer Name</label>
                        <input type="text" v-model="offer_name"
                            class="border-gray mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important]"
                            placeholder="Offer Name" />
                        <p v-if="validationError.offer_name" class="text-red-500 text-sm mt-1 pl-[30px]">{{
                            validationError.offer_name }}</p>
                    </div>
                    <div class="mb-4 relative px-[25px]">
                        <label class="text-[#282823] font-bold mb-3" for="">Description</label>
                        <QuillEditor :modules="modules" ref="qhtml" />
                        <p v-if="validationError.offer_description" class="text-red-500 text-sm mt-1">{{
                            validationError.offer_description }}</p>
                    </div>
                    <div class="mb-4 relative">
                        <label class="text-[#282823] px-[25px] font-bold mb-3" for="">Start Date</label>
                        <input type="datetime-local" v-model="start_Date"
                            class="border-gray pl-[10px!important] mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important] min-h-[48px]"
                            placeholder="Sun, 27 Apr 2024 | 10:30 PM" />
                        <p v-if="validationError.start_Date" class="text-red-500 text-sm mt-1 pl-[30px]">{{
                            validationError.start_Date }}</p>
                    </div>
                    <div class="mb-4 relative">
                        <label class="text-[#282823] px-[25px] font-bold mb-3" for="">End Date</label>
                        <input type="datetime-local" v-model="end_Date"
                            class="border-gray pl-[10px!important] mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important] min-h-[48px]"
                            placeholder="Thu, 31 Apr 2024 | 09:00 AM" />
                        <p v-if="validationError.end_Date" class="text-red-500 text-sm mt-1 pl-[30px]">{{
                            validationError.end_Date
                        }}</p>
                    </div>
                    <div class="grid">
                        <button
                            class="bg-[#ff5757] px-[70px] py-[17px] text-[25px] mx-[25px] text-white rounded-[20px] mb-2">
                            Update
                        </button>
                        <button data-bs-dismiss="offcanvas" class="text-[#9691A4]" type="button">Go Back</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
export default {
    data() {
        return {
            selectedTab: 'All',
            offer_name: null,
            offer_description: null,
            start_Date: null,
            end_Date: null,
            storeSingleId: null,

            OfferDetails: null,
            OfferListingDetails: null,
            ConfModal: false,
            selectedOffer: null,
            activeOffer: null,
            refreshKey: 0,
            validationError: {},

        }
    },
    components: {
        QuillEditor
    },
    async mounted() {
        await this.ViewParticularListing();
        await this.ViewOffer();
        await this.checkExpiredOffers();
    },
    computed: {
        filteredOffers() {
            if (this.selectedTab === 'All') {
                return this.OfferDetails;
            } else if (this.selectedTab === 'Active') {
                return this.OfferDetails.filter((offer) => offer.active);
            } else if (this.selectedTab === 'Expired') {
                return this.OfferDetails.filter((offer) => !offer.active);
            }
        },
    },
    methods: {
        async checkExpiredOffers() {
            const currentDate = new Date();

            this.OfferDetails.forEach((offer) => {
                const offerEndDate = new Date(offer?.end_Date);

                if (offerEndDate < currentDate && offer.active) {
                    offer.active = false;
                    this.updateOfferStatus(offer);
                }
            });
        },

        async updateOfferStatus(offer) {
            try {
                await adminPut(`/company-update-offers/${offer._id}`, { active: offer.active });
            } catch (e) {
                console.error("Error updating status:", e);
            }
        },
        async ViewParticularListing() {
            try {
                const res = await adminGet(`/company-listing/${this.$route.params.id}`)
                this.OfferListingDetails = res.data.data;
            } catch (e) {

            }
        },
        async ViewOffer() {
            try {
                const res = await adminGet(`/company-listing-offer/${this.$route.params.id}`)
                this.OfferDetails = res.data.data
            } catch (e) {

            }
        },
        async statusUpdate(selectedOffer) {
            try {
                const currentDate = new Date();
                const offerEndDate = new Date(selectedOffer.end_Date);
                const activeOffer = this.OfferDetails?.find(offer => offer.active);

                if (offerEndDate < currentDate) {
                    this.editOffer(selectedOffer);
                    const offcanvasElement = this.$refs.offcanvas;
                    const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                    bootstrapOffcanvas.show();
                }

                else if (activeOffer && activeOffer._id !== selectedOffer._id) {
                    this.ConfModal = true;
                    this.activeOffer = activeOffer;
                    this.selectedOffer = selectedOffer;
                }
                else {
                    selectedOffer.active = !selectedOffer.active;
                    await adminPut(`/company-update-offers/${selectedOffer._id}`, { active: selectedOffer.active });
                    this.refreshKey++;
                }
            } catch (e) {
                console.error("Error updating status:", e);
            }
        },

        async confirmChange() {
            try {
                if (this.activeOffer) {
                    this.activeOffer.active = false;
                    await adminPut(`/company-update-offers/${this.activeOffer._id}`, { active: false });
                }
                if (this.selectedOffer) {
                    this.selectedOffer.active = true;
                    await adminPut(`/company-update-offers/${this.selectedOffer._id}`, { active: true });
                }
                this.ConfModal = false;
            } catch (e) {
            }
        },
        validateFields() {
            this.validationError = {};

            if (!this.offer_name) {
                this.validationError.offer_name = 'Offer name is required.';
            }
            if (!this.start_Date) {
                this.validationError.start_Date = 'Start date is required.';
            }
            if (!this.end_Date) {
                this.validationError.end_Date = 'End date is required.';
            }

            const overviewContents = this.$refs.description.getHTML()?.trim();
            if (!overviewContents || overviewContents === '<p><br></p>') {
                this.validationError.offer_descriptions = 'Description is required.';
            }
            // const overviewContent = this.$refs.qhtml.getHTML()?.trim();
            // if (!overviewContent || overviewContent === '<p><br></p>') {
            //     this.validationError.offer_description = 'Description is required.';
            // }

            if (Object.keys(this.validationError).length > 0) {
                setTimeout(() => {
                    this.validationError = {};
                }, 3000);
            }
            return Object.keys(this.validationError).length === 0;
        },
        async addOffer() {
            if (!this.validateFields()) {
                return;
            }
            const payload = {
                offer_name: this.offer_name,
                offer_description: this.$refs.description.getHTML(),
                start_Date: new Date(this.start_Date).toISOString(),
                end_Date: new Date(this.end_Date).toISOString(),
                listing_id: this.OfferListingDetails._id,
                service_name: this.OfferListingDetails.service_name,
            };
            try {
                const res = await adminPost('/company-add-offer', payload)
                this.resetForm();
                const offcanvasElement = this.$refs.offcanvasadd;
                const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                bootstrapOffcanvas.hide();
                this.ViewOffer();
            } catch (e) {
            }

        },
        async deleteOffer(i) {
            try {
                if (await deleteConfirm('Do You Want to delete this offer?')) {
                    await adminDelete(`/company-delete-offer/${i}`);
                    this.ViewOffer();
                    successAlert('Listing Deleted');
                }
            } catch (e) {
            }
        },
        validateFieldsEdit() {
            this.validationError = {};

            if (!this.offer_name) {
                this.validationError.offer_name = 'Offer name is required.';
            }
            if (!this.start_Date) {
                this.validationError.start_Date = 'Start date is required.';
            }
            if (!this.end_Date) {
                this.validationError.end_Date = 'End date is required.';
            }

            const overviewContent = this.$refs.qhtml.getHTML()?.trim();
            if (!overviewContent || overviewContent === '<p><br></p>') {
                this.validationError.offer_description = 'Description is required.';
            }

            if (Object.keys(this.validationError).length > 0) {
                setTimeout(() => {
                    this.validationError = {};
                }, 3000);
            }
            return Object.keys(this.validationError).length === 0;
        },
        async EditOfferButton() {
            if (!this.validateFieldsEdit()) {
                return;
            }
            const payload = {
                offer_name: this.offer_name,
                offer_description: this.$refs.qhtml.getHTML(),
                start_Date: new Date(this.start_Date).toISOString(),
                end_Date: new Date(this.end_Date).toISOString(),
                listing_id: this.OfferListingDetails._id,
                service_name: this.OfferListingDetails.service_name,
            };
            try {
                const res = await adminPut(`/company-update-offers/${this.storeSingleId}`, payload)
                this.resetForm();
                const offcanvasElement = this.$refs.offcanvas;
                const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                bootstrapOffcanvas.hide();
                this.ViewOffer();
            } catch (e) {
            }

        },
        async editOffer(i) {
            try {
                this.storeSingleId = i?._id;
                this.offer_name = i?.offer_name;
                this.start_Date = i.start_Date.split('.')[0];
                this.end_Date = i.end_Date.split('.')[0];
                if (this.$refs.qhtml && i.offer_description) {
                    this.$refs.qhtml.setHTML(i.offer_description);
                }

            } catch (e) {
            }
        },
        resetForm() {
            this.offer_name = '',
                this.start_Date = '',
                this.end_Date = '',
                this.listing_id = '',
                this.service_name = ''
            this.$refs.qhtml.setHTML('');
        },
    }
}
</script>
<style>
.offer-parent {
    background-color: #fff;
    border-radius: 14px;
    min-width: 650px;
    box-shadow: 0 4.934579372406006px 19.738317489624023px #1f1b2d1f;
    padding: 35px 25px 60px;
}

.offer-parent-inside {
    border: 1px solid #e4e4ef;
    border-radius: 8px;
    min-height: 540px;
}

.offer-parent-table {
    border-collapse: collapse;
    caption-side: bottom;
    min-width: max-content;
    min-width: max-content;
    width: -webkit-fill-available;
    margin-inline: 20px;
}

.offer-study-head {
    border-bottom: 1px solid #e4e4ef;
    height: 4rem;
}

.offer-study-head>tr>th {
    color: #a0a2b1;
    font-weight: 700;
}

.offer-study-table-row {
    /* line-height: 50px; */
    border-bottom: 1px solid #e4e4ef;
}

.offer-Header-parent {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 15px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-top: 5px;
}

.offer-Header-parent-1st {
    display: flex;
    flex-wrap: wrap;
    column-gap: 5px;
    row-gap: 12px;
    align-items: center;
    column-gap: 40px;
    row-gap: 15px;
}

.offer-add-button {
    background-color: #ff6c68;
    border: none;
    border-radius: 28.6px;
    color: #fff;
    cursor: pointer;
    font-weight: 700;
    padding: 10px 15px;

}

.hover-effect:hover {
  background: white; /* Change background to white */
  color: #FF5757; /* Text color on hover */
  border: 1px solid #FF5757; /* Border color on hover */
}



.offer-search-query {
    background-color: #fff;
    padding: 8px 12px;
    border-radius: 20px;
}

.offer-search-query input {
    outline: none;
    text-indent: 10px;
}

.status-active,
.status-expired {
    display: inline-block;
    box-sizing: border-box;
    min-width: 75px;       
    padding: 4px 14px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}

.status-active {
    background-color: #ebf6eb;
    color: green;
}

.status-expired {
    background-color: #fff0f0;
    color: red;
}

.cancel-offr-btnn {
    border: 1px solid #ff5757;
    padding: 4px 8px;
    border-radius: 8px;
    color: #ff5757;
}

.submit-offr-btnn {
    background-color: #ff5757;
    padding: 4px 8px;
    border-radius: 8px;
    color: #fff;
}

/* toggle */
.sliders {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #a6a6a6;
    transition: 0.4s;
}

.switch input:checked+.sliders:before {
    transform: translateX(17px);
}

.switch input:checked+.sliders:before {
    background-color: #ffff;
}

.sliders.round:before {
    border-radius: 50%;
}

.sliders:before {
    position: absolute;
    content: '';
    height: 17px;
    width: 18px;
    left: 5px;
    bottom: 3px;
    background-color: #3d4859;
    transition: 0.4s;
}

.switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 22px;
    margin-block-start: 12px;
    line-height: 3;
    margin-block-end: 12px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.switch input:checked+.sliders {
    background-color: #56cd54;
}

.sliders.round {
    border-radius: 34px;
}

.offer-time-class {
    font-size: 12px;
    color: #676b6c;
}


/* btn css filter */
.tab {
    padding: 10px 20px;
    background-color: #f8f4f8;
    color: #454056;
    border-radius: 10px;
    box-shadow: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab.activeTab {
    background-color: white;
    color: #ff5757;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>