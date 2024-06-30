import { IWorker } from "./worker.model";

export interface IOffice {
  officeId: number;
  workplacesId: Array<number>;
}

export interface IWorkPlace {
  workPlaceId: number;
  workerId: number | null;
  equipment: string | null;
  officeWork: boolean;
  schedule: string | null;
}
