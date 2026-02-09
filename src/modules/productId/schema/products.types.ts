/** API response types for /products/user/all */

export interface ApiStoneColor {
  type: string;
  value: string;
}

export interface ApiStoneSpec {
  stoneName: string;
  quantity: number;
  cut?: string;
  clarity?: string;
  color?: ApiStoneColor;
}

export interface ApiGoldSpecs {
  karat: string;
  goldWeight: number;
  grossWeight?: number;
  purity?: string;
  makingCharges?: number;
  metal: string;
}

export interface ApiProduct {
  _id: string;
  sku: string;
  name: string;
  description: string;
  mrpPrice: number;
  discountedPrice?: number;
  image?: string;
  gallery?: string[];
  stockQuantity: number;
  categories?: string;
  goldSpecs: ApiGoldSpecs;
  stoneSpecs: ApiStoneSpec[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  isWishlisted?: boolean;
  wishlistCount?: number;
  
}

export interface ApiPagination {
  page: number;
  limit: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  totalPages: number;
}

export interface GetProductsUserAllResponse {
  data: ApiProduct[];
  pagination: ApiPagination;
}

export interface GetProductsUserAllParams {
  search?: string;
  category?: string;
  purity?: string;
  minPrice?: number;
  maxPrice?: number;
}
