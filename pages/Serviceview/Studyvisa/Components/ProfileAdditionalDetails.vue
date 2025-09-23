<template>

  <div class="details-card">
    <h3 class="details-title">Additional Details</h3>
    <div class="details-grid">
      <div  class="detail-item">
        <div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-[9px]"><span> On-Campus Accommodation Available?</span>
        <div class="uppercase tracking-wide">{{ data.accoummodation_available }}</div>
      </div>
      </div>
      </div>
      <div class="detail-item">
        <div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-[9px]">
        <span>Health Insurance Required?</span>
        <div class="uppercase tracking-wide">{{ data.health_insurance }}</div>
      </div>
      </div>
      </div>
      <div class="detail-item">
        <div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-[9px]">
        <span> Financial Sponsorship Required</span>
        <div class="uppercase tracking-wide">{{ data.finacial_sponsorship }}</div>
      </div>
      </div>
      </div>
      <div v-if="data.language_score" class="detail-item">
        <div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-[9px]">
        <span> Require Minimum Language Score </span>
        <div >
          {{ data.language_score }}
        </div>
        </div>
        </div>
      </div>
      <div v-if="data.living_expenss" class="detail-item">
        <div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-[9px]">
        <span> Living Expense sentence goes here</span>
        <div>{{ data.living_expenss }}</div>
      </div>
      </div>
      </div>
      <div class="detail-item">
        <div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-[9px]">
        <span> Visa Sponsor Require</span>
        <div class="uppercase tracking-wide">{{ data.visa_sponsor }}</div>
      </div>
      </div>
      </div>
      <div v-if="data.language_proficiency_requirement" class="detail-item">
        <div class="d-flex gap-3 align-items-top"><img class="mt-[11px]" src="/public/img/png/Addtional-dot.png"><div class="d-flex flex-col gap-[9px]">
        <span>Language Proficiency Requirement</span>
        <div>{{ data.language_proficiency_requirement }}</div>
      </div>
      </div>
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