window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};

function staticLoadPlaces() {
  return [
    {
      name: "book",
      location: {
        lat: 35.60633707654948,
        lng: 139.68401897448007,
      },
    },
  ];
}

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    let latitude = place.location.lat;
    let longitude = place.location.lng;

    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("gltf-model", "./assets/models/book3.gltf");
    model.setAttribute("rotation", "0 180 0");
    model.setAttribute("animation-mixer", "");
    model.setAttribute("scale", "1 1 1");
    model.setAttribute("link", `href:https://www.libra.titech.ac.jp/`);

    model.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    scene.appendChild(model);
  });
}
