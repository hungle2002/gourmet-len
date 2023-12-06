import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SavedRecipeDocument = HydratedDocument<SavedRecipe>;

@Schema()
export class SavedRecipe {
  @ApiProperty({
    description: 'The id of the user',
    example: '10',
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  recipeId: number;

  @ApiProperty({
    description: 'The id of the recipe',
    example: '100',
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  userId: number;

  @ApiProperty({
    description: 'The time saved the recipe',
  })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const SavedRecipeSchema = SchemaFactory.createForClass(SavedRecipe);
SavedRecipeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });
