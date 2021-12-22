import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Spinner,
  Button,
} from "reactstrap";
import { getListJersey } from "actions/JerseyAction";

class ListJersey extends Component {
  componentDidMount() {
    this.props.dispatch(getListJersey());
  }

  removeData = (image, id) => {
    //tahan
  };

  componentDidUpdate(prevProps) {
    //tahan
  }

  render() {
    const { getListJerseyError, getListJerseyLoading, getListJerseyResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Jersey</CardTitle>
                <Link
                  to="/admin/jersey/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Jersey
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Foto</th>
                      <th>Nama Jersey</th>
                      <th>Harga</th>
                      <th>Berat</th>
                      <th>Jenis</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListJerseyResult ? (
                      Object.keys(getListJerseyResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListJerseyResult[key].gambar[0]}
                              width="100"
                              alt={getListJerseyResult[key].nama}
                            />
                          </td>
                          <td>{getListJerseyResult[key].nama}</td>
                          <td>Rp. {getListJerseyResult[key].harga}</td>
                          <td>{getListJerseyResult[key].berat} kg</td>
                          <td>{getListJerseyResult[key].jenis}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/Jersey/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() => {}}
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListJerseyLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListJerseyError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListJerseyError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
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
  getListJerseyLoading: state.JerseyReducer.getListJerseyLoading,
  getListJerseyResult: state.JerseyReducer.getListJerseyResult,
  getListJerseyError: state.JerseyReducer.getListJerseyError,
});

export default connect(mapStateToProps, null)(ListJersey);
