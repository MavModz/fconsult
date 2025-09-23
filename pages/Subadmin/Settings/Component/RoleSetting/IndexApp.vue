<template>
  <div class="main-RoleSetting-container">
    <div class="RoleSetting-container">
      <div class="RoleSetting-wrapper">
        <div class="RoleSetting-first">
          <h2>Role Setting</h2>
          <div class="RoleSetting-row1">
            <h3>Role Name</h3>
          </div>
          <input type="text" class="RoleSetting-input" placeholder="Hot Lead" />
          <div class="RoleSetting-color">
            <h2>Color Tag</h2>
            <div class="color-picker1">
              <div><input style="height: 32px; width: 32px;" type="color" :value="colorPicker.color"
                  @input="handleChangeColor('color', $event.target.value)" /></div>
            </div>
          </div>
          <div class="RoleSetting-button">
            <button>+Add Role</button>
          </div>
        </div>
        <div class="RoleSetting-line">
          <img src="" alt="line" />
        </div>
        <div class="RoleSetting-section3">
          <div class="RoleSetting-box">
            <div class="leadstatus-box-wrapper">
              <h3>Custom Roles</h3>
              <div class="RoleSetting-button-second">
                <button>2 custom role</button>
              </div>
            </div>
          </div>
          <div class="RoleSetting-row2">
            <div class="RoleSetting-row2-wrapper">
              <h2>Role Name</h2>
              <div class="RoleSetting-color-delete">
                <h2>
                  <div class="color-picker">
                    <input style="height: 32px; width: 32px;" type="color" :value="colorPicker.color"
                      @input="handleChangeColor('color', $event.target.value)" />
                    <span>{{ colorPicker.color }}</span>
                  </div>
                </h2>
                <img src="" alt="delete" class="delete-box" />
              </div>
            </div>
          </div>
          <div class="RoleSetting-row2">
            <div class="RoleSetting-row2-wrapper">
              <h2>Role Name</h2>
              <div class="RoleSetting-color-delete">
                <h2>
                  <div class="color-picker">
                    <input style="height: 32px; width: 32px;" type="color" :value="colorPicker.color"
                      @input="handleChangeColor('color', $event.target.value)" />
                    <span>{{ colorPicker.color }}</span>
                  </div>
                </h2>
                <img src="" alt="delete" class="delete-box" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleSetting',
  data() {
    return {
      colorPicker: {
        color: '#000000', // Set an initial color if needed
      },
    };
  },
  methods: {
    handleChangeColor(key, value) {
      this.colorPicker[key] = value;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
