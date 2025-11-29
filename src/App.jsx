import { useState, useEffect } from "react";

function App() {
  const [run, setRun] = useState(true);

  const [accVoltage, setAccVoltage] = useState(80);
  const [amperage, setAmperage] = useState(2);

  const changeAccVoltage = (e) => {
    if (e.target.value > 0) {
      setAccVoltage(e.target.value);
    }
  };

  const changeAmperage = (e) => {
    if (e.target.value > 0) {
      setAmperage(e.target.value);
    }
  };

  const magnFluxDensity = 0.756 * 10 ** -3 * amperage;

  const EL_CHARGE = 1.602e-19;
  const EL_MASS = 9.109e-31;

  const radius =
    (1 / magnFluxDensity) * Math.sqrt((2 * EL_MASS * accVoltage) / EL_CHARGE);

  const [elCircleProperties, setElCircleProperties] = useState(
    // in %
    /* 0.01m = 4.25% of width *
    /* 1 % width = -0.5% of left */
    /* 1 % width = -1.5% of left */
    {
      top: 40.6,
      left: 45,
      width: 8.5,
    }
  );

  useEffect(() => {
    const elCircle = document.querySelector(".el-circle");
    let radiusDifference = radius - elCircleProperties.width / 4.25 / 100;
    console.log("radiusDifference", radiusDifference * 6.375 * 100);
    setElCircleProperties({
      top: elCircleProperties.top - radiusDifference * 6.375 * 100,
      left: elCircleProperties.left - radiusDifference * 2.125 * 100,
      width: radius * 4.25 * 100,
    });
    elCircle.style.top = `${
      elCircleProperties.top - radiusDifference * 6.375 * 100
    }%`;
    elCircle.style.left = `${
      elCircleProperties.left - radiusDifference * 2.125 * 100
    }%`;
    elCircle.style.width = `${radius * 4.25 * 100}%`;
  }, [radius]);

  return (
    <>
      <h1>HELMHOLTZ-Spulen</h1>
      <div className="wrapper">
        <div className="calculation">
          <h2>Variablen und Berechnungen</h2>
          <p className="calculation-variables">
            <span className="variable-name">Beschleunigungsspannung</span> U
            <sub>B</sub>=
            <input
              id="acceleration-voltage"
              type="number"
              defaultValue={accVoltage}
              onChange={(e) => changeAccVoltage(e)}
            />
            ​V
          </p>
          <p className="calculation-variable">
            <span className="variable-name">Strom durch die Spulen</span> I ={" "}
            <input
              id="acceleration-voltage"
              type="number"
              defaultValue={amperage}
              onChange={(e) => changeAmperage(e)}
            />{" "}
            A
          </p>
          <p className="calculation-variable">
            {" "}
            <span className="variable-name">Magnetische Flussdichte</span> (in
            diesem Experiment) B = 0,756 &middot; 10<sup>&minus;3</sup> T/A
            &middot; I = {magnFluxDensity.toExponential(2)} T
          </p>
          <p className="calculation-variable">
            <span className="variable-name">Radius der Elektronenbahn</span>r =
            (1 / B) · √( (2 m U<sub>B</sub>) / e ) = {radius.toExponential(2)} m
          </p>
        </div>
        <div className="illustration">
          {run && <img src="el-circle.png" alt="" className="el-circle" />}
          <img src="construction.png" alt="" className="contsruction-img" />
        </div>
      </div>
    </>
  );
}

export default App;
