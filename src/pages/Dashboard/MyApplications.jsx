import React from "react";
import "./Dashboard.css";

const MyApplications = () => {
  const applications = [
    {
      id: 1,
      university: "Imperial College London",
      course: "MSc in Advanced Computing",
      status: "Under Review",
      appliedDate: "Oct 12, 2024",
      logo: "https://ui-avatars.com/api/?name=ICL&background=041021&color=fff",
      step: 3,
    },
    {
      id: 2,
      university: "University of Toronto",
      course: "Bachelor of Computer Science",
      status: "Documents Verified",
      appliedDate: "Sep 28, 2024",
      logo: "https://ui-avatars.com/api/?name=UofT&background=004089&color=fff",
      step: 2,
    },
    {
      id: 3,
      university: "Stanford University",
      course: "MS in Engineering",
      status: "Offer Received",
      appliedDate: "Nov 05, 2024",
      logo: "https://ui-avatars.com/api/?name=Stan&background=8c1515&color=fff",
      step: 4,
    },
  ];

  const steps = [
    "Submitted",
    "Documents Verified",
    "Under Review",
    "Offer Decision",
    "Visa Process",
  ];

  return (
    <div className="my-applications fade-in">
      <div className="section-header">
        <div className="header-badge">
          {applications.length} Active Applications
        </div>
      </div>

      <div className="applications-list">
        {applications.map((app) => (
          <div key={app.id} className="application-card">
            <div className="app-card-header">
              <div className="app-info">
                <img src={app.logo} alt={app.university} className="app-logo" />
                <div>
                  <h3 className="app-uni">{app.university}</h3>
                  <p className="app-course">{app.course}</p>
                </div>
              </div>
              <div className="app-meta">
                <span className="app-date">Applied: {app.appliedDate}</span>
                <button className="btn-view-details">View Details →</button>
              </div>
            </div>

            <div className="app-tracker">
              <div className="tracker-steps">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`tracker-step ${idx + 1 <= app.step ? "completed" : ""} ${idx + 1 === app.step ? "active" : ""}`}
                  >
                    <div className="step-point">
                      {idx + 1 < app.step ? (
                        <iconify-icon icon="ri:check-line"></iconify-icon>
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <div className="step-label">{step}</div>
                  </div>
                ))}
              </div>
              <div className="tracker-line">
                <div
                  className="tracker-progress"
                  style={{
                    width: `${((app.step - 1) / (steps.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="application-help">
        <div className="help-icon">
          <iconify-icon icon="ri:customer-service-2-line"></iconify-icon>
        </div>
        <div className="help-text">
          <h4>Need help with your application?</h4>
          <p>
            Contact your assigned consultant for immediate assistance with
            document uploads or requirements.
          </p>
        </div>
        <button className="btn-contact-consultant">Message Consultant</button>
      </div>
    </div>
  );
};

export default MyApplications;
