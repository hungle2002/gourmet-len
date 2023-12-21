import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Quantity {
  name: string;
  amount: number;
  unit: string;
}

export class RecipeCreateDto {
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
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The illustration of the Recipe',
    example:
      'https://kurio-img.kurioapps.com/21/06/22/6c8221eb-f08d-4309-9e3c-8c1319a9b411.jpe',
  })
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'The rate of the Recipe',
    example: 5,
  })
  @IsNotEmpty()
  rate: number;

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
