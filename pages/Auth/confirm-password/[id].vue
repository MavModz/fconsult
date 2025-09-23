<!-- @format -->

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
            <div class="signup-screen-rightside-lorem">
              <div class="signup-screen-rightside-welcome">
                <p>
                  Welcome to
                  <span class="signup-screen-rightside-lorm">F & C</span>
                </p>
              </div>
              <div>
                <p id="signup-screen-rightside-reset">Reset Password</p>
              </div>
            </div>
          </div>
          <FormKit type="form" @submit="submitForm" ref="myForm">
            <div class="signup-screen-rightside-pass" data-kt-password-meter="true">
              <label class="signup-rightside-label-style">Enter New Password</label>
              <div class="Login-form-box2 relative">
                <FormKit validation="required" class="form-control-fields bg-transparent" type="password" id="password"
                placeholder="------------------------------" name="newPassword" suffix-icon="eyeClosed" @suffix-icon-click="handleIconClick"
                suffix-icon-class="hover:text-blue-500 absolute top-[10px] right-[10px]"/>
              </div>
            </div>
            <div class="signup-screen-rightside-pass" data-kt-password-meter="true">
              <label class="signup-rightside-label-style">Confirm New Password</label>
              <div class="Login-form-box2 relative">
                <FormKit validation="required|confirm:newPassword" class="form-control-fields bg-transparent" type="password"
                id="password" placeholder="------------------------------" name="confirmPassword" suffix-icon="eyeClosed" @suffix-icon-click="handleIconClick"
                suffix-icon-class="hover:text-blue-500 absolute top-[10px] right-[10px]" />
              </div>
            </div>

            <div class="signup-screen-rightside-button">
              <button type="submit" id="sign_up_submit" class="btn btn-signup">Update Password 
                <!-- <span class="indicator-label"> Update Password </span> -->
                <!-- <span class="indicator-progress">
                                Please wait...
                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span> -->
              </button>
            </div>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({ layout: 'home' });
const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};

</script>
<script>
// definePageMeta({ layout: 'home' });

export default {
  data() {
    return {
      token: null,
      myForm: null,
    };
  },
  mounted() {
    this.myForm = this.$refs.myForm;
    this.token = this.$route.params.id;
  },
  methods: {
    async submitForm(v) {
      v.token = this.token;
      await homePut('/update_password', v).then((response) => {
        if (response.data.status) {
          localStorage.setItem('token', response.data.token);
          this.setCookie('token', response.data.token, 180);
          this.$router.replace(`/${response.data.user.role.toLowerCase()}/dashboard`)
        }
      }).catch(async (error) => { });
    },
    setCookie(name, value, days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>

<style>
.formkit-input {
  outline: none;
  padding: 10px !important;
}

.formkit-input:focus {
  border: 1px solid #ff5757;
  border-radius: 9px;
}
</style>