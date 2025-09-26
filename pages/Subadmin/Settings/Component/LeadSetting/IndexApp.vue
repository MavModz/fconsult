<template>

    <div class="main-lead-container">
    <div class="Lead-container">
      <div class="Lead-wrapper">
        <h2 class="lead-heading">Lead Setting</h2>
        <div class="lead-row2">
          <h2 class="lead-row2-heading">Language Name</h2>
          <div class="lead-box">
            <input type="text" placeholder="IELTS"  id="lead-search" />
             <button class="lead-box-button">+Add</button>
          </div>
        </div>
        <div class="lead-row3-box">
          <div class="lead-row3-container">
          <div class="lead-row3-box-heading">
        <h3>German</h3>
        <div class="lead-edit">
          <img src="" class="edit" alt="edit" />
            <img src="" alt=" delete" />
        </div>   
        </div>
        <hr  class="lead-line"/>
        <div class="lead-row4">
         <h3>A1</h3>
        <h3>B1</h3>
        <h3>C1</h3>
        <h3>D1</h3>
        </div>
        <div class="lead-row5">
          <h3>A2</h3>
          <h3>B2</h3>
          <h3>C2</h3>
          <h3>D2</h3>
        </div>
      </div>
      
    </div>
        <div class="lead-row3-box">
          <div class="lead-row3-container">
            <div class="lead-row3-box-heading">
              <h3>IELTS</h3>
              <div class="lead-edit">
                <img src="/img/png/edit.png" class="edit" alt="edit" />
                <img src="/img/png/trash-2.png" alt=" delete" />
              </div>
            </div>
            <hr  class="lead-line"/>
            <div class="lead-row4">
              <h3>Writing</h3>
              <h3>Reading</h3>
              <h3>Listing</h3>
              <h3>Reading</h3>
            </div>
          
          </div>   
        </div>
    </div>
</div>
</div>
  
</template>

<script>
export default {
  name: 'LeadSetting'
}
</script>

<style scoped>
@import url('./style.css');
</style>


