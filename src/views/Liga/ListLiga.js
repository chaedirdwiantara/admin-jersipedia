import { getListLiga } from "actions/LigaAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";

class ListLiga extends Component {
  componentDidMount() {
    this.props.dispatch(getListLiga());
  }
  render() {
    console.log(this.props.getListLigaResult, "result");
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Liga</CardTitle>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListLigaLoading: state.LigaReducer.getListLigaLoading,
  getListLigaResult: state.LigaReducer.getListLigaResult,
  getListLigaError: state.LigaReducer.getListLigaError,
});

export default connect(mapStateToProps, null)(ListLiga);
