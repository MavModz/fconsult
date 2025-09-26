<template>
    <div v-if="data" class="languages webhook-container">
      <div class="btn-container">
        <span id="languages-heading">WordPress Form Integration</span>
        <Button label="Generate New link" class="btn btn-primary" @click="importModal = true" v-if="permission?.leads?.lead_integration?.add"/>
      </div>
      <div class="break-line" style="margin-inline: 0"></div>
  
  
      <div class="webhook">
        <div class="heading-container">
          <span id="webhook-heading"></span>
        </div>
        <p>
            Create Your Own Forms and Integrate Seamlessly with Any Custom Website or Landing pages to Fetch Leads Directly into Your CRM.
        </p>
      </div>
      <div class="warning">
        <p>
          <img src="/img/svg/alert.svg" alt="" />
          Allowed Column Names : Role , Email , Organisation , State , Full Name ,
          Country , City , Phone Number
        </p>
      </div>
  
  
      <table>
        <thead>
          <tr>
            <th>Title</th>
          <th>Pipeline</th>
          <th>Created By</th>
          <!-- <th>Leads</th> -->
          <th>Connected</th>
          <th>Created At</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in wordpress">
            <td>{{ i.title }}</td>
            <td>{{ i.pipeline.pipeline_name }}</td>
            <td>{{ i.created_by.name }}</td>
            <!-- <td>{{ i.leads }}</td> -->
            <td>{{ i.connected }}</td>
            <td>{{ i.createdAt.split('T')[0] }}</td>
            <td><Button label="Copy Link" @click="copyToClipboardKey(i._id)" class="btn btn-primary"/></td>
          </tr>
        </tbody>
      </table>
  
    </div>
  
    <Dialog v-model:visible="importModal" modal header="Import Lead" :style="{ 'min-width': '25vw' }" :draggable="false">
      <FormKit type="form" @submit="submitForm">
        <FormKit label="Enter Title" validation="required" type="text" name="title" placeholder="Enter Title" />
        <FormKit label="Select Pipeline to Import" validation="required" type="select" name="pipeline"
          placeholder="Select Pipeline" :options="allPipeline" @change="setCampaign()" v-model="currentPipe" />
        <FormKit label="Select campaign to Import" validation="required" type="select" name="campaign"
          placeholder="Select campaign" :options="allCampaign" />
        <div class="button-container py-3 justify-content-center">
          <center>
            <Button type="submit" :loading="loading.i" label="Import" icon="pi pi-save" class="cropper-upload" />
          </center>
        </div>
      </FormKit>
    </Dialog>
  </template>
  
  <script>
  definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
  
  export default {
    data() {
      return {
        data: null,
        loading: { i: false },
        importModal: false,
        currentPipe: null,
        allPipelines: [],
        allPipeline: [],
        allCampaign: [],
        wordpress: null,
        apiurl:"https://api.findandconsult.com/wordpress-automation"
      };
    },
    async setup() {
      const data = (await useFetch('/api/users/admin')).data.value;
      return { data };
    },
  
    async mounted() {
      activateSubmenu('l3', 'Wordpress Form', true);
      this.init()
      this.allPipelines = (await subadminGet(`/pipelines`)).data.data
      this.allPipeline = this.allPipelines.map(i => ({
        label: i.pipeline_name,
        value: i._id,
      }));
    },
    methods: {
      async init() {
        await subadminGet(`/wordpress-automation`).then((r) => {
          this.wordpress = r.data.data
        }).catch((e) => { })
      },
      setCampaign() {
        for (let i = 0; i < this.allPipelines.length; i++) {
          if (this.allPipelines[i]._id == this.currentPipe) {
            this.allCampaign = this.allPipelines[i].campaigns.map(i => ({
              label: i.name,
              value: i._id,
            }));
          }
        }
      },
      async submitForm(v) {
        await subadminPost(`/wordpress-automation`, v).then((r) => {
          this.importModal = false
          this.init()
        }).catch((e) => { })
      },
      async copyToClipboardKey(d) {
        try {
          await navigator.clipboard.writeText(`${this.apiurl}/${d}`);
          successAlert("Api Url Copied To Vlipboard");
        }
        catch (err) {
  
          errorAlert("Failed to copy text to clipboard!");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('style.css');
  </style>
  