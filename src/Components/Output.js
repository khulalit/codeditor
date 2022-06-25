import React, { useEffect, useState } from 'react'
const style = {
  overflow : "scroll",
  height : '100%',
  padding : '4px'
}

export default function Output(props) {
    
  return (
    <div style={{height : '100%'}}>
        <div style={style}>
            {props.value}
            
        </div>
        </div>
  )
}
