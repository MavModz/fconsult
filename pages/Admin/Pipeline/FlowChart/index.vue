@format

<template>
  <div class="position-relative d-flex justify-content-between flex-column flex-wrap gap-3" style="height:95vh;">
    <div class="flow-screen">
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter5">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter6 }"></div>
          <div :class="{
            'flow-container': parameter5,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <!-- <div id="left" @click="handleShowParameter6()"><img src="/img/svg/circle.svg" alt=""><span
              class="left-icon">+</span>
          </div> -->
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter4">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter5 }"></div>
          <div :class="{
            'flow-container': parameter4,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter5()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter3">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter4 }"></div>
          <div :class="{
            'flow-container': parameter3,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter4()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter2">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter3 }"></div>
          <div :class="{
            'flow-container': parameter2,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter3()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter2 }"></div>
          <div :class="{
            'flow-container': parameter,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter2()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>

      <div class="flow-screen" :class="{ 'horizontal-screen': parameter }">
        <div class="flow-container" :class="{ 'vertical': lead }">
          <div id="left" @click="handleShowParameter()">
            <img src="/img/svg/circle.svg" alt="" />
            <span class="left-icon">+</span>
          </div>
          <button>Walkin</button>
          <div id="right" @click="handleShowAction()">
            <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
          </div><span v-show="lead" class="down-arrow-vertical"><img src="/img/svg/arrow-down.svg" alt="" /></span>
          <div @click="handleShowLead()" id="bottom" style="left:71px;"><img src="/img/svg/circle.svg" alt=""><span
              class="right-icon">+</span>
          </div>
          <div v-show="lead" class="lead">
            <div>Lead Status</div>
          </div>

        </div>
      </div>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="action" :class="{ 'horizontal-screen': action }">
          <div :class="{ 'flow-container': action, 'vertical-dashed': showAction, 'quantity-dashed': showAction }">
            <div id="left">
              <img src="/img/svg/arrow-right.svg"
                alt="" /><!-- &lt;span class=&quot;left-icon&quot;&gt;+&lt;/span&gt; -->
            </div>
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Action 01 <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <div id="bottom"><img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span></div>
            <div v-show="showAction" id="vertical-center"><img src="/img/svg/circle.svg" alt="" />
              <div class="quantity">
                <div id="left">
                  <img src="/img/svg/arrow-right.svg" alt="" />
                </div>
                <h5>Qunatatity</h5>
                <input type="number">
              </div>
            </div>
            <span v-show="showAction" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showAction" class="email">
              <div>
                {{ mail || 'Email' }}
              </div>
            </div>
            <div v-show="showAction" class="select-status">
              <div v-show="showAction" class="content">
                <div class="dark"></div>
                <h4>Send Mail</h4>
                <span @click="handleActionShow(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Mail Template</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-3">
                  <h4>Welcome Mail</h4>
                  <span class=""><img src="/img/svg/down.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="day d-flex justify-content-between align-items-center py-3">
                  <h5>Day</h5>
                  <input type="text" disabled value="1">
                </div>
                <div class="break-line"></div>
                <div class="Time d-flex justify-content-between align-items-center py-3">
                  <h5>Time</h5>
                  <div class="time-picker-container">
                    <input type="time" v-model="time" @input="onTimeChange">
                    <!-- <button @click="setTime">
                    <img src="/img/svg/clock.svg" alt="Set Time">
                  </button> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangemail('Send Email')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Send Email
                  </div>
                </li>
                <li @click="handleChangemail('Send SMS')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Send SMS
                  </div>
                </li>
                <li @click="handleChangemail('Send Whatsapp')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Send
                    Whatsapp
                  </div>
                </li>
                <li @click="handleChangemail('Send App Notification')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Send App
                    Notification
                  </div>
                </li>
              </ul>
            </div>
            <div id="right"><img src="/img/svg/circle.svg" alt="" /></div>
          </div>
        </div>
      </transition>

    </div>
    <div class="flow-screen " v-show="lead">
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter5">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter6 }"></div>
          <div :class="{
            'flow-container': parameter5,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <!-- <div id="left" @click="handleShowParameter6()"><img src="/img/svg/circle.svg" alt=""><span
              class="left-icon">+</span>
          </div> -->
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter4">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter5 }"></div>
          <div :class="{
            'flow-container': parameter4,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter5()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter3">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter4 }"></div>
          <div :class="{
            'flow-container': parameter3,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter4()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter2">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter3 }"></div>
          <div :class="{
            'flow-container': parameter2,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter3()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="parameter">
          <div class="d-flex" :class="{ 'horizontal-screen ': parameter2 }"></div>
          <div :class="{
            'flow-container': parameter,
            'vertical-dashed': showStatus,
          }">
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Set Status <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <!-- <div id="right"><img src="/img/svg/circle.svg" alt=""><span class="right-icon">+</span></div> -->
            <div id="left" @click="handleShowParameter2()"><img src="/img/svg/circle.svg" alt=""><span
                class="left-icon">+</span>
            </div>
            <div id="bottom">
              <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
            </div>
            <div id="right"><img src="/img/svg/arrow-left.svg" alt="" /></div>
            <span v-show="showStatus" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showStatus" class="status">
              <div>
                {{ status || 'Lead Status' }}
              </div>
            </div>
            <div v-show="showStatus" class="select-status">
              <div v-show="showStatus" class="content">
                <div class="dark"></div>
                <h4>Select Status</h4>
                <span @click="handleShowStatus(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Add {{ status || 'Add Lead Status' }}</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-2">
                  <!-- <h4>Lead Status</h4> <span class="  "><img src="/img/svg/down.svg" alt=""></span> -->
                  <div class="dropdown" @click="toggleDropdown" style="width: -webkit-fill-available">
                    <div class="dropdown-select">
                      <span>{{ selected || status || 'Select an option' }}</span>
                      <img src="/img/svg/down.svg" alt="Arrow down" />
                    </div>
                    <div class="dropdown-list" v-if="isOpen">
                      <div class="dropdown-list-item" v-for="option in options" :key="option"
                        @click.stop="selectItem(option)">
                        {{ option }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <<ul class="dropdown-menu">
                <li @click="handleChangeState('Lead Status')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Lead
                    Status
                  </div>
                </li>
                <li @click="handleChangeState('Lead Source')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Lead
                    Source
                  </div>
                </li>
                <li @click="handleChangeState('Lead Pipeline')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Pipeline
                  </div>
                </li>
                <li @click="handleChangeState('Lead Age')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead Age
                  </div>
                </li>
                <li @click="handleChangeState('Lead FollowUp')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    FollowUp
                  </div>
                </li>
                <li @click="handleChangeState('Lead Services')">
                  <div @click="handleShowStatus(true)" class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Lead
                    Services
                  </div>
                </li>
                </ul>
            </div>
          </div>
        </div>
      </transition>

      <div class="flow-screen" :class="{ 'horizontal-screen': parameter }">
        <div class="flow-container">
          <div id="left" @click="handleShowParameter()">
            <img src="/img/svg/circle.svg" alt="" />
            <span class="left-icon">+</span>
          </div>
          <button>Lead</button>
          <div id="right" @click="handleShowAction()">
            <img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span>
          </div>
          <!-- <span v-show="lead" class="down-arrow-vertical"><img src="/img/svg/arrow-down.svg" alt="" /></span> -->
          <!-- <div @click="handleShowLead()" id="bottom" style="left:71px;"><img src="/img/svg/circle.svg" alt=""><span
              class="right-icon">+</span>
          </div>
          <div v-show="lead" class="lead">
            <div>Lead Status</div>
          </div> -->
        </div>
      </div>
      <transition name="slide-fade">
        <div class="flow-screen" v-if="action" :class="{ 'horizontal-screen': action }">
          <div :class="{ 'flow-container': action, 'vertical-dashed': showAction, 'quantity-dashed': showAction }">
            <div id="left">
              <img src="/img/svg/arrow-right.svg"
                alt="" /><!-- &lt;span class=&quot;left-icon&quot;&gt;+&lt;/span&gt; -->
            </div>
            <button class="greenish" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Action 01 <img src="/img/svg/arrow.svg" alt="" />
            </button>
            <div id="bottom"><img src="/img/svg/circle.svg" alt="" /><span class="right-icon">+</span></div>
            <div v-show="showAction" id="vertical-center"><img src="/img/svg/circle.svg" alt="" />
              <div class="quantity">
                <div id="left">
                  <img src="/img/svg/arrow-right.svg" alt="" />
                </div>
                <h5>Qunatatity</h5>
                <input type="number">
              </div>
            </div>
            <span v-show="showAction" class="down-arrow"><img src="/img/svg/arrow-down.svg" alt="" /></span>
            <div v-show="showAction" class="email">
              <div>
                {{ mail || 'Email' }}
              </div>
            </div>
            <div v-show="showAction" class="select-status">
              <div v-show="showAction" class="content">
                <div class="dark"></div>
                <h4>Send Mail</h4>
                <span @click="handleActionShow(false)"><img src="/img/svg/close.svg" alt="" /></span>
              </div>
              <div class="details">
                <div class="d-flex justify-content-between align-items-center py-2">
                  <h5>Mail Template</h5>
                  <span><img src="/img/svg/cameras.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="d-flex justify-content-between align-items-center py-3">
                  <h4>Welcome Mail</h4>
                  <span class=""><img src="/img/svg/down.svg" alt="" /></span>
                </div>
                <div class="break-line"></div>
                <div class="day d-flex justify-content-between align-items-center py-3">
                  <h5>Day</h5>
                  <input type="text" disabled value="1">
                </div>
                <div class="break-line"></div>
                <div class="Time d-flex justify-content-between align-items-center py-3">
                  <h5>Time</h5>
                  <div class="time-picker-container">
                    <input type="time" v-model="time" @input="onTimeChange">
                    <!-- <button @click="setTime">
                    <img src="/img/svg/clock.svg" alt="Set Time">
                  </button> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li @click="handleChangemail('Send Email')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/eyes.svg" alt="" />&nbsp;&nbsp;Send Email
                  </div>
                </li>
                <li @click="handleChangemail('Send SMS')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/edits.svg" alt="" />&nbsp;&nbsp;Send SMS
                  </div>
                </li>
                <li @click="handleChangemail('Send Whatsapp')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Send
                    Whatsapp
                  </div>
                </li>
                <li @click="handleChangemail('Send App Notification')">
                  <div class="dropdown-item" href="#">
                    <img src="/img/svg/on.svg" alt="" />&nbsp;&nbsp;Send App
                    Notification
                  </div>
                </li>
              </ul>
            </div>
            <div id="right"><img src="/img/svg/circle.svg" alt="" /></div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
export default {
  data() {
    return {
      time: this.formatTime(new Date()),
      status: '',

      mail: '',
      isOpen: false,
      selected: '',
      options: ['Option 1', 'Option 2', 'Option 3'],
      parameter: false,
      parameter2: false,
      parameter3: false,
      parameter4: false,
      parameter5: false,
      parameter6: false,
      action: false,
      showStatus: false,
      showAction: false,
      lead: false
    };
  },
  mounted() {
  
  },
  methods: {
    formatTime(date) {
      // Format a Date object to an 'HH:MM' string
      let hours = date.getHours();
      let minutes = date.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minutes}`;
    },
    onTimeChange(event) {
      // Handle the time change event if you need to do something when time changes
    },
    setTime() {
      // Method to set the time, e.g., to now or a default value
      this.time = this.formatTime(new Date()); // Set to current time
    },
    handleChangeState(status) {
      this.status = status;
      this.showStatus = true;
    },
    handleChangemail(mail) {
      this.mail = mail;
      this.showAction = true;
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      this.selected = item;
      this.isOpen = false;
    },
    handleShowParameter() {
      this.parameter = !this.parameter;
    }, handleShowParameter2() {
      this.parameter2 = !this.parameter2;
    }, handleShowParameter3() {
      this.parameter3 = !this.parameter3;
    }, handleShowParameter4() {
      this.parameter4 = !this.parameter4;
    }, handleShowParameter5() {
      this.parameter5 = !this.parameter5;
    }, handleShowParameter6() {
      this.parameter6 = !this.parameter6;
    }, handleShowLead() {
      this.lead = !this.lead;
    },
    handleShowAction() {
      this.action = !this.action;
    },
    handleShowStatus(type) {
      this.showStatus = type;
    },

    handleActionShow(type) {
      this.showAction = type;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
