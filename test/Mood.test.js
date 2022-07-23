
const Mood = artifacts.require('Mood')


require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Mood', ([deployer, investor]) => {
    let moodContract;
    before(async () => {
        moodContract = await Mood.new();
    });
    describe('MoodContract set mood function testing', async () => {
        before(async()=>{
            result = await moodContract.setHappyMood({from: investor, value: web3.utils.toWei('0.02', 'ether')})
        });
        it("set mood", async () => {
            let investorsMood = await moodContract.moodsStr(investor);
            assert.equal(investorsMood, 'Happy')
        })
    });
    
})