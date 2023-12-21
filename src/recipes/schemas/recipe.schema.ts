import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Quantity } from '../dto/recipe-create.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @ApiProperty({
    description: 'The id of the Recipe',
    example: '1',
  })
  @IsNotEmpty()
  @Prop({ unique: true, required: true, default: 1 })
  id: number;

  @ApiProperty({
    description: 'The name of the Recipe',
    example: 'Spaghetti',
  })
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the Recipe',
    example: 'France food with special ingredient and typical taste',
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'The illustration of the Recipe',
    example:
      'https://kurio-img.kurioapps.com/21/06/22/6c8221eb-f08d-4309-9e3c-8c1319a9b411.jpe',
  })
  @IsNotEmpty()
  @Prop(String)
  image: string;

  @ApiProperty({
    description: 'The steps of the Recipe',
    example: ['1. Cut the meat', '2. Cook the meat', '3. Serve the meat'],
  })
  @IsNotEmpty()
  @Prop([String])
  steps: string[];

  @ApiProperty({
    description: 'The ingredients of the Recipe',
    example: [
      { name: 'Meat', amount: 1.5, unit: 'kg' },
      { name: 'Oil', amount: 0.5, unit: 'tbsp' },
      { name: 'Salt', amount: 1, unit: 'tsp' },
    ],
  })
  @IsNotEmpty()
  @Prop(Object)
  ingredients: Quantity[];

  @ApiProperty({
    description: 'The nutrition of the Recipe',
    example: [
      { name: 'Calories', amount: 459, unit: 'kcal' },
      { name: 'Total Fat', amount: 20, unit: 'g' },
      { name: 'Sodium', amount: 500, unit: 'mg' },
    ],
  })
  @IsNotEmpty()
  @Prop(Object)
  nutrition: Quantity[];

  @ApiProperty({
    description: 'The estimated cooking time of the Recipe in minutes',
    example: '60',
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  cookingTime: number;

  @ApiProperty({
    description: 'The number of servings of the Recipe',
    example: '60',
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  servings: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
