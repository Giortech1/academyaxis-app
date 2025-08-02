import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

// Mock admin data
const ADMIN_DATA = {
  id: 1,
  name: "Kamran Shahid",
  email: "Demo@admin.edu.com",
  department: "Department of Computer Science",
  avatar: "/assets/Avatar6.png",
  fullName: "Demo Name",
  fatherName: "Demo Name",
  adminId: "1234567",
  address: "LOT PT2045K WALTON ROAD STREET#4",
  permissions: {
    "Can manage users": true,
    "Can edit content": true,
    "Can view reports": true,
    "Can delete comments": true,
    "Can view student": true
  },
  skills: [
    "User management",
    "Report handling",
    "Data entry",
    "Moderation",
    "Content creating",
    "Student management",
    "Teachers management"
  ],
  bio: "Dedicated admin with 3+ years of experience in managing users, resolving reports, and maintaining content quality. Skilled in moderation, communication, and team coordination. Creative content admin with strong focus on blog publishing, content editing, and SEO optimization. Known for quick turnaround and eye for detail.",
  activityLogs: [
    { date: "2025-12-6", activity: "Edited a user me profile" },
    { date: "2025-12-6", activity: "Log in" },
    { date: "2025-12-6", activity: "Create a blog new post" },
    { date: "2025-12-6", activity: "Stay 2h 32m 41sec" }
  ]
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const AdminProfile = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [permissions, setPermissions] = useState({});

  // Fetch admin data
  const fetchAdminData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using the mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get admin data (in a real app, this would fetch based on adminId)
      const adminInfo = ADMIN_DATA;
      
      setAdminData(adminInfo);
      setPermissions(adminInfo.permissions);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load admin data. Please try again later.");
      setIsLoading(false);
    }
  }, [adminId]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const handleBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  const handleEditProfile = () => {
    // In a real app, this would navigate to an edit profile page or open a modal
    console.log("Edit profile clicked");
  };

  const handleTogglePermission = (permission) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
    // In a real app, you would save this change to the backend
  };

  const handleEditPermissions = () => {
    // In a real app, this would navigate to a permissions edit page or open a modal
    console.log("Edit permissions clicked");
  };

  const handleStatusAction = (action) => {
    // In a real app, this would perform the selected action
    console.log(`Status action clicked: ${action}`);
  };

  if (isLoading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="py-4">
        <div className="alert alert-danger">{error}</div>
        <Button variant="primary" onClick={handleBack}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container fluid className="p-3">
      
      
      <Row>
        {/* Left Column - 8 Columns */}
        <Col md={8}>
        <div className="d-flex align-items-center mb-4">
            <button
              onClick={handleBack}
              className="btn p-0 me-3"
              style={{ background: 'none', border: 'none' }}
            >
              <img
                src="/assets/arrow-left.png"
                alt="Back"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
            <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: 0 }}>Admin Profile</h4>
          </div>
          <Row className="mb-4">
            <Col md={6}>
              <Card className="h-100" style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
                <Card.Body>
                  <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Permissions</h5>
                  
                  {Object.entries(permissions).map(([permission, isEnabled]) => (
                    <div key={permission} className="d-flex justify-content-between align-items-center mb-3">
                      <span style={{ fontSize: '18px', fontWeight:'400', color: '#000' }}>{permission}</span>
                      <Form.Check 
                        type="switch"
                        id={`permission-${permission.replace(/\s/g, '-').toLowerCase()}`}
                        checked={isEnabled}
                        onChange={() => handleTogglePermission(permission)}
                        className="purple-switch"
                      />
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline-primary" 
                    className="w-100 mt-2"
                    onClick={handleEditPermissions}
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #9747FF',
                      color: '#9747FF',
                      background: 'transparent',
                      fontSize: '14px',
                      fontWeight: '400',
                      padding: '8px'
                    }}
                  >
                    Edit Permissions
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="h-100" style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
                <Card.Body>
                  <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Skills</h5>
                  
                  <ul className="ps-0 mb-0" style={{ listStyleType: 'none' }}>
                    {adminData.skills.map((skill, index) => (
                      <li key={index} className="mb-2" style={{ position: 'relative', paddingLeft: '20px' }}>
                        <span 
                          style={{ 
                            position: 'absolute',
                            left: 0,
                            top: '8px',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#8B5CF6'
                          }}
                        ></span>
                        <span style={{ fontSize: '18px',fontWeight:'400', color: '#374151' }}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mb-4" style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
            <Card.Body>
              <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: '#000' }}>Admin Bio</h5>
              <p style={{ fontSize: '12px', color: '#5B5B5B',fontWeight:'400', lineHeight: '1.5' }}>
                {adminData.bio}
              </p>
            </Card.Body>
          </Card>

          <Row>
            <Col md={7}>
              <Card style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
                <Card.Body>
                  <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>Activity Logs</h5>
                  
                  <Table responsive borderless className="mb-0">
                    <thead style={{ borderBottom: '1px solid #EAECF0' }}>
                      <tr>
                        <th style={{ fontSize: '14px', fontWeight: '500', color: '#000', padding: '8px 16px 16px 0' }}>Date</th>
                        <th style={{ fontSize: '14px', fontWeight: '500', color: '#000', padding: '8px 0 16px 0' }}>Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.activityLogs.map((log, index) => (
                        <tr key={index}>
                          <td style={{ fontSize: '14px', color: '#C6C6C6', fontWeight:'500', padding: '16px 16px 16px 0', borderBottom: index < adminData.activityLogs.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                            {formatDate(log.date)}
                          </td>
                          <td style={{ fontSize: '14px', color: '#000',fontWeight:'500', padding: '16px 0', borderBottom: index < adminData.activityLogs.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                            {log.activity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={5}>
              <Card style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
                <Card.Body>
 <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#000', margin: 0 }}>Status edit</h5>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleStatusAction('status-action')}
                      style={{
                        border:"none",
                       color:'#BEBEBE',
                       background:'transparent',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: '4px 12px'
                      }}
                    >
                      Action
                    </Button>
                  </div>                  
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-2">
                    <span style={{ fontSize: '14px', fontWeight:'400', color: '#000' }}>Edit profile</span>
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => handleStatusAction('edit-profile')}
                    >
                      <img
                        src="/assets/view-btn.png"
                        alt="Action"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </Button>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-2">
                    <span style={{ fontSize: '14px', fontWeight:'400', color: '#000' }}>Reset password</span>
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => handleStatusAction('reset-password')}
                    >
                      <img
                        src="/assets/view-btn.png"
                        alt="Action"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </Button>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-2">
                    <span style={{ fontSize: '14px', fontWeight:'400', color: '#000' }}>Log out</span>
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => handleStatusAction('log-out')}
                    >
                      <img
                        src="/assets/view-btn.png"
                        alt="Action"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </Button>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-2">
                    <span style={{ fontSize: '14px', fontWeight:'400', color: '#000' }}>Suspend account</span>
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => handleStatusAction('suspend-account')}
                    >
                      <img
                        src="/assets/view-btn.png"
                        alt="Action"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </Button>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span style={{ fontSize: '14px', fontWeight:'400', color: '#000' }}>Delete admin</span>
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => handleStatusAction('delete-admin')}
                    >
                      <img
                        src="/assets/view-btn.png"
                        alt="Action"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        
        {/* Right Column - 4 Columns */}
        <Col md={4}>
          <Card className="mb-4" style={{ borderRadius: '12px', border: 'none', background:'#FCFCFC' }}>
            <Card.Body className="text-center">
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 16px'
                }}>
                  <img
                    src={adminData.avatar}
                    alt={adminData.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <h5 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>{adminData.name}</h5>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>{adminData.email}</p>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>{adminData.department}</p>
                
                <Button 
                  variant="outline-secondary" 
                  onClick={handleEditProfile}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    backgroundColor: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="mb-4" style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
            <Card.Body>
              <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Information</h5>
              
              <div className="mb-3">
                <p style={{ 
                  fontSize: '12px', 
                  fontWeight: '500', 
                  color: '#6B7280', 
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  FULL NAME
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#111827',
                  marginBottom: '0',
                  padding: '0 0 8px 0',
                  borderBottom: '1px solid #EAECF0'
                }}>
                  {adminData.fullName}
                </p>
              </div>
              
              <div>
                <p style={{ 
                  fontSize: '12px', 
                  fontWeight: '500', 
                  color: '#6B7280', 
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  FATHER NAME
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#111827',
                  marginBottom: '0'
                }}>
                  {adminData.fatherName}
                </p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="mb-4" style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
            <Card.Body>
              <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Information</h5>
              
              <div className="mb-3">
                <p style={{ 
                  fontSize: '12px', 
                  fontWeight: '500', 
                  color: '#6B7280', 
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  DEPARTMENT
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#111827',
                  marginBottom: '0',
                  padding: '0 0 8px 0',
                  borderBottom: '1px solid #EAECF0'
                }}>
                  {adminData.department}
                </p>
              </div>
              
              <div className="mb-3">
                <p style={{ 
                  fontSize: '12px', 
                  fontWeight: '500', 
                  color: '#6B7280', 
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  ADMIN ID
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#111827',
                  marginBottom: '0',
                  padding: '0 0 8px 0',
                  borderBottom: '1px solid #EAECF0'
                }}>
                  {adminData.adminId}
                </p>
              </div>
              
              <div>
                <p style={{ 
                  fontSize: '12px', 
                  fontWeight: '500', 
                  color: '#6B7280', 
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  EMAIL
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#111827',
                  marginBottom: '0'
                }}>
                  {adminData.email}
                </p>
              </div>
            </Card.Body>
          </Card>
          
          <Card style={{ borderRadius: '12px', border: '1px solid #EAECF0' }}>
            <Card.Body>
              <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Location</h5>
              
              <div>
                <p style={{ 
                  fontSize: '12px', 
                  fontWeight: '500', 
                  color: '#6B7280', 
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  ADDRESS
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#111827',
                  marginBottom: '0'
                }}>
                  {adminData.address}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        /* Custom styles for the permission switches */
        .form-check-input:checked {
          background-color: #8B5CF6 !important;
          border-color: #8B5CF6 !important;
        }
        
        /* Remove default padding and margin from Form.Check */
        .purple-switch {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </Container>
  );
};

export default AdminProfile;