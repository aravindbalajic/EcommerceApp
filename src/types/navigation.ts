import { Product } from '../context/CartContext';

export type RootStackParamList = {
  Main: undefined;
  ProductDetails: { product: Product };
}; 