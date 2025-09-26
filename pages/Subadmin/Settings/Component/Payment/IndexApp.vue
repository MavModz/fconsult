
<template>
  <div class="main-Payment-container">
    <div class="Payment-container">
      <div class="Payment-wrapper">
        <div class="Payment-content">
          <div class="Payment-first">
            <h2>
              Payment Mode
            </h2>
            <div class="Payment-row1">
              <h3>Mode</h3>
            </div>
            <input type="text" class="Payment-input" placeholder="UPI" />
            <div class="Payment-button-box">
              <button class="Payment-add">+Add</button>
            </div>
          </div>
          <div>
            <img src="" alt="line" />
          </div>
          <div class="Payment-section3">
            <div class="Payment-box">
              <div class="Payment-box-wrapper">
                <h3>Card</h3>
                <div class="Payment-logo">
                  <img src="" alt="" />
                </div>
              </div>
            </div>
            <div class="Payment-box2">
              <div class="Payment-box-wrapper">
                <h3>Cash</h3>
                <div class="Payment-logo">
                  <img src="" alt="" />
                </div>
              </div>
            </div>
            <div class="Payment-box3">
              <div class="Payment-box-wrapper">
                <h3>Cheque</h3>
                <div class="Payment-logo">
                  <img src="" alt="" />
                </div>
              </div>
            </div>
            <div class="Payment-box4">
              <div class="Payment-box-wrapper">
                <h3>UPI</h3>
                <div class="Payment-logo">
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
  name: 'Payment'
}
</script>
  
<style scoped>
@import url('./style.css');
</style>



