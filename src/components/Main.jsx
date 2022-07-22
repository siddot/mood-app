import React from 'react'

export default function Main (props) {
  let ethAm="0.02"; 
  ethAm = window.web3.utils.toWei(ethAm, 'Ether'); 
  return (
    <div>
        <div className="card mb-3 size cardCont">
            <div className="row g-0">
                <div className="col-md-4">
                    {/* <img src={require('./male-profile.jpeg')} className="img-fluid rounded-start" alt="..."/> */}
                    <img src={require("./male-profile.jpeg")} className="img-fluid rounded-start" alt="..."/>
                    
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title navTitle">{props.account}</h3>
                        {props.moodState === "" ? <h6>Нет настроения вообще</h6> : <h6>{props.moodState}</h6>}
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="cardCont1">
            <div className="btn-group aga" role="group" aria-label="Basic mixed styles example">
                <button onClick = {(event) => {
                    event.preventDefault()
                    props.becomeHappy(ethAm)
                }} type="button" className="btn happy">Счастлив</button>
                <button onClick = {(event) => {
                    event.preventDefault()
                    props.becomeSad(ethAm)
                }} type="button" className="btn sad">Грустно</button>
                <button onClick = {(event) => {
                    event.preventDefault()
                    props.becomePurposeful(ethAm)
                }} type="button" className="btn purposefull">Нацеленный</button>
                <button onClick = {(event) => {
                    event.preventDefault()
                    props.becomeLonely(ethAm)
                }} type="button" className="btn lonely">Одиноко</button>
                <button onClick = {(event)=>{
                    event.preventDefault()
                    props.becomeAnxsious(ethAm)
                }} type="button" className="btn anxios">Раздражен</button>
                <button onClick = {(event) => {
                    event.preventDefault()
                    props.becomePainfully(ethAm)
                }} type="button" className="btn painfully">Больно</button>
            </div>
            
        </div>
    </div>

  )
}