//importing packages
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useReducer, createContext, useEffect } from 'react';

//importing state and reducer
import userReducer from './reducer/userReducer';
import categoryInitialState from './state/categoryInitialState';
import userInitialState from './state/userInitialState';
import categoryReducer from './reducer/categoryReducer';

//importing component
import NewsFeed from './components/Feed/NewsFeed';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NavBar from './components/NavBar/NavBar';
import CategoryContainer from './components/Category/CategoryContainer'

//helpers func
import getUserData from './helpers/getUserData';
import getCategoryData from './helpers/getCategoryData';

//context
export const UserContext = createContext()
export const CategoryContext = createContext()

function App() {
  //useReducer
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  const [categoryState, categoryDispatch] = useReducer(categoryReducer, categoryInitialState)
  console.log(userState, categoryState);

  useEffect(() => {
    const tokenPresent = localStorage.getItem('token')
    if (tokenPresent) {
      getUserData(userDispatch)
      getCategoryData(categoryDispatch)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userState, userDispatch }}>
          <CategoryContext.Provider value={{ categoryState, categoryDispatch }}>
            <NavBar />
            <Routes>
              <Route path='/' element={<NewsFeed />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/category' element={<CategoryContainer />} />
            </Routes>
          </CategoryContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
