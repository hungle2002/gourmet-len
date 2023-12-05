import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SavedRecipeDocument = HydratedDocument<SavedRecipe>;

@Schema()
export class SavedRecipe {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  userId: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SavedRecipeSchema = SchemaFactory.createForClass(SavedRecipe);
SavedRecipeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });
