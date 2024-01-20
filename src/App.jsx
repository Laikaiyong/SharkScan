import logo from "./logo.svg";
import styles from "./App.module.css";

import { Modal, Carousel } from "flowbite";

import { createEffect, createSignal, onMount } from "solid-js";
import MapGL, {
  Source,
  Image,
  Layer,
  Popup,
  Marker,
  Atmosphere,
} from "solid-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { createControls } from "solid-leva";

import "solid-slider/slider.css";
import { autoplay } from "solid-slider/plugins/autoplay";
import { Slider, createSlider } from "solid-slider";

const DATA = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84",
    },
  },
  features: [
    {
      type: "Feature",
      properties: {
        id: "sharks",
        mag: 2.3,
        time: 1507425650893,
        felt: null,
        tsunami: 0,
      },
      geometry: {
        type: "Point",
        coordinates: [77.52225070046244, 5.80185058078243],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "nemos",
        mag: 1.7,
        time: 1507425289659,
        felt: null,
        tsunami: 0,
      },
      geometry: {
        type: "Point",
        coordinates: [72.72330827596697, 5.8766177734264017],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "dorys",
        mag: 1.7,
        time: 1507425289659,
        felt: null,
        tsunami: 0,
      },
      geometry: {
        type: "Point",
        coordinates: [80.36240436031808, 7.493121968340318],
      },
    },
  ],
};

