import { Module } from '@nestjs/common';
import { RecipeModule } from './recipes/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(
      'mongodb+srv://hcmut:hcmut@hcmut.woarss8.mongodb.net/recipes?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
