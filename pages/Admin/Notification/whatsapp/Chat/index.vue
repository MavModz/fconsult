<template>
  <div class="chat-app-container">
    <aside :class="{ sidebar: isShowSidebar, 'display-block clone-sidebar': !isShowSidebar }">
      <header class="sidebar-header">
        <h3>Live Chat &nbsp;<span>{{ profiles.length }}</span></h3>
        <!-- <input type="text" placeholder="Search messages" /> -->
      </header>
      <div class="tab-search">
        <div class="tab">
          <span :class="['tab-active', { selected: selectedTab === 'active' }]" @click="selectedTab = 'active'">Active
            <b>({{ activeCount }})</b></span>
          <span :class="['tab-active', { selected: selectedTab === 'requested' }]"
            @click="selectedTab = 'requested'">Requested <b>({{ requestedCount }})</b></span>
          <span :class="['tab-dashed', { selected: selectedTab === 'intervened' }]"
            @click="selectedTab = 'intervened'">Intervened <b>({{ intervenedCount }})</b></span>
        </div>
        <div class="search d-flex justify-content-center">
          <input type="text" v-model="searchQuery" placeholder="Search messages" />
        </div>
      </div>
      <ul class="user-list">
        <li v-for="user in filteredProfiles" :key="user._id" class="user activeUser"
          @click="selectUser(user), handleShow()">
          <img :src="getProfileImage(user, false)" alt="avatar" class="profile-image"
            style="width:32px;height:32px;border-radius:50%;object-fit:cover;margin-right:10px;" />
          <div class="user-info">
            <h5 class="user-name">
              {{ user.contactName }}
              <span v-if="unreadCounts[String(user.waId).trim()] > 0" class="unread-badge">{{
                unreadCounts[String(user.waId).trim()] }}</span>
            </h5>
            <p class="last-message">{{ user.content || 'No messages yet' }}</p>
            <span :class="['message-status display-1', user.chat_type === 'active' ? 'active' : 'requested']">{{
              user.chat_type }}</span>
          </div>
          <span class="message-time">{{ formatRelativeTime(user.timestamp) }}</span>
        </li>
      </ul>
    </aside>

    <section class="chat-window display-block clone-window" v-if="activeUser">
      <header class="chat-header">
        <span @click="handleShow()" class="back-btn"><img src="/img/svg/left.svg" alt="" /></span>
        <img :src="getProfileImage(activeUser, false)" alt="avatar" class="profile-image"
          style="width:40px;height:40px;border-radius:50%;object-fit:cover;margin-right:10px;" />
        <div class="user-info">
          <h5 class="user-name">{{ activeUser.contactName }}</h5>
          <p class="last-message">
            <span class="active-status-notifier"></span>
            <span class="active-user-contact">{{ activeUser.waId }}</span>
          </p>
        </div>
        <div class="calling-container">
          <!-- <button class="video-call-button"><img src="/img/svg/video-call.svg" alt="" />Video Call</button> -->
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


      <div class="message-list-wrapper">
        <div class="message-list">
        <div v-for="(message, index) in messages" :key="message._id">

          <div class="message outgoing" v-if="message.direction === 'outgoing'">
            <div class="message-content">{{ message.content }}<span>{{ formatMessageTime(message.timestamp)
            }}&nbsp;&nbsp;{{ getMessageStatus(message.status) }}</span></div>
          </div>

          <div v-else class="message">
            <div class="message-content">{{ message.content }}<span>{{ formatMessageTime(message.timestamp)
            }}&nbsp;&nbsp;{{ getMessageStatus(message.status) }}</span></div>
          </div>

        </div>
      </div>
      </div>



      <footer :class="{ 'chat-footer': !isRecordVoice, 'd-none': isRecordVoice }">
        <div class="btn-group dropup">
          <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
        <span class="sent" @click="sendMessage"><img src="/img/svg/sent.svg" alt="" /></span>
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
import { useNuxtApp } from 'nuxt/app';

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

