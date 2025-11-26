import React from 'react';
import { Clock, Users, Heart } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, onToggleFavorite, isFavorite }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-stone-100"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 p-3">
          <button 
            onClick={onToggleFavorite}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isFavorite 
                ? 'bg-angola-red/90 text-white' 
                : 'bg-white/70 text-stone-600 hover:bg-white hover:text-angola-red'
            }`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
           <span className="text-xs font-semibold text-white bg-angola-palm px-2 py-1 rounded-md uppercase tracking-wide">
             {recipe.category}
           </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-xl font-bold text-stone-800 mb-2 truncate group-hover:text-angola-palm transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between text-stone-500 text-sm mt-3">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings} pes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;