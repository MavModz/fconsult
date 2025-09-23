<!-- @format -->

<template>
    <div class="languages" id="checklist-section">
        <div class="btn-container">
            <span id="languages-heading">Document Check list</span>
            <span class="cursor-pointer" id="add-btn" @click="addModal = true"><i class="bi bi-plus"
                    style="font-size: 1.25rem;"></i> Add</span>
        </div>
        <div class="break-line"></div>
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Checklist Name</th>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading" v-for="i in 2">
                        <td>
                            <Skeleton></Skeleton>
                        </td>
                        <td>
                            <Skeleton></Skeleton>
                        </td>
                        <td>
                            <Skeleton></Skeleton>
                        </td>
                        <td>
                            <Skeleton></Skeleton>
                        </td>
                    </tr>

                    <tr v-else v-for="(i, index) in checklist">
                        <td>{{ index + 1 }}</td>
                        <td>{{ i.checklist_name }}</td>
                        <td class="td">
                            <span v-for="j in i.checklist_data" class="td-text">{{ j.category_name }}</span>
                        </td>
                        <td>
                            <!-- <div class="btn-group">
                                <span class="td-btn" @click="editItem(i)">
                                    <img src="/img/svg/edit.svg" alt="Edit" />
                                </span>
                                <span class="td-btn" @click="deleteLanguage(i._id)">
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
    </div>
    <div>
    </div>

    <Dialog v-model:visible="addModal" modal :header="mode === 'edit' ? 'Edit Checklist' : 'Checklist'"
        class="w-[92vw] p-4 sm:w-[80vw] md:w-[60vw] lg:w-[37vw] xl:w-[30vw]">
        <div>
            <div class="input-group">
                <label class="block text-[20px] font-medium text-[#0F172A] mt-2 mb-1">Checklist Name</label>
                <input type="text" v-model="checklistName" placeholder="Add checklist name here"
                    class="w-full border px-4 py-3 rounded-md" />
            </div>
            <!-- Select Category -->
            <div>
                <label class="block font-medium text-[20px] text-[#0F172A] mt-3 mb-1">Checklist Category</label>
                <div class="select-option"><select v-model="selectChecklist" class=" custom-select">
                        <option disabled value="">Select Checklist Category</option>
                        <option v-for="Check in checklists" :key="Check" :value="Check">{{ Check }}</option>
                    </select>
                </div>
            </div>
            <!-- Document Name -->
            <div>
                <div class="input-group">
                    <label class="block text-[20px] font-medium text-[#0F172A] mt-2 mb-1">Document Name</label>
                    <input type="text" v-model="checkDocName" placeholder="Add document name"
                        class="w-full border px-4 py-3 rounded-md" @keydown.enter.prevent="addChecklist" />
                </div>
                <div class="text-[16px] text-[#676B6C] mb-[30px] mt-2 justify-end flex items-center gap-3">
                    <i class="bi bi-info-circle"></i> hit enter, to add multiple documents
                </div>
            </div>
            <!-- Category-wise Document Display -->
            <div v-for="(docs, Check) in documentsByChecklist" :key="Check"
                class="border-[2px] border-[#e4e4ef] rounded-xl mt-[36px] overflow-hidden">
                <div
                    class="flex justify-between items-center font-medium text-[18px] px-[20px] py-[18px] text-[#6f6f6f] bg-[#ededed]">
                    <span>{{ Check }}</span>
                    <i class="bi bi-chevron-down" @click="categoryGrid = !categoryGrid"></i>
                </div>
                <div class="grid grid-cols-2" v-if="categoryGrid">
                    <div v-for="(doc, index) in docs" :key="index"
                        class="flex justify-between items-center border px-[20px] py-[18px] text-[16px] bg-white">
                        <span class="truncate text-[#1A1A1A]">{{ doc }}</span>
                        <i class="bi bi-trash3 text-[#64748B] cursor-pointer" @click="removeDoc(Check, index)"></i>
                    </div>
                </div>
            </div>
            <!-- Submit Button -->
            <div class="pt-4">
                <button @click="submitChecklist"
                    class="w-full bg-[#FF5C5C] text-white font-semibold py-[15px] rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed" :disabled="mode === 'edit' && isUnchanged">
                    {{ mode === 'edit' ? 'Update' : 'Submit' }}
                </button>
            </div>
        </div>
    </Dialog>

</template>

<script>
import Skeleton from 'primevue/skeleton';

