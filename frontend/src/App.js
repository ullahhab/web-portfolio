// import logo from './logo.svg';
// import './App.css';
// import Projects from './projects';
// import NetworthPage from './pages/NetworthPage';
// //import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// /*function App() {
//   return (
//     <div className='App'>
//       <h1>Welcome to my portfolio and Project showcase</h1>
//       <Projects />
//     </div>
//   );
// }*/


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <h1>Welcome to my portfolio</h1>
//         <Routes>
//           <Route path="/" element={<Projects />} />
//           <Route path="/networth" element={<NetworthPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import Projects from './projects';

function App() {
  return (
    <div className='App'>
      <h1>Welcome to my portfolio and Project showcase</h1>
      <Projects />
    </div>
  );
}

export default App;
