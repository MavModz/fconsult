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
                            <div class="lead-detail capitalize">
                                <span>Lead Source </span>
                                <p>{{ lead?.source }}</p>
                            </div>
                            <div v-if="nextFollowup" class="lead-detail">
                                <span>Next Follow Up</span>
                                <p>
                                    <span>{{ convertDate(nextFollowup.reminder_date) }}</span>{{ }}
                                    <span>{{ nextFollowup.reminder_time }}</span>
                                </p>

                                <!-- <p>{{ convertDate(getNextUpcomingFollowup()) }}</p> -->
                            </div>
                        </div>
                        <div class="full-width">
                            <div class="duplicate-lead  d-flex align-items-center gap-[5px]" v-if="lead.duplicate"><img
                                    @mouseenter="isShowing = true" @mouseleave="isShowing = false"
                                    src="/public/img/png/alert-vector.png" width="14px"> DUPLICATE
                                LEAD</div>
                            <div v-if="isShowing" class="tooltip-box">
                                This lead has Inquired <strong>{{ lead.inquiry_count }} </strong> Time(s) by <strong> {{
                                    lead.source }}</strong> source on <span class="highlight">{{ convertDate(lead?.date)
                                    }}</span>
                                &amp; Assigned to <strong>{{ lead?.assigned_to?.name }}</strong> &amp; is stored in
                                <strong>{campaign name}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lead-actions flex">
                    <div class="">
                        <prac :status="lead.lead_status" :subStatus="lead.lead_sub_status" @trigger-init="init" />
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
                <div v-if="lead?.emails?.length > 0" class="tab d-flex align-items-center gap-[8px]"
                    :class="{ active: activeTab === 'emails' }" @click="handleEmail('emails')"> <i
                        class="bi bi-envelope"></i>Email</div>

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
                    <img @click="isOpen = !isOpen" src="/img/png/chevron-down.png" alt="toggle" class="cursor-pointer"
                        :style="{
                            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 200ms ease'
                        }" />
                    <!-- <NuxtImg @click="isOpen = !isOpen" src="/img/png/drop-icon.png" class="cursor-pointer" /> -->
                </div>
                <div class="mid-bar" v-if="isOpen"></div>
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
                            <p>{{ convertDate(lead?.dob) || 'N/A' }}</p>
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
                            <p>{{ lead?.gender || 'N/A' }}</p>
                        </div>
                        <div class="info-block">
                            <label>Age</label>
                            <p>{{ lead?.age || 'N/A' }}</p>
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

                    <!-- <NuxtImg @click="isAddressOpen = !isAddressOpen" src="/img/png/drop-icon.png" class="cursor-pointer"
                        width="17" height="10" /> -->
                    <img @click="isAddressOpen = !isAddressOpen" src="/img/png/chevron-down.png" alt="toggle"
                        class="cursor-pointer" :style="{
                            transform: isAddressOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 200ms ease'
                        }" />
                </div>
                <div class="mid-bar" v-if="isAddressOpen"></div>
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
                    <img @click="isFamilyDetailsOpen = !isFamilyDetailsOpen" src="/img/png/chevron-down.png"
                        alt="toggle" class="cursor-pointer" :style="{
                            transform: isFamilyDetailsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 200ms ease'
                        }" />
                    <!-- <img @click="isFamilyDetailsOpen = !isFamilyDetailsOpen" src="public/img/png/chevron-down.png"> -->
                </div>
                <div class="mid-bar" v-if="isFamilyDetailsOpen && lead?.family.length > 0"></div>
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
                    <img @click="isEducationOpen = !isEducationOpen" src="/img/png/chevron-down.png" alt="toggle"
                        class="cursor-pointer" :style="{
                            transform: isEducationOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 200ms ease'
                        }" />
                    <!-- <img @click="isEducationOpen = !isEducationOpen" src="public/img/png/chevron-down.png"> -->
                </div>
                <div class="mid-bar" v-if="isEducationOpen > 0 && lead.primary.length > 0"></div>
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
        <div class="info-right mb-5">
            <div class="card-section">
                <div class="dropdown-box rounded-tr-lg rounded-tl-lg">
                    <p class="label d-flex gap-[6px] align-items-center"><i class="bi bi-pin-angle"></i>
                        Priority</p>
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
                </div>
                <div class="dropdown-box">
                    <p class="label d-flex gap-[6px] align-items-center"><img src="/public/img/png/add-user-vector.png">
                        Lead Assigned </p>
                    <div class="select-option-1 flex justify-between">
                        <p v-if="lead.assigned_to == null" class="custom-select-1  mb-0 cursor-pointer">Lead Not
                            Assigned yet
                        </p>
                        <p v-else class="custom-select-1 mb-0 cursor-pointer">{{ lead?.assigned_to?.name }}</p>
                        <p @click="counsellorModal = true; assign = true" class="pi pi-angle-down"></p>
                        <!-- <select class="custom-select-1 cursor-pointer" @change="handleLeadAssign" required>
                            <option> Lead Not Assigned yet</option>
                            <option v-for="(ele, index) in items" :key="index" :value="ele.value">
                                {{ ele.label }}
                            </option>
                        </select> -->
                    </div>
                </div>
                <div class="dropdown-box">
                    <p class="label d-flex gap-[6px] align-items-center"><img src="public/img/png/campaign-vector.png">
                        Campaign</p>
                    <div class="select-option-1">
                        <!-- <p v-if="lead?.lead_source_history?.length == 0" class="custom-select-1 cursor-pointer">Campaign
                            Name Here
                        </p>
                        <p v-else class="custom-select-1 cursor-pointer">{{
                            lead?.lead_source_history?.[0]?.campaign_name }}
                        </p> -->
                        <select class="custom-select-1 cursor-pointer" v-model="lead.campaign"
                            @change="updateoptCampain" required>
                            <!-- <option>Campaign Opted Name</option> -->
                            <option v-for="option in campaigns" :key="option" :value="option._id">
                                {{ option.campaign_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="dropdown-box rounded-br-lg rounded-bl-lg">
                    <p class="label d-flex gap-[6px] align-items-center"><img
                            src="public/img/png/Service-opted-vector.png">
                        Service Opted</p>
                    <div class="select-option-1">
                        <subservice :status="lead.service" :subStatus="lead.subService" @trigger-init="init" />
                        <!-- <select class="custom-select-1 cursor-pointer" v-model="lead.service" @change="updateoptService"
                            required>
                            <option> Service Opted Name</option>
                            <option v-for="option in services" :key="option" :value="option.service">
                                {{ option.service }}
                            </option>
                        </select> -->
                    </div>
                </div>
                <div class="dropdown-box">
                    <p class="label d-flex gap-[6px] align-items-center"><img src="public/img/png/campaign-vector.png">
                        Listing</p>
                    <div class="select-option-1">
                        <!-- <select class="custom-select-1 cursor-pointer" v-model="lead.campaign"
                            @change="updateoptCampain" required>
                            
                            <option v-for="option in campaigns" :key="option" :value="option._id">
                                {{ option.campaign_name }}
                            </option>
                        </select> -->
                        <!-- <select class="custom-select-1 cursor-pointer" v-model="listingId"
                            @focus="checkAndLoadCampaigns" @change="updateoptListing" required>
                            <option v-if="lead.listing && lead.listing._id" :value="lead.listing._id">
                                {{ lead.listing.title }}
                            </option>
                            <option v-if="lead.service && lead.subService"
                                v-for="option in listinglistdata?.subservicename" :key="option._id" :value="option">
                                {{ option.title }}
                            </option>
                        </select> -->
                        <select class="custom-select-1 cursor-pointer" v-model="listingId"
                            @focus="checkAndLoadCampaigns" @change="updateoptListing" required>
                            <!-- Pre-selected current listing (shown by default) -->
                            <option v-if="lead.listing && lead.listing._id" :value="lead.listing._id">
                                {{ lead.listing.title }}
                            </option>
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
                    <img @click="isLanguageProficiencyOpen = !isLanguageProficiencyOpen" src="/img/png/chevron-down.png"
                        alt="toggle" class="cursor-pointer" :style="{
                            transform: isLanguageProficiencyOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 200ms ease'
                        }" />
                    <!-- <img @click="isLanguageProficiencyOpen = !isLanguageProficiencyOpen"
                        src="public/img/png/chevron-down.png"> -->
                </div>
                <div class="mid-bar" v-if="isLanguageProficiencyOpen"></div>
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
                    <img @click="isCareerDetailsOpen = !isCareerDetailsOpen" src="/img/png/chevron-down.png"
                        alt="toggle" class="cursor-pointer" :style="{
                            transform: isCareerDetailsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 200ms ease'
                        }" />
                    <!-- <img @click="isCareerDetailsOpen = !isCareerDetailsOpen" src="public/img/png/chevron-down.png"> -->
                </div>
                <div class="mid-bar" v-if="isCareerDetailsOpen"></div>
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
                    <img @click="isRefusalOpen = !isRefusalOpen" src="/img/png/chevron-down.png" alt="toggle"
                        class="cursor-pointer" :style="{
                            transform: isRefusalOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 200ms ease'
                        }" />
                    <!-- <img @click="isRefusalOpen = !isRefusalOpen" src="public/img/png/chevron-down.png"> -->
                </div>
                <div class="mid-bar" v-if="isRefusalOpen"></div>
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
        <LeadRecommendation v-if="activeTab === 'recommendation'" />
        <LeadAgreement v-if="activeTab === 'agreement'" />
        <LeadAppointments v-if="activeTab === 'appointment'" :lead="lead" />
        <LeadInvoice v-if="activeTab === 'invoice'" />
        <LeadEmail v-if="activeTab === 'emails'" :lead="lead" />
    </div>

    <!-- quick-action-button -->
    <div class="conatiner-open" ref="quickActions" @mousedown="startDrag">
        <div v-show="quickActionOpen" class="quick-actions">
            <div class="quick-head">
                <img src="/public/img/png/quick-action.png"> Quick Actions
            </div>
            <div class="action-items">
                <div class="action-item">
                    <div @click="handleConvertedLead('convert')" class="inner-item"><img
                            src="/public/img/png/user-image.png">Convert Lead To Customer</div>
                    <img src="/public/img/png/side-arrow.png">
                </div>
                <div class="action-item follow-ups">
                    <div @click="addfollow()" class="inner-item"><img
                            src="/public/img/png/Calendar-img.png">Follow
                        Up's</div> <img src="/public/img/png/side-arrow.png">
                </div>
                <div class="action-item">
                    <div @click="handleQuickActionCall" class="inner-item"><img src="/public/img/png/Telephone.png">
                        Call Lead</div> <img src="/public/img/png/side-arrow.png">
                </div>
                <div class="action-item">
                    <div @click="emailSend" class="inner-item"><img src="/public/img/png/email-logo.png">Email</div>
                    <img src="/public/img/png/side-arrow.png">
                </div>
                <div class="action-item-1">
                    <div class="inner-item"><img src="/public/img/png/logos_whatsapp-icon-small.png">WhatsApp</div> <img
                        src="/public/img/png/side-arrow.png">
                </div>
            </div>
            <div @click="quickActionOpen = false" class="close-btn">&times;</div>
        </div>
        <div class="quick-actions-button" @click="handleQuickActionBtnClick">
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

    <div v-if="tooltipVisible" class="tooltip-box-follow">
        <ul class="pl-0 mb-0">
            <li v-for="(item, index) in dueFollowups.slice(1)" :key="item._id">
                <small>Missed: {{
                    getTimeMissed(getReminderDateTime(item)) }}</small>
            </li>
        </ul>
    </div>
    <div v-if="!ignore && latestFollowup" class="follow-up-wrapper ">
        <div class="follow-up-card">
            <div class="left-section">
                <div class="icon">
                    <img src="/public/img/png/warning-vector.png" />
                </div>
                <div class="content">
                    <div class="flex items-center gap-2">
                        <div class="date">
                            {{ formatDate(latestFollowup.reminder_date) }}, {{ latestFollowup.reminder_time }}
                        </div>
                        <div v-if="remainingCount > 0" class=" text-sm text-gray-500"
                            @mouseenter="tooltipVisible = true" @mouseleave="tooltipVisible = false">
                            <span>+{{ remainingCount }} more follow-ups due</span>
                        </div>
                    </div>
                    <div class="note">
                        <template v-for="(line, index) in displayedComment" :key="index">
                            <span>{{ line }}</span><br />
                        </template>
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
        class="  h-fit  w-[88vw] sm:w-[55vw]  md:w-[42vw]  lg:w-[32vw]  xl:w-[26vw] 2xl:w-[20vw]  border-t-[4px] border-[#18353B] rounded-lg">
        <div class="call-action-items">
            <div class="call-item">
                <div class="inner-item"><img src="/public/img/png/Telephone.png"> Call Lead</div> <img
                    src="/public/img/png/side-arrow.png">
            </div>
        </div>
        <div class="contact-card">
            <!-- <div class="contact-name">{{ lead.name }}</div> -->
            <div class="contact-name" :title="lead.name">
                {{ lead.name.length > 20 ? lead.name.substring(0, 20) + '...' : lead.name }}
            </div>
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
        class="h-fit  w-[88vw] sm:w-[55vw]  md:w-[42vw]  lg:w-[32vw]  xl:w-[26vw] 2xl:w-[20vw]  border-t-[4px] border-[#18353B] rounded-lg ">
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
        <div class="call-action-item-1" @click="handleAddRemark()">
            Add Remark <img src="/public/img/png/side-arrow.png">
        </div>
        <div class="call-action-item-1" @click="addFollowup = true">
            Add Followup <img src="/public/img/png/side-arrow.png">
        </div>
    </Sidebar>

    <Sidebar v-model:visible="addThirdSidebar" position="right"
        class="  h-fit py-[80px] w-[88vw] sm:w-[55vw]  md:w-[42vw]  lg:w-[32vw]  xl:w-[26vw] 2xl:w-[20vw] border-t-[4px] border-[#18353B] rounded-lg">
        <div class="call-action-items pb-3">
            <div class="call-item">
                <div class="call-inner-item"><img src="/public/img/png/call-cut.png"> Call Not Connected</div> <img
                    src="/public/img/png/side-arrow.png" class="call-lead-up-arrow">
            </div>
        </div>
        <div class="call-action-item-1" @click="() => { callStatus = 'not connected'; handleAddRemark(); }">
            Add Remark<img src="/public/img/png/side-arrow.png">
        </div>
        <div class="call-action-item-1" @click="() => {callStatus = 'not connected'; handleFollow(); }">
            Add Followup<img src="/public/img/png/side-arrow.png">
        </div>
    </Sidebar>

    <!-- <Dialog v-model:visible="addFollowup" modal header="Add Follow Up" :draggable="false"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <FormKit type="form" @submit="addFollowupdata">
            <div class="">
                <label class="leads-label-assign-add">Date Time</label><br>
                
            <FormKit
  validation="required"
  name="time"
  id="update-events-drpsem-add"
  type="datetime-local"
  placeholder="name"
  :min="currentDateTime"
