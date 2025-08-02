import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jataNegara from "../assets/login/jata-negara.webp";
import mydigitalid from "../assets/login/mydigitalid.svg";
import "./LoginPage.css";

interface FormData {
  taxIdentificationNumber: string;
  organizationName: string;
  files: {
    ssmCertificate: File | null;
    boardOfDirectors: File | null;
    bankAccountDetails: File | null;
    donationReceiptSample: File | null;
    auditedFinancialReport: File | null;
    lhdnApprovalLetter: File | null;
  };
}

const OrgRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    taxIdentificationNumber: "C1234567890",
    organizationName: "World Wildlife Fund Malaysia",
    files: {
      ssmCertificate: null,
      boardOfDirectors: null,
      bankAccountDetails: null,
      donationReceiptSample: null,
      auditedFinancialReport: null,
      lhdnApprovalLetter: null,
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({
      ...formData,
      files: { ...formData.files, [field]: file },
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData);
    navigate("/org-login");
  };

  return (
    <div className="login-page">
      <div className="login-header">
        {/* <div className="logo-row">
          <img src={jataNegara} alt="Jata Negara" className="jata-img" />
          <span className="logo-divider">|</span>
          <img
            src={mydigitalid}
            alt="MyDigitalID"
            className="mydigitalid-img"
          />
        </div> */}
        <h2>Organization Registration</h2>
      </div>

      <div className="registration-form">
        {/* Text Inputs Section */}
        <div className="form-section">
          <h3>Organization Information</h3>
          
          <div className="input-group">
            <label htmlFor="taxId">Tax Identification Number *</label>
            <input
              type="text"
              id="taxId"
              value={formData.taxIdentificationNumber}
              onChange={(e) => handleInputChange("taxIdentificationNumber", e.target.value)}
              placeholder="Enter your tax identification number"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="orgName">Organization Name *</label>
            <input
              type="text"
              id="orgName"
              value={formData.organizationName}
              onChange={(e) => handleInputChange("organizationName", e.target.value)}
              placeholder="Enter your organization name"
              required
            />
          </div>

        </div>

        {/* File Upload Section */}
        <div className="form-section">
          <h3>Required Documents</h3>
          
          <div className="upload-group">
            <label>SSM/ROS Certificate *</label>
            <p className="upload-description">Proof of registration</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange("ssmCertificate", e.target.files?.[0] || null)}
            />
          </div>

          <div className="upload-group">
            <label>Board of Directors / Committee List *</label>
            <p className="upload-description">For background check</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleFileChange("boardOfDirectors", e.target.files?.[0] || null)}
            />
          </div>

          <div className="upload-group">
            <label>Bank Account Details *</label>
            <p className="upload-description">Ensure donation goes to proper account</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange("bankAccountDetails", e.target.files?.[0] || null)}
            />
          </div>

          <div className="upload-group">
            <label>Donation Receipt Sample *</label>
            <p className="upload-description">For issuing to donors</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleFileChange("donationReceiptSample", e.target.files?.[0] || null)}
            />
          </div>

          <div className="upload-group">
            <label>Audited Financial Report (Latest) *</label>
            <p className="upload-description">Transparency to public</p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange("auditedFinancialReport", e.target.files?.[0] || null)}
            />
          </div>

          <div className="upload-group">
            <label>LHDN Approval Letter</label>
            <p className="upload-description">For tax deduction (if applicable)</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange("lhdnApprovalLetter", e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="submit-btn" onClick={() => navigate("/org-waiting")}>
            Submit Registration
          </button>
          <button className="cancel-btn" onClick={() => navigate("/org-login")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrgRegisterPage;
