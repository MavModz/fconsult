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
            <NuxtLink to="/admin/dashboard">
              <i class="bi bi-columns-gap"></i> Dashboard
            </NuxtLink>
          </li>

          <li class="men cursor-pointer" id="business">
            <NuxtLink class="page-list flex gap-[20px]">
              <i class="bi bi-tags-fill"></i>My Business
              <BootstrapIcon name="chevron-down" class="material-icons has-sub-menu w-[20px]" />
            </NuxtLink>
            <ul class="sub-menu ps-4">
              <li>
                <NuxtLink to="/admin/business-profile" id="b1" class="sub-men"><span class="text-[#A3AED0]">Business
                    Profile</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/Categories" id="b3" class="sub-menu"><span class="text-[#A3AED0]">Services</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/gallery/image" id="b2" class="sub-men"><span class="text-[#A3AED0]">Gallery</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/achievers" id="b4" class="sub-men"><span class="text-[#A3AED0]">Testimonials</span>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li class="men cursor-pointer" id="lead">
            <NuxtLink class="page-list flex gap-[20px]">
              <i class="bi bi-people"></i>Leads
              <BootstrapIcon name="chevron-down" class="material-icons has-sub-menu" />
            </NuxtLink>
            <ul class="sub-menu ps-4">
              <li>
                <NuxtLink to="/admin/leaddashboard" id="l1" class="sub-men"><span
                    class="text-[#A3AED0]">Dashboard</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/leads/view" id="l2" class="sub-men"><span class="text-[#A3AED0]">All Leads</span>
                </NuxtLink>
              </li>
              <li v-if="me.user.plan.crm">
                <NuxtLink to="/admin/campaign" id="camp1" class="sub-men">
                  <span class="text-[#A3AED0]">Campaigns</span>
                </NuxtLink>
              </li>
              <!-- <li v-if="me.user.plan.crm">
                <NuxtLink to="/admin/Pipeline" id="p1" class="sub-men">
                  <span class="text-[#A3AED0]">Pipeline</span>
                </NuxtLink>
              </li> -->
              <li v-if="me?.user?.plan?.crm">
                <NuxtLink to="/admin/leadintegration" id="l3" class="sub-men"><span class="text-[#A3AED0]">Lead
                    Integration </span>
                </NuxtLink>
              </li>
              <li v-else>
                <NuxtLink to="/admin/explorePlan" id="l3" class="sub-men"><span class="text-[#A3AED0] flex gap-1">Lead
                    Integration
                    <NuxtImg src="/img/svg/sidebar-lock.svg" width="15" height="15" />
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </li>
           <li class="men" id="integrations">
            <NuxtLink to="/admin/integrations">
              <i class="bi bi-sliders2"></i> Integration
            </NuxtLink>
          </li>

          <li class="men" id="l2" v-if="me?.user?.plan?.crm">
            <NuxtLink to="/admin/appointments">
              <i class="bi bi-calendar2-range"></i>Appointments
            </NuxtLink>
          </li>
          <li class="men" id="Agrement" v-if="me.user.plan.crm">
            <NuxtLink to="/admin/Agreement">
              <i class="bi bi-journal-check"></i>Agreements
            </NuxtLink>
          </li>
           <li class="men" id="Recommendations" v-if="me.user.plan.crm">
            <NuxtLink to="/admin/recommendation">
              <i class="bi bi-envelope-plus"></i>Recommendations
            </NuxtLink>
          </li>
          <li class="men" id="visitorRegister" v-if="me?.user?.plan?.crm">
            <NuxtLink to="/admin/forms">
              <i class="bi bi-person-badge"></i>Visitor Register
            </NuxtLink>
          </li>
          <li class="men cursor-pointer" id="customer" v-if="me.user.plan.crm">
            <NuxtLink class="page-list flex gap-[20px]">
              <i class="bi bi-people"></i>My Customers
              <BootstrapIcon name="chevron-down" class="material-icons has-sub-menu" />
            </NuxtLink>
            <ul class="sub-menu ps-4">
              <li>
                <NuxtLink to="/admin/customerdashboard" id="c1" class="sub-men"><span
                    class="text-[#A3AED0]">Dashboard</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/customers/view" id="c2" class="sub-men"><span class="text-[#A3AED0]">Customer
                    List</span></NuxtLink>
              </li>
            </ul>
          </li>
          <li class="men" id="admin-invoices" v-if="me?.user?.plan?.crm">
            <NuxtLink to="/admin/invoice">
              <i class="bi bi-receipt"></i>Invoices
            </NuxtLink>
          </li>
          <li class="men cursor-pointer" id="customer" v-if="me.user.plan.crm">
            <NuxtLink class="page-list flex gap-[20px]">
              <i class="bi bi-app-indicator"></i>Notification
              <BootstrapIcon name="chevron-down" class="material-icons has-sub-menu" />
            </NuxtLink>
            <ul class="sub-menu ps-4">
              <li>
                <NuxtLink to="/admin/notification/emails/campaigndashboard" id="e1" class="sub-men"><span
                    class="text-[#A3AED0]">Emails</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/notification/whatsapp" id="w1" class="sub-men"><span
                    class="text-[#A3AED0]">WhatsApp</span></NuxtLink>
              </li>
            </ul>
          </li>
          <li class="men" id="admin-workflow" v-if="me?.user?.plan?.crm">
            <NuxtLink to="/admin/workflow">
              <i class="bi bi-diagram-3"></i>WorkFlow
            </NuxtLink>
          </li>
          <li class="men" id="events" v-if="me.user.plan.crm">
            <NuxtLink to="/admin/events">
              <i class="bi bi-calendar2-day"></i>Events
            </NuxtLink>
          </li>
          <li class="men" id="app1" v-if="me.user.plan.app">
            <NuxtLink to="/admin/apps">
              <i class="bi bi-calendar2-day"></i>Apps
            </NuxtLink>
          </li>
          <li class="men" id="blogs">
            <NuxtLink to="/admin/blogs/published">
              <i class="bi bi-journal-richtext"></i>Blogs
            </NuxtLink>
          </li>


          <li class="men cursor-pointer" id="explorePlan" v-if="me.user.plan.crm">
            <NuxtLink to="/admin/explorePlan">
              <i class="bi bi-upc-scan"></i>Explore Plans
            </NuxtLink>
          </li>

          <li class="men" id="settings" v-if="me?.user?.plan?.crm">
            <NuxtLink to="/admin/settings/LeadManagement" class="page-list flex gap-[20px]">
              <i class="bi bi-sliders"></i>Settings
            </NuxtLink>
          </li>
          <li class="men" id="mgt" v-if="!me?.user?.plan?.crm || me?.user?.plan?.crm_trial">
            <NuxtLink to="/admin/erp" class="page-list flex gap-[20px]">
              <i class="bi bi-upc-scan"></i>ERP Manager
              <NuxtImg v-if="me?.user?.plan?.crm_trial" src="/img/svg/sidebar-lock.svg" width="20" height="20" />
              <NuxtImg v-else src="/img/svg/sidebar-lock.svg" width="20" height="20" />
            </NuxtLink>
          </li>

          <div class="mgmt-cta flex items-center justify-center mt-8 cursor-pointer" v-if="!me?.user?.plan?.crm">
            <NuxtLink to="/admin/explorePlan">
              <NuxtImg src="/img/png/sidebar-cta.png" width="265" height="266" />
            </NuxtLink>
          </div>

        </ul>
      </div>
    </div>

    <div class="app-container mainbody">
      <div class="app-header">
        <nav class="navbar navbar-light navbar-expand-lg">
          <div class="container-fluid">
            <div class="navbar-nav" id="navbarNav">
              <ul class="navbar-nav w-100">
                <li class="nav-item d-flex align-items-center justify-content-between gap-2">
                  <div class="title-container">
                    <a class="nav-link hide-sidebar-toggle-button" href="#">
                      <span class="d-flex">
                        <i class="material-icons h1" id="smallmenu"></i>
                        <button id="backbtn1" class="back-button " onclick="window.history.back()"><img
                            src="/public/img/svg/backBtn.svg"></button>
                        <span class="h" id="title1"></span>
                      </span>
                    </a>
                    <a class="nav-link hide-sidebar-toggle-button2" href="#">
                      <span class="d-flex">
                        <i class="material-icons h2" id="smallmenu"></i>
                        <button id="backbtn2" class="back-button block" onclick="window.history.back()"><img
                            src="/public/img/svg/backBtn.svg" class="bck-btn"></button>
                        <span class="h6" id="title2"></span>
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div class="d-flex right-div">
              <div class="nav-item">
                <a class="nav-link notification-dropdown-toggle mt-2 me-3" href="#" data-bs-toggle="dropdown">
                  <img src="https://c.animaapp.com/blutJVDd/img/vector-4.svg" height="10" />
                </a>
                <div class="dropdown-menu dropdown-menu-end notifications-dropdown"
                  aria-labelledby="notificationsDropDown">
                  <h6 class="dropdown-header">Notifications <Badge :value="messages.length"></Badge>
                  </h6>
                  <div class="notifications-dropdown-list">

                    <a v-for="i in messages">
                      <div class="notifications-dropdown-item">
                        <div class="notifications-dropdown-item-image">
                          <span v-if="i.type == 'warning'">
                            <NuxtImg src="/img/svg/alert-notification.svg" width="20" height="20" />
                          </span>
                          <span v-if="i.type == 'success'">
                            <NuxtImg src="/img/svg/success-notification.svg" width="20" height="20" />
                          </span>
                          <span v-if="i.type == 'error'">
                            <NuxtImg src="/img/svg/warning-notification.svg" width="20" height="20" />
                          </span>
                          <span v-if="i.type == 'info'">
                            <NuxtImg src="/img/svg/info-notification.svg" width="20" height="20" />
                          </span>
                          <span v-if="i.type == 'system-generated'">
                            <NuxtImg src="/img/svg/fc-notification.svg" width="20" height="20" />
                          </span>
                          <span v-if="i.type == 'reminder'">
                            <NuxtImg src="/img/svg/reminder-notification.svg" width="20" height="20" />
                          </span>
                        </div>
                        <div class="notifications-dropdown-item-text">
                          <p class="bold-notifications-text">{{ i.title }}</p>
                          <small class="bold-notifications-text">{{
                            i.message
                            }}</small>
                          <br />
                          <b> {{ new Date(i.time).toLocaleString() }}</b>
                        </div>
                      </div>
                    </a>
                    <div v-if="messages.length == 0" class="notifications-dropdown-item">
                      <p>No notification found</p>
                    </div>
                    <center v-if="messages.length">
                      <button class="btn btn-light" @click="clearMessages">
                        Clear Messages
                      </button>
                    </center>
                  </div>
                </div>
              </div>
              <div class="nav-item">
                <AdminGuide />
                <ul class="dropdown-menu dropdown-menu-end language-dropdown me-5" aria-labelledby="languageDropDown">
                  <li>
                    <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#kt_modal_invite_friends">Guide</a>
                  </li>
                </ul>
              </div>
              <div class="nav-item">
                <div class="nav-item flex items-center">
                  <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown">
                    <img :src="me?.user.user.profile_image" alt="Help" style="width: 40px"
                      class="w-[30px] rounded-full mr-2" />
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown w-[225px] top-[15px!important]"
                    aria-labelledby="languageDropDown" style="
                      position: absolute;
                      inset: 75px 20px auto auto !important;
                      margin: 0px;
                    ">
                    <div class="flex gap-3 px-[6px]">
                      <div class="w-full">
                        <div class="flex gap-2 items-center">
                          <span class="font-[500] text-[#757575] text-sm">{{ me?.user?.user?.name }}</span>
                          <span class="text-[#50cd89] bg-[#e8fff3] text-[12px] px-2 h-[max-content] rounded-lg">{{
                            me?.user.role }}</span>
                        </div>
                        <span class="w-full text-[#454056] text-base flex items-center justify-between py-2">
                          Admin Dashboard
                          <NuxtLink to="/admin/dashboard">
                            <NuxtImg src="/svg-new-img/box-arrow.svg" width="20" height="20" />
                          </NuxtLink>
                        </span>

                      </div>
                    </div>
                    <div class="border-[1px] bg-[#f4f4f4] relative my-2"></div>
                    <div class="flex flex-col">
                      <NuxtLink :to="'/admin/business-profile'" class="link p-2">
                        <NuxtImg src="/svg-new-img/gg_profile.svg" width="14" height="14" /> My Profile
                      </NuxtLink>
                      <NuxtLink :to="'/admin/wishlists'" class="link p-2">
                        <NuxtImg src="/svg-new-img/material-symbols_bookmark-outline.svg" width="14" height="14" />
                        Bookmark
                      </NuxtLink>
                      <NuxtLink :to="'/admin/exploreplan/exploretable'" class="link p-2">
                        <NuxtImg src="/svg-new-img/mdi_cube-outline.svg" width="14" height="14" /> Purchased Plans
                      </NuxtLink>
                      <!-- <TieredMenu :model="items" /> -->
                      <NuxtLink @click="logout()" class="link py-2 px-2 text-[#7e8299]" style="cursor: pointer;">
                        <NuxtImg src="/svg-new-img/akar-icons_sign-out.svg" width="14" height="14" /> Logout
                      </NuxtLink>
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
          <slot />
        </div>
      </div>
    </div>
    <div v-if="callActive && callLeadId" class="call-lead " @click="goToLead">
      <div class="action-items" :class="{ 'highlight-call-lead': highlightCallLead }">
        <div class="call-item">
          <div class="inner-item">
            <img src="/public/img/png/Telephone.png" />
            Call Lead
          </div>
          <img src="/public/img/png/side-arrow.png" class="call-lead-down-arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { getCookie } from '@/utils/cookies';
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
      callActive: false,
      callLeadId: null,
      highlightCallLead: false,
      cookieInterval: null,
      lastHighlightMinute: null
    };
  },

  async setup() {
    const nuxtApp = useNuxtApp();
    // nuxtApp.$userOnline();
    if (process.client && typeof nuxtApp.$userOnline === 'function') {
      nuxtApp.$userOnline();
    }

    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    const now = new Date();
    const endTime = new Date(me.user.plan.crm_trialTill);
    if (now <= endTime) {
      me.user.plan.crm = true
    }
    return { me };
  },

  async mounted() {


    $(document).ready(function () {
      $('.men').on('click', function () {
        if (window.innerWidth < 1200) { try { document.getElementById('smallmenu').click() } catch (error) { } }
      });
    });

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
    this.checkCallStatus(); // initial check

    // Check cookies every second
    this.cookieInterval = setInterval(() => {

      this.checkCallStatus();
    }, 1000);



  },
  beforeUnmount() {
    clearInterval(this.cookieInterval);
  },
  methods: {
    goToLead() {
      const timestamp = Date.now(); // unique value each time
      this.$router.push({
        path: `/admin/leads-new/lead-view/${this.callLeadId}`,
        query: { callPopup: 'true', t: timestamp } // `t` is just a dummy key
      });
    },

    // checkCallStatus() {
    //   const isActive = getCookie('callActive') === 'true';
    //   const leadId = getCookie('callLeadId');


    //   if (isActive !== this.callActive || leadId !== this.callLeadId) {
    //     this.callActive = isActive;
    //     this.callLeadId = leadId;
    //   }
    // },

    checkCallStatus() {
      const isActive = getCookie('callActive') === 'true';
      const leadId = getCookie('callLeadId');
      const startTimeStr = getCookie('callStartTime');

      this.callActive = isActive;
      this.callLeadId = leadId;

      if (isActive && startTimeStr) {
        const startTime = new Date(startTimeStr);
        const now = new Date();
        const diffInMinutes = Math.floor((now - startTime) / 60000);

        // Highlight every 5th minute only once
        if (diffInMinutes > 0 && diffInMinutes % 5 === 0 && diffInMinutes !== this.lastHighlightMinute) {

          this.highlightCallLead = true;
          this.lastHighlightMinute = diffInMinutes;

          setTimeout(() => {
            this.highlightCallLead = false;
          }, 20000); // 20 seconds
        }
      }
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
        // console.log("this.messages",this.messages)
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
      console.log("Deleting from path:", `Notifications/${this.me.user.uid}`);
      try {
        await remove(messagesRef);
        this.messages = [];
      } catch (error) { console.log("Deleting from path:", `Notifications/${this.me.user.uid}`);}
    },
  },
};
</script>

<style scoped>
@import url('./style.css');

.highlight-call-lead {
  background-color: #edc1c1 !important;
  transition: background-color 0.5s ease;
}
#sidebar::-webkit-scrollbar {
  display: none;
}
</style>