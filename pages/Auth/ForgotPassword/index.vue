<template>
  <div class="signup-screen">
    <div class="signup-screen-wrapper">
      <div class="signup-screen-leftside">
        <div class="signup-screen-leftside-content">
          <div class="signup-screen-leftside-image">
            <img class="" src="/gif/signup2.gif" alt="" />
          </div>
          <div class="signup-screen-leftside-head&parg">
            <h1 class="signup-screen-leftside-heading">
              Explore the Immigration Solutions.
            </h1>
            <P class="signup-screen-leftside-paragraph">
              We Aggregate: choose consultants from a wide range of options
            </P>
          </div>
        </div>
      </div>
      <div class="signup-screen-rightside">
        <div class="signup-screen-rightside-wrapper">

          <div class="signup-screen-rightside-wrapper-upper">
            <div class="signup-screen-rightside-reset-pass">
              <div class="signup-screen-rightside-welcome">
                <p>Welcome to <span class="signup-screen-rightside-lorm">Find & Consult</span></p>
              </div>
              <div>
                <p id="signup-screen-rightside-reset">
                  Reset Password
                </p>
              </div>

            </div>

          </div>
          <div v-if="!is_sent" class="signup-screen-rightside-pass" data-kt-password-meter="true">
            <label class="signup-rightside-label-style">Enter your email address</label>
            <input v-model="email" class="form-control-fields bg-transparent" type="email" placeholder="email address"
              @keydown="typing" />
            <small id="emailHelp" class="form-text text-danger ms-3">{{ error_email }}</small>
            <button class="verify-email-buttnn" @click="sendOtp">Verify Now</button>
          </div>

          <div v-else class="signup-screen-rightside-pass" data-kt-password-meter="true">
            <label class="signup-rightside-label-style">Enter your email address</label>
            <input v-model="email" disabled class="form-control-fields bg-transparent" type="email" />
          </div>



          <div v-if="is_sent" class="signup-screen-rightside-pass" data-kt-password-meter="true">
              <form @submit.prevent="submitOtp">

           <label class="signup-rightside-label-style">Enter your Verification Code</label>
            <input
  v-model="otp"
  class="form-control-fields bg-transparent"
  type="tel"
  inputmode="numeric"
  maxlength="6"
  placeholder="Six Digit OTP"
  pattern="[0-9]{6}"
  @keydown="restrictOtpInput"
  @paste.prevent
/>
            <span class="verify-pass-resnd" @click="sendOtp">
              <p>resend</p>
            </span>
            <small v-if="success_email" id="emailHelp" class="form-text text-success ms-3">{{ success_email }}</small>
            <small v-if="error_otp" id="emailHelp" class="form-text text-danger ms-3">{{ error_otp }}</small>
      
          <div v-if="is_sent" @click="submitOtp" class="signup-screen-rightside-button">
            <button type="submit" class="btn btn-signup">Submit Otp
            </button>
          </div>
             </form>
             </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// definePageMeta({layout: 'home'})

export default {
  data() {
    return {
      email: null,
      otp: null,
      is_sent: false,
      error_email: null,
      error_otp: null,
      success_email: null,
    }
  }, methods: {
    typing() {
      this.error_email = null
      this.error_otp = null
      this.success_email = null
    },
    restrictOtpInput(e) {
    const allowedKeys = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Enter"];

    if (allowedKeys.includes(e.key)) return; // allow control keys

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault(); // block non-digits
    }

    if (e.target.value.length >= 6) {
      e.preventDefault(); // block more than 6 digits
    }
  },
    async sendOtp() {
      this.success_email = "Otp Sent To Your Email..."
      this.error_otp = this.otp = null
       setTimeout(() => {
    this.success_email = null
  }, 10000)
      await homePost('/forget_password', { email: this.email }).then(response => {
        if (response.data.status) {
          this.is_sent = true
        } else {
          this.error_email = response.data.msg
        }
      }).catch(async error => {
        this.error_email = error.msg
      });

    },
    async submitOtp() {
      if (!this.otp || this.otp.toString().length !== 6) {
        this.success_email = null
        this.error_otp = "Enter Valid 6 Digit OTP"
      } else {
        await homePost('/verify_otp', { email: this.email, company_id: "web", otp: +(this.otp), type: 'Normal' }).then(response => {
          if (response.data.status) {
            this.$router.replace(`/auth/confirm-password/${response.data.token}`);
          } else {
            this.error_otp = response.data.msg
          }
        }).catch(async error => {
          this.error_otp = error.msg
        });
      }


    }
  }

}
</script>

<style scoped>
@import url('./style.css');
</style>