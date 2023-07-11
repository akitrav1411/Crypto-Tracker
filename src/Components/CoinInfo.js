import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
Chart.register(CategoryScale);

const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const Contain=styled('div')(({theme})=>({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }))
const CoinInfo = ({coin}) => {
    const[historicData,setHistoricData]=useState();
    const[days,setDays]=useState(1);
    const{currency}=CryptoState();
    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricData(data.prices);
      };

      useEffect(()=>{
        fetchHistoricData();
      },[currency,days]);

      
  return (
    <ThemeProvider theme={darkTheme}>
        <Contain>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (<>
            <Line 
            data={{
                labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets:[
                    {data:historicData.map((coin)=>coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
            }],
            }}
            options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
             </>)
        }
        </Contain>
    </ThemeProvider>
  )
}

export default CoinInfo
