<!-- @format -->

<template>
  <main>
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
                    <span class="signup-screen-rightside-lorm">Find & Consult</span>
                  </p>
                </div>
                <div>
                  <div class="signup-screen-rightside-signup-have">
                    <p>Have An Account ?</p>
                  </div>
                  <div class="text-end">
                    <router-link to="login">
                      <p class="signup-screen-rightside-signup-below-sign">
                        Sign In
                      </p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="signup-screen-rightside-account">
                <h1 id="signup-screen-rightside-signup">Sign Up</h1>

              </div>
            </div>
            <FormKit type="form" @submit="submitForm" ref="myForm">
              <div class="signup-screen-rightside-email">
                <label class="signup-rightside-label-style">Enter your email address</label>
                <FormKit validation="required|email" type="text" placeholder="Email Id" name="email"
                  class="form-control-fields" />
              </div>
              <div class="signup-screen-rightside-userdetails">
                <div class="signup-screen-rightside-username">
                  <label class="signup-rightside-label-style">Full name</label>
                  <FormKit validation="required" type="text" placeholder="Full Name" name="name"
                    class="form-control-fields bg-transparent" />
                </div>
              </div>

              <div class="signup-screen-rightside-pass" data-kt-password-meter="true">
                <div class="Login-row5">
                  <label class="signup-rightside-label-style">Enter your Password</label>
                </div>
                <div class="Login-form-box2 relative">
                  <FormKit validation="required" type="password" suffix-icon="eyeClosed" name="password"
                    placeholder="Password" @suffix-icon-click="handleIconClick"
                    suffix-icon-class="hover:text-blue-500 absolute top-[10px] right-[10px]" />
                </div>
              </div>
              <div class="signup-screen-rightside-pass" data-kt-password-meter="true">
                <!-- <label class="signup-rightside-label-style">Confirm Password</label>
                <FormKit class="form-control-fields bg-transparent" id="password" type="password"
                  name="password_confirm" placeholder="Confirm password" validation="required|confirm" /> -->
                <div class="Login-row5">
                  <label class="signup-rightside-label-style">Confirm Password</label>
                </div>
                <div class="Login-form-box2 relative">
                  <FormKit type="password" placeholder="Confirm password" suffix-icon="eyeClosed" name="confirmPassword"
                    @suffix-icon-click="handleIconClick"
                    suffix-icon-class="hover:text-blue-500 absolute  top-[10px] right-[10px]"
                    validation="required|confirm:password" validation-label="Confirm password" />
                </div>
              </div>
              <div class="Sign-button">
                <Button type="submit" class="btn-sign mt-5" label="Sign up" />
                <!-- icon="pi pi-save" :loading="loading" -->
              </div>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

// definePageMeta({ layout: 'home' });
const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};
</script>
<script>

export default {
  data() {
    return {
      loading: false,
      myForm: null,
    };
  },
  mounted() {
    this.myForm = this.$refs.myForm;
  },
  methods: {
    async submitForm(v) {
      this.loading = true;
      v.platform = "Web"
      v.type = "Normal"
      v.role="Superadmin"
      await homePost('/register-user', v).then(async (response) => {
        if (response.status) {
          successAlert("Succesfully Create the Superadmin")
          // await this.loginUser(v)
          this.$router.go(-1);
        }
      }).catch((error) => { });
      this.loading = false;
    },
    // async loginUser(v) {
    //   this.loadinga = true;
    //   await homePost('/login-user', v).then((response) => {
    //     if (response.data.status) {
    //       localStorage.setItem('token', response.data.token);
    //       this.setCookie('token', response.data.token, 180);
    //       this.$router.replace(`/${response.data.user.role.toLowerCase()}/dashboard`)
    //     }
    //   });
    //   this.loadinga = false;
    // },
    setCookie(name, value, days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    },
  },
};
</script>

<style src="./style.css"></style>
