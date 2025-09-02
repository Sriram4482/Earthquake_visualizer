
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
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer

2. Install Dependencies
npm install

3. Start Development Server
npm start


Visit 👉 http://localhost:5173

🌍 Deployment

The app is deployed here:
👉 Live Demo Link

(Replace with your Vercel / Netlify / CodeSandbox link)

📸 Screenshots
Main Dashboard

![Screenshot of Map](C:\Users\Sriram-pc\OneDrive\Desktop\earthquake-visualizer\images\earth.png)

![Screenshot of Map](C:\Users\Sriram-pc\OneDrive\Desktop\earthquake-visualizer\images\quake.png)



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