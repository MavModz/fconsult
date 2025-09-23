<template>
    <div class="form-section">
        <div class="first-form-section-1 mb-4 d-flex align-items-center justify-content-between">
            <div class="left-head d-flex align-items-center gap-2">
                <img src="/public/img/png/info.png" max-height="20px">
                <h2>Basic info
                </h2>
            </div>
            <img src="/public/img/png/dropdown-arrow.png">
        </div>
        <div class="upload-cover">
            <label class="upload-cover-inner d-flex justify-content-center align-items-center gap-2 cursor pointer
          " :style="{ padding: listService.coverImage !== '' ? '20px' : '60px' }">
                <input v-if="listService.coverImage == ''" class="image-upload" type="file" hidden required
                    accept="image/*" @change="handleImageChange($event, 'cover')" />
                <img v-if="listService.coverImage == ''" src="/public/img/png/camera.png" class="camera-vec">
                <p v-if="listService.coverImage == ''">Upload Cover Image</p>
                <div class="relative border h-[200px] w-full"
                    v-if="listService.coverImage != '' && listService.coverImage">
                    <img class="rounded-xl h-full w-full object-cover" :src="listService.coverImage" alt="Cover" />
                    <label
                        class="absolute w-8 h-8 top-2 right-2 bg-white p-1 rounded-full cursor-pointer shadow hover:bg-gray-100 transition"
                        title="Change Image">
                        <input ref="coverInput" type="file" hidden accept="image/*" @click="resetFileInput"
                            @change="handleImageChange($event, 'cover')" @input="clearError('coverImage')"/>
                        <i class="pi pi-pencil text-gray-700 text-base"></i>
                    </label>
                </div>
            </label>
            <p v-if="validationErrors.coverImage" class="!text-red-500 text-sm mt-1">
                {{ validationErrors.coverImage }}
            </p>
        </div>
        <div class="input-group">
            <label class="required">Country Icon</label>
            <label class="upload-box cursor-pointer">
                <img v-if="listService.logo_file_name" :src="listService.collegeLogo" alt="Logo Preview"
                    class="logo-thumb" />
                <img v-else src="/img/webp/Rectangle 4475.png" alt="Logo Preview" class="logo-thumb" />
                <span v-if="listService.logo_file_name" class="logo-name"> {{ listService.logo_file_name }}</span>
                <span v-else class="logo-name">logo name .jpg</span>
                <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />
                <input type="file" id="logo-upload" accept="image/*" @change="handleImageChange($event, 'logo')" hidden
                    required />
            </label>
            <p v-if="validationErrors.collegeLogo" class="!text-red-500 text-sm mt-1">
                {{ validationErrors.collegeLogo }}
            </p>
        </div>
        <div class="grid">
            <div class="input-group">
                <label class="required">Country</label>
                <div class="select-option cursor-pointer">
                    <select v-model="listService.country" class="custom-select cursor-pointer" required @change="() => { if(listService.country) delete validationErrors.country }">
                        <option value="" disabled>Select a Country</option>
                        <option v-for="country in adminCountries" :key="country" :value="country">
                            {{ country }}
                        </option>
                    </select>
                </div>
                <p v-if="validationErrors.country" class="!text-red-500 text-sm mt-1">
                    {{ validationErrors.country }}
                </p>
            </div>
            <div class="input-group">
                <label>Website URL</label>
                <input type="url" v-model="listService.website_link" placeholder="-------------------" required />
            </div>
        </div>
        <div class="input-group">
            <label class="required">PR Program Name</label>
            <div class="input-container mb-0 ">
                <input type="text"  class="location-input"
                    placeholder="Press Enter to add the program name" v-model="pr_program_name" 
                    @keyup.enter="addProgram_name"  />
                <img @click="addProgram_name" src="/public/img/png/plus-red.png" class="add-icon">
            </div>
            <p v-if="validationErrors.program_name_list" class="!text-red-500 text-sm mt-1">
                    {{ validationErrors.program_name_list }}
                </p>
        </div>
        <div class="tags-container">
            <div v-if="listService.program_name_list.length > 0" v-for="(item, inx) in listService.program_name_list"
                class="tag">
                {{ item }}
                <img @click="remove_prProgram(inx)" src="/public/img/png/cross-vector.png">
            </div>
        </div>
        <div class="input-gp">
            <div>
                <label class="required">Description</label>
            </div>
            <div class="study-visa-description-block">
                <ClientOnly>
                    <QuillEditor :modules="modules" ref="qhtml" class="mb-4" style="height:170px" @input="validateQuillEditor" />
                </ClientOnly>
                <p v-if="validationErrors.overview" class="!text-red-500 text-sm mt-[-20px]">
                    {{ validationErrors.overview }}
                </p>
            </div>
        </div>
    </div>
    <div class="form-section mt-4">
        <div class="first-form-section mb-4 d-flex align-items-center justify-content-between">
            <h2>Programs
            </h2>
            <div class="dropdown dropdown-hover">
                <img src="/public/img/png/plus-white.png">
                <button class=" add-program-btn dropdown-toggle drp" type="button" data-bs-toggle="dropdown"
                    @click="openInfoModal" aria-expanded="false">
                    <img src="/public/img/png/plus-white.png" alt="plus"
                        style="width: 18px; height: 18px; margin-right: 6px;" />
                    Add Program
                </button>
            </div>
        </div>
        <div v-if="program_list.length > 0" class="program-table-container" style="overflow-x:auto;">
            <table>
                <thead>
                    <tr>
                        <th>Program Name</th>
                        <th>Province/State</th>
                        <th>Eligibility Citeria</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in program_list">
                        <td>{{ item.program_name }}</td>
                        <td>
                            <span v-for="(province, index) in item.program_province.slice(0, 2)" :key="index">
                                {{ province }}<span v-if="index < Math.min(1, item.program_province.length - 1)">,
                                </span>
                            </span>
                            <span class="text-[#ff5757] font-bold underline  ml-2"
                                v-if="item.program_province.length > 2">
                                +{{ item.program_province.length - 2 }} more
                            </span>
                        </td>
                        <td v-html="item.eligibility_criteria.slice(0, 50)"></td>
                        <td>
                            <div class="action-icons">
                                <img @click="edit_program(item, index)" src="public/img/png/edit-blue (1).png">
                                <img @click="delete_program(index)" src="public/img/png/dlt-blue.png">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="form-section mt-4">
        <h2>Additional</h2>
        <div class="form-sec">
            <div class="input-group mt-[31px]">
                <label>Processing Time</label>
                <div class="select-option">
                    <select class="custom-select cursor-pointer" v-model="listService.processing_time" required>
                        <option class="cursor-pointer" value="a1">a1</option>
                        <option class="cursor-pointer" value="b1">b1</option>
                        <option class="cursor-pointer" value="c1">c1</option>
                    </select>
                </div>
            </div>
            <div class="input-gp mt-3">
                <div>
                    <label>PR Benefits</label>
                </div>
                <div class="study-visa-description-block">
                    <ClientOnly>
                        <QuillEditor :modules="modules" ref="pr_qhtml" class="mb-4" style="height:200px" />
                    </ClientOnly>
                </div>
            </div>
            <div class=" grid-2 d-flex justify-content-start gap-[80px] align-items-center flex-wrap">
                <div class="form-group ">
                    <label>Proof of Funds Required?</label>
                    <div class="radio-group">
                        <label><input class="cursor-pointer" type="radio" name="sponsor" value=true
                                v-model="listService.proof_of_funds" required>
                            Yes</label>
                        <label><input class="cursor-pointer" type="radio" name="sponsor" value=false
                                v-model="listService.proof_of_funds" required>
                            No</label>
                    </div>
                </div>
                <div class="form-group ">
                    <label>Language Test Required?</label>
                    <div class="radio-group">
                        <label><input class="cursor-pointer" type="radio" name="insurance" value=true
                                v-model="listService.language_test"> Yes</label>
                        <label><input class="cursor-pointer" type="radio" name="insurance" value=false
                                v-model="listService.language_test"> No</label>
                    </div>
                </div>
                <div class="form-group ">
                    <label>Job Offer Required?</label>
                    <div class="radio-group">
                        <label><input class="cursor-pointer" type="radio" name="visa" value=true
                                v-model="listService.job_offer">
                            Yes</label>
                        <label><input class="cursor-pointer" type="radio" name="visa" value=false
                                v-model="listService.job_offer"> No</label>
                    </div>
                </div>
            </div>
            <label class="mt-5">Additional Services</label>
            <div class=" grid-2 d-flex justify-content-start gap-5 align-items-center flex-wrap mt-[14px]">
                <div class="form-group-check ">
                    <input class="cursor-pointer" type="checkbox" name="sponsor" value=true
                        v-model="listService.job_search_assistance" required>
                    <label class="!text-[#666276] text-[17px] leading-[150%] font-normal pl-[5px]">Job Search
                        Assistance</label>
                </div>
                <div class="form-group-check ">
                    <input class="cursor-pointer" type="checkbox" name="sponsor" value=true
                        v-model="listService.settlement_services" required>
                    <label class="!text-[#666276] text-[17px] leading-[150%] font-normal pl-[5px]">Settlement
                        Services</label>
                </div>
                <div class="form-group-check ">
                    <input class="cursor-pointer" type="checkbox" name="sponsor" value=true
                        v-model="listService.family_sponsorship" required>
                    <label class="!text-[#666276] text-[17px] leading-[150%] font-normal pl-[5px]">Family
                        Sponsorship</label>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="testimonial-section mt-4">
            <div class="testimonials-header ">
                <div class="toggle-container">
                    <label class="switch" :title="listService.testmonial ? 'Disable Testimonial' : 'Enable Testimonial'">
                        <input type="checkbox" v-model="listService.testmonial" @change="handleToggle">
                        <span class="slider"></span>
                    </label>
                    <span class="label-text mb-3">Testimonials</span>
                </div>
                <button class="add-button" @click="AddTestimonialOpen = true">+ Add Testimonial</button>
            </div>
            <div v-if="listService.testimonilas.length > 0"
                class="card-container max-W-[350px]  whitespace-nowrap overflow-x-auto">
                <div class="card" v-for="(item, index) in listService.testimonilas">
                    <img :src="item.image" alt="Person">
                    <div class="card-dropdown" @click="toggleDropdown(index)">&#8942;
                    </div>
                    <div class="dropdown-menu" v-if="activeDropdownIndex === index">
                        <div class=" menu-class d-flex align-items-center gap-[6px]"
                            @click="editdeletetestimonials(item, index)">
                            <img src="/public/img/png/edit-study-vector.png" alt=""><button>Edit</button>
                        </div>
                        <div class=" menu-class d-flex align-items-center gap-[6px]" @click="deletetestimonials(index)">
                            <img src="/public/img/png/trash-vector.png" alt=""><button class="delete">Delete</button>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3>{{ item.title }}</h3>
                        <p>Permanent Residency- {{ listService.country }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="testimonial-section mt-4">
            <div class="testimonials-header  ">
                <div class="toggle-container">
                    <label class="switch " :title="listService.media ? 'Disable Media' : 'Enable Media'">
                        <input type="checkbox" v-model="listService.media" @change="handleMediaToggle">
                        <span class="slider "></span>
                    </label>
                    <span class="label-text mb-3">Media</span>
                </div>
                <div class="relative inline-block">
                    <button class="add-button" @click="addMediaOpen = true">+ Add Media <i
                            class="bi bi-chevron-down"></i></button>
                    <div class="upload-card absolute mt-2 right-0 z-10" v-if="addMediaOpen">
                        <div class="upload-option relative" @click="addMediaOpen = false">
                            <span class="icon"><i class="bi bi-images"></i></span>
                            <span class="text">Upload Images</span>
                            <input class="opacity-0 absolute top-0 h-[60px] w-[150px]" accept="image/*" type="file"
                                @change="handleMediaChange" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="cards-container max-h-[500px] overflow-y-auto">
                <div class="media-card" v-for="(ele, index) in mediaAllImagePic">
                    <img :src="ele.media_url" alt="Uploaded Image" class="uploaded-image" />
                    <div class="card-dropdown" @click="MediaDropdownOpen = true">&#8942;
                    </div>
                    <div class="dropdown-menu" v-if="MediaDropdownOpen">
                        <div class=" menu-class d-flex align-items-center gap-[6px]" @click="MediaDropdownOpen = false">
                            <img src="/public/img/png/trash-vector.png" alt=""><button @click="deletemedia(index)"
                                class="delete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="listService.tabs.length > 0" class="custom-section mt-4">
            <div class="custom-header d-flex align-items-center gap-2 mb-[20px]">
                <img src="/public/img/png/custom-tab.png">
                Custom Tab
            </div>
            <div v-for="(tab, index) in listService.tabs" :key="index" class="mt-[25px]">
                <div class="input-group">
                    <label>Tab Title</label>
                    <input v-model="tab.title" type="text" placeholder="-------------------" required />
                </div>
                <div class="input-group mt-[32px]">
                    <label>Description</label>
                    <textarea v-model="tab.overview" placeholder="Describe your object" rows="5" required></textarea>
                </div>
                <div class="delete-sec d-flex gap-2 align-items-center mt-5 ml-2 cursor-pointer"
                    @click="handleCustomTabDelete(index)">
                    <i class="bi bi-trash"></i>
                    Delete
                </div>
            </div>
        </div>
        <div class="buttons mt-4 d-flex align-items-center gap-[14px]">
            <button class="custom-tab-btn d-flex align-items-center bg-[#ffffff] " @click="handleCustomTabClick"> <i
                    class="bi bi-plus"></i>Add Custom Tab
            </button>
            <button @click="handleFormSubmit" class="Submit-btn d-flex align-items-center bg-[#ff5757]"
                :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true"></span>
                <span>{{ loading ? 'Submitting...' : 'Submit' }}</span>
                <i class="bi bi-chevron-right ms-2" v-if="!loading"></i>
            </button>
        </div>
    </div>

    <Dialog v-model:visible="infoModals" modal @hide="resetprogramForm" header="Program Details"
        class="popup-container admin-studyvisa-programform" :style="{ padding: '2rem 0rem' }"
        :breakpoints="{ '1199px': '90vw', '575px': '98vw' }">
        <div class="form-popup">
            <div class="form-sec">
                <div class="input-group">
                    <label class="required">PR Program Name</label>
                    <div class="select-option">
                        <select class="custom-select cursor-pointer" v-model="program.program_name">
                            <option class="cursor-pointer" v-for="(item, index) in listService.program_name_list"
                                :key="index" :value="item">{{ item }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="input-group">
                    <label class="required">Province</label>
                    <div class="input-container ">
                        <input type="text" id="location" class="location-input"
                            placeholder="Press Enter to add province " v-model="program_province"
                            @keyup.enter.prevent.stop="addProgramProvince" />
                        <img @click="addProgramProvince" src="/public/img/png/plus-red.png" class="add-icon">
                    </div>
                </div>
                <div :class="['tags-container-1', { 'has-border': program_province_list.length > 0 }]">
                    <div v-if="program_province_list.length > 0" v-for="(item, inx) in program_province_list"
                        class="tag-cell">
                        {{ item }}
                        <img class="remove-icon" @click="remove_program_province(inx)"
                            src="/public/img/png/cross-vector.png">
                    </div>
                </div>
                <div class="input-gp">
                    <div>
                        <label class="required">Eligibility Criteria</label>
                    </div>
                    <div class="study-visa-description-block">
                        <ClientOnly>
                            <QuillEditor :key="editorKey" v-model="program.eligibility_criteria" :modules="modules"
                                ref="qPro_html" class="mb-5" style="height:200px" />
                        </ClientOnly>
                        <p v-if="validationErrors.eligibility_criteria" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.eligibility_criteria }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-right mt-4">
            <Button @click="() => programsupdate ? handleupdate() : handleSubmit()" class="update-event-change"
                type="submit" :label="programsupdate ? 'Update' : 'Submit'" icon="pi pi-save" />
        </div>
    </Dialog>

    <Dialog v-model:visible="IconModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div data-kt-element="options">
            <div data-kt-element="sms">
                <div class="icon_cropper-container">
                    <div v-if="icon_showCropper" class="icon_cropper-modal">
                        <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
                            :stencil-props="{ aspectRatio: 2 / 1 }" />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" @click="IconModal = false" class="cropper-cancel" />
            <Button label="Upload" icon="pi pi-save" :loading="loading" @click="icon_uploadImage"
                class="cropper-upload" />
        </template>
    </Dialog>

    <Dialog v-model:visible="CoverModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div data-kt-element="options">
            <div data-kt-element="sms">
                <div class="icon_cropper-container">
                    <div v-if="icon_showCropper" class="icon_cropper-modal">
                        <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
                            :stencil-props="{ aspectRatio: 1 / 1 }" />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" @click="CoverModal = false" class="cropper-cancel" />
            <Button label="Upload" icon="pi pi-save" :loading="loading" @click="icon_uploadImage"
                class="cropper-upload" />
        </template>
    </Dialog>

    <Dialog v-model:visible="AddTestimonialOpen" @hide="resetTestimonialForm" modal header="Add Achievers"
        class="popup-container admin-studyvisa-programform" :style="{ padding: '2rem 2rem' }"
        :breakpoints="{ '1199px': '90vw', '575px': '98vw' }">
        <div class="update-screen">
            <div class="update-wrapper">
                <FormKit type="form" :submit-label="testimonilasupdate ? 'Update Achievement' : 'Add Achievement'"
                    @submit="handleTestimonilasSubmit" @submit-invalid="handleTestimonialInvalid">
                    <div class="update-events-content row">
                        <div class="update-events-left col-lg-8">
                            <div class="update-events-leftfrm">
                                <div class="update-events-1stfrm">
                                    <div class="update-events-1sttitle">
                                        <span class="update-events-titleedit">
                                            <p class="required font-normal">Achievers Name</p>
                                        </span>
                                    </div>
                                    <div class="update-events-1stdrop">
                                        <FormKit v-model="achievers.title" validation="required" id="update-event-selet"
                                            type="text" placeholder="---------" name="title" />
                                    </div>
                                </div>
                            </div>
                            <div class="update-events-1stfrm">
                                <div class="update-events-1sttitle">
                                    <span class="update-events-titleedit">
                                        <p class="required">Description</p>
                                    </span>
                                </div>
                                <div class="update-events-1stdrop h-[150px]">
                                    <ClientOnly>
                                        <QuillEditor :key="editorKey" :modules="modules" toolbar="full"
                                            ref="testimonialhtml" class="mb-2" v-model="achievers.description" />
                                    </ClientOnly>
                                    <p v-if="descriptionError"
                                        class="!text-[#ff0000] description-error text-xs  mt-[-5px] mb-5">
                                        {{ descriptionError }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-if="achievers.image" class="update-events-right col-lg-4">
                            <div class="update-event-right-wrap">
                                <div v-if="achievers.image" id="update-img-addevt">
                                    <label class="labelclass1" data-kt-image-input-action="change"
                                        :style="'background-image:url(' + achievers.image + ')'">
                                        <input ref="icon_imageInput" id="icon_imageInput" type="file" accept="image/*"
                                            style="display: none" @change="handleTestimonialsChange" />
                                        <FormKit validation="required" name="cover_image" type="text"
                                            v-model="achievers.image" id="icon" hidden
                                            validation-label="Achievers image" />
                                    </label>
                                </div>
                            </div>
                            <FormKit-messages name="cover_image" />
                        </div>
                        <div v-else class="update-events-right">
                            <div class="update-event-right-wrap">
                                <label class="update-event-right-image" data-kt-image-input-action="change">
                                    <div class="">
                                        <div class="update-event-rigt-innr">
                                            <img src="/img/png/upload.png" />
                                            <h5>Upload Achiever Image</h5>
                                        </div>
                                        <input ref="icon_imageInput" id="icon_imageInput" type="file" accept="image/*"
                                            style="display: none" @change="handleTestimonialsChange" />
                                        <FormKit validation="required" name="icon" type="text" v-model="achievers.image"
                                            id="icon" hidden validation-label="Achievers image" />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="update-event-btn mt-[90px]">
                        <Button class="update-event-change mt-3" type="submit"
                            :label="testimonilasupdate ? 'Update Achievement' : 'Add Achievement'" icon="pi pi-save" />
                    </div>
                </FormKit>
            </div>
        </div>
    </Dialog>

    <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{ 'min-width': '350px' }">
        <div data-kt-element="sms">
            <div class="icon_cropper-container">
                <div v-if="icon_showCropper" class="icon_cropper-modal">
                    <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
                        :stencil-props="{ aspectRatio: 1 / 2 }" />
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" @click="cropImage = false" class="cropper-cancel" />
            <Button label="Upload" icon="pi pi-save" @click="icon_uploadImage" class="cropper-upload" />
        </template>
    </Dialog>

    <Dialog v-model:visible="mediaIconModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div data-kt-element="options">
            <div data-kt-element="sms">
                <div class="icon_cropper-container">
                    <div v-if="mediaicon_showCropper" class="icon_cropper-modal">
                        <cropper :src="mediaicon_selectedImage" @change="mediaicon_updateCroppedData"
                            :stencil-props="{ aspectRatio: 2 / 2 }" />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" @click="mediaIconModal = false" class="cropper-cancel" />
            <Button label="Upload" icon="pi pi-save" :loading="loading" @click="mediaicon_uploadImage"
                class="cropper-upload" />
        </template>
    </Dialog>

    <Dialog v-model:visible="testimonialsIconModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div data-kt-element="options">
            <div data-kt-element="sms">
                <div class="icon_cropper-container">
                    <div v-if="testimonialsicon_showCropper" class="icon_cropper-modal">
                        <cropper :src="testimonialsicon_selectedImage" @change="testimonialsicon_updateCroppedData"
                            :stencil-props="{ aspectRatio: 2 / 2 }" />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" @click="testimonialsIconModal = false" class="cropper-cancel" />
            <Button label="Upload" icon="pi pi-save" :loading="loading" @click="testimonialsicon_uploadImage"
                class="cropper-upload" />
        </template>
    </Dialog>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
export default {
    components: {
        QuillEditor,
        Cropper,
    },
    name: 'CreateAchievers',
    data() {
        return {
            loading: false,
            data: [],
            descriptionError: '',
            titleError: '',
            imageError: '',
            addSidebar: false,
            infoModals: false,
            upoadSidebar: false,
            TestimonialDropdownOpen: false,
            MediaDropdownOpen: false,
            addMediaOpen: false,
            CustomTabOpen: false,
            customtabcount: 0,
            AddTestimonialOpen: false,
            customTabClicks: [],
            cropImage: false,
            icon_url: null,
            icon_showCropper: true,
            icon_croppedDataUrl: null,
            icon_selectedImage: null,
            icon_url: null,
            icon_selectedImage: null,
            icon_showCropper: true,
            IconModal: false,
            CoverModal: false,
            icon_croppedDataUrl: null,
            listService: {
                coverImage: '',
                collegeLogo: '',
                logo_file_name: '',
                tab: [],
                title: '',
                      overview:"",
                country: '',
                program_name_list: [],
                processing_time: "",
                pr_benefits: "",
                proof_of_funds: false,
                language_test: false,
                job_offer: false,
                job_search_assistance: false,
                settlement_services: false,
                family_sponsorship: false,
                website_link: "",
                tabs: [],
                media: false,
                media_list: [],
                testmonial: false,
                testimonilas: [],
            },
            program: {
                eligibility_criteria: "",
                program_name: "",
                program_province: [],
            },
            program_list: [],
            active_type: "",
            pr_program_name: "",
            program_category_name: "",
            program_province: "",
            program_province_list: [],
            adminCountries: [],
            validationErrors: {},
            program_validationErrors: {},
            mediaicon_selectedImage: null,
            mediaicon_showCropper: false,
            mediaIconModal: false,
            mediaicon_croppedDataUrl: null,
            mediaAllImagePic: [],
            activeDropdownIndex: null,
            testimonialsicon_selectedImage: null,
            testimonialsicon_showCropper: false,
            testimonialsIconModal: false,
            testimonialsicon_croppedDataUrl: null,
            testimonialsAllImagePic: [],
            achievers: {
                title: null,
                description: null,
                image: null,
            },
            editorKey: 0,
            testimonilasupdate: false,
            edittestiminlaindex: null,
            editProgramindex: null,
            programsupdate: false,
            listing_data: null,
            validationErrors: {},
        };
    },
    async mounted() {
        activateSubmenu('b3', 'Permanent Residency (PR)', true);
        this.fetchAdminCountries('Settle Abroad')
        if (this.$route.query.id) {
            this.listingUpdateView()
            this.achieverview()
        }
    },
    methods: {
        openInfoModal() {
            if (this.listService.program_name_list.length > 0) {
                this.infoModals = true
                if (this.listService.program_name_list.length === 1) {
                    this.program.program_name = this.listService.program_name_list[0];
                }
            } else {
                errorAlert("Atleast add one Program name")
            }
        },
         clearProgramNameError() {
    const value = this.listService.pr_program_name?.trim();
    if (value && value.length > 0) {
      delete this.validationErrors.program_name_list;
    }
  },
        onlyDigits(event, modelKey) {
            event.target.value = event.target.value.replace(/\D/g, '');
            if (modelKey == "pincode") {
                this.listService.pincode = event.target.value;
            }
            if (modelKey == "fee") {
                this.program.application_fee = event.target.value;
            }
            if (modelKey == "tution_fee") {
                this.program.annual_tution_fee = event.target.value;
            }
        },
            resetFileInput(e) {
    e.target.value = null; // allows re-selecting the same file
  },
        async submitColleageStudyVisa() {
            if (!this.validateFields()) {
                return;
            }
            this.loading = true
            const list = {
                pr_program_name: this.listService.program_name_list,
                website_link: this.listService.website_link,
                programs: this.program_list,
                processing_time: this.listService.processing_time,
                pr_benefit: this.$refs.pr_qhtml.getHTML(),
                proof_of_funds: this.listService.proof_of_funds,
                language_test: this.listService.language_test,
                job_offer: this.listService.job_offer,
                job_search_assistance: this.listService.job_search_assistance,
                settlement_services: this.listService.settlement_services,
                family_sponsorship: this.listService.family_sponsorship,
            };
            const timestamp = Date.now();
            const uploadPromises = this.mediaAllImagePic.map(async (e, i) => {
                const fileName = `cover_image_${timestamp}_${i}`;
                const uploadedUrl = await uploadImageAdminE2(e.media_url, fileName);
                return { media_url: uploadedUrl, alt_tag: e.alt_tag };
            });
            const testimonialUploadPromises = this.listService.testimonilas.map(async (t, index) => {
                if (t.image && t.image.startsWith('data:')) { // Only upload if image is new (base64 or blob)
                    const fileName = `testimonial_image_${timestamp}_${index}`;
                    const uploadedUrl = await uploadImageAdminE2(t.image, fileName);
                    return { ...t, image: uploadedUrl };
                } else {
                    return t;
                }
            });
            this.listService.testimonilas = await Promise.all(testimonialUploadPromises);
            try {
                this.loading = true;
                const uploadedResults = await Promise.all(uploadPromises);
                this.listService.media_list.push(...uploadedResults);
                const payload = {
                    title: "Pemanent Residency" + " " + this.listService.country,
                    description: this.$refs.qhtml.getHTML(),
                    country: this.listService.country,
                    cover_image: this.listService.coverImage,
                    logo: this.listService.collegeLogo,
                    logo_file_name: this.listService.logo_file_name,
                    testimonial: this.listService.testmonial,
                    media: this.listService.media,
                    media_list: this.listService.media_list, // ✅ Now it contains uploaded images
                    tabs: this.listService.tabs,
                    service_name: "Settle Abroad",
                    is_trial: false,
                    is_paid: false,
                    paymentdetails: {},
                    ssr: {
                        keywords: ['find', 'and', 'consult', 'visa', 'copnsultants'],
                        title: 'Find And Consult title',
                        description: 'Find And Consult Visa Services',
                        meta_name: [{ title: null, content: null }],
                        meta_property: [{ title: null, content: null }]
                    },
                    su: {
                        is_publish: false,
                        is_applied: true,
                        status: "new",
                        comment: "Request Received"
                    },
                    Permanent_Residency: list,
                    sub_service_name: 'Permanent_Residency',
                    testimonials: this.listService.testimonilas
                };
                const res = await adminPost('/admin-study-add', payload);
                if (res.status === true) {
                    successAlert("Listing added successfully");
                    this.resetForm();
                    this.$router.push({
                        path: '/admin/Categories/Settle Abroad'
                    });
                }
                this.loading = false;
            } catch (error) {
                console.error("Error during submission:", error);
                this.loading = false;
            }
        },
        async listingUpdateView() {
            try {
                console.log(this.$route.query.id)
                const response = await adminGet(`/admin-study-get-listing/${this.$route.query.id}`);
                const dataview = response.data.data[0];
                this.listService.program_name_list = dataview.Permanent_Residency.pr_program_name;
                this.listService.website_link = dataview.Permanent_Residency.website_link;
                this.program_list = dataview.Permanent_Residency.programs;
                this.listService.processing_time = dataview.Permanent_Residency.processing_time;
                this.$refs.pr_qhtml.setHTML(dataview.Permanent_Residency.pr_benefit);
                this.listService.proof_of_funds = dataview.Permanent_Residency.proof_of_funds;
                this.listService.language_test = dataview.Permanent_Residency.language_test;
                this.listService.job_offer = dataview.Permanent_Residency.job_offer;
                this.listService.job_search_assistance = dataview.Permanent_Residency.job_search_assistance;
                this.listService.settlement_services = dataview.Permanent_Residency.settlement_services;
                this.listService.family_sponsorship = dataview.Permanent_Residency.family_sponsorship;
                this.$refs.qhtml.setHTML(dataview.description),
                    this.listService.country = dataview.country,
                    this.listService.coverImage = dataview.cover_image,
                    this.listService.collegeLogo = dataview.logo,
                    this.listService.logo_file_name = dataview.logo_file_name,
                    this.listService.testmonial = dataview.testimonial,
                    this.listService.media = dataview.media,
                    this.mediaAllImagePic = dataview.media_list
                this.listService.tabs = dataview.tabs,
                    console.log("listservice", this.listService)
                console.log("program", this.program_list)
                console.log("this.$refs.pr_qhtml.setHTM", dataview.description)
            } catch (error) {
                console.error('Error fetching adminCountries list:', error);
            }
        },
        async achieverview() {
            const id = this.$route.query.id; // Get ID from query parameters
            if (id) {
                await homeGet(`/admin-study_visa-acheverlist/${id}`).then((response) => {
                    this.listService.testimonilas = response.data.data;
                    console.log("this.listService.achievers", this.listService.testimonilas)
                }).catch((error) => {
                    console.error("Error fetching achievers:", error);
                });
            }
        },
//         validateQuillEditor() {
//     const text = this.$refs.qhtml.getText().trim(); // plain text (no HTML)
//     const words = text.split(/\s+/).filter(w => w.length > 0);

//     if (words.length < 30) {
//       this.validationErrors.overview = "Description must be at least 150 charcters";
//     } else {
//       delete this.validationErrors.overview;
//     }
//   },
validateQuillEditor() {
  const text = this.$refs.qhtml.getText().trim(); // plain text (no HTML)

  // Count characters (ignoring spaces and line breaks if you want)
  const charCount = text.replace(/\s+/g, '').length;

  if (charCount < 150) {
    this.validationErrors.overview = "Description must be at least 150 characters";
  } else {
    delete this.validationErrors.overview;
  }
},
        async submitColleageStudyVisaEdit() {
            if (!this.validateFields()) {
                return;
            }
            this.loading = true;
            const timestamp = Date.now();
            const list = {
                pr_program_name: this.listService.program_name_list,
                website_link: this.listService.website_link,
                programs: this.program_list,
                processing_time: this.listService.processing_time,
                pr_benefit: this.$refs.pr_qhtml.getHTML(),
                proof_of_funds: this.listService.proof_of_funds,
                language_test: this.listService.language_test,
                job_offer: this.listService.job_offer,
                job_search_assistance: this.listService.job_search_assistance,
                settlement_services: this.listService.settlement_services,
                family_sponsorship: this.listService.family_sponsorship,
            };
            const existingImages = this.mediaAllImagePic.filter(e => !e.media_url.startsWith('data:'));
            const newImages = this.mediaAllImagePic.filter(e => e.media_url.startsWith('data:'));
            const uploadPromises = newImages.map(async (e, i) => {
                const fileName = `cover_image_${timestamp}_${i}`;
                const uploadedUrl = await uploadImageAdminE2(e.media_url, fileName);
                return { media_url: uploadedUrl, alt_tag: e.alt_tag };
            });
            const uploadedResults = await Promise.all(uploadPromises);
            this.listService.media_list = [...existingImages, ...uploadedResults];
            const testimonialUploadPromises = this.listService.testimonilas.map(async (t, index) => {
                if (t.image && t.image.startsWith('data:')) {
                    const fileName = `testimonial_image_${timestamp}_${index}`;
                    const uploadedUrl = await uploadImageAdminE2(t.image, fileName);
                    return { ...t, image: uploadedUrl };
                } else {
                    return t;
                }
            });
            this.listService.testimonilas = await Promise.all(testimonialUploadPromises);
            try {
                const payload = {
                    title: "Pemanent Residency" + " " + this.listService.country,
                    description: this.$refs.qhtml.getHTML(),
                    country: this.listService.country,
                    cover_image: this.listService.coverImage,
                    logo: this.listService.collegeLogo,
                    logo_file_name: this.listService.logo_file_name,
                    testimonial: this.listService.testmonial,
                    media: this.listService.media,
                    media_list: this.listService.media_list,
                    tabs: this.listService.tabs,
                    service_name: "Settle Abroad",
                    is_trial: false,
                    is_paid: false,
                    paymentdetails: {},
                    ssr: {
                        keywords: ['find', 'and', 'consult', 'visa', 'copnsultants'],
                        title: 'Find And Consult title',
                        description: 'Find And Consult Visa Services',
                        meta_name: [{ title: null, content: null }],
                        meta_property: [{ title: null, content: null }]
                    },
                    su: {
                        is_publish: false,
                        is_applied: true,
                        status: "new",
                        comment: "Request Received"
                    },
                    Permanent_Residency: list,
                    sub_service_name: 'Permanent_Residency',
                    media_list: this.listService.media_list,
                    testimonials: this.listService.testimonilas,
                };
                const res = await adminPut(`/admin-study-update/${this.$route.query.id}`, payload);
                if (res.status === true) {
                    successAlert("Listing updated successfully");
                    this.resetForm();
                    this.$router.push({
                        path: '/admin/Categories/Settle Abroad'
                    });
                }
                this.loading = false;
            } catch (error) {
                console.error("Error during submission:", error);
                this.loading = false;
            }
        },
        handleFormSubmit() {
            const hasIncompleteTab = this.listService.tabs.some(
                (tab) => !tab.title.trim() || !tab.overview.trim()
            );
            if (hasIncompleteTab) {
                errorAlert("Please fill or remove all custom tabs before submitting.");
                return;
            }
            const listingId = this.$route.query.id; // or this.$route.params.id if using params
            if (listingId) {
                this.submitColleageStudyVisaEdit();
            } else {
                this.submitColleageStudyVisa();
            }
        },
        resetForm() {
            this.listService = {
                location: '',
                coverImage: '',
                collegeLogo: '',
                logo_file_name: '',
                tab: [],
                collegeName: '',
                country: '',
                state: '',
                pincode: '',
                location: [],
                program_category: [],
                collegeBrochure: '',
                collegeBrouchure_filename: '',
                addMedia: '',
                media_list: [],
                accommodation_available: false,
                living_expenses: '',
                language_proficiency: '',
                minimum_language_score: '',
                finanicial_sponsorship: false,
                healh_insurance: false,
                visa_sponsor: false,
            }
        },
        validateForm() {
            this.program_validationErrors = {};
            if (!this.program_province_list || this.program_province_list.length === 0) {
                this.program_validationErrors.program_province = 'Program province is required';
            }
            if (!this.program.program_name) {
                this.program_validationErrors.program_name = 'Program name is required';
            }
            const overviewContent = this.$refs.qPro_html.getHTML()?.trim();
            const plainText = this.stripHtml(overviewContent || "");
            const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
            if (!overviewContent || overviewContent === '<p><br></p>') {
                this.program_validationErrors.eligibility_criteria = 'Eligibility_criteria is required.';
            } else if (wordCount < 30) {
                this.program_validationErrors.eligibility_criteria = 'Eligibility_criteria must be at least 30 words.';
            }
            if (Object.keys(this.program_validationErrors).length > 0 || Object.keys(this.validationErrors).length > 0) {
                const errorMessages = Object.values(this.program_validationErrors).concat(Object.values(this.validationErrors)).join('\n');
                errorAlert(`Please fix the following errors:\n\n${errorMessages}`);
                setTimeout(() => {
                    this.program_validationErrors = {};
                    this.validationErrors = {};
                }, 4000);
                return false;
            }
            return true;
        },
        handleSubmit() {
            if (this.validateForm()) {
                this.program.program_name = this.program.program_name;
                this.program.eligibility_criteria = this.$refs.qPro_html.getHTML()
                this.program.program_province = this.program_province_list
                console.log("abc", this.program_province_list)
                this.program_list.push(this.program)
                console.log("programlist", this.program_list)
                this.resetProgram()
                this.program_province_list = []
                this.infoModals = false
            }
        },
        resetProgram() {
            this.program = {
                program_description: "",
                program_name: "",
                program_province: [],
            };
        },
        validateFields() {
            this.validationErrors = {};
            if (!this.listService.coverImage) {
                this.validationErrors.coverImage = 'Cover Image is required.';
            }else{
        delete this.validationErrors.coverImage; }
            if (!this.listService.collegeLogo) {
                this.validationErrors.collegeLogo = 'Country Icon is required.';
            }
            if (this.listService.website_link) {
                const urlPattern = new RegExp(
                    '^(https?:\\/\\/)?' +
                    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})' +
                    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' +
                    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' +
                    '(\\#[-a-zA-Z\\d_]*)?$', 'i'
                );
                if (!urlPattern.test(this.listService.website_link)) {
                    this.validationErrors.website_link = 'Please enter a valid Website URL.';
                }
            }
            if (!this.listService.program_name_list || this.listService.program_name_list.length === 0) {
                this.validationErrors.program_name_list = 'Program name is required';
            }
            if (!this.listService.country) {
                this.validationErrors.country = 'Country is required.';
            }
            const plainText = this.$refs.qhtml.getText().trim();
  const charCount = plainText.replace(/\s+/g, '').length;

  if (!plainText) {
    this.validationErrors.overview = 'Description is required.';
  } else if (charCount < 150) {
    this.validationErrors.overview = 'Description must be at least of 150 characters.';
  }
            if (Object.keys(this.validationErrors).length > 0) {
                const errorMessages = Object.values(this.validationErrors).join('\n\n');
                errorAlert(`Please fill the following details:\n\n${errorMessages}`);
            }
            return Object.keys(this.validationErrors).length === 0;
        },
         clearError(field) {
    if (this.validationErrors[field]) {
      this.validationErrors[field] = "";
    }
  },
        stripHtml(html) {
            const div = document.createElement("div");
            div.innerHTML = html;
            return div.textContent || div.innerText || "";
        },
        async fetchAdminCountries(category_name) {
            if (this.adminCountries.length > 0) {
                return;
            }
            try {
                const response = await adminGet(`/admin-company-country-providing-service/${category_name}`);
                this.adminCountries = response.data.data;
            } catch (error) {
                console.error('Error fetching adminCountries list:', error);
            }
        },
        async submitForm(v) {
            v.image = this.icon_url
            v.country = this.country
            v.description = this.$refs.qhtml.getHTML()
            await adminPost(`/company-achievers`, v)
                .then(response => {
                    successAlert("Achievers added successfully")
                    this.$router.go(-1);
                }).catch(async (error) => {
                    await serverErrorMessage(() => this.submitForm(v))
                })
        },
        delete_program(index) {
            this.program_list.splice(index, 1)
        },
        edit_program(item, index) {
            this.program.program_name = item.program_name,
                this.program_province_list = item.program_province,
                this.program.program_province = this.program_province_list
            this.program.eligibility_criteria = item.eligibility_criteria
            this.infoModals = true
            this.editProgramindex = index
            this.programsupdate = true
            this.$nextTick(() => {
                setTimeout(() => {
                    this.program.eligibility_criteria = item.eligibility_criteria;
                    const quill = this.$refs.qPro_html?.getQuill();
                    if (quill) {
                        quill.root.innerHTML = item.eligibility_criteria || '';
                    }
                }, 100);
            });
        },
        handleupdate() {
            this.program.eligibility_criteria = this.$refs.qPro_html.getHTML()
            this.program_list.splice(this.editProgramindex, 1, this.program),
                this.programsupdate = false
            this.editProgramindex = null
            this.infoModals = false
            this.resetProgram()
        },
         handleImageChange(event, type_image) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    this.validationErrors[type_image === "cover" ? "coverImage" : "collegeLogo"] =
      "Only image files are allowed.";
    return;
  }
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    this.validationErrors[type_image === "cover" ? "coverImage" : "collegeLogo"] =
      "Image must be less than 2MB.";
    return;
  }
  delete this.validationErrors[type_image === "cover" ? "coverImage" : "collegeLogo"];
  if (type_image === "cover") {
    this.CoverModal = true;
    this.active_type = "cover";
  } else if (type_image === "logo") {
    this.IconModal = true;
    this.active_type = "logo";
    this.listService.logo_file_name = file.name;
  }
  this.icon_selectedImage = URL.createObjectURL(file);
  this.icon_showCropper = true;
},
        icon_handleImageChange(event) {
            if (event.target.files[0].type.split("/")[0] != 'image') {
                errorAlert("Please Upload Valid Image FIle")
                return
            }
            this.cropImage = true
            const icon_selectedFile = event.target.files[0];
            if (icon_selectedFile) {
                this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
                this.icon_showCropper = true;
            }
        },
        async icon_uploadImage() {
            this.icon_url = null
            this.icon_url = this.icon_croppedDataUrl
            this.cropImage = false
        },
        icon_updateCroppedData({ coordinates, canvas }) {
            this.icon_croppedDataUrl = canvas.toDataURL();
        },
        async handleBrouchureChange(event) {
            const file = event.target.files[0];
            if (!file) {
                errorAlert("No file selected.");
                return;
            }
            if (file.type !== 'application/pdf') {
                errorAlert("Please upload a valid PDF file.");
                return;
            }
            this.listService.collegeBrouchure_filename = file.name;
            try {
                const uploadedUrl = await uploadFileAdminE2(file, 'college_brochure');
                this.listService.collegeBrochure = uploadedUrl;
                return console.log("url", uploadedUrl)
            } catch (err) {
                errorAlert("Failed to upload brochure.");
                console.error(err);
            }
        },
      
        async icon_uploadImage() {
            this.icon_url = null
            if (this.active_type == 'cover') {
                this.listService.coverImage = this.icon_croppedDataUrl
                console.log("url", this.listService.coverImage)
                const timestamp = Date.now();
                const fileName = `cover_image_${timestamp}`;
                const x = await uploadImageAdminE2(this.icon_croppedDataUrl, fileName);
                this.listService.coverImage = x
                console.log("final firebase link cover", x)
                this.active_type = ""
                this.icon_croppedDataUrl = null
            }
            if (this.active_type == 'logo') {
                this.listService.collegeLogo = this.icon_croppedDataUrl
                console.log("url", this.listService.collegeLogo)
                const timestamp = Date.now();
                const fileName = `symbol_${timestamp}`;
                const x = await uploadImageAdminE2(this.icon_croppedDataUrl, fileName);
                this.listService.collegeLogo = x
                console.log("final firebase link logo", x)
                this.active_type = ""
                this.icon_croppedDataUrl = null
            }
            this.cropImage = false
            this.IconModal = false
            this.CoverModal = false
        },
        async showData(i) {
            this.addSidebar = true
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file && file.type === 'text/csv') {
                this.csvFilename = file.name
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target.result;
                    const data = this.parseCSV(text);
                    console.log(data);
                    this.csvData = data.length
                    this.csvdata_failure = data.counts.failure
                    this.csvdata_success = data.counts.success
                    this.csv_success_data = data.successList
                };
                reader.readAsText(file);
            } else {
                console.log('Please upload a valid CSV file.');
            }
        },
        addProgram_name() {
            if (!this.pr_program_name.trim()) {
                return errorAlert("Add program!");
            }
            const categories = this.pr_program_name
                .split(',')
                .map(cat => cat.trim())
                .filter(cat => cat.length > 0);
            categories.forEach(cat => {
                if (!this.listService.program_name_list.includes(cat)) {
                    this.listService.program_name_list.push(cat);
                }
            });
            this.pr_program_name = "";
             if (this.listService.program_name_list.length > 0) {
        delete this.validationErrors.program_name_list;
    }
            console.log(this.listService.program_name_list)
        },
         handleToggle() {
    if (this.listService.testmonial) {
      this.successAlert();
    } else {
      this.successlert();
    }
  },
  successAlert() {
    successAlert('Testimonial Enabled successfully.')
    alert(message);
  },
  successlert(){
 successAlert('Testimonial Disabled successfully.')
    alert(message);
  },
  handleMediaToggle() {
    if (this.listService.media) {
      this.successrt();
    } else {
      this.successle();
    }
  },
  successrt() {
    successAlert('Media Enabled successfully.')
    alert(message);
  },
  successle(){
 successAlert('Media Disabled successfully.')
    alert(message);
  },
        addProgramProvince() {
            if (!this.program_province || this.program_province.trim() === "") {
                return errorAlert("Add program_province!");
            }
            this.program_province_list.push(this.program_province)
            console.log("province", this.program.program_province)
            this.program_province = ""
        },
        handleEnter(event) {
            event.preventDefault();
            event.stopPropagation();
            this.addProgramProvince();
        },
        remove_prProgram(i) {
            this.listService.program_name_list.splice(i, 1);
             if (this.listService.program_name_list.length === 0) {
      this.validationErrors.program_name_list = 'At least one program name is required.';
    }
        },
        removeProgram(i) {
            this.listService.program_category.splice(i, 1)
        },
        remove_program_province(i) {
            this.program_province_list.splice(i, 1)
        },
        handleCustomTabClick() {
            const lastTab = this.listService.tabs[this.listService.tabs.length - 1];
            if (lastTab && (!lastTab.title || !lastTab.overview)) {
                errorAlert("Please fill the previous custom tab before adding a new one.");
                return;
            }
            this.listService.tabs.push({
                title: '',
                overview: ''
            });
        },
        // handleCustomTabDelete(index) {
        //     this.listService.tabs.splice(index, 1);
        // },
        async handleCustomTabDelete(index) {
       if (await deleteConfirm('Do you want to delete this Custom Tab')) {
        this.listService.tabs.splice(index, 1);
        successAlert('Custom Tab Deleted');
      }
    },
        handleMediaChange(event) {
            if (event.target.files[0].type.split("/")[0] != 'image') {
                errorAlert("Please Upload Valid Image FIle")
                return
            }
            const icon_selectedFile = event.target.files[0];
            if (icon_selectedFile) {
                this.mediaicon_selectedImage = URL.createObjectURL(icon_selectedFile);
                this.mediaicon_showCropper = true;
                this.mediaIconModal = true;
            } x
        },
        mediaicon_updateCroppedData({ coordinates, canvas }) {
            this.mediaicon_croppedDataUrl = canvas.toDataURL();
        },
        async mediaicon_uploadImage() {
            await this.$nextTick();
            try {
                this.loading = true;
                const uploadedImageUrl = this.mediaicon_croppedDataUrl
                this.loading = false;
                if (typeof uploadedImageUrl === 'string' && uploadedImageUrl.trim() !== "") {
                    this.mediaAllImagePic.push({ media_url: uploadedImageUrl, alt_tag: "image" });

                    this.mediaIconModal = false;
                } else {
                    console.error("Invalid uploadedImageUrl received:", uploadedImageUrl);
                }
            } catch (err) {
            }
        },
        deletemedia(index) {
            this.mediaAllImagePic.splice(index, 1)
        },
        handleTestimonialsChange(event) {
            if (event.target.files[0].type.split("/")[0] != 'image') {
                errorAlert("Please Upload Valid Image File")
                return
            }
            const icon_selectedFile = event.target.files[0];
            if (icon_selectedFile) {
                this.testimonialsicon_selectedImage = URL.createObjectURL(icon_selectedFile);
                this.testimonialsicon_showCropper = true;
                this.testimonialsIconModal = true;
            }
        },
        testimonialsicon_updateCroppedData({ coordinates, canvas }) {
            this.testimonialsicon_croppedDataUrl = canvas.toDataURL();
        },
        async testimonialsicon_uploadImage() {
            await this.$nextTick();
            try {
                this.loading = true;
                const uploadedImageUrl = this.testimonialsicon_croppedDataUrl
                this.loading = false;
                if (typeof uploadedImageUrl === 'string' && uploadedImageUrl.trim() !== "") {
                    this.achievers.image = uploadedImageUrl;

                    this.testimonialsIconModal = false;
                } else {
                    console.error("Invalid uploadedImageUrl received:", uploadedImageUrl);
                }
            } catch (err) {
            }
        },
        deletetestimonials(index) {
            this.listService.testimonilas.splice(index, 1)
            this.activeDropdownIndex = null
        },
        testimonialsubmitForm() {
            this.achievers.description = this.$refs.testimonialhtml.getHTML()
            this.listService.testimonilas.push(this.achievers)
            this.achievers = {
                title: null,
                description: null,
                image: null,
            }
            this.AddTestimonialOpen = false
        },
        editdeletetestimonials(data, index) {
            this.achievers = {
                title: data.title,
                image: data.image,
                description: '',
            };
            this.AddTestimonialOpen = true;
            this.testimonilasupdate = true
            this.edittestiminlaindex = index
            this.$nextTick(() => {
                setTimeout(() => {
                    this.achievers.description = data.description;
                    const quill = this.$refs.testimonialhtml?.getQuill();
                    if (quill) {
                        quill.root.innerHTML = data.description || '';
                    }
                }, 100);
            });
        },
        resetTestimonialForm() {
            this.achievers = { title: '', image: '', description: '' };
            this.descriptionError = '';
        },
        resetprogramForm() {
            this.program = {
                eligibility_criteria: "",
                program_name: "",
                program_province: [],
            }
        },
        updatetestimonial() {
            this.activeDropdownIndex = null
            this.achievers.description = this.$refs.testimonialhtml.getHTML()
            this.listService.testimonilas.splice(this.editdeletetestimonials, 1, this.achievers),
                this.testimonilasupdate = false
            this.edittestiminlaindex = null
            this.AddTestimonialOpen = false
            resetTestimonialForm()
        },
        handleTestimonilasSubmit(event) {
            const descriptionText = this.$refs.testimonialhtml.getText().trim();
            if (!descriptionText) {
                this.descriptionError = 'Description is required.';
                console.log("Description missing");
                return;
            } else {
                this.descriptionError = '';
            }
            if (this.testimonilasupdate) {
                this.updatetestimonial();
            } else {
                this.testimonialsubmitForm();
            }
        },
        handleTestimonialInvalid() {
            const descriptionText = this.$refs.testimonialhtml.getText().trim();
            if (this.testimonilasupdate) {
                this.updatetestimonial();
            } else {
                this.testimonialsubmitForm();
            }
        },
        handleTestimonialInvalid() {
            const descriptionText = this.$refs.testimonialhtml.getText().trim();

            if (!descriptionText) {
                this.descriptionError = 'Description is required.';
            } else {
                this.descriptionError = '';
            }
        },
        toggleDropdown(index) {
            if (this.activeDropdownIndex === index) {
                this.activeDropdownIndex = null;
            } else {
                this.activeDropdownIndex = index;
            }
        },
    }
};
</script>

<style scoped>
@import url('style.css');

.ql-toolbar.ql-snow {
    border-radius: 5px 5px 0px 0px !important;
}

.ql-container.ql-snow {
    border-radius: 0px 0px 5px 5px !important;
}

input[type="checkbox"] {
    width: 15px;
    height: 15px;
    accent-color: #ff5757;
    border: 1px solid #ff5757;
}

input[type="checkbox"]:checked {
    border: 1px solid #ff5757;
}

.required:after {
    content: " *";
    color: #ff5757;
}
</style>