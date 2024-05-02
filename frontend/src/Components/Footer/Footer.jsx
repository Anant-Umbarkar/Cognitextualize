// import React from "react";

export default function Footer() {
  return (
    <div
      className="footer-container bg-dark text-light p-4"
      style={{ textAlign: "center" }}
    >
      <div className="footer-content">
        <h1
          className="footer-title fs-4 fw-bold"
          style={{ marginBottom: "10px" }}
        >
          Cognitexualize: Unleashing Feedback Innovation through Question Paper
          Analysis
        </h1>
        <div className="footer-contributors mt-4">
          <div>
            <h2 className="fs-5 fw-bold">Contributors</h2>
            <ul
              className="list-unstyled"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <li>
                <a
                  href="https://github.com/kalashpatil33"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kalash Patil
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/UtkarshM-hub"
                  target="_blank"
                  rel="noreferrer"
                >
                  Utkarsh Mandape
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/virendra2003"
                  target="_blank"
                  rel="noreferrer"
                >
                  Virendra Patil
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mitupatil18"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mitali Patil
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Aaditya123-exe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Aaditya Patil
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vedantv3"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vedant Vedpathak
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p>Under the guidance of <b>Dr. A.J.Umbarkar</b></p>
        <p>Copyright&#169;Cognitextualize 2023-24 All Rights Reserved</p>
      </div>
    </div>
  );
}
