import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { withRouter } from "react-router";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      slides: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.assignDataOfCarousel();
    }
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
    if (prevState.arrDoctors !== this.state.arrDoctors) {
      this.assignDataOfCarousel(this.state.arrDoctors);
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor(doctorId) {
    this.props.history.push(`/detail-doctor/${doctorId}`);
  }
  assignDataOfCarousel() {
    let { arrDoctors } = this.state;
    let { language } = this.props;
    let slides = [];

    if (arrDoctors && arrDoctors.length > 0) {
      arrDoctors.forEach((item, index) => {
        let imgBase64 = "";
        if (item.image) {
          imgBase64 = Buffer.from(item.image, "base64").toString("binary");
        }

        let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
        let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;

        // Create a new slide object for each iteration
        let slide = {
          img: imgBase64,
          mainTitle: language === LANGUAGES.VI ? nameVi : nameEn,
          doctorId: item.id,
        };

        slides.push(slide);
      });
      this.setState({
        slides: slides,
      });
    }
  }

  render() {
    let language = this.props.language;
    let { slides } = this.state;
    // const imgDivStyle = {
    //   backgroundImage: slide && slide.img ? `url(${slide.img})` : "none",
    // };
    return (
      <>
        <div className="container-fluid outstanding-container">
          <div className="container">
            <div className="outstanding-header">
              <span className="header-title">
                {" "}
                <FormattedMessage id="home-page.out-standings-doctor" />
              </span>
              <span className="home-btn-see-more">
                <FormattedMessage id="home-page.btnSeeMore" />
              </span>
            </div>
            <Slider {...this.props.settings}>
              {slides.map((slide, index) => {
                return (
                  <div className="card-container">
                    <div
                      className="card p-2 py-3 text-center"
                      onClick={() =>
                        this.handleViewDetailDoctor(slide.doctorId)
                      }
                      key={index}
                    >
                      <div
                        className=" mb-2 avt-doctor"
                        style={{
                          backgroundImage: `url(${slide.img})`,
                        }}
                      ></div>
                      <h5 className="mb-0 main-title">{slide.mainTitle}</h5>
                      <small>Neurosurgeon</small>
                      {/* <div className="ratings mt-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div> */}
                      <div className="mt-4 apointment">
                        <button className="btn btn-success text-uppercase">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        {/* <div className="section-common section-outstanding-doctor">
          <div className="section-header">
            <span className="title-section">
             
            </span>
            <button className="btn-section">
              
            </button>
          </div>

          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imgBase64 = "";
                  if (item.image) {
                    imgBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                  return (
                    <div
                      className="section-custiomize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="slider-card">
                        <div
                          className="bg-img section-outstanding-doctor"
                          style={{ backgroundImage: `url(${imgBase64})` }}
                        ></div>
                        <div className="slider-card-detail">
                          <span className="slider-card-title">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </span>
                          <span className="doctor-title">
                            Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành
                            Paris{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
