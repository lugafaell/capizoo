<template>
  <div class="custom-alert" :class="type" v-if="visible">
    <span>{{ message }}</span>
    <button @click="closeAlert">x</button>
  </div>
</template>

<script>
export default {
  name: "CustomAlert",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closeAlert() {
      this.visible = false;
      this.$emit("close");
    },
  },
  mounted() {
    setTimeout(this.closeAlert, this.duration);
  },
};
</script>

<style scoped>
.custom-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  min-width: 300px;
  z-index: 1000;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  animation: slide-in-right 0.5s ease-out;
}

.custom-alert.info {
  background-color: #17a2b8;
}

.custom-alert.success {
  background-color: #ffffff;
  border-bottom: 4px solid rgb(11, 167, 19);
}

.custom-alert.success::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: rgb(11, 167, 19);
  animation: progress-bar 3s linear forwards;
}

.custom-alert.warn {
  background-color: #ffffff;
  border-bottom: 4px solid #ffc107;
}

.custom-alert.warn::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: #ffc107;
  animation: progress-bar 3s linear forwards;
}

.custom-alert.error {
  background-color: #ffffff;
  border-bottom: 4px solid #dc3545;
}

.custom-alert.error::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: #dc3545;
  animation: progress-bar 3s linear forwards;
}

.custom-alert button {
  background: none;
  border: none;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
}

@keyframes progress-bar {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
