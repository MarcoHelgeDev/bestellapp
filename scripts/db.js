const restaurantData = {
  name: 'BurgerHouse',
  deliveryFee: 4.99,
  minimumOrder: 15,
  categories: [
    {
      id: 'burger',
      sectionId: 'burger-section',
      title: 'Burger',
      subtitle: '& Sandwiches',
      icon: './assets/icons/headline-burger.svg',
      dishes: [
        {
          id: 'veggieMushroomBlackBurger',
          name: 'Veggie mushroom black burger',
          price: 16.9,
          img: './assets/img/dish-1.jpg',
          description: 'Mixed green salad, tomatoes, edamame, mushrooms',
        },
        {
          id: 'allMeatBurger',
          name: 'All meat burger',
          price: 15.9,
          img: './assets/img/dish-2.jpg',
          description:
            'Beef, bacon, dill pickles, smoked cheese, ketchup, BBQ sauce',
        },
        {
          id: 'beefRedBurger',
          name: 'Beef red burger',
          price: 14.9,
          img: './assets/img/dish-3.jpg',
          description: 'Beef, cheese, tomatoes, lettuce, onion',
        },
        {
          id: 'bigChickenBurger',
          name: 'Big chicken burger',
          price: 15.9,
          img: './assets/img/dish-4.jpg',
          description: 'Chicken, cheese, tomatoes, lettuce, onion, bell pepper',
        },
      ],
    },
    {
      id: 'pizza',
      sectionId: 'pizza-section',
      title: 'Pizza (30 cm)',
      subtitle: '',
      icon: './assets/icons/headline-pizza.svg',
      dishes: [
        {
          id: 'pizzaMargherita',
          name: 'Pizza Margherita',
          price: 11.9,
          img: './assets/img/dish-5.jpg',
          description: 'Tomato sauce, mozzarella, basil',
        },
        {
          id: 'pizzaChorizo',
          name: 'Pizza Chorizo',
          price: 13.9,
          img: './assets/img/dish-6.jpg',
          description: 'Tomato slices, mozzarella, chorizo',
        },
        {
          id: 'pizzaFunghi',
          name: 'Pizza Funghi',
          price: 12.9,
          img: './assets/img/dish-7.jpg',
          description: 'Red onion, olives, button mushrooms, mozzarella',
        },
        {
          id: 'pizzaQuattroFormaggiWithChicken',
          name: 'Quattro Formaggi with chicken',
          price: 15.9,
          img: './assets/img/dish-8.jpg',
          description:
            'Chicken, mozzarella, gorgonzola, fontina, Parmigiano Reggiano',
        },
      ],
    },
    {
      id: 'salad',
      sectionId: 'salad-section',
      title: 'Salad',
      subtitle: '',
      icon: './assets/icons/headline-salat.svg',
      dishes: [
        {
          id: 'warmBeefArugulaSalad',
          name: 'Warm beef arugula salad',
          price: 16.9,
          img: './assets/img/dish-9.jpg',
          description: 'Mixed green salad, tomatoes, cucumber',
        },
        {
          id: 'miniGreenSalad',
          name: 'Mini green salad',
          price: 7.9,
          img: './assets/img/dish-10.jpg',
          description: 'Green salad, cucumber, carrots, parsley, radishes',
        },
        {
          id: 'greenSaladWithSeafood',
          name: 'Green salad with seafood',
          price: 16.9,
          img: './assets/img/dish-11.jpg',
          description:
            'Mixed greens, cherry tomatoes, red onion, mussels, squid rings, shrimp, Dijon mustard-lemon dressing with dill',
        },
        {
          id: 'veganGreenSaladWithTofu',
          name: 'Vegan green salad with tofu',
          price: 14.9,
          img: './assets/img/dish-12.jpg',
          description:
            'Green salad, cherry tomatoes, cucumber, baby spinach, edamame, radishes, bittercress, tofu, peanuts',
        },
      ],
    },
  ],
};
