const filters = {
  protanopia: 'brightness(1) contrast(1) sepia(0.2) saturate(0.8)',
  deuteranopia: 'brightness(1) contrast(1) sepia(0.1) saturate(0.7)',
  tritanopia: 'brightness(0.9) hue-rotate(45deg) saturate(0.7)'
};

// Helper function to apply filter
function applyFilter(tabs, filterValue) {
  // Check if it's a chrome:// URL
  if (tabs[0].url.startsWith('chrome://') || tabs[0].url.startsWith('chrome-extension://')) {
    alert('Cannot apply filters on Chrome internal pages. Please open a regular website.');
    return;
  }

  chrome.scripting.executeScript({
    target: {tabId: tabs[0].id},
    func: (matrix) => {
      document.body.style.filter = matrix;
    },
    args: [filterValue]
  });
}

// Existing manual filter buttons
document.getElementById("protanopiaBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    applyFilter(tabs, filters.protanopia);
  });
});

document.getElementById("deuteranopiaBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    applyFilter(tabs, filters.deuteranopia);
  });
});

document.getElementById("tritanopiaBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    applyFilter(tabs, filters.tritanopia);
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    // Check if it's a chrome:// URL
    if (tabs[0].url.startsWith('chrome://') || tabs[0].url.startsWith('chrome-extension://')) {
      alert('Cannot reset filters on Chrome internal pages.');
      return;
    }

    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: () => {
        document.body.style.filter = "none";
      }
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
 
  if (!type) {
    alert("Could not detect color blindness type or you have normal vision.");
    return;
  }

  // Apply detected filter
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    applyFilter(tabs, filters[type] || filters.deuteranopia);
    alert(`Detected color blindness type: ${type}`);
  });
});

// 🧩 Gemini API helper function
async function identifyColorBlindness(description) {
  const prompt = `
Identify the most likely type of color blindness based on how the user describes colors.
They may describe confusion ("red and green look similar") or how a color appears ("red looks brownish").
Return ONLY ONE of these exact words: protanopia, deuteranopia, tritanopia, or normal

Examples:
- "Red and green look similar" → deuteranopia
- "Blue and green look similar" → tritanopia
- "Red looks brownish" → protanopia
- "Green looks faded" → deuteranopia
- "No issues seeing colors" → normal

Description: "${description}"

Return only the single word, nothing else.
  `;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyC38w9jc1DH_bh45UpA1yh65aAA6zP7Gs4",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
   
    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API returned ${response.status}: ${errorText}`);
    }
   
    const data = await response.json();
    console.log("Full Gemini Response:", JSON.stringify(data, null, 2));
   
    // Extract the text from response
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
   
    // Check if result exists
    if (!result) {
      console.error("No text found in response. Full data:", data);
      alert("Gemini API returned an empty response. Check console for details.");
      return null;
    }
   
    const resultLower = result.trim().toLowerCase();
    console.log("Gemini Raw Output:", resultLower);
   
    // 🔍 Search for keywords in the response (even if it's a sentence)
    if (resultLower.includes("protanopia")) {
      return "protanopia";
    } else if (resultLower.includes("deuteranopia")) {
      return "deuteranopia";
    } else if (resultLower.includes("tritanopia")) {
      return "tritanopia";
    } else if (resultLower.includes("normal")) {
      return null; // No filter needed
    }
   
    // Fallback if no match found
    console.warn("Could not extract color blindness type from:", resultLower);
    alert("Could not identify color blindness type. Response: " + resultLower);
    return null;
   
  } catch (err) {
    console.error("Gemini API error:", err);
    alert("Gemini API error: " + err.message);
    return null;
  }
}
