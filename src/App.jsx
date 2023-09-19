// import {useEffect} from 'react'

// import Editor from "./components/editor.jsx";
// import Graph from "./components/graph.jsx";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import Loading from "./router/loading.jsx";
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
