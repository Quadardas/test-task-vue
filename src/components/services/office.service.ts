import { IOffice, IWorkPlace } from "../models/office.model";
import { ref } from "vue";
import { IWorker } from "../models/worker.model";

export class Office {
  private cabinets = ref<Array<IOffice>>([]);

  public get getOffices(): Array<IOffice> {
    return this.cabinets.value;
  }
  constructor() {
    this.initOffices();
  }

  public initOffices(): void {
    const officesFromLS = localStorage.getItem("office");
    if (officesFromLS) {
      this.cabinets.value = JSON.parse(officesFromLS);
    }
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
  public async getWorkPlaces(officeId: number): Promise<IWorkPlace[]> {
    //console.log(officeId, "это гет воркплейс");

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
    // console.log("aboba");

    return data;
  }

  public async getWorker(workplaceId: number): Promise<IWorker[]> {
    const promise = new Promise<IWorker[]>((resolve, reject) => {
      const workplacesData = JSON.parse(
        localStorage.getItem("workplaces") || "[]"
      );
      const workersData = JSON.parse(localStorage.getItem("workers") || "[]");
      const workplace = workplacesData.find(
        (workplace: any) => workplace.workPlaceId === workplaceId
      );
      if (!workplace) {
        reject(new Error(`Workplace with id ${workplaceId} not found`));
        return;
      }
      const workers = workersData.filter(
        (worker: any) => worker.workerId === workplace.workerId
      );
      resolve(workers);
    });

    const data = await promise;
    return data;
  }

  async getLastWorkplaceId(): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      const workplaces = JSON.parse(localStorage.getItem("workplaces") || "[]");
      if (workplaces) {
        const lastWorkplace = workplaces[workplaces.length - 1];
        resolve(lastWorkplace.workPlaceId);
      } else {
        reject("No workplaces found");
      }
    });
    const data = await promise;
    return data;
  }

  async getLastWorkerId(): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      const workers = JSON.parse(localStorage.getItem("workers") || "[]");
      if (workers) {
        const lastWorker = workers[workers.length - 1];
        resolve(lastWorker.workerId);
      } else {
        reject("No workers found");
      }
    });
    const data = await promise;
    // console.log(data, "это промис");

    return data;
  }
}
