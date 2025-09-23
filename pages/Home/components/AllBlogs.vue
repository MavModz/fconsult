<!-- @format -->

<template>
  <section class="blog mb-124">
    <div class="container">
      <div class="title d-flex justify-content-between align-items-center mb-4">
        <h2 class="me-4">Important Facts & Information</h2>
        <NuxtLink to="/blogs" class="ms-4"
          >Go to blog<i class="fa fa-long-arrow-right ms-2"></i
        ></NuxtLink>
      </div>
      <div class="blog-section-inner">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-6">
            <div class="blog-card">
              <div class="card">
                <div class="card-img-top">
                  <img src="/img/png/blog-img-1.png" alt="blog-img" />
                </div>
                <div class="card-body ps-0">
                  <p class="blog-tag">Accomodation</p>
                  <h5 class="card-title">
                    <a href="#">Air Travel in the Time of COVID-19</a>
                  </h5>
                  <div class="blog-card-user mt-3">
                    <div class="user-profile">
                      <img src="/img/png/user-1.png" />
                    </div>
                    <div class="user-details">
                      <p class="user-name">Bessie Cooper</p>
                      <ul class="d-flex list-unstyled align-items-center">
                        <li><img src="/img/svg/clean-3.svg" />Nov 24</li>
                        <li><img src="/img/svg/chat-round.svg" />No comments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6">
            <div class="blog-card">
              <div class="card">
                <div class="card-img-top">
                  <img src="/img/png/blog-img-2.png" alt="blog-img" />
                </div>
                <div class="card-body ps-0">
                  <p class="blog-tag">TRANSPORTATION</p>
                  <h5 class="card-title">
                    <a href="#">10 World-Class Museums You Can Visit Online</a>
                  </h5>
                  <div class="blog-card-user mt-3">
                    <div class="user-profile">
                      <img src="/img/png/user-1.png" />
                    </div>
                    <div class="user-details">
                      <p class="user-name">Bessie Cooper</p>
                      <ul class="d-flex list-unstyled align-items-center">
                        <li><img src="/img/svg/clean-3.svg" />Nov 24</li>
                        <li><img src="/img/svg/chat-round.svg" />No comments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6">
            <div class="blog-card">
              <div class="card">
                <div class="card-img-top">
                  <img src="/img/png/blog-img-3.png" alt="blog-img" />
                </div>
                <div class="card-body ps-0">
                  <p class="blog-tag">ENTERTAINMENT</p>
                  <h5 class="card-title">
                    <a href="#">7 Tips for Solo Travelers in Africa</a>
                  </h5>
                  <div class="blog-card-user mt-3">
                    <div class="user-profile">
                      <img src="/img/png/user-1.png" />
                    </div>
                    <div class="user-details">
                      <p class="user-name">Bessie Cooper</p>
                      <ul class="d-flex list-unstyled align-items-center">
                        <li><img src="/img/svg/clean-3.svg" />Nov 24</li>
                        <li><img src="/img/svg/chat-round.svg" />No comments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'AllBlogs',
};
</script>
