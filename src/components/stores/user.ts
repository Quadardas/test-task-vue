import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { IWorker } from "../models/worker.model";
import { EWorkerRoles } from "../enums/workerRole.enum";

export const useUserStore = defineStore("user", () => {
  const user = ref<IWorker>({} as IWorker);

  function setUser(userInfo: IWorker) {
    user.value = userInfo;
  }
  function logOut() {
    user.value = {} as IWorker;
  }
  const userName = computed(() => `${user.value?.name} `);
  const isAdmin = computed(() => user.value?.workerRole === EWorkerRoles.admin);
  const isLogin = computed(() => user.value?.workerId);
  return { user, setUser, userName, logOut, isAdmin, isLogin };
});
