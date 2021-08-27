window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};

AFRAME.registerComponent("anim-controller", {
  init: function () {
    this.running = false;
    this.animComp = document.querySelector("a-animation");
    this.el.addEventListener("click", (e) => {
      if (!this.running) {
        this.animComp.emit("start");
      } else {
        this.animComp.emit("stop");
      }
      this.running = !this.running;
    });
  },
});

function staticLoadPlaces() {
  return [
    {
      name: "book",
      location: {
        lat: 35.606256862309124,
        lng: 139.68403883325144,
      },
    },
  ];
}
running = false;
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
    model.setAttribute("animation-mixer", { timeScale: 0 });
    model.setAttribute("scale", "2 2 2");
    model.setAttribute("position", { x: 0, y: 30.0, z: 0 });
    model.setAttribute("look-at", "[camera]");
    // model.setAttribute("link", `href:https://www.libra.titech.ac.jp/`);

    model.addEventListener("click", (e) => {
      if (!running) {
        model.setAttribute("animation-mixer", { timeScale: 1 });
        setTimeout(() => {
          document.getElementById("booklink").click();
        }, 2000);
      } else {
        model.setAttribute("animation-mixer", { timeScale: 0 });
      }
      running = !running; // flip the flag
    });
    model.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    scene.appendChild(model);
  });
}
