import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  LayerGroup,
  ScaleControl,
  useMap,
} from "react-leaflet";
import { motion } from "framer-motion";
import { Globe, Loader2 } from "lucide-react";
import MagnitudeChart from "./components/MagnitudeChart";
import MapView from "./components/MapView";
import Header from "./components/Header";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Select from "./components/ui/Select";
import Slider from "./components/ui/Slider";
import Stat from "./components/ui/Stat";

/* Feeds */
const FEEDS = [
  { key: "all_hour", label: "Past Hour (all)", url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson" },
  { key: "all_day", label: "Past Day (all)", url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson" },
  { key: "all_week", label: "Past Week (all)", url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" },
  { key: "m4.5_day", label: "Past Day (M4.5+)", url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson" },
  { key: "m4.5_week", label: "Past Week (M4.5+)", url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson" },
];

function magColor(mag = 0) {
  if (mag >= 7) return "#7f1d1d";
  if (mag >= 6) return "#b91c1c";
  if (mag >= 5) return "#dc2626";
  if (mag >= 4) return "#f59e0b";
  if (mag >= 3) return "#10b981";
  return "#3b82f6";
}
function magRadius(mag = 0) {
  const r = Math.pow(1.7, Math.max(0, mag)) + mag * 1.25;
  return Math.min(Math.max(r, 4), 30);
}
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const sec = Math.round(diff / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  if (sec < 60) return `${sec}s ago`;
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  return `${day}d ago`;
}

function FlyTo({ center }) {
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    map.flyTo(center, 5, { duration: 1.2 });
  }, [center]);
  return null;
}

export default function App() {
  const [feed, setFeed] = useState(FEEDS[1]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [minMag, setMinMag] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("time_desc");
  const [flyTo, setFlyTo] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        controllerRef.current?.abort?.();
        controllerRef.current = new AbortController();
        const res = await fetch(feed.url, { signal: controllerRef.current.signal });
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controllerRef.current?.abort?.();
  }, [feed]);

  const features = data?.features || [];

  const filtered = useMemo(() => {
    let list = [...features];
    if (minMag > 0) list = list.filter((f) => (f.properties?.mag ?? -Infinity) >= minMag);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((f) => (f.properties?.place || "").toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "time_asc":
        list.sort((a, b) => (a.properties.time || 0) - (b.properties.time || 0));
        break;
      case "mag_desc":
        list.sort((a, b) => (b.properties.mag || -Infinity) - (a.properties.mag || -Infinity));
        break;
      case "mag_asc":
        list.sort((a, b) => (a.properties.mag || Infinity) - (b.properties.mag || Infinity));
        break;
      default:
        list.sort((a, b) => (b.properties.time || 0) - (a.properties.time || 0));
    }
    return list;
  }, [features, minMag, search, sortBy]);

  const total = features.length;
  const shown = filtered.length;

  /* compute magnitude distribution for chart */
  const magDist = useMemo(() => {
    const buckets = { "<3": 0, "3-4": 0, "4-5": 0, "5-6": 0, "6+": 0 };
    features.forEach((f) => {
      const m = f.properties?.mag ?? 0;
      if (m < 3) buckets["<3"]++;
      else if (m < 4) buckets["3-4"]++;
      else if (m < 5) buckets["4-5"]++;
      else if (m < 6) buckets["5-6"]++;
      else buckets["6+"]++;
    });
    return Object.entries(buckets).map(([k, v]) => ({ name: k, value: v }));
  }, [features]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header>
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-sky-600" />
          <div className="text-sm text-slate-600">
            USGS • React • Leaflet • Candidate: <span className="font-semibold">Naukri0925</span>
          </div>
        </div>
      </Header>

      <main className="mx-auto max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Controls */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Controls</h3>
            <div className="text-xs text-slate-500">{total} total</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium">Feed</label>
              <Select value={feed.key} onChange={(val) => setFeed(FEEDS.find((f) => f.key === val))} options={FEEDS} />
            </div>

            <div>
              <label className="text-xs font-medium flex justify-between">
                <span>Min Magnitude</span>
                <span className="text-sm font-semibold">{minMag.toFixed(1)}</span>
              </label>
              <Slider value={minMag} min={0} max={8} step={0.1} onChange={(v) => setMinMag(v)} />
              <div className="mt-2 flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setMinMag(0)}>
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearch("")}>
                  Clear Search
                </Button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium">Search</label>
              <Input placeholder="e.g., Japan, California" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-medium">Sort</label>
              <select
                className="w-full rounded-md border px-3 py-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="time_desc">Newest First</option>
                <option value="time_asc">Oldest First</option>
                <option value="mag_desc">Magnitude ↓</option>
                <option value="mag_asc">Magnitude ↑</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Stat label="Shown" value={shown} />
              <Stat label="Total" value={total} />
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Magnitude Distribution</div>
              <MagnitudeChart data={magDist} />
            </div>
          </div>
        </Card>

        {/* Map (spans 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="relative h-[60vh] lg:h-[78vh]">
              <MapContainer center={[20, 0]} zoom={2} minZoom={2} className="h-full w-full">
                <ScaleControl position="bottomleft" />
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="OpenTopoMap">
                    <TileLayer
                      attribution="&copy; OpenTopoMap"
                      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer>

                  <LayersControl.Overlay checked name="Earthquakes">
                    <LayerGroup>
                      {filtered.map((f) => {
                        const [lon, lat, depth] = f.geometry?.coordinates || [0, 0, 0];
                        const mag = f.properties?.mag ?? 0;
                        const place = f.properties?.place || "Unknown";
                        const time = f.properties?.time || 0;
                        const url = f.properties?.url || "#";
                        return (
                          <CircleMarker
                            key={f.id}
                            center={[lat, lon]}
                            radius={magRadius(mag)}
                            pathOptions={{
                              color: magColor(mag),
                              fillColor: magColor(mag),
                              fillOpacity: 0.7,
                              weight: 1,
                            }}
                            eventHandlers={{ click: () => setFlyTo([lat, lon]) }}
                          >
                            <Popup>
                              <div className="space-y-1 text-sm">
                                <div className="font-semibold">
                                  M {mag?.toFixed?.(1)} — {place}
                                </div>
                                <div className="text-xs text-slate-600">Depth: {depth} km</div>
                                <div className="text-xs text-slate-600">
                                  {new Date(time).toLocaleString()} ({timeAgo(time)})
                                </div>
                                <a className="text-xs underline" href={url} target="_blank" rel="noreferrer">
                                  USGS details ↗
                                </a>
                              </div>
                            </Popup>
                          </CircleMarker>
                        );
                      })}
                    </LayerGroup>
                  </LayersControl.Overlay>
                </LayersControl>
                <FlyTo center={flyTo} />
              </MapContainer>

              {/* Loading state */}
              {loading && (
                <div className="absolute top-3 left-3 bg-white/90 px-3 py-2 rounded-full text-sm flex items-center gap-2 shadow">
                  <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                  <span>Loading data…</span>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-2 rounded-full text-sm flex items-center gap-2 shadow">
                  <span>{error}</span>
                  <Button size="sm" variant="secondary" onClick={() => setFeed({ ...feed })}>
                    Retry
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-2">Recent Earthquakes</h3>
            {filtered.length === 0 && !loading ? (
              <div className="text-sm text-slate-600">No earthquakes match your filters.</div>
            ) : (
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.slice(0, 60).map((f) => {
                  const [lon, lat, depth] = f.geometry?.coordinates || [0, 0, 0];
                  const mag = f.properties?.mag ?? 0;
                  const place = f.properties?.place || "Unknown";
                  const time = f.properties?.time || 0;
                  const url = f.properties?.url || "#";
                  return (
                    <li key={f.id}>
                      <button className="w-full text-left" onClick={() => setFlyTo([lat, lon])}>
                        <div className="p-3 border rounded-2xl hover:shadow transition flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                            style={{ background: magColor(mag) }}
                          >
                            <span className="text-white font-bold">{mag?.toFixed?.(1)}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{place}</div>
                            <div className="text-xs text-slate-600 flex gap-2 items-center">
                              <span>{timeAgo(time)}</span>
                              <span>•</span>
                              <span>Depth {depth} km</span>
                              <span>•</span>
                              <a className="underline" href={url} target="_blank" rel="noreferrer">
                                USGS
                              </a>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl p-4 text-xs text-slate-500 flex justify-between">
        <div>Built with React • react-leaflet • Tailwind • lucide-react • recharts</div>
        <div>
          Candidate ID: <span className="font-semibold">Naukri0925</span>
        </div>
      </footer>
    </div>
  );
}
