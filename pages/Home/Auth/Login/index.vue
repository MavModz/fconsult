<!-- @format -->

<template>
  <main>
    <div class="Login-container">
      <div class="Login-row1">
        <div class="Login-first-section">
          <div class="Login-row1-col1">
            <div class="Login-row1-image">
              <img src="/gif/signup2.gif" alt="" style="background-color: transparent" />
            </div>
            <h2 class="Login-row1-text">Fast, Efficient and Productive</h2>
            <div class="Login-row1-para">
              In this kind of post,
              <a href="#" class="opacity-75-hover text-primary me-1">the blogger</a>
              introduces a person they've interviewed
              <br />
              and provides some background information about
              <a href="#" class="opacity-75-hover text-primary me-1">the interviewee</a>
              and their
              <br />
              work following this is a transcript of the interview.
            </div>
          </div>
        </div>
        <div id="Loging-Second-setion">
          <div class="Login-form-container">
            <div class="Login-form-wrapper">
              <FormKit type="form" @submit="submitForm"  
                ref="myForm" class="form w-100">
                <div class="Login-form-row2-text">
                  <h3>Welcome to <span>LOREM</span></h3>
                  <div class="Login-row2-col2">
                    <p class="Login-account-row2">No Account?</p>
                    <p class="Login-account-Signup">
                      <router-link to="/auth/register" class="link-Sign-up">Sign up</router-link>
                    </p>
                  </div>
                </div>
                <div class="Login-row2-col3">
                  <h1>Sign in</h1>
                </div>
                <div class="Login-Google-apple">
                  <GoogleSignIn />
                  <div class="Login-apple">
                    <a href="#" class="Login-apple-anchor">
                      <img alt="Logo" src="/img/svg/apple-black.svg" class="iphone-logo" />
                      <img alt="Logo" src="/img/svg/apple-black-dark.svg"
                        class="theme-dark-show h-15px me-3" />
                    </a>
                  </div>
                </div>
                <div class="Login-row4">
                  <span class="Login-row4-text">Email Address</span>
                </div>

                <div class="Login-form-box">
                  <FormKit validation="required" type="text" placeholder="email address" name="email" id="email"
                    autocomplete="off" class="form-control-box" />
                </div>
                <div class="Login-row5">
                  <span class="Login-row5-text">Password</span>
                </div>
                <div class="Login-form-box2">
                  <FormKit validation="required" type="password" placeholder="Password" name="password" id="password"
                    autocomplete="off" class="form-control-box" />
                </div>
                <div class="Login-Forget-pass">
                  <router-link to="/auth/forgotpassword" class="link-primary">
                    Forgot Password ?
                  </router-link>
                </div>
                <div class="Sign-button">
                  <button type="submit" class="btn-sign" @click="loginUser">
                    Sign in
                  </button>
                </div>
              </FormKit>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GoogleSignIn from './GoogleSignIn.vue';
definePageMeta({ layout: 'home' });

export default {
  components: { GoogleSignIn },
  data() {
    return {
      myForm: null,
    };
  },
  mounted() {
    this.myForm = this.$refs.myForm;
  },
  methods: {
    async callback(userData) {

      const data = {
        email: userData.email,
        name: userData.name,
        enrolled: {
          type: 'Google',
          company_id: 'Web',
          password: 'null',
        },
      };
      await axiosInstance
        .post('/login', data)
        .then((response) => {
          let udata = {
            user: response.data.user,
            token: response.data.token,
            company: response.data.company,
          };
          // this.$store.dispatch('updateUserData', udata);
          localStorage.setItem('token', response.data.token);
        })
        .catch(async (error) => {
          await axiosInstance
            .post('/register', data)
            .then((response) => {

              let udata = {
                user: response.data.user,
                token: response.data.token,
                company: response.data.company,
              };
              // this.$store.dispatch('updateUserData', udata);
              localStorage.setItem('token', response.data.token);
              this.$router.replace('/');
            })
            .catch((error) => {
            });
        });
      this.$root.stopLoading();
    },
    submitForm(v) {
      v.enrolled = {
        password: v.password,
        company_id: 'Web',
      };
      axiosInstance
        .post('/login', v)
        .then((response) => {
          let udata = {
            user: response.data.user,
            token: response.data.token,
            company: response.data.company,
          };

          // this.$store.dispatch('updateUserData', udata);

          localStorage.setItem('token', response.data.token);
          this.$router.replace('/');
        })
        .catch((error) => {
          error.code === 404
            ? this.myForm.setFieldError('email', error.msg)
            : this.myForm.setFieldError('password', error.msg);
        });
    },
  },
};
</script>

<style src="./style.css"></style>
