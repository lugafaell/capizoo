<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div
      class="modal-content animate__animated animate__fadeInDown"
      @click.stop
    >
      <div class="modal-header">
        <h2>Novo Registro</h2>
      </div>
      <div class="tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.value"
          :class="['tab-indicator', { active: currentStep === index }]"
        >
          {{ tab.label }}
        </div>
      </div>
      <form @submit.prevent="submitTask">
        <div v-show="currentStep === 0" class="tab-content">
          <div class="form-row">
            <div class="form-group">
              <label for="animalName">Nome:</label>
              <input
                type="text"
                id="animalName"
                v-model="animalName"
                placeholder="Nome do Animal"
                required
              />
            </div>
            <div class="form-group">
              <label for="animalSpecies">Espécie: </label>
              <input
                type="text"
                id="animalSpecies"
                v-model="animalSpecies"
                placeholder="Espécie do Animal"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="animalAge">Idade: </label>
              <input
                type="number"
                id="animalAge"
                v-model="animalAge"
                placeholder="Idade do Animal"
                required
              />
            </div>
            <div class="form-group">
              <label for="animalWeight">Peso:</label>
              <input
                type="number"
                id="animalWeight"
                v-model="animalWeight"
                placeholder="Peso do Animal"
                required
              />
            </div>
          </div>
        </div>

        <div v-show="currentStep === 1" class="tab-content">
          <div class="form-row">
            <div class="form-group">
              <label for="animalHealth">Saúde: </label>
              <select v-model="selectedHealth" required>
                <option value="" disabled>Como seu Animal está?</option>
                <option value="Saudável">Saudável</option>
                <option value="Necessita Cuidados">Necessita Cuidados</option>
              </select>
            </div>
            <div class="form-group">
              <label for="animalHabitat">Habitat:</label>
              <input
                type="text"
                id="animalHabitat"
                v-model="animalHabitat"
                placeholder="Habitat do Animal"
                required
              />
            </div>
          </div>
        </div>

        <div v-show="currentStep === 2" class="tab-content">
          <div class="form-row">
            <div class="form-group">
              <label for="animalBehavior">Comportamento:</label>
              <input
                type="text"
                id="animalBehavior"
                v-model="animalBehavior"
                placeholder="Comportamento do Animal"
                required
              />
            </div>
            <div class="form-group">
              <label for="animalDiet">Dieta:</label>
              <input
                type="text"
                id="animalDiet"
                v-model="animalDiet"
                placeholder="Dieta do Animal"
                required
              />
            </div>
          </div>
        </div>

        <div v-show="currentStep === 3" class="tab-content">
          <div class="form-area">
            <label for="observations">Observações:</label>
            <textarea
              id="observations"
              v-model="observations"
              placeholder="Digite suas observações"
              required
            ></textarea>
          </div>
          <div class="form-area">
            <label for="animalImages">Fotos</label>
            <div class="custom-file-wrapper">
              <input
                type="file"
                id="animalImages"
                class="custom-file-input"
                multiple
                @change="handleFileUpload"
              />
              <span class="file-name">
                {{
                  selectedFileNames.length
                    ? selectedFileNames.join(", ")
                    : " Nenhuma Foto Escolhida"
                }}
              </span>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button
            v-if="currentStep > 0"
            type="button"
            class="nav-button"
            @click="prevStep"
          >
            Anterior
          </button>
          <button
            v-if="currentStep < tabs.length - 1"
            type="button"
            class="nav-button"
            @click="nextStep"
          >
            Próximo
          </button>
          <button
            v-if="currentStep === tabs.length - 1"
            type="submit"
            class="submit-button"
          >
            <i class="fas fa-add"></i> Add Registro
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentStep: 0,
      tabs: [
        { label: "Info. Básica", value: "basic" },
        { label: "Saúde & Habitat", value: "health" },
        { label: "Comportamento e Dieta", value: "behavior" },
        { label: "Info. Adicional", value: "additional" },
      ],
      animalName: "",
      animalSpecies: "",
      animalAge: "",
      animalWeight: "",
      selectedHealth: "",
      animalHabitat: "",
      animalBehavior: "",
      animalDiet: "",
      observations: "",
      animalPictures: [],
      selectedFileNames: [],
    };
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.resetForm();
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    nextStep() {
      if (this.currentStep < this.tabs.length - 1) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    getCurrentDateTime() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    async handleFileUpload(event) {
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      const files = Array.from(event.target.files);
      const formData = new FormData();

      this.selectedFileNames = files.map((file) => file.name);

      files.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const response = await fetch(`${API_BASE_URL}/upload/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro ao enviar as imagens.");
        }

        const data = await response.json();

        this.animalPictures = data.imageUrls.join(", ");
      } catch (error) {
        console.error("Erro ao enviar as imagens:", error);
      }
    },
    async submitTask() {
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      const userId = Cookies.get("userId");

      const newRecord = {
        animalName: this.animalName,
        animalSpecies: this.animalSpecies,
        animalAge: this.animalAge,
        animalWeight: this.animalWeight,
        animalHealth: this.selectedHealth,
        animalHabitat: this.animalHabitat,
        animalBehavior: this.animalBehavior,
        animalDiet: this.animalDiet,
        observations: this.observations,
        animalPictures: this.animalPictures,
        modificationDate: this.getCurrentDateTime(),
        userId: userId,
      };

      try {
        const response = await fetch(
          `${API_BASE_URL}/records/registerRecords`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecord),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao registrar.");
        }

        const data = await response.json();

        this.$emit("add-record", data);

        this.closeModal();
      } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Erro ao registrar o animal. Por favor, tente novamente.");
      }
    },
    resetForm() {
      this.currentStep = 0;
      this.animalName = "";
      this.animalSpecies = "";
      this.animalAge = "";
      this.animalWeight = "";
      this.selectedHealth = "";
      this.animalHabitat = "";
      this.animalBehavior = "";
      this.animalDiet = "";
      this.observations = "";
      this.selectedFileNames = [];
    },
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
}

.modal-content {
  background: #fbfcf8;
  padding: 0;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.modal-header {
  background-color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #703220;
  text-align: center;
}

.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #f8adac;
  padding: 10px 0;
  border-radius: 10px;
  margin: 0 10px 0 10px;
}

.tab-indicator {
  color: #703220;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
}

.tab-indicator.active {
  background-color: #703220;
  color: white;
}

.tab-button {
  background: none;
  border: none;
  color: #703220;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  transition: background-color 0.3s;
}

.tab-button.active {
  background-color: #703220;
  color: white;
  border-radius: 5px;
}

.tab-content {
  padding: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  width: 48%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #703220;
}

.form-group input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: white;
}

.form-area {
  position: relative;
  margin-bottom: 15px;
}

.custom-file-wrapper {
  position: relative;
  display: inline-block;
}

.custom-file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

.form-area label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #703220;
}

.file-name::before {
  content: "Selecionar Fotos";
  display: inline-block;
  background-color: #703220;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.file-name:hover::before {
  background-color: #a65b50;
}

.file-name {
  margin-left: 10px;
  font-size: 16px;
  color: #703220;
  cursor: pointer;
}

.form-area textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: white;
  resize: none;
  height: 100px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 20px;
}

.nav-button {
  background: #fbfcf8;
  color: #703220;
  padding: 10px 20px;
  border: 1px solid #703220;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.nav-button:hover {
  background: rgb(240, 240, 240);
}

.submit-button {
  background: #fbfcf8;
  color: #703220;
  padding: 10px 20px;
  border: 1px solid #703220;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: rgb(240, 240, 240);
}
</style>
