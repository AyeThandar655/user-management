import React from "react";
import "./footer.css";
import { FaBuilding, FaMapMarked, FaPhone, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className="top-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 footermenu">
            <aside className="contact-info-widget">
              <h3 className="bottom-widget-title">Contact Info</h3>
              <div className="contact-info-content">
                <p className="footer-ci-col-desc">
                  {" "}
                  <span>
                    <FaBuilding style={{ marginRight: "10px" }} />
                    BUFF TECHNOLOGY CO. LTD
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
            </aside>
          </div>
          <div className="col-md-6 footermenu">
            <aside className="openHour-widget">
              <h3 className="bottom-widget-title">Open Hours</h3>
              <div className="openHour-content">
                <p>
                  Mon-Fri : 09:00 - 18:00
                </p>
                <p>
                  Saturday and Sunday is closed
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
