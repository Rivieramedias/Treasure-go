const cdnIcons = {
  coffre: "https://cdn-icons-png.flaticon.com/64/4365/4365931.png",
  cle_doree: "https://cdn-icons-png.flaticon.com/64/3176/3176295.png",
  pierre_rouge: "https://audio-guides.eu/treasure/pirate.png",
  carte: "https://cdn-icons-png.flaticon.com/64/3541/3541885.png",
  epee: "https://cdn-icons-png.flaticon.com/64/3468/3468091.png",
  potion: "https://cdn-icons-png.flaticon.com/64/3063/3063829.png",
  diamant: "https://cdn-icons-png.flaticon.com/64/951/951195.png",
  piece_or: "https://cdn-icons-png.flaticon.com/64/4365/4365962.png",
  couronne: "https://cdn-icons-png.flaticon.com/64/3534/3534254.png",
  champagne: "https://cdn-icons-png.flaticon.com/64/2829/2829032.png",
  bateau_pirate: "https://cdn-icons-png.flaticon.com/64/4365/4365913.png"
};

// Fonction pour calculer la distance entre deux points (en mètres)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Rayon de la Terre en mètres
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en mètres
}