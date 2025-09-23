<!-- @format -->

<template>
  <div class="app align-content-stretch d-flex flex-wrap">
    <div class="app-sidebar">
      <NuxtLink to="/">
        <div class="logo">
          <img src="/public/logo.jpg" width="230" />
        </div>
      </NuxtLink>

      <div class="app-menu relative">
        <ul class="accordion-menu" id="sidebar">
          <li class="men" id="dashboard">
            <NuxtLink to="/user/dashboard">
              <i class="bi bi-columns-gap"></i>Dashboard
            </NuxtLink>
          </li>
          <li class="men" id="wishlists">
            <NuxtLink to="/user/wishlists">
              <i class="bi bi-bookmark"></i>All Bookmarks
            </NuxtLink>
          </li>

          <li class="men" id="appointments">
            <NuxtLink to="/user/appointments"> <i class="bi bi-alarm"></i>Appointments</NuxtLink>
          </li>
          <li class="men" id="recommendation">
            <NuxtLink to="/user/recommendation"><i class="bi bi-envelope-plus"></i>Recommendation</NuxtLink>
          </li>
          <li class="men" id="docum">
            <NuxtLink to="/user/documents"> <i class="bi bi-folder2-open"></i>Documents Center</NuxtLink>
          </li>
          <li class="men" id="agreem">
            <NuxtLink to="/user/agreements"> <i class="bi bi-journal-check"></i>Agreements</NuxtLink>
          </li>
          <li class="men" id="invoice">
            <NuxtLink to="/user/invoice"> <i class="bi bi-receipt"></i>Invoice</NuxtLink>
          </li>
          <!-- <li class="men" id="chat">
            <NuxtLink to="/user/chats">
              <i class="bi bi-chat-right"></i>Chat
            </NuxtLink>
          </li> -->
          <!-- <li class="men" id="chat" title="Comming Soon">
            <NuxtLink to="/commingsoon">
              <i class="bi bi-chat-right"></i>Chat<i class="bi bi-lock-fill"></i>
            </NuxtLink>
          </li> -->
        </ul>
        <!-- <div
          class="flex justify-between items-center gap-2 px-[35px] py-[20px] bg-[#09244B08] shadow-lg absolute w-[-webkit-fill-available] bottom-[-12px] cursor-pointer">
          <div class="flex flex-col gap-2">
            <span class="text-[#1F1F1F] font-[500] text-[18px]">{{ me.user.user.name }}</span>
            <span class="text-[#FF5757] font-normal text-[18px]">User</span>
          </div>

          <NuxtImg class="cursor-pointer" @click="logout()" src="/img/svg/logouts.svg" width="24" height="24" alt="" />

        </div> -->
      </div>
    </div>

    <div class="app-container mainbody">
      <div class="app-header">
        <nav class="navbar navbar-light navbar-expand-lg">
          <div class="container-fluid">
            <div class="navbar-nav" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item row">

                  <div class="title-container">
                    <a class="nav-link hide-sidebar-toggle-button" href="#">
                      <span class="d-flex">
                        <i class="material-icons h1" id="smallmenu"></i>
                        <button id="backbtn1" class="back-button" onclick="window.history.back()"><img
                            src="/public/img/svg/backBtn.svg"></button>
                        <span class="h6" id="title1"></span>
                      </span>
                    </a>
                    <a class="nav-link hide-sidebar-toggle-button2" href="#">
                      <span class="d-flex">
                        <i class="material-icons h2" id="smallmenu"></i>
                        <button id="backbtn2" class="back-button" onclick="window.history.back()"><img
                            src="/public/img/svg/backBtn.svg"></button>
                        <span class="h6" id="title2"></span>
                      </span>
                    </a>
                  </div>

                </li>
              </ul>
            </div>
            <div class="d-flex right-div">
              <span v-if="me && me.user && me.user.user && me.user.user.is_claim" @click="handleClaimStarted"
                class="bg-[#ff5757] rounded-[20px] text-[#fff] px-[10px] py-[4px] font-semibold cursor-pointer">
                Claim Your Business
              </span>
              <span v-else @click="handleGetStarted"
                class="bg-[#ff5757] rounded-[20px] text-[#fff] px-[10px] py-[4px] font-semibold cursor-pointer">
                Register Your Business
              </span>
              <div class="nav-item">
                <a class="nav-link notification-dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  <Badge v-if="messages.length > 0" class="dot"></Badge><img
                    src="https://c.animaapp.com/blutJVDd/img/vector-4.svg" alt="" height="10" />
                </a>
                <div class="dropdown-menu dropdown-menu-end notifications-dropdown"
                  aria-labelledby="notificationsDropDown">
                  <h6 class="dropdown-header">Notifications <Badge :value="messages.length"></Badge>
                  </h6>
                  <div class="notifications-dropdown-list">
                    <a v-for="i in messages" style="cursor: pointer;">
                      <div class="notifications-dropdown-item divhover2" @click="$router.push(i.url)">
                        <div class="notifications-dropdown-item-image">
                          <span v-if="i.type == 'warning'" class="notifications-badge bg-warning text-white">
                            <i class="bi bi-yelp ms-1"></i>
                          </span>
                          <span v-if="i.type == 'success'" class="notifications-badge bg-success text-white">
                            <i class="bi bi-yelp ms-1"></i>
                          </span>
                          <span v-if="i.type == 'error'" class="notifications-badge bg-error text-white">
                            <i class="bi bi-yelp ms-1"></i>
                          </span>
                          <span v-if="i.type == 'info'" class="notifications-badge bg-info text-white">
                            <i class="bi bi-yelp ms-1"></i>
                          </span>
                          <span v-if="i.type == 'document'" class="notifications-badge bg-danger text-white">
                            <i class="bi bi-filetype-doc"></i>
                          </span>
                        </div>
                        <div class="notifications-dropdown-item-text">
                          <p class="bold-notifications-text">{{ i.title }} | {{ DateFormat(i.time).time12 }}</p>
                          <small class="bold-notifications-text">{{ i.message }}</small>
                          <br />
                          <b> {{ new Date(i.time).toLocaleString() }}</b>
                        </div>
                      </div>
                    </a>
                    <div v-if="messages.length == 0" class="notifications-dropdown-item">
                      <p>No notification found</p>
                    </div>

                    <center v-if="messages.length > 0">
                      <button class="btn btn-light" @click="clearMessages">
                        Clear Messages
                      </button>
                    </center>
                  </div>
                </div>
              </div>
              <div class="nav-item">
                <UserGuide />
                <ul class="dropdown-menu dropdown-menu-end language-dropdown me-5" aria-labelledby="languageDropDown">
                  <li><a class="dropdown-item" href="#">Guide</a></li>
                </ul>
              </div>
              <div class="nav-item">
                <div class="nav-item flex items-center">
                  <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown">
                    <img :src="me
                      ? me?.user?.user?.profile_image
                      : '/img/png/user-1.png'
                      " alt="Help" style="width: 35px; border-radius: 50%;" class="w-[35px] mr-2" />
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-ends language-dropdown menu-sub-dropdown w-[275px] top-[15px!important]"
                    aria-labelledby="languageDropDown" style="
                      position: absolute;
                      inset: 0px 0px auto auto;
                      margin: 0px;
                    ">
                    <div class="user-menu flex pl-3">
                      <ul>
                        <li class="font-[700]">
                          {{
                            me ? me?.user?.user?.name : 'unkown'
                          }}
                        </li>
                        <li id="userDashboard" class="disable-hover">
                          <NuxtLink style="padding-left: 0 !important">
                            User Dashboard
                          </NuxtLink>
                        </li>
                      </ul>

                    </div>
                    <div class="border-[1px] bg-[#f4f4f4] relative my-2"></div>
                    <div class="user-menu px-3 flex flex-col">
                      <ul class="accordion-menu" id="sidebar">
                        <li class="men" id="profile" style="padding: 10px 5px 5px 0px;">
                          <NuxtLink to="/user/profile">
                            <i class="bi bi-person-circle"></i>My Profile
                          </NuxtLink>
                        </li>
                        <li class="men" id="serviceproviders" style="padding: 0px 5px 10px 0px;">
                          <NuxtLink to="/user/serviceproviders">
                            <i class="bi bi-card-list"></i>Service Opted
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>

                    <div class="border-[1px] bg-[#f4f4f4] relative my-2"></div>
                    <div class="user-menu px-3 flex flex-col">
                      <ul class="accordion-menu" id="sidebar">
                        <li class="men" id="logout">
                          <NuxtLink @click="logout()" class="logout">
                            <i class="bi bi-box-arrow-right"></i>Logout
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>


  <Dialog v-model:visible="DefineInterest" modal header="Define an Interest" :style="{ width: '420px' }">
    <div class="px-2">
      <div class="mb-4 text-left">
        <label class="block text-[17px] font-medium text-gray-700 mb-1 required">Select Service</label>
        <div class="select-option">
          <select v-model="selectedService" class="custom-select">
            <option disabled value="">Select Service</option>
            <option>
              Study Visa
            </option>
          </select>
          <div v-if="submitAttempted && !selectedService" class="text-red-500 text-sm mt-1">Service is required.</div>
        </div>
      </div>
      <div class="mb-6 text-left">
        <label class="block text-[17px] font-medium text-gray-700 mb-1 required">Select Category</label>
        <div class="select-option">
          <select v-model="selectedCategory" class="custom-select">
            <option disabled value="">Select Country</option>
            <option>
              India
            </option>
          </select>
          <div v-if="submitAttempted && !selectedCategory" class="text-red-500 text-sm mt-1">Category is required.</div>
        </div>
      </div>
      <div class="flex justify-center gap-4">
        <button class="px-6 py-2 text-[18px] rounded border border-[#e7e7e7] text-[#333333] hover:bg-gray-100"
          @click="DefineInterest = false">Cancel
        </button>
        <button
          class="px-6 py-2 rounded bg-[#FF5757] border border-[#ff5757] text-white hover:bg-[#ff5757] hover:text-[#ffffff]"
          @click="submitInterest">
          Submit
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import $ from 'jquery';
import {
  ref,
  push,
  set,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  remove,
} from 'firebase/database';

