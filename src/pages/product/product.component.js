import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollectionItem } from "../../redux/shop/shop.selectors";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./product.styles.scss";

const ProductPage = ({ item, addItem }) => {
  const { imageUrl, name, price } = item;
  return (
    <div className="product-contrainer">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <span className="product-price">${price}</span>
        <p className="product-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui error
          quae magnam cum sint, accusantium perspiciatis enim? Deserunt sint,
          accusantium quaerat nisi rerum iusto fugit totam. Voluptatem quibusdam
          at architecto!
        </p>
        <CustomButton inverted onClick={() => addItem(item)}>
          Add To Cart
        </CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  item: selectCollectionItem(
    ownProps.match.params.collectionId,
    ownProps.match.params.productId
  )(state)
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
