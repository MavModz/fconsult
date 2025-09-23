<!-- @format -->

<template>
  <div class="offers-container mt-5">
    <div class="overflow-auto">
      <div class="scroller">
        <div class="cards p-[5px]" v-for="i in 5">
          <div class="card-body">
            <div class="card-img-top">
              <img src="/img/png/accommodation-img-1.png" alt="accommodation-img" />
            </div>
            <div class="accommodation-save">
              <a href="#"><i class="fa fa-bookmark-o"></i></a>
            </div>
            <div class="card-body ps-0">
              <div class="card-title d-flex justify-content-between align-items-center mb-3">
                <h5><a href="#">Big Tree Cottage</a></h5>
                <a href="#"><img src="/img/svg/chat-icon.svg" /></a>
              </div>
              <ul class="d-flex list-unstyled align-items-center">
                <li>
                  <span><i class="fa fa-star"></i></span>4.8<span>(24)</span>
                </li>
                <li><img src="/img/svg/credit-card.svg" />$$$</li>
                <li><img src="/img/svg/pin-2.svg" />0.5 km from center</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PrVisa',
};
</script>

<style scoped>
/** @format */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-track {
  border: 0px solid #e8e8e8;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg,
      var(--color-background),
      var(--color-background));
}

.offers-container {
  box-shadow: 0px 4.94px 14.83px 0px #1f1b2d14;
  border: 1.24px solid #efecf3;
  width: 95%;
  /* margin: 0 auto; */
  border-radius: 20px;
}

.btn-container {
  display: flex;
  /* justify-content: space-between; */
  width: 60%;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  align-items: center;
  border-bottom: 0.2px solid #bdbdbd;
}

.btn-container>span {
  cursor: pointer;
}

.btn-container>.active {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f5f5f5;
  padding: 6px 20px;
  border-radius: 6px;
  color: #3c3c3c;
}

.btn-container>.active::before {
  content: '';
  position: absolute;
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 50%;
}

.scroll-btn {
  width: 30px;
  height: 30px;
  background: linear-gradient(81.8deg,
      rgba(242, 60, 60, 0.15) 9.52%,
      rgba(242, 60, 60, 0.1) 67.4%);
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0px 2.46px 11.08px 0px #0d5ef43d;
}

.cards>img {
  width: 1000px;
}

.cards {
  max-width: 400px;
  width: fit-content;
  box-shadow: 0px 26.22px 59px 0px #0000000f;
  border: 0.77px solid #a3aed0;
  padding: 10px;
  border-radius: 18px;
}

.scroller {
  width: max-content;
  margin: 0 auto;
  display: flex;
  column-gap: 40px;
  padding-inline: 20px;
}

.image-content {
  position: relative;
}

.image-content>img {
  height: -webkit-fill-available;
  border-radius: 18px;
}

.image-content>.text {
  display: flex;
  align-items: center;
  -moz-column-gap: 20px;
  column-gap: 20px;
  position: absolute;
  bottom: -20px;
  left: 20px;
  z-index: 1;
}

.text>img {
  width: 70px;
  border-radius: 50%;
  height: 70px;
}

.text>h5 {
  font-size: 16px;
  color: #fff;
}

.text-item {
  position: absolute;
  top: 0;
  left: 0;
  color: #ffff;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(355.84deg,
      #2c2c2c -0.18%,
      rgba(17, 28, 68, 0) 93.6%);
}

.cards>h3 {
  line-height: 40px;
  font-weight: 600;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
}

.rating>button {
  color: #ff5757;
  border: 0.84px solid #ff5757;
  padding: 10px 20px;
  border-radius: 10px;
}

.rating>div {
  border: 1px solid var(--inactive, #a3aed0);
  padding: 10px 20px;
  border-radius: 25px;
}

.rating-text {
  font-weight: 600;
}

.rating-percent {
  color: #a3aed0;
}

@media (max-width: 480px) {
  .cards {
    max-width: 350px;
  }
}

@media (max-width: 375px) {
  .cards {
    max-width: 314px;
  }
}
</style>
