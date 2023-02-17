import React from 'react'
import {Items} from "../Style/Style"
const array = [
    {titre:"hmidan",
    date:"12:53",
    text:"this is garbage dont mind it at all"
    },
    {titre:"hmidan",
    date:"12:53",
    text:"this is garbage dont mind it at all"
    },
]
export default function Archive() {
  return (
    <div>
        {array.map((item,index)=>(
            <Items key={index}>
                <p><b>{item.titre}</b></p>
                <p>{item.text}</p>
                <p>{item.date}</p>
            </Items>
        ))}
        
    </div>
  )
}
