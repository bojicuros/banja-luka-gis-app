import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Modal from "../../components/Modal/Modal";
import schoolIcon from '../../assets/images/school.png'
import buildingIcon from '../../assets/images/building.png'
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import "./Map.css";

const MAPBOX_TOKEN = yourToken
mapboxgl.accessToken = MAPBOX_TOKEN;

function transformSchoolsJSON(jsonData) {
  const transformedData = {
    features: [],
    type: "FeatureCollection"
  };

  jsonData.schools.forEach((school) => {
    const feature = {
      id: school.id,
      geometry: {
        type: "Point",
        coordinates: extractCoordinates(school.coordinates)
      },
      properties: { ...school },
      type: "Feature"
    };
    delete feature.properties.id;
    delete feature.properties.coordinates; // Exclude original coordinates from properties
    transformedData.features.push(feature);
  });

  return transformedData;
}

function transformBuldingsJSON(jsonData) {
  const transformedData = {
    features: [],
    type: "FeatureCollection"
  };

  jsonData.buildings.forEach((building) => {
    const feature = {
      id: building.id,
      geometry: {
        type: "Point",
        coordinates: extractCoordinates(building.coordinates)
      },
      properties: { ...building },
      type: "Feature"
    };
    delete feature.properties.id;
    delete feature.properties.coordinates; // Exclude original coordinates from properties
    transformedData.features.push(feature);
  });

  return transformedData;
}

