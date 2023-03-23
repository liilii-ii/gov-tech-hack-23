export enum States {
  Assigned,
  Accepted,
  Started,
  Aborted,
  Finished,
}

export interface StatesModel {
  id: number;
  text: string;
}
