import React from 'react'
import Select from 'react-select'
import { languageOptions } from '../constants/landOption'


export default function Dropdown(props) {
  const ChangeHandler = (event)=>{
    console.log(event.label)
    props.setlang(event.value)
    props.setlang_id(event.id)
  }
  return (
    <div className='p'>
        <Select options={languageOptions} onChange={ChangeHandler} />
    </div>
  )
}

