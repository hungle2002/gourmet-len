import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './schemas/recipe.schema';
import { RecipeDetail } from './schemas/recipeDetail.schema';
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
    const latestRecipe = await this.getLatestRecipe();
    const insertRecipe = { ...recipe, id: latestRecipe.id + 1 };
    const createdRecipe = new this.recipeModel(insertRecipe);
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

  async getRecipe(id: number, userId: number): Promise<RecipeDetail> {
    const recipe: Recipe = await this.recipeModel.findOne({ id }).lean().exec();
    if (userId) {
      const userSavedRecipe: SavedRecipe = await this.savedRecipeModel
        .findOne({ userId })
        .exec();
      return { ...recipe, isSaved: userSavedRecipe?.recipeIds.includes(id) };
    }
    return { ...recipe, isSaved: false };
  }

  async getLatestRecipe(): Promise<Recipe> {
    return this.recipeModel.findOne({}).sort({ id: -1 }).limit(1).exec();
  }

  async saveRecipe(recipeId: number, userId: number): Promise<SavedRecipe> {
    // find exist recipe
    const existRecipe: Recipe = await this.recipeModel.findOne({
      id: recipeId,
    });
    if (!existRecipe) {
      console.log('Recipe not found');
    }
    // find exist saved recipe
    const existSavedRecipe: SavedRecipe = await this.savedRecipeModel
      .findOne({ userId })
      .limit(1)
      .exec();
    if (!existSavedRecipe) {
      const savedRecipe = new this.savedRecipeModel({
        recipeIds: [recipeId],
        userId,
      });
      await savedRecipe.save();
      return savedRecipe;
    }
    if (existSavedRecipe.recipeIds.includes(recipeId)) {
      return existSavedRecipe;
    } else {
      existSavedRecipe.recipeIds.push(recipeId);
      await existSavedRecipe.save();
      return existSavedRecipe;
    }
  }

  async getListSavedRecipeOfUser(userId: number): Promise<Recipe[]> {
    const savedRecipe: SavedRecipe = await this.savedRecipeModel
      .findOne({ userId })
      .exec();
    if (savedRecipe.recipeIds.length === 0) {
      return [];
    }
    return this.recipeModel.find({ id: { $in: savedRecipe.recipeIds } }).exec();
  }
}
