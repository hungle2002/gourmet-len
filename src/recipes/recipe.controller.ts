import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { RecipeCreateDto } from './dto/recipe-create.dto';
import { SavedRecipeCreateDto } from './dto/save-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import { SavedRecipe } from './schemas/savedRecipe.schema';
@ApiTags('Recipe')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Recipe,
  })
  @ApiResponse({
    status: 400,
    description: 'Can not create recipe',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong with server. Please try again later!',
  })
  async create(@Body() recipe: RecipeCreateDto): Promise<Recipe> {
    const createdRecipe = await this.recipeService.create(recipe);
    return createdRecipe;
  }

  @Get()
  @ApiQuery({
    name: 'ingredients',
    required: false,
    type: String,
    description: 'Comma separated list of ingredients',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of recipes has been successfully retrieved.',
    type: [Recipe],
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong with server. Please try again later!',
  })
  getRecipes(
    @Query('ingredients') ingredients: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipes(ingredients, page, limit);
  }

  @Post(':id/save')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of recipe want to save',
  })
  @ApiResponse({
    status: 201,
    description: 'Save recipe for user successfully.',
    type: SavedRecipe,
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong with server. Please try again later!',
  })
  saveRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() userInfo: SavedRecipeCreateDto,
  ): Promise<SavedRecipe> {
    return this.recipeService.saveRecipe(id, userInfo.userId);
  }
}
