import { Helper } from "./helper.model";
import { MissionManager } from "./missionManager.model";

export interface MissionTask {
    Name: string,
    Description: string,
    Mission: string,
    StatusId: number,
    TaskId: number,
    SpecialInfo: string,
    Helper?: Helper,
    MissionManager?: MissionManager,
    id?: string
  }

  