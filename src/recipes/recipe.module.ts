import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeController, SavedRecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import {
  RecipeDetail,
  RecipeDetailSchema,
} from './schemas/recipeDetail.schema';
import { SavedRecipe, SavedRecipeSchema } from './schemas/savedRecipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recipe.name,
        schema: RecipeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: SavedRecipe.name,
        schema: SavedRecipeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: RecipeDetail.name,
        schema: RecipeDetailSchema,
      },
    ]),
  ],
  controllers: [RecipeController, SavedRecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
