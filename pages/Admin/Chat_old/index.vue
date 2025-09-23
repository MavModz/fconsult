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
        <li v-for="user in users" :key="user.id" :class="{
          user: true,
          backgroundColor: activeUser && user.name === activeUser.name,
        }" @click="selectUser(user), handleShow()">
          <img :src="user.avatar" alt="avatar" />
          <div class="user-info">
            <h5 class="user-name">{{ user.name }}</h5>
            <p class="last-message">{{ user.lastMessage }}</p>
            <h6 :class="{
              'status-new-lead': user.status === 'New Lead',
              'status-requested': user.status === 'Request',
            }">
              {{ user.status }}
            </h6>
          </div>
          <span class="message-time">{{ user.lastMessageTime }}</span>
        </li>
      </ul>
    </aside>

    <section :class="{ 'chat-window': !isShowSidebar, 'display-block clone-window': isShowSidebar }">
      <header class="chat-header" v-if="activeUser">
        <span @click="handleShow()" class="back-btn"><img src="/img/svg/left.svg" alt="" /></span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <img :src="activeUser.avatar" alt="avatar" />
        <div class="user-info">
          <h5 class="user-name">{{ activeUser.name }}</h5>
          <p class="last-message">
            <span>{{ activeUser && activeUser.lastSeen === 'Online' ? '🟢' : '' }}</span>&nbsp;{{ activeUser.lastSeen
            }}&nbsp;&nbsp;
            <span :class="{
              'status-new-lead': activeUser.status === 'New Lead',
              'status-requested': activeUser.status === 'Request',
            }" style="font-size: 8px;">
              {{ activeUser.status }}
            </span>
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
          <!-- <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
  aria-expanded="false">
  Centered dropdown
</button> -->
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#"><img src="/img/svg/video-call.svg" alt="" />&nbsp;&nbsp; Video </a>
            </li>
            <li>
              <a class="dropdown-item" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                aria-controls="offcanvasExample">
                <img style="width: 24px;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample" src="/img/svg/media.svg" alt="" />&nbsp;&nbsp;Media
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div class="message-list" v-if="activeUser && activeUser.messages">
        <div class="message" v-for="message in activeUser.messages" :key="message.id"
          :class="{ outgoing: message.outgoing }">
          <div v-if="message.read && !isDateDisplayed(message.date)" class="chat-date-divider">
            {{ formatDate(message.date) }}
          </div>
          <div class="chat-date-divider" v-if="message.read">
            <div class="break-line"></div>
            <div class="dates">Sat, 18 2024</div>
            <div class="break-line"></div>
          </div>
          <!-- Check if the message is read -->

          <div class="message-content">{{ message.text }}<span>{{ message.time }}&nbsp;&nbsp;{{ message && message.read
            ? 'Read' : '' }}</span></div>
          <div v-if="message.image" class="message-image"><img :src="message.image" alt="Message Image" /><span>{{
            message.time }}&nbsp;&nbsp;{{ message && message.read ? 'Read' : '' }}</span></div>
        </div>
      </div>
      <footer :class="{ 'chat-footer': !isRecordVoice, 'd-none': isRecordVoice }">
        <div class="btn-group dropup">
          <button @click="sendMessage" type="button" class="dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img src="/img/svg/clip.svg" alt="" />
          </button>
          <!-- <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
  aria-expanded="false">
  Dropup
</button> -->
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
            <li @click="VoiceRecord(true)">
              <span><img src="/img/svg/voice.svg" alt="" /></span><span class="default">Voice</span>
            </li>
          </ul>
        </div>
        <input type="text" v-model="newMessage" placeholder="Type a message" @keyup.enter="sendMessage" />
        <span class="sent"><img src="/img/svg/sent.svg" alt="" /></span>
      </footer>
      <!-- voice -->
      <footer>
        <div :class="{ 'voice-recorder': isRecordVoice, 'd-none': !isRecordVoice }">
          <span v-if="!isRecording" @click="startRecording" class=""><img src="/img/svg/play.svg" alt="" /></span>

          <span v-else @click="stopRecording" class=""><img src="/img/svg/play.svg" alt="" /></span>
          <div class="audio-wave">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <span><img src="/img/svg/delete.svg" alt="" /></span>
          <span id="timer">00:10</span>
          <span @click="VoiceRecord(false)"><img src="/img/svg/sent.svg" alt="" /></span>
          <div v-if="isRecording" class="recording-status"></div>

          <audio v-if="audioUrl" :src="audioUrl" controls class="audio-preview"></audio>

          <button v-if="audioUrl" @click="uploadAudio" class="upload-btn">Upload</button>
        </div>
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

definePageMeta({
  layout: 'user',
  middleware: ['user'],


})

