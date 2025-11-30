import { useState, useEffect } from "react";

function App() {
  // const [run, setRun] = useState(true);
  const [error, setError] = useState(null);

  const [accVoltage, setAccVoltage] = useState(80);
  const [amperage, setAmperage] = useState(2);

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
      left: 45.5,
      width: 8.4,
    }
  );

  const CM_IN_PERCENT = 4.2;
  console.log(radius, 0 < radius < 0.046);
  useEffect(() => {
    if (0 < radius && radius < 0.046) {
      const elCircle = document.querySelector(".el-circle");
      let radiusDifference =
        radius - elCircleProperties.width / CM_IN_PERCENT / 100;
      setElCircleProperties({
        top:
          elCircleProperties.top - radiusDifference * CM_IN_PERCENT * 1.5 * 100,
        left:
          elCircleProperties.left -
          radiusDifference * CM_IN_PERCENT * 0.5 * 100,
        width: radius * CM_IN_PERCENT * 100,
      });
      elCircle.style.top = `${
        elCircleProperties.top - radiusDifference * CM_IN_PERCENT * 1.5 * 100
      }%`;
      elCircle.style.left = `${
        elCircleProperties.left - radiusDifference * CM_IN_PERCENT * 0.5 * 100
      }%`;
      elCircle.style.width = `${radius * CM_IN_PERCENT * 100}%`;
      setError(null);
    } else {
      setError(true);
    }
  }, [radius]);

  return (
    <>
      <h1>HELMHOLTZ-Spulen</h1>
      <div className="wrapper">
        <div className="calculation">
          <h2>Variablen und Berechnungen</h2>
          <p className="calculation-variable">
            <span className="variable-name">Beschleunigungsspannung</span>
            <span className="variable-value">
              U<sub>B</sub>=
              <input
                id="acceleration-voltage"
                type="number"
                value={accVoltage}
                onChange={(e) => setAccVoltage(e.target.value)}
              />
              ​V
              <button
                className="minus-button"
                onClick={() => setAccVoltage((prev) => Number(prev) - 10)}
              >
                -
              </button>
              <button
                className="plus-button"
                onClick={() => setAccVoltage((prev) => Number(prev) + 10)}
              >
                +
              </button>
            </span>
          </p>
          <p className="calculation-variable">
            <span className="variable-name">Strom durch die Spulen</span>
            <span className="variable-value">
              I ={" "}
              <input
                id="acceleration-voltage"
                type="number"
                value={amperage}
                onChange={(e) => setAmperage(e.target.value)}
              />{" "}
              A
              <button
                className="minus-button"
                onClick={() => setAmperage((prev) => Number(prev) - 1)}
              >
                -
              </button>
              <button
                className="plus-button"
                onClick={() => setAmperage((prev) => Number(prev) + 1)}
              >
                +
              </button>
            </span>
          </p>
          <p className="calculation-variable">
            {" "}
            <span className="variable-name">
              Magnetische Flussdichte (in diesem Experiment)
            </span>
            <span className="variable-value">
              {" "}
              B = 0,756 &middot; 10<sup>&minus;3</sup> T/A &middot;I ={" "}
              <span className="result">
                {magnFluxDensity.toExponential(2)} T
              </span>
            </span>
          </p>
          <p className="calculation-variable">
            <span className="variable-name">Radius der Elektronenbahn</span>
            <span className="variable-value">
              r = (1 / B) · √( (2 m U<sub>B</sub>) / e ) ={" "}
              {!error ? (
                <span className="result">{radius.toExponential(2)} m</span>
              ) : (
                <span className="error">
                  Die Radiuslänge liegt nicht im zulässigen Bereich
                </span>
              )}
            </span>
          </p>
        </div>
        <div className="illustration">
          <img
            src="/helmholtz-spulen/el-circle.png"
            alt=""
            className={`el-circle ${error ? "hidden" : ""}`}
          />

          <img
            src="/helmholtz-spulen/construction.png"
            alt=""
            className="construction-img"
          />
        </div>
      </div>
    </>
  );
}

export default App;
