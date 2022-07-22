// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

contract Mood {
    //vars
    address public owner;
    enum MoodStates { Happy, Anxious, Sad, Purposeful, Lonely, Painfully, NoMood }
    mapping (address => MoodStates) public moods;
    mapping (address => string) public moodsStr;

    //constructor
    constructor(){
        owner = msg.sender;
    }

    function getMood() public view returns(string memory){
        if(moods[msg.sender] == MoodStates.Happy){
            return "Happy";
        }
        else if (moods[msg.sender] == MoodStates.Anxious) {
            return "Anxious";
        }
        else if (moods[msg.sender] == MoodStates.Sad) {
            return "Sad";
        }
        else if (moods[msg.sender] == MoodStates.Purposeful) {
            return "Purposeful";
        }
        else if (moods[msg.sender] == MoodStates.Lonely) {
            return "Lonely";
        }
        else if (moods[msg.sender] == MoodStates.Painfully) {
            return "Painfully";
        }
        else {
            return "NoMood";
        }
    }

    function setHappyMood() public payable YouCantAfford {
        moods[msg.sender] = MoodStates.Happy;
        moodsStr[msg.sender] = "Happy";
    }

    function setAnxiousMood() public payable YouCantAfford {
        moods[msg.sender] = MoodStates.Anxious;
        moodsStr[msg.sender] = "Anxious";

    }

    function setSadMood() public payable YouCantAfford {
        moods[msg.sender] = MoodStates.Sad;
        moodsStr[msg.sender] = "Sad";

    }

    function setPurposefulMood() public payable YouCantAfford {
        moods[msg.sender] = MoodStates.Purposeful;
        moodsStr[msg.sender] = "Purposeful";

    }

    function setLonelyMood() public payable YouCantAfford {
        moods[msg.sender] = MoodStates.Lonely;   
        moodsStr[msg.sender] = "Lonely";

    }

    function setPainfullyMood() public payable YouCantAfford {
        moods[msg.sender] = MoodStates.Painfully;
        moodsStr[msg.sender] = "Painfully";

    }

    modifier YouCantAfford {
        require(msg.value == 0.02 ether, "You need to send 1 eth to set Your Mood and Get surprise");
        _;
    }
}