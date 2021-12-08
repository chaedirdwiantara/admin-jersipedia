import { getListLiga } from "actions/LigaAction";
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
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";

class TambahLiga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      namaLiga: "",
    };
  }

  handleChange = (event) => {
    // console.log(event, "event");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    // console.log(event, "event");
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, namaLiga } = this.state;
    event.preventDefault();
    if (imageToDB && namaLiga) {
      //proses lanjut ke action firebase
    } else {
      //alert
      swal("Failed!", "Maaf nama liga dan logo liga harus diisi", "error");
    }
  };

  render() {
    const { image, namaLiga } = this.state;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/liga" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tambah Liga</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Liga" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Liga</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Liga</label>
                        <Input
                          type="text"
                          value={namaLiga}
                          name="namaLiga"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Button color="primary" type="submit">
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(TambahLiga);
