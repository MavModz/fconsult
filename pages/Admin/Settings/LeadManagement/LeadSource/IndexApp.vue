<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Lead Source</span>
      <span class="cursor-pointer" id="add-btn" @click="addModal = true"><i class="bi bi-plus" style="font-size: 1.25rem;"></i> Add</span>
    </div>
    <div class="break-line"></div>
    <div class="flex-container">
      <section>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Source Name</th>
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
              <td>{{ i.sourcename }}</td>
              <td>
                <!-- <div  class="btn-group">
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
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add New Source" :style="{'min-width':'350px'}" :draggable="false">
    <form @submit.prevent="submitForm">
      <div class="input-field">
          <label>Source Name</label>
        <input
          v-model="newSource"
          type="text"
          placeholder="Enter Source name"  @paste.prevent="onPaste($event)"
        />
      </div>
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </form>
  </Dialog>
  <Dialog v-model:visible="updateModal" header="Update Source" :style="{'min-width':'350px'}" modal>
    <form @submit.prevent="updateForm">
      <div class="input-field">
        <label>Source Name</label>
        <input
          v-model="sourcename"
          type="text"
          placeholder="Enter Source Name"  @paste.prevent="onPaste($event)"
        />
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
      sourcename: null,
      newSource: "",
    }
  },
  async mounted() {
    await this.init()
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
      this.loading = true
      await adminGet(`/leadsource`).then(async (response) => {
        this.fields = response.data.leadsource;
      })
      this.loading = false
    },
    setData(i) {
      this.updateModal = true
      this.id = i._id
      this.sourcename = i.sourcename
    },
      validateField(value) {
      if (!value || value.trim() === "") {
        errorAlert("Field cannot be empty");
        return false;
      }
      if (/^\s/.test(value)) {
        errorAlert("First character cannot be a space");
        return false;
      }
      // Block emojis
      if (/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u.test(value)) {
        errorAlert("Emojis are not allowed");
        return false;
      }
       if (value.length < 3 || value.length > 30) {
    errorAlert("Source name must be between 3 and 30 characters");
    return false;
  }
      // Alphabets only
      if (!/^[A-Za-z ]+$/.test(value)) {
        errorAlert("Only alphabets allowed");
        return false;
      }
      return true;
    },
    async submitForm(v) {
       if (!this.validateField(this.newSource)) return;
      this.loading = true
      this.addModal = false
      // await adminPost(`/leadsource-add`, v).then((response) => {
      // })
      await adminPost(`/leadsource-add`, { sourcename: this.newSource });
      await this.init();
      successAlert("Lead Source Added Successfully");
      this.newSource = "";
    },
    onPaste(event) {
  const pastedText = (event.clipboardData || window.clipboardData).getData("text");
  // Prevent if pasted content contains emojis
  if (/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u.test(pastedText)) {
    errorAlert("Pasting emojis is not allowed");
    return;
  }
  // Manually insert sanitized text
  const sanitized = pastedText.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
  const input = event.target;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const value = input.value;
  input.value = value.slice(0, start) + sanitized + value.slice(end);
  // Trigger v-model update manually
  const model = input.getAttribute('v-model');
  if (model === 'newSource') {
    this.newSource = input.value;
  } else if (model === 'sourcename') {
    this.sourcename = input.value;
  }
},
    async updateForm(v) {
       if (!this.validateField(this.sourcename)) return;
      this.updateModal = false
      this.loading = true
      // await adminPut(`/leadsource-update/${this.id}`, v).then((response) => {
      // })
      await adminPut(`/leadsource-update/${this.id}`, { sourcename: this.sourcename });
      await this.init();
      successAlert("Lead Source Updated Successfully");
    },
    async deleteStatus(v) {
    if (await deleteConfirm('Do You Want to delete this Lead Source')) {
        this.loading = true;
        const res = await adminDelete(`/leadsource-delete/${v}`)
        if (res.status) {          
            await this.init();
            successAlert('Lead source Deleted Successfully');
        } else {
           
            this.loading = false; 
        }
    }
}
  },
}
</script>

<style scoped>
@import url('style.css');
</style>
