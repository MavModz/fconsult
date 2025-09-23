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
            <NuxtLink to="/superadmin/dashboard"><i class="bi bi-columns-gap"></i>Dashboard</NuxtLink>
          </li>

          <li class="men" id="home">
            <a class="page-list"><i class="bi bi-house-door"></i>Home
              <BootstrapIcon name="chevron-right" class="material-icons has-sub-menu" />
            </a>
            <ul class="sub-menu ps-4">
              <li>
                <NuxtLink to="/superadmin/home/hero" id="h1" class="sub-men"><span>Hero Banner</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/home/study" id="h2" class="sub-men"><span>Study</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/home/tourist" id="h3" class="sub-men"><span>Tourist</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/home/work" id="h4" class="sub-men"><span>Work</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/home/PR" id="h5" class="sub-men"><span>PR</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/home/Visitor" id="h6" class="sub-men"><span>Visitor</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/home/Business" id="h7" class="sub-men"><span>Business</span></NuxtLink>
              </li>
            </ul>
          </li>
          <li class="men" id="listing">
            <NuxtLink to="/superadmin/BusinessListing"><i class="bi bi-briefcase"></i>Business-Listing</NuxtLink>
          </li>
          <li class="men" id="company">
            <NuxtLink to="/superadmin/company/all"><i class="bi bi-building"></i>Companies</NuxtLink>
          </li>
          <li class="men" id="contactformfooter">
            <NuxtLink to="/superadmin/contactFormLead"><i class="bi bi-person"></i>ContactFormLead</NuxtLink>
          </li>
          <li class="men" id="user">
            <NuxtLink to="/superadmin/user"><i class="bi bi-person"></i>Users</NuxtLink>
          </li>

          <li class="men" id="admin">
            <NuxtLink to="/superadmin/admin">
              <BootstrapIcon name="gear" />Admins
            </NuxtLink>
          </li>

          <li class="men" id="event">
            <NuxtLink to="/superadmin/events"><i class="bi bi-calendar-date"></i>Events</NuxtLink>
          </li>

          <li class="men" id="services">
            <NuxtLink to="/superadmin/services">
              <BootstrapIcon name="gear" />Services
            </NuxtLink>
          </li>

          <li class="men" id="offer">
            <NuxtLink to="/superadmin/offers"><i class="bi bi-percent"></i>Offers</NuxtLink>
          </li>

          <li class="men" id="blogs">
            <a class="page-list"><i class="bi bi-journal-richtext"></i>Blogs
              <BootstrapIcon name="chevron-right" class="material-icons has-sub-menu" />
            </a>
            <ul class="sub-menu ps-4">
              <li>
                <NuxtLink to="/superadmin/blogs" id="b1" class="sub-men"><span>All Blogs</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/blogcategories" id="b2" class="sub-men"><span>Blog Category</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/blogs/add" id="b3" class="sub-men"><span>Add Blog</span></NuxtLink>
              </li>
            </ul>
          </li>

          <li class="men" id="job">
            <NuxtLink to="/superadmin/jobcategories">
              <BootstrapIcon name="gear" />Job Categories
            </NuxtLink>
          </li>

          <li class="men" id="trial">
            <NuxtLink to="/superadmin/trial">
              <BootstrapIcon name="gear" />Trials
            </NuxtLink>
          </li>

          <li class="men" id="business">
            <a class="page-list"><i class="bi bi-bank"></i>Payments
              <BootstrapIcon name="chevron-right" class="material-icons has-sub-menu" />
            </a>
            <ul class="sub-menu ps-4">
              <li>
                <NuxtLink to="/superadmin/payments/all" id="p1" class="sub-men"><span>All</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/payments/successful" id="p2" class="sub-men"><span>Successfull</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/payments/pending" id="p3" class="sub-men"><span>Pending</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/superadmin/payments/failed" id="p4" class="sub-men"><span>Failed</span></NuxtLink>
              </li>
            </ul>
          </li>

          <li class="men" id="plans">
            <NuxtLink to="/superadmin/plans"><i class="bi bi-clipboard-plus"></i>Plans</NuxtLink>
          </li>

          <li class="men" id="listings">
            <NuxtLink to="/superadmin/listings"><i class="bi bi-list-ol"></i>Listings</NuxtLink>
          </li>

          <li class="men" id="claim">
            <NuxtLink to="/superadmin/claims"><i class="bi bi-building-add"></i>Business Claims</NuxtLink>
          </li>
        </ul>
        <!-- <div
          class="flex justify-between items-center gap-2 px-[35px] py-[20px] bg-[#09244B08] shadow-lg absolute w-[-webkit-fill-available] bottom-[-12px] cursor-pointer">
          <div class="flex flex-col gap-2">
            <span class="text-[#1F1F1F] font-[500] text-[18px]">Richard</span>
            <span class="text-[#FF5757] font-normal text-[18px]">User</span>
          </div>
          <img src="/img/svg/logouts.svg" alt="" />
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
              <div class="nav-item">
                <a class="nav-link notification-dropdown-toggle mt-2 me-3" href="#" data-bs-toggle="dropdown">
                  <img src="https://c.animaapp.com/blutJVDd/img/vector-4.svg" height="10" />
                </a>
                <div class="dropdown-menu dropdown-menu-end notifications-dropdown"
                  aria-labelledby="notificationsDropDown">
                  <h6 class="dropdown-header">Notifications</h6>
                  <div class="notifications-dropdown-list">
                    <a href="#">
                      <div class="notifications-dropdown-item">
                        <div class="notifications-dropdown-item-image">
                          <span class="notifications-badge bg-success text-white">
                            <i class="material-icons text-white">warning</i>
                          </span>
                        </div>
                        <div class="notifications-dropdown-item-text">
                          <p class="bold-notifications-text">
                            This is Notification Title
                          </p>
                          <small>10:00</small>
                        </div>
                      </div>
                    </a>

                    <a href="#">
                      <div class="notifications-dropdown-item">
                        <div class="notifications-dropdown-item-image">
                          <span class="notifications-badge bg-success text-white">
                            <i class="material-icons text-white">warning</i>
                          </span>
                        </div>
                        <div class="notifications-dropdown-item-text">
                          <p class="bold-notifications-text">
                            This is Notification Title
                          </p>
                          <small>10:00</small>
                        </div>
                      </div>
                    </a>
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
                <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown"
                  data-bs-toggle="dropdown"><img src="/img/png/us.png" alt="" /></a>
                <ul class="dropdown-menu dropdown-menu-end language-dropdown" aria-labelledby="languageDropDown">
                  <li>
                    <a class="dropdown-item" href="#"><img src="/img/png/us.png" alt="" />Main Branch</a>
                  </li>
                </ul>
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
</template>

<script>
import $ from 'jquery';

export default {
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
  },
};
</script>

<style scoped>
@import url('./style.css');

body {
  background-color: #f4f7fe;
}

.icon {
  transform: translate(-50%, -50%);
}

.container {
  position: relative;
  /* Ensure the container serves as the reference for absolute positioning */
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  z-index: 10;
}

.blurred-div {
  pointer-events: none;
  filter: blur(5px);
  z-index: -10;
}

.noloader {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  z-index: 10;
}

.slideInRight {
  animation: slideInRight 0.3s ease;
}
</style>
