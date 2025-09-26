<!-- @format -->

<template>
  <div class="languages">
    <!-- <div class="btn-container"> <span id="languages-heading">Hierarchy Management</span><span id="add-btn" @click="handleSubAdminShow(true)" >+ Add</span> </div> -->
    <div class="btn-container">
      <span id="languages-heading">Hierarchy Management</span>
      <span id="add-btn" @click="handleShowLeadStatus(true)">+ Add</span>
    </div>
    <div class="break-line"></div>
    <section>
      <div class="scroll-table d-flex">
        <div class="left-table">
          <table>
            <thead>
              <tr>
                <th class="team-name">Team Name</th>
                <th class="team-name">Sub - Admins</th>
                <th class="manager">Managers</th>
                <th class="executive">
                  <span>Executive</span>

                  <span><img src="/img/svg/red-plus.svg" alt="" /></span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="team-name">Rocket Team</td>
                <td class="team-name">Sub-Admin</td>
                <td class="manager">
                  <div class="td">
                    <span class="manager-td">Dishant </span
                    ><span class="manager-td">Ritik</span
                    ><span class="manager-td">+2</span>
                  </div>
                </td>
                <td class="executive">
                  <div class="td">
                    <span class="executive-td">Dishant </span
                    ><span class="executive-td">Ritik</span
                    ><span class="executive-td">+2</span>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <span
                      class="td-btn"
                      @click="handleEditHierarchyManagement(true)"
                      ><img
                        src="/img/svg/light-edit.svg"
                        alt=""
                        style="width: -webkit-fill-available" /></span
                    ><span class="td-btn"
                      ><img src="/img/svg/trash.svg" alt=""
                    /></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('style.css');
</style>
