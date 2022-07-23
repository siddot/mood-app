import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import React, { Component } from 'react';
import Web3 from 'web3';
import Mood from './abis/Mood.json'
import MoodySwap from './abis/MoodySwap.json'
import MoodyToken from './abis/MoodyToken.json'



export default class App extends Component {
async componentWillMount() {
  await this.loadWeb3()
  await this.loadBlockchainData()
}

async loadBlockchainData() {
  const web3 = window.web3

  const accounts = await web3.eth.getAccounts()
  this.setState({ account: accounts[0] })
  
  // const ethBalance = web3.eth.getBalance(this.state.account).then(console.log);
  // this.setState({ ethBalance })
  let ethBalance = await web3.eth.getBalance(accounts[0])
  this.setState({ ethBalance })


  const networkId = await web3.eth.net.getId()

  // load Mood
  const moodData = Mood.networks[networkId]
  if(moodData) {
    const mood = new web3.eth.Contract(Mood.abi, moodData.address)
    this.setState({ mood })
    let moodState = await mood.methods.moodsStr(this.state.account).call()
    this.setState({ moodState: moodState })
  } else {
    window.alert('Token contract not deployed to detected network.')
  }

  // Load MoodySwap
  const MoodySwapData = MoodySwap.networks[networkId]
  if(MoodySwapData) {
    const moody_Swap = new web3.eth.Contract(MoodySwap.abi, MoodySwapData.address)
    this.setState({ moody_Swap })
  } else {
    window.alert('MoodySwap contract not deployed to detected network.')
  }

  // load token
  const tokenData = MoodyToken.networks[networkId]
  if(tokenData) {
    const token = new web3.eth.Contract(MoodyToken.abi, tokenData.address)
    this.setState({ token })
    let tokenBalance = await token.methods.balanceOf(this.state.account).call()
    this.setState({ tokenBalance: tokenBalance.toString() })
  } else {
    window.alert('Token contract not deployed to detected network.')
  }
}

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

// Swap Methods
  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.moody_Swap.methods.buyTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.moody_Swap._address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.moody_Swap.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }
  GetUniqueMood = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.moody_Swap._address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.moody_Swap.methods.GetUniqueMood(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }
// Mood methods
becomeHappy = (ethAm) => {
  this.state.mood.methods.setHappyMood().send({ value: ethAm, from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ happy: !this.state.happy })
    this.setState({ sad:false })
    this.setState({ painfully: false })
    this.setState({ lonely: false })
    this.setState({ anxsious: false})
    this.setState({ purposeful: false })

  })
}
becomeSad = (ethAm) => {
  this.state.mood.methods.setSadMood().send({ value: ethAm, from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ sad: !this.state.sad })
    this.setState({ painfully: false })
    this.setState({ lonely: false })
    this.setState({ happy: false })
    this.setState({ anxsious: false})
    this.setState({ purposeful: false })

  })
}
becomePurposeful = (ethAm) => {
  this.state.mood.methods.setPurposefulMood().send({ value: ethAm, from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ purposeful: !this.state.purposeful })
    this.setState({ happy: false })
    this.setState({ lonely: false })
    this.setState({ painfully: false })
    this.setState({ sad: false })
    this.setState({ anxsious: false })

  })
}
becomeAnxsious = (ethAm) => {
  this.state.mood.methods.setAnxsiousMood().send({ value: ethAm, from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ anxsious: !this.state.anxsious })
    this.setState({ lonely: false })
    this.setState({ happy: false })
    this.setState({ purposeful: false })
    this.setState({ painfully: false })
    this.setState({ sad: false })

  })
}
becomeLonely = (ethAm) => {
  this.state.mood.methods.setLonelyMood().send({ value: ethAm, from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ lonely: !this.state.lonely })
    this.setState({ sad: false })
    this.setState({ happy: false })
    this.setState({ anxious: false })
    this.setState({ purposeful: false })
    this.setState({ painfully: false })
  })
}
becomePainfully = (ethAm) => {
  this.state.mood.methods.setPainfullyMood().send({ value: ethAm, from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ painfully: !this.state.painfully })
    this.setState({ sad: false })
    this.setState({ happy: false })
    this.setState({ anxious: false })
    this.setState({ purposeful: false })
    this.setState({ lonely: false })

  })
}

constructor(props) {
  super(props)
  this.state = {
    account: '',
    mood: {},
    moodState: '',
    moody_Swap: {},
    token: {},
    tokenBalance: '0',
    happy: false,
    sad: false,
    anxious: false,
    purposeful: false,
    lonely: false,
    painfully: false,
    ethBalance: '0'

  }
}
render() {

  return (
    <div>
      <Navbar />
      <Main 
          becomeHappy={this.becomeHappy}
          becomeAnxsious={this.becomeAnxsious}
          becomeLonely = {this.becomeLonely}
          becomePainfully = {this.becomePainfully}
          becomePurposeful = {this.becomePurposeful}
          becomeSad = {this.becomeSad}
          moodState={this.state.moodState} 
          account={this.state.account}
          ethBalance={this.state.ethBalance}
          tokenBalance={this.state.tokenBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
          getUniqueMood = {this.GetUniqueMood}
        />
    </div>
  )
}
}

