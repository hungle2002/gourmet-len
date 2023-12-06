import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SavedRecipe {
  @ApiProperty({
    description: 'The id of the user',
    example: '10',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'The id of the recipe',
    example: '100',
  })
  @IsNotEmpty()
  @IsNumber()
  recipeId: number;
}
