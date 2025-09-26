<!-- <template>
<div class="space-y-6 border-t-[2px] border-[#ededed] ">
      <div class="mt-4">
        <h3 class="text-lg font-semibold mb-1">Contact List Name</h3>
        <p class="text-[#676B6C] text-[16px] mb-3">Lorem ipsum dolor sit amet consectetur. Lectus diam tempor turpis varius pellentesque.</p>
        <input
          v-model="contactListName"
          type="text"
          placeholder="contact list name"
          class="w-full border border-[#E5E5EA] rounded-[9px] px-4 py-3 text-sm text-[#3A3A3C] outline-none"/>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-1">Add Tags</h3>
        <p class="text-[#676B6C] text-[16px] mb-3">Lorem ipsum dolor sit amet consectetur. Egestas quam feugiat egestas augue felis donec.</p>
        <div class="input-container  ">
        <input type="text" id="location" class="location-input border border-[#E5E5EA]" placeholder="Press Enter to add tag"
          v-model="newTag" @keyup.enter="addTag" />
        <img @click="addTag" src="/public/img/png/plus-red.png" class="add-icon">
       
      </div>
    </div>
    <div class="tags-container">
      <div  v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag }}
        <img @click="removeTag(index)" src="/public/img/png/cross-vector.png">
      </div>

      </div>

      <div>
        <h3 class="text-lg font-semibold mb-1">Contacts</h3>
        <p class="text-[#676B6C] text-[16px] mb-3">Supported File Types: CSV</p>
        <div
          class="relative border border-[#E5E5Ea] rounded-[8px] px-4 py-3 text-sm text-[#3A3A3C] pr-10 cursor-pointer"
          @click="$refs.fileInput.click()"
        >
          <span class="text-[#9CA3AF] ">{{ selectedFile ? selectedFile.name : 'upload from csv' }}</span>
       
          <input
  ref="fileInput"
  type="file"
  hidden
  accept=".csv"
  @change="handleFileUpload"
/>
          <i class="bi bi-upload absolute top-1/2 right-4 -translate-y-1/2 text-lg text-[#9CA3AF]"></i>
        </div>
      </div>

      <div class="flex justify-start pt-4">
        <button
          @click="createContactList"
          class="bg-[#FF5757] text-white text-[15px] font-semibold py-[12px] px-[24px] rounded-full flex items-center gap-2"
        >
          <i class="bi bi-plus-circle"></i> Create Contact List
        </button>
      </div>
    </div> -->







    <!-- <Sidebar v-model:visible="showSidebar" modal position="right"  class="w-[33rem] h-full overflow-y-auto   sm:w-[32rem] md:w-[37rem] lg:w-[39rem] xl:w-[34rem]">
    <div>
        <div class=" py-[50px] px-3 md:px-[40px] bg-white overflow-y-auto ">
     
       <div class="flex justify-between items-center mb-4">
          <h2 class="text-[30px] text-[#1F1B2D] font-medium">Upload From CSV</h2>
          <button @click="showSidebar = false" class="text-[#d8d8d8] text-[39px]">&times;</button>
        </div>
