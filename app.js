// Token Contract Interface
var blockchainChatContract;
// Total Messages
var totalMessages;
// Web3 start function, It will run when the web page is loaded
function startWeb3() {

  blockchainChatContract = web3.eth.contract(blockchainChatABI).at(blockchainChatAddress);

  getTotalMessages();
  // getAllMessages();
}

// Get the list of total number of messages
function getTotalMessages() {
  blockchainChatContract.totalMessages(function (error, result) {
    totalMessages = result.c[0];
    console.log("Total messages are " + totalMessages);
    getAllMessages();
  })
}

function getAllMessages() {
    for (var i = 0; i < totalMessages; i++) {
      getMessages(i);
    }
}

function getMessages(messageNumber) {
  blockchainChatContract.messages(messageNumber, function (error, result) {
    // totalMessages = result.c[0];
    console.log(result);
    getName(result);
  })
}


function getName(argument) {

    var newName = argument[0];
    var newMessage = argument[1];
    var newTime = argument[2];
    blockchainChatContract.members(newName, function (error, result) {
      postOnPage(result, newMessage, newTime);
    });
}

function postOnPage(_name, _message, _time) {

        var d = new Date(0);
        d.setUTCSeconds(_time);
        var a1 = '<div class="container"><p>';
        var a2 = '</p><span class="sender-left">';
        var a3 = '</span><span class="time-right">';
        var a4 = '</span></div>'

        var cardTemplate = a1 + _message + a2 + _name + a3 + d + a4;

        var mydiv = document.getElementById("chat_list");
        var newDiv = document.createElement('div');
        newDiv.innerHTML = cardTemplate;

        while (newDiv.firstChild) {
            mydiv.appendChild(newDiv.firstChild);
        }
}

function newName() {

    var name = document.getElementById("NewName").value;

    blockchainChatContract.updateName(name, function (error, result) {})

}

function newMessage() {

    var message = document.getElementById("NewMessage").value;

    blockchainChatContract.newMessage(message, function (error, result) {})
}
