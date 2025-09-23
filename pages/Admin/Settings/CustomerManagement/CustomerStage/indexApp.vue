<template>
  <div class="bg-white pt-[30px] pb-[35px] px-[35px] my-[30px] rounded-[27px] languages">
    <div class="flex items-center justify-between">
      <span id="languages-heading">Customer Stage</span>
      <span id="add-btn" class="text-[#ff5757] font-semibold border-[1.5px] border-[#ff5757] px-3 py-[6px] rounded-full cursor-pointer"
        @click="AddStage = true">+ Add Stage</span>
    </div>

    <div class="break-line"></div>

    <section>
      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Color</th>
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
            <td>{{ i.stagename }}</td>
            <td class="td">
              <div class="color-picker">
                <span :style="{ background: `${i.color}`, height: '30px', width: '30px', borderRadius: '50%' }"></span>
                &nbsp;<span>{{ i.color }}</span>
              </div>
            </td>
            <td>
              <!-- <div class="btn-group">
                <span @click="handleUpdate(i)" class="td-btn"><img src="/img/svg/edit.svg" alt="" /></span>
                <span @click="deleteStatus(i._id)" class="td-btn"><img src="/public/img/svg/trash.svg" /></span>
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
  </div>

  <!-- Add Stage Dialog -->
  <Dialog v-model:visible="AddStage" modal header="Add Stage" :style="{ width: '520px' }"
    :breakpoints="{ '991px': '95vw' }" class="p-3">
    <!-- Stage Name Field -->
    <div class="my-6">
      <label class="block text-[19px] font-medium text-[#0F172A] mb-2">Stage Name</label>
      <InputText v-model="stageName" placeholder="add stage name" :disabled="type === 'update' && (stageName === 'Onboarding' || stageName === 'Completed')"

        class="w-full py-3 px-4 text-[16px] text-gray-600 appearance-none outline-none bg-[#F1F5F966] border-[1.5px] border-[#CBD5E1] placeholder-[#64748B] rounded-xl" />
    </div>

    <!-- Substatus Dropdown -->


    <div class="input-field">
      <input v-model="subInput" @keydown="handleSubcategoryKey" type="text" class="formkit-input"
        placeholder="Press Enter to add subcategory" />
    </div>

    <!-- Subcategories Preview -->
    <div class="flex flex-wrap gap-2 mt-2">
      <span v-for="(item, index) in subcategories" :key="index"
        class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center">
        {{ item }}
        <button @click.prevent="removeSubcategory(index)" class="ml-2 text-red-600 hover:text-red-800">&times;</button>
      </span>
    </div>

    <!-- Color Tag Picker -->
    <div class="mb-4 mt-3">
      <label class="block text-[19px] font-medium text-[#0F172A] mb-2">Color Tag</label>
      <div class="flex items-center gap-3 px-4 py-3 border-[1.5px] bg-[#F1F5F966] border-[#CBD5E1] rounded-xl">
        <span class="w-[22px] h-[22px] rounded-full" :style="{ backgroundColor: colorValue }"></span>
        <InputText v-model="colorValue" readonly class="flex-1 outline-none bg-transparent" />
        <input type="color" v-model="colorValue" class="w-5 h-5 cursor-pointer" />
      </div>
    </div>

    <!-- Footer Buttons -->
    <template #footer>
      <div class="flex justify-between w-full">
        <Button label="Go back"
          class="w-[47%] py-[17px] px-[15px] border-[1.6px] border-[#E7E7E7] rounded-[10px] font-medium text-[#333333] text-[22px] bg-white hover:bg-gray-300"
          @click="AddStage = false" />
        <Button v-if="type == 'add'" label="Submit"
          class="w-[47%] py-[17px] px-[15px] border-[1.6px] border-[#ff5757] rounded-[10px] font-medium text-white text-[22px] bg-[#FF5757] hover:text-white hover:bg-[#e84d4d]"
          @click="handleSubmit" />
        <Button v-if="type == 'update'" label="Update"
          class="w-[47%] py-[17px] px-[15px] border-[1.6px] border-[#ff5757] rounded-[10px] font-medium text-white text-[22px] bg-[#FF5757] hover:text-white hover:bg-[#e84d4d]"
          @click="updateForm" />
      </div>
    </template>
  </Dialog>


</template>

