export class Product {
  id!: string;
  reference!: string;
  name!: string;
  stockQte!: number;
  unitPrice!: number;
  image!: string;
  categoryId!: number| null;;
  category!: string;
  comments: { rating: number; comment: string; date: string }[] = []; }