<div class=" mt-5 input-group">
          <label>Upload Lead CSV File</label>
          <label class="brochure_upload-box cursor-pointer ">
            <span class="placeholder-text">--------------</span>
            <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />

            <input type="file" id="logo-upload" accept=".csv"  hidden required />

          </label>
        </div>
        <div class=" mt-1 input-group">
          <label>Contact List Name</label>
          <label class="brochure_upload-box cursor-pointer ">
            <span class="placeholder-text">--------------</span>
            <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />

            <input type="file" id="logo-upload"  hidden required />

          </label>
        </div>
        <div class="toggle-container  mb-3">
          <label class="switch mt-1 ">
            <input type="checkbox" v-model="autoMerge">
            <span class="slider "></span>
          </label>
          <span class="text-[20px] text-[#3C3C3C] ">Auto Merge Duplicate Leads</span>
        </div>
   

      
      <button
        class="flex items-center justify-center gap-2 w-full bg-[#FF57571A] text-[#Ff5757]  text-[19px] px-[16px] py-[18px] rounded-[10px] mb-5"
      >
        <i class="bi bi-filetype-csv"></i> Download Sample Template
      </button>

     
      <div class=" overflow-hidden   mb-4">
        <button
          class="w-full px-4 py-3 flex justify-between items-center text-[21px] text-[#0F172A] font-medium rounded-[16px] border-[1.53px] border-[#CBD5E1] font-medium"
          @click="toggleSummary"
        >
          Upload Summary
          <i class="pi" :class="showSummary ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
        </button>

        <div v-if="showSummary" class="bg-white mt-3 px-1 pb-4 text-[21px] ">
          <div class="flex justify-between mb-3">
            <span class="text-[#676B6C]">Status</span>
            <span class="text-[#00ACA5] font-semibold">SUCCESS</span>
          </div>
          <div class="flex justify-between mb-3">
            <span class="text-[#676B6C]">Total Uploaded Records</span>
            <span>232</span>
          </div>
          <div class="flex justify-between mb-3">
            <span class="text-[#676B6C]">Success Count</span>
            <span class="text-[#000000]">220</span>
          </div>
          <div class="flex justify-between mb-3">
            <span class="text-[#676B6C]">Failed Count</span>
            <span class="text-[#000000]">12</span>
          </div>
          <div class="flex justify-between mb-4">
            <span class="text-[#676B6C]">Uploaded On</span>
            <span class="text-[#000000]">Mar 1, 2024, 2:30 AM</span>
          </div>

       
          <button
            class="flex items-center justify-center w-full bg-gray-100 text-[#3c3c3c] text-[19px] px-[16px] py-[18px] rounded-[10px]"
          >
            <i class="bi bi-filetype-csv"></i> Download Uploaded CSV
          </button>
        </div>
      </div>


      <button
        class="w-full bg-[#Ff5757]  text-[19px] text-white font-medium py-[18px] rounded-[18px] mt-3"
      @click="Proceed">
        PROCEED
      </button>
    </div>
    </div>
  </Sidebar> -->

    <!-- </template> -->
    <script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
import List from '.././List/index.vue';
export default {
  components:{
List
  },
 
  data() {
    return {
         SingleContact:false,
         showSidebar:false,
          isOpen: false,
      autoMerge: true,
      showSummary: true,
       visible: false,
      contactListName: '',
     showList: false,
      tags: [],
      newTag: '',
      selectedFile: null,
     
    }
  },
  methods: {

    addTag() {
      const trimmed = this.newTag.trim()
      if (trimmed && !this.tags.includes(trimmed)) {
        this.tags.push(trimmed)
        this.newTag = ''
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    // handleFileUpload(event) {
    //   const file = event.target.files[0]
    //   if (file) this.selectedFile = file
    // },


    handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target.result;
      const rows = csvText.split('\n').map(row => row.split(','));

      const dataRows = rows.filter(row => row.length > 1);

      const parsedRows = dataRows.map(row => {
        const [name, email, mobile, userType] = row.map(cell => cell.trim());
        return {
          name: name || '-',
          email: email || '-',
          mobile: mobile || '-',
          userType: userType || '-',
          group: true, // this marks it came from Add Contact List dialog
        };
      });

      // Emit parsed rows to parent
      this.$emit('created', parsedRows);
      this.$emit('close'); // close dialog
    };
    reader.readAsText(file);
  },
    // createContactList() {
    //     //   this.$emit('close');
   
    //     // this.showList = true;
    //     const newGroup = {
    //   name: this.contactListName || 'Unnamed Group',
    //   email: '',         // groups may not have email
    //   mobile: '',        // groups may not have phone
    //   userType: '',      // groups may not have userType
    //   group: true,       // 🚨 important: mark this as group
    // };
    // this.$emit('created', newGroup);  // send to parent
    // this.$emit('close');   
    // },

   
  }
}
</script>
<style scoped>
  
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
  .location-input {
    font-size: 16px;
    color: #3A3A3C;
  }

    .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
    margin-bottom: 18px;
  }
  
  .tag {
    background: #3C3C3C1A;
    border-radius: 999px;
    padding: 9px 17px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: #3C3C3C;
    gap: 8px;
  }
  
  .tag .remove-icon {
    margin-left: 10px;
    cursor: pointer;
    font-size: 13px;
    color: #555;
  }
  
  .tag .remove-icon:hover {
    color: #000;
  }
   .add-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #f44336;
    cursor: pointer;
  }
   .input-container {
    position: relative;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }

</style>
