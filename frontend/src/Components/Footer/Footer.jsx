import React from 'react';

export default function Footer() {
  return (
    <div
      className="footer-container bg-dark text-light p-4"
      style={{ textAlign: 'center' }}
    >
      <div className="footer-content">
        <h1
          className="footer-title fs-4 fw-bold"
          style={{ marginBottom: '10px' }}
        >
          Analyze Accurate. Improve Quality. with Cognitextualize
        </h1>
        <div className="footer-contributors mt-4">
          <h2 className="fs-5 fw-bold">Contributors</h2>
          <ul className="list-unstyled">
            <li>Kalash</li>
            <li>Utkarsh</li>
            <li>Virendra</li>
            <li>Mitali</li>
            <li>Aaditya</li>
            <li>Vedant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
