export interface Ingredient {
  name: string;
  amount: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  rating: number; // 1-5
  date: string;
}

export type Category = 
  | 'Estufados / Moambas' 
  | 'Peixes / Mariscos' 
  | 'Acompanhamentos' 
  | 'Sobremesas' 
  | 'Petiscos' 
  | 'Bebidas';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: Category;
  prepTime: string; // e.g., "45 min"
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
  region?: string;
  isVegetarian?: boolean;
  history?: string; // AI generated context
  rating: number;
  reviews: number;
  comments: Comment[];
  price?: string; // Estimated cost level
}

export type ViewState = 'HOME' | 'EXPLORE' | 'DETAIL' | 'SHOPPING_LIST' | 'ADD_RECIPE' | 'PROFILE' | 'PREMIUM_GATE';

export interface User {
  name: string;
  isPremium: boolean;
  favorites: string[]; // Recipe IDs
}