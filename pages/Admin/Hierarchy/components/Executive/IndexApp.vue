<!-- @format -->

<template>
    <div style="height: 80vh">
        <div class="btn-container">
            <span id="languages-heading">Team</span><span @click="addModal = true" id="add-btn">+ Add</span>
        </div>
        <div class="languages">
            <div class="btn-container column-flex">
                <span id="languages-heading">Executives </span>
                <div id="add-btn" class="add-help"><span>Manager .</span>
                    <span>{{ data.mnames[data.index] }}</span>
                    <span style="    padding-top: 5px;"></span>
                </div>
            </div>
            <div class="break-line"></div>
            <div class="card-row">
                <div v-for="(item, index) in data.team[data.index].enames" :key="index" class="card-col">
                    <div class="exicutive-name"> <span class="name">{{ item.name }}</span>
                        <span class="grey">{{ item }}</span>
                    </div>
                    <div class="btn-group">
                        <span><img src="/img/svg/refresh.svg" alt="" /></span>
                        <span @click="delE(index)"> <img src="/img/svg/trash.svg" alt="" /></span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button @click="submitHeirarchy" class="last-submit-heirarchy">Submit</button>
        </div>
    </div>

    <!-- add Executive  -->
    <Dialog v-model:visible="addModal" modal header="Add Executive">
        <FormKit type="form" @submit="submitExecForm" >
            <div class="upload-image-box">
                <div class="input-field">
                    <FormKit type="select" :options="execItems" class="form-select" v-model="selectedExec" name="exec"
                        validation="required" />
                </div>
                <span class="heirarchy-add-asub">
                    <p>Establish a robust hierarchy by assigning managers under sub-admins for effective team management
                        and
                        streamlined operations.</p>
                </span>

                <div class="cropper-upload-add" style="display: flex; justify-content: center">
                    <button type="submit" id="upload-btn">Add Sub-Admin</button>
                </div>
            </div>
        </FormKit>
    </Dialog>

</template>
<script>
import Manager from './../Manager/IndexApp.vue';
definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
});
export default {
    props: {
        data: {}
    },
    data() {
        return {
            receivedExec: null,
            selectedExec: null,
            execItems: [],
            Items: [],
            addModal: false,
            parsedData: {},
            cardRows: [],
            execData: '',
            select_manager: null,

        };
    },

    components: {
        Manager,
    },

    async mounted() {
        const serializedData = this.$route.query.data;
        if (serializedData) {
            this.parsedData = JSON.parse(decodeURIComponent(serializedData));
        }
        this.cardRows = this.parsedData.cardRows || [];
        this.select_manager = this.parsedData.manager_id

        // this.parsedData.cardRows.forEach((manager) => {
        //     manager.executives.forEach((executive) => {
        //         this.Items.push(executive);
        //     });
        // });
        await this.getSubExecutive();
    },

    methods: {
        async submitHeirarchy(v) {
            this.$emit('send-manager', { type: 'submit' });
        },
        delE(x) {
            this.$emit('send-manager', { type: 'de', i: x });
        },

        async getSubExecutive() {
            this.loading = true
            this.allSubadmins = (await adminGet(`/select-employes-list/?role=manager`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
            // this.allSubadmins = [{ label: 'Exec 1', value: 1 }, { label: 'Exec 2', value: 2 }]
            this.execItems =this.allSubadmins
            this.loading = false

        },
        submitExecForm(v) {
            for (let i in this.allSubadmins) {
                if (this.allSubadmins[i].value == v.exec) {
                    this.$emit('send-manager', { type: 'e', id: v.exec, name: this.allSubadmins[i].label });
                    this.addModal = false
                }
            }
        }


    },
};
</script>
<style scoped>
@import url('./style.css');
</style>