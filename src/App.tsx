import {Route, Routes} from "react-router-dom";

import Home from "./pages/home.tsx";
import Dashboard from "./pages/dashboard.tsx";
import NoMatch from "./pages/NoMatch.tsx";
import Layout from "./Layout.tsx";


function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
