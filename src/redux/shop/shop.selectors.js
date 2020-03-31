import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );

export const selectCollectionItem = (collectionUrlParam, itemUrlParam) => {
  console.log("collectionUrlParam and itemUrlParam");
  console.log(collectionUrlParam, itemUrlParam);

  return createSelector([selectCollections], collections => {
    return collections[collectionUrlParam].items.find(
      item => item.id == itemUrlParam
    );
  });
};
