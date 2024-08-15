const web3 = require('@solana/web3.js');
const bs58 = require('bs58');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connection = new web3.Connection('https://devnet.solana.com', 'confirmed');

const privateKey = process.env.PRIVATE_KEY;
const recipientAddress = process.env.RECIPIENT_ADDRESS;

if (!privateKey || !recipientAddress) {
  console.error('Missing PRIVATE_KEY or RECIPIENT_ADDRESS in the .env file');
  process.exit(1);
}

const fromWallet = web3.Keypair.fromSecretKey(bs58.decode(privateKey));
const recipientPublicKey = new web3.PublicKey(recipientAddress);

const sol = 1000000000;
const lamportsToSend = Math.floor(0.0001 * sol); // Convert SOL to lamports

let transactionCount = 0;
const maxTransactions = 110;

const getRandomDelay = () => {
  // Generate a random delay between 15 and 20 seconds
  return Math.floor(Math.random() * 6 + 15) * 1000;
};

const transferToRecipient = async () => {
  try {
    if (transactionCount >= maxTransactions) {
      console.log('Reached maximum number of transactions. Stopping for 24 hours.');
      transactionCount = 0; // Reset count after sleeping
      await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000)); // Sleep for 24 hours
    }

    const balanceMainWallet = await connection.getBalance(fromWallet.publicKey);
    const balanceLeft = balanceMainWallet - lamportsToSend;

    if (balanceLeft < 0) {
      console.log('Not enough balance to transfer');
    } else {
      console.log('Wallet A balance:', balanceMainWallet);

      const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: fromWallet.publicKey,
          toPubkey: recipientPublicKey,
          lamports: lamportsToSend,
        })
      );

      const signature = await web3.sendAndConfirmTransaction(connection, transaction, [fromWallet]);
      console.log('Transfer signature:', signature);

      const balanceOfWalletB = await connection.getBalance(recipientPublicKey);
      console.log('Wallet B balance:', balanceOfWalletB);

      transactionCount++;
    }

    const delay = getRandomDelay();
    console.log(`Next transfer in ${delay / 1000} seconds`);
    await new Promise(resolve => setTimeout(resolve, delay));
    transferToRecipient(); // Recursive call for continuous transfers
  } catch (error) {
    console.error('Error during transfer:', error.message);
  }
};

transferToRecipient();