export default {
    components: {
        Skeleton,
    },
    data() {
        return {
            loading: true,
            addModal: false,

            checklist: null,
            language: {
                name: null,
                label: [],
            },
            updateData: null,
            //checklist
            CreateChecklist: false,
            checklistName: '',
            checkDocName: '',
            selectChecklist: '',
            checklists: ['Educational', 'Finance', 'Residential', 'Others'],
            documentsByChecklist: {},
            categoryGrid: false,
            selectedCategory: '',
            mode: 'add', // 'add' or 'edit'
            currentEditId: null,
            originalData: null,
        };
    },
    async mounted() {
        await this.init();
    },
    computed: {
    isUnchanged() {
      if (this.mode !== 'edit' || !this.originalData) return false;

      const currentData = {
        checklist_name: this.checklistName,
        checklist_data: this.documentsByChecklist,
      };

      return JSON.stringify(currentData) === JSON.stringify(this.originalData);
    },
  },
    methods: {
            getItems(i) {
      return [
        {
          label: 'Edit',
          command: () => {
            this.editItem(i)
          },
        },
     
        {
          label: 'Delete',
          command: () => {
            this.deleteLanguage(i._id)
          },
        },
      ];
    },
        async init() {
            this.loading = true;
            await adminGet(`/checklist`).then(async (response) => {
                this.checklist = response.data.checklist;
            });
            this.loading = false;
        },

        addChecklist() {

            console.log("hihihihihi")
            const doc = this.checkDocName.trim();
            const category = this.selectChecklist;

            if (!doc || !category) {
                return errorAlert("add category name or select category")
            }

            // If the category doesn't exist yet, initialize it
            if (!this.documentsByChecklist[category]) {
                this.documentsByChecklist[category] = [];
            }

            // Add doc only if not duplicate
            if (!this.documentsByChecklist[category].includes(doc)) {
                this.documentsByChecklist[category].push(doc);
            }

            // Clear input
            this.checkDocName = '';
        },

        async submitChecklist() {
            const checklistFormatted = {
                checklist_name: this.checklistName,
                checklist_data: Object.entries(this.documentsByChecklist).map(
                    ([category_name, document_array]) => ({
                        category_name,
                        document_name: document_array
                    })
                )
            };

            if (!this.checklistName || Object.keys(this.documentsByChecklist).length === 0) {
                return errorAlert('Checklist name and documents are required.');
            }

            try {
                if (this.mode === 'add') {
                    await adminPost(`/checklist-add`, [checklistFormatted]);
                    successAlert('Checklist added successfully');
                } else {
                    await adminPut(`/checklist-update/${this.currentEditId}`, checklistFormatted);
                    successAlert('Checklist updated successfully');
                }
                this.resetForm();
                this.init();
            } catch (err) {
                console.error(err);
                errorAlert('Something went wrong');
            }
        },


        removeDoc(category, index) {
            this.documentsByChecklist[category].splice(index, 1);
            // Optional: delete empty category
            if (this.documentsByChecklist[category].length === 0) {
                delete this.documentsByChecklist[category];
            }
        },

        async addLanguage() {
            this.addModal = false;
            this.loading = true;
            await adminPost(`/languages-add`, this.language).then(
                async (response) => { },
            );
            this.init();
        },
        // async deleteLanguage(i) {
        //   if (await deleteConfirm('Do You Want to delete this Labguage')) {
        //     this.loading = true;
        //    const res= await adminDelete(`/languages-delete/${i}`);


        //   }
        // },

        async deleteLanguage(i) {
            if (await deleteConfirm('Do You Want to delete this Checklist?')) {
                this.loading = true;

                const res = await adminDelete(`/checklist-delete/${i}`);

                if (res.status) {

                    await this.init();
                    successAlert('Checklist Deleted Successfully');
                } else {

                    this.loading = false;
                }
            }
        },
        addField() {
            this.language.label.push('');
        },
        addupdateField() {
            this.updateData.label.push('');
        },

        editItem(i) {
            this.mode = 'edit';
            this.currentEditId = i._id;
            this.checklistName = i.checklist_name;

            // Transform checklist_data array into object format
            this.documentsByChecklist = {};
            i.checklist_data.forEach((item) => {
                this.documentsByChecklist[item.category_name] = [...item.document_name];
            });
this.originalData = JSON.parse(
        JSON.stringify({
          checklist_name: this.checklistName,
          checklist_data: this.documentsByChecklist,
        })
      );
            this.addModal = true;
        },

        resetForm() {
            this.mode = 'add';
            this.currentEditId = null;
            this.checklistName = '';
            this.checkDocName = '';
            this.selectChecklist = '';
            this.documentsByChecklist = {};
               this.originalData = null;
            this.addModal = false;
        }


    },
};
</script>

<style scoped>
@import url('./style.css');
</style>
