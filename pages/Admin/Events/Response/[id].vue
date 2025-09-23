<template>
  <div class="event-response-screen">
    <div class="event-res-wrapper">
      <div class="resp-mrg">
        <h2>Event Response</h2>
      </div>
      <div class="response-table">
        <table id="event-resp-idd" class="table">
          <thead>
            <tr>
              <!-- <th class="resp-tble"><input type="checkbox" v-model="selectAll" @change="toggleSelectAll"></th> -->
              <th class="resp-tble" scope="col">Name</th>
              <th class="resp-tble" scope="col">Date</th>
              <th class="resp-tble" scope="col">Email address</th>
              <th class="resp-tble" scope="col">Phone number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in alltable" :key="index">
              <!-- <td class="resp-tble"><input type="checkbox" v-model="item.selected" @change="toggleRowSelection"></td> -->
              <td class="resp-tble">{{ item.name }}</td>
              <td class="resp-tble">{{ item.created_at.split("T")[0] }}</td>
              <td class="resp-tble">{{ item.email }}</td>
              <td class="resp-tble">{{ item.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="design-pagn">
        <div class="downld-csv">
          <button class="your-events-btn" @click="downloadCSV">
            <span class="your-event-addsign"><i class="bi bi-filetype-csv"></i></span>
            <span class="your-event-add-newevent">Download As.CSV</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
  name: 'ResponseEvents',
  data() {
    return {
      alltable: [],
      selectAll: false,
      current_id: null,
    }
  },

  async mounted() {
    activateMenu('events', "Event Responses");
    this.loading = true
    this.current_id = this.$route.params.id;
    await this.respTable()
    this.loading = false
  },

  methods: {
    async respTable() {
      await adminGet(`/event-response/${this.current_id}`).then(response => {
        this.alltable = response.data.response
      })
    },
    toggleSelectAll() {
      for (const item of this.alltable) {
        item.selected = this.selectAll;
      }
    },
    toggleRowSelection() {
      this.selectAll = this.alltable.every(item => item.selected)
    },
    downloadCSV() {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += ["Name", "Date", "Email address", "Phone number"].join(",") + "\r\n";
      
      this.alltable.forEach(item => {
        let row = [
          item.name,
          item.created_at.split("T")[0],
          item.email,
          item.phone
        ];
        csvContent += row.join(",") + "\r\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "event_responses.csv");
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>
@import url('./style.css');
</style>
