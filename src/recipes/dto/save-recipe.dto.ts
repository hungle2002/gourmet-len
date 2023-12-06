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
