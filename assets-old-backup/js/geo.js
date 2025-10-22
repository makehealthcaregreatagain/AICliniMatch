// assets/js/geo.js
(() => {
  const ZIP_CACHE = {}; // in-memory (you can also persist to localStorage)

  async function geocodeZip(zip) {
    if (!/^\d{5}$/.test(String(zip || '').trim())) {
      throw new Error('ZIP must be 5 digits');
    }
    if (ZIP_CACHE[zip]) return ZIP_CACHE[zip];

    // Free, no API key: http://api.zippopotam.us/us/{ZIP}
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!res.ok) throw new Error(`ZIP not found: ${zip}`);
    const data = await res.json();
    const place = (data.places && data.places[0]) || {};
    const lat = parseFloat(place.latitude);
    const lon = parseFloat(place.longitude);
    const out = { lat, lon };
    ZIP_CACHE[zip] = out;
    return out;
  }

  // Haversine distance in miles
  function haversineMiles(lat1, lon1, lat2, lon2) {
    function toRad(d) { return (d * Math.PI) / 180; }
    const R = 3958.7613; // Earth radius (miles)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Read lat/lon from a specialist card; returns null if unavailable
  function getCardLatLon(cardEl) {
    const lat = parseFloat(cardEl.getAttribute('data-geo-lat'));
    const lon = parseFloat(cardEl.getAttribute('data-geo-lon'));
    if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
    return null;
  }

  window.__geo = { geocodeZip, haversineMiles, getCardLatLon };
})();
