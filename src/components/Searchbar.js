import React from 'react';

function Searchbar(props){
    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Keywoards" onChange={props.handleInputChange} value={props.search}/>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={props.handleFormSubmit}>Search</button>
                </div>
            </div>
        </>
    )
}

export default Searchbar;