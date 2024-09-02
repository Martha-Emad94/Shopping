export interface Iproduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string[];
 quantity:number;
 rating: {
  rate: number; 
  count: number; 
};
}
