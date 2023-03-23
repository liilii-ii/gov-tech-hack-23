export enum States {
  Assigned,
  Pending,
  Started,
  Aborted,
  Finished,
}

export interface StatesModel {
  id: number;
  text: string;
}
