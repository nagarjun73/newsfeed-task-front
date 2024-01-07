//importing packages
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useReducer, createContext, useEffect } from 'react';

//importing state and reducer
import userReducer from './reducer/userReducer';
import userInitialState from './state/userInitialState';

//importing component
import NewsFeed from './components/Feed/NewsFeed';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NavBar from './components/NavBar/NavBar';

//helpers func
import getUserData from './helpers/getUserData';

//context
export const UserContext = createContext()

function App() {
  //useReducer
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  console.log(userState);

  useEffect(() => {
    const tokenPresent = localStorage.getItem('token')
    if (tokenPresent) {
      getUserData(userDispatch)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userState, userDispatch }}>
          <NavBar />
          <Routes>
            <Route path='/' element={<NewsFeed />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
