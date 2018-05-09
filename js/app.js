// Blockchain Chat Contract Interface
var blockchainChatContract;
// Total Messages
var totalMessages;

// Web3 start function, It will run when the web page is loaded

  blockchainChatContract = web3.eth.contract(blockchainChatABI).at(blockchainChatAddress);
  getTotalMessages();

// Get the list of total number of messages
function getTotalMessages() {

  blockchainChatContract.totalMessages(function (error, result) {
    totalMessages = result.c[0];
    document.getElementById("TotalMessages").innerHTML = totalMessages;
    getAllMessages();
  })
}

// Get all Messages from smart contract
function getAllMessages() {

    for (var i = 0; i < totalMessages; i++) {
      getMessages(i);
    }
}

// Get one message from smart contract
function getMessages(messageNumber) {

  blockchainChatContract.messages(messageNumber, function (error, result) {
    getName(result);
  })
}

// Get name of the message sender from smart contract
function getName(argument) {

    var newAddress = argument[0];
    var newMessage = argument[1];
    var newTime = argument[2];
    blockchainChatContract.members(newAddress, function (error, result) {
      postOnPage(result, newAddress, newMessage, newTime);
    });
}

// Post the message on the website
function postOnPage(_name, _address, _message, _time) {

        var d = new Date(0);
        d.setUTCSeconds(_time);
        var a1 = '<div class="container"><xmp>';
        var a2 = '</xmp><span class="sender-left">';
        var a3 = '<a href="https://rinkeby.etherscan.io/address/'+_address+'" target="_blank">'
        var a4 = '</a></span><span class="time-right"> ';
        var a5 = '</span></div>'

        var cardTemplate = a1 + _message + a2 + _name +' - '+ a3 + _address + a4 + d + a5;

        var mydiv = document.getElementById("chat_list");
        var newDiv = document.createElement('div');
        newDiv.innerHTML = cardTemplate;

        while (newDiv.firstChild) {
            mydiv.appendChild(newDiv.firstChild);
        }
}

// Update new name in smart contract
function newName() {

    var name = document.getElementById("NewName").value;
    blockchainChatContract.updateName(name, function (error, result) {})
}

// Send new message in smart contract
function newMessage() {

    var message = document.getElementById("NewMessage").value;
    blockchainChatContract.newMessage(message, function (error, result) {})
}
