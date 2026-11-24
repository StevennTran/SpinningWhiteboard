"use strict";

const gui = new lil.GUI({
    title: "Spinning White Board"
  });
let pauseController;

const motionTypes = ["Line", "Circle", "Square", "Figure 8", "Pretzel", "Mouse"];

let guiParams = {
  wheelSpeed: 1,
  reverseWheel: false,

  motionType: "Line",
  amplitude: 140,
  xCenter: 50,
  yCenter: 67,
  showGenerator: true,

  markerSpeed: 5,
  markerThickness: 2,

  red: 120,
  green: 0,
  blue: 255,

  pauseResume: function() {
    pauseButtonClicked();
  },

  clear: function() {
    clearButtonClicked();
  },

  screenshot: function() {
    screenshotButtonClicked();
  },

  darkMode: function() {
    button1_click1();
  },

  demo1: function() {
    demoButton1Clicked();
  },

  demo2: function() {
    demoButton2Clicked();
  },

  demo3: function() {
    demoButton3Clicked();
  },

  demo4: function() {
    demoButton4Clicked();
  },

  demo5: function() {
    demoButton5Clicked();
  },

  demo6: function() {
    demoButton6Clicked();
  },

  demo7: function() {
    demoButton7Clicked();
  },

  demo8: function() {
    demoButton8Clicked();
  },

  demo9: function() {
    demoButton9Clicked();
  },

  demo10: function() {
    demoButton10Clicked();
  },

  demo11: function() {
    Demo11buttonClicked();
  }
};


function pauseButtonClicked() {
  paused = !paused;
  pauseController.name(paused ? "Resume" : "Pause");
}


function clearButtonClicked() {
  clearDrawing();
}


function screenshotButtonClicked() {
  saveCanvas("Screenshot " + screenshotNum, "png");
  screenshotNum++;
}


function markerSpeedSliderChanged() {
  getControllerValues();
  clearDrawing();
}


function markerThicknessSliderChanged() {
  myMarker.strokeSize = Number(guiParams.markerThickness);
}


function wheelSpeedSliderChanged() {
  wheelRotationalFreq = Number(guiParams.wheelSpeed) / 100;
  resetAngle();
  clearDrawing();
}


function wheelDirectionChecked() {
  wheelDirection = guiParams.reverseWheel ? -1 : 1;
  resetAngle();
  clearDrawing();
}


function motionTypeListSelected() {
  generatorShape.type = guiParams.motionType;
  console.log("Just got", generatorShape.type);

  if (generatorShape.type === "Mouse") {
    guiParams.markerThickness = 1;
    myMarker.strokeSize = 1;
    updateGUIControllers();
  }

  getControllerValues();
  clearDrawing();
}


function amplitudeSliderChanged() {
  getControllerValues();
  clearDrawing();
}


function xySliderChanged() {
  getControllerValues();
  clearDrawing();
}


function demoButton1Clicked() {
  setControllerValues(0, 4, 17, 33, 18, 75, 3, 1);
  getControllerValues();
  clearDrawing();
}

function demoButton2Clicked() {
  setControllerValues(0, 1, 14, 200, 50, 54, 2, 1);
  getControllerValues();
  clearDrawing();
}

function demoButton3Clicked() {
  setControllerValues(1, 3, 16, 21, 50, 55, 1, 1);
  getControllerValues();
  clearDrawing();
}

function demoButton4Clicked() {
  setControllerValues(1, 1, 3, 108, 71, 72, 5, -1);
  getControllerValues();
  clearDrawing();
}

function demoButton5Clicked() {
  setControllerValues(1, 1, 4, 26, 87, 72, 1, -1);
  getControllerValues();
  clearDrawing();
}

function demoButton6Clicked() {
  setControllerValues(2, 1, 3, 100, 50, 72, 3, -1);
  getControllerValues();
  clearDrawing();
}

function demoButton7Clicked() {
  setControllerValues(2, 2, 19, 30, 59, 14, 2, 1);
  getControllerValues();
  clearDrawing();
}

