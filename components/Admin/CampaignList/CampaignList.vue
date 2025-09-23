<template>
  <div class="campaign-list-wrapper">
    <div class="campaign-list-top">
      <div class="flex items-center gap-[15px]">
        <h1 class="title" @click="redirectionLead(campaign._id)">{{ campaign.campaign_name }}</h1>
        <!-- <label class="switch ">
          <input type="checkbox" :checked="campaign.is_active" @change="handleCheck()" />
          <span class="slider"></span>
        </label> -->
        <label class="switch">
          <input type="checkbox" :checked="campaign.is_active" @change="handleCheck(campaign, $event)" />

          <!-- <input type="checkbox" :checked="campaign.is_active" @change="handleCheck(campaign)" /> -->
          <span class="slider"></span>
        </label>
      </div>
      <div>
        <!-- <AvatarGroup>
                    <Avatar v-for="(manager, index) in campaign.managers" :key="index" 
                        :label="manager.name.charAt(0)"
                        shape="circle"
                        class="campaign-avatar" />
                    <Avatar v-if="campaign.managers.length > 3" 
                        :label="`+${campaign.managers.length - 3}`" 
                        shape="circle"
                        class="campaign-avatar" />
                </AvatarGroup>
                 -->

        <AvatarGroup>
          <div v-for="(manager, index) in campaign.managers.slice(0, 3)" :key="index" class="relative group">
            <a class="avatars__item cursor-pointer">
              <Avatar :label="manager.name.charAt(0)" shape="circle" class="campaign-avatar" />
            </a>

            <!-- Tooltip -->
            <div
              class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-10">
              <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
              <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {{ manager.name }}
              </div>

            </div>
          </div>

          <!-- Extra +N avatar -->
          <div v-if="campaign.managers.length > 3" class="relative group">
            <a class="avatars__item cursor-pointer">
              <Avatar :label="`+${campaign.managers.length - 3}`" shape="circle" class="campaign-avatar" />
            </a>
            <!-- Tooltip with remaining names -->
            <div
              class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-10">
              <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
              <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {{campaign.managers.slice(3).map(m => m.name).join(', ')}}
              </div>
            </div>
          </div>
        </AvatarGroup>

      </div>
    </div>
    <div class="campaign-list-bottom">
      <p class="subtitle">{{ formatDate(campaign.createdAt) }}</p>
      <!-- <div class="campaign-action">
        <i class="bi bi-graph-up" @click="filterFunnelLeads"></i>
        <i class="bi bi-pencil-square" v-show="me?.user?.role == 'Admin' || permission?.campaign?.edit"
          @click="editCampaign"></i>
        <i class="bi bi-copy" @click="copyCampaign"></i>
        <i class="bi bi-trash-fill" v-show="me?.user?.role == 'Admin' || permission?.campaign?.delete"
          @click="confirmDelete"></i>
      </div> -->
      <div class="campaign-action">
  <!-- Funnel -->
  <div class="relative group">
    <i class="bi bi-graph-up"></i>
    <div
      class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-10">
      <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
      <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
        View Funnel
      </div>
    </div>
  </div>

  <!-- Edit -->
  <div v-show="me?.user?.role == 'Admin' || permission?.campaign?.edit" class="relative group">
    <i class="bi bi-pencil-square" @click="editCampaign"></i>
    <div
      class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-10">
      <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
      <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
        Edit Campaign
      </div>
    </div>
  </div>

  <!-- Copy -->
  <div class="relative group">
    <i class="bi bi-copy" @click="copyCampaign"></i>
    <div
      class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-10">
      <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
      <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
        Copy Campaign
      </div>
    </div>
  </div>

  <!-- Delete -->
  <div v-show="me?.user?.role == 'Admin' || permission?.campaign?.delete" class="relative group">
    <i class="bi bi-trash-fill" @click="confirmDelete"></i>
    <div
      class="fixed  right-[-24px] transform -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-[2000]">
      <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
      <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap ">
        Delete Campaign
      </div>
    </div>
  </div>
