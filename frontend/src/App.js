import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageContent from "./pages/ManageContent";
import MyChannel from "./pages/MyChannel";
import Search from "./pages/Search";
import Video from "./pages/Video";
import { darkTheme, lightTheme } from "./utils/Theme";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 26px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <NavBar />
            <Wrapper>
              <Routes>
                <Route path="/" type="random">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <Login />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route
                    path="mychannel"
                    element={currentUser ? <MyChannel /> : <Home />}
                  />
                  <Route
                    path="manage-videos"
                    element={currentUser ? <ManageContent /> : <Home />}
                  />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
