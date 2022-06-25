import React from 'react'

export default function StdIn(props) {
    const stdchangehandler = (event)=>{
        props.setstdin(event.target.value)
    }
  return (
    <div className='form-group'>
        <label className='h3'>Std Input</label>
        <input type={"textarea"} name = "stdin" onChange={stdchangehandler} height = '100px' className='form-control'/>
    </div>
  )
}
