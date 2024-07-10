<template>
  <div class="login-page">
    <form class="login">
      <h1>Авторизация</h1>
      <VaInput
        v-model="userLogin.loginCode"
        class="mb-6"
        label="Код доступа"
        :mask="{ blocks: [6] }"
        placeholder="######"
      />
      <VaButton
        :disabled="!userLogin.loginCode"
        class="loginBTN"
        @click="login"
      >
        Войти
      </VaButton>
      <VaButton @click="noAccessCode" preset="secondary" class="mr-6 mb-2">
        У меня нет кода доступа
      </VaButton>
      <WorkerCreate
        :show="showModalWorker"
        @close="showModalWorker = false"
        @ok="showModalWorker = false"
        isNewWorker
      />
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Auth } from "../components/services/auth.service";
import { useToast } from "vuestic-ui";
import WorkerCreate from "../components/modals/WorkerCreate.vue";
const { init } = useToast();
const showModalWorker = ref<boolean>(false);
const isNewWorker = ref<boolean>(false);
const userLogin = reactive({
  loginCode: "",
});

function noAccessCode() {
  showModalWorker.value = true;
  isNewWorker.value = true;
}

async function login() {
  try {
    await Auth.login(+userLogin.loginCode);
    router.push("/");
  } catch {
    init({
      message: "Неверный код доступа",
      color: "danger",
    });
  }
}
const router = useRouter();
</script>

<style lang="scss" scoped>
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.login {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

  input {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .loginBTN {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #4caf50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
