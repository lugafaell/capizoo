<template>
  <div class="login-container">
    <div class="login-left">
      <img
        src="@/assets/Sem título-Photoroom.png"
        alt="Login Illustration"
        class="logo"
      />
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group">
          <input
            type="text"
            :placeholder="isCreatingAccount ? 'Digite seu Nome' : 'Nome'"
            v-model="username"
          />
        </div>
        <div class="input-group">
          <input
            type="password"
            :placeholder="isCreatingAccount ? 'Digite sua Senha' : 'Senha'"
            v-model="password"
          />
        </div>

        <button type="submit" class="btn-signin">
          {{ isCreatingAccount ? "CREATE ACCOUNT" : "SIGN IN" }}
        </button>

        <div class="links-container">
          <a
            href="#"
            class="create-account"
            @click="toggleCreateAccount"
            v-if="!isCreatingAccount"
          >
            Não Possui Conta? Crie uma agora mesmo!
          </a>
          <a href="#" class="back-to-login" @click="toggleCreateAccount" v-else>
            Voltar ao Login
          </a>
        </div>
      </form>
      <div class="footer">
        <span>powered by</span>
        <a href="https://github.com/lugafaell" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" class="github-icon" />
        </a>
        <strong>
          <a
            href="https://github.com/lugafaell"
            target="_blank"
            class="github-link"
          >
            Lugafael
          </a>
        </strong>
      </div>
    </div>
    <div class="login-right">
      <h1 class="typing-animation">{{ typingText }}</h1>
      <p v-if="!isCreatingAccount">
        Sua Plataforma de Organização e Catalogação dos seus Animais!
      </p>
    </div>
    <CustomAlert
      v-if="showAlert"
      :message="alertMessage"
      :type="alertType"
      @close="showAlert = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import CustomAlert from "../components/alert/CustomAlert.vue";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faGithub);

export default {
  name: "LoginView",
  components: {
    CustomAlert,
    FontAwesomeIcon,
  },
  mounted() {
    this.checkLogin();
    this.typeWriter();
  },
  data() {
    return {
      username: "",
      password: "",
      typingText: "",
      fullText: "Bem-Vindo ao Capizoo!",
      currentIndex: 0,
      showAlert: false,
      alertMessage: "",
      alertType: "success",
      isCreatingAccount: false,
    };
  },
  methods: {
    async handleSubmit() {
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      try {
        if (this.isCreatingAccount) {
          const response = await axios.post(`${API_BASE_URL}/user/users`, {
            username: this.username,
            password: this.password,
          });
          if (response.data.message === "Usuário criado com sucesso!") {
            this.showAlert = true;
            this.alertMessage = "Conta criada com Sucesso!";
            this.alertType = "success";
            setTimeout(() => {
              this.isCreatingAccount = false;
            }, 1500);
          } else {
            this.showAlert = true;
            this.alertMessage =
              "Erro ao Criar a Conta. Tente novamente mais Tarde!";
            this.alertType = "error";
          }
        } else {
          const response = await axios.post(`${API_BASE_URL}/user/login`, {
            username: this.username,
            password: this.password,
          });
          if (response.data.message === "Login bem-sucedido!") {
            Cookies.set("userId", response.data.userId, { expires: 7 });
            this.showAlert = true;
            this.alertMessage = "Login bem-sucedido!";
            this.alertType = "success";
            setTimeout(() => {
              this.$router.push("/Home");
            }, 1500);
          } else {
            this.showAlert = true;
            this.alertMessage = "Credenciais inválidas. Tente novamente.";
            this.alertType = "error";
          }
        }
      } catch (error) {
        console.error("Erro:", error);
        this.showAlert = true;
        this.alertMessage = "Ocorreu um Erro. Tente Novamente mais tarde.";
        this.alertType = "error";
      }
    },
    toggleCreateAccount() {
      this.isCreatingAccount = !this.isCreatingAccount;
    },
    typeWriter() {
      if (this.currentIndex < this.fullText.length) {
        this.typingText += this.fullText.charAt(this.currentIndex);
        this.currentIndex++;
        setTimeout(this.typeWriter, 100);
      }
    },
    checkLogin() {
      const user = Cookies.get("userId");
      if (user) {
        this.$router.push("/Home");
      }
    },
  },
};
</script>

<style scoped>
body {
  display: block;
  margin: 0;
}

.github-link {
  text-decoration: none;
  color: #703220;
  font-weight: bold;
}

.github-link:hover {
  text-decoration: underline;
}

.login-form {
  width: 100%;
  max-width: 300px;
}

.login-container {
  display: flex;
  height: 100vh;
}

.login-left,
.login-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-left {
  background-color: #fbfcf8;
  padding: 20px;
  position: relative;
}

.footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #703220;
}

.github-icon {
  font-size: 20px;
  color: #703220;
}

.login-left img {
  width: 200px;
  margin-bottom: 20px;
}

.login-left h2 {
  margin-bottom: 30px;
  color: #703220;
}

.input-group {
  margin-bottom: 20px;
  width: 100%;
  border: none;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1.5px solid #ababab;
  box-sizing: border-box;
  background-color: #fbfcf8;
  font-size: 14px;
}

.btn-signin {
  width: 100%;
  padding: 10px;
  background-color: #f8adac;
  color: #703220;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.btn-signin:hover {
  background-color: #c27c7b;
}

.forgot-password {
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-right {
  background-color: #f8adac;
  color: #703220;
  text-align: center;
  padding: 20px;
}

.login-right h1 {
  margin-bottom: 20px;
}

.login-right p {
  margin-bottom: 30px;
}

.btn-signup {
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-signup:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.typing-animation {
  border-right: 2px solid #fff;
  white-space: nowrap;
  overflow: hidden;
}

.create-account {
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.create-account:hover {
  text-decoration: underline;
}

.back-to-login {
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.back-to-login:hover {
  text-decoration: underline;
}

.links-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

@media (max-width: 768px) {
  .login-left,
  .login-right {
    width: 100%;
  }

  .login-right {
    display: none;
  }

  .login-left {
    justify-content: flex-start;
    padding-top: 50px;
  }
}
</style>
