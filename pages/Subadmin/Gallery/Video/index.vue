<template>
  <div class="cnt">
    <div class="gallery-media-action">
      <div class="gallery-action">
        <NuxtLink v-if="permission?.gallery?.image?.view" class="span-grey" to="/subadmin/gallery/image">
          Images </NuxtLink>
        <NuxtLink v-if="permission?.gallery?.video?.view" class="span-red ms-4" to="/subadmin/gallery/video">
          Videos ({{ videos.length }})</NuxtLink>
      </div>
      <button @click="$refs.addVideo.addModalDialogue = true" v-if="permission?.gallery?.video?.add">
        <i class="bi bi-plus" style="font-size: 1.25rem;"></i> Add Media
      </button>
    </div>

    <div class="gallery-image-video">

      <DataView :value="videos" paginator :rows="6" :alwaysShowPaginator="false">
        <template #empty>
          <div v-if="loading" class="gallery-row">
            <div class="mb-lg-0" v-for="i in 6">
              <Skeleton width="15rem" height="180px"></Skeleton>
            </div>
          </div>
          <EmptyContent :title="'Add First Gallery Video'" :desc="'No Gallery Videos Found'" />
        </template>
        <template #list="s">
          <div class="gallery-row">
            <div class="gallery-video-col dropdown divhover2" v-for="(i, index) in s.items" :key="index">
              <div class="play-btn">
                <span id="play-text">{{ i.title }}</span>
                <span id="play-btn">
                  <NuxtLink :to="`https://www.youtube.com/watch?v=${i.url}`" target="blank">
                    <BootstrapIcon name="play-circle" class="icon2" />
                  </NuxtLink>
                </span>
              </div>
              <div class="tooltip-gallery-cont">
<div class="gallary-images-dots">
    <SplitButton  v-if="generateMenuItems(i).length > 0"
      label=""
      icon="none"
      :model="generateMenuItems(i)"
      class="p-button-outlined p-button-secondary"
    />
  </div>
                <!-- <div class="dropdown-center"
                  v-if="userData.user.permission.gallery.video.edit || userData.user.permission.gallery.video.delete">
                  <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon2" />
                  </button>
                  <ul class="dropdown-menu">
                    <li v-if="!i.primary && userData.user.permission.gallery.video.edit">
                      <a class="dropdown-item" @click="primaryVideo(i)">
                        <BootstrapIcon name="star-fill" class="icon5" />Make Primary
                      </a>
                    </li>
                    <li v-if="!i.primary && userData.user.permission.gallery.video.delete">
                      <a class="dropdown-item" @click="deleteVideo(i)">
                        <BootstrapIcon name="trash" class="icon5" />Delete
                      </a>
                    </li>
                    <li v-if="userData.user.permission.gallery.video.edit">
                      <a class="dropdown-item" @click="{
                        if (this.$refs.updateVideo) {
                          this.$refs.updateVideo.setFormValue(i);
                        }
                      }">
                        <BootstrapIcon name="pencil-square" class="icon5" />Edit
                      </a>
                    </li>
                  </ul>
                </div> -->

              </div>
              <img :src="i.thumbnail + `?t=${new Date().getDay()}`" />
            </div>
          </div>
        </template>
      </DataView>

    </div>
  </div>


  <AddModal ref="addVideo" @refreshApi="init()" />
  <UpdateModal ref="updateVideo" @refreshApi="init()" />
</template>

<script>
import AddModal from './AddModal.vue';
import UpdateModal from './UpdateModal.vue';
import EmptyContent from '~/components/ExtraComponents/EmptyContent.vue';
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

export default {
  components: { AddModal, UpdateModal, EmptyContent },
  data() {
    return {
      userData: useState('userData'),
      loading: false,
      current_video: null,
      videos: [],
       permission:null,
    };
  },
  async mounted() {
    activateSubmenu('b2', 'Gallery Videos');
    this.init();
  this.getPermission();
  },
    async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    generateMenuItems(i) {
  const items = [];

  // Make Primary
  if (i.primary) {
    items.push({
      label: 'Make Primary',
      icon: 'pi pi-star-fill',
      command: () => this.primaryVideo(i)
    });
  }

  // Edit (permission check)
  if (this.permission?.gallery?.video?.edit) {
    items.push({
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        if (this.$refs.updateVideo) {
          this.$refs.updateVideo.setFormValue(i);
        }
      }
    });
  }

  // Delete (not primary + permission check)
  if (i.primary && this.permission?.gallery.video?.delete) {
    items.push({
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.deleteVideo(i)
    });
  }

  return items;
},
  //     generateMenuItems(i) {
  //   return [
  //     {
  //       label: 'Make Primary',
  //       icon: 'pi pi-star-fill',
  //       visible: !i.primary,
  //       command: () => this.primaryVideo(i)
  //     },
  //     {
  //       label: 'Edit',
  //       icon: 'pi pi-pencil',
  //       command: () => {
  //         if (this.$refs.updateVideo) {
  //           this.$refs.updateVideo.setFormValue(i);
  //         }
  //       }
  //     },
  //     {
  //       label: 'Delete',
  //       icon: 'pi pi-trash',
  //       visible: !i.primary,
  //       command: () => this.deleteVideo(i)
  //     }
  //   ];
  // },
  
    async init() {
      this.loading = true;
      await subadminGet(`/subadmin-company-videos`).then(async (response) => {
        this.videos = response.data.data;
      }).catch(async (e) => {
        await serverErrorMessage(() => this.init())

      });
      this.loading = false;
    },
    async deleteVideo(i) {
      if (await deleteConfirm('Do you want to delete this video?')) {
        await subadminDelete(`/company-videos/${i._id}`);
        await this.init();
        successAlert('Video is deleted successfully!');
      }
    },
    async primaryVideo(i) {
      const message = i.primary
        ? `Do you want to remove primary status from this video?`
        : `Do you want to make this video as primary video?`;

      if (await askConfirm(message, i.primary ? 'Remove Primary' : 'Set Primary', 'Yes', 'No')) {
        this.loading = true;
        try {
          const response = await subadminPost(`/company-videos/${i._id}`);
          if (response.data.status) {
            // Success: Update UI and show success message
            await this.init();
            const successMessage = i.primary
              ? 'Gallery Primary Status Removed'
              : 'Gallery Made Primary';
            successAlert(successMessage);
          } else {
            // Error: Show error message
            errorAlert(response.data.msg || 'An error occurred while updating primary status');
          }
        } catch (error) {
          // Handle unexpected errors
          console.error('Error toggling primary status:', error);
          errorAlert('Something went wrong. Please try again later.');
        } finally {
          this.loading = false;
        }
      }
    },
     async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
    OpenEditModal(i) {
      this.current_video = i;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
