<template>
  <div class="pipline-view-body-container h-screen flex flex-col overflow-hidden bg-[#f9fafb]">
    <div class="relative flex-1  px-0 md:px-6  py-3 md:py-4">
      <button class="absolute left-0 top-1/3 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full  p-1 md:p-2" @click="scrollLeft">
        <i class="bi bi-chevron-left  text-lg md:text-2xl"></i>
</button>
      <button
        class="absolute right-0 top-1/3 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full  p-1 md:p-2"
        @click="scrollRight">
        <i class="bi bi-chevron-right  text-lg md:text-2xl"></i>
      </button>
      <div ref="scrollContainer" class="scroll-container flex space-x-6 overflow-x-auto scroll-smooth pb-2 relative">
        <div v-for="(column, index) in allstore" :key="index"
          class="flex-shrink-0 w-[20rem]   h-screen sm:w-[24rem] md:w-[27rem] flex flex-col"  :class="index === 0 ? 'sticky left-0 z-20 bg-[#f9fafb]' : ''">
          <div class="mb-4">
            <div class="rounded-full px-2 md:px-4 py-2 flex items-center justify-between text-white shadow-md"
              :style="{ backgroundColor: stageColors[index] || '#9CA3AF' }">
              <div
                class="bg-white text-[14px] font-semibold text-gray-800 rounded-full w-[36px] h-[36px] flex items-center justify-center">
                {{ column.length }}
              </div>
              <div class="flex-1 ml-3">
                <input v-if="editingIndex === index" v-model="store[index].stage[0]" @blur="handleStageEdit(index)"
                  class="bg-transparent border-b border-white focus:outline-none text-[16px] font-medium w-full" />
                <span v-else class="text-[16px] font-medium">
                  {{ store[index].stage[0] }}
                </span>
              </div>
              <i v-if="store[index].stage != 'New Client'"
                class="bi bi-pencil-square text-white hover:text-gray-200 cursor-pointer text-lg"
                @click="handleUpdate(store[index])" title="Edit Stage Name" />
            </div>
          </div>
          <div class="flex-1 p-1 md:p-2 bg-white rounded-xl  overflow-y-auto" @dragover.prevent @drop="drop(index)">
            <div v-for="(card, cardIndex) in column.slice(0, visibleCards)" :key="card._id"
              class="bg-white rounded-[16px] sm:min-w-[350px] md:min-w-[410px] shadow-md border-[1px] border-[#EDEDED] mb-[22px] py-[21px] px-[19px] cursor-grab relative"
              draggable="true" @dragstart="dragStart(card, index, cardIndex)">
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                  <img :src="card.image" alt="Avatar" class="w-[52px] h-[52px] rounded-full" />
                  <div>
                    <div class="flex items-center gap-2">
                      <i @click="$router.push(`/admin/customers/customer-view/customer-View/${card?._id}`)"
                        class="bi bi-box-arrow-up-right text-[#ff5757]"></i>
                      <h3 class="text-[#150A33] font-semibold text-[18px] mb-0">{{ card.name }}</h3>
                    </div>
                    <p class="text-[15px] mb-0 text-[#524B6B]">Assigned · {{ card.assigned_to }}</p>
                  </div>
                </div>
                <div class="relative">
                  <i class="bi bi-list text-2xl text-[#909090] hover:text-gray-600 cursor-pointer"
                    @click="toggleDropdown(card._id)"></i>
                  <!-- Dropdown Menu -->
                  <div v-if="dropdownCardId === card._id"
                    class="absolute right-0 mt-2 w-[6rem] bg-white border border-[#EFECF3] rounded-[14px] shadow-lg z-50">
                    <ul class="text-sm text-[#282823] py-2 pl-0 mb-0">
                      <li @click="counsellorModal = true; id = card._id"
                        class="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                        <i class="bi bi-pencil-square"></i> Assign
                      </li>
                      <li class="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-[#ff5757] cursor-pointer"
                        @click="showConvertDialog = true; id = card._id">
                        <i class="bi bi-trash"></i> Delete
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul class="text-sm text-gray-700 space-y-2 pl-0">
                <li class="flex flex-wrap gap-2 justify-between border-t border-[#ededed] pt-2">
                  <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-calendar4 text-[#838383]"></i> Created On
                  </span>
                  <span class="text-[14px] text-[#3c3c3c]">{{card.convert_customer_date? new Date(card.convert_customer_date) .toLocaleString('en-GB', { day: '2-digit', month: '2-digit',  year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) .replace(',', ' •') : 'N/A' }}</span>
                </li>
                <li class="flex flex-wrap gap-2 justify-between border-t border-[#ededed] pt-2">
                  <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-envelope text-[#838383]"></i> Email ID
                  </span>
                  <span class="text-[14px] text-[#3c3c3c]">{{ card.email }}</span>
                </li>
                <li class="flex flex-wrap gap-2 justify-between border-t  border-[#ededed] pt-2">
                  <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-telephone text-[#838383]"></i> Phone Number
                  </span>
                  <span class="text-[14px] text-[#3c3c3c]">{{ card.phone }}</span>
                </li>
                <li class="flex flex-wrap gap-2 justify-between border-[#ededed] border-t pt-2">
                  <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-link-45deg text-[#838383]"></i> Source
                  </span>
                  <span class="text-[14px] text-[#3c3c3c]">{{ card.source }}</span>
                </li>
              </ul>
              <div class="mt-4 flex items-center gap-2 justify-center">
                <p class="text-[14px] text-[#3c3c3c] mt-1 mb-0">{{ card.lead_stage }}</p>
              </div>
            </div>
            <div v-if="visibleCards < column.length" class="flex justify-center mt-4">
              <button class="px-4 py-2 text-[14px] rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                @click="loadMoreCards">Load More</button>
            </div>
            <div v-if="column.length === 0" class="text-center text-gray-400 py-10 italic">
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 w-[27rem] flex flex-col">
          <div class="mb-4">
            <div
              class="rounded-full px-4 py-2 flex items-center justify-center text-white shadow-md bg-[#3C3C3C] cursor-pointer"
              @click="handleAdd">
              <span class="text-sm font-medium">Click Here To Add New Tab</span>
              <i class="bi bi-plus ml-2 text-lg"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="showConfirmDialog" modal :closable="false"
    class="w-[92vw]  sm:w-[70vw] md:w-[50vw] lg:w-[35vw] xl:w-[27vw] 2xl:w-[22vw]">
    <div class="pb-3   text-center relative">
      <div v-if="!showStageForm">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Change Customer Stage</h3>
        <p class="text-gray-600 mb-4">Are you sure you want to change the stage of this customer?
        </p>
        <div class="flex justify-center gap-4">
          <button class="px-6 py-2  text-[18px] rounded border border-[#e7e7e7] text-[#333333] hover:bg-gray-100"
            @click="cancelDrop"> Close
          </button>
          <button
            class="px-6 py-2 rounded bg-[#FF5757]  border border-[#ff5757] text-white hover:bg-[#ff5757] hover:text-[#ffffff]"
            @click="proceedToForm">Yes
          </button>
        </div>
      </div>
      <div class="px-2" v-else>
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Confirm Stage Details</h3>
        <div class="mb-4 text-left">
          <label class="block text-[17px] font-medium text-gray-700 mb-1 required">Select Stage</label>
          <div class="select-option">
            <select v-model="selectedStage" class="custom-select">
              <option disabled value="">Select Stage</option>
              <option v-for="(stage, index) in filteredStages" :key="stage._id" :value="stage.stage[0]">{{ stage.stage[0] }}</option>
            </select>
          </div>
        </div>
        <div class="mb-6 text-left">
          <label class="block text-[17px] font-medium text-gray-700 mb-1 required">Select Sub Stage</label>
          <div class="select-option">
            <select v-model="selectedSubStatus" class="custom-select" :disabled="!selectedStage">
              <option disabled value="">Select Sub Stage</option>
              <option v-for="(sub, idx) in filteredSubStages" :key="idx" :value="sub">{{ sub }}</option>
            </select>
          </div>
        </div>
        <div class="text-left text-red-500 text-sm mt-1" v-if="showStageForm && !selectedSubStatus"> Sub Stage is required. </div>     
        <div class="flex justify-center gap-4">
          <button class="px-6 py-2 text-[18px] rounded border border-[#e7e7e7] text-[#333333] hover:bg-gray-100"
            @click="cancelDrop">Cancel </button>
          <button class="px-6 py-2 rounded bg-[#FF5757] border border-[#ff5757] text-white hover:bg-[#ff5757] hover:text-[#ffffff]"
            @click="submitDrop" :disabled="!selectedStage || !selectedSubStatus">Submit</button>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="showConvertDialog" modal :closable="false"
    class="w-[92vw]  sm:w-[70vw] md:w-[50vw] lg:w-[35vw] xl:w-[27vw] 2xl:w-[21vw]">
    <div class=" pb-3  text-center relative">
      <h3 class="text-[22px] font-bold text-[#333333] mb-2"> Delete Confirmation </h3>
      <p class="text-[17px] text-[#757575] mb-6">
        Do you confirm that you want to Convert this Visitor into a Lead</p>
      <div class="flex justify-center gap-4">
        <button @click="showConvertDialog = false"
          class="px-6 py-2  text-[18px] rounded border border-[#e7e7e7] text-[#333333] hover:bg-gray-100">
          Cancel </button>
        <button @click="deleteLead(id)"
          class="px-6 py-2 rounded bg-[#FF5757]  border border-[#ff5757] text-white hover:bg-[#ff5757] hover:text-[#ffffff]">
          Confirm
        </button>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="AddStage" modal header="Add Stage" :style="{ width: '520px' }"
    :breakpoints="{ '991px': '95vw' }" class="p-3">
    <div class="my-6">
      <label class="block text-[19px] font-medium text-[#0F172A] mb-2 required">Stage Name</label>
      <InputText v-model="stageName" placeholder="add stage name"
        :disabled="type === 'update' && (stageName === 'Onboarding' || stageName === 'Completed')"
        class="w-full py-3 px-4 text-[16px] text-gray-600 appearance-none outline-none bg-[#F1F5F966] border-[1.5px] border-[#CBD5E1] placeholder-[#64748B] rounded-xl" />
    </div>
    <label class="block text-[19px] font-medium text-[#0F172A] mb-2 required">Sub Stage </label>
    <div class="input-field">
      <input v-model="subInput" @keydown="handleSubcategoryKey" type="text" class="formkit-input"
        placeholder="Press Enter to add sub stage" />
    </div>
    <div class="flex flex-wrap gap-2 mt-2 mb-3">
      <span v-for="(item, index) in subcategories" :key="index"
        class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center">
        {{ item }}
        <button @click.prevent="removeSubcategory(index)" class="ml-2 text-red-600 hover:text-red-800">&times;</button>
      </span>
    </div>
    <div class="mb-4">
      <label class="block text-[19px] font-medium text-[#0F172A] mb-2">Color Tag</label>
      <div class="flex items-center gap-3 px-4 py-3 border-[1.5px] bg-[#F1F5F966] border-[#CBD5E1] rounded-xl">
        <span class="w-[22px] h-[22px] rounded-full" :style="{ backgroundColor: colorValue }"></span>
        <InputText v-model="colorValue" readonly class="flex-1 outline-none bg-transparent" />
        <input type="color" v-model="colorValue" class="w-5 h-5 cursor-pointer" />
      </div>
    </div>
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
  <Dialog v-model:visible="counsellorModal" modal header="Assign Customer"
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
        <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn" validation-label="Description" />
      </span>
      <div class="modal-footer-section">
        <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close" @click="counsellorModal = false">Go back</button> -->
        <button type="submit" class="mt-4 rounded px-4 py-2 btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
export default {
  name: 'KanbanBoard',
  data() {
    return {
      visibleCards: 8,
      draggedCard: null,
      showConfirmDialog: false,
      pendingDrop: null,
      selectedStage: '',
      showStageForm: false,
      showConvertDialog: false,
      selectedSubStatus: '',
      subStatusOptions: ['In Progress', 'Follow Up', 'Completed', 'Rejected'],
      draggedFromColumn: null,
      draggedCardIndex: null,
      editingIndex: null,
      dropdownCardId: null,
      store: [],
      allstore: [],
      stageColors: [
        'bg-[#4F46E5]',
        'bg-[#F59E0B]',
        'bg-[#22C55E]',
        'bg-[#FF5757]',
        'bg-[#3C3C3C]'
      ],
      subStatusOptions: ['In Progress', 'Follow Up', 'Completed', 'Rejected'],
      AddStage: false,
      stageName: '',
      colorValue: '#49A7FE',
      fields: null,
      loading: false,
      subInput: '',
      subcategories: [],
      type: "add",
      id: null,
      filterBar: false,
      id: null,
      counsellorModal: false,
      items: [],
    };
  },
  async mounted() {
    activateSubmenu('c1', ' All Customers');
    this.getSingle(this.search, this.filters);
    this.getSubCouncellor();
     this.enableAutoScroll();
  },
  props: {
    search: {
      type: String,
      default: ''
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    filteredStages() {
      return this.store.filter(s => s._id !== 'new-client');
    },
    filteredSubStages() {
      if (!this.selectedStage) return [];
      const entry = this.store.find(s => s.stage[0] === this.selectedStage);
      return entry?.subStage || [];
    }
  },
  watch: {
    search(newValue) {
      this.getSingle(newValue, this.filters);
    },
    filters: {
      deep: true,
      handler(newFilters) {
        console.log("under kanban", this.filters)
        this.getSingle(this.search, newFilters); // 🔁 call API on filter change
      }
    }
  },
  methods: {
    confirmConvert() {
      console.log('Visitor converted to lead!');
      this.showConvertDialog = false;
    },
    dragStart(card, fromCol, cardIdx) {
      this.draggedCard = card;
      this.draggedFromColumn = fromCol;
      this.draggedCardIndex = cardIdx;
    },
    loadMoreCards() {
      this.visibleCards += 8; 
    },
    enableAutoScroll() {
    const container = this.$refs.scrollContainer;
    if (!container) return;

    container.addEventListener("dragover", (e) => {
      const { clientX } = e;

      const bounds = container.getBoundingClientRect();
      const threshold = 100; // px from edge before auto scroll
      const scrollSpeed = 15; // px per frame

      if (clientX - bounds.left < threshold) {
        container.scrollLeft -= scrollSpeed; // scroll left
      } else if (bounds.right - clientX < threshold) {
        container.scrollLeft += scrollSpeed; // scroll right
      }
    });
  },
    drop(toColumnIndex) {
      if (this.draggedCard !== null) {
        const targetStage = this.store[toColumnIndex].stage[0];
        this.pendingDrop = {
          card: this.draggedCard,
          from: this.draggedFromColumn,
          fromIndex: this.draggedCardIndex,
          to: toColumnIndex
        };
        this.selectedStage = targetStage;
        if(this.selectedStage =='New Client'){
          return errorAlert("We can not drag under New Client stage ")
        }
        this.selectedSubStatus = this.draggedCard.subStatus ;
        this.showConfirmDialog = true;
      }
    },
    scrollLeft() {
      const container = this.$refs.scrollContainer;
      container.scrollLeft -= 300;
    },
    scrollRight() {
      const container = this.$refs.scrollContainer;
      container.scrollLeft += 300;
    },
    extractColorFromClass(className) {
      const match = className.match(/bg-\[#([A-Fa-f0-9]{6})\]/);
      return match ? `#${match[1]}` : '#49A7FE';
    },
    toggleDropdown(cardId) {
      this.dropdownCardId = this.dropdownCardId === cardId ? null : cardId;
    },
    handleStageEdit(index) {
      const name = this.store[index].stage[0]?.trim();
      if (!name) {
        this.store.splice(index, 1);
        this.allstore.splice(index, 1);
        this.stageColors.splice(index, 1);
      }
      this.editingIndex = null;
    },
    confirmDrop() {
      const { card, from, fromIndex, to } = this.pendingDrop;
      this.allstore[from].splice(fromIndex, 1);
      this.allstore[to].push(card);
      this.resetDrop();
    },
    cancelDrop() {
      this.resetDrop();
    },
    async submitDrop() {
      if (!this.selectedStage && !this.selectedSubStatus) {
        return errorAlert("All field is required")
      }
      const { card, from, fromIndex, to } = this.pendingDrop;
      console.log("check data drop data", this.pendingDrop, this.selectedStage, this.selectedSubStatus, card)
      await adminPut(`/update-customer-stage/${card._id}`, {
        lead_stage: this.selectedStage,
        lead_sub_stage: this.selectedSubStatus
      })
      this.getSingle()
      this.allstore[from].splice(fromIndex, 1);
      this.allstore[to].push({
        ...card,
        subStatus: this.selectedSubStatus
      });
      this.resetDrop();
    },
    proceedToForm() {
      this.showStageForm = true;
    },
    resetDrop() {
      this.draggedCard = null;
      this.draggedFromColumn = null;
      this.draggedCardIndex = null;
      this.pendingDrop = null;
      this.showConfirmDialog = false;
      this.showStageForm = false;
    },
    async getSingle(search = '', filters = {}) {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (Object.keys(filters).length) {
        query.append('filters', JSON.stringify(filters));
      }
      const res = await adminGet(`/customer-stages-with-customers?${query.toString()}`)
      const stages = res.data.data; // [{_id, stage, color, leads}, …]
      this.store = stages.map(s => ({ _id: s._id, stage: s.stage, color: s.color, subStage: s.subStage }));
      this.allstore = stages.map(s => s.leads);
      this.stageColors = this.store.map(s => s.color);
    },
    async handleSubmit() {
  if (this.colorValue && this.subcategories.length > 0 && this.stageName.trim() !== '') {
    this.loading = true;
    try {
      const payload = {
        stagename: this.stageName,
        subStage: this.subcategories,
        color: this.colorValue,
      };
      const response = await adminPost(`/customerStage-add`, payload);
      successAlert("Customer stage added successfully");
      await this.getSingle();
      this.resetForm();
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
    resetForm() {
     this.stageName = "";
  this.subcategories = [];
  this.colorValue = "";
  this.subInput = "";
  this.id = null;
  this.type = "add";
    },
    handleUpdate(v) {
      this.AddStage = true
      this.type = "update"
      this.stageName = v.stage[0]
      this.subcategories = v.subStage
      this.colorValue = v.color;
      this.id = v._id
    },
    async updateForm() {
  if (this.colorValue && this.subcategories.length > 0 && this.stageName.trim() !== '') {
    this.loading = true;
    try {
      const payload = {
        stagename: this.stageName,
        subStage: this.subcategories,
        color: this.colorValue,
      };
      const res = await adminPut(`/customerStage-update/${this.id}`, payload);
      if (res.status) {
        successAlert('Leadstatus Updated Successfully');
        this.AddStage = false;
        await this.getSingle();
      } else {
        errorAlert("Failed to update Leadstatus");
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      errorAlert('Failed to update Leadstatus');
    } finally {
      this.loading = false;
    }
  } else {
    errorAlert("All fields are required");
  }
},
    handleAdd() {
  this.resetForm();
  this.type = "add";
  this.AddStage = true;
},
    handleSubcategoryKey(event) {
      if (event.key === 'Enter' && this.subInput.trim()) {
        event.preventDefault();
        const input = this.subInput.trim();
        const isDuplicate = this.subcategories.some(
          (sub) => sub.toLowerCase() === input.toLowerCase()
        );
        if (isDuplicate) {
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
    async deleteLead(i) {
      await adminDelete(`/delete-leads/${i}`).then(async (response) => { });
      this.getSingle();
      successAlert("Customer Deleted")
      this.showConvertDialog = false
    },
    async getSubCouncellor() {
      this.loading = true
      this.items = (await adminGet(`/select-employes-list`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
      this.loading = false
    },
    async convertCustomer(v) {
      await adminPut(`/assign-leads/${this.id}?OnlyAssign=true`, v).then(async (response) => {
        // await adminPut(`/convert-customer/${this.lead._id}`).then(async (response) => {
        // this.$router.push("/admin/customers/view")
        // this.counsellorModal = false;
        // })
        this.id = null
        this.counsellorModal = false;
        this.getSingle()
      })
      this.loading = false
    },
  }
};
</script>
<style scoped>
.pipline-view-body-container::-webkit-scrollbar {
  display: none;
}

.p-inputtext {
  box-shadow: 0 0 0 !important;
}

.pipline-view-body-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.pipline-view-body-container::-webkit-scrollbar {
  display: none;
}

.pipline-view-body-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: hidden;
}

/* Hide scrollbar for scroll container */
.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.required:after {
  content: " *";
  color: red;
}
</style>
