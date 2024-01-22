interface recommendType {
  user: number;
}

interface CatImageType {
  imgs: string;
}
export interface CatObjectType {
  id: number;
  cat_name: string;
  shop_name: string;
  prefecture: string;
  cat_images: CatImageType[];
  character: string[];
  favorite_things: string[];
  attendance: string;
  description: string;
  recommend_user: recommendType[];
  last_update: string;
}