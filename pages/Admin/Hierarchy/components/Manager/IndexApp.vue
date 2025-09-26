<template>

    <div class='languages'>
        <div class="">
            <div class="btn-container"><span id="languages-heading">Manager</span><span id="add-btn"
                    @click="addManagerModal = true">+
                    Add</span></div>
            <div class="break-line"></div>
            <div v-for="(row, index) in managers.mnames" :key="index" class="card-row">
                <div class="card-col"><span>{{ row }} ,  Executives : {{ managers.team[index].executive.length }}</span>

                    <div class="btn-group">
                        <span><img src="/img/svg/red-eye.svg" alt=""></span>
                        <span @click="onManagerMode(index)"><img src="/img/svg/add-admin.svg" alt=""></span>
                        <span><img src="/img/svg/refresh.svg" alt=""></span>
                        <span @click="deleteManager(index)"> <img src="/img/svg/trash.svg" alt=""></span>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <Dialog v-model:visible="addManagerModal" modal header="Add Executive">
        <FormKit type="form" @submit="submitExecForm">
            <div class="upload-image-box">
                <div class="input-field">
                    <FormKit type="select" :options="items" class="form-select" v-model="selectedOption" name="subAdmin"
                        validation="required" />
                </div>
                <span class="heirarchy-add-asub">
                    <p>Establish a robust hierarchy by assigning managers under sub-admins for effective team management
                        and streamlined operations.</p>
                </span>
                <div @click="addCardRow(selectedOption)" class="cropper-upload-add"
                    style="display: flex; justify-content: center">Add Manager
                </div>
            </div>
        </FormKit>
    </Dialog>

</template>
<script>
export default {
    data() {
        return {
            name: '',
            id: '',
            items: [],
            execItems: [],
            selectedOption: '',
            selectedExec: '',
            addManagerModal: false,
            addModal: false,
            cardRows: [],
            current_manager: '',
            click_managerId: '',

        };
    },
    props: {
        managers: []
    },
    async mounted() {
        await this.getSubAdmin();
        await this.getSubExecutive();
    },
    methods: {
        onManagerMode(x) {
            this.$emit('send-manager', { type: 'm',i:x });
        },
        openModal(index, row) {
            this.current_manager = index
            this.click_managerId = row
            this.addModal = true;
        },
        getSubAdminId() {
            for (let i in this.execItems) {
                if (this.execItems[i].value == this.selectedExec) {
                    this.name = this.execItems[i].label
                    this.id = this.execItems[i].value

                }
            }
        },
        deleteManager(x){
            this.$emit('send-manager', { type: 'dm',i:x });
        },
        async getSubAdmin() {
            this.loading = true
            this.items = (await adminGet(`/select-employes-list/?role=manager`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
            this.loading = false
        },

        async getSubExecutive() {
            this.loading = true
            this.execItems = (await adminGet(`/select-employes-list/?role=executive`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
            this.loading = false
        },
        addCardRow(selectedOption) {
            const selectedItem = this.items.find(item => item.value === selectedOption);
            if (selectedItem) {
                this.cardRows.push({ name: selectedItem.label, Manager_id: selectedItem.value, executives: [] });
                this.$emit('send-manager', { type: 'p', id: selectedItem.value,name:selectedItem.label });
            }
            this.addManagerModal = false;
        },
    }

};
</script>

<style scoped>
@import url('./style.css');
</style>