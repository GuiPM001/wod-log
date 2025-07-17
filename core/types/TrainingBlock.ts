import { TrainingBlockType } from "../enums/TrainingBlockType";
import { TrainingBlockMovement } from "./TrainingBlockMovement";

export type TrainingBlock = {
  type: TrainingBlockType;
  time: number;
  rounds: number;
  movements: TrainingBlockMovement[];
};