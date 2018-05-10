
var userPrivateKey = "";
var userPublicKey = "";

// generate new address
function generateNewAddress() {

  var wallet = ethereumjs.Wallet.generate();
  var walletPrivateKey = wallet.privKey;
  getPublicKey(walletPrivateKey);
}

// Getting private key from the user for signing the transactions
function userProvidedPrivateKey() {

  userPrivateKey = document.getElementById("UserPrivateKey").value;
  document.getElementById("UserPrivateKey").value = "";
  getPublicKey(userPrivateKey);
}

// Generating the public key
function getPublicKey(_privateKey) {

  var publicKeyBuff = ethereumjs.Util.privateToAddress(_privateKey);
  var privateKey = ethereumjs.Util.bufferToHex(_privateKey);
  var publicKey = ethereumjs.Util.bufferToHex(publicKeyBuff);
  var publicKeyCheckSum = ethereumjs.Util.toChecksumAddress(publicKey);
  userPrivateKey = privateKey;
  userPublicKey = publicKeyCheckSum;
  document.getElementById("PrivateKey").innerHTML = userPrivateKey;
  document.getElementById("PublicKey").innerHTML = userPublicKey;
}


function sentTransaction(_data) {

  web3.eth.getTransactionCount(userPublicKey, function (err, nonce) {

      var formatedPrivteKey = userPrivateKey.substring(2);
      var tx = new ethereumjs.Tx({
        nonce: nonce,
        gasPrice: web3.toHex(web3.toWei('1', 'gwei')),
        gasLimit: 1e6,
        to: blockchainChatAddress,
        value: 0,
        data: _data,
      });

      tx.sign(ethereumjs.Buffer.Buffer.from(formatedPrivteKey, 'hex'));

      var raw = '0x' + tx.serialize().toString('hex');

      web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
        console.log(transactionHash);
      });
    })
}