function demoButton8Clicked() {
  setControllerValues(4, 1, 13, 120, 57, 27, 1, 1);
  getControllerValues();
  clearDrawing();
}

function demoButton9Clicked() {
  setControllerValues(4, 2, 5, 68, 20, 50, 2, -1);
  getControllerValues();
  clearDrawing();
}

function demoButton10Clicked() {
  setControllerValues(3, 1, 3, 60, 50, 87, 4, -1);
  getControllerValues();
  clearDrawing();
}

function Demo11buttonClicked() {
  setControllerValues(2, 15, 5, 100, 60, 65, 3, 1);
  getControllerValues();
  clearDrawing();
}


function button1_click1() {
  console.log("button1 - Dark Mode @ " + millis());
}


function updateGUIControllers() {
  for (let controller of gui.controllersRecursive()) {
    controller.updateDisplay();
  }
}


// Create all the GUI controls.
function createGUI() {

  let actionsFolder = gui.addFolder("Actions");

  pauseController = actionsFolder
    .add(guiParams, "pauseResume")
    .name("Pause");

  actionsFolder
    .add(guiParams, "clear")
    .name("Clear");

  actionsFolder
    .add(guiParams, "screenshot")
    .name("Take screenshot");

  actionsFolder
    .add(guiParams, "darkMode")
    .name("Dark Mode");


  let wheelFolder = gui.addFolder("Wheel");

  wheelFolder
    .add(guiParams, "wheelSpeed", 1, 15, 1)
    .name("Wheel speed")
    .onChange(wheelSpeedSliderChanged);

  wheelFolder
    .add(guiParams, "reverseWheel")
    .name("Reverse wheel")
    .onChange(wheelDirectionChecked);


  let generatorFolder = gui.addFolder("Generator");

  generatorFolder
    .add(guiParams, "motionType", motionTypes)
    .name("Curve type")
    .onChange(motionTypeListSelected);

  generatorFolder
    .add(guiParams, "amplitude", 0, 300, 1)
    .name("Size")
    .onChange(amplitudeSliderChanged);

  generatorFolder
    .add(guiParams, "xCenter", 0, 100, 1)
    .name("Center X (%)")
    .onChange(xySliderChanged);

  generatorFolder
    .add(guiParams, "yCenter", 0, 100, 1)
    .name("Center Y (%)")
    .onChange(xySliderChanged);

  generatorFolder
    .add(guiParams, "showGenerator")
    .name("Show generator");


  let markerFolder = gui.addFolder("Marker");

  markerFolder
    .add(guiParams, "markerSpeed", 1, 20, 1)
    .name("Marker speed")
    .onChange(markerSpeedSliderChanged);

  markerFolder
    .add(guiParams, "markerThickness", 1, 5, 1)
    .name("Thickness")
    .onChange(markerThicknessSliderChanged);


  let colourFolder = gui.addFolder("Colour");

  colourFolder
    .add(guiParams, "red", 0, 255, 1)
    .name("Red");

  colourFolder
    .add(guiParams, "green", 0, 255, 1)
    .name("Green");

  colourFolder
    .add(guiParams, "blue", 0, 255, 1)
    .name("Blue");


  let demoFolder = gui.addFolder("Demos");

  demoFolder.add(guiParams, "demo1").name("Demo 1");
  demoFolder.add(guiParams, "demo2").name("Demo 2");
  demoFolder.add(guiParams, "demo3").name("Demo 3");
  demoFolder.add(guiParams, "demo4").name("Demo 4");
  demoFolder.add(guiParams, "demo5").name("Demo 5");
  demoFolder.add(guiParams, "demo6").name("Demo 6");
  demoFolder.add(guiParams, "demo7").name("Demo 7");
  demoFolder.add(guiParams, "demo8").name("Demo 8");
  demoFolder.add(guiParams, "demo9").name("Demo 9");
  demoFolder.add(guiParams, "demo10").name("Demo 10");
  demoFolder.add(guiParams, "demo11").name("Demo 11");

  demoFolder.close();
}
