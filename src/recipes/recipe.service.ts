import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './schemas/recipe.schema';
import { SavedRecipe } from './schemas/savedRecipe.schema';
import { RecipeCreateDto } from './dto/recipe-create.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name)
    private recipeModel: Model<Recipe>,
    @InjectModel(SavedRecipe.name)
    private savedRecipeModel: Model<SavedRecipe>,
  ) {}

  async create(recipe: RecipeCreateDto): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(recipe);
    return createdRecipe.save();
  }

  async getRecipes(
    ingredients?: string,
    name?: string,
    page: number = 1,
    limit: number = 5,
  ): Promise<Recipe[]> {
    const skip = (page - 1) * limit;

    return this.recipeModel
      .find({
        ...(ingredients
          ? {
              ingredients: {
                $elemMatch: {
                  name: {
                    // Split the ingredients string into an array
                    $in: ingredients?.split(','),
                  },
                },
              },
            }
          : undefined),
        ...(name ? { name: { $regex: name, $options: 'i' } } : undefined),
      })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async saveRecipe(recipeId: number, userId: number): Promise<SavedRecipe> {
    const savedRecipe = new this.savedRecipeModel({ recipeId, userId });
    await savedRecipe.save();
    // return 'Save recipe ' + savedRecipe.id + ' for user ' + savedRecipe.userId;
    return savedRecipe;
  }
}
