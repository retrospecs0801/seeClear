const filters = {
  protanopia: 'brightness(1) contrast(1) sepia(0.2) saturate(0.8)',
  deuteranopia: 'brightness(1) contrast(1) sepia(0.1) saturate(0.7)',
  tritanopia: 'brightness(0.9) hue-rotate(45deg) saturate(0.7)'
};

// Existing manual filter buttons
document.getElementById("protanopiaBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: (matrix) => window.applyColorBlindFilter(matrix),
      args: [filters.protanopia]
    });
  });
});

document.getElementById("deuteranopiaBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: (matrix) => window.applyColorBlindFilter(matrix),
      args: [filters.deuteranopia]
    });
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: () => window.resetColorBlindFilter()
    });
  });
});

// 🧠 NEW: Analyze color confusion using Gemini API
document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const userDescription = document.getElementById("userDescription").value.trim();
  if (!userDescription) {
    alert("Please describe how you perceive or confuse colors.");
    return;
  }

  const type = await identifyColorBlindness(userDescription);
  alert(type);

  if (!type) {
    alert("Could not detect color blindness type.");
    return;
  }

  // Apply detected filter
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: (matrix) => window.applyColorBlindFilter(matrix),
      args: [filters[type] || filters.deuteranopia] // fallback
    });
  });

  alert(`Detected color blindness type: ${type}`);
});

// 🧩 Gemini API helper function
async function identifyColorBlindness(description) {

    
  const prompt = `
Identify the most likely type of color blindness based on how the user describes colors.
They may describe confusion ("red and green look similar") or how a color appears ("red looks brownish").
Return one word: protanopia, deuteranopia, tritanopia, or normal vision.

Examples:
- "Red and green look similar" → protanopia
- "Blue and green look similar" → tritanopia
- "Red looks brownish" → protanopia
- "Green looks faded" → deuteranopia
- "No issues seeing colors" → normal vision

Description: "${description}"
  `;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCea2ZfD2znQqSZTEaXuRLeUht8rjBEGMc",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();
    console.log("Gemini Output:", result);
    return result;
  } catch (err) {
    console.error("Gemini API error:", err);
    alert(" gemini api error");
    return null;
  }
}
