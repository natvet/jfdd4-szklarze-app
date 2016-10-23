import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonToolbar} from 'react-bootstrap'
import { toggleFavoriteFilter, setCategoryFilter, removeCategoryFilter } from './actionCreators'
import './Filters.css'

const mapStateToProps = (state) => ({
    products: state.products,
    categories: state.products.map(product => product.category).sort().filter(
        (category, index, allCategories) => {
            return allCategories[index] !== allCategories[index-1]
        }),
    isFavoriteFilterActive: state.filters.favoritesFilter,
    CategoryFilterArray: state.filters.categoryFilter
})

const mapDispatchToProps = (dispatch) => ({
    toggleFavoriteFilter: () => dispatch(toggleFavoriteFilter()),
    setCategoryFilter: (category) => dispatch(setCategoryFilter(category)),
    removeCategoryFilter: () => dispatch(removeCategoryFilter()),
})

const Filters = ({
    categories,
    toggleFavoriteFilter,
    setCategoryFilter,
    removeCategoryFilter,
    isFavoriteFilterActive,
    CategoryFilterArray
}) => (
    <div>
        <p className="show-favorite-caption">Pokaż produkty:</p>
        <ButtonToolbar>
            <Button
                onClick={() =>  toggleFavoriteFilter()}
                disabled={!isFavoriteFilterActive}
                bsStyle={!isFavoriteFilterActive ? 'success' : 'default'}>
                Wszystkie
            </Button>
            <Button
                onClick={() =>  toggleFavoriteFilter()}
                disabled={isFavoriteFilterActive}
                bsStyle={isFavoriteFilterActive ? 'success' : 'default'}>
                Ulubione
            </Button>
        </ButtonToolbar>
        <p className="show-favorite-caption">Filtruj:</p>
        <ButtonToolbar>
            {categories.map((category, index) =>
                <Button key={index}
                        onClick={() => setCategoryFilter(category)}
                        active={CategoryFilterArray.indexOf(category) !== -1}
                        bsStyle={CategoryFilterArray.indexOf(category) !== -1 ? 'primary' : 'default'}>
                    {category}
                </Button>
            )}
        </ButtonToolbar>
        <ButtonToolbar>
            <Button
                onClick={() => removeCategoryFilter()}
                bsStyle='danger'>
                Usuń filtry
            </Button>
        </ButtonToolbar>

    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Filters)