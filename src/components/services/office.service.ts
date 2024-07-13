import { IOffice, IWorkPlace } from "../models/office.model";
import { ref } from "vue";
import { IWorker } from "../models/worker.model";

export class Office {
  private offices = ref<Array<IOffice>>([]);

  // public getOffices(): Array<IOffice> {
  //   return this.offices.value;
  // }
  // constructor() {
  //   this.initOffices();
  // }

  // public initOffices(): void {
  //   const officesFromLS = localStorage.getItem("office");
  //   if (officesFromLS) {
  //     this.offices.value = JSON.parse(officesFromLS);
  //   }
  // }
  public async getOffices(): Promise<IOffice[]> {
    const promise = new Promise<IOffice[]>((resolve, reject) => {
      const officeData = JSON.parse(localStorage.getItem("office") || "[]");
      if (!officeData) {
        reject(new Error(`Office not found`));
      }
      resolve(officeData);
    });
    const data = await promise;
    //console.log(data);

    return data;
  }
  public async getOneOffice(officeId: number): Promise<IOffice> {
    //console.log(officeId, "это гет 1 офис");
    const promise = new Promise<IOffice>((resolve, reject) => {
      const officeData = JSON.parse(localStorage.getItem("office") || "[]");
      const office = officeData.find(
        (officeitem: IOffice) => officeitem.officeId === officeId
      );
      if (!office) {
        reject(new Error(`Office with id ${officeId} not found`));
      }
      resolve(office);
    });
    const data = await promise;
    //console.log(data);

    return data;
  }
  public async getWorkPlacesInOffice(officeId: number): Promise<IWorkPlace[]> {
    const promise = new Promise<IWorkPlace[]>((resolve, reject) => {
      const officeData = JSON.parse(localStorage.getItem("office") || "[]");
      const workplacesData = JSON.parse(
        localStorage.getItem("workplaces") || "[]"
      );
      const office = officeData.find(
        (officeitem: IOffice) => officeitem.officeId === officeId
      );
      if (!office) {
        reject(new Error(`Office with id ${officeId} not found`));
      }
      const workplaces = workplacesData.filter((workplace: IWorkPlace) =>
        office.workplacesId.includes(workplace.workPlaceId)
      );
      resolve(workplaces);
    });
    const data = await promise;
    // console.log(data);

    return data;
  }
  public async getOneWorkplace(workplaceId: number): Promise<IWorkPlace[]> {
    const promise = new Promise<IWorkPlace[]>((resolve, reject) => {
      const workplacesData = JSON.parse(
        localStorage.getItem("workplaces") || "[]"
      );
      const workplace = workplacesData.find(
        (workplaceId: IWorkPlace) => (workplacesData.workPlaceId = workplaceId)
      );
      if (!workplace) {
        reject(new Error(`Workplace with id ${workplaceId} not found`));
      }
      resolve(workplace);
    });

    const data = await promise;
    // console.log(data);

    return data;
  }
  public async getAllWorkPlaces(): Promise<IWorkPlace[]> {
    const promise = new Promise<IWorkPlace[]>((resolve, reject) => {
      const workplacesData = JSON.parse(
        localStorage.getItem("workplaces") || "[]"
      );
      resolve(workplacesData);
      reject(new Error(`Workplaces not found`));
    });

    const data = await promise;
    // console.log(data);

    return data;
  }
  // public async createRequest(workplace: IWorkPlace): Promise<IWorkPlace[]> {
  //   const promise = new Promise<IWorkPlace[]>((resolve, reject) => {
  //     const workplacesData = JSON.parse(
  //       localStorage.getItem("requestWorkplaces") || "[]"
  //     );
  //     workplacesData.push(workplace);
  //     localStorage.setItem("requestWorkplaces", JSON.stringify(workplacesData));
  //     resolve(workplacesData);
  //     reject(new Error(`Workplace`));
  //   });
  //   const data = promise;
  //   return data;
  // }
  async createRequest(
    worker: IWorker,
    workplace: IWorkPlace,
    officeId: number
  ) {
    const promise = new Promise((resolve, reject) => {
      try {
        const officeData = JSON.parse(localStorage.getItem("office") || "[]");
        let requestworkplacesData = JSON.parse(
          localStorage.getItem("requestWorkplaces") || "[]"
        );
        let workplacesData = JSON.parse(
          localStorage.getItem("workplaces") || "[]"
        );
        const workersData = JSON.parse(localStorage.getItem("workers") || "[]");
        workplacesData = workplacesData.filter(
          (wp: IWorkPlace) => wp.workPlaceId !== workplace.workPlaceId
        );
        workersData.push(worker);
        requestworkplacesData.push(workplace);
        workplacesData.push(workplace);

        const officeIndex = officeData.findIndex(
          (office: any) => office.officeId === officeId
        );
        if (officeIndex !== -1) {
          officeData[officeIndex].workplacesId.push(workplace.workPlaceId);
        } else {
          reject("Office not found");
          return;
        }
        // localStorage.setItem("office", JSON.stringify(officeData));
        localStorage.setItem(
          "requestWorkplaces",
          JSON.stringify(requestworkplacesData)
        );
        // localStorage.setItem("workplaces", JSON.stringify(workplacesData));

        resolve("Data updated");
      } catch (error) {
        reject("Error: " + error);
      }
    });

    return promise;
  }

