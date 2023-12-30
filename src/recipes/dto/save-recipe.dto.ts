import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SavedRecipeCreateDto {
  @ApiProperty({
    description: 'The id of the user want to save the recipe',
    example: '10',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class SavedRecipeDeleteDto {
  @ApiProperty({
    description: 'The id of the user want to save the recipe',
    example: '10',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'The id of the recipe user want to delete',
    example: '2',
  })
  @IsNotEmpty()
  @IsNumber()
  recipeId: number;
}
