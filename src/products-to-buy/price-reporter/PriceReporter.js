import React from 'react'
import {
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap'
import CurrentLocation from './current-location-map/CurrentLocationMap'
import './PriceReporter.css'

import {hidePriceReportField, updatePriceMarker, updateExternalPriceMarkers} from './actionCreators'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    isPriceReportFieldActive: state.priceReporting.isPriceReportFieldActive,
    currentProductId: state.priceReporting.activeProduct,
    currentProductName: state.priceReporting.productName,
    PurchaseDate: state.priceReporting.purchaseDate

})

const mapDispatchToProps = (dispatch) => ({
    hidePriceReportField: () => dispatch(hidePriceReportField()),
    updatePriceMarker: (reportedPrice) => dispatch(updatePriceMarker(reportedPrice)),
    updateExternalPriceMarkers: () => dispatch(updateExternalPriceMarkers())
})

class PriceReporter extends React.Component {


    render() {
        const {
            isPriceReportFieldActive,
            hidePriceReportField,
            currentProductId,
            currentProductName,
            PurchaseDate,
            updatePriceMarker,
            updateExternalPriceMarkers
        } = this.props


        const handleChange = function (event) {
            updatePriceMarker(event.target.value)
            console.log(event.target.value)
        }

        const handleClick = () =>
        updateExternalPriceMarkers();


        return (
            <div className="priceReporter">
                <Modal show={isPriceReportFieldActive} onHide={hidePriceReportField}>
                    <Modal.Header closeButton>
                        <Modal.Title>Kupiłeś taniej?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="productName">
                            {currentProductName}
                        </p>
                        <Form inline>
                            <FormGroup>
                                <ControlLabel >Twoja cena:</ControlLabel>
                                <FormControl
                                    type="text" onChange={handleChange}/>
                            </FormGroup>
                            <CurrentLocation />
                            <Button onClick={handleClick}>
                                Zgłoś promocję
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PriceReporter)