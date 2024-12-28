import { useState } from "react";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import Projects from "./components/Projects";
import Commands from "./components/Commands";
import Executor from "./components/Executor";
import Logs from "./components/Logs";
import Settings from "./components/Settings";
import Header from "./components/Header";

function App() {
  const [config, setConfig] = useState(null);

  return (
    <div id="App">
      <main>
        <Header />
        <Settings setConfig={setConfig} />
        <Projects config={config} />
        <Commands config={config} />
        <Executor config={config} />
        <Logs config={config} />
      </main>
    </div>
  );
}

export default App;
