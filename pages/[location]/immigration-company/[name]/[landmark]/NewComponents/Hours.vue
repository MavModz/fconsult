<!-- @format -->

<template>
  <div v-if="company?.timings" class="cards ">
    <div class="card-body">
      <div class="card-title">
        <h2 class="text-[20px] lg:text-[30px] pb-[10px]">Opening Hours</h2>
      </div>
      <div class="brak-line"></div>
      <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
        <span
          class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Sunday</span
        >
        <span
          v-if="company.timings.day1.status"
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >{{ company.timings.day1.from }} - {{ company.timings.day1.to }}</span
        >
        <span
          v-else
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Closed</span
        >
      </div>
      <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
        <span
          class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Monday</span
        >
        <span
          v-if="company.timings.day2.status"
            class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >{{ company.timings.day2.from }} - {{ company.timings.day2.to }}</span
        >
        <span
          v-else
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Closed</span
        >
      </div>
      <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
        <span
            class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Tuesday</span
        >
        <span
          v-if="company.timings.day3.status"
            class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >{{ company.timings.day3.from }} - {{ company.timings.day3.to }}</span
        >
        <span
          v-else
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Closed</span
        >
      </div>
      <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
        <span
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Wednesday</span
        >
        <span
          v-if="company.timings.day4.status"
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >{{ company.timings.day4.from }} - {{ company.timings.day4.to }}</span
        >
        <span
          v-else
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Closed</span
        >
      </div>
      <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
        <span
            class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Thursday</span
        >
        <span
          v-if="company.timings.day5.status"
            class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >{{ company.timings.day5.from }} - {{ company.timings.day5.to }}</span
        >
        <span
          v-else
            class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Closed</span
        >
      </div>
      <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
        <span
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Friday</span
        >
        <span
          v-if="company?.timings?.day6?.status"
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >{{ company?.timings?.day6?.from }} -
          {{ company?.timings?.day6?.to }}</span
        >
        <span
          v-else
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Closed</span
        >
      </div>
      <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
        <span
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Saturday</span
        >
        <span
          v-if="company.timings.day7.status"
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >{{ company.timings.day7.from }} - {{ company.timings.day7.to }}</span
        >
        <span
          v-else
           class="days text-[18px] max-[991px]:text-[16px] max-[425px]:text-[14px]"
          >Closed</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    company: {},
  },
};
</script>

<style scoped>
.card {
  border: none !important;
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title > h4 {
  font-weight: 600;
  color: #1f1b2d;
}
.card-title > h5 {
  font-weight: 700;
  line-height: 36px;
  color: #11142d;
}
.edit_btn {
  height: 40px;
  display: flex;
  align-items: center;
  width: 90px;
  justify-content: center;
  border-radius: 50px;
  background: #fff;
  /* box-shadow: 8px 8px 16px #c9c9c9, -8px -8px 16px #fff; */
  box-shadow: 0px 3.16px 9.48px 0px #1f1b2d45;;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.card-body > span {
  color: #ff5757;
  text-decoration: underline;
  font-weight: 500;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  border-radius: 0.25rem;
}
.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
}
.card-title {
  margin-bottom: 0.5rem;
}
.cards {
  border-radius: 10px;
  background: #fff;
  box-shadow: 14px 14px 57px #e6e6e6, -14px -14px 57px #fff;
  /* margin: 5px 0; */
}
.brak-line {
  border: 0.51px solid #e3e3e3;
}
.days {
  color: #585858;
}
#to {
  color: #585858;
  font-weight: 700;
  width: 42px;
}
.day,
.status,
.to {
  margin: 0 5px;
}
.to {
  color: #585858;
  font-weight: 700;
}
@media (max-width: 768px) {
  .day,
  .status,
  .to {
    margin: auto 0;
  }
}
</style>
