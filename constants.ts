import { Recipe, Category } from './types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Muamba de Galinha',
    description: 'Um dos pratos mais emblemáticos de Angola. Estufado rico feito com óleo de palma e quiabos.',
    category: 'Estufados / Moambas',
    prepTime: '90 min',
    servings: 4,
    ingredients: [
      { name: 'Galinha cortada em pedaços', amount: '1 kg' },
      { name: 'Óleo de palma', amount: '200 ml' },
      { name: 'Quiabos', amount: '300 g' },
      { name: 'Cebolas', amount: '2 grandes' },
      { name: 'Dentes de alho', amount: '4' },
      { name: 'Abóbora', amount: '200 g' },
      { name: 'Jindungo (malagueta)', amount: 'a gosto' }
    ],
    instructions: [
      'Tempere a galinha com alho, sal e limão.',
      'Refogue a cebola no óleo de palma até alourar.',
      'Adicione a galinha e deixe cozinhar lentamente.',
      'Junte a abóbora e os quiabos limpos.',
      'Deixe apurar o molho até ficar espesso (a muamba).',
      'Sirva com funge de milho ou mandioca.'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    region: 'Luanda / Norte',
    isVegetarian: false,
    rating: 4.8,
    reviews: 124,
    comments: [],
    price: '$$'
  },
  {
    id: '2',
    title: 'Funge de Mandioca',
    description: 'A base da alimentação angolana. Uma massa suave feita de farinha de mandioca.',
    category: 'Acompanhamentos',
    prepTime: '30 min',
    servings: 4,
    ingredients: [
      { name: 'Farinha de bombó (mandioca)', amount: '500 g' },
      { name: 'Água', amount: '1 L' },
      { name: 'Sal', amount: 'a gosto' }
    ],
    instructions: [
      'Aqueça a água até ferver em uma panela grande.',
      'Retire uma xícara de água quente e reserve.',
      'Vá adicionando a farinha aos poucos, mexendo vigorosamente com o murná (pau de funge).',
      'Bata a massa contra as paredes da panela para desfazer grumos.',
      'Se necessário, adicione a água reservada até obter a consistência desejada.',
      'Sirva quente com o estufado de sua preferência.'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    region: 'Nacional',
    isVegetarian: true,
    rating: 4.5,
    reviews: 89,
    comments: [],
    price: '$'
  },
  {
    id: '3',
    title: 'Calulu de Peixe',
    description: 'Peixe seco e fresco cozinhado com folhas de batata doce ou jimboa.',
    category: 'Peixes / Mariscos',
    prepTime: '60 min',
    servings: 5,
    ingredients: [
      { name: 'Peixe seco (corvina ou garoupa)', amount: '500 g' },
      { name: 'Peixe fresco', amount: '500 g' },
      { name: 'Folhas de batata doce ou jimboa', amount: '1 maço' },
      { name: 'Quiabos', amount: '10' },
      { name: 'Tomates', amount: '3' },
      { name: 'Óleo de palma', amount: '150 ml' },
      { name: 'Beringela', amount: '1' }
    ],
    instructions: [
      'Demolhe o peixe seco antecipadamente.',
      'Numa panela, faça camadas com os peixes, as folhas lavadas, tomate, cebola, quiabos e beringela.',
      'Regue com o óleo de palma.',
      'Cozinhe em lume brando sem mexer muito para não desfazer o peixe.',
      'Acompanhe com funge e feijão de óleo de palma.'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    region: 'Litoral',
    isVegetarian: false,
    rating: 4.7,
    reviews: 56,
    comments: [],
    price: '$$'
  },
  {
    id: '4',
    title: 'Cocada Amarela',
    description: 'Doce tradicional de origem conventual adaptado com o coco angolano.',
    category: 'Sobremesas',
    prepTime: '40 min',
    servings: 8,
    ingredients: [
      { name: 'Coco ralado fresco', amount: '2 chávenas' },
      { name: 'Açúcar', amount: '2 chávenas' },
      { name: 'Gemas de ovo', amount: '6' },
      { name: 'Água', amount: '1 chávena' },
      { name: 'Canela em pau', amount: '1' }
    ],
    instructions: [
      'Faça uma calda com o açúcar, a água e a canela até ponto pérola.',
      'Adicione o coco e deixe cozinhar um pouco.',
      'Retire do lume e deixe arrefecer ligeiramente.',
      'Misture as gemas batidas e leve novamente ao lume brando, mexendo sempre até engrossar.',
      'Polvilhe com canela em pó ao servir.'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=4',
    region: 'Luanda / Benguela',
    isVegetarian: true,
    rating: 4.9,
    reviews: 210,
    comments: [],
    price: '$$'
  },
  {
    id: '5',
    title: 'Mufeta',
    description: 'O prato de festa dos Luandenses, tradicionalmente comido às segundas-feiras ou casamentos.',
    category: 'Peixes / Mariscos',
    prepTime: '50 min',
    servings: 4,
    ingredients: [
      { name: 'Carapau ou Cacusso grelhado', amount: '4 peixes' },
      { name: 'Feijão de óleo de palma', amount: '500 g' },
      { name: 'Batata doce cozida', amount: '500 g' },
      { name: 'Mandioca cozida', amount: '500 g' },
      { name: 'Banana pão cozida', amount: '4' },
      { name: 'Molho de cebola picada com vinagre', amount: '1 taça' }
    ],
    instructions: [
      'Grelhe o peixe com sal e limão.',
      'Cozinhe o feijão com óleo de palma até ficar bem apurado.',
      'Coza a mandioca, a batata doce e a banana.',
      'Faça um molho vinagrete com cebola picadinha, azeite, vinagre e jindungo.',
      'Sirva tudo numa travessa grande para partilhar.'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=5',
    region: 'Luanda',
    isVegetarian: false,
    rating: 5.0,
    reviews: 300,
    comments: [],
    price: '$$$'
  }
];

export const CATEGORIES: Category[] = [
  'Estufados / Moambas',
  'Peixes / Mariscos',
  'Acompanhamentos',
  'Sobremesas',
  'Petiscos',
  'Bebidas'
];