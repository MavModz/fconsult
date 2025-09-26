<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Role Settings</span>
      <span id="add-btn" @click="handleAddCustomRoleShow(true)">+ Add</span>
    </div>
    <div class="break-line"></div>
    <section>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Role Name</th>
            <th>Color Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Admin</td>
            <td class="td">
              <div class="color-picker">
                <span :style="{background: '#49A7FE', fontSize: fontSize + 'px', height: '30px', width: '30px', borderRadius: '50%'}"></span>
                <!-- <input type="color" value="#49A7FE" style="height: 32px; width: 32px" disabled />&nbsp; -->
                &nbsp;<span>#49A7FE</span>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <span class="td-btn">
                  <img src="/img/svg/edit.svg" alt="" />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>Sub-Admin</td>
            <td class="td">
              <div class="color-picker">
                <span :style="{
                  background: '#FE4949', fontSize: fontSize + 'px', height: '30px', width: '30px', borderRadius: '50%'
                }"></span>
                &nbsp;<span>#FE4949</span>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <span class="td-btn">
                  <img src="/img/svg/edit.svg" alt="" />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
  <section class="user-details">
    <div class="languages">
      <div class="gallery-media-action">
        <div class="gallery-action">
          <div class="search-container">
            <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
            <input type="text" placeholder="Search Leads" />
          </div>
        </div>
        <button @click="handleAddUserShow(true)">
          <span style="font-weight: 900">+</span> Add User
        </button>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Roles Type</th>
              <th>Categories</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="/img/svg/ladki.svg" class="rounded-circle header-profile-user" />Robin Raji
              </td>
              <td>Sub-Admin</td>
              <td>
                <div class="td">
                  <span>Study Visa</span>
                  <span>Business Visa</span><span>Study Visa</span>
                  <span>Business Visa</span><span>Study Visa</span>
                  <span>Business Visa</span>
                </div>
              </td>
              <td>2023-12-28T00:00.000Z</td>
              <td>
                <div class="btn-group">
                  <span class="td-btn">
                    <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available;" />
                  </span>
                  <span class="td-btn">
                    <img src="/img/svg/trash.svg" alt="" />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/img/svg/ladki.svg" class="rounded-circle header-profile-user" />Robin Raji
              </td>
              <td>Sub-Admin</td>
              <td>
                <div class="td">
                  <span>Study Visa</span>
                  <span>Business Visa</span>
                </div>
              </td>
              <td>2023-12-28T00:00.000Z</td>
              <td>
                <div class="btn-group">
                  <span class="td-btn">
                    <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available;" />
                  </span>
                  <span class="td-btn">
                    <img src="/img/svg/trash.svg" alt="" />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/img/svg/ladki.svg" class="rounded-circle header-profile-user" />Robin Raji
              </td>
              <td>Sub-Admin</td>
              <td>
                <div class="td">
                  <span>Study Visa</span>
                  <span>Business Visa</span>
                </div>
              </td>
              <td>2023-12-28T00:00.000Z</td>
              <td>
                <div class="btn-group">
                  <span class="td-btn">
                    <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available;" />
                  </span>
                  <span class="td-btn">
                    <img src="/img/svg/trash.svg" alt="" />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/img/svg/ladki.svg" class="rounded-circle header-profile-user" />Robin Raji
              </td>
              <td>Sub-Admin</td>
              <td>
                <div class="td">
                  <span>Study Visa</span>
                  <span>Business Visa</span>
                </div>
              </td>
              <td>2023-12-28T00:00.000Z</td>
              <td>
                <div class="btn-group">
                  <span class="td-btn">
                    <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available;" />
                  </span>
                  <span class="td-btn">
                    <img src="/img/svg/trash.svg" alt="" />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/img/svg/ladki.svg" class="rounded-circle header-profile-user" />Robin Raji
              </td>
              <td>Sub-Admin</td>
              <td>
                <div class="td">
                  <span>Study Visa</span>
                  <span>Business Visa</span>
                </div>
              </td>
              <td>2023-12-28T00:00.000Z</td>
              <td>
                <div class="btn-group">
                  <span class="td-btn">
                    <img src="/img/svg/eye.svg" alt="" style="width: -webkit-fill-available;" />
                  </span>
                  <span class="td-btn">
                    <img src="/img/svg/trash.svg" alt="" />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    handleAddCustomRoleShow: {
      type: Function,
      required: true,
    },
    handleAddUserShow: {
      type: Function,
      required: true,
    },
  },
  methods: {},
};
</script>
<style scoped>
/* Importing styles */
@import url('./style.css');
</style>
