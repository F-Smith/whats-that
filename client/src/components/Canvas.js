import React from "react";

// Redux Imports
import { connect } from "react-redux";
import * as Actions from "../redux/actions/index";

// Component & Container Imports
import Button from "./Button";
import GuessBox from "../components/GuessBox";

import quickdrawSvgRender from "../utils/quickdrawSvgRender/quickdrawSvgRender";

// arol tip: useReducer instead of having this mess of variables here.
let isDrawing = false;
let lastXCoordinate = 0;
let lastYCoordinate = 0;
let drawing = [];
let xCoordinate = [];
let yCoordinate = [];
let timestamp = [];

const googleURL =
  // REPLACE WHEN BACKEND PROVIDE ENDPOINT
  "https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8";

const postDrawing = setWAYD => {
  fetch(googleURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      options: "enable_pre_space",
      requests: [
        {
          writing_guide: {
            writing_area_width: 375,
            writing_area_height: 375
          },
          ink: drawing,
          language: "quickdraw"
        }
      ]
    })
  })
    .then(res => res.json())
    .then(data => setWAYD(data[1][0][1][0]))
    .catch(err => console.error(err)); // eslint-disable-line no-console
};

const Canvas = props => {
  const [locations, setLocations] = React.useState([]);
  const canvasRef = React.useRef(null);
  const [WAYD, setWAYD] = React.useState("Trying to guess...");
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // canvas size
    canvas.width = 375;
    canvas.height = 375;
    canvas.style.width = "375px";
    canvas.style.height = "375px";

    // canvas settings
    ctx.strokeStyle = "#fff";
    ctx.linecap = "round";
    ctx.lineWidth = 3;

    const draw = e => {
      if (!isDrawing) return;
      e.preventDefault();
      e.stopPropagation();

      if (e.x || e.y) {
        xCoordinate.push(e.layerX);
        yCoordinate.push(e.layerY);
        timestamp.push(e.timeStamp);

        ctx.beginPath();
        ctx.moveTo(lastXCoordinate, lastYCoordinate);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastXCoordinate = e.offsetX;
        lastYCoordinate = e.offsetY;
      } else {
        let touch = e.touches[0];
        let x = touch.pageX - touch.target.offsetLeft;
        let y = touch.pageY - touch.target.offsetTop;
        xCoordinate.push(x);
        yCoordinate.push(y);
        timestamp.push(e.timeStamp);

        ctx.beginPath();
        ctx.moveTo(lastXCoordinate, lastYCoordinate);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastXCoordinate = x;
        lastYCoordinate = y;
      }
    };

    // eventlisteners: mouse
    canvas.addEventListener("mousedown", e => {
      isDrawing = true;
      lastXCoordinate = e.offsetX;
      lastYCoordinate = e.offsetY;
    });

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("mouseup", event => {
      event.preventDefault();
      isDrawing = false;

      let xyCoordinates = [xCoordinate, yCoordinate, timestamp];
      drawing.push(xyCoordinates);

      postDrawing(setWAYD);
      // console.log(quickdrawSvgRender(drawing, 375, 375));

      xCoordinate = [];
      yCoordinate = [];
      timestamp = [];
      xyCoordinates = [];
    });

    canvas.addEventListener("mouseout", () => {
      isDrawing = false;
    });

    // eventlisteners: touch
    canvas.addEventListener("touchstart", e => {
      isDrawing = true;
      let touch = e.touches[0];

      lastXCoordinate = touch.pageX - touch.target.offsetLeft;
      lastYCoordinate = touch.pageY - touch.target.offsetTop;
    });

    canvas.addEventListener("touchmove", draw);

    canvas.addEventListener("touchend", () => {
      isDrawing = false;
    });
  }, []);

  const handleCanvasClick = e => {
    const newLocation = { x: e.clientX, y: e.clientY };
    setLocations([...locations, newLocation]);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setWAYD("Trying to guess...");
    setLocations([]);
  };

  return (
    <>
      <canvas ref={canvasRef} onClick={handleCanvasClick} />
      <Button clear onClick={handleClear}>
        <i className="far fa-trash-alt" />
      </Button>
      <GuessBox>
        {WAYD !== "Trying to guess..." ? (
          <h4>{"Is it" + WAYD + "?"}</h4>
        ) : (
          // replace with null
          WAYD
        )}
      </GuessBox>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  postDrawing: drawing => dispatch(Actions.postDrawing(drawing))
});
// For now this function is not used, revise when FE and BE are connected

export default connect(
  null,
  mapDispatchToProps
)(Canvas);
