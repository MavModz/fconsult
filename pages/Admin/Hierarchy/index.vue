<template>

    <Subadmin v-if="mode == 'manager'" :subadmin="data" />

    <Manager v-if="mode == 'manager' && showManagerData" @send-manager="addManager" :managers="data" />

    <Executive v-if="mode == 'exec'" :data="data" @send-manager="addManager" />
    
    <div v-if="!showManagerData" class="subadmin-main-divuser">
        <div v-show="add_manager_btn" class="subadmin-open-user">
            <span class="option-no-click" @click="addModal = true">Add Manager</span>
            <div class="break-line-btn"></div>
            <span class="option-click">Add User</span>
        </div>
        <button @click="open_manager" class="subadmin-btn-addicn">
            <img src="/img/svg/add-btn.svg" alt="">
        </button>
    </div>
    
    <center><button class="submit-btn" @click="addHar">Submit</button></center>


    <Dialog v-model:visible="addModal" modal header="Warning Title">
        <div class="upload-image-box">
            <span class="heirarchy-add-asub">
                <p>Do you confirm that you want to Convert this Visitor into a Lead</p>
            </span>
            <div @click="showManager" class="cropper-uplo-subad" style="display: flex; justify-content: center">Add
                Manager
            </div>
        </div>
    </Dialog>


    <!-- {{ data }} -->
</template>

<script>
import Executive from './components/Executive/IndexApp.vue'
import Manager from './components/Manager/IndexApp.vue'
import Subadmin from './components/Subadmin/IndexApp.vue'
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});

export default {
    components: { Executive, Manager, Subadmin },
    data() {
        return {
            data: {
                "sub_Admin": this.$route.query.id,
                "sub_name": this.$route.query.name,
                "mnames": [],
                "team": [],
                'index': 0,
            },
            current_index: 0,
            mode: 'manager',
            subadmin: { name: this.$route.query.name, id: this.$route.query.id },
            add_manager_btn: false,
            managers: [],
            receivedData: null,
            addModal: false,
            showManagerData: false,
        };
    },
    async mounted() {
        activateMenu('settings', 'Settings')
    },
    methods: {
        open_manager() {
            this.add_manager_btn = !this.add_manager_btn
        },
        addManager(d) {
            if (d.type == 'p') {
                this.data.team.push({ managers: d.id, executive: [], enames: [] })
                this.data.mnames.push(d.name)
                this.managers = d.data
            } else if (d.type == 'm') {
                this.data.index = d.i
                this.mode = 'exec'
            } else if (d.type == 'e') {
                this.data.team[this.data.index].executive.push(d.id)
                this.data.team[this.data.index].enames.push(d.name)
            } else if (d.type == 'submit') {
                this.mode = 'manager'
            } else if (d.type == 'dm') {
                this.data.mnames.splice(d.i, 1)
                this.data.team.splice(d.i, 1)
            } else if (d.type == 'de') {
                this.data.team[this.data.index].executive.splice(d.i, 1)
                this.data.team[this.data.index].enames.splice(d.i, 1)
            }
        },
        async getSubAdmin() {
            this.loading = true
            this.items = (await adminGet(`/select-employes-list/?role=subadmin`)).data.employe_list.map(i => ({ label: i.name, value: i.name }));
            this.loading = false
        },
        showManager() {
            this.showManagerData = true;
            this.addModal = false;
        },
        async addHar(){
            await adminPost(`/hierachy-management`,this.data)
            this.$router.push('/admin/settings/UserRoleManagement')
        }

    }
}
</script>

<style scoped>
@import url('./style.css');
</style>