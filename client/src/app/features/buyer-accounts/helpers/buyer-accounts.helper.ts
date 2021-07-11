import { FavoriteReatailers } from 'src/app/core/retailer/types/favorite-retailers';

export function deserialize(favorites: any[]): FavoriteReatailers[] {
  let favoriteRetailers: FavoriteReatailers[] = [];
  favorites.forEach((element) => {
    favoriteRetailers.push(new FavoriteReatailers().deserialize(element));
  });
  return favoriteRetailers;
}