export default {
  data() {
    return {
      messages: [],
      DefineInterest: false,
      selectedService: '',
      selectedCategory: '',
      submitAttempted: false,
    };
  },
  setup() {
    useHead({
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          body: true,
        },
      ],
    });
  },
  async setup() {
    const nuxtApp = useNuxtApp();
    nuxtApp.$userOnline();
    const me = (await useFetch('/api/users/admin')).data.value;
    return { me };
  },
  mounted() {
    $(document).ready(function () {
      'use strict';
      $('.toggle-search').on('click', function (e) {
        $('.app').toggleClass('search-visible'), e.preventDefault();
      });
      $('.content-menu-toggle').on('click', function () {
        $('body').toggleClass('content-menu-shown');
      });
      !(function () {
        if ($('.horizontal-menu').length) {
          $('.hide-sidebar-toggle-button').on('click', function (e) {
            e.preventDefault(), a();
          });
          var e = $('.app-menu li:not(.open) ul'),
            n = $('.app-menu li.active-page > a');
          if ($(window).width() > 1199) null != i && (i.destroy(), (i = null));
          else {
            var t = document.querySelector('.app-menu');
            (i = null), e.hide();
          }
          $(window).resize(function () {
            if ($(window).width() > 1199 && null != i) i.destroy(), (i = null);
            else {
              var n = document.querySelector('.app-menu');
              (i = null), e.hide();
            }
          }),
            $('.app-menu li a').on('click', function (e) {
              var n = $(this).next('ul'),
                t = $(this).parent('li'),
                a = $('.app-menu .menu-list > li.open');
              if (n.length)
                return $(window).width() > 1199
                  ? void e.preventDefault()
                  : (t.hasClass('open')
                    ? (n.slideUp(200), t.removeClass('open'))
                    : (a.length &&
                      (t
                        .parent()
                        .children('.open')
                        .children('ul')
                        .slideUp(200),
                        t.parent().children('.open').removeClass('open')),
                      n.slideDown(200),
                      t.addClass('open')),
                    !1);
            });
        }
        if ($('.app-sidebar').length) {
          var i;
          (e = $('.accordion-menu li:not(.open) ul')),
            (n = $('.accordion-menu li.active-page > a')),
            e.hide(),
            $('.app.menu-hover').length && $(window).width() > 1199
              ? (i.destroy(), (i = null))
              : ((t = document.querySelector('.app-menu')), (i = null)),
            $(window).resize(function () {
              if (
                $('.app.menu-hover').length &&
                $(window).width() > 1199 &&
                !i.length
              ) {
                var e = document.querySelector('.app-menu');
                i = null;
              }
            }),
            $('.accordion-menu li a').on('click', function (e) {
              var n = $(this).next('ul'),
                t = $(this).parent('li'),
                a = $('.accordion-menu > li.open');
              if (n.length)
                return $('.app').hasClass('menu-hover') &&
                  $(window).width() > 1199
                  ? void e.preventDefault()
                  : (t.hasClass('open')
                    ? (n.slideUp(200), t.removeClass('open'))
                    : (a.length &&
                      (t
                        .parent()
                        .children('.open')
                        .children('ul')
                        .slideUp(200),
                        t.parent().children('.open').removeClass('open')),
                      n.slideDown(200),
                      t.addClass('open')),
                    !1);
            }),
            $('.active-page > ul').length &&
            ($('.app').hasClass('menu-hover')
              ? $(window).width() < 1199 && n.click()
              : n.click()),
            $('.app').hasClass('menu-off-canvas') ||
            ($(window).width() < 1199 && !$('.app').hasClass('sidebar-hidden')
              ? ($('.hide-app-sidebar-mobile').length ||
                $('.app').append(
                  '<div class="hide-app-sidebar-mobile"></div>',
                ),
                $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list'))
              : $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list-nested'),
              $(window).resize(function () {
                $(window).width() < 1199 &&
                  !$('.app').hasClass('sidebar-hidden')
                  ? ($('.hide-app-sidebar-mobile').length ||
                    $('.app').append(
                      '<div class="hide-app-sidebar-mobile"></div>',
                    ),
                    $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list'))
                  : $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list-nested');
              })),
            $('.hide-sidebar-toggle-button').on('click', function (e) {
              e.preventDefault(), a();
            }),
            $('.hide-app-sidebar-mobile').on('click', function (e) {
              e.preventDefault(), a();
            }),
            $('.menu-off-canvas .hide-sidebar-toggle-button').on(
              'click',
              function () {
                return (
                  $('.app').toggleClass('menu-off-canvas-show'),
                  $('.app').hasClass('menu-off-canvas-show')
                    ? $('.app-sidebar .logo').addClass(
                      'canvas-sidebar-hidden-logo',
                    )
                    : setTimeout(function () {
                      $('.app-sidebar .logo').removeClass(
                        'canvas-sidebar-hidden-logo',
                      );
                    }, 200),
                  !1
                );
              },
            );
        }

        function a() {
          return (
            !$('.app').hasClass('menu-off-canvas') &&
            ($('.app').toggleClass('sidebar-hidden'),
              $('.app').hasClass('sidebar-hidden')
                ? (setTimeout(function () {
                  // $(".app-sidebar .logo").addClass("hidden-sidebar-logo")
                }, 200),
                  $(window).width() > 1199
                    ? $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list')
                    : $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list-nested'))
                : ($('.app-sidebar .logo').removeClass('hidden-sidebar-logo'),
                  $(window).width() > 1199
                    ? $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list-nested')
                    : $('.hide-sidebar-toggle-button i').attr('class', 'bi bi-list')),
              !1)
          );
        }
      })(),
        window.addEventListener(
          'load',
          function () {
            var e = document.getElementsByClassName('needs-validation');
            Array.prototype.filter.call(e, function (e) {
              e.addEventListener(
                'submit',
                function (n) {
                  !1 === e.checkValidity() &&
                    (n.preventDefault(), n.stopPropagation()),
                    e.classList.add('was-validated');
                },
                !1,
              );
            });
          },
          !1,
        ),
        (() => {
          if ($('.content-menu').length) {
            const e = document.querySelector('.content-menu');
          }
        })(),
        'undefined' != typeof hljs && hljs.initHighlighting();
    }),
      $(window).on('load', function () {
        setTimeout(function () {
          $('body').addClass('no-loader');
        }, 1e3);
      });

    this.initNotifications();

  },
  methods: {
    submitInterest() {
      this.submitAttempted = true;
      if (!this.selectedService || !this.selectedCategory) {
        return;
      }
      console.log('Submitted:', {
        service: this.selectedService,
        category: this.selectedCategory
      });
      this.DefineInterest = false;
      this.submitAttempted = false;
      this.selectedService = '';
      this.selectedCategory = '';
    },
    // async logout() {
    //   if (await askConfirm('Do You Want To  Sure Logout', 'Logout', 'Logout', 'Cancel')) {
    //     localStorage.clear();
    //     const cookies = document.cookie.split(';');
    //     for (let cookie of cookies) {
    //       const eqPos = cookie.indexOf('=');
    //       const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //       document.cookie =
    //         name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    //     }
    //     location.replace('/');
    //   }
    // },


    async logout() {
      if (await askConfirm('Do you want to log out?', 'Logout', 'Logout', 'Cancel')) {
        const keepKeys = ["la", "lo", "city"];

        // ✅ --- LocalStorage ---
        const keepLocal = {};
        keepKeys.forEach((key) => {
          const value = localStorage.getItem(key);
          if (value !== null) {
            keepLocal[key] = value;
          }
        });

        localStorage.clear();

        Object.entries(keepLocal).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });

        // ✅ --- Cookies ---
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

          if (!keepKeys.includes(name)) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          }
        }

        // ✅ Redirect after cleanup
        location.replace("/");
      }
    },

    initNotifications() {
      const database = this.$database;
      const messagesRef = ref(database, `Notifications/${this.me.user.uid}`);

      onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        message.id = snapshot.key;
        this.messages.push(message);
      });

      onChildChanged(messagesRef, (snapshot) => {
        const updatedMessage = snapshot.val();
        updatedMessage.id = snapshot.key;
        const index = this.messages.findIndex(
          (message) => message.id === updatedMessage.id,
        );
        if (index !== -1) {
          this.messages.splice(index, 1, updatedMessage);
        }
      });

      onChildRemoved(messagesRef, (snapshot) => {
        const removedMessageId = snapshot.key;
        this.messages = this.messages.filter(
          (message) => message.id !== removedMessageId,
        );
      });
    },
    async clearMessages() {
      const database = this.$database;
      const messagesRef = ref(database, `Notifications/${this.me.user.uid}`);
      try {
        await remove(messagesRef);
        this.messages = [];
      } catch (error) { }
    },
    getUniqueDeviceId() {
      let deviceId = localStorage.getItem("device_id");
      if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("device_id", deviceId);
      }
      return deviceId;
    },
    async completeProfileRedirction() {
      this.$router.push('/user/profile')
    },
    async handleGetStarted() {

      await userGet(`/check-user-profile`).then((response) => {
        if (response.data.status) {

          this.$router.push({
            path: '/addbusiness'
          });

        } else {
          serverErrorMessage(this.completeProfileRedirction, response.data.msg, 'Profile Verification is Incomplete', 'Complete My Profile');
        }
      })
    },

    async handleClaimStarted() {
      await userGet(`/check-user-profile`).then((response) => {
        if (response.data.status) {

          this.$router.push({
            path: '/addbusiness',
            query: { company_id: this.$route.query.id }
          });

        } else {
          serverErrorMessage(null, response.data.msg, 'Profile Verification is Incomplete');
        }
      })
    }
  },
};
</script>

<style scoped>
@import url('./UserLayout.css');
</style>
