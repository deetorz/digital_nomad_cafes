import React from "react";

const PlaceCard = (props) => {
  return (
    <div className="card-info">
      <img className="card-img" src={props.imgSrc} />
      <hr/>
      <a href={props.url} className="m-3">{props.name}</a>
      <p className="m-3">{props.address}</p>
    </div>
  )
}

export default PlaceCard
