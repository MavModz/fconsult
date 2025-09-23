<template>

  <div class="details-card">
    <h3 class="details-title">Additional Details</h3>

    <div class="details-grid">
      <div  class="detail-item">
<div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col  gap-0 md:gap-[9px]">
        <span>Proof of Funds</span>
        <div class="uppercase tracking-wide text-[#838383]">{{ data.proof_of_funds }}</div>
      </div>
      </div>
      </div>
      <div class="detail-item">
<div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-0 md:gap-[9px]">
        <span>Language Test</span>
        <div class="uppercase tracking-wide text-[#838383]">{{ data.language_test }}</div>
      </div>
      </div>
      </div>
      <div class="detail-item">
<div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col  gap-0 md:gap-[9px]">
        <span>Required Job Offer</span>
        <div class="uppercase tracking-wide text-[#838383]">{{ data.job_offer }}</div>
      </div>
      </div>
      </div>
      <div  class="detail-item">
<div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col  gap-0 md:gap-[9px]">
        <span>Job Search Assistance</span>
        <div class="uppercase tracking-wide text-[#838383]">{{ data.job_search_assistance }}</div>
      </div>
      </div>
      </div>
      <div  class="detail-item">
<div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col  gap-0 md:gap-[9px]">
        <span>Settlement Services </span>
        <div class="uppercase tracking-wide text-[#838383]">{{ data.settlement_services }}</div>
      </div>
      </div>
      </div>
      <div class="detail-item">
<div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-0 md:gap-[9px]">
        <span>Family Sponsorship</span>
        <div class="uppercase tracking-wide text-[#838383]">{{ data.family_sponsorship }}</div>
      </div>
      </div>
      </div>
   

    </div>
    <div class="mid-bar">
      <h3 >PR Benefit</h3>
      <div class="mt-[18px]">
        <p class="text-[#666276] 	leading-[150%] text-[18px] " v-html="data.pr_benefit"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {

    }
  },

}
</script>
<style scoped>
.details-card {
  margin-top: 20px;
  background: #fff;
  border-radius: 17px;
  overflow: hidden;
  border: 2px solid #EDEDED;
  padding: 32px 44px;
}

.details-title {
  color: #1F1B2D;
  line-height: 130%;
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 30px;
}
img{ 
  width: 8px;
  height: 8px;
}

.details-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 38px;
}

.detail-item {
  flex: 1 1 45%;
  /* display: flex; */
  align-items: center;
  gap: 14px;
}

.detail-item span {
  font-size: 19px;
  line-height: 150%;
  color: #1F1B2D;
}

.mid-bar{
  border-top: 2px solid #EDEDED;
  padding-top: 30px;
  margin-top: 30px;
}
.mid-bar h3{
font-size: 19px;
font-weight: 700;
line-height: 130%;
color: #3c3c3c;
}
@media (max-width: 425px) {
  .details-card {
    margin-top: 17px;
    padding: 24px 18px;
  }

  .details-title {
    font-size: 22px;
    margin-bottom: 15px;
  }

  .details-grid {
    gap: 15px;
    flex-direction: column;
  }

  .detail-item {
    gap: 6px;
  }

  /* .detail-item img {
    width: 24.5px;
    height: 22px;
  } */

  .detail-item span {
    font-size: 17px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 890px) {
  .details-card {
    padding: 26px 22px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 1050px) {
  .details-grid {
    gap: 23px;
  }
}

@media only screen and (min-width: 425px) and (max-width: 720px) {
  .details-grid {
    flex-direction: column;
  }

  .details-title {
    margin-bottom: 20px;
  }
}
</style>