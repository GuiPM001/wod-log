import { Movement } from "./Movement";

export type TrainingBlock = {
  type: string;
  time: number;
  rounds: number;
  movements: TrainingBlockMovement[];
};

export type TrainingBlockMovement = Movement & {
  previous: string;
  kg: number;
  reps: number;
} 