import time
from solana.rpc.api import Client
from solana.transaction import Transaction
from solana.system_program import TransferParams, transfer
from solana.keypair import Keypair
from solana.rpc.types import TxOpts
import json
import random

# RPC Endpoint
solana_client = Client("https://api.devnet.solana.com")

# Wallets
with open('wallets.json', 'r') as f:
    wallets = json.load(f)

# Sender Wallet (Private Key)
sender_wallet = Keypair.from_secret_key(bytes([INSERT_PRIVATE_KEY_HERE]))

while True:
    # Transaction Count
    max_transactions = random.randint(100, 110)  # Between 100 and 110
    transaction_count = 0

    while transaction_count < max_transactions:
        recipient_wallet = random.choice(wallets)

        # Transaction Details
        transfer_params = TransferParams(
            from_pubkey=sender_wallet.public_key,
            to_pubkey=recipient_wallet,
            lamports=int(0.0001 * 1e9)  # Amount to send (0.0001 SOL)
        )

        # Create Transaction
        transaction = Transaction().add(transfer(transfer_params))

        # Send Transaction
        response = solana_client.send_transaction(
            transaction,
            sender_wallet,
            opts=TxOpts(skip_preflight=True)
        )

        # Transaction Confirmation
        print(f"Transaction {transaction_count + 1}: {response}")

        # Increment Transaction Count
        transaction_count += 1

        # Delay before next transaction (adjusted for the number of transactions per day)
        time.sleep(24 * 60 * 60 / max_transactions)

    print(f"Completed {transaction_count} transactions. Sleeping for 24 hours.")

    # Sleep for 24 hours before starting the next round of transactions
    time.sleep(24 * 60 * 60)  # 24 hours in seconds
