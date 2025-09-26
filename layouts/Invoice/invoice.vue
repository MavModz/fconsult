<template>
  <div class="app align-content-stretch d-flex flex-wrap">
    <div class="app-container mainbody">
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
import $ from 'jquery'
import { ref, push, set, onChildAdded, onChildChanged, onChildRemoved,remove } from 'firebase/database'


export default {
  data() {
    return {
      me: useNuxtApp().user,
      messages: [],
    }
  },
  setup() {
    useHead({
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', body: true }
      ]
    })
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
     $(window).on("load", function () {
      setTimeout(function () {
        $("body").addClass("no-loader")
      }, 1e3)
    });
    this.initNotifications()

  },
  methods: {
    initNotifications() {

      const database = this.$database
      const messagesRef = ref(database, `Notifications/${this.me._id}`)


      onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val()
        message.id = snapshot.key
        this.messages.push(message)
      })

      onChildChanged(messagesRef, (snapshot) => {
        const updatedMessage = snapshot.val()
        updatedMessage.id = snapshot.key
        const index = this.messages.findIndex(message => message.id === updatedMessage.id)
        if (index !== -1) {
          this.messages.splice(index, 1, updatedMessage)
        }
      })

      onChildRemoved(messagesRef, (snapshot) => {
        const removedMessageId = snapshot.key
        this.messages = this.messages.filter(message => message.id !== removedMessageId)
      })

    },
    async clearMessages() {
      const database = this.$database;
      const messagesRef = ref(database, `Notifications/${this.me._id}`);
      try {
        await remove(messagesRef);
        this.messages = [];
      } catch (error) {
        
      }
    },
  }


}
</script>

<style scoped>
@import url('./style.css');

body {
  background-color: #f4f7fe
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