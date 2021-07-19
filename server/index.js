const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const sv = require('./signverify');


// 07182021 SS - import elliptic library
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Challenge 2 include SHA256 library
const SHA256 = require('crypto-js/sha256');

// 07182021 SS - declare and initialize key as array
const key = [];


// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {
  "1": 100,
  "2": 50,
  "3": 75,
}

// 07182021 SS - for all key-values pair in balances generate key and display on console
console.log("Available Accounts");
console.log("------------------");

let count = 0;
for (let acctAdd in balances){
key[count] = ec.genKeyPair();
//console.log(count + " key generated")
console.log("(" + acctAdd + ") "  + key[count].getPublic().encode('hex') + " (" + balances[acctAdd] + ")" ) 
count++
}

console.log("Private Keys");
console.log("------------------");
count = 0;
for (let acctAdd in balances){
console.log("(" + acctAdd + ") "  + key[count].getPrivate().toString(16)) 
count++
}

//console.log("# of Accounts :" + count)

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount, privateKey} = req.body;
  //console.log('Private key received: ' + privateKey);
  //console.log('Sender: ' + sender);
  count = 0;
  for (let acctAdd in balances){
	//console.log('acctAdd: ' + acctAdd);
        //console.log(key[count].getPrivate().toString(16));
	if(acctAdd == sender){
		publicKey = key[count].getPublic().encode('hex')
		//console.log('publicKey : ' + publicKey );
	break;
	}else {
		count++;
	} 
  }
  if (sv.signVerify(privateKey, publicKey)){
	console.log("Message Verified");
	balances[sender] -= amount;
	balances[recipient] = (balances[recipient] || 0) + +amount;
	res.send({ balance: balances[sender] , message: "Transaction authenticated successfully" });
  }else {
	res.send({ balance: balances[sender] , message: "Transaction authentication failed" });
}    
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
