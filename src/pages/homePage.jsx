import React from "react";
import HeaderCarousel from "../components/home/HeaderCarousel";
import NavigationBar from "../components/NavigationBar";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <Container>
        <HeaderCarousel />
      </Container>
    </div>
  );
}

export default HomePage;
