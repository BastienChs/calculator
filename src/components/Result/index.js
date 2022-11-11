import React from "react";
import './style.css'

function Result (props) {

    const resultToDisplay = () => {
        if(props.thirdNumber !== null && !props.mustDisplayResult)
            return (props.thirdNumber)
        else if(props.secondNumber !== null && !props.mustDisplayResult)
            return (props.secondNumber)
        else
            return (props.firstNumber)
    }

    return (
        <div className={'result-calculator'}>
            <span className={'result-text-calculator'}>{resultToDisplay()}</span>
        </div>
    )
}

export default Result