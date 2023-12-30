import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { RecipeCreateDto } from './dto/recipe-create.dto';
import {
  SavedRecipeCreateDto,
  SavedRecipeDeleteDto,
} from './dto/save-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import { SavedRecipe } from './schemas/savedRecipe.schema';
import { RecipeDetail } from './schemas/recipeDetail.schema';
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
    name: 'name',
    required: false,
    type: String,
    description: 'Recipe name',
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
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipes(ingredients, name, page, limit);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of recipe want to get',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: Number,
    description: 'ID of user',
  })
  @ApiResponse({
    status: 200,
    description: 'The detail of recipe has been successfully retrieved.',
    type: RecipeDetail,
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong with server. Please try again later!',
  })
  getRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Query('userId') userId: number,
  ): Promise<RecipeDetail> {
    return this.recipeService.getRecipe(id, userId);
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

@ApiTags('SavedRecipe')
@Controller('saved-recipes')
export class SavedRecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiQuery({
    name: 'userId',
    required: true,
    type: Number,
    description: 'Id of user',
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
  getRecipes(@Query('userId') userId: number): Promise<Recipe[]> {
    return this.recipeService.getListSavedRecipeOfUser(userId);
  }

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'The list of recipes has been successfully retrieved.',
    type: Number,
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong with server. Please try again later!',
  })
  deleteSaveRecipe(@Body() deleteInfo: SavedRecipeDeleteDto): Promise<number> {
    return this.recipeService.deleteSavedRecipeOfUser(deleteInfo);
  }
}
