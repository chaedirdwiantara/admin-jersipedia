import { getListLiga } from "actions/LigaAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
  Spinner,
} from "reactstrap";

class ListLiga extends Component {
  componentDidMount() {
    this.props.dispatch(getListLiga());
  }
  render() {
    const { getListLigaError, getListLigaLoading, getListLigaResult } =
      this.props;
    // console.log(getListLigaLoading, "getListLigaLoading");
    // console.log(getListLigaResult, "getListLigaResult");
    // console.log(getListLigaError, "getListLigaError");
    // console.log("---------------------");
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Liga</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Nama Liga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListLigaResult ? (
                      Object.keys(getListLigaResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListLigaResult[key].image}
                              width="100"
                              alt={getListLigaResult[key].namaLiga}
                            />
                          </td>
                          <td>{getListLigaResult[key].namaLiga}</td>
                          <td>
                            <Button color="warning">
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Button>
                            <Button color="danger" className="ml-2">
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListLigaLoading ? (
                      <tr>
                        <td colsSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListLigaError ? (
                      <tr>
                        <td colsSpan="3" align="center">
                          {getListLigaError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colsSpan="3" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
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
