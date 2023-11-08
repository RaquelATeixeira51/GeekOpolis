function getDistanceFromLatLonInKm(lat, lng) {
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const R = 6371;
  const dLat = deg2rad(Number(process.env.REACT_APP_ORIGIN_LAT) - lat);
  const dLng = deg2rad(Number(process.env.REACT_APP_ORIGIN_LONG) - lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat)) *
      Math.cos(deg2rad(lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return ((R * c * 1000) / 1000).toPrecision(2);
}

export default getDistanceFromLatLonInKm;

getDistanceFromLatLonInKm(
  { lat: -23.6667488, lng: -46.6901321 },
  { lat: -23.5240435, lng: -46.8451427 }
);
