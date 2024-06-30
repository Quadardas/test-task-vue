import { IOffice, IWorkPlace } from "../models/office.model";
import { ref } from "vue";

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

  public async getWorkPlaces(officeId: number): Promise<IWorkPlace[]> {
    const promise = new Promise<IWorkPlace[]>((resolve, reject) => {
      const officeData = JSON.parse(localStorage.getItem("office") || "[]");
      const workplacesData = JSON.parse(
        localStorage.getItem("workplaces") || "[]"
      );
      const office = officeData.find(
        (office: IOffice) => office.officeId === officeId
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
    return data;
  }

  public get() {
    return new Promise((resolve, reject) => {});
  }
}
