import { Injectable } from '@nestjs/common';
import { IRecipe } from './interfaces/recipe.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async create(recipe: IRecipe): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(recipe);
    return createdRecipe.save();
  }

  getRecipes(ingredients?: string): string {
    if (!ingredients) {
      return 'No ingredients provided';
    }
    // get list of ingredients
    const ingredientsList = ingredients.split(',');
    return 'List recipes: ' + ingredientsList.join(', ');
  }

  saveRecipe(recipeId: number, userId: number): string {
    return 'Save recipe ' + recipeId + ' for user ' + userId;
  }
}
