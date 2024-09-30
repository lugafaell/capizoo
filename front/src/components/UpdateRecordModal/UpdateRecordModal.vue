<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div
      class="modal-content animate__animated animate__fadeInDown"
      @click.stop
    >
      <div class="modal-body">
        <div class="info-section">
          <div
            v-for="(value, key) in editableFields"
            :key="key"
            class="form-group"
          >
            <div class="label-container">
              <label :for="key">{{ formatLabel(key) }}:</label>
              <template v-if="!isEditing(key)">
                <span>{{ value }}</span>
                <button
                  @click="toggleEdit(key)"
                  class="edit-button"
                  :aria-label="`Edit ${formatLabel(key)}`"
                >
                  <i class="fas fa-edit"></i>
                </button>
              </template>
              <template v-else>
                <input
                  :id="key"
                  v-model="editedValues[key]"
                  :type="getInputType(key)"
                  class="edit-input"
                  @keyup.enter="saveEdit(key)"
                />
                <button
                  @click="saveEdit(key)"
                  class="edit-button"
                  :aria-label="`Confirm ${formatLabel(key)} edit`"
                >
                  <i class="fas fa-check"></i>
                </button>
              </template>
            </div>
          </div>

          <div class="form-group collapsible">
            <div class="collapsible-header">
              <div class="label-container">
                <label for="animalBehavior">Behavior:</label>
              </div>
              <button
                class="collapse-button"
                @click="toggleSection('behavior')"
                :aria-expanded="isSectionOpen('behavior')"
              >
                {{ isSectionOpen("behavior") ? "-" : "+" }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="isSectionOpen('behavior')">
                <textarea
                  id="animalBehavior"
                  v-if="isEditing('animalBehavior')"
                  v-model="editedValues.animalBehavior"
                  class="edit-textarea"
                ></textarea>
                <textarea
                  v-else
                  readonly
                  v-bind:value="animal.animalBehavior"
                ></textarea>
                <button
                  @click="toggleEdit('animalBehavior')"
                  class="edit-button"
                  aria-label="Edit Behavior"
                >
                  <i
                    class="fas"
                    :class="
                      isEditing('animalBehavior') ? 'fa-check' : 'fa-edit'
                    "
                  ></i>
                </button>
              </div>
            </transition>
          </div>

          <div class="form-group collapsible">
            <div class="collapsible-header">
              <div class="label-container">
                <label for="animalDiet">Diet:</label>
              </div>
              <button
                class="collapse-button"
                @click="toggleSection('diet')"
                :aria-expanded="isSectionOpen('diet')"
              >
                {{ isSectionOpen("diet") ? "-" : "+" }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="isSectionOpen('diet')">
                <textarea
                  id="animalDiet"
                  v-if="isEditing('animalDiet')"
                  v-model="editedValues.animalDiet"
                  class="edit-textarea"
                ></textarea>
                <textarea
                  v-else
                  readonly
                  v-bind:value="animal.animalDiet"
                ></textarea>
                <button
                  @click="toggleEdit('animalDiet')"
                  class="edit-button"
                  aria-label="Edit Diet"
                >
                  <i
                    class="fas"
                    :class="isEditing('animalDiet') ? 'fa-check' : 'fa-edit'"
                  ></i>
                </button>
              </div>
            </transition>
          </div>

          <div class="form-group collapsible">
            <div class="collapsible-header">
              <div class="label-container">
                <label for="observations">Observations:</label>
              </div>
              <button
                class="collapse-button"
                @click="toggleSection('observations')"
                :aria-expanded="isSectionOpen('observations')"
              >
                {{ isSectionOpen("observations") ? "-" : "+" }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="isSectionOpen('observations')">
                <textarea
                  id="observations"
                  v-if="isEditing('observations')"
                  v-model="editedValues.observations"
                  class="edit-textarea"
                ></textarea>
                <textarea
                  v-else
                  readonly
                  v-bind:value="animal.observations"
                ></textarea>
                <button
                  @click="toggleEdit('observations')"
                  class="edit-button"
                  aria-label="Edit Observations"
                >
                  <i
                    class="fas"
                    :class="isEditing('observations') ? 'fa-check' : 'fa-edit'"
                  ></i>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <div class="image-carousel">
          <div class="carousel-container">
            <img
              :src="currentImage"
              alt="Animal"
              class="carousel-image animate__animated"
              :class="animationClass"
            />
            <div class="carousel-controls">
              <button
                @click="prevImage"
                class="carousel-button"
                aria-label="Previous image"
              >
                &#10094;
              </button>
              <button
                @click="nextImage"
                class="carousel-button"
                aria-label="Next image"
              >
                &#10095;
              </button>
            </div>
          </div>
          <div class="image-counter">
            {{ currentIndex + 1 }} / {{ totalImages }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import logoCapizoo from "@/assets/logo_capizoo.png";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: Boolean,
  animal: Object,
});

const emit = defineEmits(["close", "update"]);

const currentIndex = ref(0);
const animationClass = ref("");
const openSections = reactive({});
const editingFields = reactive({});
const editedValues = reactive({});

const editableFields = computed(() => ({
  animalName: props.animal.animalName,
  animalSpecies: props.animal.animalSpecies,
  animalAge: `${props.animal.animalAge} years`,
  animalWeight: `${props.animal.animalWeight} kg`,
  animalHealth: props.animal.animalHealth,
  animalHabitat: props.animal.animalHabitat,
}));

const currentImage = computed(() => {
  let pictures = props.animal.animalPictures;

  if (typeof pictures === "string") {
    pictures = pictures.split(",").map((url) => url.trim());
  }

  if (Array.isArray(pictures) && pictures.length > 0) {
    return pictures[currentIndex.value] || logoCapizoo;
  }

  return logoCapizoo;
});

const totalImages = computed(() => {
  let pictures = props.animal.animalPictures;

  if (typeof pictures === "string") {
    pictures = pictures.split(",").map((url) => url.trim());
  }

  return Array.isArray(pictures) ? pictures.length : 1;
});

const closeModal = () => {
  emit("close");
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    animationClass.value = "animate__slideInLeft";
    setTimeout(() => {
      currentIndex.value--;
    }, 300);
  }
};

const nextImage = () => {
  if (currentIndex.value < totalImages.value - 1) {
    animationClass.value = "animate__slideInRight";
    setTimeout(() => {
      currentIndex.value++;
    }, 300);
  }
};

const toggleSection = (section) => {
  openSections[section] = !openSections[section];
};

const isSectionOpen = (section) => {
  return openSections[section] || false;
};

const formatLabel = (key) => {
  return key
    .replace("animal", "")
    .replace(/([A-Z])/g, " $1")
    .trim();
};

const toggleEdit = (field) => {
  if (editingFields[field]) {
    saveEdit(field);
  } else {
    editingFields[field] = true;
    editedValues[field] = props.animal[field];
  }
};

const saveEdit = (field) => {
  editingFields[field] = false;
  emit("update", { id: props.animal.id, field, value: editedValues[field] });
};

const isEditing = (field) => {
  return editingFields[field] || false;
};

const getInputType = (key) => {
  if (key === "animalAge" || key === "animalWeight") {
    return "number";
  }
  return "text";
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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.info-section {
  flex: 1;
  min-width: 300px;
  margin-right: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 5px;
}

.label-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.label-container label {
  font-weight: bold;
  color: #703220;
  margin-right: 10px;
  min-width: 80px;
}

.label-container span {
  flex-grow: 1;
  margin-right: 10px;
}

.edit-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #703220;
  font-size: 14px;
  padding: 2px 5px;
  transition: color 0.3s;
}

.edit-button:hover {
  color: #f8adac;
}

.edit-input-container {
  margin-top: 5px;
  width: 100%;
}

.edit-input,
.edit-textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.edit-textarea {
  min-height: 100px;
  resize: none;
}

textarea {
  border-radius: 4px;
  width: 200px;
  height: 100px;
  resize: none;
}

.image-carousel {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  height: auto;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
  --animate-duration: 0.3s;
  max-height: 100%;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.carousel-button {
  background-color: rgba(248, 173, 172, 0.7);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.carousel-button:hover {
  background-color: rgba(248, 173, 172, 1);
}

.image-counter {
  margin-top: 10px;
  color: #703220;
  font-size: 14px;
}

.collapsible-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.collapse-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #703220;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 15px;
  }

  .info-section,
  .image-carousel {
    min-width: 100%;
    margin-right: 0;
  }

  .image-carousel {
    margin-top: 20px;
  }

  .carousel-container {
    aspect-ratio: 16 / 9;
    max-width: 100%;
    height: auto;
  }

  .carousel-image {
    width: 100%;
    height: auto;
    max-height: 300px;
  }
}
</style>
