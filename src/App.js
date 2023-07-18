import { Container, Button, Row, Col } from "react-bootstrap";
import { useReducer } from "react";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "numbers": {
      if (state.counter !== 0) {
        return {
          ...state,
          view: action.nextNumber,
          memory: action.nextNumber,
          counter: 0,
        };
      } else if (state.view === "0") {
        return {
          ...state,
          view: action.nextNumber,
          memory: action.nextNumber,
        };
      } else if (["/", "*", "+", "-"].includes(state.view)) {
        return {
          ...state,
          view: action.nextNumber,
          memory: state.memory + action.nextNumber,
        };
      } else {
        return {
          ...state,
          view: state.view + action.nextNumber,
          memory: state.memory + action.nextNumber,
        };
      }
    }

    case "dot": {
      if (state.counter !== 0) {
        return {
          ...state,
          view: "0" + action.nextNumber,
          memory: "0" + action.nextNumber,
          counter: 0,
        };
      } else if (state.view === "0") {
        return {
          ...state,
          view: "0" + action.nextNumber,
          memory: "0" + action.nextNumber,
        };
      } else if (state.view.includes(".")) {
        return {
          ...state,
        };
      } else if (["/", "*", "+", "-"].includes(state.view)) {
        return {
          ...state,
          view: "0" + action.nextNumber,
          memory: state.memory + "0" + action.nextNumber,
        };
      } else {
        return {
          ...state,
          view: state.view + action.nextNumber,
          memory: state.memory + action.nextNumber,
        };
      }
    }

    case "calcul": {
      if (state.counter !== 0) {
        return {
          ...state,
          view: action.calculType,
          memory: state.view + action.calculType,
          counter: 0,
        };
      } else {
        if (!["/", "*", "+", "-"].includes(state.memory.slice(-1))) {
          return {
            ...state,
            view: action.calculType,
            memory: state.memory + action.calculType,
          };
        } else {
          if (!["/", "*", "+", "-"].includes(state.memory.slice(-2, -1))) {
            if (action.calculType !== "-") {
              return {
                ...state,
                view: action.calculType,
                memory:
                  state.memory.slice(0, state.memory.length - 1) +
                  action.calculType,
              };
            } else {
              return {
                ...state,
                view: action.calculType,
                memory: state.memory + action.calculType,
              };
            }
          } else {
            if (action.calculType !== "-") {
              return {
                ...state,
                view: action.calculType,
                memory:
                  state.memory.slice(0, state.memory.length - 2) +
                  action.calculType,
              };
            } else {
              return {
                ...state,
              };
            }
          }
        }
      }
    }

    case "reset": {
      return {
        ...state,
        view: "0",
        memory: "",
      };
    }

    case "result": {
      try {
        if (state.counter === 0) {
          return {
            ...state,
            view: eval(state.memory),
            memory: state.memory + "=" + eval(state.memory),
            counter: state.counter + 1,
          };
        } else {
          return {
            ...state,
          };
        }
      } catch (error) {
        return {
          ...state,
          view: "error",
          memory: "",
        };
      }
    }
    default:
      return Error("Unknown action: " + action.type);
  }
}

const initialState = { view: "0", memory: "", counter: 0 };

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function dot(event) {
    dispatch({
      type: "dot",
      nextNumber: event.target.value,
    });
  }

  function numbers(event) {
    dispatch({
      type: "numbers",
      nextNumber: event.target.value,
    });
  }

  function calcul(event) {
    dispatch({
      type: "calcul",
      calculType: event.target.value,
    });
  }

  function reset() {
    dispatch({
      type: "reset",
    });
  }

  function result() {
    dispatch({
      type: "result",
    });
  }

  return (
    <div className="App">
      <div className="App-header">
        <Container>
          <div id="displayMemory">{state.memory}</div>
          <div id="display">{state.view}</div>
          <Row>
            <Col>
              <Button
                variant="danger"
                id="clear"
                onClick={() => {
                  reset();
                }}
              >
                AC
              </Button>
              <Button
                variant="secondary"
                id="divide"
                value="/"
                onClick={(event) => {
                  calcul(event);
                }}
              >
                /
              </Button>
              <Button
                variant="secondary"
                id="multiply"
                value="*"
                onClick={(event) => {
                  calcul(event);
                }}
              >
                x
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="secondary"
                id="seven"
                value="7"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                7
              </Button>
              <Button
                variant="secondary"
                id="eight"
                value="8"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                8
              </Button>
              <Button
                variant="secondary"
                id="nine"
                value="9"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                9
              </Button>
              <Button
                variant="secondary"
                id="subtract"
                value="-"
                onClick={(event) => {
                  calcul(event);
                }}
              >
                -
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="secondary"
                id="four"
                value="4"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                4
              </Button>
              <Button
                variant="secondary"
                id="five"
                value="5"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                5
              </Button>
              <Button
                variant="secondary"
                id="six"
                value="6"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                6
              </Button>
              <Button
                variant="secondary"
                id="add"
                value="+"
                onClick={(event) => {
                  calcul(event);
                }}
              >
                +
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="secondary"
                id="one"
                value="1"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                1
              </Button>
              <Button
                variant="secondary"
                id="two"
                value="2"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                2
              </Button>
              <Button
                variant="secondary"
                id="three"
                value="3"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                3
              </Button>
              <Button
                variant="secondary"
                id="equals"
                onClick={() => {
                  result();
                }}
              >
                =
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="secondary"
                id="zero"
                value="0"
                onClick={(event) => {
                  numbers(event);
                }}
              >
                0
              </Button>
              <Button variant="secondary" id="decimal" value="." onClick={dot}>
                .
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
