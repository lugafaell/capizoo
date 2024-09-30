<template>
  <div class="home-view">
    <header class="mobile-header">
      <img
        src="@/assets/logo_capizoo.png"
        alt="Capizoo Logo"
        class="mobile-logo"
      />
    </header>

    <aside
      class="sidebar"
      :class="{
        'sidebar-open': isSidebarOpen,
        'sidebar-closed': !isSidebarOpen,
      }"
    >
      <div class="sidebar-toggle" @click="toggleSidebar">
        <i :class="isSidebarOpen ? 'fas fa-times' : 'fas fa-chevron-right'"></i>
      </div>
      <div v-if="!isSidebarOpen" class="sidebar-closed-content">
        <img
          src="@/assets/logo_capizoo.png"
          alt="Capizoo Logo"
          class="site-logo-small"
        />
      </div>
      <div v-else class="sidebar-content">
        <div class="sidebar-top">
          <div class="site-title">
            <img
              src="@/assets/Sem título-Photoroom.png"
              alt="Capizoo Logo"
              class="site-logo"
            />
          </div>

          <button class="add-record-button" @click="showModal = true">
            <i class="fas fa-add"></i> Add Novo Registro
          </button>

          <ul class="menu-list">
            <li @click="setFilter('all')">Todos os Registro</li>
            <li @click="setFilter('today')">Registros do Dia</li>
          </ul>
        </div>

        <div class="user-info">
          <div class="user-avatar">
            <div class="avatar">{{ userInitials }}</div>
            <p>Welcome, {{ username }}</p>
          </div>
          <button class="logout-button" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </aside>

    <div
      class="records-list"
      :class="{ 'records-list-expanded': !isSidebarOpen }"
    >
      <header class="header">
        <div class="search-container">
          <select v-model="searchField" class="search-field-select">
            <option disabled>Filtro</option>
            <option value="animalName">Nome</option>
            <option value="animalSpecies">Espécie</option>
            <option value="animalAge">Idade</option>
            <option value="animalWeight">Peso</option>
            <option value="animalHealth">Saúde</option>
            <option value="animalHabitat">Habitat</option>
            <option value="animalBehavior">Comportamento</option>
            <option value="animalDiet">Dieta</option>
            <option value="observations">Observações</option>
            <option value="modificationDate">Data de Modificação</option>
          </select>
          <input
            v-model="searchQuery"
            class="search-bar"
            type="search"
            placeholder="Pesquisar..."
          />
        </div>
      </header>
      <div class="records">
        <RecordCard
          v-for="(record, index) in filteredRecords"
          :key="record.id"
          :id="record.id"
          :animalName="record.animalName"
          :animalSpecies="record.animalSpecies"
          :animalHabitat="record.animalHabitat"
          :observations="record.observations"
          :modificationDate="record.modificationDate"
          :index="index"
          @delete-records="removeRecord"
          @click="openUpdateRecordModal(record)"
        />
      </div>
    </div>
  </div>

  <AddRecordModal
    :isVisible="showModal"
    @close="showModal = false"
    @add-record="addRecord"
  />

  <UpdateRecordModal
    :isVisible="showUpdateModal"
    :animal="selectedRecord"
    @close="closeUpdateRecordModal"
    @update="handleUpdate"
  />
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import AddRecordModal from "../components/addRecordModal/AddRecordModal.vue";
import RecordCard from "../components/Record Card/RecordCard.vue";
import UpdateRecordModal from "../components/UpdateRecordModal/UpdateRecordModal.vue";

