import { IQuantification } from './quantification.interface';
// import { IReview } from './review.interface';

export interface ISaveRecipe {
  userId: number;
  recipeId: number;
}

export interface IRecipe {
  id: number;
  name: string;
  description?: string;
  steps: string[];
  ingredients: IQuantification[];
  nutrition: IQuantification[];
  cookingTime: number;
  servings: number;
}
