<template>
  <div class="stacked-cards">
    <div v-for="(followup, index) in followups" :key="followup._id"
      :style="{ top: `${index * 15}px`, zIndex: followups.length - index }" class="card">
      <div class="card-header">
        <span>Call Reminder</span>
        <button @click="dismissCard(followup._id)">×</button>
      </div>
      <div class="card-body">
        <p>
          Your follow-up with <strong>{{ followup?.customer_id?.name }}</strong>
          is set for <strong>{{ getLocalTime(followup) }}</strong> with
          <strong>{{ followup.priority }}</strong> priority.
        </p>
        <button @click="viewProfile(followup?.customer_id?._id)" class="view-profile-btn">
          View Profile
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      followups: [],
    };
  },

  async mounted() {
    this.fetchFollowups();
  },

  methods: {
    async fetchFollowups() {
      try {
        const response = await adminPost(`/view-followup`);
        if (response && response.data && response.data.data) {
          this.followups = response.data.data;
          this.filterFollowups();
        } else {
          console.error('Failed to fetch followups');
        }
      } catch (error) {
        console.error('Error fetching followups:', error);
      }
    },

    async filterFollowups() {
      const now = new Date();

      // Create an array to store upcoming follow-ups
      const upcoming = [];

      // Iterate over each follow-up
      this.followups.forEach((item) => {
        const reminderDate = new Date(item.reminder_date);
        const [hours, minutes] = item.reminder_time.split(':').map(Number);
        reminderDate.setHours(hours, minutes, 0, 0);

        // Check if the reminder is in the future (upcoming)
        if (reminderDate >= now) {
          upcoming.push(item); // Only push upcoming follow-ups
        }
      });

      // Update the followups array to only include upcoming follow-ups
      this.followups = upcoming;
    },

    getLocalTime(followup) {
      const { reminder_date, reminder_time } = followup;
      const date = new Date(reminder_date);
      const [hours, minutes] = reminder_time.split(':').map(Number);
      date.setHours(hours, minutes, 0, 0);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    dismissCard(id) {
      this.followups = this.followups.filter(f => f._id !== id);
    },
    viewProfile(userId) {
      this.$router.push(`/admin/leads-new/lead-view/${userId}`);
    }
  }
};
</script>


<style scoped>
.stacked-cards {
  position: fixed;
  bottom: 30%;
  right: 6%;
  width: 300px;
  /* Optional: restricts the container width */
}

.card {
  position: absolute;
  /* Absolute positioning allows for overlap */
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border: none !important;
  padding: 16px;
  width: 400px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white !important;
  padding: 10px !important;
  border-bottom: none !important;
}

.card-body {
  padding: 10px;
}

.card-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.view-profile-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
