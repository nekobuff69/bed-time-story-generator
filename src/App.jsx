import {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import AllSettings from "./components/AllSettings";
import {defaultSettings} from "./components/defaultSettings";

function App() {
	return (
		<>
			<Header />
			<AllSettings />
		</>
	);
}

export default App;
