import { IWorker } from "./worker.model";

export interface IOffice {
  officeId: number;
  workplacesId: Array<number>;
  maxWorkplaces: number;
}

export interface IWorkPlace {
  workPlaceId: number;
  workerId?: number;
  equipment?: string;
  officeWork: boolean;
  schedule?: {
    workDay: string;
    workStart: string;
    workEnd: string;
  };
}
