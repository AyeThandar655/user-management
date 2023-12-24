import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import "./aboutus.css";

function AboutUs() {
    return (
        <Fragment>
            <h4 className="title"> About Us </h4>
            <Container className="paragraph-container">
                <p className="paragraph">
                    Buff Technology establish since 2019 which group of strong experienced in IT and business. We have been trusted from extensive clients from government, state-enterprise corporate, large manufacturers through SMEs. Our teams accompany our clients to achieve their goal with the most efficiency tools at reasonable budgets.
                    We have a R&D teams to solve our clients problems that make us different from others. We are not only the specialists in select and deliver solutions to our clients, but also be the experts in problems solving for our clients.
                    That why we always a great choice for your IT solution.
                </p>
            </Container>
            <h4 className="title"> Our Service </h4>
            <Container className="paragraph-container">
                <p className="paragraph">
                    Buff technology provides you full scale of IT services from infrastructure and data warehouse to software and solution developments. We have been trusted to deliver our great services from government units to large corporates.
                </p>
            </Container>
        </Fragment>
    );
}

export default AboutUs;