export default {
  data() {
    return {
      isRecordVoice: false,
      displayedDates: [],
      isShowSidebar: false,
      users: [
        {
          id: 1,
          name: 'Elmer Laverty',
          avatar:
            'https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg',
          lastMessage: 'Haha oh man 😂',
          lastMessageTime: '12m',
          messages: [
            {
              id: 101,
              text: 'Just saw your message, haha!',
              time: '15:30',
              outgoing: false,
              read: true,
            },
            {
              id: 102,
              text: 'Have you seen the latest episode?',
              time: '15:35',
              outgoing: true,
              read: true,
            },
            {
              id: 103,
              text: 'No spoilers please 😅',
              time: '15:40',
              outgoing: false,
              read: true,
            },
            {
              id: 104,
              text: 'Of course, let me know when you watch it',
              time: '15:45',
              outgoing: true,
              read: false,
            },
            {
              id: 105,
              text: 'Haha oh man 😂 lorem ipsuum doller sit Haha oh man 😂 lorem ipsuum doller sitHaha oh man 😂 lorem ipsuum doller sit',
              time: 16.46,
              image:
                'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg',
              outgoing: true,
            },
          ],
          lastSeen: '2h',
        },
        {
          id: 2,
          name: 'Florencio Dorrance',
          avatar:
            'https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg',
          lastMessage: 'woohoooo',
          lastMessageTime: '24m',
          status: 'New Lead',
          messages: [
            {
              id: 101,
              text: 'Hey there!',
              time: 16.46,
              image:
                'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg',
              outgoing: false,
            },
            { id: 102, text: 'woohoooo', time: 16.46, outgoing: true },
          ],
          lastSeen: '2h',
        },
        {
          id: 3,
          name: 'Lavern Laboy',
          avatar:
            'https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg',
          lastMessage: "Haha that's terrifying 😱",
          lastMessageTime: '1h',
          messages: [
            { id: 101, text: 'Hey there!', time: 16.46, outgoing: false },
            {
              id: 102,
              text: 'Haha oh man 😂',
              time: 16.46,
              read: true,
              outgoing: true,
            },
          ],
          lastSeen: 'Online',
        },
        {
          id: 4,
          name: 'Titus Kitamura',
          avatar:
            'https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg',
          lastMessage: 'omg, this is amazing',
          lastMessageTime: '5h',
          messages: [
            { id: 101, text: 'Hey there!', time: 16.46, outgoing: false },
            {
              id: 102,
              text: 'Haha oh man 😂',
              time: 16.46,
              read: true,
              outgoing: true,
            },
          ],
          lastSeen: '2h',
        },
        {
          id: 5,
          name: 'Geoffrey Mott',
          avatar:
            'https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg',
          lastMessage: 'aww 😍',
          lastMessageTime: '2d',
          status: 'Request',
          messages: [
            { id: 101, text: 'Hey there!', time: 16.46, outgoing: false },
            {
              id: 102,
              text: 'Haha oh man 😂',
              time: 16.46,
              read: true,
              outgoing: true,
            },
          ],
          lastSeen: '2h',
        },
        {
          id: 6,
          name: 'Alfonzo Schuessler',
          avatar:
            'https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg',
          lastMessage: 'perfect!',
          lastMessageTime: '1m',
          messages: [
            { id: 101, text: 'Hey there!', time: 16.46, outgoing: false },
            {
              id: 102,
              text: 'Haha oh man 😂',
              time: 16.46,
              read: true,
              outgoing: true,
            },
          ],
          lastSeen: 'Online',
        },
        {
          id: 7,
          name: 'Matthew Hayden',
          avatar:
            'https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg',
          lastMessage: 'The player!',
          lastMessageTime: '16m',
          messages: [
            { id: 101, text: 'Hey there!', time: 16.46, outgoing: false },
            {
              id: 102,
              text: 'The player!',
              time: 16.46,
              read: true,
              outgoing: true,
            },
          ],
          lastSeen: 'Online',
        },
      ],
      activeUser: null,
      newMessage: '',
    };
  },
  mounted() {
    activateMenu('chat', "Chats");

    // if (this.users.length > 0) {
    //   this.activeUser = this.users[0];
    // } else {
    //   // Handle the case where there are no users, e.g., set a default activeUser or fetch from an API
    // }

  },
  methods: {
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
    selectUser(user) {
      if (user && Array.isArray(user.messages)) {
        this.activeUser = user;
      } else {
        
        // Handle error appropriately, perhaps by initializing an empty messages array:
        // this.activeUser = { ...user, messages: [] };
      }
    },
    selectUser(user) {
      this.activeUser = user;
      // Consider resetting `newMessage` or any other state as needed
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const newMessageObj = {
          id: Date.now(),
          text: this.newMessage,
          outgoing: true,
        };
        // If activeUser has a messages array, push the new message; otherwise, initialize it
        if (Array.isArray(this.activeUser.messages)) {
          this.activeUser.messages.push(newMessageObj);
        } else {
          this.$set(this.activeUser, 'messages', [newMessageObj]);
        }
        this.newMessage = ''; // Clear the input field
        // TODO: Add logic to send the message to the backend
      }
    },
  },
}
</script>

<style scoped>
@import url("style.css");
</style>