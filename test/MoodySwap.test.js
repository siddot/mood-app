const MoodyToken = artifacts.require('MoodyToken')
const MoodySwap = artifacts.require('MoodySwap')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('MoodySwap', ([deployer, investor]) => {
  let token, moody_Swap

  before(async () => {
    token = await MoodyToken.new()
    moody_Swap = await MoodySwap.new(token.address)
    // Transfer all tokens to MoodySwap (1 million)
    await token.transfer(moody_Swap.address, tokens('1000000'))
  })

  describe('MoodyToken deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Moody Token')
    })
  })

  describe('MoodySwap deployment', async () => {
    it('contract has a name', async () => {
      const name = await moody_Swap.name()
      assert.equal(name, 'MoodySwap Instant Exchange')
    })

    it('contract has tokens', async () => {
      let balance = await token.balanceOf(moody_Swap.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('buyTokens()', async () => {
    let result

    before(async () => {
      // Purchase tokens before each example
      result = await moody_Swap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      // Check ethSwap balance after purchase
      let moodySwapBalance
      moodySwapBalance = await token.balanceOf(moody_Swap.address)
      assert.equal(moodySwapBalance.toString(), tokens('999900'))
      moodySwapBalance = await web3.eth.getBalance(moody_Swap.address)
      assert.equal(moodySwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })

  describe('sellTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await token.approve(moody_Swap.address, tokens('100'), { from: investor })
      // Investor sells tokens
      result = await moody_Swap.sellTokens(tokens('100'), { from: investor })
    })

    it('Allows user to instantly sell tokens to ethSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check ethSwap balance after purchase
      let moodySwapBalance
      moodySwapBalance = await token.balanceOf(moody_Swap.address)
      assert.equal(moodySwapBalance.toString(), tokens('1000000'))
      moodySwapBalance = await web3.eth.getBalance(moody_Swap.address)
      assert.equal(moodySwapBalance.toString(), web3.utils.toWei('0', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')

      // FAILURE: investor can't sell more tokens than they have
      await moody_Swap.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })
  describe("GetUniqueMood()", async ()=> {
    let result;

    before(async()=>{
      await moody_Swap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
      await token.approve(moody_Swap.address, tokens('20'), {from: investor})
      result = await moody_Swap.GetUniqueMood(tokens('20'), {from: investor})
    })
    it('allows user to get unique mood for our MOOD tokens', async()=>{
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('80'))

      let moodySwapBalance
      moodySwapBalance = await token.balanceOf(moody_Swap.address)
      assert.equal(moodySwapBalance.toString(), tokens('999920'))
      moodySwapBalance = await web3.eth.getBalance(moody_Swap.address)
      assert.equal(moodySwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('20').toString())

      await moody_Swap.sellTokens(tokens('500'), { from: investor }).should.be.rejected;

    })
  })

})