import { Helper } from "./helper.model";
import { MissionManager } from "./missionManager.model";

export interface MissionTask {
    Name: string,
    Description: string,
    Mission: string,
    Status: number,
    TaskId: number,
    Helper?: Helper,
    MissionManager?: MissionManager,
    id: string
  }

  