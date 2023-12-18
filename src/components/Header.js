import React from "react";

const Header = (props) => {
    const { newCity, setNewCity } = props;

    const handleInputChange = (event) => {
        setNewCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onCityChange(newCity);
    };

    const handleClearInput = () => {
        setNewCity("");
    };

    return (
        <header className="header">
            <h3 className={"header-title"}>foxmind<span>ed</span></h3>
            <form onSubmit={handleSubmit}>
                <input
                    className={"input-text"}
                    type="text"
                    value={newCity}
                    onChange={handleInputChange}
                />
                {newCity && (
                    <button type="button" onClick={handleClearInput}>
                        Clear
                    </button>
                )}
            </form>
            <p className={"header-text"}>Selected: {props.place}</p>
        </header>
    );
};

export default Header;
