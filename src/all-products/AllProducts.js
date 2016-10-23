import React from 'react'
import Filters from '../filters/Filters'
import ListCreator from '../list-creator/ListCreator'
import './AllProducts.css'


import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

import AllProductsItem from './all-products-item/AllProductsItem'

import {
    increaseAmount,
    decreaseAmount
} from '../list-creator/actionCreators'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    categoryFilterArray: state.filters.categoryFilter,
    favoriteProductsIds: state.favorites.favoriteProductIds,
    productsToDisplay: state.filters.favoritesFilter ?
        state.products
            .filter(product =>
            state.favorites.favoriteProductIds.indexOf(product.productId) !== -1) :
        state.products,
    itemsToBuy: state.allProducts.itemsToBuy,

})

const mapDispatchToProps = (dispatch) => ({
    increaseAmount: (productId) => dispatch(increaseAmount(productId)),
    decreaseAmount: (productId) => dispatch(decreaseAmount(productId)),
})

function generateProductItems(product, increaseAmount, decreaseAmount, itemsToBuy) {
    var currentCounterValue =
        itemsToBuy
            .filter(item => item.productId === product.productId).length > 0 ?
            itemsToBuy
                .map(item => (item.productId === product.productId ? item.quantity : null)) :
            0;
    return (
        <Col xs={6} md={3}
             key={product.productId}>
            <AllProductsItem
                increaseAmount={increaseAmount}
                decreaseAmount={decreaseAmount}
                currentCounterValue={currentCounterValue}
                itemsToBuy={itemsToBuy}
                product={product}/>
        </Col>
    )
}

const AllProducts = ({
    categoryFilterArray,
    productsToDisplay,
    increaseAmount,
    decreaseAmount,
    itemsToBuy,
    saveNewList
}) => (
    <div className="background">
        <div className="all-products">
            <h1>Co chcesz kupić?</h1>
            <div className="filters">
            <Filters />
                </div>
            <Grid>
                <Row>
                    {categoryFilterArray.indexOf('none') !== -1 ?
                        productsToDisplay
                            .map(product =>
                                generateProductItems(product, increaseAmount, decreaseAmount, itemsToBuy))
                        :
                        productsToDisplay
                            .filter(product =>
                                (categoryFilterArray.indexOf(product.category) !== -1))
                            .map(product =>
                                generateProductItems(product, increaseAmount, decreaseAmount, itemsToBuy))
                    }
                </Row>
            </Grid>

                <ListCreator />

        </div>
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
