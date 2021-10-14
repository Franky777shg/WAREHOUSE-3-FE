import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { adminLogout } from "../../redux/actions";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar style={style.navbar} className="px-4">
          <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Nav
            className="text-center"
            style={{ display: "flex", justifyContent: "center", width: "80%" }}
          >
            <Nav.Link href="#home" style={style.navLink}>
              <i class="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link href="#features" style={style.navLink}>
              <i class="fas fa-shopping-cart"></i> Transaction
            </Nav.Link>
            <Nav.Link href="#pricing" style={style.navLink}>
              <i class="fas fa-dice-d6"></i> Product
            </Nav.Link>
            <Nav.Link href="#as" style={style.navLink} as={Link}
                        to="/admin/superadmin-page">
              <i class="fab fa-houzz"></i> Warehouse
            </Nav.Link>
            <Nav.Link href="#asc" style={style.navLink}>
              <i class="far fa-credit-card"></i> Payment
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Dropdown align="end">
              <Dropdown.Toggle variant="default" id="dropdown-basic">
                <i class="fas fa-user"></i> {this.props.adminUsername}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <hr />
                <Dropdown.Item>
                  <div className="d-grid gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={this.props.adminLogout}
                      block
                    >
                      Logout
                    </Button>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const style = {
  navbar: {
    borderBottom: "1px solid #eaeaea",
  },
  navLink: {
    fontWeight: "500",
  },
};

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
    adminRole: state.adminReducer.adminRole,
  };
};

export default connect(mapStateToProps, { adminLogout })(NavigationBar);
