document.addEventListener("DOMContentLoaded", () => {
  // Initialiser la carte, centrée sur Nice par défaut
  const map = L.map('map').setView([43.695, 7.255], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Définir les checkpoints existants
  const checkpoints = [
    { name: "Place Masséna", lat: 43.695, lon: 7.271, item: "Pierre rouge" },
    { name: "Colline du Château", lat: 43.694, lon: 7.281, item: "Clé dorée" },
	{ name: "Homebox", lat: 43.706, lon: 7.284, item: "Coffre" }
	
  ];

  // Ajouter les marqueurs des checkpoints
  checkpoints.forEach(cp => {
    const marker = L.marker([cp.lat, cp.lon]).addTo(map);
    marker.bindPopup(cp.name).on("click", () => {
      const li = document.createElement("li");
      li.textContent = cp.item;
      document.getElementById("items").appendChild(li);
    });
  });

  // Géolocalisation en temps réel
  let playerMarker = null; // Marqueur pour la position du joueur

  if ("geolocation" in navigator) {
    // Suivre la position du joueur en temps réel
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Centrer la carte sur la position du joueur (une fois au démarrage)
        if (!playerMarker) {
          map.setView([latitude, longitude], 14);
        }

        // Créer ou mettre à jour le marqueur du joueur
        if (playerMarker) {
          playerMarker.setLatLng([latitude, longitude]);
        } else {
          playerMarker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: 'player-marker',
              html: '<div style="background-color: blue; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>',
              iconSize: [15, 15]
            })
          }).addTo(map);
          playerMarker.bindPopup("Vous êtes ici !").openPopup();
        }
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error.message);
        alert("Impossible d'accéder à votre position. Veuillez activer la géolocalisation.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    alert("La géolocalisation n'est pas supportée par votre navigateur.");
  }
});