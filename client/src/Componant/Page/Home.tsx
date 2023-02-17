import React, { useState } from "react";
import { TimePicker } from 'antd';
import {Input} from "../Style/Style" ;
import axios from "../../api";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
export default function Home() {
  const [titre, setTitre] = useState("");
  const [text, setText] = useState("");
  const [niveau,setNiveau] = useState<Array<string>>([]);
  function settitre(e: any) {
    setTitre(e.target.value);
  }
  function settext(e: any) {
    setText(e.target.value);
  }
  function nivea(e:any){
    const { value,checked }= e.target;
    if(checked){
      
      setNiveau((prev):any =>
        [...prev  , value ]
      );
    }
    else{
      setNiveau((prev):any=>{
        return prev.filter(niv => niv !== value)
      })
    }
  }
  const [timeStarter , setTimeStarter] = useState(new Date().toLocaleTimeString());
  const [dateStarter , setDateStarter] = useState(new Date().toLocaleDateString());
  
  
  /* const [isImmediate , setIsImmediate] = useState(false);
  function CurrentTime(e:any){
    setIsImmediate(e.target.checked);
  } */
  const [timeEnder , setTimeEnder] = useState();
  const [dateEnder , setDateEnder] = useState();
  
  /* axios.post(
    "/Document",
    {
      timeEnder,
      dateEnder,
      timeStarter,
      dateStarter,
  },{
    'content-type': 'application/jason'
  }
  ); */
function timegetter(e:any){ 
  setTimeStarter(e[0].$d.getHours() + ":"+ e[0].$d.getMinutes());
  setTimeEnder(e[1].$d.getHours() + ":"+ e[1].$d.getMinutes());
}
const onChangeStarter: DatePickerProps['onChange'] = (date, dateString) => {
  setDateStarter(dateString)
};
const onChangeEnder: DatePickerProps['onChange'] = (date, dateString:any) => {
  setDateEnder(dateString);
};
console.log(timeStarter);
  return (
    <form>
      <label>Titre</label>
      <input type="text" id="titre" onChange={settitre} value={titre}></input>
      <label>Text</label>
      <input type="text" id="Contenu" onChange={settext} value={text}></input>
      
      <input type="checkbox" id="l1" onChange={nivea} value="L1"></input>
      <label>L1</label>
      <input type="checkbox" id="l2" onChange={nivea} value="L2"></input>
      <label>L2</label>
      <input type="checkbox" id="l3" onChange={nivea} value="L3"></input>
      <label>L3</label>
      <input type="checkbox" id="M1" onChange={nivea} value="M1"></input>
      <label>M1</label>
      <input type="checkbox" id="M2" onChange={nivea} value="M2"></input>
      <label>M2</label>

      
      {/* <input type="checkbox" onChange={CurrentTime}></input> */}

      <TimePicker.RangePicker onChange={timegetter}/>
      <Space direction="vertical">
        <DatePicker onChange={onChangeStarter} />
      </Space>
      <Space direction="vertical">
        <DatePicker onChange={onChangeEnder} />
      </Space>
      
    </form>
  );
}
