import { Movement } from "./Movement";

export type TrainingBlockMovement = Movement & {
  previous: string;
  kg: number;
  reps: number;
} 