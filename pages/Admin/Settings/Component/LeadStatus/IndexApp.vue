
<template>
  <div class="main-leadstatus-container">
    <div class="leadstatus-container">
    <div class="leadstatus-wrapper">
      <div class="leadstatus-content">
        <div class="leadstatus-first">
        <h2>
          Lead Status
        </h2>
        <div class="leadstatus-row1">
          <h3>Status Name</h3>
        </div>
        <input type="text" class="leadstatus-input" placeholder="Hot Lead" />
        <div class="leadstatus-button-box">
        <button class="leadstatus-add">+Add</button>
       </div>
      </div>
      <div>
        <img src="" alt="line" />
      </div>
        <div class="leadstatus-section3">
          <div class="leadstatus-box">
            <div class="leadstatus-box-wrapper">
              <h3>Hot Leads</h3>
              <div class="leadstatus-logo">
               <img src="" alt="" />
              </div>
            </div>
          </div>
            <div class="leadstatus-box2">
              <div class="leadstatus-box-wrapper">
                <h3>Interested</h3>
                <div class="leadstatus-logo">
                 <img src="" alt="" />
                </div>
              </div>
            </div>
              <div class="leadstatus-box3">
              <div class="leadstatus-box-wrapper">
                <h3>Not Answering</h3>
                <div class="leadstatus-logo">
                 <img src="" alt="" />
                </div>
              </div>
            </div>
              <div class="leadstatus-box4">
              <div class="leadstatus-box-wrapper">
                <h3>Pending</h3>
                <div class="leadstatus-logo">
                 <img src="" alt="" />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>


export default {
  name: 'LeadStatus'
}
</script>
  
<style scoped>
@import url('./style.css');
</style>