  public async getRequestWorkplace(): Promise<IWorkPlace[]> {
    const promise = new Promise<IWorkPlace[]>((resolve, reject) => {
      let requestworkplacesData = JSON.parse(
        localStorage.getItem("requestWorkplaces") || "[]"
      );

      resolve(requestworkplacesData);
      reject(new Error(`Workplaces not found`));
    });

    const data = await promise;
    // console.log(data);

    return data;
  }
  // поменять на перенос из нового ls в старый

  public async acceptRequest(
    workplaceId: number,
    workerId: number
  ): Promise<IWorkPlace> {
    const promise = new Promise<IWorkPlace>((resolve, reject) => {
      try {
        const requestWorkplacesData = JSON.parse(
          localStorage.getItem("requestWorkplaces") || "[]"
        );
        let workplacesData = JSON.parse(
          localStorage.getItem("workplaces") || "[]"
        );
        const requestWorkplaceIndex = requestWorkplacesData.findIndex(
          (workplace: IWorkPlace) =>
            workplace.workPlaceId === workplaceId &&
            workplace.workerId === workerId
        );
        if (requestWorkplaceIndex === -1) {
          reject(
            new Error(
              `Workplace with id ${workplaceId} and worker id ${workerId} not found or already accepted`
            )
          );
          return;
        }
        const filteredRequestWorkplacesData = requestWorkplacesData.filter(
          (workplace: IWorkPlace) => workplace.workPlaceId !== workplaceId
        );
        const [requestWorkplace] = requestWorkplacesData.splice(
          requestWorkplaceIndex,
          1
        );
        const workplaceIndex = workplacesData.findIndex(
          (workplace: IWorkPlace) => workplace.workPlaceId === workplaceId
        );
        if (workplaceIndex !== -1) {
          workplacesData.splice(workplaceIndex, 1);
        }
        workplacesData.push(requestWorkplace);
        localStorage.setItem("workplaces", JSON.stringify(workplacesData));
        localStorage.setItem(
          "requestWorkplaces",
          JSON.stringify(filteredRequestWorkplacesData)
        );

        resolve(requestWorkplace);
      } catch (error) {
        reject(new Error("Error: " + error));
      }
    });

    const data = await promise;
    return data;
  }

  public async declineRequest(workplaceId: number): Promise<IWorkPlace> {
    const promise = new Promise<IWorkPlace>((resolve, reject) => {
      const workplacesData = JSON.parse(
        localStorage.getItem("requestWorkplaces") || "[]"
      );
      const requestWorkplace = workplacesData.filter(
        (workplace: IWorkPlace) => workplace.workPlaceId !== workplaceId
      );
      if (requestWorkplace) {
        localStorage.setItem(
          "requestWorkplaces",
          JSON.stringify(requestWorkplace)
        );
        resolve(requestWorkplace);
      } else {
        reject(
          new Error(
            `Workplace with id ${workplaceId} not found or already accepted`
          )
        );
      }
    });
    const data = await promise;
    // console.log(data);
    return data;
  }

  public async getWorker(
    workplaceId: number,
    workerId: number,
    approvable: boolean
  ): Promise<IWorker> {
    const promise = new Promise<IWorker>((resolve, reject) => {
      let workplacesData;
      if (!approvable) {
        workplacesData = JSON.parse(localStorage.getItem("workplaces") || "[]");
      } else {
        workplacesData = JSON.parse(
          localStorage.getItem("requestWorkplaces") || "[]"
        );
      }
      const workersData = JSON.parse(localStorage.getItem("workers") || "[]");
      const workplace = workplacesData.find(
        (workplace: any) => workplace.workPlaceId === workplaceId
      );
      if (!workplace) {
        reject(new Error(`not found`));
        return;
      }
      const worker = workersData.find(
        (worker: any) => worker?.workerId === workerId
      );
      resolve(worker);
    });
    const data = await promise;
    // console.log(data);

    return data;
  }

