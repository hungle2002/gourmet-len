import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { IRecipe } from './interfaces/recipe.interface';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() recipe: IRecipe): Promise<number> {
    const createdRecipe = await this.recipeService.create(recipe);
    return createdRecipe._id;
  }

  @Get()
  getRecipes(
    @Query('ingredients') ingredients: string,
    @Query('page') page: number,
    @Query('page') limit: number,
  ): Promise<IRecipe[]> {
    return this.recipeService.getRecipes(ingredients, page, limit);
  }

  @Post(':id/save')
  saveRecipe(
    @Param('id') id: number,
    @Body('userId') userId: number,
  ): Promise<string> {
    return this.recipeService.saveRecipe(id, userId);
  }
}
