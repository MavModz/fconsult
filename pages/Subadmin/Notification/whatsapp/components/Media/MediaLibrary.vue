<template>
    <Dialog modal header="Media Library" :style="{ 'min-width': '55vw' }" :draggable="false" :visible="visible"
        @update:visible="$emit('update:visible', $event)">
        <div class="media-lib-header">
            <div class="media-lib-search">
                <input type="text" name="search" placeholder="Search Media" v-model="searchQuery">
                <div class="media-lib-btns flex gap-2">
                    <input
                        ref="fileInput"
                        type="file"
                        style="display: none"
                        @change="handleFileUpload"
                        multiple
                    />
                    <button
                        class="media-lib-btn upload flex items-center gap-1"
                        @click="triggerFileInput"
                    >
                        <i class="bi bi-cloud-arrow-up"></i>Upload
                    </button>
                    <button class="media-lib-btn delete flex items-center gap-1">
                        <i class="bi bi-trash"></i>Delete
                    </button>
                </div>
            </div>
            <div class="media-lib-tabs mb-4">
                <div :class="['tab-data', selectedTab === items.value ? 'active' : '']" v-for="items in mediaTabs"
                    :key="items.value" @click="selectedTab = items.value">
                    <p class="mb-0">{{ items.title }} ({{ items.count }})</p>
                </div>
            </div>
        </div>
        <div class="media-lib-wrapper">
            <div v-if="loading && uploadingFileType === selectedTab" class="gallery-item uploading">
                <template v-if="uploadingFileType === 'image' && uploadingPreviewUrl">
                    <img :src="uploadingPreviewUrl" alt="Uploading..." />
                </template>
                <template v-else-if="uploadingFileType === 'video' && uploadingPreviewUrl">
                    <video :src="uploadingPreviewUrl" controls style="width:100px;height:100px;" />
                </template>
                <template v-else-if="uploadingFileType === 'audio'">
                    <div class="file-icon"><i class="bi bi-file-earmark-music"></i></div>
                </template>
                <template v-else>
                    <div class="file-icon"><i class="bi bi-file-earmark"></i></div>
                </template>
                <p>{{ fileName }}</p>
                <div class="spinner"></div>
                <p style="font-size:12px;color:#888;">Uploading...</p>
            </div>
            <div class="gallery-item" v-for="items in filteredGalleryData" :key="items._id" style="position:relative;">
                <template v-if="items.media_type === 'image'">
                    <NuxtImg :src="items.media_url" :alt="items.media_title" style="width:100px;height:100px;object-fit:cover;border-radius:8px;" />
                </template>
                <template v-else-if="items.media_type === 'video'">
                    <video :src="items.media_url" autoplay muted loop style="width:100px;height:100px;border-radius:8px;object-fit:cover;" />
                </template>
                <template v-else-if="items.media_type === 'audio'">
                    <audio :src="items.media_url" muted style="width:90px;" />
                </template>
                <template v-else>
                    <div class="file-icon"><i class="bi bi-file-earmark-pdf"></i></div>
                    <a :href="items.media_url" target="_blank" style="font-size:12px;">Download</a>
                </template>
                <p>{{ items.media_title }}</p>
                <!-- Hover overlay with Select button -->
                <div class="media-hover-overlay">
                    <button class="select-btn" @click="selectMedia(items)">Select</button>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            selectedTab: 'image',
            fileUrl: null,
            ffileUrl: null,
            uploadingPreviewUrl: null,
            uploadingFileType: null,
            selectedFile: null,
            fileName: null,
            fileType: null,
            mediaTabs: [
                { title: 'Image', value: 'image', count: '0' },
                { title: 'Audio', value: 'audio', count: '0' },
                { title: 'Video', value: 'video', count: '0' },
                { title: 'File', value: 'file', count: '0' },
            ],
            galleryData: null,
            searchQuery: "",
        }
    },
    name: 'MediaLibrary',
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update:visible'],

    async mounted() {
        await this.fetchMedia();
    },

    computed: {
        filteredGalleryData() {
            if (!this.galleryData) return [];
            return this.galleryData
                .filter(item => item.media_type === this.selectedTab)
                .filter(item =>
                    !this.searchQuery ||
                    item.media_title.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
        }
    },

    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        async handleFileUpload(event) {
            const files = event.target.files;
            const fileTypeMap = {
                image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
                audio: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'],
                video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
                file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'zip', 'rar']
            };

            if (files.length > 0) {
                const file = files[0];
                const fileName = file.name.replace(/\.[^/.]+$/, ""); // removes extension
                const ext = file.name.split('.').pop().toLowerCase();
                let fileType = 'file'; // default

                for (const [type, extensions] of Object.entries(fileTypeMap)) {
                    if (extensions.includes(ext)) {
                        fileType = type;
                        break;
                    }
                }

                this.ffileUrl = file;
                this.fileName = fileName;
                this.fileType = fileType;
                this.uploadingFileType = fileType;
                this.selectedTab = fileType;
                if (fileType === 'image' || fileType === 'video') {
                    this.uploadingPreviewUrl = URL.createObjectURL(file);
                } else {
                    this.uploadingPreviewUrl = null;
                }
                console.log('File Name:', this.fileName);
                console.log('File Type:', this.fileType);
                await this.uploadFile();
            }
        },

        async uploadFile() {
            if(!this.fileName || !this.fileType) {
                return errorAlert('Required data is missing');
            }

            this.loading = true;
            try {
                this.fileUrl = await uploadFileAdminE2(this.ffileUrl, `${Date.now()}.${this.ffileUrl.name.split('.').pop()}`);

                const response = await subadminPost('/add-wa-media', {
                    media_type: this.fileType,
                    media_url: this.fileUrl,
                    media_title: this.fileName,
                });
                if(response.status === true) {
                    successAlert('File uploaded successfully');
                    this.fetchMedia();
                }
            } catch (error) {
                console.log(error);
                errorAlert('Something went wrong');
            } finally {
                this.loading = false;
                this.uploadingPreviewUrl = null;
                this.uploadingFileType = null;
            }
        },

        async fetchMedia() {
            try {
                const response = await subadminGet('/wa-media');
                const data = response.data.data.reverse();
                this.galleryData = data;

                // Count items by type
                const typeCounts = { image: 0, audio: 0, video: 0, file: 0 };
                data.forEach(item => {
                    if (typeCounts[item.media_type] !== undefined) {
                        typeCounts[item.media_type]++;
                    }
                });

                // Update tab counts
                this.mediaTabs = this.mediaTabs.map(tab => ({
                    ...tab,
                    count: typeCounts[tab.value] || 0
                }));
            } catch (error) {
                console.log("Failed to fetch Media: ", error);
                errorAlert("Failed to fetch media");
            }
        },
        selectMedia(media) {
            this.$emit('select-media', media);
            this.$emit('update:visible', false);
        }
    },
};
</script>

