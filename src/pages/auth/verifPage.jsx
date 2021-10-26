import React from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import Success from "../../components/Success";

import activationSuccessHero from "../../assets/img/info/accountactive.png";

const API_URL = "https://api-warehouse-3.purwadhikafs2.com";

class VerifPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivated: false,
    };
  }
  componentDidMount() {
    let emailToken = this.props.match.params.email;
    Axios.post(
      `${API_URL}/user/auth/verification`,
      {},
      {
        headers: {
          Authorization: `Bearer ${emailToken}`,
        },
      }
    )
      .then((res) => {
        if (res.data.message) this.setState({ isActivated: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Container style={style.verifContainer}>
          <div>
            <Success
              title="Welcome to Ukea"
              body={`Your account is now active, please login`}
              img={activationSuccessHero}
              backTo={{ title: "login", to: "/auth/login" }}
            />
          </div>
        </Container>
      </div>
    );
  }
}

const style = {
  verifContainer: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  verifWrapper: {
    border: "1px solid #F9FAFB",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  verifHeroImage: {
    width: "70%",
  },
};

export default VerifPage;
