import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { IQuantification } from 'src/recipes/interfaces/quantification.interface';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({ auto: true })
  id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([String])
  steps: string[];

  @Prop(Object)
  ingredients: IQuantification[];

  @Prop(Object)
  nutrition: IQuantification[];

  @Prop({ required: true })
  cookingTime: number;

  @Prop({ required: true })
  servings: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
