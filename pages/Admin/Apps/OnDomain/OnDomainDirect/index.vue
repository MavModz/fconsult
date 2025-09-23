<template>
  <div class="domain-container">
    <div class="domain-header">
      <div>
        <div class="domain-name">
          techglide.co.in
          <a href="#"><img src="public/img/png/redirect-vector.png" alt="external-link" /></a>
        </div>
        <div class="status">
          <span class="connected">CONNECTED</span>
          <span class="last-date">Expires on: 12 JUL 2026</span>
        </div>
      </div>
      <div class="actions">
        <button class="secondary">Save & Exit</button>
        <button>Save</button>
      </div>
    </div>
    <div class="alert">
      <span class="alert-text">
        Your On Domain Add-on is expiring in 5 days.<a href="#">Renew now</a> to avoid any service interruptions
      </span>
      <span class="cross-icon">✕</span>
    </div>

    <div class="a-record">
      <div class="a-record-title">
        <p>A Record</p>
        <img src="public/img/png/dropdown-arrow.png" alt="dropdown" />
      </div>
      <hr />
      <div class="record-row">
        <div class="input-block">
          <label>Name / Host / Alias</label>
          <p>Lorem ipsum dolor sit amet consectetur. Cursus tellus nunc.</p>
          <span class="input-block-input">
            <input class="input-error" placeholder="@" />
            <img src="public/img/png/cross-icon-bg.png" alt="error" />
          </span>
          <div class="error-text">
            <p>Details mismatched, Not able to connect</p>
          </div>
        </div>

        <div class="input-block">
          <label>Value / Points To</label>
          <p>Lorem ipsum dolor sit amet consectetur. Cursus tellus nunc.</p>
          <span class="input-block-input-1">
            <input v-model="pointsTo" placeholder="-------------------" />
            <img src="public/img/png/verified_vector.png" alt="verified" />
          </span>
        </div>
      </div>
    </div>
    <div class="remove-domain">
      <img src="public/img/png/delete-vector.png" alt="delete" />
      Remove Domain
    </div>
  </div>
</template>

<script >
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default{

mounted() {
  activateMenu('app1', 'Apps');
}}

// mounted() {
//       activateMenu('app1', 'Apps');
//     }
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  background: #f8f9fb;
  margin: 0;
  padding: 2rem;
}

.domain-container {
  border-radius: 1rem;
  padding: 2rem;
  max-width: 1550px;
  margin: 0 auto;
}

.domain-header {
  display: flex;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 34px 28px;
  box-shadow: 0px 11.08px 171.72px 0px #99ABC62E;
  border-radius: 25px;
}

.domain-name {
  font-size: 29px;
  line-height: 150%;
  text-decoration: underline;
  font-weight: 700;
  color: #282823;
  display: flex;
  align-items: center;
}

.domain-name a {
  text-decoration: none;
  color: #2c6dff;
  margin-left: 0.5rem;
  font-size: 1rem;
}

.status {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #4a4a4a;
}

.connected {
  background-color: #87F56166;
  color: #1A6401;
  padding: 7px 10px;
  border-radius: 147px;
  font-weight: 700;
  font-size: 12px;
  margin-right: 0.5rem;
}

.last-date {
  color: #807C8D;
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;

}

.actions {
  display: flex;
  /* gap: 1rem; */
  align-items: center;
}

.actions button {
  background-color: #ff5757;
  color: white;
  padding: 5px 21px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  line-height: 34px;
  letter-spacing: -1%;
  border-radius: 23px;
  cursor: pointer;
}

.actions button.secondary {
  color: #FF5757;
  background-color: #ffffff;
  text-decoration: underline;
}

.alert {
  background-color: #FF635F14;
  color: #FF635F;
  box-shadow: 0px 3.72px 19.83px 1.24px #0000000A;
  padding: 12px 20px;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-text {
  width: 95%;
  text-align: center;
  font-size: 15px;
  font-weight: 400px;

}

.cross-icon {
  color: #FF635F;
  font-size: 13px;
}

.alert a {
  font-weight: 700;
  color: #FF635F;
  text-decoration: underline;
  margin-left: 0.5rem;
}

.a-record {
  margin-top: 2rem;
  padding: 27px 52px;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 11.08px 171.72px 0px #99ABC62E;
}

.a-record-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.a-record-title p {
  font-weight: 600;
  font-size: 21px;
  line-height: 150%;
  color: #282823;
  margin: 0px;
}

hr {
  background-color: #000000;
  opacity: 10%;
  border: none;
  height: 2px;
  margin: 20px 0px;
}

.record-row {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.input-block {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-block label {
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.15px;
  color: #1F1F1F;
}

.input-block p {
  font-size: 15px;
  color: #A5A5A5;
  margin-top: 2px;
  font-weight: 500;
  line-height: 100%;
  margin-bottom: 15px;
}

.input-block-input {
  padding: 17px 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 11px;
  border: 1.07px solid #FF635F !important;
  background-color: #ffffff;
}

.input-block-input input,
.input-block-input-1 input {
  border: 0px;
}

.input-block-input-1 {
  padding: 17px 19px;
  display: flex;
  content: '------------------';
  align-items: center;
  justify-content: space-between;
  border-radius: 11px;
  border: 1.07px solid #E5E5EA;
  background-color: #ffffff;
}

.input-error::placeholder {
  font-size: 15px;
  font-weight: 400;
  line-height: 150%;
  color: #FF635F;
}

.error-text {
  text-align: right;
}

.error-text p {
  color: #ff5757;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

input:focus,
input:active {
  outline: none;
}

.remove-domain {
  color: #ff5757;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: end;
  font-weight: 600;
  font-size: 16px;
  margin-top: 2rem;
  line-height: 42px;
  cursor: pointer;
}
@media screen and (max-width: 900px) {
.record-row {
    gap: 1rem;
}
}
@media screen and (max-width: 670px) {
.actions{
  margin-top: 20px;
}
.alert-text {
    width: 95%;
    text-align: left;
}
.remove-domain {
    margin-top: 1rem;
}}
@media screen and (max-width: 450px) {
.domain-header{
  padding: 24px 18px;
}
.domain-container {
    padding: 1rem;
}
.a-record {
    margin-top: 2rem;
    padding: 20px 22px;
  }
}
@media screen and (max-width: 368px) {
  .status{
    display: flex;
    flex-direction: column;
    gap:15px;
  }
  .a-record {
    padding: 20px 17px !important;
  }
  .connected{
    width:40% ;
  }
  .domain-container {
    padding: 0.6rem !important;
}
  .input-block-input-1[data-v-39252464] {
    padding: 14px 16px;
}
}
</style>