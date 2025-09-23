<template>
  <div class="contact-card">
    <div class="contact-card-top d-flex justify-content-between">
      <div class="contact-card-user-img">
        <img :src="listing.created_by?.profile_image" class="rounded-circle" />
      </div>
      <div class="text-right max-[767px]:text-[center!important] follow_btn">
      </div>
    </div>
    <h4>{{ listing.created_by?.name ?? 'Admin Name' }}</h4>
    <NuxtLink :to="'/company/' + listing.company_id._id ">
      <p class="desigantion">{{ listing.company_id.company_name }}</p>
    </NuxtLink>
    <div class="contact-card-details">
      <ul class="list-unstyled">
        <li>
          <span><img src="/img/svg/phone.svg" alt="" /></span><a>{{ listing.company_id?.phone }}</a>
        </li>
        <li>
          <span><img src="/img/svg/mail.svg" alt="" /></span><a href="mailto:example@gmail.com">{{
            listing.company_id?.company_email }}</a>
        </li>
      </ul>
    </div>

    <div class="row mb-4">
      <div class="col-md-12">
        <ul class="nav nav-tabs btng1 justify-content-between">
          <li>
            <a style="padding: 12px 40px;" data-bs-toggle="tab" href="#t1" class="active">
              <span><i class="fa fa-info-circle" aria-hidden="true"></i></span>Enquiry
            </a>
          </li>
          <li>
            <a style="padding: 12px 40px;" data-bs-toggle="tab" href="#t2">
              <span><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>Appointment
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="tab-content">
      <div id="t1" class="tab-pane fade in active show">
        <div class="contact-card-form">
          <FormKit type="form" @submit="addLead">
            <div class="input-field">
              <FormKit validation="required" type="text" name="name" placeholder="Your name*" class="form-control" />
            </div>
            <div class="input-field">
              <FormKit validation="required" type="text" name="email" placeholder="Email*" class="form-control" />
            </div>
            <div class="input-field">
              <FormKit validation="required" type="text" name="phone" placeholder="Phone" class="form-control" />
            </div>
            <button type="submit" class="site-btn-2 bg-[#ff5757] text-white"">Send request</button>
          </FormKit>
        </div>
      </div>
      <div id="t2" class="tab-pane fade">
        <div class="contact-card-form">
          <FormKit type="form" @submit="addAppointment">
            <div class="input-field">
              <FormKit validation="required" type="text" name="name" placeholder="Your name*" class="form-control" />
            </div>
            <div class="input-field">
              <FormKit validation="required" type="text" name="email" placeholder="Email*" class="form-control" />
            </div>
            <div class="input-field">
              <FormKit validation="required" type="text" name="phone" placeholder="Phone" class="form-control" />
            </div>
            <div class="input-field process-field">
              <FormKit validation="required" type="datetime-local" name="date" placeholder="Appointment Date"
                class="form-control"/>
            </div>
            <div class="input-field">
              <FormKit validation="required" type="text" name="description" placeholder="Message"
                class="form-control" />
            </div>
            <button type="submit" class="site-btn-2 bg-[#ff5757] text-white"">Send request</button>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minDateTime: '',
    }
  },
  name: 'ContactCard',
  props: {
    admin: {},
    listing: {}
  },
  mounted() {
    this.setMinDateTime();
  },
  data() {
    return {
      me: useNuxtApp()
    }
  },
  methods: {
    setMinDateTime() {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 16);
      this.minDateTime = formattedDate;
    },
    async addLead(v) {
      if (!this.me?.isLogged) {
        this.$router.push("/auth/login")
      } else {
        v.company_id = this.listing.company_id._id;
        v.listing = this.listing._id
        v.listingType = this.listing.type
        v.service = this.listing.service_id
        v.source = "home"
        await userPost(`/home-add-leads`, v).then((response) => {
          if (response.data.status) {
            successAlert('Applied Successfully');
          } else {
            errorAlert(response.data.msg);
          }
        });
      }
    },
    async addAppointment(v) {
      if (!this.me?.isLogged) {
        this.$router.push("/auth/login")
      } else {
        v.company_id = this.listing.company_id._id;
        v.listing = this.listing._id
        v.listingType = this.listing.type
        v.service = this.listing.service_id
        v.source = "home"
        v.time = v.date.split("T")[1]
        await userPost(`/appointment-lead-add`, v).then((response) => {
          if (response.data.status) {
            successAlert('Appointment Requested');
          } else {
            errorAlert(response.data.msg);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
:root {
  --red-tone: #ff5757;
  --gray-clr: #454056;
  --transition: all 0.5s ease-in-out;
  --navy-dark: #1f1b2d;
  --light-grey: #666276
}

.card-text {
  text-align: left
}

.btng1 {
  flex-wrap: wrap;
  row-gap: 10px;
  border-bottom: none
}

.btng1>li>a {
  background: #f5f4f8;
  border-radius: 54.7246px;
  padding: 10.9449px 21.8899px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: inline-block;
  color: #454056
}

.btng1>li>a.active {
  color: #ff5757;
  background: #fff;
  box-shadow: 0 2.73623px 2.73623px -2.73623px rgba(31, 27, 45, .08), 0 5.47246px 16.4174px rgba(31, 27, 45, .08)
}

.btng1 a i {
  padding-right: 7px
}

.btng1>li>a:hover {
  color: #ff5757;
  background: #fff;
  box-shadow: 0 2.73623px 2.73623px -2.73623px rgba(31, 27, 45, .08), 0 5.47246px 16.4174px rgba(31, 27, 45, .08)
}

.follow_btn a {
  background: #fff;
  box-shadow: 0 2px 2px -2px rgba(31, 27, 45, .08), 0 4px 12px rgba(31, 27, 45, .08);
  width: 32px;
  height: 32px;
  display: inline-block;
  border-radius: 50px;
  text-align: center;
  line-height: 30px;
  margin-left: 8px;
  color: var(--gray-clr);
  transition: var(--transition)
}

.follow_btn a:hover {
  background-color: var(--red-tone);
  color: #fff
}

.follow_btn span {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  margin-right: 8px;
  color: #1f1b2d
}

.follow_btn {
  text-align: right
}

@keyframes playbtn {
  0% {
    transform: scale(.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, .7)
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0)
  }

  100% {
    transform: scale(.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0)
  }
}

.contact-card {
  background-color: #fff;
  box-shadow: 0 4.855769157409668px 14.56730842590332px 0 #1f1b2d14;
  border-radius: 12px;
  padding: 24px;
  margin-top: 25%;
  border:1px solid #d7dce7
}

.contact-card .contact-card-user-img {
  width: 72px;
  height: 72px;
  border-radius: 50%
}

.contact-card h4 {
  font-size: 24px;
  color: var(--gray-clr);
  font-weight: 700;
  line-height: 36px;
  margin-top: 10px
}

p.desigantion {
  font-size: 18px;
  font-weight: 400;
  color: var(--light-grey);
  margin-top: 4px;
  margin-bottom: 10px
}

.contact-card-details {
  margin-block-end: 70px
}

.contact-card-details ul li {
  display: grid;
  grid-template-columns: 32px auto;
  place-items: center start
}

.contact-card-details ul li a {
  font-size: 18px;
  font-weight: 400;
  color: var(--gray-clr);
  margin-top: 4px;
  display: inline-block
}

.contact-card-form {
  border-top: 1.21px solid #efecf3;
  padding-block-start: 30px
}

.contact-card-form .input-field {
  margin-bottom: 20px
}

.contact-card-form .input-field input {
  height: 53px;
  border-radius: 8px
}

.contact-card-form .input-field input::placeholder {
  color: #9691a4
}

.input-field input[type=checkbox] {
  accent-color: var(--red-tone);
  height: auto !important
}

.input-field.process-field {
  position: relative
}

.input-field.process-field button {
  height: 53px;
  width: 53px;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border-left: 1px solid #efecf3
}

.input-field.process-field button img {
  height: 21px
}

.contact-card-form button.site-btn-2 {
  display: block;
  width: 100%;
  height: 62px;
  line-height: 62px;
  padding: 0;
  font-size: 18px;
  border-radius: 8px
}
</style>