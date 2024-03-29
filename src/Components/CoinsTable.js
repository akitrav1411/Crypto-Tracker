import React, {useState,useEffect} from 'react'
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { Container, Pagination,ThemeProvider, createTheme,Typography, TextField, TableContainer, Table, LinearProgress, TableHead, TableRow,TableCell, TableBody } from '@mui/material';
import { CoinList } from '../config/api';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const Row=styled(TableRow)({
    backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    
})
const Pagi=styled(Pagination)({
    "& .MuiPaginationItem-root": {
        color: "gold",
      },
})

const CoinsTable = () => {
    const Navigate=useNavigate();
    const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  return (
   <ThemeProvider theme={darkTheme}>
   <Container style={{textAlign:"center"}}>
   <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
        label="Search for a Crypto currency.."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%",}}
        onChange={(e)=>setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
            
            {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) :(
            <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                    <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                        <TableCell

                        style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                 {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row)=>{
                    let profit=row.price_change_percentage_24h >0;
                    return(
                     <Row
                     onClick={()=>Navigate(`/coins/${row.id}`)}
                     >
                      <TableCell component="th" scope="row"
                      styles={{
                        display:"flex",
                        gap:15,
                      }}
                      >
                        <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color:"darkgrey"
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                      </TableCell>
                      <TableCell align="right" style={{ color: "darkgrey" }}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "darkgrey" }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                     </Row>
                    );
                 })}
                </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagi
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          />
   </Container>

   </ThemeProvider>
  )
}

export default CoinsTable