  async getNewWorkplaceId(): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      const workplaces = JSON.parse(localStorage.getItem("workplaces") || "[]");
      if (workplaces.length !== 0) {
        const lastWorkplace = Math.max(
          ...workplaces.map((wp: any) => wp.workPlaceId)
        );
        resolve(lastWorkplace + 1);
      } else {
        resolve(1);
      }
    });
    const data = await promise;
    // console.log(data);
    return data;
  }

  async getNewWorkerId(): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      const workers = JSON.parse(localStorage.getItem("workers") || "[]");
      if (workers.length > 0) {
        const lastWorkerId = Math.max(
          ...workers.map((worker: any) => worker?.workerId)
        );
        resolve(lastWorkerId + 1);
      } else {
        resolve(1);
      }
    });

    const data = await promise;
    //console.log(data);
    return data;
  }

  async createNewWorkplace(
    worker: IWorker,
    workplace: IWorkPlace,
    officeId: number
  ) {
    const promise = new Promise((resolve, reject) => {
      try {
        const officeData = JSON.parse(localStorage.getItem("office") || "[]");
        const workplacesData = JSON.parse(
          localStorage.getItem("workplaces") || "[]"
        );
        const workersData = JSON.parse(localStorage.getItem("workers") || "[]");
        workersData.push(worker);
        workplacesData.push(workplace);
        const officeIndex = officeData.findIndex(
          (office: any) => office.officeId === officeId
        );
        if (officeIndex !== -1) {
          officeData[officeIndex].workplacesId.push(workplace.workPlaceId);
        } else {
          reject("Office not found");
          return;
        }
        localStorage.setItem("office", JSON.stringify(officeData));
        localStorage.setItem("workplaces", JSON.stringify(workplacesData));
        if (worker) {
          localStorage.setItem("workers", JSON.stringify(workersData));
        }

        resolve("Data updated");
      } catch (error) {
        reject("Error : " + error);
      }
    });

    return promise;
  }
  async deleteWorkplace(workplaceId: number): Promise<IWorkPlace> {
    const promise = new Promise<IWorkPlace>((resolve, reject) => {
      const workplaces = JSON.parse(localStorage.getItem("workplaces") || "[]");
      const offices = JSON.parse(localStorage.getItem("office") || "[]");
      const index = workplaces.findIndex(
        (workplace: IWorkPlace) => workplace.workPlaceId === workplaceId
      );

      if (index !== -1) {
        const [deletedWorkplace] = workplaces.splice(index, 1);
        const office = offices.find((office: { workplacesId: number[] }) =>
          office.workplacesId.includes(workplaceId)
        );

        if (office) {
          office.workplacesId = office.workplacesId.filter(
            (id: number) => id !== workplaceId
          );
        }
        localStorage.setItem("workplaces", JSON.stringify(workplaces));
        localStorage.setItem("office", JSON.stringify(offices));

        resolve(deletedWorkplace);
      } else {
        reject(new Error("Workplace not found"));
      }
    });

    return promise;
  }

  async updateWorkplace(worker: IWorker, workplace: IWorkPlace) {
    const promise = new Promise((resolve, reject) => {
      try {
        console.log(workplace);

        const workplacesData = JSON.parse(
          localStorage.getItem("workplaces") || "[]"
        );
        const workersData = JSON.parse(localStorage.getItem("workers") || "[]");

        const workplaceIndex = workplacesData.findIndex((work: IWorkPlace) => {
          return work.workPlaceId === workplace.workPlaceId;
        });

        if (workplaceIndex !== -1) {
          const updatedWorkplace = {
            ...workplacesData[workplaceIndex],
            workerId: worker.workerId,
            equipment: workplace.equipment,
            officeWork: workplace.officeWork,
            schedule: workplace.schedule,
          };

          workplacesData[workplaceIndex] = updatedWorkplace;

          localStorage.setItem("workplaces", JSON.stringify(workplacesData));
          if (worker) {
            localStorage.setItem("workers", JSON.stringify(workersData));
          }

          resolve("Data updated");
        } else {
          reject("Workplace not found");
        }
      } catch (error) {
        reject("Error: " + error);
      }
    });

    return promise;
  }

  async freeWorkplace(workplaceId: number): Promise<IWorkPlace> {
    const promise = new Promise<IWorkPlace>((resolve, reject) => {
      const workplaces = JSON.parse(localStorage.getItem("workplaces") || "[]");
      const index = workplaces.findIndex(
        (workplace: IWorkPlace) => workplace.workPlaceId === workplaceId
      );
      if (index !== -1) {
        const updatedWorkplace = {
          ...workplaces[index],
          workerId: null,
          equipment: null,
          officeWork: false,
          schedule: null,
        };
        workplaces[index] = updatedWorkplace;
        localStorage.setItem("workplaces", JSON.stringify(workplaces));
        resolve(workplaces[index]);
      } else {
        reject(new Error("Workplace not found"));
      }
    });

    return promise;
  }

  async createNewWorker(worker: IWorker) {
    const promise = new Promise((resolve, reject) => {
      try {
        const workersData = JSON.parse(localStorage.getItem("workers") || "[]");
        workersData.push(worker);
        localStorage.setItem("workers", JSON.stringify(workersData));
        resolve("Data updated");
      } catch (error) {
        reject("Error : " + error);
      }
    });

    return promise;
  }
  async getAllWorkers(): Promise<IWorker[]> {
    const promise = new Promise<IWorker[]>((resolve, reject) => {
      const workers = JSON.parse(localStorage.getItem("workers") || "[]");
      resolve(workers);
      reject("No workers");
    });
    const data = await promise;
    return data;
  }

  async editWorker(workerEdit: IWorker): Promise<IWorker> {
    const promise = new Promise<IWorker>((resolve, reject) => {
      const workers = JSON.parse(localStorage.getItem("workers") || "[]");

      const index = workers.findIndex(
        (worker: IWorker) => worker.workerId === workerEdit.workerId
      );

      if (index !== -1) {
        workers[index] = workerEdit;
        localStorage.setItem("workers", JSON.stringify(workers));
        resolve(workerEdit);
      } else {
        reject(new Error("Worker not found"));
      }
    });

    try {
      const updatedWorker = await promise;
      return updatedWorker;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async acceptWorker(workerId: number): Promise<IWorker> {
    const promise = new Promise<IWorker>((resolve, reject) => {
      try {
        const workers = JSON.parse(localStorage.getItem("workers") || "[]");
        let workerFound = false;

        const updatedWorkers = workers.map((worker: IWorker) => {
          if (worker.workerId === workerId) {
            worker.isNew = false;
            workerFound = true;
            return worker;
          }
          return worker;
        });

        if (!workerFound) {
          reject(new Error("Worker not found"));
        } else {
          localStorage.setItem("workers", JSON.stringify(updatedWorkers));
          resolve(
            updatedWorkers.find(
              (worker: IWorker) => worker.workerId === workerId
            )
          );
        }
      } catch (error) {
        reject(new Error("Error: " + error));
      }
    });

    const data = await promise;
    return data;
  }

  async deleteWorker(workerId: number): Promise<IWorker> {
    const promise = new Promise<IWorker>((resolve, reject) => {
      const workers = JSON.parse(localStorage.getItem("workers") || "[]");
      const workplaces = JSON.parse(localStorage.getItem("workplaces") || "[]");

      const workerIndex = workers.findIndex(
        (worker: IWorker) => worker.workerId === workerId
      );
      if (workerIndex !== -1) {
        const [deletedWorker] = workers.splice(workerIndex, 1);
        localStorage.setItem("workers", JSON.stringify(workers));
        const workplaceIndex = workplaces.findIndex(
          (workplace: IWorkPlace) => workplace.workerId === workerId
        );
        if (workplaceIndex !== -1) {
          workplaces[workplaceIndex].workerId = null;
          localStorage.setItem("workplaces", JSON.stringify(workplaces));
        }
        resolve(deletedWorker);
      } else {
        reject(new Error("Worker not found"));
      }
    });

    try {
      const deletedWorker = await promise;
      return deletedWorker;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWorkersForSelect(): Promise<{ id: number; text: string }[]> {
    const promise = new Promise<{ id: number; text: string }[]>(
      (resolve, reject) => {
        const workers = JSON.parse(localStorage.getItem("workers") || "[]");

        if (workers.length > 0) {
          const workerList = workers.map(
            (worker: { workerId: number; name: string }) => ({
              id: worker?.workerId,
              text: worker?.name,
            })
          );
          resolve(workerList);
          console.log(workerList);
        } else {
          reject("No workers");
        }
      }
    );

    try {
      const data = await promise;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewOffices(officeCount: number, maxWorkplaces: number) {
    const promise = new Promise((resolve, reject) => {
      try {
        const officeData = JSON.parse(localStorage.getItem("office") || "[]");

        const maxOfficeId = officeData.reduce((maxId: number, office: any) => {
          return office.officeId > maxId ? office.officeId : maxId;
        }, 0);
        for (let i = 1; i <= officeCount; i++) {
          const newOffice = {
            officeId: maxOfficeId + i,
            workplacesId: [],
            maxWorkplaces: maxWorkplaces,
          };
          officeData.push(newOffice);
        }
        localStorage.setItem("office", JSON.stringify(officeData));

        resolve("Offices created successfully");
      } catch (error) {
        reject("Error: " + error);
      }
    });

    return promise;
  }
}
