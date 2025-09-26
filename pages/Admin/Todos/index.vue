<template>
  <div class="todo-container">
    <div class="todo-wrapper">
      <div class="todo-row1">
        <button :class="{ 'todo-row1-button1': true, active: status == '' }" @click="todo('')">
          All
        </button>
        <button :class="{ 'todo-row1-button2': true, active: status == 'pending' }" @click="todo('pending')">
          Pending
        </button>
        <button :class="{ 'todo-row1-button3': true, active: status == 'completed' }"
          @click="todo('completed')">Completed</button>
      </div>
      <div class="todo-row2">
        <button class="todo-row2-button mb-4" @click=" selectedUsers=[];AddModal = true">
          <i class="bi bi-plus" style="font-size: 1.25rem;"></i>Add New Todo
        </button>
      </div>
    </div>
  </div>

  <DataView :value="allTodos" paginator :rows="8" :alwaysShowPaginator="false">
    <template #empty>
      <div class="alltodo-main-container" v-if="loading.p">
        <div class="alltodo-container1 alltodo-white" v-for="i in 6">
          <div class="alltodo-wrapper">
            <div class="alltodo-row1 ms-2">
              <div class="alltodo-row1-col1">
                <Skeleton width="30px" height="30px" shape="circle"></Skeleton>
                <h2 style="text-decoration: none;">
                  <Skeleton width="10vw" height="30px"></Skeleton>
                </h2>
              </div>
            </div>
            <div class="alltodo-row1">
              <div class="alltodo-row1-col1">
                <h2 style="text-decoration: none;">
                  <Skeleton width="10vw" height="30px"></Skeleton>
                </h2>
              </div>
            </div>
            <div class="alltodo-row2">
              <p class="alltodo-row2-text"></p>
              <div><button class="">
                  <Skeleton width="10vw" height="30px"></Skeleton>
                </button></div>
            </div>
            <hr id="row2-horizontal">
            <div class="alltodo-row3">
              <div class="alltodo-row3-col1">
                <div class="todo-row-image">
                  <Skeleton width="50px" height="50px" shape="circle"></Skeleton>
                </div>
                <div class="alltodo-row3-col2">
                  <p>
                    <Skeleton width="10vw" height="30px"></Skeleton>
                  </p>
                </div>
              </div>
              <div class="alltodo-row3-col3">
                <Skeleton width="40px" height="40px" shape="circle"></Skeleton>
              </div>
            </div>
            <div class="alltodo-row4">
              <div class="alltodo-row4-col1">
                <Skeleton width="50px" height="50px" shape="circle"></Skeleton>
                <p id="alltodo-row4-date">
                  <Skeleton class="mt-3" width="10vw" height="30px"></Skeleton>
                </p>
              </div>
              <div class="delete-button">
                <Skeleton width="40px" height="40px" shape="circle"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmptyContent  v-else :title="'Add First Task'" :desc="'No Todos Found'" style="margin-left: 0px !important; padding-left: 0px !important;"/>
    </template>
    <template #list="s">
      <div class="alltodo-main-container">
        <div v-for="(item, index) in s.items" :key="index" class="alltodo-container1" :class="{
          'alltodo-check': item.status !== 'pending',
          'alltodo-white': item.status === 'pending',
        }">
          <div class="alltodo-wrapper">
            <div class="alltodo-row1 ">
              <div class="alltodo-row1-col1">

                <div v-if="item.status == 'pending'" class="input-box-todo" :style="{ backgroundColor: 'transparent' }"
                  @click="Complete(item._id)">
                  <i class="bi bi-check-lg" id="check"></i>
                </div>
                <div v-else class="input-box-todo" :style="{ backgroundColor: 'black' }" @click="Pending(item._id)">
                  <i class="bi bi-check-lg" id="check"></i>
                </div>
                <h2 :style="{ textDecoration: item.status === 'completed' ? 'line-through' : 'none' }">
                  {{ item.title }}
                </h2>
              </div>
              <NuxtLink :to="`/admin/Todos/Detail/${item._id}`">
                <i class="bi bi-chevron-right" id="singleview-todo"></i>
              </NuxtLink>
            </div>
            <div class="alltodo-row2">
              <p class="alltodo-row2-text" v-html="item.description.length>80?item.description.slice(0,80)+'...':item.description"></p>
              <div>
                <button class="alltodo-row2-button"> {{calculateDaysLeft(item.end)}}</button>
              </div>
            </div>
            <hr id="row2-horizontal" />
            <div class="alltodo-row3">
              <div class="alltodo-row3-col1">
                <div class="todo-row-image">
                  <div class="image-container" v-for="imageUrl in item.assign_to.slice(0, 2)" :key="imageUrl">
                    <img :src="imageUrl" class="image-item" alt="profile" />
                  </div>
                  <span :style="{ display: item.assign_to.length > 2 ? 'inline-block' : 'none' }">
                    {{ item.assign_to.length > 2 ? `+${item.assign_to.length - 2}` : '' }}
                  </span>
                </div>
                <div class="alltodo-row3-col2">
                  <p>Assignee</p>
                  <h5 class="assignee-names" v-if="item.assign_data.length > 0 && item.assign_data[0].name" @click="openModal(item.assign_data)">
                    {{ item.assign_data.length > 1 ? item.assign_data.slice(0, 2).map(i => i.name).join(', ') + (item.assign_data.length > 2
                    ? `, +${item.assign_data.length - 2}` : '') : item.assign_data[0].name }}
                  </h5>
                  <h5 v-else>
                    No assigned data
                  </h5>

                </div>
              </div>
              <div class="alltodo-row3-col3">
                <BootstrapIcon name="pencil-square" class="icon2" @click="setId(item)" />
              </div>
            </div>
            <div class="alltodo-row4">
              <div class="alltodo-row4-col1">
                <img src="/img/png/calender.png" id="alltodo-calander" alt="calender-logo" />
                <p id="alltodo-row4-date">
                  Created Date: {{ item.created_date.split('T')[0] }}
                </p>
              </div>
              <div class="delete-button">
                <BootstrapIcon name="trash" class="icon2" @click="deleteTodo(item._id)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>




  <Dialog v-model:visible="AddModal" modal header="Add Todo"  :style="{ width: '40vw !important' }">
    <FormKit type="form" @submit="submitForm_add">
      <div class="Addtask-container">
        <div class="Addtask-row2">
          <label>Task Title</label>
          <div class="Addtask-title">
            <FormKit validation="required" type="text" name="title" placeholder="Task Title" />
          </div>
        </div>
        <div class="Addtask-member">
          <label>Assign to</label>
          <MultiSelect v-model="selectedUsers" display="chip" :options="all_emoloyee" optionLabel="name" filter
            placeholder="Select Subadmins" class="w-full md:w-80" />
        </div>
        <div class="Addtask-row3">
          <label>Due date </label>
          <div class="Addtask-date">
            <FormKit validation="required" type="date" name="end" placholder="dd/mm/year" />
          </div>
        </div>
        <div class="Addtask-row4">
          <label>Assign Description</label>
          <div class="Addtask-description">
            <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />
            <!-- <FormKit validation="required" as="textarea" name="description" placeholder="add your description here" /> -->
          </div>
        </div>
        <div class="Addtask-row5">
          <!-- <button class="btnone" @click="AddModal = false">Go back</button> -->
          <Button type="submit" class="btntwo" label="Add Task" icon="pi pi-save" @click="draft" :loading="loading.a" />
        </div>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="UpdateModal" modal header="Update Todo" :style="{ width: '40vw !important' }">
    <FormKit type="form" @submit="submitForm_update" :value="current_id">
      <div class="Addtask-container">
        <div class="Addtask-row2">
          <label>Task Title</label>
          <div class="Addtask-title">
            <FormKit validation="required" type="text" name="title" placeholder="Task Title" />
          </div>
        </div>
        <div class="Addtask-member">
          <label>Assign to</label>
          <MultiSelect v-model="selectedUsers" display="chip" :options="all_emoloyee" optionLabel="name" filter
            placeholder="Select Subadmins" class="w-full md:w-80" />
        </div>
        <div class="Addtask-row3">
          <label>Due date </label>
          <div class="Addtask-date">
            <FormKit validation="required" type="date" name="end" placholder="dd/mm/year" />
          </div>
        </div>
        <div class="Addtask-row4">
          <label>Assign Description</label>
          <div class="Addtask-description">
            <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />

            <!-- <FormKit validation="required" as="textarea" name="description" placeholder="add your description here" /> -->
          </div>
        </div>
        <div class="Addtask-row5">
          <!-- <button class="btnone" @click="AddModal = false">Go back</button> -->
          <Button type="submit" class="btntwo" label="Edit Task" icon="pi pi-save" :loading="loading.a" />
        </div>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="isModalOpen" modal header="Selected Assignees" :draggable="false" :closable="true" :style="{ width: '50vw' }">
    <ul>
      <li v-for="(user, index) in selectedUsers">{{index+1}}. {{ user.name }}</li>
    </ul>
  </Dialog>

