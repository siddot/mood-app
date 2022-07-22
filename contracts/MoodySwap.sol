// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./MoodyToken.sol";

contract MoodySwap { 
  string public name = "MoodySwap Instant Exchange";
  MoodyToken public token;
  uint public rate = 100;

  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(MoodyToken _token) {
    token = _token;
  }

  function buyTokens() public payable {
    uint tokenAmount = msg.value * rate;

    require(token.balanceOf(address(this)) >= tokenAmount);

    token.transfer(msg.sender, tokenAmount);

    emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  function sellTokens(uint _amount) public {
    require(token.balanceOf(msg.sender) >= _amount);

    uint etherAmount = _amount / rate;

    require(address(this).balance >= etherAmount);

    token.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);

    emit TokensSold(msg.sender, address(token), _amount, rate);
  }
}