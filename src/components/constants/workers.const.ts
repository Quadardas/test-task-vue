import { IWorker } from "../models/worker.model";
export const WORKERS: Array<IWorker> = [
  {
    workerId: 1,
    name: "Иванов Иван Иванович",
    workerRole: "admin",
    birthday: new Date(1995, 6, 2),
    accessCode: "MTIzNDU2",
  },
  {
    workerId: 2,
    name: "Петров Виктор Валентинович",
    workerRole: "worker",
    birthday: new Date(1987, 1, 11),
    accessCode: "MjM0NTY3",
  },
  {
    workerId: 3,
    name: "Сидоров Терентий Викторович",
    workerRole: "worker",
    birthday: new Date(1989, 6, 10),
    accessCode: "MzQ1Njc4",
  },
  {
    workerId: 4,
    name: "Иванов Андрей Петрович",
    workerRole: "worker",
    birthday: new Date(1993, 2, 24),
    accessCode: "NDU2NDU2",
  },
  {
    workerId: 5,
    name: "Шишкин Александр Александрович",
    workerRole: "worker",
    birthday: new Date(2001, 5, 9),
    accessCode: "NTY3NTY3",
  },
  {
    workerId: 6,
    name: "Жмышенко Валерий Альбертович",
    workerRole: "worker",
    birthday: new Date(1992, 12, 31),
    accessCode: "Njc4Njc4",
  },
];
