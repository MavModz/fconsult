<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Lead Status</span>
      <span class="cursor-pointer" id="add-btn" @click="addModal = true"><i class="bi bi-plus"
          style="font-size: 1.25rem;"></i> Add</span>
    </div>
    <div class="break-line"></div>
    <div class="flex-container">
      <section>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Status Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="loading">
            <tr v-for="i in 2" :key="i">
              <td v-for="j in 3" :key="j">
                <Skeleton></Skeleton>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(i, index) in fields" :key="i">
              <td>{{ index + 1 }}</td>
              <td>{{ i.statusname }}</td>
              <td>
                <!-- <div class="btn-group">
                  <span class="td-btn" @click="setData(i)">
                    <img src="/img/svg/edit.svg" alt="" />
                  </span>
                  <span class="td-btn" @click="deleteStatus(i._id)">
                    <img src="/img/svg/trash.svg" alt="" />
                  </span>
                </div> -->
                <div class="btn-align-center split-custom-class-recommendations">
                                    <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(i)">
                                    </SplitButton>
                                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class="img-section">
        <img src="/img/png/plan.png" alt="" />
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add New Status" :style="{ 'min-width': '350px' }" :draggable="false">
    <!-- <FormKit type="form" @submit="submitForm">
      <div class="input-field">
        <FormKit validation="required" name="statusname" type="text" placeholder="Tesla Awards" />
      </div>
      <div class="input-field">
        <input v-model="subInput" @keydown="handleSubcategoryKey" type="text" class="formkit-input"
          placeholder="Press Enter to add subcategory" />
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <span v-for="(item, index) in subcategories" :key="index"
          class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center">
          {{ item }}
          <button @click.prevent="removeSubcategory(index)"
            class="ml-2 text-red-600 hover:text-red-800">&times;</button>
        </span>
      </div>
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </FormKit> -->
     <form @submit.prevent="submitForm">
      <div class="input-field">
        <label>Status Name</label>
        <input
          v-model="statusname"
          type="text"
          placeholder="Status Name"
        
          @paste="preventEmojiPaste($event, 'statusname')"
          @input="validateNoEmoji('statusname')"
        />
        <p v-if="errors.statusname" class="text-red-500 text-sm mt-1">{{ errors.statusname }}</p>
      </div>
      <div class="input-field">
         <label>Sub-Status</label>
        <input
          v-model="subInput"
          type="text"
          class="formkit-input"
          placeholder="Press Enter to add sub-status"
          @keydown="handleSubcategoryKey"
          @paste="preventEmojiPaste($event, 'subInput')"
          @input="validateNoEmoji('subInput')"
        />
         <p v-if="errors.subInput" class="text-red-500 text-sm mt-1">{{ errors.subInput }}</p>
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="(item, index) in subcategories"
          :key="index"
          class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center"
        >
          {{ item }}
          <button @click.prevent="removeSubcategory(index)" class="ml-2 text-red-600 hover:text-red-800">&times;</button>
        </span>
      </div>
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </form>
  </Dialog>

  <Dialog v-model:visible="updateModal" header="Update Status" modal :style="{ 'min-width': '350px' }" :draggable="false">
    <!-- <FormKit type="form" @submit="updateForm" ref="MyForm">
      <div class="input-field">
        <FormKit validation="required" name="statusname" v-model="statusname" type="text" placeholder="Status Name"
          disabled />
      </div>
      <div class="input-field">
        <input v-model="subInput" @keydown="handleSubcategoryKey" type="text" class="formkit-input"
          placeholder="Press Enter to add subcategory" />
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <span v-for="(item, index) in subcategories" :key="index"
          class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center">
          {{ item }}
          <button @click.prevent="removeSubcategory(index)"
            class="ml-2 text-red-600 hover:text-red-800">&times;</button>
        </span>
      </div>
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </FormKit> -->
  <form @submit.prevent="updateForm">
      <div class="input-field">
         <label>Status Name</label>
        <input
          v-model="statusname"
          type="text"
          placeholder="Status Name"
         
          disabled
        />
      </div>
      <div class="input-field">
          <label>Sub-Status</label>
        <input
          v-model="subInput"
          type="text"
          class="formkit-input"
          placeholder="Press Enter to add sub-status"
          @keydown="handleSubcategoryKey"
          @paste="preventEmojiPaste($event, 'subInput')"
          @input="validateNoEmoji('subInput')"
        />
        <p v-if="errors.subInput" class="text-red-500 text-sm mt-1">{{ errors.subInput }}</p>
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="(item, index) in subcategories"
          :key="index"
          class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center"
        >
          {{ item }}
          <button @click.prevent="removeSubcategory(index)" class="ml-2 text-red-600 hover:text-red-800">&times;</button>
        </span>
      </div>
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </form>
  </Dialog>
</template>

