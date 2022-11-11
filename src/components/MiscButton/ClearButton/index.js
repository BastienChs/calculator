import React from "react";
import '../style.css'
function ClearButton (props) {
    return (
        <button onClick={props.clearFunction} className={'rounded-circle button-calculator misc-button'}>{props.value}</button>
    )
}

export default React.memo(ClearButton)