import React, { useState } from 'react'
import BuyForm from './BuyForm';
import SellForm from './SellForm';

export default function Main (props) {
  const [currentForm, setCurrentForm] = useState('buy')
  let content;
  if(currentForm === "buy"){
    content = <BuyForm
        ethBalance={props.ethBalance}
        tokenBalance = {props.tokenBalance}
        buyTokens={props.buyTokens}    
    />
  }
  else{
    content = <SellForm
        ethBalance = {props.ethBalance}
        tokenBalance = {props.tokenBalance}
        sellTokens = {props.sellTokens}
    />
  }
  let ethAm="0.02"; 
  ethAm = window.web3.utils.toWei(ethAm, 'Ether'); 
  return (
    <div>
      <div id="content" className="mt-3">

        <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-light" onClick={(event) => { setCurrentForm('buy')}}>Buy</button>
            <span className="text-muted">&lt; &nbsp; &gt;</span>
            <button className="btn btn-light" onClick={(event) => { setCurrentForm('sell')}}>Sell</button>
        </div>

        <div className="card mb-4" >
            <div className="card-body">
                {content}
            </div>
        </div>

      </div>
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