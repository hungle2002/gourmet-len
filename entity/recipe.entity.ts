import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Quantity } from '../src/recipes/dto/recipe-create.dto';

export class Recipe {
  @ApiProperty({
    description: 'The id of the Recipe',
    example: '1',
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'The name of the Recipe',
    example: 'Spaghetti',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the Recipe',
    example: 'France food with special ingredient and typical taste',
  })
  description: string;

  @ApiProperty({
    description: 'The steps of the Recipe',
    example: ['1. Cut the meat', '2. Cook the meat', '3. Serve the meat'],
  })
  @IsNotEmpty()
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
  nutrition: Quantity[];

  @ApiProperty({
    description: 'The estimated cooking time of the Recipe in minutes',
    example: '60',
  })
  @IsNotEmpty()
  @IsNumber()
  cookingTime: number;

  @ApiProperty({
    description: 'The number of servings of the Recipe',
    example: '60',
  })
  @IsNotEmpty()
  @IsNumber()
  servings: number;
}
