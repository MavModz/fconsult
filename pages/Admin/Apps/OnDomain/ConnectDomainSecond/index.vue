<template>
  <div class="connect-domain">
    <!-- Left Section -->
    <div class="left-panel">
      <div class="top-left-section">
        <img src="public/img/png/F_C_logo_1.png" />
      </div>
      <div>
        <div class="image-background">
          <img src="public/img/png/On_Domain_image.png" alt="Connect Domain" class="illustration" />
        </div>
        <div class="text">
          <h2>Connect Any Domain With us</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
        <!-- <div class="pagination">
          <div class="dot active"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div> -->
      </div>
    </div>

    <!-- Right Section -->
    <div class="right-panel">
      <div class="form-wrapper">
        <h1>
          Let’s start with your<br />
          <span class="highlight">Domain first!</span>
        </h1>

        <div class="input-card">
          <div class="card-header">
            <span>Add <span class="highlights">A Record</span></span>
            <span class="arrow">
              <img src="public/img/png/arrow_back_ios_24px.png" />
            </span>
          </div>

          <p class="domain-text">
            Add a new A record to your DNS settings by copying and pasting the values below:
          </p>

          <div class="field-group">
            <label>Name / Host / Alias</label>
            <div class="input-wrapper">
              <input type="text" placeholder="@" required/>
              <button class="copy-btn">
                <img src="public/img/png/iconamoon_copy-bold.png" />
              </button>
            </div>
            <div class="note">or leave this blank</div>
          </div>

          <div class="field-group value-input">
            <label>Value / Points To</label>
            <div class="input-wrapper">
              <input type="text" placeholder="103.16E142.1049" required />
              <button class="copy-btn">
                <img src="public/img/png/iconamoon_copy-bold.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="proceed-btn" @click="proceed">PROCEED</button>
      </div>
    </div>
  </div>
</template>

<script >

  export default{
    methods:{
  
      proceed(){
        this.$router.push('/admin/apps/ondomain/connectdomainthird')
      }

  }
    
  }
</script>

<style scoped>
body {
  margin: 0px;
}

.connect-domain {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.image-background {
  max-height: 600px;
}

.left-panel {
  display: flex;
  gap: 60px;
  justify-content: start;
  align-items: center;
  text-align: center;
}

.top-left-section img {
  max-height: 38px;
}

.left-panel {
  padding: 0% 1% 0% 3%;
  background-color: #3C3C3C;
  color: white;
  flex-direction: column;
}

.domain-text {
  font-size: 18px;
  line-height: 31px;
  font-weight: 400;
  color: #676B6C;
  letter-spacing: 0.25px;
  margin-top: -6px;
}

.left-panel h2 {
  margin-top: 1rem;
  font-size: 25px;
  font-weight: 600;
  margin: 8px;
}

.left-panel p {
  font-size: 20px;
  font-weight: 400;
  color: #ccc;
  margin-top: 0px;
}

.text {
  margin-top: -28px;
}

.right-panel {
  background-color: white;
  padding:4.8rem 6rem !important;
  flex-direction: column;
  display: flex;
  margin-top: 2.5rem;
  justify-content: space-between;
}

.highlights {
  font-weight: 600;
}

.field-group {
  margin-bottom: 0rem;
}

.image-background img {
  max-height: 590px;

}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 400;
  color: #676B6C;
  font-size: 18px;
  line-height: 31px;
  letter-spacing: 0.25px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
  border-radius: 9px;
  font-size: 1rem;
  background-color: #F1F5F966;
  border: 1px solid #CBD5E1;
  color: #93989A;
}

.input-wrapper::before {
  position: absolute;
  left: 1rem;
  color: #93989A;
  font-size: 17px;
}

.copy-btn {
  position: absolute;
  right: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
  color: #aaa;
}

.note {
  font-size: 14px;
  font-weight: 400;
  color: #93989A;
  letter-spacing: 0.25px;
  line-height: 31px;
  text-align: right;
  margin-top: 0.4rem;
  margin-bottom: 1rem;
}

/* .value-input .input-wrapper::before {
  content: "103.16E142.1049";
} */

.form-wrapper {
  width: 100%;
}

.form-wrapper h1 {
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 2rem;
}

.form-wrapper .highlight {
  color: #FF5757;
  font-weight: 700 !important;
}

