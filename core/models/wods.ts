import { model, models, Schema } from "mongoose";

const MovementSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    youtubeId: { type: String, required: false, default: "" },
    kg: { type: Number, required: false, default: null },
    reps: { type: Number, required: false, default: null },
    distance: { type: Number, required: false, default: null },
    previous: { type: String, required: false, default: null },
  },
  { _id: false }
);

const TrainingBlockSchema = new Schema(
  {
    type: { type: Number, required: true },
    time: { type: Number, required: true },
    rounds: { type: Number, required: true },
    movements: {
      type: [MovementSchema],
      required: true,
      default: [],
    },
  },
  { _id: false }
);

const Wodschema = new Schema({
  date: { type: String, required: true },
  trainingBlocks: {
    type: [TrainingBlockSchema],
    required: true,
    default: [],
  },
});

export const Wods = models.Wods || model("Wods", Wodschema);
