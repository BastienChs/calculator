import React from "react";
import './style.css'

function OperationButton (props) {
    return (
        <button onClick={() => props.operationFunc()} className={'rounded-circle button-calculator operation-button'}>{props.value}</button>
    )
}

export default React.memo(OperationButton)