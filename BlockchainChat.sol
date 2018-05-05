pragma solidity ^0.4.0;

contract BlockchainChat {
    
    mapping (address => string) public members;
    Message[] public messages;
    uint private messageNumber;
    
    struct Message {
        address from;
        string message;
        uint time;
    }    
    
    function newMessage(string _message) public {
        messageNumber = messages.length++;
        Message storage m = messages[messageNumber];
        m.from = msg.sender;
        m.message = _message;
        m.time = now;
        
    }
    
    function updateName(string _name) public {
        members[msg.sender] = _name;
    }
    
    function totalMessages() public view returns (uint) {
        return messages.length;
    }
    
}
