<template>
    <div class="media-section">
        <div class="media-header">
    <h3>Media</h3>
    <!-- <div class="media-filters">
      <button class="filter active">All</button>
      <button class="filter">Pictures</button>
      <button class="filter">Video</button>
    </div> -->
  </div>

  <div class="media-grid max-h-[504px] overflow-y-auto">
    
    <div class="media-item" v-for="(item,index) in data">
      <img :src="item.media_url" alt="media" />
    </div>
    <!-- <div class="media-item video">
      <img src="/public/img/png/media-image-3.png" alt="video" />
      <span class="play-icon">&#9658;</span>
    </div> -->
   
   
  </div>
    </div>
</template>
<script>
   export default{
    data(){
      return{

      }
    },
    props:{
     data:Array
    }
   }
</script>
<style scoped>
.media-section {
    background: #fff;
    margin-top: 20px;
    border-radius: 17px;
    overflow: hidden;
    border: 2px solid #EDEDED;
    padding: 32px 44px;
}
.media-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 29px;
}

.media-header h3 {
  margin: 0;
  font-size: 23px;
  color: #1F1B2D;
font-weight: 700;
line-height: 130%;
}

.media-filters {
  display: flex;
  gap: 12px;
  align-items: center;
}

.media-filters .filter {
  padding: 8px 16px;
  border-radius: 8px;
  background: #f5f4f8;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #454056;
  line-height: 150%;
  font-weight: 400;
}

.media-filters .filter.active {
  background: #ffffff;
  color: #ff5757;
  box-shadow: 0px 4px 12px 0px #1F1B2D14 !important;
  box-shadow: 0px 2px 2px -2px #1F1B2D14 ;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 24px;
  padding-right: 30px;
}

.media-item {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}

.media-item img {
  width: 100%;
  /* max-width: 330px; */
  height: auto;
  display: block;
  border-radius: 6px;
}

.media-item.video .play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: white;
  opacity: 0.8;
  pointer-events: none;
}

@media (max-width: 500px) {
    .media-section {
      margin-top: 17px;
        padding: 24px 18px;
    }
    .media-grid {
    gap: 18px;
}
.media-filters{
  margin-top: 18px;
}
.media-header h3 {
    font-size: 22px;
    font-weight: 600;
}
    }
    @media only screen and (min-width: 425px) and (max-width: 890px) {
    .media-section {
        padding: 26px 22px;
    }}
</style>