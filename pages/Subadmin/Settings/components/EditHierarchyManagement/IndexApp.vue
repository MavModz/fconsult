<!-- @format -->

<template>
  <div class="upload-image-box" style="max-height: 620px;">
    <div class="upload-top-bar">
      <span class="upload-text">Edit Hierarchy Management </span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleEditHierarchyManagement(false)">close</i>
    </div>
    <div class="image-upload-container">
      <div class="heading">
        <div class="title">
          <h3>Superior Management</h3>
          <hr />
        </div>
        <div class="title">
          <h3>Manager</h3>
          <hr />
        </div>
        <div class="title">
          <h3>Executives</h3>
          <hr />
        </div>
      </div>
      <div class="heading">
        <div class="title">
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
        </div>
        <div class="title">
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
        </div>
        <div class="title">
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
          <div class="name-edit">
            <span>Dishant</span>
            <span><img src="/img/svg/light-edit.svg" alt="" style="width: 20px" /></span>
            <span><img src="/img/svg/cancle.svg" alt="" /></span>
          </div>
          <hr />
        </div>
      </div>
    </div>
    <!-- <div class="button-container" style="row-gap: 20px;
    display: flex;
    flex-direction: column;">
      <input type="text" placeholder="UPI">
      <button class="submit-btn" @click="handleSubmitLanguage(true)">Submit</button>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    handleEditHierarchyManagement: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