</template>

<script>
import EmptyContent from '~/components/ExtraComponents/EmptyContent.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
definePageMeta({
  layout: 'admin',
  middleware: ['admincrm'],
});

export default {
  name: 'AllTodos',
  data() {
    return {
      loading: { p: false, a: false, u: false },
      all_emoloyee: null,
      selectedUsers: [],
      AddModal: false,
      UpdateModal: false,
      allTodos: null,
      current_id: null,
      current: null,
      editdata: null,
      imageUrls: [],
      lvalue: null,
      status: '',
      myform: null,
      myform_edit: null,
      isModalOpen: false,
      
    };
  },
  components: {
    EmptyContent,
    QuillEditor,
  },
  async mounted() {
    activateMenu('Todos', 'Todos');
    await this.todo('');
    this.all_emoloyee = (await adminGet(`/all-employe`)).data.emp.map((i) => ({
        name: i.user_id.name,
        code: i.user_id.email,
      }));

    

    document.querySelectorAll('.p-paginator, .p-component').forEach(element => {
      element.style.backgroundColor = '#e7ecf8';
    });

  },

  methods: {
    calculateDaysLeft(targetDate) {
      const currentDate = new Date(); 
      const target = new Date(targetDate); 
      const diffInMilliseconds = target - currentDate;
      const daysLeft = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Divide by ms in a day
      if (daysLeft === 1) {
        return "1 Day Left";
      } else if (daysLeft < 0) {
        return "Date Passed";  // Optionally, you can return "Date Passed" if the date has already passed
      } else {
        return `${daysLeft} Days Left`;
      }
    },
    async todo(i) {
      this.allTodos=[]
      this.status = i;
      this.loading.p = true
      await adminGet(`/alltodo/${i}`).then((Response) => {
        this.allTodos = Response.data.todos;
      });
      this.loading.p = false
    },
    setId(item) {
    
      this.current_id = item;
      this.current_id.end = this.current_id.end.split("T")[0];
      this.selectedUsers = item.assign_data.map(i => {
        let found = this.all_emoloyee.find(item => item.code === i.email);
        return found ? { name: found.name, code: found.code } : null;
      });
      this.UpdateModal = true
      this.$nextTick(() => {
        this.$refs.qhtml.setHTML(this.current_id.description);
    });

    },
    async submitForm_add(v) {
      if (this.selectedUsers.length == 0) {
        errorAlert("Select Atleast One Subadmin")
      } else {
        this.loading.a = true;
        v.assign_to = this.selectedUsers.map(i => (i.code));
        v.description = this.$refs.qhtml.getHTML()
        await adminPost(`/todo-add`, v);
        await this.todo('')
        this.loading.a = false;
        this.AddModal = false;
        this.selectedUsers=[];
      }
    },
    async submitForm_update(v) {
      if (this.selectedUsers.length == 0) {
        errorAlert("Select Atleast One Subadmin")
      } else {
        this.loading.a = true;
        v.assign_to = this.selectedUsers.map(i => (i.code));
        v.description = this.$refs.qhtml.getHTML()
        await adminPut(`/update-todo/${this.current_id._id}`, v);
        await this.todo('')
        this.loading.a = false;
        this.UpdateModal = false;
        this.selectedUsers=[]
      }
    },
    async deleteTodo(i) {
      if (await deleteConfirm('Do you want to delete this task?')) {
        await adminDelete(`/todo-delete/${i}`);
        successAlert('Task deleted successfully!');
      }
      await this.todo('')
    },
    async Complete(i) {
      if (await askConfirm('You are about to mark this assigned task as completed. Please confirm if you want to proceed.', 'Task Completion Confirmation', 'Mark Completed', 'Cancel')) {
        await adminPut(`/todo-completed/${i}`);
        successAlert('Mark the task as completed!');
      }
      await this.todo('')
    },
    async Pending(i) {
      if (await askConfirm('Are you sure you want to reopen this task? Marking it as open will move it back to the pending list.', 'Task Reopening Confirmation', 'Mark Pending', 'Cancel')) {
        this.loading.p = true
        await adminPut(`/todo-pending/${i}`);
        successAlert('Reopend the task!');
      }
      await this.todo('')
    },

    async openModal(users) {
      // Set the selected users and open the modal
      this.selectedUsers = users;
      this.isModalOpen = true;
    },
   async closeModal() {
      // Close the modal
      this.isModalOpen = false;
      this.selectedUsers = []; // Clear selected users when modal is closed
    },

  },
};
</script>

<style scoped>
@import url('style.css');

.assignee-names {
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  /* Smooth transition for hover */
}

.assignee-names:hover {
  white-space: normal;
  /* Allow wrapping on hover */
  line-height: 1.5;
  /* Ensure proper line spacing */
  word-wrap: break-word;
  /* Ensure long names break into the next line if necessary */
}

.assignee-names:hover::after {
  content: attr(data-names);
  /* Show the full list of names when hovered */
}
</style>
