window.addEventListener("load", function () {
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".arrow-icon");
  const ipAdressItem = document.querySelector(".ip-adress");
  const locationItem = document.querySelector(".location");
  const timezoneItem = document.querySelector(".timezone");
  const ispItem = document.querySelector(".isp");

  var map = L.map("map").setView([0, 0], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  const locationIcon = L.icon({
    iconUrl: "/assets/images/icon-location.svg",
    iconSize: [33, 40],
    iconAnchor: [15, 15],
  });

  var marker = L.marker([0, 0], { icon: locationIcon }).addTo(map);

  function fetchData() {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_NcH8zabo8NW66qsWF8EBvkyGNlbnN&ipAddress=${searchInput.value}`
    )
      .then((response) => response.json())
      .then(
        (data) => (
          (ipAdressItem.innerHTML = data.ip),
          (locationItem.innerHTML = `${data.location.city}, ${data.location.country}`),
          (timezoneItem.innerHTML = "UTC" + data.location.timezone),
          (ispItem.innerHTML = data.isp),
          map.setView([data.location.lat, data.location.lng], 13),
          marker.setLatLng([data.location.lat, data.location.lng])
        )
      )
      .catch((error) => {
        error = "This IP Address is not available";
        Swal.fire(error);
        ipAdressItem.innerHTML = "";
        locationItem.innerHTML = "";
        timezoneItem.innerHTML = "";
        ispItem.innerHTML = "";
      });
  }

  fetchData();
  searchIcon.addEventListener("click", function () {
    console.log(searchInput.value);
    fetchData();
  });
});
