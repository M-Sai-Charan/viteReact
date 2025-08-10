interface Product {
  id: string;
  title: string;
  price: number;
  quantity?: number;
  description: string
}
export const SHOPPINGDATA: Product[] = [
  {
    id: 'p1',
    title: 'Majestic Vintage Mocha Overcoat',
    price: 999,
    quantity: 1,
    description:
      'Channel timeless sophistication with this stunning mocha overcoat. Crafted for the discerning gentleman who appreciates the fine blend of vintage charm and modern elegance.',
  },
  {
    id: 'p2',
    title: 'Enchanting Blush Dream Gown',
    price: 899,
    quantity: 1,
    description:
      'Bask in the glow of elegance with our Enchanting Blush Dream Gown. Embody the regality of a queen with a sweet touch of pink that whispers enchantment. This is the perfect piece for those seeking to create unforgettable moments.',
  },

  {
    id: 'p3',
    title: 'Vintage Sunshine Rain Jacket',
    price: 1999,
    quantity: 1,
    description:
      'Brace the showers in style! Our Vintage Sunshine Rain Jacket ensures that you stand out, even in the dullest weather. Because rain is never a reason to compromise on your fashion quotient.',
  },
  {
    id: 'p4',
    title: 'Classic Merlot Business Suit',
    price: 1299,
    quantity: 1,
    description:
      'Step into the boardroom with unmatched confidence in our Classic Merlot Business Suit. Exuding an air of refined class and understated power, it is ideal for the modern executive who values tradition and elegance.',
  },
  {
    id: 'p5',
    title: 'Ethereal Moonlight Evening Dress',
    price: 1599,
    quantity: 1,
    description:
      'Sweep the room off its feet in our Ethereal Moonlight Evening Dress. Crafted to mimic the allure of the moonlight, this dress is a nod to those who appreciate subtle glamour and a standout silhouette.',
  },
  {
    id: 'p6',
    title: 'Pioneer Rugged Denim Jacket',
    price: 2999,
    quantity: 1,
    description:
      'Our Pioneer Rugged Denim Jacket is a tribute to those who embody the spirit of adventure. Designed with durability and comfort in mind, this jacket is a wardrobe essential for the urban explorer.',
  },
];
