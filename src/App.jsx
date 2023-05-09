// "When I go back to the browser, what am I expecting to see?"

// DON'T ship the React development package. It's ~400% the size of the release package. Vite takes care of this automatically
// Strict mode: React feature that warns you about stuff that will probably stop working in new versions. To enable, wrap everything in App's return( <StrictMode> </StrictMode> )

// *** Dependencies *** //
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// ^ React Router is by far the most popular client routing library.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ^ The hardest part about React - effects. Should minimize useEffect wherever possible. To that end: React Query

// *** Components *** //
import SearchParams from "./SearchParams";
import Details from "./Details";


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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  }
});

const App = () => {
  return (
    <BrowserRouter>                                         {/* Higher-order component for React Router */}
      <QueryClientProvider client={queryClient}>            {/* Higher-order component for React Query */}
        <header>
          <Link to='/'>Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
// root.render(React.createElement(App));
root.render(<App />);

export default App;
