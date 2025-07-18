import { Movement } from "./Movement";

export type TrainingBlockMovement = Movement & {
  previous: string | null;
  kg: number | null;
  reps: number | null;
  distance: number | null;
} 