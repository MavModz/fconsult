<template>
  <h1>Verifying Payment</h1>

  <div class="loader-container mt-5">
    <div class="loader spinner"></div>
    <div class="loader bouncing-dots"></div>
    <div class="loader rotating-plane"></div>
    <div class="loader arrow">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      route:useRoute()
    }
  },
  async mounted(){
      this.loading=true
      await userGet(`/verify-payment/${this.route.query.razorpay_payment_id}/${this.route.params.id}`).then((response)=>{
        if(response.status){
          if(response.data.data.status==="captured"){
            location.replace(response.data.data.notes.returnUrl)
          }
        }
      })
      this.loading=false
  }
}
</script>



<style>
body {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.loader-container {
  display: flex;
  gap: 30px;
}

.loader {
  width: 50px;
  height: 50px;
  position: relative;
}

/* Spinner Animation */
.spinner {
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Bouncing Dots Animation */
.bouncing-dots {
  display: flex;
  justify-content: space-around;
}

.bouncing-dots::before,
.bouncing-dots::after {
  content: '';
  width: 15px;
  height: 15px;
  background-color: #3498db;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.bouncing-dots::after {
  animation-delay: 0.3s;
}

@keyframes bounce {
  to {
    transform: translateY(-50%);
  }
}

/* Rotating Plane Animation */
.rotating-plane {
  background-color: #3498db;
  animation: rotatePlane 1.2s infinite ease-in-out;
}

@keyframes rotatePlane {
  0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
  50% { transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); }
  100% { transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); }
}



.arrow {
  display: flex;
  transform: translate(-50%, -50%);
  transform: rotate(90deg);
  cursor: pointer;
  gap: 10px;
}

.arrow span {
  display: flex;
  border-bottom: 5px solid #3498db;
  border-right: 5px solid #3498db;
  animation: animate 2s infinite;
}

.arrow span:nth-child(2) {
  animation-delay: -0.2s;
}

.arrow span:nth-child(3) {
  animation-delay: -0.4s;
}
.arrow span:nth-child(4) {
  animation-delay: -0.8s;
}
.arrow span:nth-child(5) {
  animation-delay: -1.2s;
}
.arrow span:nth-child(6) {
  animation-delay: -1.6s;
}

@keyframes animate {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>