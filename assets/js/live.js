// -------- 详情页实时数据：天气 / 国家信息 / 本地时间 --------

window.YY_Live = (function () {
  // WMO weather code → 图标和描述
  // 参考：https://open-meteo.com/en/docs
  const WMO = {
    0:  { i: "☀",  t: "晴" },
    1:  { i: "🌤", t: "少云" },
    2:  { i: "⛅", t: "多云" },
    3:  { i: "☁",  t: "阴" },
    45: { i: "🌫", t: "有雾" },
    48: { i: "🌫", t: "雾凇" },
    51: { i: "🌦", t: "小雨" },
    53: { i: "🌦", t: "中雨" },
    55: { i: "🌧", t: "大雨" },
    61: { i: "🌧", t: "小雨" },
    63: { i: "🌧", t: "中雨" },
    65: { i: "🌧", t: "大雨" },
    71: { i: "🌨", t: "小雪" },
    73: { i: "🌨", t: "中雪" },
    75: { i: "❄",  t: "大雪" },
    77: { i: "❄",  t: "雪粒" },
    80: { i: "🌧", t: "阵雨" },
    81: { i: "🌧", t: "阵雨" },
    82: { i: "⛈", t: "强阵雨" },
    85: { i: "🌨", t: "阵雪" },
    86: { i: "🌨", t: "强阵雪" },
    95: { i: "⛈", t: "雷暴" },
    96: { i: "⛈", t: "雷暴冰雹" },
    99: { i: "⛈", t: "强雷暴" }
  };
  function wmo(code) { return WMO[code] || { i: "·", t: "—" }; }

  async function fetchWeather(lat, lng, tz) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lng);
    url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m");
    url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weather_code");
    url.searchParams.set("timezone", tz || "auto");
    url.searchParams.set("forecast_days", "7");
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("weather fetch failed");
    return res.json();
  }

  // REST Countries 只返回必要字段，减少流量
  async function fetchCountry(cca2) {
    const fields = "name,flags,currencies,population,languages,timezones,capital,cca2";
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(cca2)}?fields=${fields}`);
    if (!res.ok) throw new Error("country fetch failed");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  }

  function formatLocalTime(tz) {
    try {
      return new Intl.DateTimeFormat("zh-CN", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(new Date());
    } catch (e) {
      return "—";
    }
  }
  function formatLocalDate(tz) {
    try {
      return new Intl.DateTimeFormat("zh-CN", {
        timeZone: tz, month: "short", day: "numeric", weekday: "short"
      }).format(new Date());
    } catch (e) { return ""; }
  }
  function shortDay(isoDate, tz) {
    try {
      return new Intl.DateTimeFormat("zh-CN", { timeZone: tz || "UTC", weekday: "narrow" }).format(new Date(isoDate));
    } catch (e) { return isoDate.slice(5); }
  }

  return { wmo, fetchWeather, fetchCountry, formatLocalTime, formatLocalDate, shortDay };
})();