<script>
export default {
  data() {
    return {
      AddStage: false,
      stageName: '',
      colorValue: '#49A7FE',
      fields: null,
      loading: false,
      subInput: '',
      subcategories: [],
      type: "add",
      id: null,
    };
  },
  props: {
    handleAddCustomRoleShow: {
      type: Function,
      required: true,
    },
    handleAddUserShow: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    this.init()
  },
  methods: {
      getItems(i) {
      return [
        {
          label: 'Edit',
          command: () => {
            this.handleUpdate(i)
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
    async handleSubmit(v) {
      if (this.colorValue && this.subcategories.length > 0 && this.stageName !== '') {
        this.loading = true;
        try {
          v.stagename = this.stageName;
          v.subStage = this.subcategories;
          v.color = this.colorValue;
          const response = await adminPost(`/customerStage-add`, v);
          successAlert("Customer stage added successfully");
          await this.init();
          this.AddStage = false;
        } catch (error) {
          console.error("Error adding customer stage:", error);
          errorAlert("Something went wrong. Please try again.");
        } finally {
          this.loading = false;
        }
      } else {
        errorAlert("All fields are required");
      }
    },
    async init() {
      this.loading = true
      await adminGet(`/customerStage`).then(async (response) => {
        this.fields = response.data.leadstatus;
      })
      this.loading = false
    },
    handleUpdate(v) {
      this.AddStage = true
      this.type = "update"
      this.stageName = v.stagename
      this.subcategories = v.subStage
      this.colorValue = v.color;
      this.id = v._id

    },
    async updateForm(v) {
      this.loading = true;
      v.subStatus = this.subcategories;
      v.stagename = this.stageName
      v.subStage = this.subcategories
      v.color = this.colorValue;
      if (this.colorValue && this.subcategories.length > 0) {
        try {
          const res = await adminPut(`/customerStage-update/${this.id}`, v);
          if (res.status) {
            this.AddStage = false
            await this.init();
            successAlert('Leadstatus Updated Successfully');
          } else {
            this.loading = false;
          }
        } catch (error) {
          console.error('Error updating lead status:', error);
          errorAlert('Failed to update Leadstatus');
        } finally {
          this.loading = false;
        }
      } else {
        errorAlert("All field is required")
      }
    },
    async deleteStatus(v) {
      if (await deleteConfirm('Do You Want to delete this Customer Stage?')) {
        this.loading = true;
        const res = await adminDelete(`/customerStage-delete/${v}`)
        if (res.status) {
          await this.init();
          successAlert('Customer Stage Deleted Successfully');
        } else {

          this.loading = false;
        }
      }
    },
    handleSubcategoryKey(event) {
      if (event.key === 'Enter' && this.subInput.trim()) {
        event.preventDefault();
        const input = this.subInput.trim();

        // Check for duplicates (case-insensitive match)
        const isDuplicate = this.subcategories.some(
          (sub) => sub.toLowerCase() === input.toLowerCase()
        );
        if (isDuplicate) {
          // You can show an error message here if needed
          errorAlert("Subcategory already exists!");
          return;
        }
        this.subcategories.push(input);
        this.subInput = '';
      }
    },
    removeSubcategory(index) {
      this.subcategories.splice(index, 1);
    },
  },
};
</script>
<style scoped>
#languages-heading {
  color: #404040;
  font-size: 25.38px;
  font-weight: 700;
  line-height: 4vw;
  word-wrap: break-word;
}

.p-dialog .p-dialog-header {
  font-size: 25px;
  font-weight: 700;
  color: #1F1B2D;
}

.p-inputtext {
  box-shadow: 0 0 0 !important;
}

.languages {
  box-shadow: 0px 10.759952545166016px 166.7792510986328px rgba(153.16, 170.95, 197.62, 0.18);
}

.btn-group {
  display: flex;
  column-gap: 15px;
}

.break-line {
  width: -webkit-fill-available;
  height: 2px;
  background: #000000;
  opacity: 0.1;
  margin: 10px 0px 30px 0px;
}

table {
  caption-side: bottom;
  border-collapse: collapse;
  width: 100%;
  min-width: max-content;
}

th {
  font-size: 22px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  color: #1a1a1a;
}

th,
td {
  padding-inline: 30px;
}

.td-text {
  color: #5d6b98;
  font-size: 13.12px;
  font-weight: 500;
  line-height: 16.68px;
  word-wrap: break-word;
  padding: 10px 20px;
  background: rgba(93.02, 106.73, 151.78, 0.1);
  border-radius: 18px;
}

.td {
  display: flex;
  column-gap: 8px;
  height: inherit;
  align-items: center;
}

.td-btn {
  display: block;
  height: 44px;
  padding: 9px;
  width: 44px;
  background: #f3f6f9;
  border-radius: 8px;
}


.languages>section {
  overflow: auto;
  border: 1px solid #e4e4ef;
  border-radius: 8px;
}

.languages {
  box-shadow: 0px 10.76px 166.78px rgba(153.16, 170.95, 197.62, 0.18);
}

.break-line {
  width: -webkit-fill-available;
  height: 2px;
  background: #000000;
  opacity: 0.1;
  margin: 10px 0px 30px 0px;
}

thead {
  position: sticky;
  top: 0px;
  z-index: 1;
  height: 4rem;
  border-bottom: 1px solid #e4e4ef;
}

tbody>tr {
  border-bottom: 1px solid #e4e4ef;
  height: 4rem;
  font-size: 15px;
}

.color-picker {
  max-width: 165px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
}

.color-picker>span {
  color: #64748b;
}

@media (max-width: 767px) {
  .languages {
    margin: 15px;
    padding: 15px 0px 15px 0px;
  }

  .languages>section {
    margin-inline: 15px;
  }
}

@media (max-width: 425px) {
  #languages-heading {
    font-size: 5vw;
  }

  .break-line {
    margin: 10px;
  }
}
</style>