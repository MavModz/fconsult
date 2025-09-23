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
            <h2 class="Login-row1-text">Explore the Immigration Solutions.</h2>
            <div class="Login-row1-para">
              <!-- In this kind of post,
              <a href="#" class="opacity-75-hover text-primary me-1">the blogger</a>
              introduces a person they've interviewed
              <br />
              and provides some background information about
              <a href="#" class="opacity-75-hover text-primary me-1">the interviewee</a>
              and their
              <br />
              work following this is a transcript of the interview. -->
              <p>We Aggregate: choose consultants from a wide range of options</p>
            </div>
          </div>
        </div>
        <div id="Loging-Second-setion">
          <div class="Login-form-container">
            <div class="Login-form-wrapper">
              <FormKit type="form" @submit="submitForm" ref="myForm" class="form w-100">
                <div class="Login-form-row2-text">
                  <h3>Welcome to <span>Find & Consult</span></h3>
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
                </div>
                 
                <div v-if="!paswd" class="Login-row4">
                  <span class="Login-row4-text">Enter your email address</span>
                </div>
                <div v-else class="Login-row4">
                  
                  <span class="Login-row4-text">Enter password for {{ email }}</span>{{  }}
                  <span @click="loginBack" class="bi bi-pencil-square cursor-pointer"></span>
                </div>

                <div v-if="!paswd" class="Login-form-box">
                  <FormKit type="email" placeholder="Email Id" validation="required" name="email" id="email"
                    v-model="email" class="form-control-box" />
                </div>
                <div v-if="paswd" class="Login-row5">
                  <span class="Login-row5-text">Enter your Password</span>
                </div>
                <div v-if="paswd" class="Login-form-box2 relative">
                  <FormKit type="password" suffix-icon="eyeClosed" name="password" placeholder="Password"
                    @suffix-icon-click="handleIconClick"
                    suffix-icon-class="hover:text-blue-500 absolute top-[10px] right-[10px]" />
                </div>
                <div v-if="paswd" class="Login-Forget-pass">
                  <router-link to="/auth/forgotpassword" class="link-primary">
                    Forgot Password ?
                  </router-link>
                </div>
                <div class="Sign-button">
                  <Button type="submit" class="btn-sign" label="Sign In" :disabled="loadinga" :loading="loadinga" />
                </div>
              </FormKit>
            </div>
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
const data = (await useFetch('/api/users/admin')).data.value;

</script>

<script>
import GoogleSignIn from './GoogleSignIn.vue';
// import { dataStore } from '@/stores/auth';

export default {
  components: { GoogleSignIn },
  data() {
    return {
      email: null,
      paswd: false,
      loading: false,
      loadinga: false,
      visible: false,
      myForm: null,
    };
  },
  mounted() {
    this.myForm = this.$refs.myForm;
  },
  methods: {
    async checkUser(v) {
      // Prevent multiple API calls
      if (this.loadinga) {
        return;
      }
      
      this.loadinga = true;
      try {
        await homePost('/check-user', v).then((response) => {
          if (response.data.status) {
            if (response.data.pswd) {
              this.paswd = true
            }
          } else { this.$router.replace(`/auth/confirm-password/${response.data.token}`); }
        }).catch((e) => { });
      } finally {
        this.loadinga = false;
      }
    },
    async submitForm(v) {
      v.email = this.email
      if (this.paswd) {
         if (!v.password || v.password.trim() === '') {
      this.$toast.add({
        severity: 'warn',
        summary: 'Password required',
        detail: 'Please enter your password.',
      });
      return;
    }
        this.loginUser(v)
      } else {
        this.checkUser(v)
      }
    },
    async loginUser(v) {
      // Prevent multiple API calls
      if (this.loadinga) {
        return;
      }
      
      this.loadinga = true;
      try {
        await homePost('/login-user', v).then((response) => {
          if (response.data.status) {
            localStorage.setItem('token', response.data.token);
            this.setCookie('token', response.data.token, 180);
            if (this.$route.query.fromaddlisting) {
              const role = response.data.user.role || '';
              if (role === 'Admin') {
                // If Admin, redirect to Admin Categories
                this.$router.replace('/admin/categories');
              } else {
                // If not an Admin, redirect to their profile
                this.$router.replace('/user/profile');
              }

            } else {
              this.$router.replace(`/${response.data.user.role.toLowerCase()}/dashboard`)
            }

          } else {
            if (response.data.msg == 'nopswd') { this.$router.replace(`/auth/confirm-password/${response.data.token}`); }
          }
        });
      } catch (error) {
        console.error('Login error:', error);
        // Handle error if needed
      } finally {
        // Only reset loading if we're still on the login page (not redirected)
        if (this.$route.name === 'auth-login') {
          this.loadinga = false;
        }
      }
    },
    setCookie(name, value, days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    },
    loginBack(){
      this.paswd=false
    }
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
