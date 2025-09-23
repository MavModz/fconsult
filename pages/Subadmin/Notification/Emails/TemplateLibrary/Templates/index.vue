<template>
  <div>
    <!-- Top Label -->
    <!-- {{ active }} -->
    <div class="flex justify-end gap-2 w-[100%] text-[#ff5757]" >
      <span @click="active = 'My Templates'"
        class="bg-[#FF57571A] cursor-pointer rounded-full px-[16px] font-semibold text-[15px] py-[7px]">
        My Templates
      </span>
      <span @click="active = 'Create Template'"
        class="bg-[#FF57571A] cursor-pointer rounded-full px-[16px] font-semibold text-[15px] py-[7px]" v-if="permission?.notification?.email?.email_template?.add">
        Create Template
      </span>
      
    </div>

    <!-- Template Grid -->
    <div v-if="active == 'Create Template'"
      class="mt-3 flex w-[100%] flex-wrap gap-6">
      <div v-for="(template, index) in templates" :key="index"
        class="group relative  w-[330px]  rounded-xl overflow-hidden bg-white border-[0.8px] border-[#C7D5E1] cursor-pointer">
        <!-- Thumbnail -->
        <img :src="template.thumbnail" alt="Template"
          class="w-full object-contain mt-2 h-[360px] border-b-[2px] border-[#ededed]  transition duration-300" />

        <!-- Hover Buttons -->
        <div
          class="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center gap-3 bg-black/30 transition-all">
          <router-link :to="`/subadmin/notification/emails/templatelibrary/templatepreview?id=${template.id}`"
            class="bg-[#FF5757] hover:bg-[#e04b4b] text-white px-3 py-2 rounded-md text-sm font-medium shadow flex items-center gap-2">
            <i class="bi bi-check2-all"></i> Use This Template
          </router-link>
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
    :loading="loading"
    dataKey="id"
    :paginator="true"
    :rows="10"
 
    responsiveLayout="scroll"
    class="p-datatable-sm leadabc"
    emptyMessage="No data found"
  >
    <!-- Sr. No. -->
    <Column header="Sr. No.">
      <template #body="{ index }">
        {{ index + 1 }}
      </template>
    </Column>

    <!-- Title -->
    <Column field="title" header="Title" />

    <!-- Tag -->
    <Column field="template_tag" header="Tag" />

    <!-- Created_by -->
    <Column header="Created By">
      <template #body="{ data }">
        {{ data.user_id?.name || '-' }}
      </template>
    </Column>

    <!-- Created_at -->
    <!-- <Column field="createdAt" header="Created At" /> -->
     <Column field="createdAt" header="Created At">
  <template #body="{ data }">
    {{
      new Date(data.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).replace(",", " •")
    }}
  </template>
</Column>

    <!-- Action Buttons -->
    <Column header="Action">
      <template #body="{ data }">
        <div class="btn-group">
          <span class="td-btn" @click="openDialogmyTemplate(data)">
            <img src="/img/svg/eye.svg" alt="view" />
          </span>
          <span class="td-btn" @click="setData(data)" v-if="permission?.notification?.email?.email_template?.edit">
            <img src="/img/svg/edit.svg" alt="edit" />
          </span>
          <span class="td-btn" @click="deleteTemplate(data)" v-if="permission?.notification?.email?.email_template?.delete">
            <img src="/img/svg/trash.svg" alt="delete" />
          </span>
          <span class="td-btn" @click="goToTemplatePreview(data)" v-if="permission?.notification?.email?.email_template?.add">
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
</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

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
           permission:null,
    };
  },
  mounted() {activateSubmenu('e1', 'Templates');
    this.TemplateList();
      this.getPermission();
  },
   async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    openDialog(template) {
      console.log("template", template)
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
      this.$router.push({
        path: '/subadmin/notification/emails/templatelibrary/templatepreview',
        query: { data: JSON.stringify(template) }
      });
    },
    setData(template) {
      this.$router.push({
        path: '/subadmin/notification/emails/templatelibrary/templatepreview',
        query: { data: JSON.stringify(template),edit:'true' }
      });
    },

  },
};
</script>
<style scoped>
@import url('style.css')
</style>
