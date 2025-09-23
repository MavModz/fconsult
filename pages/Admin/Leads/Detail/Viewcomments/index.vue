<template>

    <Sidebar v-model:visible="offCanvas" header="" position="right"
        style="min-width: 350px;width:40%;overflow: auto;padding: 10px;" class="lead-canvas">
        <div class="comments-user-side-comments-main-container">
            <div class="comments-user-side-comments">
                <h3 class="comments-user-side-comments-heading">Comments</h3>
                <span class="comments-user-side-comments-count">{{ comment_list.length }}</span>
                <span @click="offCanvas = false" class="pi pi-times comments-user-side-comments-cross-icon"></span>
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
        <div class="add-recommendation-button">
            <button @click="openCommentModal">Add comments</button>
        </div>
    </Sidebar>

    <Dialog v-model:visible="commentmodal" modal header="New Comment">
        <FormKit type="form" @submit="addComments" class="leads-form-style">
            <div>
                <label>Add Comment</label>
                <FormKit class="comment-add-box-recommendation" validation="required" type="text" name="comment"
                    placeholder="Enter your comment here" />
            </div>
            <div class="button-container">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </FormKit>
    </Dialog>


</template>
<script>


export default {
    name: 'LeadProfile',

    data() {
        return {
            commentmodal: false,
            loading: false,
            offCanvas: false,
            data: null,
            comment_list: []
        }
    },
    props: {
        commnet_id: null
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
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        },
        openCanvas() {
            this.offCanvas = true
            // this.data = i
        },
        openCommentModal() {
            this.commentmodal = true;
        },
        async addComments(v) {

            try {
                await adminPost(`/add-comments-recommendation/${this.commnet_id}`, v);
                this.commentmodal = false;
                this.comments(this.commnet_id)
                successAlert("Comment added successfully!");
            } catch (error) {
                console.error("Error adding comment:", error);
                errorAlert("Failed to add comment.");
            }
        }


    }
}
</script>

<style scoped>
@import url('style.css');
</style>