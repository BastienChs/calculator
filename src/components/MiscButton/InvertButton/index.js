import React from "react";
import '../style.css'
function InvertButton (props) {
    return (
        <button onClick={props.invertResult} className={'rounded-circle button-calculator misc-button'}>{props.value}</button>
    )
}

export default React.memo(InvertButton)