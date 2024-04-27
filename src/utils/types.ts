import type Plyr from "plyr";

export interface PlyrComtelec extends Plyr {}

export interface Product {
  category: string;
  product_name: string;
  option: string;
  price: number;
  img: ImageModel;
}

export interface ImageModel {
  main: string;
  alt: string;
  extras: string[];
}

export interface Category {
  category_name: string;
  products?: string[];
  img?: ImageModel;
}
