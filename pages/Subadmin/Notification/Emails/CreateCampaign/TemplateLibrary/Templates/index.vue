<template>
  <div>
    <div v-if="showTemplate">
      <templatePreview v-if="$route.query" @proceed="templatePreview" :email="senderEmail" />
    </div>
    <div v-else>
      <div class="flex justify-end W-[100%]  gap-2 text-[#ff5757]">
        <span @click="active = 'My Templates'"
          class="bg-[#FF57571A]  cursor-pointer rounded-full px-[16px] font-semibold text-[15px] py-[7px]">
          My Templates
        </span>
        <span @click="active = 'Create Template'"
          class="bg-[#FF57571A] cursor-pointer rounded-full px-[16px] font-semibold text-[15px] py-[7px]">
          Create Template
        </span>
        
      </div>

      <!-- Template Grid -->
      <div v-if="active == 'Create Template'" class="mt-4 w-[100%] flex flex-wrap gap-6">
        <div v-for="(template, index) in templates" :key="index"
          class="group relative  w-[330px]  rounded-xl overflow-hidden bg-white border-[0.8px] border-[#C7D5E1] cursor-pointer">
          <!-- Thumbnail -->
          <img :src="template.thumbnail" alt="Template"
            class="w-full mt-2 h-[360px] border-b-[2px] border-[#ededed] object-contain transition duration-300" />

          <!-- Hover Buttons -->
          <div @click="viewTemplate(template.id)"
            class="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center gap-2 bg-black/30 transition-all">
            <!-- <router-link :to="`/admin/notification/emails/createtemplatelibrary/templatepreview?id=${template.id}`"
            class="bg-[#FF5757] hover:bg-[#e04b4b] text-white px-3 py-2 rounded-md text-sm font-medium shadow flex items-center gap-2">
            <i class="bi bi-check2-all"></i> Use This Template
          </router-link> -->
            <p
              class="bg-[#FF5757] hover:bg-[#e04b4b] text-white px-3 py-2 rounded-md text-sm font-medium shadow flex items-center gap-2">
              <i class="bi bi-check2-all"></i> Use This Template
            </p>

            <button @click="openDialog(template)"
              class="bg-white hover:bg-gray-100 text-[#676B6C] px-3 py-2 rounded-md text-sm font-medium shadow flex items-center gap-2">
              <i class="bi bi-box-arrow-up-right"></i>
              Preview Template
            </button>
          </div>

          <div class="py-3 px-4 text-left text-[18px] font-medium text-[#000000]">
            {{ template.name }}
          </div>
        </div>
      </div>

      <!-- <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      <div v-for="(template, index) in templatedata" :key="index"
        class="group relative w-full max-w-[370px] mx-auto rounded-xl overflow-hidden bg-white border-[0.8px] border-[#C7D5E1] cursor-pointer">

        <img :src="template.image" alt="Template"
          class="w-full mt-2 h-[360px] border-b-[2px] border-[#ededed] object-cover transition duration-300" />


        <div
          class="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center gap-3 bg-black/30 transition-all">
          <router-link
            :to="{ path: '/admin/notification/emails/templatelibrary/templatepreview', query: { data: JSON.stringify(template) } }"
            class="bg-[#FF5757] hover:bg-[#e04b4b] text-white px-3 py-2 rounded-md text-sm font-medium shadow flex items-center gap-2">
            <i class="bi bi-check2-all"></i> Use This Template
          </router-link>
          <button @click="openDialogmyTemplate(template)"
            class="bg-white hover:bg-gray-100 text-[#676B6C] px-3 py-2 rounded-md text-sm font-medium shadow flex items-center gap-2">
            <i class="bi bi-box-arrow-up-right"></i>
            Preview Template
          </button>
        </div>

        <div class="py-3 px-4 text-left text-[18px] font-medium text-[#000000]">
          {{ template.title }}
        </div>
      </div>
    </div> -->

    

      <div v-if="active == 'My Templates'" class="languages">
        <div class="btn-container">
          <span id="languages-heading">My Template</span>

        </div>
        <div class="break-line"></div>
        <section>
          <DataTable
    :value="templatedata"
    dataKey="id"
    :loading="loading"
    :paginator="true"
    class="leadabc"
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20]"
    responsiveLayout="scroll"
    emptyMessage="No data found"
  >
    <!-- Sr. No. -->
    <Column header="Sr. No.">
      <template #body="{ index }">
        {{ index + 1 }}
      </template>
    </Column>

    <!-- Title -->
    <Column header="Title">
      <template #body="{ data }">
        {{ data.title }}
      </template>
    </Column>

    <!-- Tag -->
    <Column header="Tag">
      <template #body="{ data }">
        {{ data.template_tag }}
      </template>
    </Column>

    <!-- Created_by -->
    <Column header="Created By">
      <template #body="{ data }">
        {{ data.user_id?.name || '-' }}
      </template>
    </Column>

    <!-- Created_at -->
    <Column header="Created At">
      <template #body="{ data }">
        {{ data.createdAt }}
      </template>
    </Column>

    <!-- Action Buttons -->
    <Column header="Action">
      <template #body="{ data }">
        <div class="btn-group">
          <span class="td-btn" @click="openDialogmyTemplate(data)">
            <img src="/img/svg/eye.svg" alt="view" />
          </span>
          <span class="td-btn" @click="setData(data)">
            <img src="/img/svg/edit.svg" alt="edit" />
          </span>
          <span class="td-btn" @click="deleteTemplate(data)">
            <img src="/img/svg/trash.svg" alt="delete" />
          </span>
          <span class="td-btn" @click="goToTemplatePreview(data)">
            use
          </span>
        </div>
      </template>
    </Column>
  </DataTable>
          <!-- <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Title</th>
                 <th>Tag</th>
                <th>Created_by</th>
                <th>Created_at</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody v-if="loading">
              <tr v-for="i in 4" :key="i">
                <td v-for="j in 4" :key="j">
                  <Skeleton></Skeleton>
                </td>
              </tr>
            </tbody>

            <tbody v-else>
              <tr v-if="templatedata.length === 0">
                <td colspan="3" class="text-center text-gray-600 text-[18px] py-4">No data found</td>
              </tr>
              <tr v-else v-for="(i, index) in templatedata" :key="i">
                <td>{{ index + 1 }}</td>
                <td>{{ i.title }}</td>
                <td>{{ i.template_tag }}</td>
                <td>{{ i.user_id?.name }}</td>
                <td>{{ i.createdAt }}</td>
                <td>
                  <div class="btn-group">
                    <span class="td-btn" @click="openDialogmyTemplate(i)">
                      <img src="/img/svg/eye.svg" alt="" />
                    </span>
                    <span class="td-btn" @click="setData(i)">
                      <img src="/img/svg/edit.svg" alt="" />
                    </span>
                    <span class="td-btn" @click="deleteTemplate(i)">
                      <img src="/img/svg/trash.svg" alt="" />
                    </span>
                    <span class="td-btn" @click="goToTemplatePreview(i)">
                      use
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>


          </table> -->
        </section>
      </div>

      <!-- PrimeVue Dialog -->
      <Dialog v-model:visible="showPreviewDialog" modal :header="selectedTemplate?.name || 'Template Preview'"
        :style="{ width: '40vw' }">
        <div class="text-center">
          <img v-if="selectedTemplate" :src="selectedTemplate.thumbnail" alt="Template Preview"
            class="mx-auto max-h-[500px] w-auto object-contain" />
        </div>
      </Dialog>

      <Dialog v-model:visible="showTempaltePreviewDialog" modal :header="selectedTemplate?.title || 'Template Preview'"
        :style="{ width: '45vw' }">
        <div class="text-center" v-html="selectedTemplate.htmlContent">

        </div>
      </Dialog>
    </div>
  </div>

