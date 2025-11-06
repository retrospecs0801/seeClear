# SeeClear.AI – Making the Web Visible for Everyone

## 📌 Project Overview
SeeClear.AI is an AI-powered Chrome extension that enhances web accessibility for color-blind users. 
It intelligently remaps colors, generates text descriptions for visuals, and offers personalized accessibility settings through conversational AI.

---

## 🧩 1. Problem Statement
Many websites rely on color to display information (charts, alerts, buttons). 
For color-blind users, these colors often appear similar or invisible, making web content confusing or unreadable.  
Existing tools only apply static filters that don’t adapt to different types of color blindness or preserve visual design.  
There’s a need for an **intelligent, adaptive solution** that keeps websites both **clear and visually appealing**.

---

## 💡 2. Proposed Solution
**SeeClear.AI** is a Chrome extension powered by Generative AI that automatically makes websites accessible for color-blind users.  

### Key Features:
- **AI-based color remapping** – Generates accessible color palettes that maintain design integrity.  
- **AI summarization** – Converts color-coded charts/graphs into easy-to-read text.  
- **Conversational assistant** – Allows users to personalize accessibility settings.  
- **Auto captions for visuals** – Adds text alternatives for images and infographics.  
- **Accessibility reports** – Provides developers with color-accessibility insights.

---

## ⚙️ 3. Technology Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | HTML, CSS, JavaScript | Extension UI & Color Modification |
| Browser APIs | Chrome Extension API (Manifest V3) | Access & modify webpage elements |
| AI Integration | OpenAI / Gemini APIs | Color analysis & text generation |
| Backend (optional) | Flask / Node.js | AI API management |
| Version Control | GitHub | Collaboration & version tracking |

---

## 🧠 4. Architecture / Design

### Workflow:
1. User opens a webpage.  
2. Extension scans webpage colors via Chrome Extension APIs.  
3. AI analyzes color contrast and accessibility issues.  
4. AI remaps inaccessible colors or generates descriptive text.  
5. Extension applies changes live on the webpage.  
6. Optional backend generates accessibility reports for developers.

**Flow:**  
`Webpage → Extension → AI Analysis → Accessibility Output → User View`

---

## 🖥️ 5. Demo / Screenshots

1. **Original Page:** Shows color-coded data difficult for color-blind users to distinguish.  
2. **Enhanced Page:** AI applies new accessible color palette while preserving design.  
3. **AI Summary:** Charts or infographics get text-based explanations for clarity.

*(Add screenshots here once available)*

---

## 🌍 6. Impact & Use Cases

- Over **300 million people** worldwide have color vision deficiencies.  
- SeeClear.AI ensures **equal access** to web content for everyone.  

### Use Cases:
- Color-blind individuals for better browsing experience.  
- Developers & designers to test and improve accessibility.  
- Accessibility-focused organizations improving inclusivity.

---

## 🚀 7. Future Scope

- Extend support for:
  - Other visual impairments (contrast issues, dyslexia).  
  - Accessibility integration in **Figma** or **VS Code**.  
- Develop an **AI-powered accessibility analytics dashboard**.  
- Expand to **Edge** and **Firefox** browsers.  

---

## 🏁 Conclusion
**SeeClear.AI bridges the gap between AI and accessibility.**  
It empowers users and developers alike, making the web more inclusive and truly visible — for everyone.

---

### 👥 Team
Faze 
members
yusuf habib, omji , Denzil dirkey

### 🏆 Event
GenAI Hackathon

## 🛠️ Setup Instructions

Step 1: Download the Repo as ZIP

Go to your project’s GitHub repository page.

Click on the “Code” button (green button at the top right of the repo).

Select “Download ZIP”.

Once downloaded, extract (unzip) the ZIP file:

Right-click on the ZIP → Extract All (Windows)

or double-click (Mac) → it automatically extracts to a folder.

⚙️ Step 2: Open Chrome Extensions Page

Open Google Chrome.

Go to the extensions page by entering this in the address bar:

chrome://extensions/


Turn ON the switch at the top-right corner labeled “Developer mode”.

📂 Step 3: Load the Unpacked Extension

Click the “Load unpacked” button (top left).

In the dialog that opens, select the folder where you extracted your ZIP (make sure it’s the folder that contains manifest.json directly inside — not nested inside another folder).

Click Select Folder.