export default {
  components: {
    AddRecordModal,
    RecordCard,
    UpdateRecordModal,
  },
  data() {
    return {
      records: [],
      searchQuery: "",
      searchField: "Filtro",
      username: "",
      userInitials: "",
      showModal: false,
      showUpdateModal: false,
      selectedRecord: null,
      isSidebarOpen: true,
      allRecords: [],
      filterType: "all",
    };
  },
  computed: {
    filteredRecords() {
      let filtered = this.records;

      if (this.filterType === "today") {
        const today = new Date().toLocaleDateString("pt-BR");
        filtered = filtered.filter((record) => {
          const recordDate = record.modificationDate.split(" ")[0];
          return recordDate === today;
        });
      }

      if (this.searchQuery && this.searchField !== "Selecione o Filtro") {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((record) =>
          record[this.searchField]?.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
  },
  mounted() {
    this.fetchRecords();
  },
  methods: {
    getUserInitials(name) {
      const names = name.split(" ");
      if (names.length === 1) return names[0][0].toUpperCase();
      return (
        names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase()
      );
    },
    getFirstName(name) {
      return name.split(" ")[0];
    },
    async fetchUser() {
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      try {
        const userId = Cookies.get("userId");
        const response = await axios.get(
          `${API_BASE_URL}/user/users/${userId}`
        );
        const user = response.data;
        this.username = this.getFirstName(user.username);
        this.userInitials = this.getUserInitials(user.username);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    },
    async fetchRecords() {
      const userId = Cookies.get("userId");
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      const response = await axios.get(
        `${API_BASE_URL}/records/recordsByUser/${userId}`
      );
      this.records = response.data;
    },
    async addRecord(newRecord) {
      this.records.push(newRecord);
      this.fetchRecords();
    },
    async removeRecord(recordId) {
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      await axios.delete(`${API_BASE_URL}/records/deleteRecord/${recordId}`);
      this.records = this.records.filter((records) => records.id !== recordId);
    },
    logout() {
      Cookies.remove("userId");
      this.$router.push("/");
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openUpdateRecordModal(record) {
      if (record) {
        this.selectedRecord = record;
        this.showUpdateModal = true;
      } else {
        console.error("Record is null or undefined:", record);
      }
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    async handleUpdate({ id, field, value }) {
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      try {
        const modificationDate = this.formatDate(new Date());

        await axios.put(`${API_BASE_URL}/records/updateRecord/${id}`, {
          [field]: value,
          modificationDate,
        });

        const recordIndex = this.records.findIndex(
          (record) => record.id === id
        );
        if (recordIndex !== -1) {
          this.records[recordIndex][field] = value;
          this.records[recordIndex].modificationDate = modificationDate;
        }
      } catch (error) {
        console.error("Erro ao atualizar o campo:", error);
      }
    },
    closeUpdateRecordModal() {
      this.selectedRecord = null;
      this.showUpdateModal = false;
    },
    filterRecords() {
      const today = new Date().toLocaleDateString("pt-BR");

      if (this.filterType === "today") {
        this.filteredRecords = this.allRecords.filter((record) => {
          const recordDate = record.modificationDate.split(" ")[0];
          return recordDate === today;
        });
      } else {
        this.filteredRecords = this.allRecords;
      }
    },

    setFilter(filter) {
      this.filterType = filter;
      this.filterRecords();
    },
  },
  async created() {
    await this.fetchUser();
    this.fetchRecords();
  },
};
</script>

<style scoped>
.home-view {
  display: flex;
  height: 100vh;
  background-color: #f4f4f9;
  color: #4a4a4a;
  font-family: Arial, sans-serif;
  position: relative; /* Add this */
}

.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #f8adac;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
}

.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #703220;
  cursor: pointer;
}

.sidebar {
  width: 15%;
  min-width: 200px;
  background-color: #f8adac;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin: 8px;
  transition: transform 0.3s ease, width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-closed {
  transform: translateX(-100%);
  width: 50px;
  min-width: 50px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-closed-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.sidebar-top {
  flex-grow: 1;
}

.sidebar-toggle {
  position: absolute;
  top: 10px;
  right: -15px;
  background-color: #703220;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  margin-top: auto;
}

.user-avatar {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #703220;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.user-info p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
}

.logout-button {
  padding: 8px 12px;
  background-color: transparent;
  color: #703220(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-button i {
  margin-left: 8px;
}

.logout-button:hover {
  color: #522519;
}

.records-list {
  width: 100%;
  padding: 20px;
  height: calc(100vh - 40px);
  overflow-y: auto;
  transition: margin-left 0.3s ease;
  margin-left: 15%;
}

.records-list-expanded {
  margin-left: -50px;
}

.info-panel {
  width: 25%;
  background-color: #fbfcf8;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.site-title {
  margin-bottom: 20px;
  text-align: center;
  flex-shrink: 0;
}

.site-logo {
  max-width: 100%;
  height: auto;
  margin-right: 10px;
}

.site-logo-small {
  max-width: 100px;
  height: auto;
}

.site-title h1 {
  font-size: 24px;
  color: #333;
}

.add-record-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #703220;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
  margin-bottom: auto;
  margin-top: auto;
}

.menu-list li {
  margin: 0;
  cursor: pointer;
  text-align: left;
  padding: 10px 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: #703220;
  position: relative;
  width: calc(100% + 5px);
  left: -15px;
}

.menu-list li:hover {
  background-color: #7031206e;
  color: #703220;
}

.menu-list li:hover::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 4px;
  background-color: #703220;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  display: flex;
  width: 100%;
  max-width: 500px;
  border: none;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 60px;
}

.search-field-select {
  width: 30%;
  padding: 10px;
  border: none;
  outline: none;
  border-right: 1px solid #ccc;
  background-color: white;
  color: #616060;
  border-radius: 25px 0 0 25px;
  appearance: none;
}

.search-field-select::after {
  margin-left: 5px;
}

.search-bar {
  width: 70%;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 0 25px 25px 0;
}

.search-bar::placeholder {
  color: #999;
}

.records {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.record-card {
  background-color: #fbfcf8;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: calc(25% - 20px);
  position: relative;
}

.record-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff7b89;
  color: white;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
}

.record-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.record-date {
  font-size: 12px;
}

.record-actions {
  display: flex;
  gap: 10px;
}

.record-actions i {
  cursor: pointer;
}

.info-panel p {
  margin-bottom: 10px;
}

.delete-all-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.mobile-logo {
  height: 75px;
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .mobile-header {
    display: flex;
  }

  .sidebar {
    width: 80%;
    max-width: 300px;
    transform: translateX(-100%);
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .records-list {
    margin-left: 0;
    margin-top: 60px; /* Add this to account for the mobile header */
  }

  .records-list-expanded {
    margin-left: 0;
  }

  .search-container {
    display: flex;
    width: 100%;
    max-width: 500px;
    border: none;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-left: 0px;
  }
}
</style>
