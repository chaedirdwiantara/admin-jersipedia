import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import DefaultImage from "../../assets/img/default-image.jpg";
import { getListLiga } from "actions/LigaAction";

class TambahJersey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: DefaultImage,
      image2: DefaultImage,
      imageToDB1: false,
      imageToDB2: false,

      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukurans: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      ready: true,
      liga: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getListLiga());
  }

  render() {
    const {
      berat,
      harga,
      image1,
      image2,
      imageToDB1,
      imageToDB2,
      jenis,
      liga,
      nama,
      ready,
      ukuranSelected,
      ukurans,
    } = this.state;
    const { getListLigaResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/jersey" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Tambah Jersey</CardHeader>
              <CardBody>
                <form>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img
                            src={image1}
                            width="300"
                            alt="Foto Jersey (Depan)"
                          />
                          <FormGroup>
                            <label>Foto Jersey (Depan)</label>
                            <Input type="file" name="image1" />
                          </FormGroup>
                        </Col>
                        <Col>
                          <img
                            src={image2}
                            width="300"
                            alt="Foto Jersey (Belakang)"
                          />
                          <FormGroup>
                            <label>Foto Jersey (Belakang)</label>
                            <Input type="file" name="image2" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Jersey</label>
                        <Input type="text" value={nama} name={nama} />
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Liga</label>
                            <Input type="select" name="liga">
                              <option value="">--Pilih--</option>
                              {Object.keys(getListLigaResult).map((key) => (
                                <option value={key} key={key}>
                                  {getListLigaResult[key].namaLiga}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Harga (Rp.)</label>
                            <Input type="number" value={harga} name={harga} />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Berat (kg)</label>
                            <Input type="number" value={berat} name={berat} />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input type="text" value={jenis} name={jenis} />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Label>Ukuran</Label>
                          <FormGroup check>
                            {ukurans.map((ukuran, index) => (
                              <Label key={index} check className="mr-2">
                                <Input type="checkbox" value={ukuran} />
                                {ukuran}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            ))}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Ready</label>
                            <Input type="select" name="ready" value={ready}>
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        color="primary"
                        className="float-right"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </form>
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

export default connect(mapStateToProps, null)(TambahJersey);
