export enum TrainingBlockType {
  AMRAP = 0,
  EMOM = 1,
  RFT = 2,
  ForTime = 3,
  Strength = 4,
  Skill = 5
}

export const trainingBlockLabels: Record<TrainingBlockType, string> = {
  [TrainingBlockType.AMRAP]: 'AMRAP',
  [TrainingBlockType.EMOM]: 'EMOM',
  [TrainingBlockType.RFT]: 'RFT',
  [TrainingBlockType.ForTime]: 'For Time',
  [TrainingBlockType.Strength]: 'Strength',
  [TrainingBlockType.Skill]: 'Skill',
};