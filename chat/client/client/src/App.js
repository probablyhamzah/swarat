import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/chat";
import "./App.css"


const App = () => {

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
