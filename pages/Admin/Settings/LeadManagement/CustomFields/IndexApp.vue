<!-- @format -->

<template>
  <div class="languages ">
    <div class="btn-container">
      <span id="languages-heading">Custom Fields</span>
      <div class="custom cursor-pointer">
        <span id="add-btn" @click="addModal = true"><i class="bi bi-plus" style="font-size: 1.25rem; "></i> Add</span>
      </div>
    </div>
    <div  class="break-line"></div>
    <section>
      <table v-if="loading">
        <tbody>
          <tr v-for="i in 2" :key="i">
            <td v-for="j in 4" :key="j">
              <Skeleton></Skeleton>
            </td>
          </tr>
        </tbody>
      </table>

      <DataTable v-else v-model:selection="selectedField" :value="fields" dataKey="id" tableStyle="min-width: 50rem">
 
        <Column field="field_type" header="Field Type"></Column>
        <Column field="field_name" header="Field Name"></Column>
        <Column  header="Field Name">
          <template #body="slotProps">
            <span v-if="slotProps.data.required">{{ slotProps.data.field_name}} *</span>
            <span v-else>{{ slotProps.data.field_name}}</span>
          </template>
        </Column>

        <Column field="createdby" header="Created By">
          <template #body="slotProps">
            <span>{{ slotProps.data?.createdby?.name || 'Default' }}</span>
          </template>
        </Column>
        <!-- <Column field="_id" header="Action">
          <template #body="slotProps">
            <div  class="btn-group">
              <span class="td-btn" @click="editItem(slotProps)">
                <img src="/img/svg/edit.svg" alt="Edit" />
              </span>
              <span   class="td-btn" @click="deleteItem(slotProps)">
                <img src="/img/svg/trash.svg" alt="Delete" />
              </span>
            </div>
          </template>
        </Column> -->
        <Column header="Action">
        <template #body="slotProps">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(slotProps)"> </SplitButton>
          </div>
        </template>
      </Column>
        <template #empty>
            <div  class="text-center text-gray-400 mt-3 text-[18px]">
              No data found
            </div>
       </template>
      </DataTable>
      
    </section>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Custom Field" :style="{'min-width':'350px'}" :draggable="false">
    <div class="upload-image-box">
      <div class="input-field">
        <label for="field-name">Field Name</label>
        <input v-model="data.field_name" type="text" placeholder="-----------------------" />
      </div>
      <div class="input-field">
        <label for="field-name">Field Type</label>
        <select name="text-area" v-model="data.field_type" id="">
          <option value="textarea">Text Area</option>
          <option value="input">Input</option>
          <option value="dropdown">dropdown</option>
        </select>
      </div>
      <div v-if="data.field_type === 'dropdown'">
        <div class="input-field">
          <label for="field-name">dropdown Count</label>
          <select name="text-area" @change="updateCount" v-model="count" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div class="input-field" v-for="(i, index) in data.dropdownOptions">
          <label for="field-name">dropdown Option {{ index + 1 }}</label>
          <input v-model="data.dropdownOptions[index]" type="text" placeholder="-----------------------" />
        </div>
      </div>

      <div class="checkbox">
        <input v-model="data.required" type="checkbox" />
        <span> Required </span>
      </div>
      <div class="button-container gap-3">
        <!-- <span id="back-btn" @click="addModal = false">Go back</span> -->
        <Button id="upload-btn" type="button" label="Upload" icon="pi pi-save" :loading="loading" @click="submitForm" />
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="updateModal" modal header="Update Custom Field" :style="{'min-width':'350px'}" :draggable="false">

      <div class="upload-image-box">
        <div class="input-field">
          <label for="field-name">Field Name</label>
          <input v-model="updateData.field_name" type="text" placeholder="-----------------------" />
        </div>
        <div class="input-field">
          <label for="field-name">Field Type</label>
          <select name="text-area" v-model="updateData.field_type" id="">
            <option value="textarea">Text Area</option>
            <option value="input">Input</option>
            <option value="dropdown">dropdown</option>
          </select>
        </div>
        <div v-if="updateData.field_type === 'dropdown'">
          <div class="input-field">
            <label for="field-name">dropdown Count</label>
            <select name="text-area" @change="updateCount" v-model="count" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div class="input-field" v-for="(i, index) in updateData.dropdownOptions">
            <label for="field-name">dropdown Option {{ index + 1 }}</label>
            <input v-model="updateData.dropdownOptions[index]" type="text" placeholder="-----------------------" />
          </div>
        </div>

        <div class="checkbox">
          <input v-model="updateData.required" type="checkbox" />
          <span> Required </span>
        </div>
        <div class="button-container gap-3">
          <!-- <span id="back-btn" @click="updateModal = false">Go back</span> -->
          <Button id="upload-btn" type="button" label="Update" icon="pi pi-save" :loading="loading"
            @click="updateForm()" />
        </div>
      </div>

  </Dialog>
</template>

<script>
export default {
  data() {
    return {
      addModal: false,
      updateModal: false,
      updateData: null,
      selectedField: null,
      loading: true,
      fields: null,
      count: 1,
      data: {
        required: false,
        dropdownOptions: [null],
        field_type: 'Text Area',
        field_name: null,
        field_id: null,
      },
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
      getItems(slotProps) {
      return [
        {
          label: 'Edit',
          command: () => {
            this.editItem(slotProps)
          },
        },
     
        {
          label: 'Delete',
          command: () => {
            this.deleteItem(slotProps)
          },
        },
      ];
    },
    async init() {
      this.loading = true;
      this.data.field_name = null;
      await adminGet(`/custom-field`).then(async (response) => {
        this.fields = response.data.customFields.splice(1);
      });
      this.loading = false;
    },
    async submitForm() {
      this.addModal = false;
      this.loading = true;
      this.data.field_id = this.data.field_name.trim().toLowerCase().replace(/\s+/g, '_')
      await adminPost(`/custom-field`, this.data).then((response) => {
        this.init();
      });
    },
    async updateForm() {
      this.loading = true;
      await adminPut(
        `/custom-field/${this.updateData._id}`,
        this.updateData,
      ).then((response) => {
        this.updateModal = false;
        this.init();
      });
    },
    updateCount() {
      this.data.dropdownOptions = [];
      for (let i = 0; i < this.count; i++) {
        this.data.dropdownOptions.push(null);
      }
    },
    editItem(i) {
      this.updateModal = true;
      this.updateData = i.data;
    },
    async deleteItem(i) {
      if (await deleteConfirm('Do You Want to delete this Field?')) {
        this.loading = true;
        await adminDelete(`/custom-field/${i.data._id}/${i.data.field_id}`, this.data);
        this.init();
      }
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