<script>
export default {
  data() {
    return {
      addModal: false,
      updateModal: false,
      fields: null,
      loading: true,
      id: null,
      statusname: null,
      subInput: '',
      subcategories: [],
      errors: {}, 
    }
  },
  async mounted() {
    await this.init();
  },
  methods: {
     getItems(i) {
      return [
        {
          label: 'Edit',
          command: () => {
            this.setData(i)
          },
        },
     
        {
          label: 'Delete',
          command: () => {
            this.deleteStatus(i._id)
          },
        },
      ];
    },
    async init() {
      this.loading = true;
      await adminGet(`/leadstatus`).then(async (response) => {
        this.fields = response.data.leadstatus;
      })
      this.loading = false
    },
     clearForm() {
    this.statusname = "";
    this.subInput = "";
    this.subcategories = [];
    this.errors = {};
    this.id = null;
  },
     openAddModal() {
      this.addModal = true;
       this.clearForm(); 
      this.statusname = "";
      this.subInput = "";
      this.subcategories = [];
       this.errors = {};
    },
    setData(i) {
      this.updateModal = true
      this.id = i._id
      this.statusname = i.statusname
      this.subcategories = i.subStatus || [];
      this.subInput = "";
       this.errors = {};
    },
     preventEmojiPaste(event, field) {
      event.preventDefault();
      let paste = (event.clipboardData || window.clipboardData).getData("text");
      paste = this.removeEmojis(paste);
      this[field] = (this[field] || "") + paste;
    },

    // ✅ Block emojis on input
    validateNoEmoji(field) {
      let val = this[field] || "";
      val = this.removeEmojis(val);
      if (val.startsWith(" ")) {
        val = val.trimStart();
      }
      if (val.length > 30) {
        val = val.substring(0, 30);
      }
      this[field] = val;
    },

    // ✅ Emoji remover regex
    removeEmojis(str) {
      return str.replace(
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu,
        ""
      );
    },
    validateFields() {
      this.errors = {};

      // Status name
      if (!this.statusname) {
        this.errors.statusname = "Status name is required.";
      } else if (this.statusname.length < 3) {
        this.errors.statusname = "Status name must be at least 3 characters.";
      } else if (this.statusname.length > 30) {
        this.errors.statusname = "Status name must not exceed 30 characters.";
      } else if (this.statusname.startsWith(" ")) {
        this.errors.statusname = "Status name cannot start with a space.";
      }

      // SubInput (only validate if user types something)
      if (this.subInput) {
        if (this.subInput.length < 3) {
          this.errors.subInput = "Subcategory must be at least 3 characters.";
        } else if (this.subInput.length > 30) {
          this.errors.subInput = "Subcategory must not exceed 30 characters.";
        } else if (this.subInput.startsWith(" ")) {
          this.errors.subInput = "Subcategory cannot start with a space.";
        }
      }

      // Show global alerts for first error
      if (Object.values(this.errors).length) {
        errorAlert(Object.values(this.errors)[0]);
        return false;
      }
      return true;
    },
    handleSubcategoryKey(event) {
      // if (event.key === 'Enter' && this.subInput.trim()) {
      //   event.preventDefault();
      //   this.subcategories.push(this.subInput.trim());
      //   this.subInput = '';
      // }
      if (event.key === "Enter" && this.subInput.trim()) {
        event.preventDefault();
        if (
          this.subInput.length >= 3 &&
          this.subInput.length <= 30 &&
          !this.subInput.startsWith(" ")
        ) {
          this.subcategories.push(this.subInput.trim());
        }else {
          errorAlert("Subcategory must be 3–30 characters and not start with space.");}
        this.subInput = "";
      }
    },
    removeSubcategory(index) {
      this.subcategories.splice(index, 1);
    },
    async submitForm(v) {
       if (!this.validateFields()) return;
      this.loading = true;
      this.addModal = false;
      const payload = {
        statusname: this.statusname,
        subStatus: this.subcategories,
      };
      await adminPost(`/leadstatus-add`, payload);
      await this.init();
      successAlert("Leadstatus Added Successfully");
      this.addModal = false;
    this.clearForm(); 
      // this.loading = true
      // this.addModal = false
      // v.subStatus = this.subcategories;
      // await adminPost(`/leadstatus-add`, v).then((response) => {
      // })
      // await this.init()
    },
    async updateForm(v) {
      // this.updateModal = false;
      // this.loading = true;
      // v.subStatus = this.subcategories;
      // try {
      //   const res = await adminPut(`/leadstatus-update/${this.id}`, v);
      //   if (res.status) {
      //     await this.init();
      //     successAlert('Leadstatus Updated Successfully');
      //   } else {
      //     this.loading = false;
      //   }
      // } catch (error) {
      //   console.error('Error updating lead status:', error);
      //   errorAlert('Failed to update Leadstatus');
      // } finally {
      //   this.loading = false;
      // }
     if (!this.validateFields()) return;
      // this.updateModal = false;
      this.loading = true;
      const payload = {
        statusname: this.statusname,
        subStatus: this.subcategories,
      };
      try {
        const res = await adminPut(`/leadstatus-update/${this.id}`, payload);
        if (res.status) {
          await this.init();
          successAlert("Leadstatus Updated Successfully");
        } else {
          this.loading = false;
        }
      } catch (error) {
        console.error("Error updating lead status:", error);
        errorAlert("Failed to update Leadstatus");
      } finally {
         this.updateModal = false;
      this.clearForm(); 
        this.loading = false;
      }
    },
    async deleteStatus(v) {
      if (await deleteConfirm('Do You Want to delete this Leadsource?')) {
        this.loading = true;
        const res = await adminDelete(`/leadstatus-delete/${v}`)
        if (res.status) {
          await this.init();
          successAlert('Leadstatus Deleted Successfully');
        } else {
          this.loading = false;
        }
      }
    },
  },
}
</script>

<style scoped>
@import url('style.css');
.text-red-500 {
  color: #dc2626;
}
</style>