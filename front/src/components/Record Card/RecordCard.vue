<template>
  <div
    class="record-card animate__animated"
    :class="{
      animate__fadeInUp: !isBeingRemoved,
      animate__fadeOutDown: isBeingRemoved,
    }"
    :style="{ animationDelay: !isBeingRemoved ? `${index * 0.2}s` : '0s' }"
    @click="$emit('click')"
  >
    <h3>{{ animalName }}</h3>
    <p>Espécie: {{ animalSpecies }}</p>
    <p>Habitat: {{ animalHabitat }}</p>
    <p>Observações: {{ observations }}</p>
    <div class="record-header">
      <i class="fas fa-calendar-alt"></i>
      <span class="record-date">{{ modificationDate }}</span>
    </div>
    <hr class="dashed-line" />
    <div class="record-footer">
      <div class="record-actions">
        <i class="fas fa-trash" @click.stop="handleDeleteRecords"></i>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";

export default {
  props: {
    id: Number,
    animalName: String,
    animalSpecies: String,
    animalHabitat: String,
    observations: String,
    modificationDate: String,
    index: Number,
  },
  data() {
    return {
      isBeingRemoved: false,
    };
  },
  methods: {
    handleDeleteRecords() {
      this.isBeingRemoved = true;
      setTimeout(() => {
        this.$emit("delete-records", this.id);
      }, 500);
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
}

p {
  text-align: left;
}

.record-card {
    background-color: #fbfcf8;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
    width: 20%;
    position: relative;
    margin-left: 0px;
}

.record-card:hover {
  background-color: #f8adac;
  color: #703220;
  cursor: pointer;

  .record-date {
    color: #703220;
  }

  .fas,
  .fa-solid {
    color: #703220;
  }
}

.record-header {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #7e7e7e;
  margin-bottom: 10px;
  margin-top: 80px;
}

.record-header i {
  margin-right: 5px;
}

.dashed-line {
  border: none;
  border-top: 1px dashed #703220;
  margin: 10px 0;
}

.record-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.record-date {
  font-size: 14px;
}

.record-actions {
  display: flex;
  gap: 10px;
}

.record-actions i {
  cursor: pointer;
  color: #7e7e7e;
}

@media (max-width: 768px) {
  .record-card {
    background-color: #fbfcf8;
    padding: 15px;
    border-radius: 10px;
    width: 400px;
    position: relative;
    margin-left: 0px;
  }
}
</style>