function App() {
  const [viewport, setViewport] = createSignal({
    center: [78.75351469482524, 7.20928104693727],
    zoom: 6,
  });

  const [slider, { current, next, prev, moveTo }] = createSlider();
  slider;

  const [markers, setMarkers] = createSignal([
    createControls("Sharks", {
      id: { value: 0 },
      image1: "https://images.unsplash.com/photo-1560275619-4662e36fa65c",
      image2: "https://plus.unsplash.com/premium_photo-1664298163429-66a7462ff05f",
      image3: "https://images.unsplash.com/photo-1566812201627-d2ebc5b056f9",
      draggable: { label: "Draggable", value: false },
      color: { label: "Color", value: "#808080" },
      penalty: { label: "Penalty", value: "$ 200" },
      openPopup: { label: "Show Popup", value: false },
      popupContent: { label: "Content", value: "Sharks" },
      closeButton: { label: "Close Btn", value: false },
      position: {
        label: "Position",
        value: [77.52225070046244, 5.80185058078243],
      },
      description: "Sharks under the sea",
    }),
    createControls("Nemo", {
      id: { value: 1 },
      image1: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd",
      image2: "https://images.unsplash.com/photo-1535591273668-578e31182c4f",
      image3: "https://images.unsplash.com/photo-1596414086775-3e321ab08f36",
      draggable: { label: "Draggable", value: false },
      color: { label: "Color", value: "#FFA500" },
      penalty: { label: "Penalty", value: "$ 6969" },
      openPopup: { label: "Show Popup", value: false },
      popupContent: { label: "Content", value: "Nemo Fish" },
      closeButton: { label: "Close Btn", value: false },
      position: {
        label: "Position",
        value: [72.72330827596697, 5.8766177734264017],
      },
      description: "Nemo Hi, finding nemo",
    }),
    createControls("Dory", {
      id: { value: 2 },
      image1: "https://images.unsplash.com/photo-1684547105127-cbc2e244d0f5",
      image2: "https://images.unsplash.com/photo-1661504657448-35d0d7dc00df",
      image3: "https://images.unsplash.com/photo-1638654591961-30e36417f190",
      draggable: { label: "Draggable", value: false },
      color: { label: "Color", value: "#0000FF" },
      penalty: { label: "Penalty", value: "$ 69" },
      openPopup: { label: "Show Popup", value: false },
      popupContent: { label: "Content", value: "Dory Fish" },
      closeButton: { label: "Close Btn", value: false },
      position: {
        label: "Position",
        value: [80.36240436031808, 7.493121968340318],
      },
      description: "Dory finding Nemo",
    }),
  ]);

  return (
    <MapGL
      options={{
        style: "mb:basic",
      }}
      darkStyle="mb:dark"
      viewport={viewport()}
      onViewportChange={(evt) => setViewport(evt)}>
      <button
        onClick={() => {
          document.querySelector("body")?.classList.toggle("dark");
        }}
        id="theme-toggle"
        type="button"
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 pt-2 pl-2">
        <svg
          id="theme-toggle-dark-icon"
          class="hidden w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg
          id="theme-toggle-light-icon"
          class="hidden w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"></path>
        </svg>
      </button>

      <Atmosphere />
      <Source
        source={{
          type: "geojson",
          data: DATA,
        }}>
        <Layer
          style={{
            type: "circle",
            paint: {
              "circle-radius": ["*", ["get", "mag"], 20],
              "circle-color": [
                "match",
                ["get", "id"],
                "sharks",
                "grey",
                "nemos",
                "orange",
                "dorys",
                "blue",
                "#000000", // Default color if none of the values match
              ],
              "circle-stroke-width": 3,
            },
          }}
        />
      </Source>
      <For each={markers()}>
        {(marker, i) => (
          <>
            <Marker
              lngLat={marker.position}
              draggable={marker.draggable}
              showPopup={marker.openPopup}
              options={{
                color: marker.color,
              }}
              popup={{
                closeButton: marker.closeButton,
                focusAfterOpen: false,
              }}
              onOpen={() => {
                // set the modal menu element
                const $targetEl = document.getElementById(marker.id);

                // options with default values
                const options = {
                  placement: "bottom-right",
                  backdrop: "dynamic",
                  backdropClasses:
                    "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
                  closable: true,
                };

                // instance options object
                const instanceOptions = {
                  id: "modalEl",
                  override: true,
                };

                const modal = new Modal($targetEl, options, instanceOptions);
                modal.toggle();

                setTimeout(function () {
                  const carouselElement = document.getElementById("carousel" + marker.popupContent);

                  const items = [
                    {
                      position: 0,
                      el: document.getElementById("carousel" + marker.image1),
                    },
                    {
                      position: 1,
                      el: document.getElementById("carousel" + marker.image2),
                    },
                    {
                      position: 2,
                      el: document.getElementById("carousel" + marker.image3),
                    },
                  ];

                  // options with default values
                  const caroOptions = {
                    defaultPosition: 1,
                    interval: 3000,

                    indicators: {
                      activeClasses: "bg-white dark:bg-gray-800",
                      inactiveClasses:
                        "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
                      items: [
                        {
                          position: 0,
                          el: document.getElementById("carousel" + marker.image1),
                        },
                        {
                          position: 1,
                          el: document.getElementById("carousel" + marker.image2),
                        },
                        {
                          position: 2,
                          el: document.getElementById("carousel" + marker.image3),
                        },
                      ],
                    },
                  };

                  // instance options object
                  const caroInstanceOptions = {
                    id: "carousel" + marker.popupContent,
                    override: true,
                  };

                  const carousel = new Carousel(
                    carouselElement,
                    items,
                    caroOptions,
                    caroInstanceOptions
                  );
                  carousel.cycle();
                }, 3000);
              }}>
              {marker.popupContent}
            </Marker>
            <div
              id={marker.id}
              tabindex="-1"
              aria-hidden="true"
              class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
              <div class="relative max-h-full w-full max-w-2xl">
                <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
                  <div class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl">
                      {marker.popupContent}
                    </h3>
                  </div>
                  <div class="space-y-6 p-6">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {marker.description}
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Penalty: {marker.penalty}
                    </p>

                    <div
                      id={"carousel" + marker.popupContent}
                      class="relative w-full">
                      <div  class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <div
                        id={"carousel" + marker.image1}
                          class=" duration-700 ease-in-out"
                          data-carousel-item>
                          <img
                            src={marker.image1}
                            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                          />
                        </div>

                        <div
                        id={"carousel" + marker.image2}
                          class="duration-700 ease-in-out"
                          data-carousel-item>
                          <img
                            src={marker.image2}
                            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                          />
                        </div>

                        <div
                        id={"carousel" + marker.image3}
                          class="duration-700 ease-in-out"
                          data-carousel-item>
                          <img
                            src={marker.image3}
                            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </For>
    </MapGL>
  );
}

export default App;
