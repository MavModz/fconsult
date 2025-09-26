<template>
    <BootstrapIcon name="x" style="color: white;" />
    <div class="bg-[#29292a] p-[40px]">
        <div class="text-center">
            <NuxtLink to="/">
                <img src="/img/svg/footer-logo.svg" alt="Find and Consult Logo" class="mx-auto" />
            </NuxtLink>
        </div>

        <div
            class="d-flex flex-wrap justify-content-between text-[#f0f3fa] mt-[30px] text-center md:text-left footer-social-menu-new-main-second-container">
            <div>
                <ul class="d-flex flex-wrap justify-content-center md:justify-content-start footer-pages-link">
                    <li>
                        <NuxtLink  style="color:white !important" to="/crm">CRM</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink style="color:white !important" to="/whitelabel-app">Get your own app</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink style="color:white !important" to="/blogs">Blogs</NuxtLink>
                    </li>
                    <li class="contact-us-mobile-only">
                            <NuxtLink style="color:white !important" to="/contact-us">Contact Us</NuxtLink>
                        </li>

                </ul>
            </div>
            <div>
                <div class="footer-social-menu">
                    <ul
                        class="footer-icon-list list-unstyled d-flex justify-content-center md:justify-content-start gap-2">
                        <li>
                            <a style="color:white  !important" href="https://www.facebook.com/findandconsult/"
                                target="_blank"  rel="nofollow noopener noreferrer"><i class="bi bi-facebook"></i></a>
                        </li>
                        <!-- <li>
                            <a style="color:white !important" href="https://www.x.com/findandconsult" target="_blank" rel="noopener noreferrer"><i class="bi bi-twitter-x"></i></a>
                        </li> -->
                        <li>
                            <a style="color:white !important" href="https://www.instagram.com/findandconsult/"
                                target="_blank" rel="nofollow noopener noreferrer"><i class="bi bi-instagram"></i></a>
                        </li>
                        <!-- <li>
                            <a style="color:white !important" href="https://www.youtube.com/@findandconsult" target="_blank" rel="noopener noreferrer"><i class="bi bi-youtube"></i></a>
                        </li> -->
                        <li>
                            <a style="color:white !important"
                                href="https://www.linkedin.com/company/find-and-consult/" target="_blank"
                                rel="nofollow noopener noreferrer"><i class="bi bi-linkedin"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-[40px] mb-[40px] border-t border-white/15"></div>

        <div
            class="d-flex flex-wrap justify-content-between text-[#f0f3fa] mt-[30px] text-center md:text-left footer-social-menu-new-main-third-container">
            <div class="w-full md:w-auto footer-copy-rights">
                <ul class="d-flex justify-content-center md:justify-content-start">
                    <li>© 2025 Findandconsult.com.  All rights reserved.</li>
                </ul>
            </div>
            <div>
                <div class="footer-social-menu-new">
                    <ul
                        class="list-unstyled d-flex flex-wrap justify-center gap-4 footer-social-menu-new-list-unstyled ">
                        <li class="footer-below-section-pages">
                            <NuxtLink style="color:white !important" to="/contact-us">Contact Us</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink style="color:white !important" to="/TermsCondition">Terms & Condition
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink style="color:white !important" to="/PrivacyPolicy">Privacy Policy</NuxtLink>
                        </li>


                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.contact-us-mobile-only {
  display: none;
}

@media (max-width: 500px) {
  .contact-us-mobile-only {
    display: list-item;
  }
  .footer-below-section-pages{
    display: none;
  }
  .footer-pages-link{
    font-size: 14px;
    gap:15px 
  }
  .footer-copy-rights{
    font-size: 13px;

  }
  .footer-social-menu-new-list-unstyled{
    font-size: 13px;
    opacity: 0.5;
  }
}
.footer-icon-list li {
    font-size: 20px;

}

.footer-icon-list {
    gap: 30px !important
}

.footer-pages-link,
.footer-social-menu-new-list-unstyled {
    gap: 30px;
}

@media (min-width: 200px) and (max-width: 932px) {
    .footer-social-menu-new-main-third-container {
        justify-content: center !important;
    }

    .footer-social-menu-new {
        margin-top: 14px;
    }
}

@media screen and (max-width:552px) {
    .footer-icon-list li {
        font-size: 16px;

    }

    .footer-social-menu {
        margin-top: 18px;
    }

    .footer-social-menu-new-list-unstyled {
        gap: 11px;
    }

    .footer-pages-link {
        gap: 0px
    }
}

@media screen and (max-width:424px) {}

@media (min-width: 200px) and (max-width: 600px) {

    .footer-social-menu-new-main-second-container {
        justify-content: center !important;
    }
}

@media (max-width: 500px) {
    .footer-social-menu-new-main-second-container {
        display: block !important;


    }

    .footer-social-menu-new-main-second-container ul {
        gap: 20px
    }

    .footer-social-menu ul {
        gap: 40px !important
    }
}
</style>