The changes in the project incorporates two challenges:

1. Challenge 1: Public Key Balances
Here when the server is started the available accounts and their public and private keys are displayed on the server console

2. Challenge 2: Digital Signatures
Here following has been modified:
1. Added a new field on UI to have user enter the private key for the sender and a text field to return server message when transfer amount button is clicked
2. Upon clicking transfer amount button, code will first encrypt a predefined message using the private key given
3. Then, it will decrypt the same predefined message using the public key of the sender.
4. If both the signatures in step 2.2 and 2.3 above can be verified then executes the transaction else display error message that transaction was failed.
