//importing packages
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios'

//importing state and reducer
import userReducer from './reducer/userReducer';
import userInitialState from './state/userInitialState';

//importing component
import NewsFeed from './components/Feed/NewsFeed';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NavBar from './components/NavBar/NavBar';

//context
export const UserContext = createContext()

function App() {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  console.log(userState);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        //get user details when app loades
        const getAccount = await axios.get('http://localhost:3073/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        userDispatch({ type: "USER_LOGIN", payload: getAccount.data })
      })()
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
