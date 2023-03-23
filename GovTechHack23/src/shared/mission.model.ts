import { MissionManager } from 'src/shared/missionManager.model';
export interface Mission {
  Name: string,
  Status: number,
  MissionId: number,
  id: string,
  MissionManager?: MissionManager
}
