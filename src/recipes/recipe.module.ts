import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { SavedRecipe, SavedRecipeSchema } from './schemas/savedRecipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    MongooseModule.forFeature([
      { name: SavedRecipe.name, schema: SavedRecipeSchema },
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
