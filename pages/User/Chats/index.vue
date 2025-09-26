<template>
  <div class="chat-app-container">
    <aside :class="{ sidebar: isShowSidebar, 'display-block clone-sidebar': !isShowSidebar }">
      <header class="sidebar-header">
        <h3>Messages &nbsp;<span>12</span></h3>
        <!-- <input type="text" placeholder="Search messages" /> -->
      </header>
      <div class="tab-search">
        <div class="tab">
          <span class="tab-active">User</span>
          <span class="tab-deactive">Team</span>
          <span class="tab-dashed">New</span>
        </div>
        <div class="search d-flex justify-content-center">
          <input type="text" placeholder="Search messages" />
        </div>
      </div>
      <ul class="user-list">
        <li v-for="user in profiles" :key="user?.id" class="user activeUser" @click="selectUser(user), handleShow()">
          <img :src="user?.receiver_id?.profile_image" alt="avatar" />
          <div class="user-info">
            <h5 class="user-name">{{ user?.receiver_id?.name }}</h5>
            <p class="last-message">Last Message</p>
            <span class="status-requested display-1">Active</span>
          </div>
          <span class="message-time">10 m</span>
        </li>
      </ul>
    </aside>

    <section class="chat-window display-block clone-window" v-if="activeUser">
      <header class="chat-header">
        <span @click="handleShow()" class="back-btn"><img src="/img/svg/left.svg" alt="" /></span>
        <img :src="activeUser?.receiver_id?.profile_image" alt="avatar" />
        <div class="user-info">
          <h5 class="user-name">{{ activeUser?.receiver_id?.name }}</h5>
          <p class="last-message">
            <span>🟢</span>
          </p>
        </div>
        <div class="calling-container">
          <button class="video-call-button"><img src="/img/svg/video-call.svg" alt="" />Video Call</button>
          <span data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <img type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample" src="/img/svg/media.svg" alt="" />
          </span>
        </div>
        <div class="dropdown-center">
          <span class="menu-hide" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/img/svg/menu-hide.svg" alt="" />
          </span>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#"><img src="/img/svg/video-call.svg"
                  alt="" />&nbsp;&nbsp; Video </a>
            </li>
            <li>
              <a class="dropdown-item" data-bs-toggle="offcanvas" href="#offcanvasExample"
                role="button" aria-controls="offcanvasExample">
                <img style="width: 24px;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample" src="/img/svg/media.svg" alt="" />&nbsp;&nbsp;Media
              </a>
            </li>
          </ul>
        </div>
      </header>


      <div class="message-list">
        <div v-for="(i,index) in messages">

          <div class="message outgoing" v-if="i.side==me._id">
            <div class="message-content">{{i.msg}}<span>{{i.time}}&nbsp;&nbsp;Read</span></div>
          </div>

          <div v-else class="message" >
            <div class="message-content">{{ i.msg }}<span>{{i.time}}&nbsp;&nbsp;Read</span></div>
          </div>
          
        </div>
      </div>



      <footer :class="{ 'chat-footer': !isRecordVoice, 'd-none': isRecordVoice }">
        <div class="btn-group dropup">
          <button @click="sendMessage" type="button" class="dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img src="/img/svg/clip.svg" alt="" />
          </button>
          <ul class="dropdown-menu">
            <li>
              <span><img src="/img/svg/document.svg" alt="" /></span><span class="default">Document</span>
            </li>
            <li>
              <span><img src="/img/svg/pics.svg" alt="" /></span><span class="default">Photo</span>
            </li>
            <li>
              <span><img src="/img/svg/recording.svg" alt="" /></span><span class="default">Video</span>
            </li>
            <li>
              <span><img src="/img/svg/voice.svg" alt="" /></span><span class="default">Voice</span>
            </li>
          </ul>
        </div>
        <input type="text" v-model="newMessage" placeholder="Type a message" @keyup.enter="sendMessage" />
        <span class="sent"><img src="/img/svg/sent.svg" alt="" /></span>
      </footer>


      <!--voice  -->
    </section>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Media</h5>
        <span type="button" data-bs-dismiss="offcanvas" aria-label="Close"><img src="/img/svg/red-close.svg"
            alt="" /></span>
      </div>
      <div class="double-break-line"></div>
      <div class="offcanvas-body">
        <h5>
          <span id="files">Files</span>
          <span id="length">125</span>
        </h5>
        <div class="various-files">
          <div class="left-side">
            <div class="pdf">
              <img src="/img/svg/pdf.svg" alt="" />
            </div>
            <div class="details">
              <h4>i9.pdf</h4>
              <span>PDF 9mb</span>
            </div>
          </div>
          <span><img src="/img/svg/download.svg" alt="" /></span>
        </div>
        <div class="various-files">
          <div class="left-side">
            <div class="xxl">
              <img src="/img/svg/xxl.svg" alt="" />
            </div>
            <div class="details">
              <h4>i9.xxl</h4>
              <span>XXL 9mb</span>
            </div>
          </div>
          <span><img src="/img/svg/download.svg" alt="" /></span>
        </div>
        <div class="various-files">
          <div class="left-side">
            <div class="photo">
              <img src="/img/svg/photo.svg" alt="" />
            </div>
            <div class="details">
              <h4>i9.png</h4>
              <span>PNG 9mb</span>
            </div>
          </div>
          <span><img src="/img/svg/download.svg" alt="" /></span>
        </div>
        <div class="various-files">
          <div class="left-side">
            <div class="doc">
              <img src="/img/svg/doc.svg" alt="" />
            </div>
            <div class="details">
              <h4>sharefile.docx</h4>
              <span>DOC 9mb</span>
            </div>
          </div>
          <span><img src="/img/svg/download.svg" alt="" /></span>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { ref, push, set, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database'
import { useNuxtApp } from 'nuxt/app';

definePageMeta({
    layout: 'user',
        middleware: ['user'],


})

export default {
  data() {
    return {
      me:useNuxtApp().user,
      isRecordVoice: false,
      displayedDates: [],
      isShowSidebar: false,
      profiles: null,
      activeUser: null,
      messages: [],
      newMessage: ''
    };
  },
  mounted() {
    activateMenu('chat', "Chats");
    this.InitChatProfiles()


  },
  methods: {
    async InitChatProfiles() {
      this.loading = true
      await userGet(`/user-chats`).then((response) => {
        if (response.status) { this.profiles = response.data.data }
      })
      this.loading = false
    },

    selectUser(user) {
      this.activeUser = user;

      const database = this.$database
      const messagesRef = ref(database, `chat/${this.activeUser?.chat_id}/chats`)


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

    VoiceRecord(type) {
      this.isRecordVoice = type
    },
    handleShow() {
      this.isShowSidebar = !this.isShowSidebar;
    },
    formatDate(date) {
      // Format the date as needed. For example:
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        read:false,
      });
    },
    isDateDisplayed(date) {
      const formattedDate = this.formatDate(date);
      if (this.displayedDates.includes(formattedDate)) {
        return true;
      } else {
        // Record that the date has been displayed
        this.displayedDates.push(formattedDate);
        return false;
      }
    },

    sendMessage() {
      if (this.newMessage.trim() === '') return

      const database = this.$database
      const messagesRef = ref(database, `chat/${this.activeUser?.chat_id}/chats`)

      const newMessageRef = push(messagesRef)

      set(newMessageRef, {
        msg: this.newMessage,
        name: this.me.name,
        side: this.me._id,
        time: new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'})
      }).then(() => {
        this.newMessage = null
      }).catch((error) => {
        
      })
    },


  },
}
</script>

<style scoped>
@import url("style.css");
</style>