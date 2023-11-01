import {Route, Routes} from "react-router-dom";

import Home from "./pages/home.tsx";
import Dashboard from "./pages/dashboard.tsx";
import NoMatch from "./pages/NoMatch.tsx";
import Layout from "./Layout.tsx";
import Team from "./pages/team.tsx";
import Logout from "./pages/logout.tsx";
import Settings from "./pages/settings.tsx";
function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="team" element={<Team/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="logout" element={<Logout/>}/>

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
