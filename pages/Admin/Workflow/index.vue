<template>
    <div class="workflow-wrapper">
        <DeleteModal :isVisible="showDeleteModal" @close="cancelDelete" @confirm="confirmDelete" />
        <div class="workflow-info-wrapper">
            <div class="workflow-search-header">
                <div class="search-filter">
                    <input type="text" placeholder="Search" class="search-input" v-model="searchQuery">
                    <button class="reset-filter-btn" @click="resetFilters">Reset</button>
                </div>
                <div class="btn-header">
                    <button @click="$router.push('/admin/workflow/create')"><i class="bi bi-plus-circle-fill"></i>
                        Create New WorkFlow</button>
                </div>
            </div>
            <hr class="divider-wrapper" />
            <DataTable :value="filteredWorkflows" class="leadabc" :paginator="true" :rows="10">
                <Column field="name" header="Workflow Name"></Column>
                <Column field="communication_type" header="Communication_Type">
                    <template #body="slotProps">
                        {{ Array.isArray(slotProps.data.communication_type)
                            ? slotProps.data.communication_type.join(',  ')
                            : slotProps.data.communication_type }}
                    </template>
                </Column>

                <Column field="lead_type" header="Lead Type"></Column>
                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <p :class="statusBackgroundClass(slotProps.data.status)" class="status-wrapper">
                            <span :class="statusDotClass(slotProps.data.status)" class="status-dot"></span>
                            {{ slotProps.data.status }}
                        </p>
                    </template>
                </Column>
                <Column field="createdAt" header="Created On">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.createdAt) }}
                    </template>
                </Column>
                <!-- <Column header="Action">
                    <template #body="slotProps">
                        <i class="bi bi-pencil-square" style="cursor:pointer; margin-right:10px;"
                            @click="onEdit(slotProps.data)"></i>
                        <i class="bi bi-files" style="cursor:pointer; margin-right:10px;"
                            @click="onCopy(slotProps.data)"></i>
                        <i class="bi bi-trash" style="cursor:pointer; color:#FF5757;"
                            @click="onDelete(slotProps.data)"></i>
                    </template>
                </Column> -->
                <Column header="Action">
                    <template #body="{ data }">
                        <div class="btn-align-center split-custom-class-recommendations">
                            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)">
                            </SplitButton>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import DeleteModal from '~/components/Modals/DeleteModal/DeleteModal.vue';

definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
    components: { DeleteModal },
    data() {
        return {
            workflows: [],
            showDeleteModal: false,
            workflowToDelete: null,
            searchQuery: '',
        };
    },
    async mounted() {
        activateMenu('admin-workflow', 'WorkFlow');
        await this.fetchWorkflows();
    },

    methods: {
        getItems(row) {
            return [
                {
                    label: 'Copy',
                    command: () => {
                        this.onCopy(row)
                    },
                },
                {
                    label: 'Edit',
                    command: () => {
                        this.onEdit(row)
                    },
                },

                {
                    label: 'Delete',
                    command: () => {
                        this.onDelete(row)
                    },
                },
            ];
        },
        async fetchWorkflows() {
            try {
                const response = await adminGet('/get-workflows');
                this.workflows = (response.data.data || []).slice().reverse();
                console.log('Workflows fetched successfully:', this.workflows);
            } catch (error) {
                console.error('Error fetching workflow data:', error);
            }
        },

        statusDotClass(status) {
            switch (status.toLowerCase()) {
                case 'active':
                    return 'dot-active';
                case 'inactive':
                    return 'dot-inactive';
                default:
                    return 'dot-default';
            }
        },

        statusBackgroundClass(status) {
            switch (status.toLowerCase()) {
                case 'active':
                    return 'bg-active';
                case 'inactive':
                    return 'bg-inactive';
                default:
                    return 'bg-default';
            }
        },

        onEdit(row) {
            this.$router.push({
                path: '/admin/workflow/create',
                query: { edit: true, id: row._id }
            });
        },

        onCopy(row) {
            this.$router.push({
                path: '/admin/workflow/create',
                query: { copy: true, id: row._id }
            });
        },

        onDelete(row) {
            this.workflowToDelete = row;
            this.showDeleteModal = true;
        },

        async confirmDelete() {
            try {
                const response = await adminDelete(`/delete-workflow/${this.workflowToDelete._id}`);
                this.workflows = this.workflows.filter(w => w.id !== this.workflowToDelete.id);
                successAlert(response.data.msg);
                this.fetchWorkflows();
            } catch (error) {
                console.error('Error deleting workflow:', error);
                errorAlert('Failed to delete workflow. Please try again.');
            } finally {
                this.showDeleteModal = false;
                this.workflowToDelete = null;
            }
        },
        cancelDelete() {
            this.showDeleteModal = false;
            this.workflowToDelete = null;
        },

        formatDate(dateStr) {
            const date = new Date(dateStr);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        },

        resetFilters() {
            this.searchQuery = '';
        }
    },

    computed: {
        filteredWorkflows() {
            if (!this.searchQuery) return this.workflows;
            const query = this.searchQuery.toLowerCase();
            return this.workflows.filter(wf => {
                return wf.name && wf.name.toLowerCase().includes(query);
            });
        }
    },
};
</script>
<style scoped>
.workflow-wrapper {
    background-color: #fff;
    padding: 30px;
    border-radius: 15px;
}

.btn-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.btn-header button {
    background-color: #FF5757;
    color: #fff;
    padding: 8px 15px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 50px;
}

.workflow-search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-filter {
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
}

.reset-filter-btn {
    background-color: #EDEDED;
    color: #676B6C;
    padding: 8px 15px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 5px;
}

.divider-wrapper {
    margin: 16px 0;
    border: 1px solid #d5d2dc;
}

.status-wrapper {
    margin-bottom: 0;
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    border-radius: 50px;
}

.bg-active {
    background-color: #EBF6EB;
    color: #31AA27;
}

.bg-inactive {
    background-color: #FDEDED;
    color: #FF5757;
}

.status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
}

.dot-active {
    background-color: #409261;
}

.dot-inactive {
    background-color: #D93434;
}
</style>