function extractCoordinates(coordinates) {
  const matches = coordinates.match(/\((.*)\)/);
  if (matches && matches[1]) {
    const [longitude, latitude] = matches[1].split(" ");
    return [Number(longitude), Number(latitude)];
  }
  return [];
}

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(17.19948023557663);
  const [lat, setLat] = useState(44.77592815172716);
  const [zoom, setZoom] = useState(13);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [coordinates, setCoodinates] = useState(null);

  const [schools, setSchools] = useState(null);
  const [buildings, setBuildings] = useState(null);

  const [areSchoolsUpdated, setAreSchoolsUpdated] = useState(false);
  const [areBuildingsUpdated, setAreBuildingsUpdated] = useState(false);

  const [isBuildingLayerVisible, setBuildingLayerVisible] = useState(false);
  const [buildingLayerDrawingMode, setBuildingLayerDrawingMode] = useState(false);
  const [buildingLayerEditMode, setBuildingLayerEditMode] = useState(false);

  const [isSchoolLayerVisible, setSchoolLayerVisible] = useState(false);
  const [schoolLayerDrawingMode, setSchoolLayerDrawingMode] = useState(false);
  const [schoolLayerEditMode, setSchoolLayerEditMode] = useState(false);

  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalysisDone, setIsAnalysisDone] = useState(false)
  const [marker, setMarker] = useState(null)


  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.loadImage(schoolIcon, function (error, image) {
      if (error) throw error;
      map.current.addImage("school-icon", image);
    });

    map.current.loadImage(buildingIcon, function (error, image) {
      if (error) throw error;
      map.current.addImage("building-icon", image);
    });

    map.current.addControl(new mapboxgl.NavigationControl());

  }, [isBuildingLayerVisible, isSchoolLayerVisible, lat, lng, zoom]);


  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:8080/schools');
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    const delay = 500;
    const timeout = setTimeout(() => {
      fetchSchools();
      setAreSchoolsUpdated(false);
    }, delay);

    return () => clearTimeout(timeout);

  }, [areSchoolsUpdated]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch('http://localhost:8080/buildings/type/Stambena');
        const data = await response.json();
        setBuildings(data);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    const delay = 500;
    const timeout = setTimeout(() => {
      fetchBuildings();
      setAreBuildingsUpdated(false);
    }, delay);

    return () => clearTimeout(timeout);


  }, [areBuildingsUpdated]);


  /////////////// CHANGE MOUSE CURSOR WHEN DRAWING //////////////////////
  useEffect(() => {
    if (buildingLayerDrawingMode || schoolLayerDrawingMode) {
      map.current.getCanvas().style.cursor = "crosshair";
    } else {
      map.current.getCanvas().style.cursor = "";
    }
  }, [buildingLayerDrawingMode, schoolLayerDrawingMode]);


  //////////////////////// ADDING SCHOOLS LAYER //////////////////////////
  useEffect(() => {

    function addSchools() {
      if (map.current.getSource("schools")) {
        map.current.removeLayer("schools");
        map.current.removeSource("schools");
      }

      map.current.addSource("schools", {
        type: "geojson",
        data: transformSchoolsJSON(schools),
      });

      map.current.addLayer({
        id: "schools",
        type: "circle",
        source: "schools",
        paint: {
          "circle-radius": 10,
          "circle-color": "#d83c3c",
          "circle-opacity": 0.8,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#000",
        },
        layout: {
          visibility: "visible",
        },
      });

      // Add popups
      map.current.on("click", "schools", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h6>${properties.name}</h6><p class="popup-address"> Adresa: ${properties.addr_street},${properties.addr_house}</p>`)
          .addTo(map.current);
      });

      map.current.on("mouseenter", "schools", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "schools", () => {
        map.current.getCanvas().style.cursor = "";
      });
    }

    if (map.current.loaded()) {
      if (isSchoolLayerVisible) {
        addSchools();
      }
    }

  }, [schools, isSchoolLayerVisible]);

  /////////////////////// TOGGLE VISIBILITY OF SCHOOLS LAYER //////////////////////////
  useEffect(() => {
    function toggleSchoolLayersVisibility() {
      const layers = map.current.getStyle().layers;
      const myLayer = layers.find((layer) => layer.id === "schools");
      const visibility = myLayer.layout.visibility;

      if (visibility === "visible") {
        map.current.setLayoutProperty(`schools`, "visibility", "none");
      } else {
        map.current.setLayoutProperty(`schools`, "visibility", "visible");
      }
    }

    if (map.current.loaded()) {
      const layers = map.current.getStyle().layers;
      const myLayer = layers.find((layer) => layer.id === "schools");
      if (myLayer) {
        toggleSchoolLayersVisibility();
      }
    }
  }, [map, isSchoolLayerVisible]);

  //////////////////////// ADDING BULDINGS LAYER //////////////////////////
  useEffect(() => {
    function addBuildings() {
      if (map.current.getSource("buildings")) {
        map.current.removeLayer("buildings");
        map.current.removeSource("buildings");
      }

      map.current.addSource("buildings", {
        type: "geojson",
        data: transformBuldingsJSON(buildings),
      });

      map.current.addLayer({
        id: "buildings",
        type: "circle",
        source: "buildings",
        paint: {
          "circle-radius": 1,
          "circle-color": "#43b6cd",
          "circle-opacity": 1,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#43b6cd",
        },
        layout: {
          visibility: "visible",
        },
      });
    }
    if (map.current.loaded()) {
      if (isBuildingLayerVisible) {
        addBuildings();
      }
    }
  }, [buildings, isBuildingLayerVisible]);

  ///////////////////////// TOGGLE VISIBILITY OF BUILDINGS LAYER //////////////////////////
  useEffect(() => {
    function toggleBuldingsLayersVisibility() {
      const layers = map.current.getStyle().layers;
      const myLayer = layers.find((layer) => layer.id === "buildings");
      const visibility = myLayer.layout.visibility;

      if (visibility === "visible") {
        map.current.setLayoutProperty(`buildings`, "visibility", "none");
      } else {
        map.current.setLayoutProperty(`buildings`, "visibility", "visible");
      }
    }

    if (map.current.loaded()) {
      const layers = map.current.getStyle().layers;
      const myLayer = layers.find((layer) => layer.id === "buildings");
      if (myLayer) {
        toggleBuldingsLayersVisibility();
      }
    }
  }, [map, isBuildingLayerVisible]);


  useEffect(() => {
    if (map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const handleClick = useCallback(
    () => {
      if (schoolLayerDrawingMode || buildingLayerDrawingMode) {
        setIsModalOpen(true);
      }
    },
    [schoolLayerDrawingMode, buildingLayerDrawingMode]
  );

  useEffect(() => {
    if (schoolLayerDrawingMode || buildingLayerDrawingMode) {
      map.current.on("click", handleClick);
      return () => map.current.off("click", handleClick);
    }
  }, [schoolLayerDrawingMode, buildingLayerDrawingMode, handleClick]);

  //////////////////// CLICK ON SCHOOL LAYER ///////////////////////
  const handleSchoolLayerClick = useCallback(
    (e) => {
      setId(e.features[0].id);
      setCoodinates(e.features[0].geometry.coordinates);
      setIsModalOpen(true);
    },
    []
  );


  useEffect(() => {
    if (schoolLayerEditMode) {
      map.current.on("click", "schools", handleSchoolLayerClick);
    }
    return () => {
      map.current.off("click", "schools", handleSchoolLayerClick);
    };
  }, [schoolLayerEditMode, handleSchoolLayerClick]);

  //////////////////// CLICK ON BUILDINGS LAYER ///////////////////////
  const handleBuildingLayerClick = useCallback(
    (e) => {
      setId(e.features[0].id);
      setCoodinates(e.features[0].geometry.coordinates);
      setIsModalOpen(true);
    },
    []
  );

  useEffect(() => {
    if (buildingLayerEditMode) {
      map.current.on("click", "buildings", handleBuildingLayerClick);
    }
    return () => {
      map.current.off("click", "buildings", handleBuildingLayerClick);
    };
  }, [buildingLayerEditMode, handleBuildingLayerClick]);

  const handleMapClick = useCallback((e) => {
    if (schoolLayerDrawingMode || buildingLayerDrawingMode) {
      const clickedCoordinates = [e.lngLat.lng, e.lngLat.lat];
      setCoodinates(clickedCoordinates);
    }
  }, [schoolLayerDrawingMode, buildingLayerDrawingMode]);

  useEffect(() => {
    if (schoolLayerDrawingMode || buildingLayerDrawingMode) {
      map.current.on("click", handleMapClick);
      return () => map.current.off("click", handleMapClick);
    }
  }, [schoolLayerDrawingMode, buildingLayerDrawingMode, handleMapClick]);



  useEffect(() => {
    const removeMarker = () => {
      if (map.current) {
        marker.remove();
        setMarker(null);
      }
    };

    const delay = 1000;
    const timeout = setTimeout(() => {
      if (marker != null){
        map.current.on("click", removeMarker);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [marker]);


  const typesOfActionsForOpeningModal = [
    {
      condition: schoolLayerDrawingMode || schoolLayerEditMode,
      value: "School Layer",
    },
    {
      condition: buildingLayerDrawingMode || buildingLayerEditMode,
      value: "Building Layer",
    },
  ];

  const type = typesOfActionsForOpeningModal.find((t) => t.condition)?.value || null;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addMarker = (lng, lat) => {
    if (map.current) {
      setMarker(new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current));
    }
  };

  useEffect(() => {
    if (!analysisResults || !analysisResults.building || !analysisResults.building.school_location) {
      return;
    }
    const { school_location } = analysisResults.building;

    const coordinatesRegex = /POINT\(([-.\d]+) ([-.\d]+)\)/;
    const matches = school_location.match(coordinatesRegex);

    if (!matches || matches.length < 3) {
      return;
    }

    const longitude = parseFloat(matches[1]);
    const latitude = parseFloat(matches[2]);
    addMarker(longitude,latitude)
  }, [analysisResults]);



  return (
    <div className="mapContainer">
      {isModalOpen && <Modal
        onClose={handleCloseModal}
        type={type}
        id={id}
        setId={setId}
        coordinates={coordinates}
        setIsModalOpen={setIsModalOpen}
        data={type === "School Layer" ? schools : buildings}
        isDrawingMode={type === "School Layer" ? schoolLayerDrawingMode : buildingLayerDrawingMode}
        isEditMode={type === "School Layer" ? schoolLayerEditMode : buildingLayerEditMode}
        setAreSchoolsUpdated={setAreSchoolsUpdated}
        setAreBuildingsUpdated={setAreBuildingsUpdated}
      >
      </Modal>
      }
      <LeftMenu
        isBuildingLayerVisible={isBuildingLayerVisible}
        setBuildingLayerVisible={setBuildingLayerVisible}
        buildingLayerDrawingMode={buildingLayerDrawingMode}
        setBuildingLayerDrawingMode={setBuildingLayerDrawingMode}
        buildingLayerEditMode={buildingLayerEditMode}
        setBuildingLayerEditMode={setBuildingLayerEditMode}
        isSchoolLayerVisible={isSchoolLayerVisible}
        setSchoolLayerVisible={setSchoolLayerVisible}
        schoolLayerDrawingMode={schoolLayerDrawingMode}
        setSchoolLayerDrawingMode={setSchoolLayerDrawingMode}
        schoolLayerEditMode={schoolLayerEditMode}
        setSchoolLayerEditMode={setSchoolLayerEditMode}
      />
      <BottomMenu
        isAnalysisDone={isAnalysisDone}
        setIsAnalysisDone={setIsAnalysisDone}
        setAnalysisResults={setAnalysisResults}
      />
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default MapContainer;
