import { useUserStore } from "../stores/user";
import type { Router } from "vue-router";
import { IWorker } from "../models/worker.model";

interface AuthResult {
  key: string;
}
export class Auth {
  static async login(code: number) {
    const authResult = await new Promise<AuthResult>((resolve, reject) => {
      const storedUsers = JSON.parse(localStorage.getItem("workers") || "[]");
      const user = storedUsers.find(
        (u: IWorker) => u.accessCode == code.toString()
      );
      if (user) {
        resolve({ key: user.workerId });
      } else {
        reject("aboba");
      }
    });

    if (!authResult) {
      return;
    }

    const userInfo = await new Promise<IWorker>((resolve) => {
      const storedUsers = JSON.parse(localStorage.getItem("workers") || "[]");
      const user = storedUsers.find(
        (u: IWorker) => u.workerId.toString() == authResult.key
      );
      resolve(user);
    });

    const store = useUserStore();
    store.setUser(userInfo as IWorker);

    // if (!userInfo.accessCode) {
    //   router.push(`/set-access-code`);
    // } else if (userInfo.workerRole === "admin") {
    //   router.push(`/admin`);
    // } else {
    //   router.push(`/`);
    // }
  }

  // static async refresh() {
  //   const store = useUserStore();
  //   const user = store.setUser(userInfo);

  //   if (!user) {
  //     return;
  //   }

  //   const userInfo = await new Promise((resolve) => {
  //     const storedUsers = JSON.parse(localStorage.getItem("workers") || "[]");
  //     const refreshedUser = storedUsers.find(
  //       (u: IWorker) => u.workerId === user.workerId
  //     );
  //     resolve(refreshedUser);
  //   });

  //   store.setUser(userInfo);
  // }

  static logOut() {
    const store = useUserStore();
    store.logOut();
  }
}