export default {
  data() {
    return {
      isRecordVoice: false,
      displayedDates: [],
      isShowSidebar: false,
      profiles: [],
      activeUser: null,
      messages: [],
      newMessage: '',
      selectedTab: 'active',
      searchQuery: '',
      ws: null, // WebSocket connection
      unreadCounts: {}, // { [waId]: count }
    };
  },
  mounted() {
    activateSubmenu('w1', 'WhatsApp Chats');
    this.InitChatProfiles();
    this.initWebSocket();
  },
  beforeUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  },
  async setup() {
    const me = (await useFetch('/api/users/admin')).data.value;
    return { me: me.user };
  },
  methods: {
    async InitChatProfiles() {
      this.loading = true;

      try {
        const response = await userGet(`/user-whatsapp-chats`);
        if (response.status && response.data?.data) {
          const rawMessages = response.data.data;

          // Debug: Log all waIds in the raw response
          console.log('Raw waIds:', rawMessages.map(m => String(m.waId).trim()));

          // Group messages by waId and pick the latest per user
          const grouped = {};

          rawMessages.forEach(msg => {

            if(msg.status === 'failed') {
              return;
            }

            const waId = String(msg.waId).trim(); // normalize waId

            if (!grouped[waId]) {
              grouped[waId] = { ...msg }; // initialize with current message
            }

            // If this message is newer, update base message but preserve contactName
            if (new Date(msg.timestamp) > new Date(grouped[waId].timestamp)) {
              const preservedName = grouped[waId].contactName;
              grouped[waId] = { ...msg };

              // Restore known contact name if it's lost in the newer message
              if (
                (!grouped[waId].contactName || grouped[waId].contactName === 'Unknown') &&
                preservedName &&
                preservedName !== 'Unknown'
              ) {
                grouped[waId].contactName = preservedName;
              }
            }

            // If this message has a better contact name, store it
            if (
              msg.contactName &&
              msg.contactName !== 'Unknown' &&
              (!grouped[waId].contactName || grouped[waId].contactName === 'Unknown')
            ) {
              grouped[waId].contactName = msg.contactName;
            }
          });

          // Set only unique profiles
          this.profiles = Object.values(grouped);
          // Ensure unreadCounts is initialized with reactive keys
          this.profiles.forEach(profile => {
            const waId = String(profile.waId).trim();
            if (!(waId in this.unreadCounts)) {
              this.$set
                ? this.$set(this.unreadCounts, waId, 0) // Vue 2 fallback
                : this.unreadCounts[waId] = 0; // Vue 3 auto-reactive for declared keys
            }
          });

        }
      } catch (err) {
        console.error('Failed to load chat profiles:', err);
      }

      this.loading = false;
    },


    // async InitChatProfiles() {
    //   this.loading = true
    //   await userGet(`/subadmin-chats`).then((response) => {
    //     if (response.status) { this.profiles = response.data.data }
    //   })
    //   this.loading = false
    // },

    selectUser(user) {
      const cleanWaId = this.getRealWaId(user); // ✅ use direction-based logic

      this.activeUser = {
        ...user,
        waId: cleanWaId // 🔥 ensure it's the user's actual WhatsApp ID
      };

      this.loadMessagesForUser(cleanWaId);
      this.unreadCounts[cleanWaId] = 0;
    },

    async loadMessagesForUser(waId) {
      try {
        const response = await userGet(`/user-whatsapp-chats`);
        if (response.status && response.data?.data) {
          // Filter messages for the selected user
          const userMessages = response.data.data.filter(msg => msg.waId === waId);

          // Sort messages by timestamp (oldest first)
          this.messages = userMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

          // Scroll to bottom after messages are loaded
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      } catch (err) {
        console.error('Failed to load messages for user:', err);
      }
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
        read: false,
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

    async sendMessage() {
      if (this.newMessage.trim() === '') return;

      const waId = String(this.activeUser.waId || '').trim(); // ✅ absolute guard

      if (!waId) {
        errorAlert('Recipient number is missing.');
        return;
      }

      const messagePayload = {
        to: waId,
        type: 'text',
        body: this.newMessage
      };

      try {
        const response = await adminPost('/send-whatsapp-message', messagePayload);

        if (response.status) {
          const newMessage = {
            _id: Date.now().toString(),
            waId,
            from: this.me.uid,
            to: waId,
            contactName: this.activeUser.contactName,
            direction: 'outgoing',
            type: 'text',
            content: this.newMessage,
            messageId: `temp_${Date.now()}`,
            timestamp: new Date().toISOString(),
            status: 'sent'
          };

          this.messages.push(newMessage);
          this.newMessage = '';
          this.$nextTick(() => {
            this.scrollToBottom();
          });

          // force profile to active
          const profile = this.profiles.find(p => String(p.waId).trim() === waId);
          if (profile && profile.chat_type !== 'active') {
            profile.chat_type = 'active';
            if (this.selectedTab === 'requested') {
              this.selectedTab = 'active';
            }
          }

        } else {
          errorAlert(response.msg || 'Failed to send message');
        }
      } catch (error) {
        errorAlert(error.message || 'Failed to send message');
      }
    },


    scrollToBottom() {
      const messageList = document.querySelector('.message-list');
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    },

    formatMessageTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    getMessageStatus(status) {
      switch (status) {
        case 'sent':
          return 'Sent';
        case 'delivered':
          return 'Delivered';
        case 'read':
          return 'Read';
        case 'received':
          return 'Received';
        default:
          return 'Sent';
      }
    },

    formatRelativeTime(timestamp) {
      if (!timestamp) return '';

      const now = new Date();
      const messageTime = new Date(timestamp);
      const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));

      if (diffInMinutes < 1) return 'now';
      if (diffInMinutes < 60) return `${diffInMinutes}m`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h`;

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}d`;

      return messageTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },

    getProfileImage(user, isAdmin) {
      if (isAdmin) {
        return '/favicon.png';
      }
      // If user has a profile_image property, use it, else use default
      if (user && user.profile_image) {
        return user.profile_image;
      }
      // Default user image
      return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    },

    initWebSocket() {
      // Use admin userId from this.me.uid
      // const userId = this.me && this.me.user.company_id ? this.me.user.company_id : 'admin';
      const userId = this.me ? encodeURIComponent(this.me.user.email) : 'admin';
      console.log("userid: ", userId)
      const wsUrl = `wss://api.findandconsult.com?userId=${userId}`; // Change port if needed

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'whatsapp_new_message') {
            const newMsg = data.message;
            const waId = this.getRealWaId(newMsg);

            const existingIndex = this.profiles.findIndex(p => String(p.waId).trim() === waId);

            if (existingIndex !== -1) {
              const profile = this.profiles[existingIndex];
              profile.timestamp = newMsg.timestamp;
              profile.content = newMsg.content;

              if (newMsg.chat_type && profile.chat_type !== newMsg.chat_type) {
                profile.chat_type = newMsg.chat_type;
              }

              // Update profile reactively
              this.profiles.splice(existingIndex, 1, { ...profile });
            } else {
              // Create new profile
              const newProfile = {
                waId,
                contactName: newMsg.contactName || waId,
                content: newMsg.content,
                chat_type: newMsg.chat_type || 'requested',
                timestamp: newMsg.timestamp,
                profile_image: null,
              };

              this.profiles.push(newProfile);
            }

            const currentActiveWaId = this.activeUser ? String(this.activeUser.waId).trim() : null;
            const isActiveChat = currentActiveWaId === waId;

            if (isActiveChat) {
              console.log('[WS] Incoming message:', {
                _id: newMsg._id,
                messageId: newMsg.messageId,
                timestamp: newMsg.timestamp,
                content: newMsg.content,
                direction: newMsg.direction
              });
              console.log('[WS] Current messages:', this.messages.map(m => ({
                _id: m._id,
                messageId: m.messageId,
                timestamp: m.timestamp,
                content: m.content,
                direction: m.direction
              })));

              const alreadyExists = this.messages.some(
                m =>
                  (m.messageId && newMsg.messageId && m.messageId === newMsg.messageId) ||
                  (m._id && newMsg._id && m._id === newMsg._id) ||
                  (
                    m.timestamp === newMsg.timestamp &&
                    m.content === newMsg.content &&
                    m.direction === newMsg.direction
                  )
              );

              console.log('[WS] alreadyExists:', alreadyExists);

              if (!alreadyExists) {
                this.messages = [...this.messages, newMsg]; // Ensure reactivity
                this.$nextTick(this.scrollToBottom);
                console.log('[WS] Message added. New messages:', this.messages.map(m => ({
                  _id: m._id,
                  messageId: m.messageId,
                  timestamp: m.timestamp,
                  content: m.content,
                  direction: m.direction
                })));
              }

              this.unreadCounts[waId] = 0;
            } else {
              this.unreadCounts[waId] = (this.unreadCounts[waId] || 0) + 1;
            }

            // Update activeUser.chat_type if necessary
            if (isActiveChat && this.activeUser.chat_type !== newMsg.chat_type) {
              this.activeUser.chat_type = newMsg.chat_type;
            }

            this.profiles.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          }

        } catch (err) {
          console.error('WebSocket message error:', err);
        }
      };



      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        // Optionally, try to reconnect after a delay
        setTimeout(this.initWebSocket, 5000);
      };
    },

    getRealWaId(message) {
      if (!message) return '';
      if (message.direction === 'incoming') {
        return String(message.from || '').trim();
      } else if (message.direction === 'outgoing') {
        return String(message.to || '').trim();
      }
      return String(message.waId || '').trim();
    },

  },
  computed: {
    activeCount() {
      return this.profiles.filter(p => p.chat_type === 'active').length;
    },
    requestedCount() {
      return this.profiles.filter(p => p.chat_type === 'requested').length;
    },
    intervenedCount() {
      return this.profiles.filter(p => p.chat_type === 'intervened').length;
    },
    filteredProfiles() {
      return this.profiles
        .filter(p => p.chat_type === this.selectedTab)
        .filter(p =>
          !this.searchQuery ||
          (p.contactName && p.contactName.toLowerCase().includes(this.searchQuery.toLowerCase()))
        )
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // newest first
    },
  },
}
</script>

<style scoped>
@import url("style.css");

.unread-badge {
  background: #e74c3c;
  color: #fff;
  border-radius: 10px;
  padding: 2px 7px;
  font-size: 12px;
  margin-left: 6px;
}
</style>