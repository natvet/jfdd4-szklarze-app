import React from 'react'
import {
    Button,
    ButtonGroup
} from 'react-bootstrap'
import {Link} from 'react-router'

const ShoppingListsButtons = ({shoppingLists}) => (
    <ButtonGroup vertical block>
        {shoppingLists
            .filter(list => list.length > 0)
            .map((list, index) =>
                <div>
                    <Link to={`/shopping-lists/` + index}>
                        <Button>
                            {typeof list[list.length-1] === 'string' ?
                                list[list.length-1] :
                                'Lista zakupów nr '+(index + 1)
                            }
                        </Button>
                    </Link>
                </div>
            )}
    </ButtonGroup>
)

export default ShoppingListsButtons