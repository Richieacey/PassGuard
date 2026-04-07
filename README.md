# 🛡️ PassGuard - Breach Checker

PassGuard is a professional-grade browser extension designed to audit your passwords for complexity and potential exposure in known data breaches. Built with privacy and security as top priorities, it utilizes the Have I Been Pwned API to provide real-time security insights without ever exposing your plain-text password.

![PassGuard UI](https://raw.githubusercontent.com/Richieacey/PassGuard/main/icon.png)

## ✨ Features

- **Breach Audit**: Instantly check if your password appears in billions of leaked credentials from public data breaches.
- **Entropy Analysis**: Real-time complexity scoring ranging from "CRITICAL" to "GOD-TIER".
- **K-Anonymity Protection**: Uses the Range API to send only the first 5 characters of your password's SHA-1 hash, ensuring your full hash and password never leave your machine.
- **Premium UI**: Sleek, dark-themed interface with smooth animations and responsive feedback.
- **Manifest V3**: Built on the latest Chrome extension standards for better security and performance.

## 🛠️ How It Works

PassGuard prioritizes your privacy through a method called **K-Anonymity**:

1. **Local Hashing**: Your password is hashed locally using the SHA-1 algorithm.
2. **Range Query**: Only the **first 5 characters** of that hash are sent to the Have I Been Pwned API.
3. **Local Comparison**: The API returns a list of hashes that match those first 5 characters. PassGuard then compares the remaining part of your hash against this list locally.
4. **Result**: If a match is found, it notifies you of exactly how many times that password has been seen in breaches.

## 🚀 Installation (Developer Mode)

Since this is a developer version, follow these steps to install:

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the folder containing the PassGuard files.
5. Pin the extension for quick access!

## 💻 Tech Stack

- **Structure**: Semantic HTML5
- **Logic**: Vanilla JavaScript (Async/Await, Crypto API)
- **Styling**: Modern CSS (Custom Properties, Flexbox, Animations)
- **API**: [Have I Been Pwned (Pwned Passwords)](https://haveibeenpwned.com/API/v3#PwnedPasswords)

## 🔒 Privacy Policy

PassGuard is purely client-side. We do not collect, store, or transmit your passwords. All communication with the Pwned Passwords API is done via anonymized hash prefixes.

---

*Stay safe. Guard your pass.*
