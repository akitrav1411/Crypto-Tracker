import { Container, styled, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";
//import Carousel from "./Carousel";

const MyContainer = styled(Container)({
  backgroundImage: "url(./banner2.jpg)",
});

const BannerContent = styled("div")({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const Tagline = styled(Typography)({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: 15,
  fontFamily: "Montserrat",
});

const Subtitle = styled(Typography)({
  color: "darkgrey",
  textTransform: "capitalize",
  fontFamily: "Montserrat",
  textAlign: "center",
});

function Banner() {
  return (
    <MyContainer>
      <BannerContent>
        <div>
          <Tagline variant="h2">Crypto Hunter</Tagline>
          <Subtitle variant="subtitle2">
            Get all the Info regarding your favorite Crypto Currency
          </Subtitle>
        </div>
      </BannerContent>
      <Carousel></Carousel>
    </MyContainer>
  );
}

export default Banner;
