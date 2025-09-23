<template>
    <div class="card overflow-x-auto maincard">
        <!-- {{ currentLevel }} -->
        <OrganizationChart :value="filteredSettings">
            <template #_id="d" class="m-0 p-0">
                <div :class="`d-flex justify-content-between maincard${d.node.level} pt-2`">
                    <div>
                        <Avatar :image="d.node.user_id.profile_image" class="mr-2" size="xlarge" shape="circle" />
                    </div>
                    <div class="me-4 ms-2" style="text-align: left;min-width: 150px;">
                        <h5>{{ d.node.user_id.name }} {{ d.node.name }}</h5>
                        <small>{{ d.node.rolename }}</small>
                    </div>
                    <div>
                        <div class="card btncard mt-3" style="background-color: #f4f4f4;">
                            <Button type="button" class="optionbtnmain" icon="pi pi-ellipsis-v"
                                @click="$refs[d.node._id].toggle($event)" />
                            <OverlayPanel :ref="d.node._id">
                                <div class="m-0 p-0" style="text-align: left;">
                                    <!-- <div v-if="d.node.level==1 || d.node.level==2 || d.node.level==3" class="mt-1 optionbtn" @click="currentData = d; addExistingModal = true">
                                        <i class="bi bi-person-add"></i> Add New User</div> -->
                                    <div v-if="d.node.level == 1 || d.node.level == 2 || d.node.level == 3"
                                        class="mt-1 optionbtn"
                                        @click="currentData = d; addExistingModal = true; currentLevel = d.node.level">
                                        <i class="bi bi-plus-circle"></i> Add Existing User
                                    </div>
                                    <div class="mt-1 optionbtn text-danger"
                                        v-if="(d.node.level == 4 || ((d.node.level == 2 || d.node.level == 3) && d.node.children.length === 0))"
                                        @click="deleteUser(d.node)">
                                        <i class="bi bi-trash"></i> Delete User
                                    </div>
                                </div>
                            </OverlayPanel>
                        </div>
                    </div>
                </div>
            </template>
        </OrganizationChart>

    </div>

    <Dialog v-model:visible="addExistingModal" :draggable="false" modal header="Add Existing User" :style="{'min-width':'350px'}">
        <!-- {{ currentData.node.level }} -->
        <label for="user mb-2" v-if="currentLevel!=3">Enter Team Name</label>
        <input type="text"  v-if="currentLevel!=3" v-model="currentTeamName" class="form-control mb-2 mt-2" placeholder="Enter Team Name" />
        <label for="user mb-2">Select User</label>
       
        <select v-model="currentUser" class="mt-4" placeholder="Select User">
            <option :value="i.value" v-for="i in users" v-show="i.rolenum == currentLevel">{{ i.label }}</option>
        </select>
        <center>
            <Button class="btn btn-primary mt-4" @click="addUser" label="Save" :loading="loading.a" />
        </center>
    </Dialog>
</template>

<script>
definePageMeta({
    layout: 'admin',
    middleware: ['admincrm'],
})

export default {
    data() {
        return {
            currentLevel: 0,
            loading: { a: false },
            users: null,
            addExistingModal: false,
            settings: null,
            filteredSettings: [],
            currentData: null,
            currentUser: null,
            currentTeamName: null,
        };
    },
    methods: {
        async updateSettings() {
            await adminPut(`/setting-update`, { hierarchy: this.settings })
        },
        buildTree(hierarchy) {
            const buildNode = (node) => {
                return {
                    ...node,
                    children: node.children ? node.children.map(buildNode) : [], type: '_id'
                };
            };
            return hierarchy.map(buildNode)[0];
        },
        async addUser() {
            this.loading.a = true
            let up = ""
            let down = []
            if (this.currentUser && this.currentData) {
                const userToAdd = {
                    user_id: this.currentUser.split('_')[1],
                    subadmin_id: this.currentUser.split('_')[2],
                    level: String(parseInt(this.currentData.node.level) + 1),
                    name:this.currentTeamName,
                    children: [],
                };
                const addToHierarchy = (nodes) => {
                    nodes.forEach(node => {
                        if (node._id == this.currentData.node._id) {
                            up = this.currentData.node.user_id._id
                            for (let i in this.currentData.node.children) {
                                down.push(this.currentData.node.children[i].user_id._id)
                            }
                            down.push(userToAdd.user_id)
                            node.children.push(userToAdd);
                        } else if (node.children && node.children.length) {
                            addToHierarchy(node.children);
                        }
                    });
                };
                addToHierarchy(this.settings);
                await adminPut(`/subadmin-harierchy`, { up, down, level: this.currentLevel }).then(async (r) => {
                    if (r.data.status) {
                        await this.updateSettings();
                        this.addExistingModal = false;
                        this.currentUser = null
                        this.currentTeamName = null
                    }
                }).catch((e) => { })
                this.init()
                this.loading.a = false
            }
        },
        async deleteUser(node) {
            let up = "";
            let down = [];
            const removeFromHierarchy = async (nodes, parent) => {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i]._id == node._id) {
                        try {
                            await adminDelete(`/subadmin-harierchy/${nodes[i].user_id._id}`);
                            nodes.splice(i, 1);
                            return true;
                        } catch (error) {
                            console.error("Error deleting user:", error);
                            return false; // Stop further execution if error occurs
                        }
                    } else if (nodes[i].children && nodes[i].children.length) {
                        if (await removeFromHierarchy(nodes[i].children, nodes[i])) {
                            return true;
                        }
                    }
                }
                return false;
            };
            if (await removeFromHierarchy(this.settings, null)) {
                await this.updateSettings();
                this.init();
            }
        },
        async init() {
            await adminGet(`/company-hierarchy`).then(async (response) => {
                this.settings = response.data.data.hierarchy;
                this.filteredSettings = this.buildTree(this.settings);
                this.settings = this.settings.map((i) => ({
                    type: '_id',
                    user_id: i.user_id,
                    level: i.level,
                    _id: i._id,
                    children: i.children || [],
                }));
            });
        }
    },
    async mounted() {
        activateMenu('settings', 'Hierarchy Management',true);
         await adminGet("/test-subadmin")
        this.users = (await adminGet(`/select-employes-list`)).data.employe_list.map((i) => ({
            label: i.name,
            value: `${i.email}_${i._id}_${i.subadmin_id}`,//last was id 2nd last is user_id
            role: i.role,
            rolenum: i.role == 'subadmin' ? 1 : (i.role == 'manager' ? 2 : 3),
        }));
        this.init();
    },
};
</script>

<style scoped>
@import url('style.css');
</style>