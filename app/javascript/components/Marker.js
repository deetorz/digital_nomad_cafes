import React, { useState } from 'react';
import { MapPin } from 'phosphor-react'

const Marker = () => {
  const [ color, setColor ] = useState("#cc0000")

  const handleMouseOver = () => {
    setColor("blue")
  }

  const handleMouseOut = () => {
    setColor("#cc0000")
  }

  return (
    <div>
      <div>
        <MapPin
          size={40}
          color={color}
          weight="fill"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
    </div>
  )
}

export default Marker