</div>

    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <DeleteModal :isVisible="showDeleteDialog" @close="showDeleteDialog = false" @confirm="handleDelete" />
</template>

<script>
import AvatarGroup from 'primevue/avatargroup';
import DeleteModal from '~/components/Modals/DeleteModal/DeleteModal.vue';

export default {
  components: {
    AvatarGroup,
    DeleteModal
  },
  data() {
    return {
      defaultAvatar: '/img/png/default-avatar.png',
      showDeleteDialog: false
    }
  },
  async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me };
  },
  props: {
    campaign: {
      type: Object,
      required: true
    }
  },
  methods: {
    redirectionLead(campaign_name) {
      this.$router.push({ path: '/admin/leads/view', query: { campaign_name: campaign_name } })
    },
    // async handleCheck(item) {
    //   item.is_active = !item.is_active;
    //   const data = await adminPatch(`/update-campaign-flag/${item._id}/${item.is_active}`);
    //   if (data.data.status) {
    //     successAlert("Successfully update the campaign")
    //   }
    // },


    // async handleCheck(item) {

    //   this.pendingPriority = value; // Store clicked value temporarily
    //   item.is_active = !item.is_active;
    //   const confirmed = await askConfirm(
    //     'Pausing this campaign will temporarily disable all lead grouping views, active integrations, and associated automation. Are you sure you want to proceed?',
    //     item.campaign_name,
    //     'Update',
    //     'No'
    //   );
    //   if (confirmed) {
    //     const data = await adminPatch(`/update-campaign-flag/${item._id}/${item.is_active}`);
    //   }

    // },

    async handleCheck(item, event) {
      const newStatus = event.target.checked; // actual checkbox value

      const confirmed = await askConfirm(
        'Pausing this campaign will temporarily disable all lead grouping views, active integrations, and associated automation. Are you sure you want to proceed?',
        item.campaign_name,
        'Update',
        'No'
      );

      if (confirmed) {
        try {
          const data = await adminPatch(`/update-campaign-flag/${item._id}/${newStatus}`);

          if (data?.status) {
            this.$emit("update-status", { id: item._id, is_active: data.data.is_active });
            successAlert("Successfully updated the campaign");
          }
        } catch (err) {
          console.error("Error updating campaign status:", err);
          errorAlert("Failed to update campaign");
        }
      } else {
        // rollback UI if canceled
        event.target.checked = !newStatus;
      }
    },




    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
    },
    confirmDelete() {
      this.showDeleteDialog = true;
    },
    handleDelete() {
      this.$emit('delete-campaign', this.campaign);
      this.showDeleteDialog = false;
    },
    copyCampaign() {
      this.$emit('copy-campaign', this.campaign);
    },
    filterFunnelLeads() {
      this.$emit('filter-funnel-leads', this.campaign);
    },
    editCampaign() {
      this.$emit('edit-campaign', this.campaign);
    }
  }
};
</script>

<style scoped>
.campaign-list-wrapper {
  background-color: var(--background-white);
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.campaign-list-top,
.campaign-list-bottom {
  display: flex;
  align-items: center;
  gap:15px;
  justify-content: space-between;
}

.campaign-list-top .title {
  margin-bottom: 0;
  font-size: 17px;
  font-weight: 700;
  color: #150A33;
  cursor: pointer;
}

.campaign-list-bottom .subtitle {
  margin-bottom: 0;
  color: #524B6B;
  font-size: 14px;
  font-weight: 400;
}

.campaign-action {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.campaign-avatar {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: 600;
}


/* Toggle switch wrapper */
.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
}

/* Hide the default checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider (background) */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

/* Circle inside the slider */
.slider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

/* Checked state */
input:checked+.slider {
  background-color: #4ade80;
  /* Green (active) */
}

input:checked+.slider::before {
  transform: translateX(22px);
}
</style>