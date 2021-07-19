exports.signVerify = function (privateKey, publicKey){
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256');

//console.log('checking if it is called123: ' + privateKey + " & " + publicKey )

//SIGN CODE BEGINS
// TODO: fill in your hex private key
//const privateKey = privateKey;

let key = ec.keyFromPrivate(privateKey);

// TODO: change this message to whatever you would like to sign
const message = "Sender wish to transfer funds";

let msgHash = SHA256(message);

let signature = key.sign(msgHash.toString());

console.log({
  message,
  signature: {
    r: signature.r.toString(16),
    s: signature.s.toString(16)
  }
});
//SIGN CODE ENDS


//VERIFY CODE BEGINS
// TODO: fill in the public key points
//const publicKey = {
//  x: "eec6e511391c18cd6d8d948c848c69f380ac6a1b586d3fdc04442e9100dc9810",
//  y: "83cfc2a87735c46095298ab48d4403a4105ff268797ef215f299dc8044da4f15"
//}

key = ec.keyFromPublic(publicKey, 'hex');

// TODO: change this message to whatever was signed
msg = "Sender wish to transfer funds";
msgHash = SHA256(msg).toString();

// TODO: fill in the signature components
const vsignature = {
  r: signature.r.toString(16),
  s: signature.s.toString(16)
};

console.log(key.verify(msgHash, vsignature));
return key.verify(msgHash, vsignature)

//VERIFY CODE ENDS

}