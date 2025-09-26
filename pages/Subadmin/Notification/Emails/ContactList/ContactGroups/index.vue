<template>

  <div class="bg-white mt-[22px] px-[35px] py-[30px] border-[2px] border-[#ededed]  rounded-[18px]">
    <!-- Top Filter Row -->
    <div class="flex flex-wrap items-center justify-between">
      <!-- Search Bar -->

      <div class="sm:py-[11px] py-[8px] flex items-center gap-2 px-[12px] sm:px-[15px] w-[192px] xl:w-[300px] rounded-[29px] border border-[#D1E4E8]">
        <i class="bi bi-search text-[#9393C1]"></i>
        <input @input="filterGroup()" v-model="searchQuery" type="text" placeholder="Search............"
          class="border-0 p-0 text-[#a5a5a5] text-[16px]" />
      </div>

    </div>


    <div class="border divide border-[#ededed] my-[15px] sm:my-[22px] md:my-[30px]"></div>


    <DataTable :value="groups" class="rounded-[20px] m-0 border border-[#E2E8F0]" responsiveLayout="scroll"
      :paginator="false">

      <Column header="Group">
        <template #body="{ data }">
          <div class="font-semibold text-[#1B2128]">{{ data.group_name }}</div>
        </template>
      </Column>

      <Column header="Created On">
        <template #body="{ data }">
          <div v-if="data.created_date">
            <div class="text-[#1B2128] font-semibold">
              {{ new Date(data.created_date).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }) }}
            </div>
            <div class="text-[#475569]">
              {{ new Date(data.created_date).toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: '2-digit',
                minute: '2-digit'
              }) }}
            </div>
          </div>
          <div v-else>
            <div class="text-[#1B2128] font-semibold">—</div>
            <div class="text-[#475569]">—</div>
          </div>
        </template>
      </Column>


      <Column header="Contact Count">
        <template #body="{ data }">
          <div class="text-[#676B6C]">{{ data.count }}</div>
        </template>
      </Column>

      <Column header="Linked Campaign">
        <template #body="{ data }">
          <div class="text-[#676B6C]">{{ data.count }}</div>
        </template>
      </Column>

      <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
          </div>
        </template>
      </Column>
    </DataTable>

  </div>


  <Dialog v-model:visible="AddGroup" modal header="Add Group"
    class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
    <FormKit type="form" @submit="EditGroup" class="leads-form-style">
      <div>
        <label class="single-lead-cmttitls">New Group</label><br />
        <FormKit validation="required" v-model="group_name" name="group_name" class="single-lead-cmt-mdlo" type="text"
          placeholder="------" />
      </div>
      <div class="modal-footer-section">
        <button type="submit" class="mt-4  rounded px-4 py-2 followup-btn-btn-dle-appt">Edit</button>
      </div>
    </FormKit>
  </Dialog>

</template>
<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
export default {

  data() {
    return {
      open: false,
      selected: 'Contact List Name',
      contactLists: ['Leads', 'Customers', 'Subscribers'],
      searchQuery: '',
      status: 'Bounce',
      showDropdown: false,
      activeDropdown: null,
      currentPage: 0,
      NewEmailOpen: false,
      showFilterSidebar: false,
      rowsPerPage: 10,
      selectedUsers: [],
      groups: [],
      AddGroup: false,
      group_name: "",
      group_id: null,
           permission:null,
    }
  },
  computed: {
    filteredRows() {
      if (!this.searchQuery) return this.rows;
      const q = this.searchQuery.toLowerCase();
      return this.rows.filter(
        (row) =>
          row.name.toLowerCase().includes(q) ||
          row.email.toLowerCase().includes(q) ||
          row.status.toLowerCase().includes(q)
      );
    }
  },
  async mounted(){
  this.getPermission();
  },
   async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      this.showFilterSidebar = false;
    },
    async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
