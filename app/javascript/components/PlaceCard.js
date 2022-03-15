import React from "react";

const PlaceCard = (props) => {
  return (
    <div className="card-info">
      <img className="card-img" src={props.imgSrc} />
      <hr/>
      <a href={props.url} className="card-info-title my-4">{props.name}</a>
      <p card-info-address>{props.address}</p>
    </div>
  )
}

export default PlaceCard
