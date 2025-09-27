<template>
    <p class="text-gray-700 mt-2">
        <!-- Current Lead ID: <span class="font-mono text-black">{{ paginatedLeadId }}</span> -->
    </p>
    <div class="lead-top-section d-flex justify-content-between items-center">

        <div class="pagination-container">
            <button @click="prevPage" :disabled="currentPage === 1"><img
                    src="/public/img/png/edit-left-arrow.png"></button>
            <button @click="nextPage" :disabled="currentPage === totalPages"><img
                    src="/public/img/png/edit-right-arrow.png"></button>
            <span>{{ currentPage }} of {{ totalPages }}</span>
        </div>
        <div class="edit-section d-flex gap-2 items-center cursor-pointer"
            @click="(e) => { this.$router.push(`/admin/leads/update/${this.$route.params.id}`) }">
            Edit Profile <i class="bi bi-pencil-square"></i>
        </div>
    </div>
    <div class="lead-card">
        <div>
            <div class="lead-header mb-[25px] d-flex align-items-top justify-content-between flex-wrap ">
                <div class="lead-header-left">
                    <div class="d-flex image-gap align-items-center mr-1">
                        <div class="lead-avatar">
                            <!-- <img src="/public/img/png/lead-profile-avatar.png" alt="Lead Avatar" /> -->
                            <NuxtImg :src="lead?.image || '/public/img/png/lead-profile-avatar.png'" alt="Lead Avatar"
                                width="50" height="50" class="rounded-full" />
                        </div>
                        <div class="lead-info">
                            <div class="lead-name">{{ lead?.name }}</div>
                            <div class="lead-meta">Created On <span class="lead-meta-date">{{ convertDate(lead.date)
                                    }}</span></div>
                            <div class="lead-id">{{ lead?.unique_id }}</div>
                        </div>
                    </div>
                    <div class="lead-details d-flex align-items-top ml-2">
                        <div class="d-flex align-items-center flex-wrap gap-4">
                            <div class="lead-detail">
                                <span>Phone Number </span>
                                <p>{{ lead?.phone }}</p>
                            </div>
                            <div class="lead-detail ">
                                <span>Lead Source </span>
                                <p>{{ lead?.source }}</p>
                            </div>
                            <div class="lead-detail">
                                <span>Next Follow Up</span>
                                <p>12 Jun 2025</p>
                            </div>
                        </div>
                        <div class="full-width">
                            <!-- <div class="duplicate-lead  d-flex align-items-center gap-[5px]"><img
                                    @mouseenter="isShowing = true" @mouseleave="isShowing = false"
                                    src="/public/img/png/alert-vector.png" width="14px"> DUPLICATE
                                LEAD</div> -->
                            <div v-if="isShowing" class="tooltip-box">
                                This lead has Inquired <strong>{2nd} Time by (Source)</strong> on <span
                                    class="highlight">Date</span>
                                &amp; Assigned to <strong>{User}</strong> &amp; is stored in <strong>{Campaign
                                    Name}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lead-actions">

                    <div class="">
                        <prac :status="lead.lead_stage" :subStage="lead.lead_sub_stage" @trigger-init="init" />
                    </div>


                    <div class="button-group ">
                        <button @click="addFollowup = true" class="btn follow-up">
                            <span class="add-icon"><i class="bi bi-plus-circle"></i></span> ADD FOLLOW UP
                        </button>
                        <button @click="addSidebar = true" class="btn call-cta">
                            <span class="call-icon"><i class="pi pi-phone" style="font-size: 12px"></i></span> Call
                        </button>
                    </div>
                </div>
            </div>
            <div class="horizontal-bar">
            </div>
            <div class="lead-tabs">
                <div class="tab  d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'overview' }"
                    @click="handleactive('overview')"><i class="bi bi-info-circle"></i> Overview
                </div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'documents' }"
                    @click="handleEmail('documents')"><i class="bi bi-file-earmark-text"></i>
                    Documentation</div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'recommendation' }"
                    @click="handleEmail('recommendation')"><i class="bi bi-stars"></i>Recommendation</div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'appointment' }"
                    @click="handleEmail('appointment')"><i class="bi bi-calendar-month"></i> Appointments
                </div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'invoice' }"
                    @click="handleEmail('invoice')"> <i class="bi bi-clipboard-minus"></i> Estimate &
                    Invoice</div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'agreement' }"
                    @click="handleEmail('agreement')"> <i class="bi bi-blockquote-left"></i> Agreement
                </div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'comments' }"
                    @click="handleEmail('comments')"> <i class="bi bi-card-list"></i>Comments</div>
                <!-- <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'documents' }"
                    @click="handleactive('documents')"><i class="bi bi-file-earmark-text"></i>
                    Documentation</div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'recommendation' }"
                    @click="handleactive('recommendation')"><i class="bi bi-stars"></i>Recommendation</div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'appointment' }"
                    @click="handleactive('appointment')"><i class="bi bi-calendar-month"></i> Appointments
                </div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'invoice' }"
                    @click="handleactive('invoice')"> <i class="bi bi-clipboard-minus"></i> Estimate &
                    Invoice</div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'agreement' }"
                    @click="handleactive('agreement')"> <i class="bi bi-blockquote-left"></i> Agreement
                </div>
                <div class="tab d-flex align-items-center gap-[8px]" :class="{ active: activeTab === 'comments' }"
                    @click="handleactive('comments')"> <i class="bi bi-card-list"></i>Comments</div> -->
            </div>
        </div>
    </div>


    <div class="info-section  mt-[18px] md:mt-[32px] d-flex gap-[35px]" v-if="activeTab === 'overview'">
        <div class="info-left">
            <div class="info-card ">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <img src="public/img/png/lead-user.png">
                        <span class="info-heade-heading">Personal Information</span>
                    </div>

                    <NuxtImg @click="isOpen = !isOpen" src="/img/png/drop-icon.png" class="cursor-pointer" />
                </div>
                <div class="mid-bar"></div>
                <div v-if="isOpen">
                    <div v-if="lead.souce == 'facebook'" class="ad-details mt-[46px] mb-3">
                        <p class="mb-[5px] fw-medium">AD Name • Canada Visa with Travel Assistance</p>
                        <small class="text-muted">Source: Facebook | <span> AD ID: 2739485</span></small>
                    </div>

                    <div class="info-row">
                        <div class="info-block">
                            <label>Full Name</label>
                            <p>{{ lead?.name }}</p>
                        </div>
                        <div class="info-block">
                            <label>Date Of Birth</label>
                            <p>{{ convertDate(lead?.dob) }}</p>
                        </div>
                        <div class="info-block">
                            <label>Phone Number</label>
                            <p>{{ lead?.phone }}</p>
                        </div>
                    </div>

                    <div class="mid-bar"></div>
                    <div class="info-row mt-[18px]">
                        <div class="info-block">
                            <label>Email ID</label>
                            <p>{{ lead?.email }}</p>
                        </div>
                        <div class="info-block">
                            <label>Gender</label>
                            <p>{{ lead?.gender }}</p>
                        </div>
                        <div class="info-block">
                            <label>Age</label>
                            <p>{{ lead?.age }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-card mt-[18px]"
                v-if="(lead?.per_address?.length > 0) || (lead?.country?.length > 0) || (lead?.state?.length > 0) || (lead?.city?.length > 0) || (lead?.pincode?.length > 0)">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <img src="public/img/png/black-location.png">
                        <span class="info-heade-heading">Address</span>
                    </div>

                    <NuxtImg @click="isAddressOpen = !isAddressOpen" src="/img/png/drop-icon.png" class="cursor-pointer"
                        width="17" height="10" />
                </div>
                <div class="mid-bar"></div>
                <div v-if="isAddressOpen">
                    <div class="address-card mt-[32px] ">

                        <div class="address-header pb-2">
                            <span>Present Address</span>
                            <img src="public/img/png/encircle-dropdown.png">
                        </div>
                        <div class="mid-bar"></div>
                        <div v-if="lead?.per_address?.length > 0">
                            <div class="address-section mt-[16px]">
                                <div class="add-label">Address</div>
                                <div class="ex-address">
                                    {{ lead?.per_address }}
                                </div>
                            </div>
                            <div class="mid-bar"></div>
                        </div>
                        <div class="address-grid"
                            v-if="(lead?.country?.length > 0) || (lead?.state?.length > 0) || (lead?.city?.length > 0) || (lead?.pincode?.length > 0)">
                            <div>
                                <div class="add-label">Country</div>
                                <div class="ex-address">{{ lead?.country }}</div>
                            </div>
                            <div>
                                <div class="add-label">State</div>
                                <div class="ex-address">{{ lead?.state }}</div>
                            </div>
                            <div>
                                <div class="add-label">City</div>
                                <div class="ex-address">{{ lead?.city }}</div>
                            </div>
                            <div>
                                <div class="add-label">Postal Code</div>
                                <div class="ex-address">{{ lead?.pincode }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="address-card mt-[32px] "
                        v-if="(lead?.corr_address?.length > 0) || (lead?.corr_country?.length > 0) || (lead?.corr_state?.length > 0) || (lead?.corr_city?.length > 0) || (lead?.corr_pincode?.length > 0)">
                        <div class="address-header pb-2">
                            <span>Correspondence Address</span>
                            <img src="public/img/png/encircle-dropdown.png">
                        </div>
                        <div class="mid-bar"></div>
                        <div v-if="lead?.corr_address?.length > 0">
                            <div class="address-section mt-[16px]">

                                <div class="add-label">Address</div>
                                <div class="ex-address">
                                    {{ lead?.corr_address }}
                                </div>
                            </div>
                            <div class="mid-bar"></div>
                        </div>
                        <div class="address-grid"
                            v-if="(lead?.corr_country?.length > 0) || (lead?.corr_state?.length > 0) || (lead?.corr_city?.length > 0) || (lead?.corr_pincode?.length > 0)">
                            <div>
                                <div class="add-label">Country</div>
                                <div class="ex-address">{{ lead?.corr_country }}</div>
                            </div>
                            <div>
                                <div class="add-label">State</div>
                                <div class="ex-address">
                                    {{ lead?.corr_state }}
                                </div>
                            </div>
                            <div>
                                <div class="add-label">City</div>
                                <div class="ex-address">{{ lead?.corr_city }}</div>
                            </div>
                            <div>
                                <div class="add-label">Postal Code</div>
                                <div class="ex-address">{{ lead?.corr_pincode }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-card mt-[18px]" v-if="lead?.family?.length > 0">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <img src="public/img/png/family-vector.png">
                        <span class="info-heade-heading">Family Details</span>
                    </div>

                    <img @click="isFamilyDetailsOpen = !isFamilyDetailsOpen" src="public/img/png/chevron-down.png">
                </div>
                <div class="mid-bar"></div>
                <div v-if="isFamilyDetailsOpen && lead?.family.length > 0" v-for="(ele, index) in lead.family">

                    <div class="info-row">
                        <div class="info-block">
                            <label> Name</label>
                            <p>{{ ele.name }}</p>
                        </div>
                        <div class="info-block">
                            <label>Relation</label>
                            <p>{{ ele.relation }}</p>
                        </div>
                        <div class="info-block">
                            <label>Phone Number</label>
                            <p>{{ ele.phone }}</p>
                        </div>
                    </div>
                    <div class="mid-bar"></div>
                    <div class="info-row mt-[18px]">
                        <div class="info-block">
                            <label>Email ID</label>
                            <p>{{ ele.email }}</p>
                        </div>
                        <div class="info-block">
                            <label>Gender</label>
                            <p>{{ ele.gender }}</p>
                        </div>
                        <div class="info-block">
                            <label>Occupation</label>
                            <p>{{ ele.occupation }}</p>
                        </div>
                    </div>
                    <div class="mid-bar"></div>
                </div>

            </div>
            <div class="info-card mt-[18px] " v-if="(lead?.primary?.length > 0) || (lead?.professional?.length > 0)">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <img src="public/img/png/education.png">
                        <span class="info-heade-heading">Education Details</span>
                    </div>

                    <img @click="isEducationOpen = !isEducationOpen" src="public/img/png/chevron-down.png">
                </div>
                <div class="mid-bar"></div>
                <div v-if="isEducationOpen > 0">

                    <div v-if="lead.primary.length > 0" class="address-card mt-[32px] ">
                        <div class="address-header pb-2">
                            <span>Primary Education</span>
                            <img src="public/img/png/encircle-dropdown.png">
                        </div>
                        <div v-for="(ele, index) in lead.primary">
                            <div class="mid-bar"></div>

                            <div class="address-section mt-[16px]">
                                <div class="add-label">Organization Name</div>
                                <div class="ex-address">
                                    {{ ele.org_name }}
                                </div>
                            </div>
                            <div class="mid-bar"></div>
                            <div class="address-grid">
                                <div>
                                    <div class="add-label">Board</div>
                                    <div class="ex-address">{{ ele.board }}</div>
                                </div>
                                <div>
                                    <div class="add-label">Pursuing</div>
                                    <div class="ex-address">{{ ele.pursuing }}</div>
                                </div>
                                <div>
                                    <div class="add-label">Stream</div>
                                    <div class="ex-address">{{ ele.stream }}</div>
                                </div>
                                <div>
                                    <div class="add-label">Passing Year</div>
                                    <div class="ex-address">{{ convertDate(ele.passing_year) }}</div>
                                </div>
                                <div>
                                    <div class="add-label">Score</div>
                                    <div class="ex-address">{{ ele.score }}</div>
                                </div>
                                <div>
                                    <div class="add-label">TYPE</div>
                                    <div class="ex-address">{{ ele.type }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="lead.professional.length > 0" class="address-card mt-[32px] ">
                        <div class="address-header pb-2">
                            <span>Professional Course</span>
                            <img src="public/img/png/encircle-dropdown.png">
                        </div>

                        <div v-for="(ele, index) in lead.professional">
                            <div class="mid-bar"></div>
                            <div class="address-section mt-[16px]">
                                <div class="add-label">Organization Name</div>
                                <div class="ex-address">
                                    {{ ele.org_name }}
                                </div>
                            </div>
                            <div class="mid-bar"></div>
                            <div class="education-grid">
                                <div>
                                    <div class="add-label">University</div>
                                    <div class="ex-address">{{ ele.uni }}</div>
                                </div>
                                <div>
                                    <div class="add-label">Pursuing</div>
                                    <div class="ex-address">{{ ele.pursuing }}</div>
                                </div>
                            </div>
                            <div class="education-1-grid">
                                <div>
                                    <div class="add-label">Stream</div>
                                    <div class="ex-address">{{ ele.stream }}</div>
                                </div>
                                <div>
                                    <div class="add-label">Passing Year</div>
                                    <div class="ex-address">{{ convertDate(ele.passing_year) }}</div>
                                </div>
                                <div>
                                    <div class="add-label">CGPA / POINTS / Grade</div>
                                    <div class="ex-address">{{ ele.cgpa }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="info-card mt-[18px]" v-if="lead?.other_fields?.length > 1">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <i class="bi bi-clipboard-plus custom-icon text-black drop-shadow-sm"></i>
                        <span class="info-heade-heading">Other Fields</span>
                    </div>

                    <img src="public/img/png/chevron-down.png" @click="isCustomOpen = !isCustomOpen">
                </div>
                <div class="mid-bar"></div>
                <div v-if="isCustomOpen">
                    <div class="address-section mt-[16px]" v-for="(ele, ind) in lead?.other_fields.slice(1)">
                        <div class="add-label">{{ ele.field_name }}</div>
                        <div class="ex-address">
                            {{ ele.field_value }}
                        </div>
                        <div class="mid-bar"></div>
                    </div>



                </div>
            </div>
        </div>
        <div class="info-right">
            <div class="card-section">
                <div class="dropdown-box rounded-tr-lg rounded-tl-lg">
                    <p class="label d-flex gap-[6px] align-items-center"><i class="bi bi-pin-angle"></i>
                        Priority</p>
                    <!-- <div class="relative">
                        <select
                            class="block w-full appearance-none border-none rounded-md pl-3 pr-10 py-0 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-m"
                            v-model="selectedPriority" @change="updatePriority" id="priority">
                            <option value="medium" selected> Medium</option>
                            <option value="highest">🔺 Highest</option>
                            <option value="high">🔼 High</option>
                           
                        </select>
                    </div> -->
                    <div class="relative w-full">
                        <div class="block w-full appearance-none border-none rounded-md py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-m cursor-pointer flex justify-between items-center"
                            @click="dropdownOpen = !dropdownOpen">
                            <span>
                                <span v-if="selectedPriority === 'highest'"><i
                                        class="bi bi-chevron-double-up text-[#ff5757] mr-1"></i> Highest</span>
                                <span v-else-if="selectedPriority === 'high'"><i
                                        class="bi bi-chevron-up text-[#ff5757] mr-1"></i> High</span>
                                <span v-else-if="selectedPriority === 'medium'"><i
                                        class="bi bi-list text-[#ff5757] mr-1"></i> Medium</span>
                                <span v-else-if="selectedPriority === 'low'"><i class="bi bi-chevron-down"></i>
                                    Low</span>
                                <span v-else-if="selectedPriority === 'lowest'"><i
                                        class="bi bi-chevron-double-down"></i> Lowest</span>

                            </span>
                            <i :class="['pi', , dropdownOpen ? 'pi-angle-up' : 'pi-angle-down']"></i>
                        </div>

                        <ul v-if="dropdownOpen"
                            class="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg py-1 text-[18px] pl-0">
                            <li @click="selectPriority('highest')" class="cursor-pointer px-3 py-2 hover:bg-[#f0f1f2]">
                                <i class="bi bi-chevron-double-up text-[#ff5757] mr-1"></i> Highest
                            </li>
                            <li @click="selectPriority('high')" class="cursor-pointer px-3 py-2 hover:bg-[#f0f1f2]">
                                <i class="bi bi-chevron-up text-[#ff5757] mr-1"></i>High
                            </li>
                            <li @click="selectPriority('medium')" class="cursor-pointer px-3 py-2 hover:bg-[#f0f1f2]">
                                <i class="bi bi-list text-[#ff5757] mr-1"></i> Medium
                            </li>
                            <li @click="selectPriority('low')" class="cursor-pointer px-3 py-2 hover:bg-[#f0f1f2]">
                                <i class="bi bi-chevron-down  mr-1"></i> Low
                            </li>
                            <li @click="selectPriority('lowest')" class="cursor-pointer px-3 py-2 hover:bg-[#f0f1f2]">
                                <i class="bi bi-chevron-double-down  mr-1"></i> Lowest
                            </li>
                        </ul>
                    </div>


                    <!-- <div class="dropdown-text">
                        Lead Not Assigned Yet
                        <img src="public/img/png/lead-small-dropdown.png">
                    </div> -->
                </div>
                <div class="dropdown-box">
                    <p class="label d-flex gap-[6px] align-items-center"><img src="/public/img/png/add-user-vector.png">
                        Lead Assigned </p>
                    <div class="select-option-1 flex justify-between">
                        <p v-if="lead.assigned_to == null" class="custom-select-1 cursor-pointer">Lead Not Assigned yet
                        </p>
                        <p v-else class="custom-select-1 cursor-pointer">{{ lead?.assigned_to?.name }}</p>
                        <p @click="counsellorModal = true" class="pi pi-angle-down"></p>
                        <!-- <select class="custom-select-1 cursor-pointer" @change="handleLeadAssign" required>
                            <option> Lead Not Assigned yet</option>
                            <option v-for="(ele, index) in items" :key="index" :value="ele.value">
                                {{ ele.label }}
                            </option>
                        </select> -->
                    </div>
                </div>





                <div class="dropdown-box rounded-br-lg rounded-bl-lg">
                    <p class="label d-flex gap-[6px] align-items-center"><img
                            src="public/img/png/Service-opted-vector.png">
                        Service Opted</p>
                    <div class="select-option-1">
                        <subservice :status="lead.service" :subStatus="lead.subService" @trigger-init="init" />

                    </div>
                </div>
                <div class="dropdown-box">
                    <p class="label d-flex gap-[6px] align-items-center"><img src="public/img/png/campaign-vector.png">
                        Listing</p>
                    <div class="select-option-1">



                        <select class="custom-select-1 cursor-pointer" v-model="listingId"
                            @focus="checkAndLoadCampaigns" @change="updateoptListing" required>
                            <!-- Pre-selected current listing (shown by default) -->
                            <option v-if="lead.listing && lead.listing._id" :value="lead.listing._id">
                                {{ lead.listing.title }}
                            </option>

                            <!-- Listing options from API -->
                            <option v-for="option in listinglistdata?.subservicename" :key="option.id"
                                :value="option.id">
                                {{ option.title }}
                            </option>
                        </select>





                    </div>
                </div>
            </div>
            <div class="info-card mt-[18px]  " v-if="lead?.languages?.length > 0">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <img src="public/img/png/language.png">
                        <span class="info-heade-heading">Language Proficiency</span>
                    </div>
                    <img @click="isLanguageProficiencyOpen = !isLanguageProficiencyOpen"
                        src="public/img/png/chevron-down.png">
                </div>
                <div class="mid-bar "></div>
                <div v-if="isLanguageProficiencyOpen">
                    <div v-for="(ele, index) in lead.languages">
                        <div class="mt-[32px] pb-2">
                            <div v-if="isPursuing(ele.completion_year)" class="status">
                                <span class="status-dot"></span>
                                <span class="status-text">Pursuing</span>
                            </div>
                            <div class="add-label mt-3">Examination Name</div>
                            <div class="ex-address">{{ ele.examination_name }}</div>
                        </div>
                        <div class="mid-bar mb-3"></div>
                        <!-- <div class="mt-4 mb-3">
                        <div class="add-label">Examination Name</div>
                        <div class="ex-address">Balanced multi-state software</div>
                    </div> -->
                        <div>
                            <div class="add-label">Completion Year</div>
                            <div class="ex-address">{{ convertDate(ele.completion_year) }}</div>
                        </div>
                        <div class="language-grid mt-[24px]">
                            <div v-for="(lang, index) in ele.score">
                                <div class="add-label">{{ lang.name }}</div>
                                <div class="ex-address">{{ lang.value }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="info-card mt-[18px] " v-if="lead?.job?.length > 0">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <img src="public/img/png/Career.png">
                        <span class="info-heade-heading">Career Details</span>
                    </div>
                    <img @click="isCareerDetailsOpen = !isCareerDetailsOpen" src="public/img/png/chevron-down.png">
                </div>
                <div class="mid-bar"></div>
                <div v-if="isCareerDetailsOpen">
                    <div v-for="(ele, index) in lead.job">
                        <div class="mt-[32px] pb-2">
                            <div v-if="ele.end == null" class="status">
                                <span class="status-dot"></span>
                                <span class="status-text">Pursuing</span>
                            </div>
                            <div class="add-label mt-3">Organization Name</div>
                            <div class="ex-address">{{ ele.company }}</div>
                        </div>
                        <div class=" pb-2">
                            <div class="add-label mt-3">Job Role</div>
                            <div class="ex-address">{{ ele.role }}</div>
                        </div>

                        <div class="language-grid pb-2 ">
                            <div>
                                <div class="add-label mt-3">Starting Year</div>
                                <div class="ex-address">{{ convertDate(ele.start) }}</div>
                            </div>
                            <div v-if="ele.end">
                                <div class="add-label mt-3">Ending Year</div>
                                <div class="ex-address">{{ convertDate(ele.end) }}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="info-card mt-[18px] " v-if="lead?.refusal?.length > 0">
                <div class="info-header d-flex align-items-center justify-content-between">
                    <div class="header-title d-flex align-items-center gap-[12px]">
                        <img src="public/img/png/Refusal-vector.png">
                        <span class="info-heade-heading">Refusal</span>
                    </div>
                    <img @click="isRefusalOpen = !isRefusalOpen" src="public/img/png/chevron-down.png">
                </div>
                <div class="mid-bar"></div>
                <div v-if="isRefusalOpen">
                    <div class="mt-[32px] pb-2">
                        <div v-for="(ele, index) in lead.refusal">
                            <div class="language-grid pb-[22px] ">
                                <div>
                                    <div class="add-label ">Country</div>
                                    <div class="ex-address">{{ ele.country }}</div>
                                </div>
                                <div>
                                    <div class="add-label ">Year</div>
                                    <div class="ex-address">{{ ele.year }}</div>
                                </div>
                            </div>
                            <div class="pb-[10px]">
                                <div class="add-label">Refusal Note</div>
                                <div class="ex-address">{{ ele.reason }}</div>
                            </div>
                            <div class="mid-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <LeadDocuments v-if="activeTab === 'documents'" />
        <LeadComments v-if="activeTab === 'comments'" :lead="lead" @trigger-init="init" />
        <!-- <LeadRecommendation v-if="activeTab === 'recommendation'" /> -->
        <LeadAgreement v-if="activeTab === 'agreement'" />
        <LeadAppointments v-if="activeTab === 'appointment'" :lead="lead" />
        <LeadInvoice v-if="activeTab === 'invoice'" />
    </div>

    <!-- quick-action-button -->
    <div class="conatiner-open">
        <div v-show="quickActionOpen" class="quick-actions">
            <div class="quick-head">
                <img src="/public/img/png/quick-action.png"> Quick Actions
            </div>
            <div class="action-items">
                <!-- <div class="action-item">
                    <div @click="handleConvertedLead('convert')" class="inner-item"><img
                            src="/public/img/png/user-image.png">Convert Lead To Customer</div>
                    <img src="/public/img/png/side-arrow.png">
                </div> -->
                <div class="action-item follow-ups">
                    <div @click="addFollowup = true" class="inner-item"><img
                            src="/public/img/png/Calendar-img.png">Follow
                        Up's</div> <img src="/public/img/png/side-arrow.png">
                    <!-- <span class="badge">8</span> -->
                </div>
                <div class="action-item">
                    <div @click="handleQuickActionCall" class="inner-item"><img src="/public/img/png/Telephone.png">
                        Call Lead</div> <img src="/public/img/png/side-arrow.png">
                </div>
                <div class="action-item-1">
                    <div class="inner-item"><img src="/public/img/png/logos_whatsapp-icon-small.png">WhatsApp</div> <img
                        src="/public/img/png/side-arrow.png">
                </div>
            </div>
            <div @click="quickActionOpen = false" class="close-btn">&times;</div>
        </div>
        <div class="quick-actions-button" @click="quickActionOpen = true">
            <img src="/public/img/png/quick-action.png"> <span>Quick Actions</span>
        </div>
    </div>
    <!-- footer-popup -->
    <!-- <div class="follow-up-wrapper">
        <div class="follow-up-card ">
            <div class="left-section">
                <div class="icon"><img src="/public/img/png/warning-vector.png"></div>
                <div class="content">
                    <div class="date">OCT 15 2024, 03:25 PM</div>
                    <div class="note">
                        Follow-Up Note lorem ipsum...
                        <a href="#" class="read-more">read more</a>
                    </div>
                </div>
            </div>
            <div class="right-section">
                <button class="btn-outline"><span class="icon"><img src="/public/img/png/clock-vector.png"></span>
                    Ignore</button>
                <button class="btn-filled"><span class="icon"><img src="/public/img/png/Double-tick-vector.png"></span>
                    Followuped</button>
            </div>
        </div>
    </div> -->


    <div v-if="!ignore && latestFollowup" class="follow-up-wrapper">
        <div class="follow-up-card">
            <div class="left-section">
                <div class="icon">
                    <img src="/public/img/png/warning-vector.png" />
                </div>
                <div class="content">
                    <div class="flex">
                        <div class="date">
                            {{ formatDate(latestFollowup.reminder_date) }}, {{ latestFollowup.reminder_time }}

                        </div>
                        <div v-if="remainingCount > 0" class="mt-2 text-sm text-gray-500"
                            @mouseenter="tooltipVisible = true" @mouseleave="tooltipVisible = false">
                            <span>+{{ remainingCount }} more follow-ups due</span>

                            <div v-if="tooltipVisible" class="tooltip-box-followup">
                                <ul>
                                    <li v-for="(item, index) in dueFollowups.slice(1)" :key="item._id">
                                        <!-- {{ item.comment.length > 30 ? item.comment.slice(0, 30) + '...' : item.comment
                                        }}<br /> -->
                                        <small class="text-xs text-gray-600">Missed: {{
                                            getTimeMissed(getReminderDateTime(item)) }}</small>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div class="note">
                        {{ displayedComment }}
                        <a v-if="isLongComment" href="#" class="read-more" @click.prevent="toggleReadMore">
                            {{ isExpanded ? 'read less' : 'read more' }}
                        </a>
                    </div>
                </div>
            </div>
            <div class="right-section">
                <button class="btn-outline" @click="ignoreFollowup">
                    <span class="icon"><img src="/public/img/png/clock-vector.png" /></span> Ignore
                </button>
                <button class="btn-filled" @click="markFollowuped">
                    <span class="icon"><img src="/public/img/png/Double-tick-vector.png" /></span> Followuped
                </button>
            </div>

        </div>


    </div>
    <!-- call-lead  -->
    <!-- <div class="call-lead" v-if="show_call_lead" @click="addSecondSidebar = true">
        <div class="action-items">
            <div class="call-item">
                <div class="inner-item"><img src="/public/img/png/Telephone.png"> Call Lead</div> <img
                    src="/public/img/png/side-arrow.png" class="call-lead-down-arrow">
            </div>
        </div>
    </div> -->

    <!-- call-lead-first-offcanvas -->
    <Sidebar v-model:visible="addSidebar" position="right"
        class="  h-fit  w-[88vw] sm:w-[55vw]  md:w-[42vw]  lg:w-[32vw]  xl:w-[26vw] 2xl:w-[20vw]  border-t-[4px] border-[#18353B] rounded-lg"
        title="CSV Upload Status">
        <div class="call-action-items">
            <div class="call-item">
                <div class="inner-item"><img src="/public/img/png/Telephone.png"> Call Lead</div> <img
                    src="/public/img/png/side-arrow.png">
            </div>
        </div>
        <div class="contact-card">
            <div class="contact-name">{{ lead.name }}</div>
            <div class="contact-phone">
                <i class="pi pi-phone"></i> {{ lead.phone }}
            </div>
        </div>
        <div class="call-action-item-1" @click="handleCallConnected">
            Call Connected<img src="/public/img/png/side-arrow.png">
        </div>
        <div class="call-action-item-1" @click="openThirdSidebar">
            Call Not Connected<img src="/public/img/png/side-arrow.png">
        </div>
    </Sidebar>

    <Sidebar v-model:visible="addSecondSidebar" position="right"
        class=" h-[45vh] xs:w-[60vw] xs:h-[43vh] sm:w-[50vw] sm:h-[40vh] md:w-[41vw] md:h-[40vh] lg:w-[30vw] lg:h-[38vh] xl:w-[25vw] xl:h-[39vh] 2xl:w-[22vw] 2xl:[45vh] border-t-[4px] border-[#18353B] rounded-lg"
        title="CSV Upload Status">

        <div class="call-action-items">
            <div class="call-item">
                <div class="call-inner-item"><i class="pi pi-phone"></i> Call Connected</div>
                <img src="/public/img/png/side-arrow.png" class="call-lead-up-arrow">
            </div>
        </div>
        <div class="call-timer-card">
            <div class="timer-display">{{ formattedTime }}</div>
            <div class="end-call" @click="endCall">End Call</div>
        </div>
        <div class="call-action-item-1" @click="handleAddRemark">
            Add Remark <img src="/public/img/png/side-arrow.png">
        </div>
        <div class="call-action-item-1" @click="addFollowup = true">
            Add Followup <img src="/public/img/png/side-arrow.png">
        </div>
    </Sidebar>

    <Sidebar v-model:visible="addThirdSidebar" position="right"
        class="  h-fit py-[80px] w-[88vw] sm:w-[50vw]  md:w-[41vw]  lg:w-[30vw]  xl:w-[25vw] 2xl:w-[22vw] border-t-[4px] border-[#18353B] rounded-lg"
        title="CSV Upload Status">
        <div class="call-action-items pb-3">
            <div class="call-item">
                <div class="call-inner-item"><img src="/public/img/png/call-cut.png"> Call Not Connected</div> <img
                    src="/public/img/png/side-arrow.png" class="call-lead-up-arrow">
            </div>
        </div>
        <div class="call-action-item-1" @click="handleAddRemark">
            Add Remark<img src="/public/img/png/side-arrow.png">
        </div>

        <div class="call-action-item-1" @click="addFollowup = true">
            Add Followup<img src="/public/img/png/side-arrow.png">
        </div>
    </Sidebar>

    <Dialog v-model:visible="addFollowup" modal header="Add Follow Up" :draggable="false"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <FormKit type="form" @submit="addFollowupdata">
            <div class="">
                <label class="leads-label-assign-add">Date Time</label><br>
                <FormKit validation="required" name="time" id="update-events-drpsem-add" type="datetime-local"
                    placeholder="name" :min="new Date().toISOString().slice(0, 16)" />
            </div>
            <div class="leads-addjb-dtls-mdl">
                <div class="add-leads-persn-dropdd mt-3">
                    <label class="leads-label-assign-add">Status</label>
                    <FormKit validation="required" type="select" name="status" id="update-events-drpsem-add-btw"
                        placeholder="Select Status" :options="lead_statuss" />
                </div>
                <div class="add-leads-persn-dropdd mt-3">
                    <label class="leads-label-assign-add">Follow Up Comments</label><br>
                    <FormKit validation="required" name="comment" id="update-events-drpsem-add" type="textarea"
                        placeholder="------" />
                </div>
            </div>
            <div class="modal-footer-section flex justify-content-between">
                <button @click="addFollowup = false" class=" mt-4  rounded px-4 py-2 followup-btn-btn-cancel"
                    data-bs-dismiss="modal" id="close">Go
                    back</button>
                <button type="submit" class=" mt-4  rounded px-4 py-2 followup-btn-btn-aded">Submit</button>
            </div>
        </FormKit>
    </Dialog>

    <Dialog v-model:visible="counsellorModal" modal header="Convert To Customer"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <FormKit type="form" @submit="convertCustomer" class="leads-form-style">
            <div>
                <label class="single-lead-cmttitls">Assign Counsellor</label><br />
                <FormKit validation="required" type="select" name="assigned_to" class="single-lead-cmt-mdlo"
                    placeholder="Task title" validation-label="Counsellor" @change="getSubCouncellor" :options="items"
                    v-model="selectedOption" />
            </div>
            <span>
                <label class="leads-label-assign-add mt-3">Assign Description</label>
                <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn"
                    validation-label="Description" />
            </span>
            <div class="modal-footer-section">
                <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close" @click="counsellorModal = false">Go back</button> -->
                <button type="submit" class="mt-4 rounded px-4 py-2 btn-btn-dle-appt">Submit</button>
            </div>
        </FormKit>
    </Dialog>

    <Dialog v-model:visible="commentCallmodal" modal header="New Comment"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <FormKit type="form" @submit="addComment" class="leads-form-style">
            <div>
                <label class="single-lead-cmttitls">Remark</label><br />
                <FormKit validation="required" name="comment" class="single-lead-cmt-mdlo" type="text"
                    placeholder="Task title" />
            </div>
            <div class="modal-footer-section">
                <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go back</button> -->
                <button type="submit" class="mt-4  rounded px-4 py-2 followup-btn-btn-dle-appt">Submit</button>
            </div>
        </FormKit>
    </Dialog>

    <Dialog v-model:visible="commentmodal" modal header="New Comment"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <FormKit type="form" @submit="addRemarkComment" class="leads-form-style">
            <div>
                <label class="single-lead-cmttitls">Remark</label><br />
                <FormKit validation="required" name="comment" class="single-lead-cmt-mdlo" type="text"
                    placeholder="Task title" />
            </div>
            <div class="modal-footer-section">
                <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go back</button> -->
                <button type="submit" class=" mt-4  rounded px-4 py-2 followup-btn-btn-dle-appt">Submit</button>
            </div>
        </FormKit>
    </Dialog>

    <Dialog v-model:visible="Emailmodal" modal header="Email Required"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <div>
            <p class="text-center">Lead Email is required for the following action!</p>
            <div class="flex align-items-center justify-content-center gap-4">
                <button @click="Emailmodal = false" class=" mt-2  rounded px-4 py-2 followup-btn-btn-cancel"
                    data-bs-dismiss="modal" id="close">Go back</button>
                <button @click="handleSubmit()" class=" mt-2  rounded px-4 py-2 btn-btn-dle-appt">Update Email</button>
            </div>
        </div>
    </Dialog>

</template>

<script>
import { setCookie, getCookie, deleteCookie } from '@/utils/cookies';
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import LeadDocuments from '../../Components/LeadDocuments/LeadDocuments.vue';
import LeadComments from '../../Components/LeadComments/index.vue';
// import LeadRecommendation from '../../Components/LeadRecommendation/index.vue';
import LeadAgreement from '../../Components/LeadAgreement/index.vue';
import LeadAppointments from '../../Components/LeadAppointments/index.vue';
import LeadInvoice from '../../Components/LeadInvoice/index.vue';
import prac from '../../Components/prac/index.vue'
import subservice from '../../Components/Service/index.vue';
export default {
    components: {
        QuillEditor,
        LeadDocuments,
        LeadComments,
        // LeadRecommendation,
        LeadAgreement,
        LeadAppointments,
        LeadInvoice,
        prac,
        subservice
    },
    data() {
        return {
            dropdownOpen: false,
            isCustomOpen: false,
            selectedPriority: 'medium',
            currentPage: "",
            totalPages: "",
            baseLeadId: '683a93636f1e3a4027649bdb',
            isOpen: true,
            isAddressOpen: false,
            isFamilyDetailsOpen: false,
            isEducationOpen: false,
            isLanguageProficiencyOpen: false,
            isCareerDetailsOpen: false,
            isRefusalOpen: false,
            isShowing: false,
            quickActionOpen: false,
            addSidebar: false,
            addSecondSidebar: false,
            addThirdSidebar: false,
            addFollowup: false,
            activeTab: 'overview',
            //logic
            lead: {},
            selectedPriority: "",
            lead_statuss: [],
            counsellorModal: false,
            items: [],
            loading: false,


            //call
            callDuration: 0, // in seconds
            timerInterval: null,
            commentmodal: false,
            commentCallmodal: false,
            Emailmodal: false,


            //ids
            ids: [],
            //show acll lead

            //convert lead quick ation
            convert_lead: false,
            //followup
            followups: [],
            ignore: false,
            isExpanded: false,
            tooltipVisible: false,
            listingId: '',
            listinglistdata: null,

        }
    },
   
    computed: {
        //followup read more
        words() {
            return this.latestFollowup?.comment?.trim().split(/\s+/) || [];
        },
        isLongComment() {
            return this.words.length > 6;
        },
        displayedComment() {
            if (this.isExpanded || !this.isLongComment) {
                return this.latestFollowup.comment;
            }
            return this.words.slice(0, 6).join(' ') + '...';
        },
        showReadMore() {
            if (!this.latestFollowup?.comment) return false;
            return this.latestFollowup.comment.trim().split(/\s+/).length > 8;
        },
        formattedTime() {
            const hours = String(Math.floor(this.callDuration / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((this.callDuration % 3600) / 60)).padStart(2, '0');
            const seconds = String(this.callDuration % 60).padStart(2, '0');
            return `${hours} : ${minutes} : ${seconds}`;
        },
        paginatedLeadId() {
            return this.currentPage === 1
                ? this.baseLeadId
                : this.baseLeadId + this.currentPage;
        },
        //followup
        now() {
            return new Date()
        },
        dueFollowups() {
            return this.followups
                .filter(f => {
                    if (f.followup_status !== false) return false
                    const reminderDateTime = this.getReminderDateTime(f)
                    return reminderDateTime <= this.now
                })
                .sort((a, b) => this.getReminderDateTime(b) - this.getReminderDateTime(a))
        },
        latestFollowup() {
            return this.dueFollowups.length ? this.dueFollowups[0] : null
        },
        remainingCount() {
            return this.dueFollowups.length > 1 ? this.dueFollowups.length - 1 : 0
        },
        dueFollowupIds() {
            return this.dueFollowups.map(f => f._id)
        }
    },

    watch: {
        addSecondSidebar(newVal) {
            if (newVal) {
                this.addSidebar = false;
                this.startTimer(); // Ensure timer starts if sidebar opens
            }

        },

        '$route.query': {
            immediate: true,
            deep: true,
            handler(query) {
                if (query.callPopup === 'true' || query.callPopup === true) {
                    this.addSecondSidebar = true;

                    const active = getCookie('callActive') === 'true';
                    if (active) {
                        this.callLeadId = getCookie('callLeadId');
                        this.updateCallDuration();

                        if (this.timerInterval) clearInterval(this.timerInterval);
                        this.timerInterval = setInterval(() => {
                            this.updateCallDuration();
                        }, 1000);
                    }
                }
            }
        },


    },
    async mounted() {
        activateSubmenu('c1', 'Customers');
 
        await this.init();
        await this.initIds()
        this.initLeadStatus();
        this.getSubCouncellor();


        const active = getCookie('callActive') === 'true';
        if (active) {
            this.show_call_lead = false;
            this.addSecondSidebar = true
            this.callLeadId = getCookie('callLeadId') || null;
            this.updateCallDuration(); // get duration since start

            this.timerInterval = setInterval(() => {
                this.updateCallDuration(); // keep updating every second
            }, 1000);
        }

    },


    methods: {
        checkAndLoadCampaigns() {
            if (!this.lead.service || !this.lead.subService) {
                errorAlert("Please select lead service and subservice first.");
                return;
            }

            // If both service and subservice are selected, fetch campaigns
            this.listingList(); // or your API function to get campaign/listings
        },
        async listingList() {
            const payload = {
                service_name: this.lead?.service || "",
                sub_service_name: this.lead?.subService || ""
            }

            const Listingdata = await adminPost('/service-subservice-listing', payload)
            this.listinglistdata = Listingdata.data
            console.log("this.listingdata", this.listinglist)
        },
        async updateoptListing() {
            if (await askConfirm('Do you want to update the Listing?', 'Update Listing', 'Update', 'No')) {
                this.loading = true

                await adminPut(`/update-leads-status/${this.lead._id}/`, { listing: this.listingId })
                successAlert('Lead listing updated successfully!');
                this.init()
            }
        },
        toggleReadMore() {
            this.isExpanded = !this.isExpanded;
        },

        getReminderDateTime(followup) {
            const [hours, minutes] = followup.reminder_time.split(':')
            const date = new Date(followup.reminder_date)
            date.setHours(+hours, +minutes, 0, 0)
            return date
        },
        getTimeMissed(date) {
            const missed = new Date(date);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            return missed.toLocaleString('en-US', options);
        },


        formatDate(dateStr) {
            const options = { month: 'short', day: '2-digit', year: 'numeric' }
            return new Date(dateStr).toLocaleDateString('en-US', options)
        },
        ignoreFollowup() {
            this.ignore = true // just hide the card
        },
        async markFollowuped() {
            console.log(this.dueFollowupIds)
            try {
                adminPut('/update-followup-status', { ids: this.dueFollowupIds })
                this.followups = this.followups.filter(f => !this.dueFollowupIds.includes(f._id))
                this.ignore = false
            } catch (err) {
                console.error('Error updating followups:', err)
                alert('Failed to update followup status')
            }
        },

        handleLeadAssign() {
            this.counsellorModal = true
        },
        handleactive(ele) {
            this.activeTab = ele
        },
        handleEmail(ele) {
            if (this.lead.email == null || this.lead.email == "") {
                this.Emailmodal = true
            } else {
                this.handleactive(ele)
            }
        },
        handleSubmit() {
            this.$router.push({
                path: `/admin/leads/update/${this.$route.params.id}`,
            });
        },
        async init() {
            this.lead.loading = true
            await adminGet(`/leads/${this.$route.params.id}`).then(response => {
                this.lead = response.data.data
                if (this.lead.listing) {
                    this.listingId = this.lead.listing._id || '';
                    console.log('listing found:', this.lead.listing);
                } else {
                    this.listingId = '';
                    console.log('no listing found:', this.listingId);
                }
                this.followups = response.data.followup
                console.log("lead", this.lead)
                this.selectedPriority = this.lead.priority
            })
        },
        async initIds() {
            console.log("checking init id call")
            this.lead.loading = true
            if (this.$route.query.currintid && this.$route.query.page) {
                await adminGet(`/circular-customers/${this.$route.query.currintid}/customer`).then(response => {
                    this.ids = response.data.data
                    console.log("ids", this.ids)
                    this.currentPage = this.$route.query.page
                    this.totalPages = this.ids.length
                })
            } else {
                await adminGet(`/circular-customers/${this.$route.params.id}/customer`).then(response => {
                    this.ids = response.data.data
                    console.log("ids", this.ids)
                    this.currentPage = 1
                    this.totalPages = this.ids.length
                })
            }


        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            const targetId = this.ids[this.currentPage - 1];

            console.log(this.currentPage, this.ids[this.currentPage - 1])
            this.$router.push({
                path: `/admin/leads-new/lead-view/${targetId}`,
                query: { page: this.currentPage, currintid: this.ids[0] }
            });

        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            const targetId = this.ids[this.currentPage - 1];

            this.$router.push({
                path: `/admin/leads-new/lead-view/${targetId}`,
                query: { page: this.currentPage, currintid: this.ids[0] }
            });

            console.log(this.currentPage, this.ids[this.currentPage - 1])
        },
        selectPriority(value) {
            this.selectedPriority = value;
            this.updatePriority(); // Maintain the same functionality
            this.dropdownOpen = false;
        },
        convertDate(isoDate) {
            const date = new Date(isoDate);
            const options = { year: 'numeric', month: 'short', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return formattedDate;
        },
        async initLeadStatus() {
            this.loading = true
            await adminGet(`/leadstatus`).then(async (response) => {
                this.lead_statuss = []
                response.data.leadstatus.forEach((i) => { this.lead_statuss.push(i.statusname) })
            })
            this.loading = false
        },
        async updatePriority() {
            if (await askConfirm('Do you want to update the priority?', 'Update Priority', 'Update', 'No')) {
                this.loading = true
                await adminPut(`/update-leads-status/${this.lead._id}`, { priority: this.selectedPriority })
                successAlert('Lead priority updated successfully!');
                this.$parent.init()
            }
        },


        async changeStatus() {
            if (this.lead.lead_status === "Converted Lead") {
                this.handleConvertedLead();
            }
            else {
                this.handleOtherStatus();
            }
        },
        async handleOtherStatus() {
            if (await askConfirm('Do you want to update the status?', 'Update Status', 'Update', 'No')) {
                this.loading = true
                await adminPut(`/update-leads-status/${this.lead._id}`, { lead_status: this.lead.lead_status })
                successAlert('Lead status updated successfully!');
                this.$parent.init()
            }
        },
        async handleConvertedLead(covert) {
            console.log("conveerted status")
            if (covert == "convert") {
                this.convert_lead = true
            }
            this.counsellorModal = true;
            this.getSubCouncellor();
        },
        async getSubCouncellor() {
            this.loading = true
            this.items = (await adminGet(`/select-employes-list`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
            this.loading = false
        },
        async convertCustomer(v) {
            this.loading = true
            if (this.convert_lead) {
                await adminPut(`/assign-leads/${this.lead._id}`, v).then(async (response) => {
                    await adminPut(`/convert-customer/${this.lead._id}`).then(async (response) => {
                        this.$router.push("/admin/customers/view")
                        this.counsellorModal = false;
                    })
                    this.init()
                    this.convert_lead = false
                })
            } else {
                await adminPut(`/assign-leads/${this.lead._id}?OnlyAssign=true`, v).then(async (response) => {
                    // await adminPut(`/convert-customer/${this.lead._id}`).then(async (response) => {
                    // this.$router.push("/admin/customers/view")
                    // this.counsellorModal = false;
                    // })
                    this.init()
                    this.counsellorModal = false;
                })
            }

            this.loading = false
        },

        //campaigns

        //call
        // startTimer() {
        //     this.callDuration = 0;
        //     if (this.timerInterval) clearInterval(this.timerInterval);
        //     this.timerInterval = setInterval(() => {
        //         this.callDuration++;
        //     }, 1000);
        // },
        handleCallConnected() {
            const active = getCookie('callActive') === 'true';

            if (active) {
                this.$toast?.add({
                    severity: 'warn',
                    summary: 'Active Call',
                    detail: 'A call is already in progress. Please end the current call first.',
                    life: 4000
                });
                return;
            }

            // Otherwise, open the call sidebar and start timer
            this.startTimer(); // your timer logic that sets cookies etc.
            this.addSecondSidebar = true;
        },


        startTimer() {
            if (this.timerInterval) return; // prevent double intervals

            this.callDuration = 0;
            const now = new Date().toISOString();
            localStorage.setItem("hllo", "hjds")
            setCookie('callStartTime', now, 1);
            setCookie('callDuration', this.callDuration, 1);
            setCookie('callLeadId', this.$route.params.id, 1);
            setCookie('callActive', 'true', 1);
            this.timerInterval = setInterval(() => {
                this.callDuration++;


            }, 1000);

            this.show_call_lead = true; // track call in progress
            this.addSecondSidebar = true; // open sidebar initially
        },

        // startTimer() {
        //     if (this.timerInterval) return;

        //     // Save current timestamp when the call starts
        //     const now = new Date().toISOString();
        //     setCookie('callStartTime', now, 1);
        //     setCookie('callLeadId', this.$route.params.id, 1);
        //     setCookie('callActive', 'true', 1);

        //     this.timerInterval = setInterval(() => {
        //         this.updateCallDuration(); // compute duration dynamically
        //     }, 1000);

        //     this.show_call_lead = true;
        //     this.addSecondSidebar = true;
        // },


        updateCallDuration() {
            const startTime = getCookie('callStartTime');

            if (startTime) {
                const now = new Date();
                const start = new Date(startTime);
                const diffInSeconds = Math.floor((now - start) / 1000);
                this.callDuration = diffInSeconds;
            } else {
                this.callDuration = 0;
            }
        },

        stopTimer() {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            // this.show_call_lead = false;
        },

        async endCall() {
            const confirmed = await askConfirm(
                'Are you sure you want to End Call?',
                'Add Remark',
                'Yes',
                'No'
            );
            if (confirmed) {
                this.stopTimer();
                this.commentCallmodal = true;
                this.addSecondSidebar = false;
            }
        },


        async addComment(v) {
            v.customer_id = this.$route.params.id
            v.call_time = this.formattedTime
            this.commentCallmodal = false
            this.loading = true;
            await adminPost(`/add-comment`, v).then(response => {
            })

            clearInterval(this.timerInterval);
            this.timerInterval = null;

            deleteCookie('callStartTime');
            deleteCookie('callLeadId');
            deleteCookie('callActive');
            this.addSecondSidebar = false
            this.init()
        },

        async addRemarkComment(v) {
            v.customer_id = this.$route.params.id
            this.commentmodal = false
            this.loading = true;
            await adminPost(`/add-comment`, v).then(response => {
            })
            this.init()
        },

        //comment
        async handleAddRemark() {
            const confirmed = await askConfirm(
                'Are you sure you want to add remark?',
                'Add Remark',
                'Yes',
                'No'
            );

            if (confirmed) {
                this.commentmodal = true;
                console.log("model", thiscommentmodal)
            } else {
                this.commentmodal = false; // optional but ensures it's closed
            }
        },

        //followp
        async addFollowupdata(d) {
            let x = {
                customer_id: this.$route.params.id,
                comment: d.comment,
                type: "followup",
                reminder_date: d.time.split("T")[0],
                reminder_time: d.time.split("T")[1],
                status: d.status
            }
            await adminPost(`/add-comment`, x).then(async (r) => {
                this.addFollowup = false
                this.init()
                successAlert("Followup Added")
            }).catch((e) => { })
        },
        handleQuickActionCall() {

            this.quickActionOpen = false;
            this.addSidebar = true;
        },
        openThirdSidebar() {
            this.addSidebar = false;
            this.addThirdSidebar = true;
        },
        isPursuing(completionDate) {
            if (!completionDate) return false;
            const today = new Date();
            const parsedDate = new Date(completionDate);
            return parsedDate > today;

        },


    },
    beforeUnmount() {
        this.stopTimer();
    }
}
</script>

<style scoped>
@import url('style.css');

.tooltip-box-followup {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
    z-index: 10;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    min-width: 220px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}


.tooltip-box-followup ul {
    list-style: none;
    padding: 0;
    margin: 0;


}

.tooltip-box-followup li {

    margin-bottom: 8px;


}
</style>