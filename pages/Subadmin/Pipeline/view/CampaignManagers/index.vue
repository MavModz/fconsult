<template>
  <div>
    <Dialog 
      v-model:visible="campaignManagersModals" 
      modal 
      header="Campaign Managers" 
      :style="{ 'min-width': '60%' }"
    >
      <div class="campaign-managers-content">
        <div class="search-filter mb-4">
          <span class="p-input-icon-left">
            <input type="text" v-model="filters.global.value" placeholder="Search..." class="search-input" />
          </span>
        </div>

        <DataTable
          v-model:selection="selectedManagers"
          :value="managers"
          :filters="filters"
          filterDisplay="menu"
          :loading="loading"
          selectionMode="multiple"
          dataKey="_id"
          tableStyle="min-width: 50rem"
          class="p-datatable-sm scrollable-table"
          scrollable
          scrollHeight="400px"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem" :frozen="true"></Column>
          <Column field="name" header="Name" sortable style="min-width: 12rem">
            <template #body="{ data }">
              <div class="flex align-items-center gap-2">
                <Avatar 
                  :label="data.name.charAt(0)"
                  shape="circle"
                  size="small"
                  class="manager-avatar"
                />
                <span>{{ data.name }}</span>
              </div>
            </template>
          </Column>
          <Column field="role" header="Role" sortable style="min-width: 10rem">
            <template #body="{ data }">
              <span class="role-badge">{{ data.role }}</span>
            </template>
          </Column>
        </DataTable>

        <div class="selected-managers mt-3">
          <h4>Selected Managers ({{ selectedManagers.length }})</h4>
          <div class="selected-list">
            <div v-for="manager in selectedManagers" :key="manager._id" class="selected-item">
              <Avatar 
                :label="manager.name.charAt(0)"
                shape="circle"
                size="small"
                class="manager-avatar"
              />
              <span>{{ manager.name }}</span>
              <span class="role-badge">{{ manager.role }}</span>
              <i class="bi bi-x-circle-fill remove-icon" @click="removeManager(manager)"></i>
            </div>
          </div>
        </div>

        <div class="flex justify-content-end mt-4 gap-2">
          <Button 
            label="Cancel" 
            icon="pi pi-times" 
            @click="closeModal" 
            class="manager-close-btn"
          />
          <Button 
            label="Save" 
            icon="pi pi-check" 
            @click="saveSelection" 
            :disabled="!selectedManagers.length"
            class="manager-save-btn"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import { FilterMatchMode } from 'primevue/api';

export default {
  name: 'CampaignManagers',
  components: {
    Dialog,
    DataTable,
    Column,
    Button,
    InputText,
    Avatar
  },
  props: {
    initialSelectedManagers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      campaignManagersModals: false,
      managers: [],
      selectedManagers: [],
      loading: false,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        role: { value: null, matchMode: FilterMatchMode.EQUALS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  },
  methods: {
    async fetchManagers() {
      try {
        this.loading = true;
        const response = await subadminGet('/campaign-managers');
        this.managers = response.data.data.filter(user => user.role !== 'Admin');
        this.selectedManagers = this.initialSelectedManagers;
      } catch (error) {
        console.error('Error fetching managers:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch managers',
          life: 3000
        });
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.campaignManagersModals = false;
    },
    saveSelection() {
      this.$emit('managers-selected', this.selectedManagers);
      this.closeModal();
    },
    removeManager(manager) {
      this.selectedManagers = this.selectedManagers.filter(m => m._id !== manager._id);
    }
  },
  watch: {
    campaignManagersModals(newVal) {
      if (newVal) {
        this.fetchManagers();
      }
    },
    initialSelectedManagers: {
      immediate: true,
      handler(newVal) {
        this.selectedManagers = [...newVal];
      }
    }
  }
}
</script>

<style scoped>
.campaign-managers-content {
  padding: 1rem;
}

:deep(.p-datatable) {
  background: white;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: white;
  color: #495057;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #dee2e6;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.75rem;
  background: white;
  border-bottom: 1px solid #dee2e6;
}

:deep(.p-datatable .p-datatable-tbody > tr.p-highlight) {
  background: #e3f2fd;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: #f8f9fa;
}

:deep(.p-datatable .p-datatable-tbody > tr.p-highlight:hover) {
  background: #e3f2fd;
}

:deep(.p-inputtext) {
  width: 100%;
  max-width: 300px;
}

.search-filter {
  display: flex;
  justify-content: flex-end;
}

.search-input {
    padding: 10px;
    border: 1px solid #ced4da;
    outline: none;
}

.role-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.selected-managers h4 {
  margin: 0 0 1rem 0;
  color: #495057;
  font-size: 1rem;
}

.selected-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.selected-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.remove-icon {
  color: #dc3545;
  cursor: pointer;
  font-size: 1rem;
}

.remove-icon:hover {
  color: #c82333;
}

.scrollable-table {
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: white;
}

.manager-close-btn,
.manager-save-btn {
  min-width: 100px;
  padding: 5px 10px;
  border: 1px solid #ff5757;
  border-radius: 4px;
  color: #ff5757;
}

.manager-save-btn {
  background-color: #ff5757;
  color: white;
}

:deep(.p-datatable-wrapper) {
  border-radius: 6px;
  background: white;
}

:deep(.p-datatable-scrollable-body) {
  background: white;
}

:deep(.p-datatable-scrollable-header) {
  background: white;
}

:deep(.p-datatable-scrollable-footer) {
  background: white;
}

.manager-avatar {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: 600;
}
</style>