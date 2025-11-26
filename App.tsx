import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Home, 
  Compass, 
  ShoppingBag, 
  PlusCircle, 
  Menu, 
  X, 
  ArrowLeft, 
  Clock, 
  Users, 
  MapPin, 
  Leaf, 
  Star, 
  Check, 
  Trash2,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import { INITIAL_RECIPES, CATEGORIES } from './constants';
import { Recipe, ViewState, User, Ingredient, Category } from './types';
import RecipeCard from './components/RecipeCard';
import { getCulturalContext, suggestWinePairing } from './services/geminiService';

const App: React.FC = () => {
  // State
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [user, setUser] = useState<User>({ name: 'Visitante', isPremium: false, favorites: [] });
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [culturalInfo, setCulturalInfo] = useState<string>('');
  const [winePairing, setWinePairing] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Derived State
  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todas' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoritesList = recipes.filter(r => user.favorites.includes(r.id));

  // Handlers
  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setUser(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id) 
        ? prev.favorites.filter(fid => fid !== id)
        : [...prev.favorites, id]
    }));
  };

  const addToShoppingList = (ingredients: Ingredient[]) => {
    setShoppingList(prev => [...prev, ...ingredients]);
    alert(`${ingredients.length} ingredientes adicionados à lista!`);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCulturalInfo(''); // Reset AI info
    setWinePairing('');
    setCurrentView('DETAIL');
  };

  const handleAIClick = async () => {
    if (!selectedRecipe) return;
    setIsLoadingAI(true);
    const context = await getCulturalContext(selectedRecipe.title);
    const pairing = await suggestWinePairing(selectedRecipe.title, selectedRecipe.ingredients.map(i => i.name));
    setCulturalInfo(context);
    setWinePairing(pairing);
    setIsLoadingAI(false);
  };

  const handlePremiumUpgrade = () => {
    // Simulate payment process
    const confirmed = window.confirm("Simulação: Confirmar pagamento de 2.000 Kz para desbloquear o Modo Criador?");
    if (confirmed) {
      setUser(prev => ({ ...prev, isPremium: true }));
      alert("Pagamento confirmado! Bem-vindo ao Sabor Angolano Premium.");
      setCurrentView('ADD_RECIPE');
    }
  };

  // Render Helpers
  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentView('HOME')}
          >
            <div className="w-8 h-8 bg-angola-red rounded-full flex items-center justify-center text-white font-serif font-bold">S</div>
            <h1 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
              Sabor<span className="text-angola-red">Angolano</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setCurrentView('HOME')} 
              className={`text-sm font-medium transition-colors ${currentView === 'HOME' ? 'text-angola-red' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setCurrentView('EXPLORE')} 
              className={`text-sm font-medium transition-colors ${currentView === 'EXPLORE' ? 'text-angola-red' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Explorar
            </button>
            <button 
              onClick={() => setCurrentView('SHOPPING_LIST')} 
              className={`text-sm font-medium transition-colors ${currentView === 'SHOPPING_LIST' ? 'text-angola-red' : 'text-stone-500 hover:text-stone-900'}`}
            >
              Lista ({shoppingList.length})
            </button>
          </nav>

          {/* User / Add Button */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => user.isPremium ? setCurrentView('ADD_RECIPE') : setCurrentView('PREMIUM_GATE')}
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              {user.isPremium ? <PlusCircle size={16} /> : <Lock size={16} />}
              {user.isPremium ? 'Criar Receita' : 'Modo Chef'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-stone-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <button 
              onClick={() => { setCurrentView('HOME'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Início
            </button>
            <button 
              onClick={() => { setCurrentView('EXPLORE'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Explorar
            </button>
            <button 
              onClick={() => { setCurrentView('SHOPPING_LIST'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Lista de Compras
            </button>
             <button 
              onClick={() => { user.isPremium ? setCurrentView('ADD_RECIPE') : setCurrentView('PREMIUM_GATE'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-angola-red hover:bg-red-50 rounded-md"
            >
              {user.isPremium ? 'Adicionar Receita' : 'Desbloquear Premium'}
            </button>
          </div>
        </div>
      )}
    </header>
  );

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white h-[400px] flex items-center">
        <img 
          src="https://picsum.photos/1200/800?random=10" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Angolan Food Spread"
        />
        <div className="relative z-10 p-8 md:p-16 max-w-2xl">
          <span className="text-angola-yellow font-medium tracking-wider uppercase text-sm mb-2 block">Gastronomia Autêntica</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            Descubra a Alma de <br/>
            <span className="text-angola-yellow">Angola</span> no Prato
          </h2>
          <p className="text-stone-200 mb-8 text-lg">
            De Cabinda ao Cunene, explore as receitas que contam a história do nosso povo.
          </p>
          <button 
            onClick={() => setCurrentView('EXPLORE')}
            className="bg-angola-red text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors inline-flex items-center gap-2"
          >
            Começar a Cozinhar <ArrowLeft className="rotate-180" size={18} />
          </button>
        </div>
      </div>

      {/* Featured Categories */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-2xl font-serif font-bold text-stone-900">Categorias Populares</h3>
          <button onClick={() => setCurrentView('EXPLORE')} className="text-angola-red font-medium text-sm hover:underline">Ver todas</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 4).map(cat => (
            <div 
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentView('EXPLORE'); }}
              className="bg-stone-100 hover:bg-stone-200 transition-colors rounded-xl p-6 text-center cursor-pointer h-32 flex flex-col items-center justify-center gap-2"
            >
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-angola-palm">
                 {cat.includes('Peixe') ? '🐟' : cat.includes('Doce') ? '🍰' : cat.includes('Estufado') ? '🍲' : '🍹'}
               </div>
               <span className="font-medium text-stone-800">{cat.split('/')[0]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Favorites Preview */}
      {favoritesList.length > 0 && (
        <section>
           <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Seus Favoritos</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritesList.slice(0, 3).map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => handleRecipeClick(recipe)}
                onToggleFavorite={(e) => toggleFavorite(e, recipe.id)}
                isFavorite={true}
              />
            ))}
           </div>
        </section>
      )}
    </div>
  );

  const renderExplore = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Explorar Receitas</h2>
          <p className="text-stone-500">Encontre o prato perfeito para hoje.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar (ex: Funge, Peixe)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-angola-red/20 focus:border-angola-red"
            />
          </div>
        </div>
      </div>

      {/* Categories Filter Scrollable */}
      <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('Todas')}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
            selectedCategory === 'Todas' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Todas
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === cat ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map(recipe => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={() => handleRecipeClick(recipe)}
            onToggleFavorite={(e) => toggleFavorite(e, recipe.id)}
            isFavorite={user.favorites.includes(recipe.id)}
          />
        ))}
        {filteredRecipes.length === 0 && (
          <div className="col-span-full text-center py-20 text-stone-400">
            <p className="text-lg">Nenhuma receita encontrada.</p>
            <button onClick={() => {setSearchQuery(''); setSelectedCategory('Todas');}} className="text-angola-red underline mt-2">Limpar filtros</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedRecipe) return null;
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentView('EXPLORE')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6"
        >
          <ArrowLeft size={18} /> Voltar para Explorar
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          {/* Header Image */}
          <div className="h-[300px] md:h-[400px] relative">
            <img 
              src={selectedRecipe.imageUrl} 
              alt={selectedRecipe.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <span className="bg-angola-palm/90 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                {selectedRecipe.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{selectedRecipe.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm font-medium opacity-90">
                <span className="flex items-center gap-1"><Clock size={16} /> {selectedRecipe.prepTime}</span>
                <span className="flex items-center gap-1"><Users size={16} /> {selectedRecipe.servings} porções</span>
                {selectedRecipe.region && <span className="flex items-center gap-1"><MapPin size={16} /> {selectedRecipe.region}</span>}
                {selectedRecipe.isVegetarian && <span className="flex items-center gap-1 text-green-300"><Leaf size={16} /> Vegetariano</span>}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 grid md:grid-cols-[1fr_300px] gap-10">
            {/* Main Content */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-angola-red inline-block"></span>
                  Ingredientes
                </h3>
                <ul className="space-y-3">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center justify-between py-2 border-b border-stone-50 text-stone-700">
                      <span>{ing.name}</span>
                      <span className="font-semibold text-stone-400">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => addToShoppingList(selectedRecipe.ingredients)}
                  className="mt-6 w-full py-3 border border-stone-200 rounded-xl text-stone-600 font-medium hover:bg-stone-50 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} /> Adicionar à Lista de Compras
                </button>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                   <span className="w-8 h-1 bg-angola-yellow inline-block"></span>
                   Modo de Preparo
                </h3>
                <div className="space-y-6">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 text-stone-600 font-bold flex items-center justify-center text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-stone-700 leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Cultural Section */}
              <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                 <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-angola-palm" size={20} />
                    <h3 className="font-serif font-bold text-lg text-stone-800">Curiosidades & Cultura (IA)</h3>
                 </div>
                 
                 {!culturalInfo ? (
                   <button 
                    onClick={handleAIClick}
                    disabled={isLoadingAI}
                    className="text-sm bg-white border border-stone-200 px-4 py-2 rounded-lg hover:shadow-sm transition-all flex items-center gap-2"
                   >
                     {isLoadingAI ? 'Consultando a história...' : 'Descobrir Origem & Harmonização'}
                   </button>
                 ) : (
                   <div className="space-y-4 animate-fadeIn">
                     <p className="text-stone-600 text-sm leading-relaxed italic border-l-2 border-angola-palm pl-4">
                       "{culturalInfo}"
                     </p>
                     {winePairing && (
                       <div className="text-sm text-stone-600 bg-white p-3 rounded-lg border border-stone-200">
                         <strong className="text-angola-red block mb-1">Dica de Bebida:</strong>
                         {winePairing}
                       </div>
                     )}
                   </div>
                 )}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-stone-50 p-6 rounded-2xl">
                 <h4 className="font-bold text-stone-800 mb-2">Classificação</h4>
                 <div className="flex items-center gap-2 mb-2">
                   <div className="flex text-angola-yellow">
                     {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                   </div>
                   <span className="font-bold text-lg">{selectedRecipe.rating}</span>
                 </div>
                 <p className="text-sm text-stone-500">{selectedRecipe.reviews} avaliações</p>
              </div>

              <div className="bg-stone-50 p-6 rounded-2xl">
                 <h4 className="font-bold text-stone-800 mb-2">Preço Estimado</h4>
                 <div className="text-2xl font-serif text-stone-400">
                   <span className={selectedRecipe.price?.length && selectedRecipe.price.length >= 1 ? 'text-stone-900' : ''}>$</span>
                   <span className={selectedRecipe.price?.length && selectedRecipe.price.length >= 2 ? 'text-stone-900' : ''}>$</span>
                   <span className={selectedRecipe.price?.length && selectedRecipe.price.length >= 3 ? 'text-stone-900' : ''}>$</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderShoppingList = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 flex items-center gap-3">
        <ShoppingBag size={32} /> Lista de Compras
      </h2>
      
      {shoppingList.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
          <ShoppingBag size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500 text-lg">Sua lista está vazia.</p>
          <button 
            onClick={() => setCurrentView('EXPLORE')}
            className="mt-4 text-angola-red font-medium hover:underline"
          >
            Adicionar ingredientes de receitas
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-stone-200 rounded-2xl overflow-hidden">
          {shoppingList.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b border-stone-100 last:border-0 hover:bg-stone-50">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-5 h-5 rounded border-stone-300 text-angola-red focus:ring-angola-red" />
                <span className="text-lg text-stone-800">{item.name}</span>
              </div>
              <span className="text-stone-500 font-mono text-sm">{item.amount}</span>
            </div>
          ))}
          <div className="p-4 bg-stone-50 flex justify-end">
            <button 
              onClick={() => setShoppingList([])}
              className="text-red-500 text-sm font-medium hover:text-red-700 flex items-center gap-1"
            >
              <Trash2 size={16} /> Limpar Lista
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPremiumGate = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="inline-block p-4 rounded-full bg-stone-100 mb-6">
        <Lock size={48} className="text-stone-400" />
      </div>
      <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Modo Chef Criador</h2>
      <p className="text-xl text-stone-600 mb-8 max-w-xl mx-auto">
        Para contribuir com a comunidade Sabor Angolano, adicionar suas próprias receitas e criar coleções privadas, torne-se um membro Premium.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-left">
          <h4 className="font-bold text-lg mb-2">Gratuito</h4>
          <ul className="space-y-2 text-stone-600 mb-6">
            <li className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Acesso a todas as receitas</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Lista de compras</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Favoritos</li>
          </ul>
          <button onClick={() => setCurrentView('HOME')} className="w-full py-2 border border-stone-300 rounded-lg">Continuar Grátis</button>
        </div>
        <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-xl text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-angola-yellow text-black text-xs font-bold px-2 py-1">POPULAR</div>
          <h4 className="font-bold text-lg mb-2">Premium</h4>
          <ul className="space-y-2 text-stone-300 mb-6">
            <li className="flex items-center gap-2"><Check size={16} className="text-angola-yellow"/> Tudo do Gratuito</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-angola-yellow"/> Publicar Receitas</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-angola-yellow"/> Destaque na Comunidade</li>
          </ul>
          <button 
            onClick={handlePremiumUpgrade}
            className="w-full py-2 bg-angola-red rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Assinar por 2.000 Kz
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddRecipe = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Nova Receita</h2>
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Receita enviada para revisão!"); setCurrentView('HOME'); }}>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Nome do Prato</label>
          <input required type="text" className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-angola-red/50 outline-none" placeholder="Ex: Calulu de Carne Seca" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Categoria</label>
            <select className="w-full p-3 rounded-lg border border-stone-200 outline-none">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Tempo (min)</label>
            <input required type="text" className="w-full p-3 rounded-lg border border-stone-200 outline-none" placeholder="45" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Descrição</label>
          <textarea rows={3} className="w-full p-3 rounded-lg border border-stone-200 outline-none" placeholder="Conte um pouco sobre este prato..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Ingredientes (um por linha)</label>
          <textarea required rows={5} className="w-full p-3 rounded-lg border border-stone-200 outline-none font-mono text-sm" placeholder="1kg Carne&#10;2 Cebolas&#10;Sal a gosto" />
        </div>

        <button type="submit" className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors">
          Publicar Receita
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {renderHeader()}
      <main className="animate-fade-in">
        {currentView === 'HOME' && renderHome()}
        {currentView === 'EXPLORE' && renderExplore()}
        {currentView === 'DETAIL' && renderDetail()}
        {currentView === 'SHOPPING_LIST' && renderShoppingList()}
        {currentView === 'PREMIUM_GATE' && renderPremiumGate()}
        {currentView === 'ADD_RECIPE' && renderAddRecipe()}
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif text-white mb-4">Sabor Angolano</h2>
          <p className="mb-8">Celebrando a cultura gastronómica de Angola, prato a prato.</p>
          <div className="text-sm">
            &copy; 2024 Sabor Angolano. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;