<!-- @format -->

<template>
  <div class="tab-pane card card-body fade show active" id="overview">
    <div v-if="lead.loading" class="card">
      <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-5 mt-5" v-for="i in 4">
          <div>
            <Skeleton width="10rem" class="mb-2 mt-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2 mt-1"></Skeleton>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="single-overview-wrapper">

      <div class="single-overview-email">
        <div class="single-eml-wdth">
          <label class="single-view-nmbr">Phone Number</label>
          <div class="single-ovr-spn">
            <!-- <i id="single-over-phn-icn" class="bi bi-telephone"></i> -->
            <BootstrapIcon name="telephone" class="icon3" />

            <input v-model="lead.phone" class="single-lead-nptphn" type="text" placeholder="enter your phone number"
              disabled />
          </div>
        </div>
        <div class="single-eml-wdth">
          <label class="single-view-nmbr">Email ID</label><br />
          <div class="single-ovr-spn">
            <!-- <i id="single-over-phn-icn" class="bi bi-envelope"></i> -->
            <BootstrapIcon name="envelope" class="icon3" />

            <input v-model="lead.email" class="single-lead-nptphn" type="email" placeholder="enter your email"
              disabled />
          </div>
        </div>
      </div>
      <div class="single-overview-email pt-3">
        <div class="single-eml-wdth">
          <label class="single-view-nmbr">Lead ID</label>
          <div class="single-ovr-spn">
            <span class="single-lds-yetnot">
              <p>{{ lead.unique_id }}</p>
            </span>
          </div>
        </div>
        <div class="single-eml-wdth">
          <label class="single-view-nmbr">Lead Source</label><br />
          <div class="single-ovr-spn">
            <span class="">
              <BootstrapIcon name="link-45deg" class="icon3 text-[20px]" />
            </span>
            <span class="single-lds-yetnot">
              <p>{{ lead.source }}</p>
            </span>
          </div>
        </div>
      </div>

      <div v-if="lead.source == 'facebook'" class="single-eml-wdth-lnk">
        <label class="single-view-nmbr">Campaign Name</label>
        <div class="single-lead-nptphn-lnkk">
          <span class="">
            <BootstrapIcon name="link-45deg" class="icon3 text-[20px]" />
          </span>
          <span class="single-lds-yetnot">
            <p>{{ lead.facebook.name }}</p>
          </span>
        </div>
      </div>

      <div v-if="lead.source == 'facebook'" class="single-eml-wdth-lnk">
        <label class="single-view-nmbr">Campaign Id</label>
        <div class="single-lead-nptphn-lnkk">
          <span class="">
            <BootstrapIcon name="link-45deg" class="icon3 text-[20px]" />
          </span>
          <span class="single-lds-yetnot">
            <p>{{ lead.facebook.source_campaign_id }}</p>
          </span>
        </div>
      </div>

      <div v-if="lead.source == 'facebook'" class="single-eml-wdth-lnk">
        <label class="single-view-nmbr">Add Account Id</label>
        <div class="single-lead-nptphn-lnkk">
          <span class="">
            <BootstrapIcon name="link-45deg" class="icon3 text-[20px]" />
          </span>
          <span class="single-lds-yetnot">
            <p>{{ lead.facebook.account_id }}</p>
          </span>
        </div>
      </div>

      <!-- <div class="single-eml-wdth-lnk">
          <label class="single-view-nmbr">Assigned To</label><br/>
          <div class="single-lead-nptphn-del">
               <span class="single-lds-yetnot">
                  <p>Lead Not Assigned Yet</p>
               </span>
            <span class="single-lead-nptphn-spn">
               <i class="bi bi-trash3"></i>
               <i class="bi bi-pencil-square"></i>
               </span>
          </div>
        </div> -->

      <div class="single-eml-wdth-lnk pt-3">
        <label class="single-view-nmbr">Service Opted</label><br />
        <div class="single-lead-nptphn-opted">
          <span class="single-lds-yetnot-opted">
            <p class="single-lead-stdyvsa">{{ lead.service }}</p>
          </span>
        </div>
      </div>

      <!-- <div class="single-leads-teck-container-assign">
          <div class="single-lead-assign-stl-ovr">
            <div class="single-lead-assign-timeee">
              <div class="single-lead-det-inside-date-ovr">
                <p>May 08 2022</p>
              </div>
            </div>
            <div class="single-lead-assigntime-fr-over">
              <div class="single-lead-textctr">
                <div class="single-lead-ass-img-size">
                  <img src="/img/png/abcd.png" alt="">
                </div>
                <div class="single-lead-assign-nmw">
                  <p>Name</p>
                </div>
              </div>
              <div class="single-leads-ovr-arrdgns">
                <img src="/img/png/arrr.png" alt="">
              </div>
              <div class="single-lead-textctr">
                <div class="single-lead-ass-img-size">
                  <img src="/img/png/abcd.png" alt="">
                </div>
                <div class="single-lead-assign-nmw">
                  <p>Name</p>
                </div>
              </div>
              <div>
                <p class="single-lead-ovr-lsttout">Outlines keep you honest. Indulging in poorly driving
                  and keep structure
                </p>
                <p class="single-lead-ovr-lsttime">08:42 AM</p>
              </div>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeadOverview',
  props: {
    lead: {},
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
