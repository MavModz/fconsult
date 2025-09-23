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
              <span>Connect A Domain</span>
              <span class="arrow">
                <img src="public/img/png/arrow_back_ios_24px.png" />
              </span>
            </div>
  
            <div class="input-group">
              <input type="text"  placeholder="enter your domain name" required/>
              <button class="arrow-btn">
                &#10140;
              </button>
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
        this.$router.push('/admin/apps/ondomain/connectdomainsecond')
      }
  
    // location.replace('/admin/apps/ondomain/connectdomainsecond')
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
    max-height: 590px;
  }
  
  .left-panel {
    display: flex;
    gap: 60px;
    justify-content: start;
    align-items: center;
    text-align: center;
    padding: 0% 1% 0% 3%;
    background-color: #3c3c3c;
    color: white;
    flex-direction: column;
  }
  
  .top-left-section img {
    max-height: 38px;
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
    padding: 6rem !important;
    flex-direction: column;
    display: flex;
    margin-top: 9rem;
    justify-content: space-between;
  }
  
  .form-wrapper {
    width: 100%;
  }
  
  .form-wrapper h1 {
    font-size: 35px;
    font-weight: 500;
    margin-bottom: 2rem;
    text-align: left;
  }
  
  .form-wrapper .highlight {
    color: #ff5757;
    font-weight: 700 !important;
  }
  
  .input-card {
    border: 1px solid #ff5757;
    border-radius: 0.75rem;
    padding: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    align-items: center;
    margin-bottom: 1.5rem;
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
    width: 100%;
    font-weight: 400;
    color: #93989a;
    padding: 1.25rem 3rem 1.25rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 11px;
    background-color: #f1f5f966;
    font-size: 16px;
    border-top-right-radius: 11px !important;
    border-bottom-right-radius:11px !important;
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
    color: #93989a;
    font-size: 12px;
    cursor: pointer;
  }
  
  .proceed-btn {
    width: 100%;
    background-color: #ff5757;
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
  @media (min-width: 768px) {
    .connect-domain {
      flex-direction: row;
    }
  
    .left-panel,
    .right-panel {
      width: 50%;
      padding: 4rem;
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
  .pagination {
    margin-top: 28px;
  }
  .right-panel{
    padding:3.5rem  2rem !important;
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

.input-group input{
padding: 1rem 3rem 1rem 1rem;

}}

@media screen and (min-width: 450px) and (max-width: 768px) {
  .left-panel{
  padding: 7% 2%;
  gap:40px;
}
.right-panel{
    padding:3.5rem  3rem !important;
    margin-top: 0rem;
  }
  .image-background img {
    max-height: 500px;
}
  .proceed-btn{
  font-weight: 500;
    font-size: 19px;
    padding: 1rem;
}
.form-wrapper h1 {
    font-size: 33px;
    font-weight: 500;
    margin-bottom: 1.4rem;
}.input-group input{
  padding: 1.1rem 2.1rem 1.1rem 2.1rem;
}
.domain-text {
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    margin-top: -9px;
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
    font-size: 37px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 12px;
}
.proceed-btn {
    font-weight: 600;
    font-size: 22px;
    padding: 1.3rem;
  }}
@media screen and (min-width: 768px) and (max-width: 1024px) {
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
  