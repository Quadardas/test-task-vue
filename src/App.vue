<template>
  <VaNavbar v-if="store.isLogin" color="#F4F8FA">
    <template #left>
      <VaNavbarItem class="navbar-item-slot">
        <router-link to="/">Карта</router-link>
        <router-link v-if="store.isAdmin" to="/admin">Admin</router-link>
      </VaNavbarItem>
    </template>
    <template v-if="store.isLogin" #right>
      <VaNavbarItem class="navbar-item-slot">{{
        store.user?.name + " " + store.user?.workerRole
      }}</VaNavbarItem>
      <VaButton @click="logOut">Выйти</VaButton>
    </template>
  </VaNavbar>

  <router-view />
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "./components/stores/user";
import router from "./router";
import { Office } from "./components/services/office.service";
import { IOffice } from "./components/models/office.model";
import { WORKERS } from "./components/constants/workplace.const";
const officeService = new Office();
const offices = ref<Array<IOffice>>();
const store = useUserStore();
function logOut() {
  store.logOut();
  router.push("/login");
}
const workerList = WORKERS;

onBeforeMount(async () => {
  const fetchedOffices = await officeService.getOffices();
  offices.value = fetchedOffices;

  if (!fetchedOffices || fetchedOffices.length === 0) {
    localStorage.setItem("workers", JSON.stringify(workerList));
  }
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar-item-slot {
  gap: 20px;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