<style scoped>
.media-lib-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.media-lib-search input {
    width: 50%;
    outline: none;
    padding: 10px;
    background-color: #f0f0f0;
    font-size: 14px;
}

.media-lib-btn {
    border: 1px solid #0A474C;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 16px;
    font-weight: 500;
}

.media-lib-btn.upload {
    background-color: #0A474C;
    color: #fff;
}

.media-lib-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 18px;
}

.tab-data {
    background-color: #EDEDED;
    color: #676B6C;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 5px;
}

.tab-data.active {
    background-color: #fff;
    color: #FF5757;
    border: 1px solid #EDEDED;
    box-shadow: 0px 2.81px 8.42px 0px #1F1B2D14;
}

.gallery-item {
    width: 100px;
    border: 1px solid transparent;
    height: 150px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 5px;
    position: relative;
    overflow: hidden;
}

.gallery-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
}

.media-lib-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-items: center;
    overflow-y: auto;
    max-height: 400px;
}

.gallery-item p {
    margin-bottom: 0;
    overflow: hidden;
    font-size: 14px;
    max-width: 90%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #0A474C;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 8px auto 0 auto;
}
@keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
.file-icon {
    font-size: 48px;
    color: #0A474C;
    margin: 16px 0;
}

.media-hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 2;
}
.gallery-item:hover .media-hover-overlay {
    opacity: 1;
}
.select-btn {
    background: #0A474C;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 8px 18px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: background 0.2s;
}
.select-btn:hover {
    background: #FF5757;
}
</style>