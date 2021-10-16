import React from "react";
import { Container } from "react-bootstrap";

class PageTitle extends React.Component {
  render() {
    return (
      <div style={style.container}>
        <Container>
          <h3 style={style.pageTitle}>{this.props.pageTitle}</h3>
        </Container>
      </div>
    );
  }
}

const style = {
  container: {
    width: "100%",
    height: "180px",
    backgroundColor: "#F3F4F6",
    paddingTop: "100px",
  },
  pageTitle: {
    color: "#000",
    fontWeight: 600,
  },
};

export default PageTitle;
