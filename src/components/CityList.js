import React from 'react';

const CityList = (props) => {
    return (
        <ul className="list-group list-group-flush">
        {props.data.map((data,index) => {
            return ( 
                <li className={"d-flex justify-content-between list-group-item " + (props.activeCity === data.id ? "active" : "")} key={index}>
                    <div onClick={() => props.selectCity(data)}>
                    {data.name}
                    </div>
                    <span aria-hidden="true" onClick={() => props.removeCity(index)}>&times;</span>
                </li>
            );
        })}
        </ul>
    );
}

export default CityList;