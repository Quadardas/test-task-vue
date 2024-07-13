import { useUserStore } from "../stores/user";
import { IWorker } from "../models/worker.model";

interface AuthResult {
  key: string;
}

export class Auth {
  static async login(code: number) {
    const authResult = await new Promise<AuthResult>((resolve, reject) => {
      const storedUsers = JSON.parse(localStorage.getItem("workers") || "[]");
      const user = storedUsers.find(
        (u: IWorker) => atob(u.accessCode) == code.toString() && !u.isNew
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
    localStorage.setItem("authKey", authResult.key);

    const store = useUserStore();
    store.setUser(userInfo as IWorker);
  }

  static logOut() {
    const store = useUserStore();
    localStorage.removeItem("authKey");
    store.logOut();
  }

  static async checkAuth() {
    const authKey = localStorage.getItem("authKey");
    if (authKey) {
      const userInfo = await new Promise<IWorker>((resolve) => {
        const storedUsers = JSON.parse(localStorage.getItem("workers") || "[]");
        const user = storedUsers.find(
          (u: IWorker) => u.workerId.toString() == authKey
        );
        resolve(user);
      });

      if (userInfo) {
        const store = useUserStore();
        store.setUser(userInfo as IWorker);
      }
    }
  }
}
