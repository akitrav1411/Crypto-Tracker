import styled from '@emotion/styled'
import { AppBar, Container, MenuItem,Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React,{memo} from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const Titles=styled(Typography)({
  flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    variant:"h5",
})
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Header = () => {
  const Navigate=useNavigate();
  const handleClick=()=>{
    Navigate('/')
  };
  const {currency,setCurrency }=CryptoState();
  //console.log(currency);
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Titles onClick={handleClick}>Crypto Hunter</Titles>
          <Select
           variant="outlined"
           style={{ width: 100, height: 40, marginLeft: 15 }}
           value={currency}
           onChange={(e)=>setCurrency(e.target.value)}
          >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default memo(Header)