/>
</div>
            <div class="leads-addjb-dtls-mdl">
                <div class="add-leads-persn-dropdd mt-3">
                    <label class="leads-label-assign-add">Status</label>
                    <FormKit validation="required" type="select" name="status" id="update-events-drpsem-add-btw"
                        placeholder="Select Status" :options="lead_statuss" />
                </div>
                <div class="add-leads-persn-dropdd mt-3">
                    <label class="leads-label-assign-add">Follow Up Comments</label><br>
                    
                        <FormKit
  validation="required"
  name="comment"
  id="update-events-drpsem-add"
  type="textarea"
  placeholder="------"
/>
                </div>
            </div>
            <div class="modal-footer-section flex justify-content-between">
                <button @click="addFollowup = false" class=" mt-4  rounded px-4 py-2 followup-btn-btn-cancel"
                    data-bs-dismiss="modal" id="close">Go
                    back</button>
                <button type="submit" class=" mt-4  rounded px-4 py-2 btn-btn-dle-appt">Submit</button>
            </div>
        </FormKit>
    </Dialog> -->
    <Dialog v-model:visible="addFollowup" modal header="Add Follow Up" :draggable="false"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]" @show="resetFollowupForm">
        <form @submit.prevent="addFollowupdata" novalidate>
            <!-- DateTime -->
            <div>
                <label class="leads-label-assign-add required">Date Time</label><br>
                <input v-model="followupForm.time" type="datetime-local" id="update-events-drpsem-add"
                    class="w-full border rounded px-2 py-[8px]" :min="currentDateTime" />
                <p v-if="errors.time" class="text-red-500 text-sm mt-1">{{ errors.time }}</p>
            </div>

            <div class="leads-addjb-dtls-mdl">
                <div class="add-leads-persn-dropdd mt-3">
                    <label class="leads-label-assign-add required">Status</label>
                    <div class="w-full border rounded px-2 py-[11px]">
                        <select v-model="followupForm.status" id="update-events-drpsem-add-btw"
                            class="w-full border-0 outline-none rounded-0 px-0 py-0">
                            <option disabled value="">Select Status</option>
                            <option v-for="s in lead_statuss" :key="s" :value="s">{{ s }}</option>
                        </select>
                    </div>
                    <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
                </div>

                <div class="add-leads-persn-dropdd mt-3">
                    <label class="leads-label-assign-add required">Follow Up Comments</label><br>
                    <textarea v-model="followupForm.comment" id="update-events-drpsem-add"
                        class="w-full border rounded px-2 py-1" placeholder="------" maxlength="120"></textarea>
                    <p v-if="errors.comment" class="text-red-500 text-sm mt-1">{{ errors.comment }}</p>
                </div>
            </div>

            <div class="modal-footer-section flex justify-content-between">
                <button @click="addFollowup = false" class="mt-4 rounded px-4 py-2 followup-btn-btn-cancel"
                    type="button">
                    Go back
                </button>
                <button type="submit" class="mt-4 rounded px-4 py-2 btn-btn-dle-appt">
                    Submit
                </button>
            </div>
        </form>
    </Dialog>
    <Dialog v-model:visible="counsellorModal" modal :header="assign ? 'Assign lead' : 'Convert To Customer'"
        @update:visible="(val) => {
            counsellorModal = val;
            if (!val) assign = false;
        }" class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]" :draggable="false">
        <FormKit type="form" @submit="convertCustomer" class="leads-form-style">
            <div v-if="!leadAutomation">
                <label class="single-lead-cmttitls required">Assign Counsellor</label><br />
                <FormKit validation="required" type="select" name="assigned_to" class="single-lead-cmt-mdlo"
                    placeholder="Select Counsellor" validation-label="Counsellor" @change="getSubCouncellor"
                    :options="items" v-model="selectedOption" />
            </div>
            <span>
                <label class="leads-label-assign-add mt-3 required">Assign Description</label>
                <FormKit type="textarea" placeholder="Add Description" validation="required" name="comment"
                    id="leads-textarea-dgn" validation-label="Description" />
            </span>
            <div class="modal-footer-section">
                <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close" @click="counsellorModal = false">Go back</button> -->
                <button type="submit" class="mt-4 rounded px-4 py-2 btn-btn-dle-appt">Submit</button>
            </div>
        </FormKit>
    </Dialog>
    <Dialog v-model:visible="commentCallmodal" modal header="New Comment"
        @show="resetDialog('commentCallInput', 'commentCall')"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <form @submit.prevent="addComment" class="leads-form-style">
            <div>
                <label class="single-lead-cmttitls">Remark</label><br />
                <input v-model.trim="commentCallInput" type="text" class="single-lead-cmt-mdlo"
                    placeholder="Add your Remark" maxlength="80"
                    @input="handleCommentInput('commentCallInput', 'commentCall')" />
                <p v-if="errors.commentCall" class="text-red-500 text-sm mt-1">{{ errors.commentCall }}</p>
            </div>
            <div class="modal-footer-section">
                <button type="submit" class="mt-4 rounded px-4 py-2 followup-btn-btn-dle-appt">
                    Submit
                </button>
            </div>
        </form>
    </Dialog>

    <Dialog v-model:visible="commentmodal" modal header="New Comment" @show="resetDialog('remarkInput', 'remark')"
        class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
        <form @submit.prevent="addRemarkComment" class="leads-form-style">
            <div>
                <label class="single-lead-cmttitls">Remark</label><br />
                <input v-model.trim="remarkInput" type="text" class="single-lead-cmt-mdlo" placeholder="Add your Remark"
                    maxlength="80" @input="handleCommentInput('remarkInput', 'remark')" />
                <p v-if="errors.remark" class="text-red-500 text-sm mt-1">{{ errors.remark }}</p>
            </div>
            <div class="modal-footer-section">
                <button type="submit" class="mt-4 rounded px-4 py-2 followup-btn-btn-dle-appt">
                    Submit
                </button>
            </div>
        </form>
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
    <Dialog v-model:visible="openMailComposer" modal header="Email Composer" position="bottom"
        class=" custom-bottom-right-dialog w-[100vw] sm:w-[80vw] md:w-[69vw] lg:w-[58vw] xl:w-[49vw] 2xl:w-[38vw]">
        <div class="  right-sec  ">
            <div class=" border-[2px] mt-[9px] border-[#ededed]  rounded-[10px]  bg-white h-fit">
                <div
                    class="bg-[#424242] text-white text-[15px] font-medium px-4 py-2 flex justify-between items-center rounded-t-md">
                    <span>New Message</span>
                    <div class="space-x-3">
                        <span class="text-[#FFFFFF99]">__</span>
                        <i class="bi bi-arrows-angle-expand cursor-pointer text-[#FFFFFF99]"></i>
                        <i class="bi bi-x-lg cursor-pointer text-[#FFFFFF99]"></i>
                    </div>
                </div>
                <div class="sm:px-3 px-2 h-[400px] md:h-[490px]">
                    <input type="text" placeholder="Subject"
                        class="w-full border-0  outline-none text-gray-700   placeholder:text-[#0000008A]"
                        v-model="subject" />
                    <div
                        class="md:h-[425px] h-[335px] relative flex  mb-2 flex-col justify-between border-t border-[#d1d5db]">
                        <div class="flex-1 overflow-y-auto quill-no-borders">
                            <QuillEditor ref="editor" v-model:content="body" contentType="html"
                                toolbar="#custom-toolbar" class="h-[225px]  bg-white" placeholder="Body" />
                        </div>
                        <div id="custom-toolbar" class="px-2 py-2 bg-white">
                            <span class="ql-formats">
                                <button @click="undo" type="button" title="Undo">
                                    <i class="bi bi-arrow-counterclockwise"></i>
                                </button>
                                <button @click="redo" type="button" title="Redo">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                            </span>
                            <span class="ql-formats">
                                <select class="ql-font"></select>
                                <select class="ql-size"></select>
                            </span>
                            <span class="ql-formats">
                                <button class="ql-bold"></button>
                                <button class="ql-italic"></button>
                                <button class="ql-underline"></button>
                            </span>
                            <span class="ql-formats">
                                <select class="ql-color"></select>
                                <select class="ql-background"></select>
                            </span>
                            <span class="ql-formats">
                                <button class="ql-list" value="ordered"></button>
                                <button class="ql-list" value="bullet"></button>
                            </span>
                            <span class="ql-formats">
                                <button class="ql-link"></button>
                                <button class="ql-image"></button>
                                <button class="ql-code-block"></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <div @click="sendLeadEmail"
                    class="mt-4 flex w-[130px] gap-2 justify-center cursor-pointer items-center  bg-[#FF57571A] text-[#FF5757] text-[17px] font-semibold py-[8px] sm:py-[9px] rounded-[8px]">
                    Send <i class="bi bi-send"></i>
                </div>
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
import LeadRecommendation from '../../Components/LeadRecommendation/index.vue';
import LeadAgreement from '../../Components/LeadAgreement/index.vue';
import LeadAppointments from '../../Components/LeadAppointments/index.vue';
import LeadInvoice from '../../Components/LeadInvoice/index.vue';
import LeadEmail from '../../Components/LeadEmail/index.vue';
import prac from '../../Components/prac/index.vue';
import subservice from '../../Components/Service/index.vue';
export default {
    components: {
        QuillEditor,
        LeadDocuments,
        LeadComments,
        LeadRecommendation,
        LeadAgreement,
        LeadAppointments,
        LeadInvoice,
        prac,
        subservice,
        LeadEmail,
    },
    data() {
        return {
            isDragging: false,
            startX: 0,
            startLeft: 50,
            dragged: false,
            dropdownOpen: false,
            isCustomOpen: false,
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
            lead: {},
            selectedPriority: null,
            pendingPriority: null,
            lead_statuss: [],
            counsellorModal: false,
            assign: false,
            items: [],
            loading: false,
            services: null,
            campaigns: [],
            listinglistdata: null,
            callStatus: null,
            callDuration: 0,
            timerInterval: null,
            commentmodal: false,
            commentCallmodal: false,
            Emailmodal: false,
            ids: [],
            convert_lead: false,
            followups: [],
            ignore: false,
            remarkInput: "",
            commentCallInput: "",
            openMailComposer: false,
            isExpanded: false,
            tooltipVisible: false,
            leadAutomation: false,
            listingId: '',
            currentDateTime: "",
            followupForm: {
                time: "",
                status: "",
                comment: ""
            },
            errors: {
                time: "",
                status: "",
                comment: ""
            },
            nextFollowup: null,
            subject: null,
            body: null,
            email_primary: null,
        }
    },
    computed: {
        words() {
            return this.latestFollowup?.comment?.trim().split(/\s+/) || [];
        },
        isLongComment() {
            return this.words.length > 6;
        },
        displayedComment() {
            if (!this.latestFollowup?.comment) return [];
            const words = this.latestFollowup.comment.trim().split(/\s+/);
            const lines = [];
            for (let i = 0; i < words.length; i += 6) {
                lines.push(words.slice(i, i + 6).join(' '));
            }
            return this.isExpanded ? lines : lines.slice(0, 1);
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
        activateSubmenu('l2', ' Leads');
        await this.init();
        this.initLeadStatus();
        this.getSubCouncellor();
        this.initServices()
        this.initCampaings()
        this.initIds()
        this.nextFollowupCheck()
        const active = getCookie('callActive') === 'true';
        if (active) {
            this.show_call_lead = false;
            this.addSecondSidebar = true
            this.callLeadId = getCookie('callLeadId') || null;
            this.updateCallDuration(); // get duration since start
            this.timerInterval = setInterval(() => {
                this.updateCallDuration(); // keep updating every second
            }, 1000);
        };
        this.currentDateTime = this.getNowDateTime();
        setInterval(() => {
            this.currentDateTime = this.getNowDateTime();
        }, 60000);
    },
    methods: {

        async checkPrimaryEmail() {
            const email = await adminGet('/email-setting');

            if (email.data.status) {
                if (email.data.leadstatus.length > 0) {
                    const hasPrimary = email.data.leadstatus.some(e => e.primary === true);
                    if (!hasPrimary) {
                        errorAlert("Please add an email and mark it as primary before selecting this option.");
                        this.$router.push('/admin/notification/emails/emailsetting');
                        return false;
                    }
                    return true;
                } else {
                    this.$router.push('/admin/notification/emails/emailsetting');
                    return false;
                }
            }
            return false;
        },

        async emailSend() {
            const isValid = await this.checkPrimaryEmail();

            if (!isValid) {
                return; // stop here if primary is missing
            }
            this.openMailComposer = true
            this.quickActionOpen = false
        },
        async sendLeadEmail() {
            try {
                const res = await adminPut(`/lead-email-send/${this.$route.params.id}`, {
                    subject: this.subject,
                    body: this.body,
                })

                if (res.data.success) {
                    successAlert("Email sent sucessfully.")
                    this.openMailComposer = false;
                    this.subject = null
                    this.body = null
                } else {
                    errorAlert("somthing went wrong")
                }
            } catch (err) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: err.message });
            }
        },

        startDrag(e) {
            this.isDragging = true;
            this.dragged = false;
            this.startX = e.clientX;
            document.addEventListener("mousemove", this.onDrag);
            document.addEventListener("mouseup", this.stopDrag);
        },
        onDrag(e) {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.startX;
            if (Math.abs(deltaX) > 3) {
                // 👈 threshold so tiny mouse move doesn’t count as drag
                this.dragged = true;
            }
            this.$refs.quickActions.style.right =
                this.startLeft - deltaX + "px";
        },
        stopDrag(e) {
            this.isDragging = false;
            this.startLeft = parseInt(this.$refs.quickActions.style.right, 10) || 0;
            document.removeEventListener("mousemove", this.onDrag);
            document.removeEventListener("mouseup", this.stopDrag);
        },
        handleQuickActionBtnClick() {
            // 👇 prevent opening if just dragged
            if (this.dragged) return;
            this.quickActionOpen = true;
        },
        async nextFollowupCheck() {
            try {
                const data = await adminGet(`/latest-followup/${this.$route.params.id}`)
                console.log("next followup", data.data.status)
                if (data.data.status) {
                    this.nextFollowup = data.data.data
                    console.log("data.data.data", data.data.data)
                    console.log("nextfollowup", this.nextFollowup)
                }
            } catch (error) {

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
        getNowDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const day = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
        resetFollowupForm() {
            this.followupForm = { time: "", status: "", comment: "" };
            this.errors = { time: "", status: "", comment: "" };
            this.currentDateTime = this.getNowDateTime();
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
            this.ignore = true
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
                }
                this.followups = response.data.followup || [];
                this.selectedPriority = this.lead.priority
            })
        },
        async initIds() {
            this.lead.loading = true
            if (this.$route.query.currintid && this.$route.query.page) {
                await adminGet(`/circular-customers/${this.$route.query.currintid}/lead`).then(response => {
                    this.ids = response.data.data
                    console.log("ids", this.ids)
                    this.currentPage = this.$route.query.page
                    this.totalPages = this.ids.length
                })
            } else {
                await adminGet(`/circular-customers/${this.$route.params.id}/lead`).then(response => {
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
        async selectPriority(value) {
            this.dropdownOpen = false;
            this.pendingPriority = value; // Store clicked value temporarily
            const confirmed = await askConfirm(
                'Do you want to update the priority?',
                'Update Priority',
                'Update',
                'No'
            );
            if (confirmed) {
                this.selectedPriority = value; // Only update actual value after confirmation
                await this.updatePriority();
            }
            this.pendingPriority = null; // Reset
        },
        convertDate(isoDate) {
            if (!isoDate) return '';
            const date = new Date(isoDate);
            const options = { year: 'numeric', month: 'short', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return formattedDate;
        },
        getNextUpcomingFollowup() {
            if (!this.followups || this.followups.length === 0) {
                return null;
            }

            const now = new Date();

            // Filter followups that are not completed and have future dates/times
            const upcomingFollowups = this.followups
                .filter(followup => {
                    if (followup.followup_status === true) return false; // Skip completed followups
                    const reminderDateTime = new Date(followup.reminder_date);
                    return reminderDateTime >= now; // Only future dates/times
                })
                .sort((a, b) => {
                    // Sort by reminder_date in ascending order (earliest first)
                    // This will sort by both date and time
                    return new Date(a.reminder_date) - new Date(b.reminder_date);
                });

            // Return the reminder_date of the first (earliest) upcoming followup
            return upcomingFollowups.length > 0 ? upcomingFollowups[0].reminder_date : null;
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
            this.loading = true
            await adminPut(`/update-leads-status/${this.lead._id}`, { priority: this.selectedPriority });
            successAlert('Lead priority updated successfully!');
            this.$parent.init()
        },
        async updateoptService() {
            if (await askConfirm('Do you want to update the service?', 'Update Service', 'Update', 'No')) {
                this.loading = true
                await adminPut(`/update-leads-status/${this.lead._id}`, { service: this.lead.service })
                successAlert('Lead service updated successfully!');
                this.$parent.init()
            }
        },
        async updateoptCampain() {
            if (await askConfirm('Do you want to update the campaign?', 'Update Campaign', 'Update', 'No')) {
                this.loading = true
                await adminPut(`/update-lead-campaign/${this.lead._id}/${this.lead.campaign}`, { service: this.lead.service })
                successAlert('Lead service updated successfully!');
                this.$parent.init()
            }
        },
        async updateoptListing() {
            if (await askConfirm('Do you want to update the Listing?', 'Update Listing', 'Update', 'No')) {
                this.loading = true
                await adminPut(`/update-leads-status/${this.lead._id}/`, { listing: this.listingId })
                successAlert('Lead listing updated successfully!');
                this.init()
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
        async convertToCustomer(v) {
            this.assignModal = false;
            v.subService
            await adminPut(`/assign-leads/${this.curr_id}?auto=${this.leadAutomation}`, v).then(async (response) => {
                await adminPut(`/convert-customer/${this.curr_id}`)
                this.$router.push("/admin/customers/view")
            })
            this.init();
        },
        async companySetting(listing, service, subService, country) {
            const settingcheck = await adminGet('/company-settings')
            const lead_setting = await adminGet('/lead-settings/true')
            console.log("leadAutomationdata", settingcheck, lead_setting)
            if (settingcheck.data.data.leadAutomation) {
                const isEligible = this.checkLeadAutomationEligibility(service, subService, country, lead_setting);
                this.leadAutomation = isEligible;
                console.log("Lead Automation Eligible:", isEligible);
            } else {
                this.leadAutomation = false;
            }
        },
        checkLeadAutomationEligibility(service, subService, country, lead_setting) {
            const subserviceKeyMap = {
                "College Study Visa": "CollegeStudyVisa",
                "Tourist Visa": "TouristVisa",
                "Visitor Visa": "VisitorVisa",
                "Work Visa": "WorkVisa",
                "Permanent Residency": "PermanentResidency",
            };
            const type = lead_setting.data.method.current_type;
            if (type === "Service_Based") {
                if (service === "Study Visa") service = "Study_Visa";
                if (service === "Settle Abroad") service = "Settle_Abroad";
                const key = subserviceKeyMap[subService];
                if (!key) return false;
                const matched = lead_setting.data.method.Service_Based?.[service]?.[key]?.find(
                    (ele) => ele.country === country && ele.subadmin_id.length > 0
                );
                return !!matched;
            }
            if (type === "Round_Robin") {
                return (
                    Array.isArray(lead_setting.data.method.Round_Robin?.subadmin_id) &&
                    lead_setting.data.method.Round_Robin.subadmin_id.length > 0
                );
            }
            return false;
        },
        async handleConvertedLead(covert) {
            console.log("conveerted status")
            if (covert == "convert") {
                this.convert_lead = true
            }
            const missingFields = [];
            if (!this.lead.listing) missingFields.push("Listing");
            if (!this.lead.service) missingFields.push("Service");
            if (!this.lead.subService) missingFields.push("Sub-service");
            if (missingFields.length > 0) {
                errorAlert(`Missing fields: ${missingFields.join(", ")}`);
                return;
            }
            await this.companySetting(this.lead.listing, this.lead.service, this.lead.subService, this.lead.listing.country)
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
                        this.assign = false;
                    })
                    this.init()
                    this.convert_lead = false
                })
            } else {
                await adminPut(`/assign-leads/${this.lead._id}?OnlyAssign=true`, v).then(async (response) => {
                    this.init()
                    this.counsellorModal = false;
                })
            }
            this.loading = false
        },
        async initServices() {
            this.loading = true
            await adminGet(`/company-services`).then(async (response) => {
                this.services = response.data.data
            })
            this.loading = false
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
        checkAndLoadCampaigns() {
            if (!this.lead.service || !this.lead.subService) {
                errorAlert("Please select lead service and subservice first.");
                return;
            }
            this.listingList(); // or your API function to get campaign/listings
        },
        async initCampaings() {
            this.loading = true
            await adminGet(`/campaigns`).then(async (response) => {
                this.campaigns = response.data.data
            })
            this.loading = false
        },
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
            this.startTimer(); // your timer logic that sets cookies etc.
            this.addSecondSidebar = true;
        },
        async addfollow(){
this.addFollowup = true;
this.quickActionOpen=false;
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

                if (this.$route.query.callPopup || this.$route.query.t) {
                    this.$router.replace({ path: this.$route.path });
                }
            }
        },
        resetDialog(inputField, errorField) {
            this[inputField] = "";
            this.errors[errorField] = "";
        },
        handleCommentInput(field, errorField) {
            const value = this[field];

            // if (value.length >= 50) {
            //   this.errors[errorField] = "Maximum 50 characters reached.";
            // } else if (value.length > 0 && value.length < 3) {
            //   this.errors[errorField] = "Minimum 3 characters required.";
            // } else {
            //   this.errors[errorField] = "";
            // }
        },
        async addComment() {
            this.errors.commentCall = "";

            if (!this.commentCallInput.trim()) {
                this.errors.commentCall = "Remark is required.";
                return;
            } else if (this.commentCallInput.trim().length < 3) {
                this.errors.commentCall = "Remark must be at least 3 characters.";
                return;
            } else if (this.commentCallInput.length > 50) {
                this.errors.commentCall = "Remark must not exceed 80 characters.";
                return;
            }
            let v = {
                customer_id: this.$route.params.id,
                comment: this.commentCallInput.trim(),
                call_time: this.formattedTime
            };

            this.commentCallmodal = false
            this.loading = true;
            await adminPost(`/add-comment`, v);
            this.commentCallInput = "";
            successAlert("Remark added successfully!");
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            deleteCookie('callStartTime');
            deleteCookie('callLeadId');
            deleteCookie('callActive');
            this.addSecondSidebar = false
            this.init()
        },
        async addRemarkComment() {
            this.errors.remark = "";

            if (!this.remarkInput.trim()) {
                this.errors.remark = "Remark is required.";
                return;
            } else if (this.remarkInput.trim().length < 3) {
                this.errors.remark = "Remark must be at least 3 characters.";
                return;
            } else if (this.remarkInput.length > 50) {
                this.errors.remark = "Remark must not exceed 50 characters.";
                return;
            }
            let v = {
                customer_id: this.$route.params.id,
                comment: this.remarkInput.trim(),
                call_time: this.callStatus == "not connected" ? "00 : 00 : 00" : this.formattedTime
            };
            this.commentmodal = false;
            this.loading = true;
            await adminPost(`/add-comment`, v);
            this.remarkInput = "";
            successAlert("Remark added successfully!");
            this.init();
        },
async handleFollow(){
   this.addThirdSidebar = false;
   this.addFollowup = true;
},
        async handleAddRemark() {
            this.addThirdSidebar = false;
            console.log("rbhfrjhbfjhrbf herbf")
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

        async addFollowupdata() {
            this.errors = { time: "", status: "", comment: "" };
            const d = this.followupForm;
            let valid = true;
            if (!d.time) {
                this.errors.time = "Date and time are required.";
                valid = false;
            } else if (new Date(d.time) < new Date()) {
                this.errors.time = "Please select a future date and time.";
                valid = false;
            }
            if (!d.status) {
                this.errors.status = "Status is required.";
                valid = false;
            }
            if (!d.comment || !d.comment.trim()) {
                this.errors.comment = "Comment is required.";
                valid = false;
            } else if (d.comment.trim().length < 5) {
                this.errors.comment = "Comment must be at least 5 characters long.";
                valid = false;
            } else if (d.comment.length > 120) {
                this.errors.comment = "Comment must not exceed 120 characters.";
                valid = false;
            }
            if (!valid) {
                return errorAlert("Please fix the errors before submitting.");
            }
            let x = {
                customer_id: this.$route.params.id,
                comment: d.comment.trim(),
                type: "followup",
                reminder_date: d.time.split("T")[0],
                reminder_time: d.time.split("T")[1],
                status: d.status,
                call_time: "00:00:00"
            };
            await adminPost(`/add-comment`, x)
                .then(async () => {
                    this.addFollowup = false;
                    this.init();
                    successAlert("Followup Added");
                })
                .catch(() => { });
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