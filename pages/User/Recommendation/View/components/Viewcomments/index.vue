<template>

    <Sidebar v-model:visible="offCanvas" header="" position="right" style="min-width: 350px;width:40%;overflow: auto;padding: 10px;"
        class="lead-canvas">
        <div class="comments-user-side-comments-main-container">
            <div class="comments-user-side-comments">
                <h3 class="comments-user-side-comments-heading">Comments</h3>
                <span class="comments-user-side-comments-count">{{comment_length}}</span>
                <span @click="offCanvas=false"  class="pi pi-times comments-user-side-comments-cross-icon"></span>
            </div>

            <div v-for="(i, index) in comment_list " :key="index" class="comments-user-side-comments-sections">
                <div class="comments-user-side-comments-sections-container">
                    <div class="comments-user-side-comments-sections-container-horizontal-line"></div>
                    <div class="comments-user-side-comments-sections-container-profile-image">
                        <img :src="i.user_id.profile_image" alt="comments-avtar" />
                    </div>
                    <div class="comments-user-side-comments-sections-container-message">
                        <p class="comments-user-side-comments-sections-container-message-content">{{ i.comment }}</p>
                        <p class="comments-user-side-comments-sections-container-message-time">{{
                            formatDateTime(i.created_at)}}</p>
                    </div>
                </div>

            </div>
        </div>
    </Sidebar>


    <Dialog v-model:visible="counsellorModal" modal header="Convert To Customer">
        <FormKit type="form" @submit="convertCustomer" class="leads-form-style">
            <div>
                <label class="single-lead-cmttitls">Assign Counsellor</label><br />
                <FormKit validation="required" type="select" name="assigned_to" class="single-lead-cmt-mdlo"
                    placeholder="Task title" @change="getSubCouncellor" :options="items" v-model="selectedOption" />
            </div>
            <span>
                <label class="leads-label-assign-add">Assign Description</label>
                <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn" />
            </span>
            <div class="modal-footer-section">
                <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close"
                    @click="counsellorModal = false">Go back</button>
                <button type="submit" class="btn-btn-dle-appt">Submit</button>
            </div>
        </FormKit>

    </Dialog>

</template>
<script>


export default {
    name: 'LeadProfile',
    props: {
        users: {},
        Customer_data: {},
        pipeline: {},
        leadstatus: {},
    },
    data() {
        return {
            counsellorModal: false,
            comment_list:[],
            loading: false,
            offCanvas: false,
            data: null,
            items: [],
            selectedOption: '',
            comment_length:0,
        }
    },
    async mounted() {
        await this.getSubCouncellor();
    },
    methods: {
        formatDateTime(isoDate) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Use 24-hour format
            };
            const date = new Date(isoDate);
            return date.toLocaleString('en-US', options); // Adjust the locale if needed
        },
        async comments(id) {
            this.offCanvas = true;
            try {
                const response = await adminGet(`/comments-recommendation-view/${id}`);
                this.comment_list = response.data.data.comments;
                this.comment_length=this.comment_list.length
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        },
        async getSubCouncellor() {
            this.loading = true
            this.items = (await adminGet(`/select-employes-list/`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
            this.loading = false
        },
        openCanvas(i) {
            this.offCanvas = true
            this.data = i
        },
        async changeStatus() {
            if (await askConfirm('Do You Want to Update The Status', 'Update Status', 'Update', 'No')) {
                this.loading = true
                await adminPut(`/update-leads-status/${this.data._id}`, { lead_status: this.data.lead_status })
                successAlert('Lead Status Updated Successfully');
                this.$parent.init()
            }
        },
        async changePipeline() {
            if (await askConfirm('Do You Want to change pipeline', 'Change Pipeline', 'Change', 'No')) {
                this.loading = true
                await adminPut(`/update-leads/${this.data._id}`, { pipeline: this.data.pipeline })
                successAlert('Pipeline Updated Successfully');
            }
        },
        async convertCustomer(v) {

            this.counsellorModal = false
            this.offCanvas = false
            this.loading = true
            await adminPut(`/assign-leads/${this.data._id}`, v).then(async (response) => {
                await adminPut(`/convert-customer/${this.data._id}`).then(async (response) => {
                    this.$router.push("/admin/customers/view")
                })
            })
            this.loading = false
            this.$parent.init()
        }
    }
}
</script>

<style scoped>
@import url('style.css');
</style>