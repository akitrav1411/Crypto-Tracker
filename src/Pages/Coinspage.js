import React,{useEffect, useState} from 'react'
import { useParams} from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import  axios  from 'axios';
import { SingleCoin } from '../config/api';
import { styled } from '@mui/system';
import { Typography,LinearProgress} from '@mui/material';
import { numberWithCommas } from '../Components/CoinsTable';
import Parse from 'html-react-parser'
import CoinInfo from '../Components/CoinInfo';

const Contain=styled('div')(({theme})=>({
  display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
}))

const Sidebar=styled('div')(({theme})=>({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",

}))

const Name=styled(Typography)({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
})

const Description=styled(Typography)({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
})

const MarketData=styled('div')(({theme})=>({
  alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
}))
const Coinspage = () => {
  const {id}=useParams();
  const{currency,symbol}=CryptoState();
  const [coin,setCoin]=useState();
  const fetchCoin =async()=>{
    const { data }=await axios.get(SingleCoin(id))
    setCoin(data);
  };
console.log(coin)
  useEffect(()=>{
    fetchCoin();
  },[])

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Contain>
     <Sidebar>
     <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Name variant="h3" >
          {coin?.name}
        </Name>
        <Description variant="subtitle1" >
          {Parse(`<p>${coin?.description.en.split(". ")[0]}</p>`)}
        </Description>
        <MarketData>
        <span style={{ display: "flex" }}>
            <Name variant="h6">
              Rank:
            </Name>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Name variant="h6">
              Current price:
            </Name>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Name variant="h6">
              Market Cap:
            </Name>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
     </Sidebar>
     <CoinInfo  coin={coin}/>
    </Contain>
  );
}

export default Coinspage
