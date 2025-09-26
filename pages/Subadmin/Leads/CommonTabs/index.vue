<template>
  <div class="d-flex justify-content-between align-items-center w-[100vw]">
  <div class="d-flex items-center gap-x-[15px]">
    <NuxtLink v-if="followup>0" to="/subadmin/leads/view" class="lead-tab" :class="{ active: isActiveTab('/subadmin/leads/view') }">
      Leads
    </NuxtLink>
    <NuxtLink v-if="followup>0" to="/subadmin/leads/followup" class="lead-tab"
      :class="{ active: isActiveTab('/subadmin/leads/followup'), 'followHigh': isActiveTab('/subadmin/leads/view') }">
      <span class="follow-up-count"
        :class="{ 'follow-active': isActiveTab('/subadmin/leads/followup'), 'follow-default': isActiveTab('/subadmin/leads/view') || isActiveTab('/subadmin/leads/incomplete') }">{{ followup }}
      </span>Follow-up Leads
    </NuxtLink>
    </div>
    <NuxtLink v-if="customers != 0" to="/subadmin/leads/incomplete" class="lead-tab"
      :class="{ active: isActiveTab('/subadmin/leads/incomplete'), 'highlighted': isActiveTab('/subadmin/leads/view') || isActiveTab('/subadmin/leads/followup') }">
      <span class="incomplete-lead-count" :class="{
        'incomplete-active': isActiveTab('/subadmin/leads/incomplete'),
        'incomplete-default': isActiveTab('/subadmin/leads/followup') || isActiveTab('/subadmin/leads/view')
      }">
        {{ customers }} </span>
      Incomplete Leads<i class="bi bi-box-arrow-up-right p-2"></i>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      followup: 0,
      customers: 0,
      count:null
    }
  },
  async mounted() {
    let count =( await subadminGet(`/admin-leadcounts`)).data;
    this.followup=count.followupCounts
    this.customers=count.leadCount
  },
  methods: {
    isActiveTab(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style>
.lead-tab {
  border: 1px solid #a5a5a5;
  padding: 10px 15px ;
  color: #676b6c;
  border-radius: 5px;
display: flex;
align-items: center;
  transition: all 0.3s ease;
  background-color: #fff;
}
.lead-tabs{
  display: flex;
align-items: center;
font-weight: 500;
font-size: 19px;
color: #3C3C3C;
}
.lead-tab.active {
  background-color: #ff5757;
  color: #fff;
  border: none;
}

.lead-tab.highlighted {
  color: #ff5757;
  font-weight: 400;

}

.lead-tab.followHigh {
  color: #676b6c;
  font-weight: 400;

}

.incomplete-tab.highlighted {
  color: red;
}

.incomplete-lead-count.highlight-count {
  background-color: #ff5757;
  color: #fff;
  padding: 3px;
  border-radius: 15px;
  margin-inline-end: 5px;
}


.follow-up-count.follow-active {
  background-color: #fff;
  color: #ff5757;
}

.follow-up-count.follow-default {
  background-color: #5d6b98;
  color: #fff;
}

.incomplete-lead-count, .follow-up-count {
  padding:4px 5px 0px;
  height: 33px;
  width: 33px;
  margin-inline-end: 5px;
    border-radius: 100%;
    display: inline-block;
    font-size: 15px;
    font-weight: 100;
    line-height: 25px;
    text-align: center;
    transition: margin 0.1s ease-in-out;
    overflow: hidden;
}

.incomplete-lead-count.incomplete-active {
  background-color: #fff;
  color: #ff5757;
}

.incomplete-lead-count.incomplete-default {
  background-color: #3C3C3C;
  color: #fff;
}
</style>
