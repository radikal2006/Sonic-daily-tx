# Sonic-daily-tx
This repository contains a script that automates daily transactions on the Sonic testnet, a layer-2 for Solana, using @solana/web3.js. The script sends SOL assets from your wallet to random addresses, designed to meet the requirements for the Sonic airdrop.

1. نصب پیش‌نیازها
نصب Python:
مطمئن شوید که Python 3.x بر روی سیستم شما نصب شده است. برای نصب Python می‌توانید از وب‌سایت رسمی Python استفاده کنید.

bash
Copy code
python3 --version
اگر Python نصب نشده است، آن را نصب کنید. در اوبونتو می‌توانید با دستور زیر نصب کنید:

bash
Copy code
sudo apt update
sudo apt install python3 python3-pip
نصب Git:
Git برای کلون کردن مخزن از GitHub نیاز است. می‌توانید با دستور زیر آن را نصب کنید:

bash
Copy code
sudo apt update
sudo apt install git
2. کلون کردن مخزن از GitHub
کلون کردن مخزن:
آدرس URL مخزن GitHub خود را پیدا کنید و با استفاده از دستور git clone مخزن را بر روی سیستم خود کلون کنید. به عنوان مثال:

bash
Copy code
git clone https://github.com/yourusername/your-repo.git
به جای yourusername/your-repo، نام کاربری و نام مخزن خود را وارد کنید.

ورود به دایرکتوری پروژه:

bash
Copy code
cd your-repo
3. نصب وابستگی‌ها
ساخت محیط مجازی (اختیاری):
برای مدیریت بهتر وابستگی‌ها، استفاده از محیط مجازی توصیه می‌شود. با دستور زیر یک محیط مجازی بسازید و فعال کنید:

bash
Copy code
python3 -m venv env
source env/bin/activate
نصب وابستگی‌ها:
معمولاً وابستگی‌های پروژه در یک فایل requirements.txt لیست می‌شوند. برای نصب این وابستگی‌ها از دستور زیر استفاده کنید:

bash
Copy code
pip install -r requirements.txt
اگر چنین فایلی وجود ندارد، وابستگی‌ها را به صورت دستی نصب کنید. برای این اسکریپت، وابستگی‌های اصلی solana و requests هستند:

bash
Copy code
pip install solana requests
4. تنظیم اسکریپت
ویرایش فایل‌ها:
قبل از اجرای اسکریپت، مطمئن شوید که فایل‌های پیکربندی مانند wallets.json و فایل‌های دیگر به درستی پیکربندی شده‌اند. همچنین در فایل اسکریپت Python، آدرس خصوصی کیف پول خود را جایگزین کنید:

python
Copy code
sender_wallet = Keypair.from_secret_key(bytes([INSERT_PRIVATE_KEY_HERE]))
INSERT_PRIVATE_KEY_HERE را با کلید خصوصی واقعی خود جایگزین کنید.

تنظیم آدرس کیف پول‌ها:
در فایل wallets.json، لیست آدرس‌های گیرنده را اضافه یا ویرایش کنید. مطمئن شوید که این فایل در همان دایرکتوری که اسکریپت است، قرار دارد.

5. اجرای اسکریپت
برای اجرای اسکریپت، از دستور زیر استفاده کنید:

bash
Copy code
python3 your_script.py
به جای your_script.py نام فایل اسکریپت خود را وارد کنید.

6. مشاهده و مدیریت
بررسی خروجی:
اسکریپت به طور خودکار در کنسول اطلاعات تراکنش‌ها را چاپ می‌کند. شما می‌توانید خروجی‌ها را برای بررسی صحت تراکنش‌ها مشاهده کنید.

مدیریت اسکریپت:
اگر نیاز به متوقف کردن اسکریپت دارید، می‌توانید با فشار دادن Ctrl + C در ترمینال آن را متوقف کنید.

با این مراحل، شما می‌توانید اسکریپت خود را از GitHub کلون کرده، وابستگی‌ها را نصب کرده و اسکریپت را اجرا کنید. اگر سوالات یا مشکلاتی داشتید، خوشحال می‌شوم که کمک کنم!
