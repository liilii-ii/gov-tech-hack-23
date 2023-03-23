import { Helper } from "./helper.model";
import { MissionManager } from "./missionManager.model";

export interface MissionTask {
    Name: string;
    Description: string,
    Mission: string,
    Status: string,
    Helper: Helper,
    MissionManager: MissionManager 
  }

  