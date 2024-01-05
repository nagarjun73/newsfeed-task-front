import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>Hii</h1>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<NewsFeed />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
