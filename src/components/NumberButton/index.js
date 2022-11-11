import React from "react";
import './style.css'
function NumberButton (props) {
    const zeroBtnClass = props.value === 0 ? 'zero-button' : ''
    return (
        <button className={`rounded-circle button-calculator number-button ${zeroBtnClass}`} onClick={() => props.numberPressFunc(props.value)}>
            {props.value}
        </button>
    )
}

export default React.memo(NumberButton)