</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
import templatePreview from "../TemplatePreview/index.vue"
export default {
  name: "TemplatesPage",
  data() {
    return {
      showPreviewDialog: false,
      showTempaltePreviewDialog: false,
      selectedTemplate: null,
      templates: [
        {
          name: "Email Template 1",
          description: "Notify users of subscription cancellations.",
          thumbnail: "/img/png/template-1-preview.png",
          id: 1,
        },
        {
          name: "Email Template 2",
          description: "Welcome your new customers warmly.",
          thumbnail: "/img/png/template2.png",

          id: 2,
        },
        {
          name: "Email Template 3",
          thumbnail: "/img/png/Template-3-preview.png",
          id: 3,
        },
        {
          name: "Email Template 4",
          thumbnail: "/img/png/template-4-preview.png",
          id: 4,
        },
      ],
      active: "My Templates",
      templatedata: [],
      templatedata: "",
      showTemplate: false,
      template_id: null
    };
  },
  props: {
    senderEmail: { type: String, default: null }
  },
  mounted() {
    this.TemplateList();
  },
  components: {
    templatePreview
  },
  methods: {
    openDialog(template) {
      //  return console.log("templateedddd", template)
      // return alert("hihihi")
      this.selectedTemplate = template;
      this.showPreviewDialog = true;
    },
    openDialogmyTemplate(template) {
      this.selectedTemplate = template;
      this.showTempaltePreviewDialog = true;
    },
    async TemplateList() {
      const res = await subadminGet("/email-template")
      this.templatedata = res.data.data
    },
    async deleteTemplate(v) {
      if (await deleteConfirm('Do You Want to delete this Template')) {
        this.loading = true;
        try {
          const res = await subadminDelete(`/email-template/${v._id}`);
          console.log("res", res);
          if (res.status) {
            this.loading = false;
            await this.TemplateList();
            successAlert('Template Deleted Successfully');
          } else {
            errorAlert('Failed to delete template');
          }
        } catch (err) {
          console.error("Delete error:", err);
          errorAlert('Something went wrong');
        } finally {
          this.loading = false; // ✅ always reset loading
        }
      }
    },
    goToTemplatePreview(template) {
      console.log("jhddshdhgdj", template)
      this.showTemplate = true
      this.$router.push({
        query: {
          ...this.$route.query,
          data: encodeURIComponent(JSON.stringify(template)),
        },
      });
    },
    // setData(template) {
    //   this.$router.push({
    //     path: '/admin/notification/emails/templatelibrary/templatepreview',
    //     query: { data: JSON.stringify(template), edit: 'true' }
    //   });
    // },
    viewTemplate(id) {
      this.showTemplate = true
      this.template_id = id
      this.$router.push({
        query: {
          ...this.$route.query, // preserve existing query params
          id: id                // add or overwrite `id`
        }
      });
    },
    templatePreview(data) {
      this.$emit('proceed', data)

    }


  },
};
</script>
<style scoped>
@import url('style.css')
</style>
