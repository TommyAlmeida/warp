import Route from "./utils/Route";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
       <Route path="/">
        <HomePage />
      </Route>
       <Route path="/editor/:roomId">
        <HomePage />
      </Route>
    </>
  )
}