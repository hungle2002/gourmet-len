import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { IRecipe, ISaveRecipe } from './interfaces/recipe.interface';
import { ObjectId } from 'mongoose';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() recipe: IRecipe): Promise<ObjectId> {
    const createdRecipe = await this.recipeService.create(recipe);
    return createdRecipe.id;
  }

  @Get()
  getRecipes(@Query('ingredients') ingredients: string): string {
    return this.recipeService.getRecipes(ingredients);
  }

  @Post('save')
  saveRecipe(@Body() saveRecipe: ISaveRecipe): string {
    const { userId, recipeId } = saveRecipe;
    return this.recipeService.saveRecipe(userId, recipeId);
  }
}
