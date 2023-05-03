// "When I go back to the browser, what am I expecting to see?"

import ReactDOM from "react-dom/client";
// import Pet from './Pet';
import SearchParams from "./SearchParams";

// One-way data flow (props) - Vastly simplifies debugging and makes data flow much more explicit
// Since child now expects props, add arguments to createElement commands in parent

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       animal: "Cat",
//       name: "Kida",
//       type: "Siamese",
//     }),
//     React.createElement(Pet, {
//       animal: "Cat",
//       name: "Jojo",
//       type: "Black",
//     }),
//     React.createElement(Pet, {
//       animal: "Cat",
//       name: "Zeus",
//       type: "Fluffer",
//     }),
//   ]);
// };

// Identical to:

const App = () => {
  return (
  <div>
    <h1>Adopt Me!</h1>
    <SearchParams />
    {/* <Pet name="Kida" animal="cat" breed="Siamese" />
    <Pet name="Jojo" animal="cat" breed="Black" />
    <Pet name="Zeus" animal="cat" breed="Fluffer" /> */}
  </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
// root.render(React.createElement(App));
root.render(<App />);

export default App;
