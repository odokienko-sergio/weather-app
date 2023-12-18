import React from "react";
import cloudsImage from "../assets/img/clouds.png";

const Current = (props) => {
    return (
        <div className="current">
            <p className={"degrees"}>{props.temp}</p>
            <p className={"current-text"}>{props.precipitation}</p>
            <img className={"current-img"} src={cloudsImage} alt="Clouds" />
        </div>
    );
};

export default Current;
