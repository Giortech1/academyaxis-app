import React, { useState } from 'react';
import { Form, Button, InputGroup, Dropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const Settings = () => {
    const navigate = useNavigate(); // Initialize navigate

    const [name, setName] = useState({ firstName: '', lastName: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setName((prev) => ({ ...prev, [name]: value }));
    };

    const [website, setWebsite] = useState('');

    const handleWebsiteChange = (e) => {
        setWebsite(e.target.value);
    };

    const [photo, setPhoto] = useState('/assets/avatar3.png');

    const handleDelete = () => {
        setPhoto(''); // Clears the photo, simulating a delete action
    };

    const handleUpdate = () => {
        const newPhoto = prompt("Enter the URL of the new photo:"); // Simulate updating the photo
        if (newPhoto) setPhoto(newPhoto);
    };

    const [bio, setBio] = useState('');
    const maxChars = 275;

    const handleBioChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxChars) {
            setBio(value);
        }
    };

    const [selectedCountry, setSelectedCountry] = useState('Australia');

    const countries = [
        { name: 'Australia', flag: '/assets/AU.png' },
        { name: 'USA', flag: '/assets/Avatar5.png' },
        { name: 'UK', flag: '/assets/Avatar6.png' },
    ];

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const selectedFlag = countries.find(country => country.name === selectedCountry)?.flag;


    const [countryData, setCountryData] = useState({
        label: 'Australia',
        dialCode: '+61',
        flagUrl: '/assets/AU.png',
    });

    const countryOptions = [
        { label: 'Australia', dialCode: '+61', flagUrl: '/assets/AU.png' },
        { label: 'USA', dialCode: '+1', flagUrl: '/assets/Avatar5.png' },
        { label: 'UK', dialCode: '+44', flagUrl: '/assets/Avatar6.png' },
    ];

    const handleCountrySelection = (e) => {
        const selectedOption = countryOptions.find(option => option.dialCode === e.target.value);
        if (selectedOption) setCountryData(selectedOption);
    };

    const [isBlackTheme, setIsBlackTheme] = useState(false);

    const handleThemeToggle = () => {
        setIsBlackTheme(!isBlackTheme);
        // Add additional functionality as needed, e.g., updating theme globally
    };

    const [selectedLanguage, setSelectedLanguage] = useState({
        label: 'English UK',
        flagUrl: '/assets/AU.png',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const languages = [
        { label: 'English UK', flagUrl: '/assets/AU.png' },
        { label: 'English US', flagUrl: '/assets/Avatar5.png' },
        { label: 'French', flagUrl: '/assets/Avatar6.png' },
    ];

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (

        <div className='p-3' style={{  margin: "0 auto" }}>
            {/* Second Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                {/* Left: Month and Year */}
                <div id='settings-heading' style={{ display: 'flex' }}>
                    <h2 style={{ fontSize: '30px', fontWeight: '600' }}>Settings</h2>


                </div>

                {/* Right: Search Bar with Sort Button */}
                <div className="d-flex align-items-center">
                    <div className="position-relative me-3" style={{ flexGrow: 1 }}>
                        <Form.Control
                            id='search-container1'
                            type="text"
                            placeholder="Search"
                            style={{ borderRadius: "8px", paddingLeft: "40px", fontSize: '16px', fontWeight: '400', color: '#98A2B3', borderColor: '#D1D5DB', width: '300px' }}
                        />
                        <Image
                            src="/assets/search-lg1.png"
                            alt="Search Icon"
                            width={20}
                            height={20}
                            style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)" }}
                        />
                    </div>


                </div>
            </header>

            {/* Tabs */}
            <ul className="nav mb-4">
                <li className="nav-item">
                    <a className="nav-link active" style={{ color: '#667085' }} href="#general">
                        General
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" style={{ color: '#667085' }} href="#password">
                        Password
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" style={{ color: '#667085' }} href="#notifications">
                        Notifications <span className="badge " style={{ background: '#F2F4F7', color: '#344054', fontSize: '12px', fontWeight: '500' }}>2</span>
                    </a>
                </li>
            </ul>

            {/* Profile Section */}
            <Form>
                <h5 className="mb-0" style={{ fontSize: '18px', fontWeight: '600' }}>Profile</h5>
                <p className="text-muted mb-4" style={{ fontSize: '14px', fontWeight: '400', color: '#475467' }} >Manage your details and personal preferences here.</p>
                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>

                <div className="mb-4 col-7" id='name' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Form.Label style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}>Name</Form.Label>
                    <div id='nameinput' className="d-flex" style={{ width: '50%' }}>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={name.firstName}
                            onChange={handleChange}
                            className="me-2"
                            style={{
                                outline: 'none',
                                boxShadow: 'none',
                                borderColor: 'transparent',
                                border: '1px solid #D1D5DB', // Keep the default border if needed
                            }}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={name.lastName}
                            onChange={handleChange}
                            style={{
                                outline: 'none',
                                boxShadow: 'none',
                                borderColor: 'transparent',
                                border: '1px solid #D1D5DB', // Keep the default border if needed
                            }}
                        />
                    </div>
                </div>


                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>

                <div className="mb-4 col-7" id='name' style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
                    <Form.Label style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}>Website</Form.Label>
                    <InputGroup id='nameinput' style={{ width: '50%' }}>
                        <InputGroup.Text>http://</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="www.untitledui.com"
                            value={website}
                            onChange={handleWebsiteChange}
                            style={{
                                outline: 'none',
                                boxShadow: 'none',
                                borderColor: 'transparent',
                                border: '1px solid #D1D5DB', // Optional: Keeps a consistent border when not focused
                            }}
                        />
                    </InputGroup>
                </div>


                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>

                {/* Photo Section */}
                {/* Photo Section */}
                <div id='labeldesc' className="d-flex align-items-center justify-content-between mb-4 col-7" style={{ marginTop: '20px' }}>
                    {/* Left Side: Label and Description */}
                    <div id='yourphoto'>
                        <Form.Label className="d-block mb-0" style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}>
                            Your Photo
                        </Form.Label>
                        <Form.Text className="text-muted" style={{ fontSize: '14px', fontWeight: '400', color: '#475467' }}>
                            This will be displayed on your profile.
                        </Form.Text>
                    </div>

                    {/* Center: Profile Picture */}
                    {photo ? (
                        <Image
                            src={photo}
                            roundedCircle
                            style={{ width: '64px', height: '64px' }}
                        />
                    ) : (
                        <div style={{ width: '64px', height: '64px', backgroundColor: '#f0f0f0', borderRadius: '50%' }} />
                    )}

                    {/* Right Side: Action Buttons */}
                    <div className="d-flex gap-3">
                        <Button
                            variant="link"
                            className="text p-0"
                            onClick={handleDelete}
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#475467',
                                textDecoration: 'none',
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="link"
                            className="text p-0"
                            onClick={handleUpdate}
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#475467',
                                textDecoration: 'none',
                            }}
                        >
                            Update
                        </Button>
                    </div>
                </div>

                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>

                <div id='your-bio' className="mb-4 col-7" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    {/* Label and Placeholder Text */}
                    <div>
                        <Form.Label
                            className="d-block mb-0"
                            style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}
                        >
                            Your Bio
                        </Form.Label>
                        <Form.Text
                            className="text-muted d-block mb-2"
                            style={{ fontSize: '14px', fontWeight: '400', color: '#475467' }}
                        >
                            Write a short introduction.
                        </Form.Text>
                    </div>

                    {/* Text Area */}
                    <div id='textarea' style={{ width: '50%' }}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Write a short introduction."
                            value={bio}
                            onChange={handleBioChange}
                            className="mb-2"
                            style={{
                                outline: 'none',
                                boxShadow: 'none',
                                borderColor: 'transparent',
                                border: '1px solid #D1D5DB', // Keeps a consistent border when not focused
                                borderRadius: '8px', // Adds rounded corners for a clean UI
                                padding: '8px 12px', // Adds padding inside the textarea
                                fontSize: '14px', // Ensures text size consistency
                                fontWeight: '400', // Matches the rest of the form
                                color: '#344054', // Text color
                            }}
                        />

                        {/* Character Limit */}
                        <Form.Text
                            className="text-muted"
                            style={{ fontSize: '14px', fontWeight: '400', color: '#475467' }}
                        >
                            {maxChars - bio.length} characters left
                        </Form.Text>
                    </div>

                </div>

                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>

                {/* Country and Phone Number Section */}
                <div className="mb-4">
                    {/* Country Selection */}
                    <div className="mb-3" style={{ marginTop: '20px' }}>
                        <Form.Label style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}>
                            Country
                        </Form.Label>
                        <div
                            className="d-flex align-items-center"
                            style={{
                                border: '1px solid #D0D5DD',
                                borderRadius: '8px',
                                outline: 'none', // Ensures no border appears on focus
                            }}
                        >
                            <Image
                                src={selectedFlag}
                                style={{ width: '20px', marginRight: '10px', marginLeft: '10px' }}
                            />
                            <Form.Select
                                className="w-100"
                                style={{
                                    border: 'none', // Removes the border from the select element
                                    outline: 'none', // Ensures no border appears on focus
                                    boxShadow: 'none', // Removes any shadow that might appear on focus
                                }}
                                value={selectedCountry}
                                onChange={handleCountryChange}
                            >
                                {countries.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </div>



                    <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>


                    {/* Phone Number Input */}
                    <div style={{ marginTop: '20px' }}>
                        <Form.Label style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}>
                            Phone Number
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text
                                style={{
                                    marginRight: '12px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #D0D5DD', // Matches the border of the container
                                    background: 'white', // Keeps the background clean
                                    padding: '6px 10px', // Adds spacing inside
                                }}
                            >
                                <Image
                                    src={countryData.flagUrl}
                                    style={{ width: '20px', marginRight: '5px' }}
                                />
                                <Form.Select
                                    value={countryData.dialCode}
                                    onChange={handleCountrySelection}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'transparent',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#344054',
                                        paddingLeft: '5px', // Adds slight spacing inside
                                    }}
                                >
                                    {countryOptions.map(option => (
                                        <option key={option.dialCode} value={option.dialCode}>
                                            {option.dialCode}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup.Text>
                            <Form.Control
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    color: '#667085',
                                    border: '1px solid #D0D5DD', // Matches other input borders
                                    outline: 'none',
                                    boxShadow: 'none',
                                    padding: '10px 12px', // Improves spacing inside the field
                                }}
                                type="text"
                                placeholder="Enter Your Number..."
                            />
                        </InputGroup>
                    </div>

                </div>

                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>



                {/* Alternative Contact Email */}
                <div id='contact-email' className="mb-4 col-7" style={{ marginTop: '20px' }}>
                    <Form.Label className="d-block mb-1" style={{ fontWeight: "500", fontSize: '14px' }}>Alternative contact email</Form.Label>
                    <div id='form-text' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Form.Text className="text-muted d-block mb-2" style={{ fontSize: "14px" }}>
                            Enter an alternative email if you'd like to be contacted via a different email.
                        </Form.Text>
                        <InputGroup id='input-group' style={{ border: "1px solid #D1D5DB", borderRadius: "8px", padding: "0px 12px", height: '40px', width: '50%' }}>
                            <InputGroup.Text style={{ background: "none", border: "none", padding: "0" }}>
                                <i className="bi bi-envelope" style={{ fontSize: "18px", color: "#6B7280" }}></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                placeholder="you@example.com"
                                style={{
                                    border: "none",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                    color: "#374151",
                                    fontWeight: '400'
                                }}
                            />
                        </InputGroup>
                    </div>
                </div>

                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>
                {/* Save and Cancel Buttons */}
                <div className="d-flex justify-content-end mt-4">
                    <Button
                        variant="outline-secondary"
                        className="me-3"
                        style={{
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "14px",
                            padding: "8px 16px",
                            color: '#344054',
                            borderColor: '#D0D5DD'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        style={{
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "14px",
                            padding: "8px 16px",
                            background: '#4B5563',
                            border: 'none',
                        }}
                    >
                        Save
                    </Button>
                </div>


                {/* Preferences Section */}
                <h5 className="mb-4" style={{ fontWeight: "600", marginTop: '20px', fontSize: '18px', color: '#101828' }}>Preferences</h5>
                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>

                <div className="mb-4 ">
                    {/* Black Theme */}
                    <div id='black-theme'
                        className="d-flex justify-content-between align-items-center mb-4 col-6"
                        style={{ paddingBottom: "12px", marginTop: "20px" }}
                    >
                        <div>
                            <Form.Label
                                style={{ fontWeight: "500", fontSize: "14px", color: "#344054" }}
                            >
                                {isBlackTheme ? "Black Theme Enabled" : "Black Theme"}
                            </Form.Label>
                        </div>
                        <Form.Check
                            style={{
                                width: "42px",
                                height: "24px",
                                outline: "none", // Removes the focus outline
                                boxShadow: "none", // Removes the shadow on focus
                                border: "none", // Ensures no border appears on click or focus
                                cursor: "pointer", // Ensures the toggle looks clickable
                            }}
                            type="switch"
                            checked={isBlackTheme}
                            onChange={handleThemeToggle}
                        />
                    </div>

                    <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>


                    {/* Language */}
                    <div id='language'
                        className="d-flex justify-content-between align-items-center mb-4 col-6"
                        style={{ paddingBottom: '12px', marginTop: '20px', position: 'relative' }}
                    >
                        <div>
                            <label
                                style={{ fontWeight: '500', fontSize: '14px', color: '#344054' }}
                            >
                                Language
                            </label>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                border: '1px solid #D1D5DB',
                                fontWeight: '500',
                                fontSize: '14px',
                                color: '#374151',
                                width: '200px',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={selectedLanguage.flagUrl}
                                    alt="Flag"
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '8px',
                                        borderRadius: '50%',
                                    }}
                                />
                                {selectedLanguage.label}
                            </div>
                          
                        </div>
                        {isDropdownOpen && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    backgroundColor: '#fff',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    marginTop: '4px',
                                    width: '200px',
                                    zIndex: 10,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {languages.map((language) => (
                                    <div
                                        key={language.label}
                                        onClick={() => handleLanguageSelect(language)}
                                        style={{
                                            padding: '8px 12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                        }}
                                    >
                                        <img
                                            src={language.flagUrl}
                                            alt="Flag"
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        {language.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>


                    {/* Date Format */}
                    <div id='date-format'
                        className="d-flex justify-content-between align-items-center col-6"
                        style={{ paddingBottom: "12px", marginTop: '20px' }}
                    >
                        <div>
                            <Form.Label style={{ fontWeight: "500", fontSize: "14px", color: '#344054' }}>Date Format</Form.Label>
                        </div>
                        <Dropdown>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderRadius: "8px",
                                    padding: "6px 12px",
                                    border: "1px solid #D1D5DB",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    color: "#374151",
                                    width: "200px",
                                    cursor: "pointer", // Ensures it looks clickable
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    DD/MM/YYYY
                                </div>
                                <img
                                    src="/assets/arrow-down2.png"
                                    alt="Arrow Down"
                                    style={{ width: "16px", height: "16px", marginLeft: "8px" }}
                                />
                            </div>

                            <Dropdown.Menu>
                                <Dropdown.Item>01/01/2024</Dropdown.Item>
                                <Dropdown.Item>02/02/2024</Dropdown.Item>
                                <Dropdown.Item>03/03/2024</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>
                <div style={{ borderBottom: '1px solid #EAECF0 ' }}></div>




            </Form>
        </div>
    );
};

export default Settings;
