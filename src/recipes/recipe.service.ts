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
    page: number = 1,
    limit: number = 5,
  ): Promise<Recipe[]> {
    const skip = (page - 1) * limit;
    // Handle no ingredients passed in
    if (!ingredients) {
      return this.recipeModel.find().skip(skip).limit(limit).exec();
    }

    // Split the ingredients string into an array
    const ingredientsList = ingredients.split(',');
    return this.recipeModel
      .find({
        ingredients: {
          $elemMatch: {
            name: {
              $in: ingredientsList,
            },
          },
        },
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
