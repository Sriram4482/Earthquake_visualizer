
# 🌍 Earthquake Visualizer

An interactive web application to visualize recent earthquake activity around the world using the **USGS Earthquake API**.  

---

## 📖 Project Overview
**User Person:** Casey (Geography Student)  
Casey wants to explore and understand seismic activity patterns across the globe.  
This app provides an **interactive map, earthquake markers, filters, and charts** to help her easily study earthquakes.

---

## ✨ Features
- 🗺️ **Interactive Map** – Powered by React Leaflet to visualize earthquake locations globally.  
- 🔍 **Search by Location** – Quickly filter earthquakes by place name.  
- 📊 **Magnitude Distribution Chart** – Visual bar chart (Recharts) for better insights.  
- 🎚️ **Magnitude Slider** – Filter earthquakes by minimum magnitude.  
- 📅 **Time Feed Selector** – Choose between Past Hour, Past Day, Past Week, or Past Month.  
- 🧾 **Recent Earthquake List** – Scrollable list with quake details.  
- ⚡ **Responsive UI** – Works seamlessly on desktop and mobile.  
- 🎨 **Modern UI/UX** – Styled with Tailwind CSS + shadcn/ui + lucide-react icons.  
- 🎭 **Animations** – Smooth transitions with Framer Motion.  
- ✅ **Error Handling** – Graceful fallback when no results are found or API fails.

---

## 🛠️ Tech Stack
- **Frontend Framework**: React + Vite  
- **Styling**: Tailwind CSS, shadcn/ui, CSS utility classes  
- **Icons**: lucide-react  
- **Animations**: Framer Motion  
- **Charts**: Recharts  
- **Maps**: React Leaflet + OpenStreetMap  
- **API**: USGS Earthquake API (`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`)  

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/Sriram4482/Earthquake_visualizer.git
cd earthquake-visualizer

2. Install Dependencies
npm install

3. Start Development Server
npm start


🌍 Deployment

The app is deployed here:
👉 Live Demo Link
https://earthquakeevisualizer.netlify.app/
📸 Screenshots

Main Dashboard
<img width="1894" height="823" alt="Image" src="https://github.com/user-attachments/assets/05d88af1-5582-4611-bce1-337a47d85b2b" />

<img width="1897" height="867" alt="Image" src="https://github.com/user-attachments/assets/3ee27ff4-7a45-4082-9998-ba82b8e7cfc6" />

after searching a particular region
<img width="1898" height="866" alt="Image" src="https://github.com/user-attachments/assets/c193caaf-d413-4e17-95c9-5fc67e26166a" />





📂 Project Structure
earthquake-visualizer/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── MapView.jsx
│   │   ├── Controls.jsx
│   │   └── Chart.jsx
└── README.md
