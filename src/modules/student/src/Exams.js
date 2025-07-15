import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



function Exams() {
    const navigate = useNavigate();


    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week for 1st
        const totalDays = new Date(year, month + 1, 0).getDate(); // Total days in month

        // Create grid for days
        const daysGrid = [];
        for (let i = 0; i < firstDay; i++) daysGrid.push(null); // Empty slots before 1st day
        for (let i = 1; i <= totalDays; i++) daysGrid.push(i);
        return daysGrid;
    };

    const daysGrid = getDaysInMonth(currentDate);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Change Month
    const changeMonth = (increment) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentDate(newDate);
    };




    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
    const targetDate = new Date("2024-12-22T00:00:00");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft({ days, hours, minutes });
            } else {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);


    const syllabusData = [
        { image: "/assets/M.png", title: "Maths", description: "Syllabus" },
        { image: "/assets/P.png", title: "Physics", description: "Syllabus" },
        { image: "/assets/G.png", title: "History & Geo", description: "Syllabus" },
        { image: "/assets/E.png", title: "English", description: "Syllabus" },
        { image: "/assets/S.png", title: "Stats", description: "Syllabus" },
    ];



    // Array of card data with background colors
    const cardsData = [
        {
            title: "Physics",
            time: "2 hours",
            schedule: "8:00 AM to 2:00 PM",
            bgColor: "#EAF7F1", // Light green
            borderColor: "#039855", // Dark green
        },
        {
            title: "Chemistry",
            time: "3 hours",
            schedule: "9:00 AM to 3:00 PM",
            bgColor: "#F9F5FF", // Light purple
            borderColor: "#D6BBFB", // Dark purple
        },
        {
            title: "Mathematics",
            time: "1.5 hours",
            schedule: "10:00 AM to 12:30 PM",
            bgColor: "#FEF9C3", // Light yellow
            borderColor: "#FBBF24", // Dark yellow
        },




    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>



            {/* Main content */}
            <main className="p-3" style={{ flexGrow: 1, width: '100%' }}>

                {/* Header Section */}
                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // marginBottom: '20px',
                        // padding: '16px',
                        paddingtop: '0px',
                        width: '100%',

                    }}
                >
                    {/* Left side: Arrow and Heading */}
                    <div id="examsheading" style={{ display: 'flex', alignItems: 'center' }}>

                        <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>Exams</h1>
                    </div>



                    {/* Right side: User Info and Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
                            id="info-img"
                            src="/assets/avatar.jpeg" // Replace with your image path
                            alt="User"
                            style={{
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                marginRight: '10px',

                            }}
                        />
                        <div style={{ marginRight: '10px' }}>
                            <div style={{ fontWeight: '500', fontSize: '14' }}>Jhon Deo</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>123456</div>
                        </div>

                    </div>
                </header>

                <section1 style={{ display: 'flex', width: '100%', overflow: 'hidden', justifyContent: 'center', gap: '20px', marginTop: '20px', marginBottom: '20px' }} id="exams-section1">
                    <section
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #EAECF0',
                            borderRadius: '12px',
                            padding: '12px',

                            width: '100%',
                            backgroundColor: '#FAFAFA',
                        }}
                    >
                        {/* First Card */}
                        <div
                            style={{
                                borderBottom: '1px solid #EAECF0',
                                padding: '15px 0px',
                            }}
                        >
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#111827',
                                }}
                            >
                                December Exams
                            </h2>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: '14px',
                                    color: '#4B5563',
                                    fontWeight: '400',
                                }}
                            >
                                From Thu 9, 2024 to Saturday 22, 2024
                            </p>
                        </div>

                        {/* Remaining Cards */}
                        {[...Array(4)].map((_, index) => (
                            <div id="remaining-cards"
                                key={index}
                                style={{
                                    borderBottom: index === 3 ? 'none' : '1px solid #D1D5DB', // Dynamically setting the borderBottom for the last card
                                    display: 'flex',

                                    // justifyContent:'space-between',
                                }}
                            >
                                <div id="examcardheading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '30%' }}>
                                    <h2
                                        style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#111827',

                                        }}
                                    >
                                        Monday
                                    </h2>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: '12px',
                                            color: '#4B5563',
                                            fontWeight: '400',
                                        }}
                                    >
                                        December 18, 2024
                                    </p>
                                </div>

                                {/* Two Small Cards inside each remaining card */}
                                <div id="small-cards"
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        padding: "15px 0",
                                        justifyContent: "flex-end",
                                        width: "100%",
                                    }}
                                >
                                    {/* Map through the card data */}
                                    {cardsData.map((card, index) => (
                                        <div id="smallcarddata"
                                            key={index}
                                            style={{
                                                border: `1px solid ${card.borderColor}`,
                                                borderRadius: "16px",
                                                width: "40%",
                                                alignItems: "center",
                                                padding: "7px",
                                                backgroundColor: card.bgColor, // Dynamic background color
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                    fontSize: "11px",
                                                    fontWeight: "600",
                                                    color: "#475467",
                                                    marginRight: "8px",
                                                }}
                                            >
                                                <img
                                                    src="/assets/clock.png"
                                                    alt="small card"
                                                    style={{
                                                        width: "14px",
                                                        height: "14px",
                                                        borderRadius: "4px",
                                                        marginRight: "5px",
                                                    }}
                                                />
                                                {card.time}
                                            </div>
                                            <div style={{ padding: "10px" }}>
                                                <h3
                                                    style={{
                                                        margin: "5px 0",
                                                        fontSize: "14px",
                                                        fontWeight: "600",
                                                        color: "#111827",
                                                    }}
                                                >
                                                    {card.title}
                                                </h3>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "12px",
                                                        color: "#4B5563",
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    {card.schedule}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>




                    <div id="exam-calendar" style={{ display: 'flex', flexDirection: 'column', }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>


                            {/* Calendar Section */}
                            <div id="calendar"
                                style={{
                                    border: "1px solid #EAECF0",
                                    borderRadius: "15px",

                                    padding: "12px",

                                    width: '320px',

                                }}
                            >
                                {/* Calendar Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", fontStyle: 'normal' }}>
                                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                    </h3>

                                    {/* Right: Navigation Buttons */}
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button
                                            onClick={() => changeMonth(-1)}
                                            style={{
                                                border: "none",
                                                backgroundColor: "transparent",
                                                cursor: "pointer",
                                                padding: 0,
                                            }}
                                        >
                                            <img
                                                src="/assets/Navigation.png"
                                                alt="Previous Month"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                        </button>
                                        <button
                                            onClick={() => changeMonth(1)}
                                            style={{
                                                border: "none",
                                                backgroundColor: "transparent",
                                                cursor: "pointer",
                                                padding: 0,
                                            }}
                                        >
                                            <img
                                                src="/assets/navigation2.png"
                                                alt="Next Month"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                        </button>

                                    </div>
                                </div>

                                {/* Week Days */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(7, 1fr)",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        fontSize: '15px',
                                        color: "#000",
                                        alignItems: 'center',
                                        borderBottom: '0.5px solid #E5E5E5',
                                        height: '55px',
                                    }}
                                >
                                    {weekDays.map((day) => (
                                        <div key={day}>{day}</div>
                                    ))}
                                </div>

                                {/* Days Grid */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(7, 1fr)",
                                        textAlign: "center",
                                        marginTop: "10px",
                                        fontWeight: '400',
                                        fontSize: '16px',
                                    }}
                                >
                                    {daysGrid.map((day, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: "10px",
                                                borderRadius: "50%",
                                                backgroundColor: day === new Date().getDate() ? "#101828" : "transparent",
                                                color: day === new Date().getDate() ? "white" : "#333",
                                                fontWeight: day === new Date().getDate() ? "bold" : "normal",
                                            }}
                                        >
                                            {day || ""}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Time Left Section */}
                        <div id="time-left"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "20px 0",
                                padding: "33px",
                                border: "1px solid #EAECF0",
                                borderRadius: "12px",
                                position: "relative",
                                color: "#111827",
                                backgroundColor: "#FAFAFA",
                                paddingTop: '53px',
                            }}
                        >
                            {/* Time Left Heading */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    left: "15px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    color: "#101828",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Time Left
                            </div>

                            {/* Timer Display with Borders for Each Digit */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "5px",
                                }}
                            >
                                {/* Function to Split Digits and Add Borders */}
                                {String(timeLeft.days)
                                    .padStart(2, "0")
                                    .split("")
                                    .map((digit, index) => (
                                        <div
                                            key={`day-${index}`}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "30px",
                                                height: "44px",
                                                border: "1px solid #EAECF0",
                                                borderRadius: "4px",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                                // backgroundColor: "#FFFFFF",
                                                color: "#101828",
                                            }}
                                        >
                                            {digit}
                                        </div>
                                    ))}
                                <span style={{ fontSize: "20px", fontWeight: "600", margin: "0 5px" }}>:</span>

                                {String(timeLeft.hours)
                                    .padStart(2, "0")
                                    .split("")
                                    .map((digit, index) => (
                                        <div
                                            key={`hour-${index}`}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "30px",
                                                height: "44px",
                                                border: "1px solid #EAECF0",
                                                borderRadius: "4px",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                                // backgroundColor: "#FFFFFF",
                                                color: "#101828",
                                            }}
                                        >
                                            {digit}
                                        </div>
                                    ))}
                                <span style={{ fontSize: "20px", fontWeight: "600", margin: "0 5px" }}>:</span>

                                {String(timeLeft.minutes)
                                    .padStart(2, "0")
                                    .split("")
                                    .map((digit, index) => (
                                        <div
                                            key={`minute-${index}`}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "30px",
                                                height: "44px",
                                                border: "1px solid #EAECF0",
                                                borderRadius: "4px",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                                // backgroundColor: "#FFFFFF",
                                                color: "#101828",
                                            }}
                                        >
                                            {digit}
                                        </div>
                                    ))}
                            </div>

                            {/* Labels for D:H:M */}
                            <div id="labels"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    marginTop: "8px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#555",
                                    width: "100%",
                                    textTransform: "uppercase",
                                }}
                            >
                                <span>Days</span>
                                <span>Hours</span>
                                <span>Min</span>
                            </div>
                        </div>

                    </div>
                </section1>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        // alignItems: "center",
                        // justifyContent: "space-between",
                        // padding: "20px",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "12px",

                        border: '1px solid #EAECF0',

                    }}
                >
                    {/* Heading Section */}
                    <div
                        style={{
                            flex: "0 0 20%",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#101828",
                            padding: '15px'
                        }}
                    >
                        Subject Syllabus
                    </div>

                    {/* Cards Section */}
                    <div
                        id="syllabus-cards"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            gap: "0px",
                            width: "100%",
                            paddingBottom: "20px",
                        }}
                    >
                        {syllabusData.map((item, index) => (
                            <div
                                id="syllabus-data"
                                key={index}
                                onClick={() => navigate("/exam-syllabus")}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    backgroundColor: "#FFFFFF",
                                    border: "1px solid #EAECF0",
                                    borderRadius: "12px",
                                    padding: "15px",
                                    width: "15%",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    transition: "transform 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            >
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "1px solid #EAECF0",
                                        borderRadius: "50px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: "#E7EFFE",
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: "19px", height: "20px" }}
                                    />
                                </div>
                                <h3
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#111827",
                                        margin: "10px 0 0px",
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "12px",
                                        color: "#4B5563",
                                        fontWeight: "400",
                                    }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}

const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '10px 2px',
    margin: '10px 0',
    textAlign: 'left',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '5px',
};

const iconStyle = {
    marginRight: '10px',
    width: '24px',
    height: '24px',
};

export default Exams;
