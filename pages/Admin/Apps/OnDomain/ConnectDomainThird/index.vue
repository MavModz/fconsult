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
            Congratulations!
            <br />
            <span class="highlight">Your DNS is getting verified</span>
            <br />
            <span class="highlights">to be published</span>
          </h1>
          <div class="input-card">
            <p class="domain-text">
              Start your course by integrating your materials with an online video conference platform so you can go live immediately.
            </p>
          </div>
          <div class="connect-domain-submission">
            <button class="proceed-btn" @click="submit">SUBMIT *</button>
            <a href="#" class="domain-configure">Configure Other Settings</a>
          </div>
        </div>
        <div class="connect-domain-footer-text">
          <span>* DNS Propagation will take around</span>
          <span class="domain-text-bold"> 24hrs</span>
        </div>
      </div>
    </div>
  </template>
  

<script >

export default{
  methods:{

    submit(){
      this.$router.push('/admin/apps/ondomain/ondomaindirect')
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
  .image-background img {
    max-height: 595px;
  }
  .domain-text-bold {
    font-weight: 700 !important;
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
    background-color: #3c3c3c;
    color: white;
    flex-direction: column;
  }
  
  .domain-text {
    font-size: 20px;
    line-height: 34px;
    font-weight: 400;
    color: #4c535d;
    margin-top: -2px;
    width: 60%;
  }
  
  .left-panel h2 {
    margin-top: 1rem;
    font-size: 26px;
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
    padding: 4rem 6rem !important;
    flex-direction: column;
    display: flex;
    margin-top: 7rem;
    justify-content: space-between;
  }
  
  .highlights {
    font-weight: 700 !important;
    color: #ff5757;
  }
  
  .form-wrapper {
    width: 100%;
  }
  
  .form-wrapper h1 {
    font-size: 42px;
    font-weight: 700;
    line-height: 55px;
    margin-bottom: 20px;
  }
  
  .form-wrapper .highlight {
    font-weight: 500 !important;
  }
  
  .connect-domain-submission {
    width: 70%;
    margin-top: 50px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
  }
  
  .proceed-btn {
    background-color: #ff5757;
    font-weight: 700;
    color: white;
    font-size: 23px;
    padding:1.2rem  1.5rem;
    border: 1px solid #ff5757;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  
  .proceed-btn:hover {
    background-color: #ffffff;
    color: #ff5757;
  }
  
  .domain-configure {
    font-size: 22px;
    font-weight: 700;
    color: #93989a;
    text-align: center;
    text-decoration: underline !important;
  }
  a {
    text-decoration: underline;
  }
  .connect-domain-footer-text span {
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    color: #4c535d;
    text-align: center;
    opacity: 70%;
  }
  
  .connect-domain-footer-text {
    width: 70%;
    text-align: center;
  }
  
  /* .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 35px;
  }
  
  .dot {
    width: 22px;
    height: 11px;
    border-radius: 999px;
    background-color: #c8d1e1;
    opacity: 40%;
  }
  
  .dot.active {
    background-color: #fff;
    opacity: 1;
  } */
  
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
  }
  .pagination {
    margin-top: 28px;
  } */
  .right-panel{
    padding:3.2rem  2rem !important;
    margin-top: 0rem;
  }
  .form-wrapper h1 {
    font-size: 35px;
    font-weight: 600;
    line-height: 45px;
    margin-bottom: 14px;
}
.domain-text{
    font-size: 18px;
    line-height: 30px;
    margin-top: -5px;
    width: 100%;
}
.proceed-btn{
  font-weight: 500;
    font-size: 18px;
    padding: 0.9rem;
    width: 89% !important;
}
.connect-domain-submission {
    width: 100%;
    margin-top: 20px;
    gap: 17px;
}
.connect-domain-footer-text {
  width: 100%;
  margin-top: 20px;
  }}
  @media screen and (min-width: 450px) and (max-width: 868px) {
  .left-panel{
  padding: 7% 2%;
  gap:40px;
}
.connect-domain-footer-text {
  width: 100% !important;}

.right-panel{
    padding:3.3rem  3rem !important;
    margin-top: 0rem;
  }
  .proceed-btn{
  font-weight: 500;
    font-size: 19px;
    padding: 1rem;
    width: 51%;
}
.image-background img {
    max-height: 500px;
}
.domain-text{
    font-size: 19px;
    line-height: 28px;
    margin-top: -6px;
    width: 80%;
}
.connect-domain-footer-text {
  width: 60%;
  margin-top: 22px;
  text-align: left !important;
}
.form-wrapper h1 {
    font-size: 37px;
    font-weight: 600;
    line-height: 50px;
    margin-bottom: 14px;
}
.domain-configure{
  text-align: left;
}
.connect-domain-submission {
    /* width: 60%; */
    margin-top: 24px;}
  }

  @media screen and (min-width: 1300px) and (max-width: 1440px) {
    .right-panel {
    padding: 3.2rem 5.2rem !important;
    margin-top: 6rem;
  }
  .image-background img {
    max-height: 520px;
}
.domain-text {
    width: 80%;
}
}
@media screen and  (min-width: 1024px) and (max-width: 1300px) {
  .connect-domain-footer-text {
    width: 100%;
    text-align: center;
}
.right-panel {
    padding: 2.9rem 4.5rem !important;
    margin-top: 6rem;
  }
  .image-background img {
    max-height: 553px;
}
.domain-text {
        width: 86%;
    }
    .connect-domain-submission{
      width: 80%;
      margin-top: 40px;
}
.form-wrapper h1{
    font-size: 37px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 12px;
}}
@media screen and (min-width: 868px) and (max-width: 1024px) {
  .right-panel{
    padding:5rem  3rem !important;
    margin-top: 1rem;
  }
  .connect-domain-submission {
    width: 98%;
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
.domain-text {
        width: 96%;
    font-size: 20px;
    line-height: 30px;
    }
.left-panel{
  padding: 9% 2%;
  gap:40px;
}
.connect-domain-footer-text {
  width: 100%;}
}
  </style>
  