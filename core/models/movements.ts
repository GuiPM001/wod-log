import { model, models, Schema } from "mongoose";

const MovementSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  youtubeId: { type: String, required: false, default: "" },
});

export const Movements = models.Movements || model("Movements", MovementSchema);
