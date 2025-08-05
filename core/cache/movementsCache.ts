import { Movement } from "../types/Movement";

let movementsCache: Movement[] | null = null;

export const getCachedMovements = () => movementsCache;
export const setCachedMovements = (data: Movement[]) => {
  movementsCache = data;
};