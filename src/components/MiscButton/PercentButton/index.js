import React from "react";
import '../style.css'
function PercentButton (props) {
    return (
        <button onClick={props.percentResult} className={'rounded-circle button-calculator misc-button'}>{props.value}</button>
    )
}

export default React.memo(PercentButton)