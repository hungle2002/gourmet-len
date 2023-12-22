import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SavedRecipeDocument = HydratedDocument<SavedRecipe>;

@Schema()
export class SavedRecipe {
  save() {
    throw new Error('Method not implemented.');
  }
  @ApiProperty({
    description: 'The list id of the recipe',
    example: [1, 2, 3],
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  recipeIds: number[];

  @ApiProperty({
    description: 'The id of the user',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ unique: true, required: true, default: 1 })
  userId: number;
}

export const SavedRecipeSchema = SchemaFactory.createForClass(SavedRecipe);
