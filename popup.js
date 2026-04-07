document.getElementById('checkBtn').addEventListener('click', async () => {
    const password = document.getElementById('passInput').value;
    const resultArea = document.getElementById('result-area');
    const strengthLabel = document.getElementById('strengthLabel');

    if (!password) return;

    resultArea.innerHTML = "<div style='text-align:center; font-size:0.8rem; color:#64748b;'>AUDITING DATABASE...</div>";

    const complexity = checkComplexity(password);
    updateMeter(complexity.score, complexity.label);

    try {
        // 1. Generate SHA-1 Hash
        const msgUint8 = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
        const hashHex = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();

        const prefix = hashHex.substring(0, 5);
        const suffix = hashHex.substring(5);

        // 2. Query HIBP Range API
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
            headers: { 'User-Agent': 'PassGuard-Pro-Audit' }
        });
        const data = await response.text();

        const lines = data.split('\n');
        let breachCount = 0;
        for (const line of lines) {
            const [returnedSuffix, count] = line.split(':');
            if (returnedSuffix === suffix) {
                breachCount = parseInt(count);
                break;
            }
        }

        // 3. Render Result Card
        renderResult(breachCount, complexity);

    } catch (error) {
        resultArea.innerHTML = "<div style='color:#ef4444; font-size:0.8rem;'>API CONNECTION FAILED</div>";
    }
});

function checkComplexity(pwd) {
    let score = 0;
    if (pwd.length > 8) score++;
    if (pwd.length > 14) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const labels = ["CRITICAL", "WEAK", "FAIR", "STRONG", "V. STRONG", "GOD-TIER"];
    return { score: Math.min(score, 5), label: labels[score] };
}

function updateMeter(score, label) {
    const meter = document.getElementById('meter');
    const strengthLabel = document.getElementById('strengthLabel');
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#38bdf8", "#22c55e", "#10b981"];

    meter.style.width = ((score + 1) * 16.6) + "%";
    meter.style.backgroundColor = colors[score];
    strengthLabel.innerText = label;
    strengthLabel.style.color = colors[score];
}

function renderResult(breachCount, complexity) {
    const resultArea = document.getElementById('result-area');
    let statusClass = "secure";
    let statusTitle = "SECURE";
    let message = "This password was not found in any public data breaches.";

    if (breachCount > 0) {
        statusClass = "critical";
        statusTitle = "COMPROMISED";
        message = `Found in <strong>${breachCount.toLocaleString()}</strong> breaches. Risk: Extremely High.`;
    } else if (complexity.score < 3) {
        statusClass = "warning";
        statusTitle = "VULNERABLE";
        message = "Not found in breaches, but complexity is too low for security.";
    }

    resultArea.innerHTML = `
    <div class="result-card ${statusClass}">
      <div class="status-title">${statusTitle}</div>
      <div class="status-msg">${message}</div>
      <div class="detail-row">
        <span>COMPLEXITY SCORE</span>
        <span style="color: inherit">${complexity.label}</span>
      </div>
    </div>
  `;
}