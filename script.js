const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');

// آدرس RPC شبکه تست‌نت سونیک (Solana Devnet)
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// کلید خصوصی ولت فرستنده (مطمئن شوید که کلید خصوصی صحیح را استفاده می‌کنید)
const secretKey = Uint8Array.from([
    // کلید خصوصی در اینجا قرار دهید (32 بایت)
    // توجه: این صرفاً یک مثال است. از کلید خصوصی واقعی خود استفاده نکنید!
]);

const senderWallet = solanaWeb3.Keypair.fromSecretKey(secretKey);

// بارگیری آدرس‌های ولت‌های گیرنده از فایل wallets.json
const walletData = fs.readFileSync('wallets.json');
const randomReceiverAddresses = JSON.parse(walletData);

async function sendTransaction(receiverAddress, amount) {
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: senderWallet.publicKey,
            toPubkey: new solanaWeb3.PublicKey(receiverAddress),
            lamports: solanaWeb3.LAMPORTS_PER_SOL * amount, // تبدیل SOL به Lamports
        })
    );

    try {
        const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [senderWallet]);
        console.log(`Transaction successful with signature: ${signature}`);
    } catch (error) {
        console.error(`Transaction failed: ${error}`);
    }
}

async function main() {
    const numberOfTransactions = 20;

    for (let i = 0; i < numberOfTransactions; i++) {
        const randomIndex = Math.floor(Math.random() * randomReceiverAddresses.length);
        const receiverAddress = randomReceiverAddresses[randomIndex];
        await sendTransaction(receiverAddress, 0.0001); // ارسال 0.0001 SOL در هر تراکنش
        console.log(`Transaction ${i + 1} sent to ${receiverAddress}.`);
    }
}

main();
