import React from 'react';

function Card(props){
    const data = props.data;
    return (
        <>
            {data.map(item => (
            <div className="col-3" key={item.login.uuid}>
                <div className="card">
                    <img src={item.picture.large} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.name.first} {item.name.last}</h5>
                        <p className="card-text"><strong>Employee ID:</strong> {item.login.uuid.slice(0, 8)}</p>
                        <p className="card-text"><strong>Email:</strong> <br/> {item.email}</p>
                        <p className="card-text"><strong>Phone:</strong> {item.cell}</p>
                    </div>
                </div>
            </div>)
            )}
        </>
    )
}

export default Card;