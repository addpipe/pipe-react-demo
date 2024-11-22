import { useState } from "react";
import "./App.css";
import SingleRecorder from "./components/SingleRecorder";
import MultipleRecorders from "./components/MultipleRecorders";

function App() {
  const [currentPage, setCurrentPage] = useState("SINGLE");

  return (
    <>
      <h1>Pipe React Demo</h1>
      <p>This demo integrates the <a target="_blank" href="https://www.npmjs.com/package/@addpipe/react-pipe-media-recorder" rel="noreferrer"><code>@addpipe/react-pipe-media-recorder</code></a> NPM package into a React project.</p>
      <p>You can choose to view a working example of a single recording client or multiple being embedded into the page by clicking on the buttons below.</p>
      <p>The <a href="#links">links to the GitHub repositories</a> (JavaScript React and TypeScript React) for this demo can be found below.</p>
      <h3>View:</h3>
      <div className="navigation-top">
        <button
          disabled={currentPage === "SINGLE"}
          onClick={() => setCurrentPage("SINGLE")}
        >
          Single Embedded Recorder
        </button>
        <button
          disabled={currentPage === "MULTIPLE"}
          onClick={() => setCurrentPage("MULTIPLE")}
        >
          Multiple Embedded Recorders
        </button>
      </div>
      <hr />
      {currentPage === "SINGLE" && <SingleRecorder />}
      {currentPage === "MULTIPLE" && <MultipleRecorders />}
      <h2 id="links">Links to GitHub repos:</h2>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://github.com/addpipe/pipe-react-demo-ts"
            rel="noreferrer"
          >
            React with TypeScript Demo
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://github.com/addpipe/pipe-react-demo"
            rel="noreferrer"
          >
            React with JavaScript Demo
          </a>
        </li>
      </ul>
    </>
  );
}

export default App;