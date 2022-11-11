import React from "react";
import '../style.css'
function CommaButton (props) {
    return (
        <button onClick={props.addComma} className={'rounded-circle button-calculator number-button'}>{props.value}</button>
    )
}

export default React.memo(CommaButton)