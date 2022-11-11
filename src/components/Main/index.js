import {Component} from "react";
import './style.css'
import {Col, Container, Row} from "react-bootstrap";
import Result from "../Result";
import OperationButton from "../OperationButton";
import NumberButton from "../NumberButton";
import ClearButton from "../MiscButton/ClearButton";
import InvertButton from "../MiscButton/InvertButton";
import PercentButton from "../MiscButton/PercentButton";
import CommaButton from "../MiscButton/CommaButton";

class MainComponent extends Component{

    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        // Set the state directly. Use props if necessary.
        this.state = {
            result : 0,
            isCommaPressed : false,
            isPlusPressed : false,
            isMinusPressed : false,
            isMultiplyPressed : false,
            isDividedPressed : false,
            isPercentPressed : false,
            isInvertPressed: false,
            isSpecialOperationPressed: false,
            dividingValueForComma: 1,
            mustDisplayResult:true,
            secondNumberPressed : null,
            thirdNumberPressed : null,
        }
    }

    resetToInitialState = () => {
        return this.setState(() => {
            return{
                result : 0,
                isCommaPressed : false,
                isPlusPressed : false,
                isMinusPressed : false,
                isMultiplyPressed : false,
                isDividedPressed : false,
                isPercentPressed : false,
                isInvertPressed: false,
                isSpecialOperationPressed: false,
                dividingValueForComma: 1,
                mustDisplayResult:true,
                secondNumberPressed : null,
                thirdNumberPressed : null,
            }
        })
    }

    updateSpecialOperationPressedStatus = () => {
        if ((this.state.isCommaPressed || this.state.isPlusPressed || this.state.isMinusPressed || this.state.isMultiplyPressed
            || this.state.isDividedPressed || this.state.isPercentPressed) && !this.state.isSpecialOperationPressed){
            this.setState(() => {
                return {
                    isSpecialOperationPressed: true
                }
            })
        }
    }

    incrementFirstNumber = (number) => {
        if (this.state.result >= 0) {
            this.setState(function (prevState) {
                return {
                    result: prevState.result * 10 + number
                }
            })
        } else {
            this.setState(function (prevState) {
                return {
                    result: prevState.result * 10 - number
                }
            })
        }
    }

    incrementSecondNumber = (number) => {
        if (this.state.secondNumberPressed >= 0) {
            this.setState(function (prevState) {
                return {
                    secondNumberPressed: prevState.secondNumberPressed * 10 + number,
                    mustDisplayResult: false
                }
            })
        } else {
            this.setState(function (prevState) {
                return {
                    secondNumberPressed: prevState.secondNumberPressed * 10 - number,
                    mustDisplayResult: false
                }
            })
        }
    }

    incrementThirdNumber = (number) => {
        if (this.state.thirdNumberPressed >= 0) {
            this.setState(function (prevState) {
                return {
                    thirdNumberPressed: prevState.thirdNumberPressed * 10 + number,
                    mustDisplayResult: false
                }
            })
        } else {
            this.setState(function (prevState) {
                return {
                    thirdNumberPressed: prevState.thirdNumberPressed * 10 - number,
                    mustDisplayResult: false
                }
            })
        }
    }

    numberPressed = number => {
        //In the regular case, while we just click on numbers, we add them to each others until special button is pressed.
        if(!this.state.isCommaPressed) {
            if(this.state.thirdNumberPressed !== null )
                this.incrementThirdNumber(number)
            else if(this.state.secondNumberPressed !== null)
                this.incrementSecondNumber(number)
            else
                this.incrementFirstNumber(number)
        }
        //In the case where comma has been pressed, we've to add the numbers after the comma.
        //We've to take in consideration special cases, like the fact we can't press equal after an empty comma or the fact that we can't add several commas.
        //The rule is : Once comma button has been pressed, every number will be added to the right of it until a special button is pressed.
        else {
            if(this.state.thirdNumberPressed !== null ) {
                this.setState(function (prevState) {
                    return {
                        dividingValueForComma: prevState.dividingValueForComma * 10,
                        thirdNumberPressed: prevState.thirdNumberPressed + number / (prevState.dividingValueForComma * 10),
                    }
                })
            }
            else if(this.state.secondNumberPressed !== null) {
                this.setState(function (prevState) {
                    return {
                        dividingValueForComma: prevState.dividingValueForComma * 10,
                        secondNumberPressed: prevState.secondNumberPressed + number / (prevState.dividingValueForComma * 10),
                    }
                })
            }
            else {
                this.setState(function (prevState) {
                    return {
                        dividingValueForComma: prevState.dividingValueForComma * 10,
                        result: prevState.result + number / (prevState.dividingValueForComma * 10),
                    }
                })
            }
        }


    }

    clearResult = () => {
        this.resetToInitialState()
    }

    invertResult = () => {
        //Depending of second and third number
        if(this.state.thirdNumberPressed !== null && this.state.thirdNumberPressed > 0)
        {
            this.setState(function (prevState) {
                return {
                    thirdNumberPressed: prevState.thirdNumberPressed * (-1)
                }
            })
        }else if(this.state.secondNumberPressed !== null && this.state.secondNumberPressed > 0){
            this.setState(function (prevState) {
                return {
                    secondNumberPressed: prevState.secondNumberPressed * (-1)
                }
            })
        }else {
            this.setState(function (prevState) {
                return {
                    result: prevState.result * (-1)
                }
            })
        }
    }

    percentResult = () => {
        //Depending of second and third number
        if(this.state.thirdNumberPressed !== null && this.state.thirdNumberPressed > 0)
        {
            this.setState(function (prevState) {
                return {
                    thirdNumberPressed: prevState.thirdNumberPressed / 100,
                    isPercentPressed: true
                }
            })
        }else if(this.state.secondNumberPressed !== null && this.state.secondNumberPressed > 0) {
            this.setState(function (prevState) {
                return {
                    secondNumberPressed: prevState.secondNumberPressed / 100,
                    isPercentPressed: true
                }
            })
        }
        else
        {
            this.setState(function (prevState) {
                return {
                    result: prevState.result / 100,
                    isPercentPressed: true
                }
            })
        }
    }

    addComma = () => {
        this.setState(() => {
            return {
                isCommaPressed: true
            }
        })
    }

    additionNumbers = () => {
        //If minus is already pressed, we unactivate it
        if(this.state.isMinusPressed){
            this.setState(() => {
                return {
                    isMinusPressed: false
                }
            })
        }

        //First case, we press plus first time and others signs has not been pressed
        if(!this.state.isPlusPressed && !this.state.isMinusPressed){
            this.setState(() => {
                return {
                    isPlusPressed: true,
                    isCommaPressed:false,
                    secondNumberPressed: 0
                }
            })
        }
        //We press plus another time (and minus is not pressed) and we've already a second number, so we make the addition of it
        else if(this.state.isPlusPressed && !this.state.isMinusPressed && this.state.result !== null && this.state.secondNumberPressed !== null) {
            this.setState((prevState) => {
                return {
                    secondNumberPressed: 0,
                    isCommaPressed: false,
                    result: (prevState.result  + this.state.secondNumberPressed),
                    isPlusPressed: true,
                    mustDisplayResult: true
                }
            })
        }
    }

    minusNumbers = () => {
        //If plus is already pressed, we unactivate it
        if(this.state.isPlusPressed){
            this.setState(() => {
                return {
                    isPlusPressed: false
                }
            })
        }

        //First case, we press plus first time and others signs has not been pressed
        if(!this.state.isMinusPressed && !this.state.isPlusPressed){
            this.setState(() => {
                return {
                    isMinusPressed: true,
                    isCommaPressed:false,
                    secondNumberPressed: 0
                }
            })
        }
        //We press plus another time (and minus is not pressed) and we've already a second number, so we make the addition of it
        else if(this.state.isMinusPressed && !this.state.isPlusPressed && this.state.result !== null && this.state.secondNumberPressed !== null) {
            this.setState((prevState) => {
                return {
                    secondNumberPressed: 0,
                    isCommaPressed: false,
                    result: (prevState.result  - this.state.secondNumberPressed),
                    isMinusPressed: true,
                    mustDisplayResult: true
                }
            })
        }
    }

    multiplyNumbers = () => {
        if(!this.state.isPlusPressed && !this.state.isMinusPressed) {
            const vResult = this.state.secondNumberPressed !== null ? this.getResult() : this.state.result
            const vMustDisplayResult = !!this.state.isMultiplyPressed
            this.setState(() => {

                return {
                    isDividedPressed: false,
                    isMultiplyPressed: true,
                    result: vResult,
                    secondNumberPressed: 0,
                    isCommaPressed: false,
                    mustDisplayResult: vMustDisplayResult
                }
            })
        }

        //If we're in the case of a current addition or substraction and that we have a secondNumber which is not null, the we prioritize the multiplication between the second and third number
        else if(this.state.isPlusPressed || this.state.isMinusPressed){
            this.setState(() => {
                return {
                    isDividedPressed: false,
                    isMultiplyPressed: true,
                    thirdNumberPressed: 0
                }
            })
        }
    }

    divideNumbers = () => {
        //If multiply is already pressed, we inactivate it
        if(!this.state.isPlusPressed && !this.state.isMinusPressed) {
            if(this.state.secondNumberPressed === 0 || this.state.thirdNumberPressed === 0){
                alert(`You can't divide by 0.`)
                this.clearResult()
                return
            }
            const vResult = this.state.secondNumberPressed !== null ? this.getResult() : this.state.result
            const vMustDisplayResult = !!this.state.isDividedPressed
            this.setState(() => {
                return {
                    isDividedPressed: true,
                    isMultiplyPressed: false,
                    result: vResult,
                    secondNumberPressed: 0,
                    isCommaPressed: false,
                    mustDisplayResult: vMustDisplayResult
                }
            })
        }

        //If we're in the case of a current addition or subtraction and that we have a secondNumber which is not null, the we prioritize the multiplication between the second and third number
        else if(this.state.isPlusPressed || this.state.isMinusPressed){
            this.setState(() => {
                return {
                    isDividedPressed: true,
                    isMultiplyPressed: false,
                    thirdNumberPressed: 0
                }
            })
        }
    }

    getResult = () => {
        if(this.state.isPlusPressed && !this.state.isDividedPressed && !this.state.isMultiplyPressed)
            return this.state.result + this.state.secondNumberPressed
        else if(this.state.isMinusPressed && !this.state.isDividedPressed && !this.state.isMultiplyPressed)
            return this.state.result - this.state.secondNumberPressed
        else if(!this.state.isPlusPressed && !this.state.isMinusPressed && this.state.isDividedPressed)
            return this.state.result / this.state.secondNumberPressed
        else if(!this.state.isPlusPressed && !this.state.isMinusPressed && this.state.isMultiplyPressed)
            return this.state.result * this.state.secondNumberPressed

        //Complex cases
        else if(this.state.isPlusPressed && this.state.isMultiplyPressed)
            return this.state.result + this.state.secondNumberPressed * this.state.thirdNumberPressed
        else if(this.state.isPlusPressed && this.state.isDividedPressed)
            return this.state.result + this.state.secondNumberPressed / this.state.thirdNumberPressed
        else if(this.state.isMinusPressed && this.state.isMinusPressed)
            return this.state.result - this.state.secondNumberPressed * this.state.thirdNumberPressed
        else if(this.state.isMinusPressed && this.state.isDividedPressed)
            return this.state.result - this.state.secondNumberPressed / this.state.thirdNumberPressed
    }

    equalsNumbers = () => {
        this.setState(() => {
            return {
                isCommaPressed : false,
                isPlusPressed : false,
                isMinusPressed : false,
                isMultiplyPressed : false,
                isDividedPressed : false,
                isPercentPressed : false,
                isInvertPressed: false,
                isSpecialOperationPressed: false,
                dividingValueForComma: 1,
                mustDisplayResult:true,
                secondNumberPressed : null,
                thirdNumberPressed : null,
                result: this.getResult()
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //If any operation button has been pressed and if we have the binary value for this at false, then we make it true.
        this.updateSpecialOperationPressedStatus()

        //If we pressed the comma button, we doesn't make it false while no operation button has been pressed.
        if(this.state.isCommaPressed){

        }

        //If we had the comma and its status changed, then we've to reset the counter of decimals.
        if(prevState.isCommaPressed && !this.state.isCommaPressed){
            this.setState(() => {
                return {
                    dividingValueForComma: 1
                }
            })
        }
    }

    render(){
        return(
            <Container className={'container-calculator'}>
                <div className={'main-calculator'}>
                    <Row>
                        <Col className={'right-element'}>
                            <Result firstNumber={this.state.result}
                                    secondNumber={this.state.secondNumberPressed}
                                    thirdNumber={this.state.thirdNumberPressed}
                                    mustDisplayResult={this.state.mustDisplayResult}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'center-element'}>
                            <ClearButton clearFunction={this.clearResult} value={'c'} style={{width: '100%'}}/>
                        </Col>
                        <Col className={'center-element'}>
                            <InvertButton invertResult={this.invertResult} value={'+/-'} />
                        </Col>
                        <Col className={'center-element'}>
                            <PercentButton percentResult={this.percentResult} value={'%'} />
                        </Col>
                        <Col className={'center-element'}>
                            <OperationButton  operationFunc={this.divideNumbers} value={'/'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={7}/>
                        </Col>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={8}/>
                        </Col>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={9}/>
                        </Col>
                        <Col className={'center-element'}>
                            <OperationButton operationFunc={this.multiplyNumbers} value={'*'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={4}/>
                        </Col>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={5}/>
                        </Col>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={6}/>
                        </Col>
                        <Col className={'center-element'}>
                            <OperationButton operationFunc={this.minusNumbers} value={'-'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={1}/>
                        </Col>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={2}/>
                        </Col>
                        <Col className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={3}/>
                        </Col>
                        <Col className={'center-element'}>
                            <OperationButton operationFunc={this.additionNumbers} value={'+'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={{span:6}} xl={{span:6}} lg={{span:6}} md={{span:6}} sm={{span:6}} className={'center-element'}>
                            <NumberButton numberPressFunc={this.numberPressed} value={0}/>
                        </Col>
                        <Col className={'center-element'}>
                            <CommaButton addComma={this.addComma} value={','}/>
                        </Col>
                        <Col className={'center-element'}>
                            <OperationButton  operationFunc={this.equalsNumbers} value={'='} />
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}

export default MainComponent