.input-card {
  border: 1px solid #FF5757;
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  margin-bottom: 1.5rem;
  align-items: center;
  cursor: pointer;
  color: #000000;
  font-size: 22px;
}

.card-header .arrow {
  color: #f87171;
}

.input-group {
  position: relative;
}

.input-group input {
  width: 94%;
  font-weight: 400;
  color: #93989A;
  padding: 1.25rem 2.5rem 1.25rem 1rem;
  border: 1px solid #CBD5E1;
  border-radius: 0.5rem;
  background-color: #F1F5F966;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
}

.input-group input:focus {
  border-color: #f87171;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.arrow-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #93989A;
  font-size: 12px;
  cursor: pointer;
}

.proceed-btn {
  width: 100%;
  background-color: #FF5757;
  font-weight: 700;
  color: white;
  font-size: 23px;
  padding: 1.5rem;
  border: 1px solid #ff5757;
  border-radius: 0.5rem;
  cursor: pointer;
}

.proceed-btn:hover {
  background-color: #ffffff;
  color: #ff5757;
}

/* Responsive */
@media (min-width: 868px) {
  .connect-domain {
    flex-direction: row;
  }

  .left-panel,
  .right-panel {
    width: 50%;
    padding: 4rem;
  }

  .form-wrapper h1 {
    text-align: left;
  }
}
@media screen and (max-width: 390px) {
    .left-panel{
  padding: 10% 2%;
  gap:43px;
}
.right-panel{
    padding:3rem  1.2rem !important;
    margin-top: 0rem;
  }
  }
@media screen and  (min-width: 300px) and (max-width: 450px) {
.left-panel{
  padding: 10% 2%;
  gap:43px;
}
.left-panel h2{
  font-size: 23px;
}
.left-panel p {
  font-size: 18px;
}
.top-left-section img {
    max-height: 34px;
}
/* .dot {
    width: 18px;
    height: 9px;
  } */
  /* .pagination {
    margin-top: 28px;
  } */
  .right-panel{
    padding:3.2rem  2rem !important;
    margin-top: 0rem;
  }
.proceed-btn{
  font-weight: 500;
    font-size: 18px;
    padding: 0.9rem;
}
.form-wrapper h1{
    font-size: 29px;
    margin-bottom: 1.3rem;
}
.input-card{
  padding: 1.5rem;
}
.card-header {
    margin-bottom: 1rem;}

input{
padding: 1rem 3rem 1rem 1rem;
}
.note{
margin-bottom: 0.6rem;
}
}
@media screen and (min-width: 450px) and (max-width: 868px) {
  .left-panel{
  padding: 7% 2%;
  gap:40px;
}
.right-panel{
    padding:3.5rem  3rem !important;
    margin-top: 0rem;
  }
  .proceed-btn{
  font-weight: 500;
    font-size: 19px;
    padding: 1rem;
}
.image-background img {
    max-height: 500px;
}
.form-wrapper h1 {
    font-size: 33px;
    font-weight: 500;
    margin-bottom: 1.4rem;
}input{
  padding: 1.1rem 2.1rem 1.1rem 2.1rem;
}
.domain-text {
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    margin-top: -9px;
}
.note{
  margin-bottom: 0.8rem;
}
}
@media screen and (min-width: 1300px) and (max-width: 1440px) {
    .right-panel {
      padding: 3rem 4.5rem !important;
    margin-top: 6rem;
  }
  .image-background img {
    max-height: 520px;
}
.proceed-btn {
    font-weight: 600;
    font-size: 22px;
    padding: 1.3rem;
  }}
@media screen and  (min-width: 1024px) and (max-width: 1300px) {
.right-panel {
    padding: 2.9rem 4.5rem !important;
    margin-top: 6rem;
  }
  .image-background img {
    max-height: 553px;
}
.form-wrapper h1{
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 12px;
}
.proceed-btn {
    font-weight: 600;
    font-size: 22px;
    padding: 1.3rem;
  }}
@media screen and (min-width: 868px) and (max-width: 1024px) {
  .right-panel{
    padding:5rem  3rem !important;
    margin-top: 1rem;
  }
  .form-wrapper h1 {
        font-size: 34px;
        font-weight: 600;
        line-height: 45px;
}
.proceed-btn {
    font-weight: 600;
    font-size: 22px;
    padding: 1.1rem 1.3rem;
}
.left-panel{
  padding: 9% 2%;
  gap:40px;
}}
</style>