import { React, Fragment, useRef } from 'react';
import './contactus.css';
import { Card, Row, Col } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineWechat } from "react-icons/ai";
import { FaBuilding, FaMapMarked, FaPhone, FaEnvelope } from "react-icons/fa";

function Contact() {

    const middleContact = useRef(null);

    return (
        <Fragment>
            <section className='contact-body-content'>
                <div className="headcontact-main-container">
                    <section className="headcontact-section">
                        <div className="headcontact-container">
                            <div className="headcontact-content">
                                <div className="headcontact-text">
                                    <h1 className="headcontact-h1">Contact Us</h1>
                                    <p className="headcontact-p">
                                        We would love to hear from you.
                                        Feel free to reach out using the below details.
                                    </p>
                                </div>
                                <div className="headcontact-contact-numbers">
                                    <Row className="row-css">
                                        <Col md={4} className="card-col">
                                            <Card>
                                                <Card.Body className="head-card-body">
                                                    <Card.Title className="card-title">
                                                        <div style={{ color: "#2596be", height: "30px" }}>
                                                            <AiOutlineWechat size={35} />
                                                        </div>
                                                    </Card.Title>

                                                    <div className="head-card-p">
                                                        <p className="head-card-p"> Chat with our sales team</p>
                                                    </div>

                                                    <div className="head-button-div">
                                                        <button className="head-button">
                                                            Chat with Sales
                                                        </button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4} className="card-col">
                                            <Card>
                                                <Card.Body className="head-card-body">
                                                    <Card.Title className="card-title">
                                                        <div style={{ color: "#2596be", height: "30px" }}>
                                                            <FaPhoneAlt size={30} />
                                                        </div>
                                                    </Card.Title>
                                                    <div className="head-card-p">
                                                        <p className="head-card-p"> Call us directly</p>
                                                    </div>
                                                    <div className="card-span">
                                                        <span className="card-span" href="#">
                                                            +66 (0)2-801-2778
                                                        </span>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="middlecontact-content" ref={middleContact}>
                    <div className="containerr">
                        <div className="map-and-form">
                            <Row>
                                <Col md={6} className="map-col-css">
                                    <iframe
                                        title="Google Maps"
                                        width="100%"
                                        height="100%"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0157194296917!2d100.45137227516275!3d13.717497698086653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2983da969a4ed%3A0xaaf58a37e5af697f!2s39%2F3%20Phet%20Kasem%20Rd%2C%20Khwaeng%20Bang%20Wa%2C%20Khet%20Phasi%20Charoen%2C%20Krung%20Thep%20Maha%20Nakhon%2010160!5e0!3m2!1sen!2sth!4v1703412707375!5m2!1sen!2sth"
                                    ></iframe>
                                </Col>
                                <Col md={6} className="contactbg">
                                    <div className="head-icon-main">
                                        <div className="head-address-div contactinfo">
                                            <h3 className="bottom-widget-title">Contact Info</h3>
                                            <div className="contact-info-content">
                                                <p className="footer-ci-col-desc">
                                                    {" "}
                                                    <span>
                                                        <FaBuilding style={{ marginRight: "10px" }} />
                                                        <span style={{ fontWeight: "bold" }}>
                                                            BUFF TECHNOLOGY CO. LTD
                                                        </span>
                                                    </span>
                                                    <span>
                                                        <FaMapMarked style={{ marginRight: "10px" }} />
                                                        34 Soi Petchkasem39/3, Petchakasem Road,
                                                        <br /> Bangkae Bangkok 10160
                                                    </span>
                                                    <span>
                                                        <FaPhone style={{ marginRight: "10px" }} />
                                                        +66 (0)2-801-2778
                                                    </span>
                                                    <span>
                                                        <FaEnvelope style={{ marginRight: "10px" }} />
                                                        contact@bufftechthailand.com
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Contact;