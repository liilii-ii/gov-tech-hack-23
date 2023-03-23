import { Helper } from "./helper.model";
import { MissionManager } from "./missionManager.model";

export interface MissionTask {
    name: string;
    description: string,
    mission: string,
    status: string,
    taskId: number,
    helper: Helper,
    missionManager: MissionManager 
  }

  