getItems(row) {
  const items = [
    {
      label: 'View',
      command: () => {
        this.GroupView(row);
      },
    },
  ];

  // Add Edit if row has _id AND user has edit permission
  if (row._id && this.permission?.notification?.email?.Contact_List?.edit) {
    items.splice(1, 0, {
      label: 'Edit',
      command: () => {
        this.GroupEdit(row);
      },
    });
  }

  // Add Delete if row has _id AND user has delete permission
  if (row._id && this.permission?.notification?.email?.Contact_List?.delete) {
    items.splice(2, 0, {
      label: 'Delete',
      command: () => {
        this.deleteGroup(row._id);
      },
    });
  }

  return items;
},
    // getItems(row) {
    //   const items = [
    //     {
    //       label: 'View',
    //       command: () => {
    //         this.GroupView(row)
    //       },
    //     },
    //   ];
    //   if (row._id) {
    //     items.splice(1, 0, {
    //       label: 'Edit',
    //       command: () => {
    //         this.GroupEdit(row)
    //       },
    //     });
    //   }
    //   if (row._id) {
    //     items.splice(1, 0, {
    //       label: 'Delete',
    //       command: () => {
    //         this.deleteGroup(row._id)
    //       },
    //     });
    //   }
    //   return items;
    // },
    toggleDropdown(index) {
      this.activeDropdown = this.activeDropdown === index ? null : index;
    },
    // handleClickOutside(event) {
    //   const dropdown = this.$el.querySelector('.dropdown-menu');
    //   if (dropdown && !dropdown.contains(event.target)) {
    //     this.showDropdown = false;
    //   }
    // },
    async groupList() {
      const data = await subadminGet("/view-group-list")
      if (data.data.status) {
        this.groups = data.data.data
      } else {
        this.groups = []
      }
    },
    async filterGroup() {
      const search = this.searchQuery?.toLowerCase().trim();

      if (!search) {
        return this.groupList();
      }

      return this.groups = this.groups.filter(contact =>
        contact.group_name?.toLowerCase().includes(search)
      );
    },
    GroupEdit(data) {
      this.AddGroup = true
      this.group_name = data.group_name
      this.group_id = data._id
    },

    async EditGroup(v) {
      try {
        const data = await subadminPatch(`/group-list/${this.group_id}`,v);
        console.log("data check,data", data)
        if (data && data.data && data.data.status) {
          successAlert("Successfully update the group")
          this.AddGroup=false
          this.groupList()
        } 
      } catch (error) {
       errorAlert("Somthing Went Wrong")
      }
    },
     async deleteGroup(i) {
      if (await deleteConfirm('Do You Want to delete this Group.')) {
        await subadminDelete(`/group-list/${i}`);
        this.groupList()
        successAlert('Group Deleted');
      }
    },
    async GroupView(data){
      this.$router.push({path:"/subadmin/notification/emails/contactlist/emptystate",query:{group_name:data.group_name}})
    }
  },
  mounted() {
    this.groupList()
    // document.addEventListener('click', this.handleClickOutside);

  },
  // beforeUnmount() {
  //   document.removeEventListener('click', this.handleClickOutside);
  // }
}
</script>
<style scoped>
.dropdown-menu {
  transition: all 0.2s ease;
}

/* .upload-option {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 3px 12px;
  margin-bottom: 4px;
  color: #4c5361;
  font-size: 15px;
  font-weight: 400;
  color:#454056;
  cursor: pointer;
}
.upload-option:hover, .dropdown-item:hover  {
  background-color: #e9e8ec;
}
.upload-option:last-child {
  margin-bottom: 0;
}

.icon i {
  font-size: 18px;
  color: var(--lighter-shade, #64748B);
  ;
}
.add-button {
    border: 1px solid #ff5757;
    background: #ff5757;
    color: #ffffff;
    padding: 10px 19px;
    border-radius: 117px;
    font-weight: 400;
    cursor: pointer;
    line-height: 150%;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.upload-card {
  background: #F5F4F8;
  box-shadow: 0px 5.98px 17.95px 0px #1F1B2D14;
  box-shadow: 0px 2.99px 2.99px -2.99px #1F1B2D14;
  border-radius: 18px;
  padding: 8px 4px;
  border: 1.5px solid #EFECF3;
  z-index: 999;
  width: 215px;
} */
</style>