import './App.css';
import Header from './Components/Header'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Coinspage from './Pages/Coinspage';
import styled from '@emotion/styled';

const MyComponent=styled('div')({
  backgroundColor:'#14161a',
  color: 'white',
  minHeight:'100vh',
  padding: '10px',
})

function App() {
  return (
    <BrowserRouter>
    <MyComponent>
      <Header />
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/coins/:id" element={<Coinspage />} />
      </Routes>
      
    </MyComponent>
    </BrowserRouter>
    
  );
}

export default App;
