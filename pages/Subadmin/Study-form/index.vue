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
        <input v-if="listService.coverImage == ''" class="image-upload" type="file" hidden required accept="image/*"
          @change="handleImageChange($event, 'cover')" />
        <img v-if="listService.coverImage == ''" src="/public/img/png/camera.png" class="camera-vec">
        <p v-if="listService.coverImage == ''">Upload Cover Image</p>
        <!-- <div class="border h-[200px] w-[100%] " v-if="listService.coverImage != '' && listService.coverImage">
            <input ref="coverInput" type="file" hidden accept="image/*" 
                        @change="handleImageChange($event, 'cover')" />
          <img class="rounded-xl h-[100%] w-[100%]" :src="listService.coverImage" alt="" />
        </div> -->


        <div class="relative border h-[200px] w-full" v-if="listService.coverImage != '' && listService.coverImage">
          <img class="rounded-xl h-full w-full object-cover" :src="listService.coverImage" alt="Cover" />
          <label
            class="absolute w-8 h-8 top-2 right-2 bg-white p-1 rounded-full cursor-pointer shadow hover:bg-gray-100 transition"
            title="Change Image">
            <input ref="coverInput" type="file" hidden accept="image/*" @click="resetFileInput"
              @change="handleImageChange($event, 'cover')" />
            <i class="pi pi-pencil text-gray-700 text-base"></i>
          </label>
        </div>


      </label>
      <p v-if="validationErrors.coverImage" class="!text-red-500 text-sm mt-1">
        {{ validationErrors.coverImage }}
      </p>

    </div>

    <div class="grid">
      <div class="input-group">
        <label class="required">College/University Name</label>
        <input type="text" placeholder="-------------------" required v-model="listService.collegeName" />
        <p v-if="validationErrors.collegeName" class="!text-red-500 text-sm mt-1">
          {{ validationErrors.collegeName }}
        </p>
      </div>
      <div class="input-group">
        <label class="required">Country of Institution</label>
        <div class="select-option cursor-pointer">
          <select v-model="listService.country" class="custom-select cursor-pointer" required>
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
        <input type="url" v-model="listService.college_website_link" placeholder="-------------------" required />

      </div>
      <div class="input-group">
        <label>College Brochure</label>

        <label class="brochure_upload-box cursor-pointer ">
          <span v-if="listService.collegeBrouchure_filename" class="logo-name"> {{
            listService.collegeBrouchure_filename }}</span>
          <span v-else class="logo-name">file name .pdf</span>
          <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />
          <input type="file" id="logo-upload" accept="application/pdf"
            @change="handleBrouchureChange($event, 'collegeBrochure')" hidden required />
        </label>
      </div>
      <div class="input-group">
        <label class="required">College/University Logo</label>
        <label class="upload-box cursor-pointer">

          <img v-if="listService.logo_file_name" :src="listService.collegeLogo" alt="Logo Preview" class="logo-thumb" />
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
      <div class="input-group">
        <label class="required">Province/State</label>
        <input type="text" v-model="listService.state" placeholder="-------------------" required />
        <p v-if="validationErrors.state" class="!text-red-500 text-sm mt-1">
          {{ validationErrors.state }}
        </p>
      </div>
   
      </div>
    <div class="input-group mb-4">
      <label>Zip code</label>
      <input v-model="listService.pincode" type="text" placeholder="-------------------" required inputmode="numeric" />
      <!-- <input v-model="listService.pincode" type="text" placeholder="-------------------" required inputmode="numeric"
          pattern="\d{6,}" minlength="6" maxlength="6" @input="onlyDigits($event, 'pincode')" /> -->
      <p v-if="validationErrors.pincode" class="!text-red-500 text-sm mt-1">
        {{ validationErrors.pincode }}
      </p>
    </div>
   
    <div class="input-group">
      <label>Branches</label>
      <div class="input-container ">
        <input type="text" id="location" class="location-input" placeholder="Press Enter to add branches"
          v-model="location_name" @keyup.enter="addLocation" />
        <img @click="addLocation" src="/public/img/png/plus-red.png" class="add-icon">
        <p v-if="validationErrors.location" class="!text-red-500 text-sm mt-1">
          {{ validationErrors.location }}
        </p>
      </div>
    </div>
    <div class="tags-container">
      <div v-if="listService.location.length > 0" v-for="(item, inx) in listService.location" class="tag">
        {{ item }}
        <img @click="removelocation(inx)" src="/public/img/png/cross-vector.png">
      </div>

    </div>

    <div class="input-group">
      <label>Program Catgeory</label>
      <div class="input-container ">
        <input type="text" id="location" class="location-input" placeholder="Press Enter to add program category"
          v-model="program_category_name" @keyup.enter="addProgramCategory" />
        <img @click="addProgramCategory" src="/public/img/png/plus-red.png" class="add-icon">
        <p v-if="validationErrors.location" class="!text-red-500 text-sm mt-1">
          {{ validationErrors.location }}
        </p>
      </div>
    </div>
    <div class="tags-container">
      <div v-if="listService.program_category.length > 0" v-for="(item, inx) in listService.program_category"
        class="tag">
        {{ item }}
        <img @click="removeProgram(inx)" src="/public/img/png/cross-vector.png">
      </div>

    </div>
    <div class="input-gp">
      <div>
        <label class="required">Description</label>
      </div>
      <div class="study-visa-description-block">
        <QuillEditor :modules="modules" ref="qhtml" class="mb-4" style="height:200px" />
        <p v-if="validationErrors.overview" class="!text-red-500 text-sm mt-1">
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
        <button class=" add-program-btn dropdown-toggle drp" type="button" data-bs-toggle="dropdown"
          aria-expanded="false" @click="addProgramDropdown = true">
          <img src="/public/img/png/plus-white.png" alt="plus" style="width: 18px; height: 18px; margin-right: 6px;" />
          Add Program
          <img src="/public/img/png/dropdown-white.png" class="ml-2 mr-2">
        </button>
        <ul class="dropdown-menus styled-dropdown" v-if="addProgramDropdown">
          <li><a class="dropdown-item" @click="openInfoModal">
              <BootstrapIcon name="plus-circle" class="me-2" /> Add New Program
            </a></li>
          <li><a class="dropdown-item" @click="openAddSidebar">
              <BootstrapIcon name="filetype-csv" class="me-2" />Upload from CSV
            </a></li>
        </ul>
      </div>


    </div>
    <div v-if="program_list.length > 0" class="program-table-container" style="overflow-x:auto;">
      <table>
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Mode OF Study</th>
            <th>Study Level</th>
            <th>Program Duration</th>
            <th>Tuition Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in program_list">
            <td>{{ item.program_name }}</td>
            <td>{{ item.mode_of_study }}</td>
            <td>{{ item.study_level }}</td>
            <td>{{ item.duration_of_study }}</td>
            <td>{{ item.annual_tution_fee }}</td>
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
      <div class=grid>
        <div class="form-group ">
          <label>On-Campus Accommodation Available?</label>
          <div class="radio-group cursor-pointer">
            <label><input class="cursor-pointer" type="radio" name="accommodation" value=true
                v-model="listService.accommodation_available">
              Yes</label>
            <label><input class="cursor-pointer" type="radio" name="accommodation" value=false
                v-model="listService.accommodation_available">
              No</label>
          </div>
        </div>
        <div class="input-grp">
          <div class="est-label">
            <label>Living Expenses</label>
            <span>est per year</span>
          </div>
           <div class="flex border-[1px] border-[#D5D2DC] rounded-[10px]  py-[6px]">
            <select v-model="living_expenses_currency" class="px-[19px] outline-none border-0  py-[10px] w-[70px] ">
              <option value="" disabled>Select Currency</option>
              <option value="$">$</option>
              <option value="₹">₹</option>
            </select>
         <span class="border-r-[1px] ml-2 rounded-0 border-l-[0px] border-y-[0px]"></span>
            <input type="text" class=" border-0   outline-none" placeholder="------------------" required v-model="listService.living_expenses"
              @keypress="restrictToNumbers">
          </div>

        </div>
        <div class="input-group">
          <label>Language Proficiency Requirement</label>
          <div class="select-option">
            <select class="custom-select cursor-pointer" v-model="listService.language_proficiency" required>
              <option class="cursor-pointer" value="a1">a1</option>
              <option class="cursor-pointer" value="b1">b1</option>
              <option class="cursor-pointer" value="c1">c1</option>
            </select>
          </div>
        </div>
        <div class="input-group">
          <label>Minimum Language Score Required</label>
          <input type="text" placeholder="------------" v-model="listService.minimum_language_score"
            @keypress="restrictToNumbers">
        </div>
      </div>
      <div class=" grid-2 d-flex justify-content-start gap-40 align-items-center flex-wrap">
        <div class="form-group ">
          <label>Financial Sponsorship Required?</label>
          <div class="radio-group">
            <label><input class="cursor-pointer" type="radio" name="sponsor" value=true
                v-model="listService.finanicial_sponsorship" required>
              Yes</label>
            <label><input class="cursor-pointer" type="radio" name="sponsor" value=false
                v-model="listService.finanicial_sponsorship" required>
              No</label>
          </div>
        </div>
        <div class="form-group ">
          <label>Health Insurance Required?</label>
          <div class="radio-group">
            <label><input class="cursor-pointer" type="radio" name="insurance" value=true
                v-model="listService.healh_insurance"> Yes</label>
            <label><input class="cursor-pointer" type="radio" name="insurance" value=false
                v-model="listService.healh_insurance"> No</label>
          </div>
        </div>
        <div class="form-group ">
          <label>Visa Sponsor Required?</label>
          <div class="radio-group">
            <label><input class="cursor-pointer" type="radio" name="visa" value=true v-model="listService.visa_sponsor">
              Yes</label>
            <label><input class="cursor-pointer" type="radio" name="visa" value=false
                v-model="listService.visa_sponsor"> No</label>
          </div>
        </div>
      </div>

    </div>

  </div>
  <div>
    <div class="testimonial-section mt-4">
      <div class="testimonials-header ">
        <div class="toggle-container">
          <label class="switch">
            <input type="checkbox" v-model="listService.testmonial">
            <span class="slider"></span>
          </label>
          <span class="label-text mb-3">Testimonials</span>
        </div>

        <button class="add-button" @click="AddTestimonialOpen = true">+ Add Testimonial</button>
      </div>
      <div v-if="listService.testimonilas.length > 0"
        class="card-container max-W-[350px]  whitespace-nowrap overflow-x-auto">
        <div class="card " v-for="(item, index) in listService.testimonilas">
          <img :src="item.image" alt="Person">
          <div class="card-dropdown" @click="toggleDropdown(index)">&#8942;
          </div>
          <div class="dropdown-menu" v-if="activeDropdownIndex === index">
            <div class=" menu-class d-flex align-items-center gap-[6px]" @click="editdeletetestimonials(item, index)">
              <img src="/public/img/png/edit-study-vector.png" alt=""><button>Edit</button>
            </div>
            <div class=" menu-class d-flex align-items-center gap-[6px]" @click="deletetestimonials(index)"> <img
                src="/public/img/png/trash-vector.png" alt=""><button class="delete">Delete</button></div>
          </div>
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>Study Visa - {{ listService.country }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="testimonial-section mt-4">
      <div class="testimonials-header  ">
        <div class="toggle-container">
          <label class="switch ">
            <input type="checkbox" v-model="listService.media">
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
            <!-- <div class="upload-option" @click="addMediaOpen = false">
              <span class="icon"><i class="bi bi-camera-video"></i></span>
              <span class="text">Upload Videos</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="cards-container max-h-[500px] overflow-y-auto">

        <div class="media-card" v-for="(ele, index) in mediaAllImagePic">

          <img :src="ele.media_url" alt="Uploaded Image" class="uploaded-image" />
          <div class="card-dropdown" @click="MediaDropdownOpen = true">&#8942;
          </div>
          <div class="dropdown-menu" v-if="MediaDropdownOpen">
            <!-- <div class=" menu-class d-flex align-items-center gap-[6px]" @click="MediaDropdownOpen = false">
              <img src="/public/img/png/edit-study-vector.png" alt=""><button>Edit</button>
            </div> -->
            <div class=" menu-class d-flex align-items-center gap-[6px]" @click="MediaDropdownOpen = false"> <img
                src="/public/img/png/trash-vector.png" alt=""><button @click="deletemedia(index)"
                class="delete">Delete</button></div>
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

      <button @click="handleFormSubmit" class="Submit-btn d-flex align-items-center bg-[#ff5757]" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        <span>{{ loading ? 'Submitting...' : 'Submit' }}</span>
        <i class="bi bi-chevron-right ms-2" v-if="!loading"></i>
      </button>

    </div>
  </div>

  <Sidebar v-model:visible="addSidebar" position="right" class="w-[90vw] sm:w-[30rem] md:w-[25rem] lg:w-[30rem]"
    title="CSV Upload Status">
    <div class="upload-container">
      <div>
        <div class="first-section">
          <h2>Upload From Csv</h2>
          <img src="/public/img/png/sidebar-close.png" class="sidebar-close cursor-pointer" @click="addSidebar = false">
        </div>
        <label class=" sidebar-label mt-[50px]">Upload Program CSV File</label>
        <!-- <div class="input-container file-upload-container" > -->
        <label class="custom-upload">
          <input class="upload-box" type="file" accept=".xlsx, .xls,.csv" @change="handleFileUpload" hidden />
          <img src="/public/img/png/upload-vector.png" class="add-icon">
          <span class="placeholder-text">{{ csvFilename || 'Upload CSV File' }}</span>
        </label>
        <button @click="jsonToCsv(defaultSample)" class="sample-download-button mb-5"><img
            src="/public/img/png/eos-icons_csv-file.png" alt="CSV Icon" class="icon">Download Sample Template</button>
        <Accordion v-if="csvdata_success >= 0">
          <AccordionTab class="accordion-heading" header="Upload Summary ">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2 mb-[20px]">
              <span class="accordion-text text-[#676b6c]">Status</span>
              <span class="accordion-text-result text-[#00ACA5]">Success</span>
            </div>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2 mb-[20px]">
              <span class="accordion-text text-[#676b6c]">Total Uploaded Records</span>
              <span class="accordion-text text-[#000000]">{{ csvdata_success + csvdata_failure }}</span>
            </div>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2 mb-[20px]">
              <span class="accordion-text text-[#676b6c]">Success Count</span>
              <span class="accordion-text text-[#000000]">{{ csvdata_success }}</span>
            </div>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2 mb-[20px]">
              <span class="accordion-text text-[#676b6c]">Failed Count</span>
              <span class="accordion-text text-[#000000]">{{ csvdata_failure }}</span>
            </div>
            <!-- <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span class="accordion-text text-[#676b6c]">Uploaded On</span>
              <span class="accordion-text text-[#000000]"></span>
            </div> -->
            <br>
            <!-- <button @click="jsonToCsv(this.csvData.csv_data)">Download Uploaded Csv</button> -->
          </AccordionTab>
        </Accordion>
        <button class="sample-download-button" v-if="csvdata_success > 0" @click="save_program"> <img
            src="/public/img/png/eos-icons_csv-file.png" alt="CSV Icon" class="icon">Upload Course</button>
      </div>
    </div>
  </Sidebar>

  <Dialog v-model:visible="infoModals" modal header="Program Details"
    class="popup-container admin-studyvisa-programform" :style="{ padding: '2rem 0rem' }"
    :breakpoints="{ '1199px': '90vw', '575px': '98vw' }">

    <!-- <FormKit type="form" @submit="handleSubmit"> -->
    <div class="form-popup">

      <div class="form-sec">

        <div class="input-group">
          <label class="required">Program Field</label>

          <div class="select-option">
            <select class="custom-select cursor-pointer" v-model="program.program_type">
              <option class="cursor-pointer" v-for="(item, index) in listService.program_category" :key="index"
                :value="item">{{ item }}
              </option>
            </select>
          </div>
        </div>
        <div class="grid mt-3">
          <div class="input-group">
            <label class="required">Campus Location</label>

            <div class="select-option">
              <select class="custom-select cursor-pointer" v-model="program.campus_location">
                <option class="cursor-pointer" v-for="(item, index) in listService.location" :key="index" :value="item">
                  {{ item }}</option>
              </select>
            </div>
          </div>
          <div class="input-group">
            <label class="required">Study Level</label>
            <div class="select-option">
              <select class="custom-select cursor-pointer" v-model="program.study_level">
                <option value="a" class="cursor-pointer cursor-pointer">a</option>
                <option vlaue="b" class="cursor-pointer cursor-pointer">b</option>
              </select>
            </div>
          </div>
          <div class="input-group">
            <label class="required">Program Name</label>
            <input type="text" placeholder="------------" v-model="program.program_name">
          </div>
          <div class="input-group">
            <label class="required">Duration of Study</label>
            <input type="text" placeholder="------------" v-model="program.duration_of_study">
          </div>
          <div class="input-group">
            <label class="required">Course Start Date</label>

            <input id="startMonthYear" type="month" v-model="program.course_start_date" class="update-event-dte"
              @change="validateDates" />

            <!-- <FormKit type="datetime-local" class="update-event-dte" name="start_date_Time"
                v-model="program.course_start_date" @change="validateDates"
                style="padding: 1.25rem 1.5rem; border: 1.19px solid #D5D2DC; border-radius: 10px; " /> -->
          </div>
          <div class="input-group">
            <label class="required">Course End Date</label>
            <input id="startMonthYear" type="month" v-model="program.course_end_date" class="update-event-dte"
              @change="validateDates" />


          </div>
          <div class="input-group">
            <label class="required">Application Deadline</label>
            <FormKit type="datetime-local" class="update-event-dte" name="application_deadline"
              v-model="program.application_deadline"
              style="padding: 1.25rem 1.5rem !important; border: 1.19px solid #D5D2DC;  border-radius: 10px; " />



          </div>
          <div class="input-grou">
            <label class="required">Application Fee</label>
             <div class="flex border-[1px] border-[#D5D2DC] rounded-[10px]  py-[6px]">
              <select v-model="application_fee_currency" class="px-[19px] outline-none border-0  py-[10px] w-[70px] ">
                <option value="" disabled>Select Currency</option>
                <option value="$">$</option>
                <option value="₹">₹</option>
              </select>
             <span class="border-r-[1px] ml-2 rounded-0 border-l-[0px] border-y-[0px]"></span>
              <input type="text" class=" border-0   outline-none" placeholder="------------" v-model="program.application_fee" inputmode="numeric"
                pattern="\d{6,}" @input="onlyDigits($event, 'fee')">
                </div>

          </div>
          <div class="input-group">
            <label class="required">Mode of Study</label>
            <div class="select-option">
              <select class="custom-select cursor-pointer" v-model="program.mode_of_study">
                <option class="cursor-pointer" vlaue="online">Online</option>
                <option class="cursor-pointer" vlaue="offline">Offline</option>
              </select>
            </div>
          </div>


          <div class="input-grou">
            <label class="required">Annual Tuition Fees</label>
            <div class="flex border-[1px] border-[#D5D2DC] rounded-[10px]  py-[6px]">
              <select v-model="annual_tution_fee_currency" class="px-[19px] outline-none border-0  py-[10px] w-[70px] ">
                <option value="" disabled>Select Currency</option>
                <option value="$">$</option>
                <option value="₹">₹</option>
              </select>
        <span class="border-r-[1px] ml-2 rounded-0 border-l-[0px] border-y-[0px]"></span>
              <input type="text" class=" border-0   outline-none" placeholder="------------" v-model="program.annual_tution_fee" required
                inputmode="numeric" pattern="\d{6,}" @input="onlyDigits($event, 'tution_fee')">
            </div>
          </div>
        </div>


        <div class="input-group">
          <label class="required">Intakes Months</label>
          <div class="input-container ">
            <input type="text" id="location" class="location-input" placeholder="Press Enter to add intakes months"
              v-model="program_intakes_months" @keyup.enter.prevent.stop="addIntakeMonth" />
            <img @click="addIntakeMonth" src="/public/img/png/plus-red.png" class="add-icon">

          </div>
        </div>

        <div class="tags-container">
          <div v-if="intakes_months.length > 0" v-for="(item, inx) in intakes_months" class="tag">
            {{ item }}
            <img @click="removeIntakeMonth(inx)" src="/public/img/png/cross-vector.png">
          </div>

        </div>

        <div class="input-gp">
          <div>
            <label class="required">Description</label>
          </div>
          <div class="study-visa-description-block">
            <QuillEditor v-model="program.program_description" :modules="modules" ref="qPro_html" class="mb-4"
              style="height:200px" />
            <p v-if="validationErrors.overview" class="!text-red-500 text-sm mt-1">
              {{ validationErrors.overview }}
            </p>
          </div>

        </div>
        <div class="d-flex justify-content-between gap-[30px] align-items-center flex-wrap ">
          <div class="form-group ">
            <label>Scholarships Available?</label>
            <div class="radio-group">
              <label><input class="cursor-pointer" type="radio" value="true" name="sponsor"
                  v-model="program.scholarships_available">
                Yes</label>
              <label><input class="cursor-pointer" type="radio" value="false" name="sponsor"
                  v-model="program.scholarships_available">
                No</label>
            </div>
          </div>
          <div class="form-group ">
            <label>Internship/Co-op Program Included?</label>
            <div class="radio-group">
              <label><input class="cursor-pointer" type="radio" value="true" name="insurance"
                  v-model="program.internship_include">
                Yes</label>
              <label><input class="cursor-pointer" type="radio" value="false" name="insurance"
                  v-model="program.internship_include">
                No</label>
            </div>
          </div>
          <div class="form-group ">
            <label>Post-Study Work Permit Eligibility?</label>
            <div class="radio-group">
              <label><input class="cursor-pointer" type="radio" value="true" name="visa"
                  v-model="program.permit_eligibility">
                Yes</label>
              <label><input class="cursor-pointer" type="radio" value="false" name="visa"
                  v-model="program.permit_eligibility">
                No</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-right mt-4">
      <button @click="() => programsupdate ? handleupdate() : handleSubmit()" type="submit" class="btn btn-primary">
        Submit<i class="bi bi-chevron-right"></i></button>
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
      <Button label="Upload" icon="pi pi-save" :loading="loading" @click="icon_uploadImage" class="cropper-upload" />
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
      <Button label="Upload" icon="pi pi-save" :loading="loading" @click="icon_uploadImage" class="cropper-upload" />
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
                      <p class="required">Achievers Name</p>
                    </span>
                  </div>
                  <div class="update-events-1stdrop">
                    <FormKit v-model="achievers.title" validation="required" id="update-event-selet" type="text"
                      placeholder="---------" name="title" />
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
                  <QuillEditor :key="editorKey" :modules="modules" toolbar="full" ref="testimonialhtml" class="mb-2"
                    v-model="achievers.description" />
                    <p v-if="descriptionError" class="!text-[#ff0000] description-error text-xs  mt-[-5px] mb-5">  {{ descriptionError }}
                                             </p>
                  <!-- <FormKit validation="required" type="textarea" class="text-arr" name="description" /> -->
                </div>
              </div>
            </div>

            <div v-if="achievers.image" class="update-events-right col-lg-4">
              <div class="update-event-right-wrap">
                <div v-if="achievers.image" id="update-img-addevt">
                  <label class="labelclass1" data-kt-image-input-action="change"
                    :style="'background-image:url(' + achievers.image + ')'">
                    <input ref="icon_imageInput" id="icon_imageInput" type="file" accept="image/*" style="display: none"
                      @change="handleTestimonialsChange" />
                    <FormKit validation="required" name="cover_image" type="text" v-model="achievers.image" id="icon"
                      hidden validation-label="Achievers image" />
                  </label>
                </div>
              </div>
              <!-- Error Message -->
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
                    <input ref="icon_imageInput" id="icon_imageInput" type="file" accept="image/*" style="display: none"
                      @change="handleTestimonialsChange" />
                    <FormKit validation="required" name="icon" type="text" v-model="achievers.image" id="icon" hidden
                      validation-label="Achievers image" />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="update-event-btn mt-[90px]">
            <Button class="update-event-change mt-3" type="submit"
              :label="testimonilasupdate ? 'Update Achievement' : 'Add Achievement'" icon="pi pi-save" />

            <!-- <NuxtLink to="/admin/study-form"><button type="button" class="update-event-goback">Go back</button></NuxtLink> -->
          </div>
        </FormKit>
      </div>
    </div>
  </Dialog>


  <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{ 'min-width': '350px' }">
    <div data-kt-element="sms">
      <div class="icon_cropper-container">
        <div v-if="icon_showCropper" class="icon_cropper-modal">
          <cropper :src="icon_selectedImage" @change="icon_updateCroppedData" :stencil-props="{ aspectRatio: 1 / 2 }" />
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
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

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
      csvFilename: '',
      loading: false,
         descriptionError: '',
      data: [],
      csvData: null,
      addSidebar: false,
      infoModals: false,
      upoadSidebar: false,
      TestimonialDropdownOpen: false,
      MediaDropdownOpen: false,
      addMediaOpen: false,
      CustomTabOpen: false,
      customtabcount: 0,
      AddTestimonialOpen: false,
      csvData: [],
      addProgramDropdown: false,
      customTabClicks: [],
      csvHeaders: [],
      cropImage: false,
      id: '123',
       living_expenses_currency:null,
      application_fee_currency:null,
      annual_tution_fee_currency:null,
      icon_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      defaultSample: [
        {
          campus_location: "Toronto",
          study_level: "Undergraduate",
          program_name: "Computer Science",
          duration_of_study: "4 Years",
          course_start_date: "2025-09-01",
          course_end_date: "2029-06-30",
          application_deadline: "2025-06-01",
          application_fee: 100,
          mode_of_study: "On-Campus",
          annual_tution_fee: 20000,
          intake_month: "September,jan,sep-dec",
          scholarships_available: true,
          internship_included: true,
          permit_eligibility: true,
          program_type: "online",
          program_description: "write here your program description."
        },
        {
          campus_location: "Vancouver",
          study_level: "Postgraduate",
          program_name: "MBA",
          duration_of_study: "2 Years",
          course_start_date: "2025-01-10",
          course_end_date: "2026-12-15",
          application_deadline: "2024-11-30",
          application_fee: 120,
          mode_of_study: "On-Campus",
          annual_tution_fee: 25000,
          intake_month: "January",
          scholarships_available: false,
          internship_included: true,
          permit_eligibility: true,
          program_type: "online",
          program_description: "write here your program description."
        },
        {
          campus_location: "Montreal",
          study_level: "Diploma",
          program_name: "Graphic Design",
          duration_of_study: "1 Year",
          course_start_date: "2025-05-15",
          course_end_date: "2026-05-14",
          application_deadline: "2025-03-01",
          application_fee: 80,
          mode_of_study: "Online",
          annual_tution_fee: 10000,
          intake_month: "May",
          scholarships_available: true,
          internship_included: false,
          permit_eligibility: false,
          program_type: "online",
          program_description: "write here your program description."
        },
        {
          campus_location: "Calgary",
          study_level: "Certificate",
          program_name: "Project Management",
          duration_of_study: "6 Months",
          course_start_date: "2025-07-01",
          course_end_date: "2025-12-31",
          application_deadline: "2025-05-15",
          application_fee: 50,
          mode_of_study: "Hybrid",
          annual_tution_fee: 6000,
          intake_month: "July",
          scholarships_available: false,
          internship_included: false,
          permit_eligibility: true,
          program_type: "online",
          program_description: "write here your program description."
        },
        {
          campus_location: "Ottawa",
          study_level: "Undergraduate",
          program_name: "Project Management",
          duration_of_study: "4 Years",
          course_start_date: "2025-09-01",
          course_end_date: "2029-06-30",
          application_deadline: "2025-06-01",
          application_fee: 110,
          mode_of_study: "On-Campus",
          annual_tution_fee: 22000,
          intake_month: "September",
          scholarships_available: true,
          internship_included: true,
          permit_eligibility: true,
          program_type: "online",
          program_description: "write here your program description."
        }
      ],
      icon_url: null,
      icon_selectedImage: null,
      icon_showCropper: true,
      IconModal: false,
      CoverModal: false,
      icon_croppedDataUrl: null,
      listService: {
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
        accommodation_available: false,
        living_expenses: "",
        language_proficiency: "",
        minimum_language_score: "",
        finanicial_sponsorship: false,
        healh_insurance: false,
        visa_sponsor: false,
        college_website_link: "",
        tabs: [],
        media: false,
        media_list: [],
        testmonial: false,
        testimonilas: [],
      },
      program: {
        program_description: "",
        program_type: "",
        campus_location: "",
        study_level: "",
        program_name: "",
        duration_of_study: "",
        course_start_date: "",
        course_end_date: "",
        application_deadline: "",
        application_fee: "",
        mode_of_study: "",
        annual_tution_fee: "",
        intakes_months: "",
        scholarships_available: false,
        internship_include: false,
        permit_eligibility: false,

      },
      program_list: [],
      active_type: "",
      location_name: "",
      program_category_name: "",
      program_intakes_months: "",
      intakes_months: [],
      adminCountries: [],
      validationErrors: {},
      program_validationErrors: {},
      //for csv
      csvdata_success: 0,
      csvdata_failure: 0,
      csv_success_data: [],
      //media
      mediaicon_selectedImage: null,
      mediaicon_showCropper: false,
      mediaIconModal: false,
      mediaicon_croppedDataUrl: null,
      mediaAllImagePic: [],
      //testimonilas
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
      //edit program
      editProgramindex: null,
      programsupdate: false,
    };
  },
  async mounted() {
    activateSubmenu('b3', ' College Study Visa', true);
    this.fetchAdminCountries('Study Visa')
    if (this.$route.query.id) {
      this.listingUpdateView()
      this.achieverview()
    }
  },
  methods: {
    save_program() {
      this.program_list = [...this.program_list, ...this.csv_success_data]
      this.addSidebar = false
    },
    jsonToCsv(json, filename = 'data.csv') {
      const keys = Object.keys(json[0]);

      const escapeValue = (value) => {
        if (typeof value === 'string') {
          // Escape double quotes and wrap with quotes if value contains comma or quote
          value = value.replace(/"/g, '""');
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return `"${value}"`;
          }
        }
        return value;
      };

      const csvData = [
        keys.join(','),
        ...json.map(row =>
          keys.map(key => escapeValue(row[key])).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    openInfoModal() {
      this.addProgramDropdown = false
      if (this.listService.location.length > 0 && this.listService.program_category.length > 0) {
        this.infoModals = true
        if (this.listService.program_category.length === 1) {
          this.program.program_type = this.listService.program_category[0];
        }


        if (this.listService.location.length === 1) {
          this.program.campus_location = this.listService.location[0];
        }

      } else {
        errorAlert("Atleast add one Location and one Program Category")
      }
    },
    openAddSidebar() {
      this.addProgramDropdown = false
      if (this.listService.location.length > 0 && this.listService.program_category.length > 0) {
        this.addSidebar = true;
      } else {
        errorAlert("Atleast add one Location and one Program Category")
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
    restrictToNumbers(event) {
      // Check if the pressed key is not a number (keys: 48-57 are numbers in ASCII)
      const charCode = event.charCode || event.keyCode;

      // Allow numeric characters only (ASCII values for 0-9 are 48-57)
      if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Prevent any non-numeric key from being typed
      }
    },
    validateDates() {
      console.log("Running date validation");
      const start = new Date(this.program.course_start_date);
      const end = new Date(this.program.course_end_date);

      if (start && end && start > end) {
        errorAlert("Start date cannot be after end date"); // Or use alert/toast/message
        this.program.course_end_date = null; // Optionally reset end date
      }
    },
    async submitColleageStudyVisa() {
      console.log(this.listService);
      console.log(this.program_list);
      console.log(this.program);

      if (!this.validateFields()) {
        return;
      }
      this.loading = true
      const list = {
        program_category: this.listService.program_category,
        collegeBrouchure: this.listService.collegeBrochure,
        collegeBrouchure_filename: this.listService.collegeBrouchure_filename,
        location: this.listService.location,
        programs: this.program_list,
        accoummodation_available: this.listService.accommodation_available,
        living_expenss: this.living_expenses_currency + this.listService.living_expenses,
        language_proficiency_requirement: this.listService.language_proficiency,
        language_score: this.listService.minimum_language_score,
        finacial_sponsorship: this.listService.finanicial_sponsorship,
        health_insurance: this.listService.healh_insurance,
        visa_sponsor: this.listService.visa_sponsor,
        college_website_link: this.listService.college_website_link,
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
          title: this.listService.collegeName,
          description: this.$refs.qhtml.getHTML(),
          country: this.listService.country,
          state: this.listService.state,
          pincode: this.listService.pincode,
          cover_image: this.listService.coverImage,
          logo: this.listService.collegeLogo,
          logo_file_name: this.listService.logo_file_name,
          testimonial: this.listService.testmonial,
          media: this.listService.media,
          media_list: this.listService.media_list, // ✅ Now it contains uploaded images
          tabs: this.listService.tabs,
          service_name: "Study Visa",
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
          collegeStudyVisa: list,
          sub_service_name: 'collegeStudyVisa',
          testimonials: this.listService.testimonilas
        };

        console.log("Final Payload:", payload);

        const res = await subadminPost('/admin-study-add', payload);
        if (res.status === true) {
          successAlert("Listing added successfully");
          this.resetForm();
          this.$router.push({
            path: '/subadmin/Categories/Study Visa'
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
        const response = await subadminGet(`/admin-study-get-listing/${this.$route.query.id}`);
        const dataview = response.data.data[0];

        this.listService.program_category = dataview.collegeStudyVisa.program_category;
        this.listService.collegeBrochure = dataview.collegeStudyVisa.collegeBrouchure;
        this.listService.collegeBrouchure_filename = dataview.collegeStudyVisa.collegeBrouchure_filename;
        this.listService.location = dataview.collegeStudyVisa.location;
        this.program_list = dataview.collegeStudyVisa.programs;  // since `programs` maps to your `this.program_list`
        this.listService.accommodation_available = dataview.collegeStudyVisa.accoummodation_available;
        // this.listService.living_expenses = dataview.collegeStudyVisa.living_expenss;
        this.living_expenses_currency=dataview.collegeStudyVisa.living_expenss[0]
        this.listService.living_expenses = parseFloat(dataview.collegeStudyVisa.living_expenss.slice(1));
        this.listService.language_proficiency = dataview.collegeStudyVisa.language_proficiency_requirement;
        this.listService.minimum_language_score = dataview.collegeStudyVisa.language_score;
        this.listService.finanicial_sponsorship = dataview.collegeStudyVisa.finacial_sponsorship;
        this.listService.healh_insurance = dataview.collegeStudyVisa.health_insurance;
        this.listService.visa_sponsor = dataview.collegeStudyVisa.visa_sponsor;
        this.listService.college_website_link = dataview.collegeStudyVisa.college_website_link;
        this.listService.collegeName = dataview.title
        this.$refs.qhtml.setHTML(dataview.description)
        this.listService.country = dataview.country
        this.listService.state = dataview.state
        this.listService.pincode = dataview.pincode
        this.listService.coverImage = dataview.cover_image
        this.listService.collegeLogo = dataview.logo
        this.listService.logo_file_name = dataview.logo_file_name
        this.listService.testmonial = dataview.testimonial
        this.listService.media = dataview.media
        this.mediaAllImagePic = dataview.media_list
        this.listService.tabs = dataview.tabs

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
    async submitColleageStudyVisaEdit() {
      if (!this.validateFields()) {
        return;
      }
      this.loading = true;
      const timestamp = Date.now();
      const list = {
        program_category: this.listService.program_category,
        collegeBrouchure: this.listService.collegeBrochure,
        collegeBrouchure_filename: this.listService.collegeBrouchure_filename,
        location: this.listService.location,
        programs: this.program_list,
        accoummodation_available: this.listService.accommodation_available,
        // living_expenss: this.listService.living_expenses,
          living_expenss: this.living_expenses_currency+this.listService.living_expenses,
        language_proficiency_requirement: this.listService.language_proficiency,
        language_score: this.listService.minimum_language_score,
        finacial_sponsorship: this.listService.finanicial_sponsorship,
        health_insurance: this.listService.healh_insurance,
        visa_sponsor: this.listService.visa_sponsor,
        college_website_link: this.listService.college_website_link,
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
          title: this.listService.collegeName,
          description: this.$refs.qhtml.getHTML(),
          country: this.listService.country,
          state: this.listService.state,
          pincode: this.listService.pincode,
          cover_image: this.listService.coverImage,
          logo: this.listService.collegeLogo,
          logo_file_name: this.listService.logo_file_name,
          testimonial: this.listService.testmonial,
          media: this.listService.media,
          // ✅ Now it contains uploaded images
          tabs: this.listService.tabs,
          service_name: "Study Visa",
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
          collegeStudyVisa: list,
          sub_service_name: 'collegeStudyVisa',
          testimonials: this.listService.testimonilas,
          media_list: this.listService.media_list,
        };

        const res = await subadminPut(`/admin-study-update/${this.$route.query.id}`, payload);

        if (res.status === true) {
          successAlert("Listing updated successfully");
          this.resetForm();
          this.$router.push({
            path: '/subadmin/Categories/Study Visa'
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
    errorAlert("Please complete or remove all custom tabs before submitting.");
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
       this.living_expenses_currency=null
    },
    validateForm() {
      this.program_validationErrors = {};
      if (!this.program.program_type) this.program_validationErrors.program_type = 'Program type is required';
      if (!this.program.campus_location) this.program_validationErrors.campus_location = 'Campus location is required';
      if (!this.program.study_level) this.program_validationErrors.study_level = 'Study level is required';
      if (!this.program.program_name) this.program_validationErrors.program_name = 'Program name is required';
      if (!this.program.duration_of_study) this.program_validationErrors.duration_of_study = 'Duration is required';
      if (!this.program.course_start_date) this.program_validationErrors.course_start_date = 'Start date is required';
      if (!this.program.course_end_date) this.program_validationErrors.course_end_date = 'End date is required';
      if (!this.program.application_deadline) this.program_validationErrors.application_deadline = 'Deadline is required';
      if (!this.program.application_fee) this.program_validationErrors.application_fee = 'Application fee is required';
      if (!this.program.mode_of_study) this.program_validationErrors.mode_of_study = 'Mode of study is required';
      if (!this.program.annual_tution_fee) this.program_validationErrors.annual_tution_fee = 'Tuition fee is required';

      if (Object.keys(this.program_validationErrors).length > 0) {
        const errorMessages = Object.values(this.program_validationErrors).join('\n\n');
        errorAlert(`Please fill the following deatils:\n\n${errorMessages}`);
        setTimeout(() => {
          this.program_validationErrors = {};
        }, 4000);
        return false;
      }

      return true;
    },
    handleSubmit() {
      console.log("handlesubmit program")
      if (this.validateForm()) {
        // console.log("program data program", this.program)
         // return console.log("program data program", this.program)
        const start = new Date(this.program.course_start_date);
        const end = new Date(this.program.course_end_date);

        if (start > end) {
          errorAlert("Start date must be before End date");
          return;
        }
         this.program.annual_tution_fee=this.annual_tution_fee_currency+this.program.annual_tution_fee
        this.program.application_fee=this.application_fee_currency+this.program.application_fee
        this.program.intakes_months = this.intakes_months;
        this.program.program_description = this.$refs.qPro_html.getHTML()
        this.program_list.push(this.program)
        this.resetProgram()
        this.intakes_months = []
        this.infoModals = false
      }
    },
    resetProgram() {
      this.program = {
        program_type: '',
        campus_location: '',
        study_level: '',
        program_name: '',
        duration_of_study: '',
        course_start_date: '',
        course_end_date: '',
        application_deadline: '',
        application_fee: '',
        mode_of_study: '',
        annual_tution_fee: '',
        intakes_months: '',
        scholarships_available: false,
        internship_include: false,
        permit_eligibility: false,
      };
this.annual_tution_fee_currency=null,
      this.application_fee_currency=null
    },
    validateFields() {
      this.validationErrors = {};
      if (!this.listService.coverImage) {
        this.validationErrors.coverImage = 'Cover Image is required.';
      }
      if (!this.listService.collegeLogo) {
        this.validationErrors.collegeLogo = 'College Logo is required.';
      }
      if (!this.listService.collegeName) {
        this.validationErrors.collegeName = 'College Name is required.';
      }
      if (this.listService.college_website_link) {
        const urlPattern = new RegExp(
          '^(https?:\\/\\/)?' +
          '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})' +
          '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' +
          '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' +
          '(\\#[-a-zA-Z\\d_]*)?$', 'i'
        );

        if (!urlPattern.test(this.listService.college_website_link)) {
          this.validationErrors.college_website_link = 'Please enter a valid Website URL.';
        }
      }

      if (!this.listService.location) {
        this.validationErrors.location = 'Address is required.';
      }
      if (!this.listService.country) {
        this.validationErrors.country = 'Country is required.';
      }
      if (!this.listService.state) {
        this.validationErrors.state = 'State is required.';
      }

      if (!this.listService.pincode) {
        this.validationErrors.pincode = 'Pincode is required.';
      }
      const overviewContent = this.$refs.qhtml.getHTML()?.trim();
      const plainText = this.stripHtml(overviewContent);
      const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;

      if (!overviewContent || overviewContent === '<p><br></p>') {
        this.validationErrors.overview = 'Description is required.';
      } else if (wordCount < 30) {
        this.validationErrors.overview = 'Description must be at least 30 words.';
      }

      if (Object.keys(this.validationErrors).length > 0) {
        const errorMessages = Object.values(this.validationErrors).join('\n\n');

        // Show an alert or use a custom popup modal
        errorAlert(`Please fill the following details:\n\n${errorMessages}`);
        setTimeout(() => {
          this.validationErrors = {};
        }, 4000);
      }
      return Object.keys(this.validationErrors).length === 0;
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
        const response = await subadminGet(`/admin-company-country-providing-service/${category_name}`);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching subadminCountries list:', error);
      }
    },
    async submitForm(v) {
      v.image = this.icon_url
      v.country = this.country
      v.description = this.$refs.qhtml.getHTML()

      await subadminPost(`/company-achievers`, v)
        .then(response => {
          successAlert("Achievers added successfully")
          this.$router.go(-1);
        }).catch(async (error) => {
          await serverErrorMessage(() => this.submitForm(v))
        })

    },

    edit_program(item, index) {
 this.application_fee_currency=item.application_fee[0]
      this.annual_tution_fee_currency=item.annual_tution_fee[0]
      this.program.program_type = item.program_type;
      this.program.campus_location = item.campus_location;
      this.program.study_level = item.study_level;
      this.program.program_name = item.program_name;
      this.program.duration_of_study = item.duration_of_study;
      this.program.course_start_date = item.course_start_date;
      this.program.course_end_date = item.course_end_date;
      this.program.application_deadline = item.application_deadline;
      // this.program.application_fee = item.application_fee;
      this.program.application_fee = parseFloat(item.application_fee.slice(1))
      this.program.mode_of_study = item.mode_of_study;
      this.program.annual_tution_fee = item.annual_tution_fee;
      this.program.annual_tution_fee = parseFloat(item.annual_tution_fee.slice(1));
      this.program.intakes_months = item.intakes_months;
      this.intakes_months = item.intakes_months
      this.program.scholarships_available = item.scholarships_available;
      this.program.internship_include = item.internship_include;
      this.program.permit_eligibility = item.permit_eligibility;

      this.infoModals = true
      this.editProgramindex = index
      this.programsupdate = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.program.program_description = item.program_description;

          const quill = this.$refs.qPro_html?.getQuill();
          if (quill) {
            quill.root.innerHTML = item.program_description || '';
          }
        }, 100);
      });
    },
    handleupdate() {

      this.program.description = this.$refs.qPro_html.getHTML()
      this.program_list.splice(this.editProgramindex, 1, this.program),
        this.programsupdate = false
      this.editProgramindex = null
      this.infoModals = false
      this.resetProgram()
    },
    delete_program(index) {
      this.program_list.splice(index, 1)
    },
    handleImageChange(event, type_image) {
      console.log("working")
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      if (type_image == 'cover') {
        this.IconModal = true
      }
      if (type_image == 'logo') {
        this.CoverModal = true
      }
      const icon_selectedFile = event.target.files[0];
      console.log("filename", icon_selectedFile.name)
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        console.log(this.icon_selectedImage)
        this.icon_showCropper = true;
        if (type_image == "cover") {
          console.log("cover", this.active_type)
          this.active_type = 'cover'
        } if (type_image == "logo") {
          this.active_type = 'logo'
          this.listService.logo_file_name = icon_selectedFile.name
          console.log("logo", this.active_type)
        }
      }
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
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
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
          // this.program_list = [...this.program_list, ...data]
        };

        reader.readAsText(file);
      } else {
        console.log('Please upload a valid CSV file.');
      }
    },
    // parseCSV(csvText) {
    //   const lines = csvText.trim().split(/\r\n|\n|\r/);
    //   const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    //   const requiredFields = ['program_type', 'program_name', 'mode_of_study', 'annual_tution_fee', 'course_start_date'];
    //   const missingHeaders = requiredFields.filter(field => !headers.includes(field));

    //   if (missingHeaders.length > 0) {
    //     return {
    //       error: `Missing required headers: ${missingHeaders.join(', ')}`,
    //       successList: [],
    //       failureList: [],
    //       counts: { success: 0, failure: 0 }
    //     };
    //   }

    //   const successList = [];
    //   const failureList = [];

    //   for (let i = 1; i < lines.length; i++) {
    //     const line = lines[i].trim();
    //     if (!line) continue;

    //     // ✅ Use regex to correctly split by commas outside quotes
    //     const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];

    //     const obj = {};
    //     headers.forEach((header, index) => {
    //       let value = values[index] ? values[index].replace(/^"|"$/g, '') : '';
    //       if (header === 'intake_month') {
    //         obj[header] = value.includes(',') ? value.split(',').map(v => v.trim()) : [value];
    //       } else {
    //         obj[header] = value;
    //       }
    //     });

    //     const isValid = requiredFields.every(field => obj[field] && obj[field].trim() !== '');

    //     if (isValid) successList.push(obj);
    //     else failureList.push(obj);
    //   }

    //   return {
    //     successList,
    //     failureList,
    //     counts: {
    //       success: successList.length,
    //       failure: failureList.length
    //     }
    //   };
    // },

    parseCSV(csvText) {
      const lines = csvText.trim().split(/\r\n|\n|\r/);
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

      const requiredFields = ['program_type', 'program_name', 'mode_of_study', 'annual_tution_fee', 'course_start_date', 'campus_location'];
      const missingHeaders = requiredFields.filter(field => !headers.includes(field));

      if (missingHeaders.length > 0) {
        return {
          error: `Missing required headers: ${missingHeaders.join(', ')}`,
          successList: [],
          failureList: [],
          counts: { success: 0, failure: 0 }
        };
      }

      const successList = [];
      const failureList = [];
      console.log("abc", this.listService.location, this.listService.program_category)
      console.log("line", lines)

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];

        const obj = {};
        headers.forEach((header, index) => {
          let value = values[index] ? values[index].replace(/^"|"$/g, '') : '';
          if (header === 'intake_month') {
            obj[header] = value.includes(',') ? value.split(',').map(v => v.trim()) : [value];
          } else {
            obj[header] = value;
          }
        });

        // Required field check
        const hasRequiredFields = requiredFields.every(field => obj[field] && obj[field].trim() !== '');

        // 🔍 Custom filter check
        const isLocationValid = this.listService.location.includes(obj.campus_location);
        const isProgramTypeValid = this.listService.program_category.includes(obj.program_type);
        console.log({ "obj.location": obj.location, "obj.program_type": obj.program_type })
        const isValid = hasRequiredFields && isLocationValid && isProgramTypeValid;

        if (isValid) successList.push(obj);
        else failureList.push(obj);
      }

      return {
        successList,
        failureList,
        counts: {
          success: successList.length,
          failure: failureList.length
        }
      };
    },


    addLocation() {
      console.log("location", this.location_name)
      if (this.location_name.length == 0) {
        return errorAlert("Add location!")
      }
      this.listService.location.push(this.location_name)
      this.location_name = ""
      console.log(this.listService.location)
    },
    addProgramCategory() {
      if (!this.program_category_name.trim()) {
        return errorAlert("Add program!");
      }

      const categories = this.program_category_name
        .split(',')
        .map(cat => cat.trim())
        .filter(cat => cat.length > 0);


      categories.forEach(cat => {
        if (!this.listService.program_category.includes(cat)) {
          this.listService.program_category.push(cat);
        }
      });


      this.program_category_name = "";
    },
    addIntakeMonth() {
      console.log("Edf", this.program_intakes_months)
      if (this.program_intakes_months == 0) {
        return errorAlert("Add intakes_months!")
      }

      console.log("abc", this.intakes_months)
      this.intakes_months.push(this.program_intakes_months)
      this.program_intakes_months = ""

    },
    handleEnter(event) {
      event.preventDefault();
      event.stopPropagation();
      this.addIntakeMonth();
    },
    removelocation(i) {
      this.listService.location.splice(i, 1)
    },
    removeProgram(i) {
      this.listService.program_category.splice(i, 1)
    },
    removeIntakeMonth(i) {
      this.intakes_months.splice(i, 1)
    },
    //customtab
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

    handleCustomTabDelete(index) {
      this.listService.tabs.splice(index, 1);
    },
    //media
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
      }
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


    //testimonial

    handleTestimonialsChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
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

      console.log("ankita", this.achievers)
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
        description: '', // Clear for now
      };

      this.AddTestimonialOpen = true;
      this.testimonilasupdate = true
      this.edittestiminlaindex = index
      this.$nextTick(() => {
        setTimeout(() => {
          this.achievers.description = data.description;

          // Set HTML content directly if Quill instance exists
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
        
        // Prevent form submission
        return;
    } else {
        this.descriptionError = '';
    }

    // Continue only if all required fields are valid
    if (this.testimonilasupdate) {
        this.updatetestimonial();
    } else {
        this.testimonialsubmitForm();
    }
},
    // handleTestimonilasSubmit() {
    //    const descriptionText = this.$refs.testimonialhtml.getText();
    // if (!descriptionText) {
        
    //     this.descriptionError = 'Description is required.';
    //     console.log("hello")
    //     return;
    // } {
    //     this.descriptionError = '';
    // }
    //   if (this.testimonilasupdate) {
    //     this.updatetestimonial();
    //   } else {
    //     this.testimonialsubmitForm();
    //   }
    // },
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

.required:after {
  content: " *";
  color: red;
}
</style>