import React from 'react';

export const TeacherPortalLoading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingContent}>
        {/* Animated Logo/Icon 
        <div style={styles.logoContainer}>
          <div className="logo-float" style={styles.logo}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" rx="16" fill="#101828" />
              <path d="M25 35H55V45H25V35Z" fill="white" />
              <path d="M28 40H52M28 42H48M28 38H52" stroke="#101828" strokeWidth="2" strokeLinecap="round" />
              <circle cx="40" cy="25" r="4" fill="white" />
              <path d="M32 30C32 26.6863 35.3431 24 39.5 24H40.5C44.6569 24 48 26.6863 48 30" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>*/}
        <div style={styles.logoContainer}>
          <div className="logo-float" style={styles.logo}>
            <img
              src="/assets/logo.jpeg"
              alt="Logo"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "16px",
                objectFit: "cover"
              }}
            />
          </div>
        </div>


        {/* Multiple Animated Rings */}
        <div style={styles.ringContainer}>
          <div className="ring-spin-1" style={styles.ring1}></div>
          <div className="ring-spin-2" style={styles.ring2}></div>
          <div className="ring-pulse" style={styles.ring3}></div>
        </div>

        {/* Floating Particles */}
        <div style={styles.particleContainer}>
          <div className="particle-float-1" style={styles.particle1}></div>
          <div className="particle-float-2" style={styles.particle2}></div>
          <div className="particle-float-3" style={styles.particle3}></div>
          <div className="particle-float-4" style={styles.particle4}></div>
          <div className="particle-float-5" style={styles.particle5}></div>
          <div className="particle-float-6" style={styles.particle6}></div>
        </div>

        {/* Pulsing Dots */}
        <div style={styles.dotContainer}>
          <div className="dot-bounce-1" style={styles.dot1}></div>
          <div className="dot-bounce-2" style={styles.dot2}></div>
          <div className="dot-bounce-3" style={styles.dot3}></div>
          <div className="dot-bounce-4" style={styles.dot4}></div>
          <div className="dot-bounce-5" style={styles.dot5}></div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes logoFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% { 
            transform: translateY(-15px) rotate(2deg) scale(1.05);
          }
          50% { 
            transform: translateY(-10px) rotate(0deg) scale(1.1);
          }
          75% { 
            transform: translateY(-5px) rotate(-2deg) scale(1.05);
          }
        }

        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes ringPulse {
          0%, 100% { 
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-15px) translateX(-5px);
            opacity: 1;
          }
          75% { 
            transform: translateY(-25px) translateX(8px);
            opacity: 0.5;
          }
        }

        @keyframes dotBounce {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
          }
        }

        @keyframes backgroundPulse {
          0%, 100% { 
            background: #FFFFFF;
          }
          50% { 
            background: #FEFEFE;
          }
        }

        .logo-float {
          animation: logoFloat 3s ease-in-out infinite;
        }

        .ring-spin-1 {
          animation: ringSpin 2s linear infinite;
        }

        .ring-spin-2 {
          animation: ringSpin 3s linear infinite reverse;
        }

        .ring-pulse {
          animation: ringPulse 2s ease-in-out infinite;
        }

        .particle-float-1 {
          animation: particleFloat 4s ease-in-out infinite;
        }

        .particle-float-2 {
          animation: particleFloat 3s ease-in-out infinite 0.5s;
        }

        .particle-float-3 {
          animation: particleFloat 5s ease-in-out infinite 1s;
        }

        .particle-float-4 {
          animation: particleFloat 3.5s ease-in-out infinite 1.5s;
        }

        .particle-float-5 {
          animation: particleFloat 4.5s ease-in-out infinite 2s;
        }

        .particle-float-6 {
          animation: particleFloat 2.5s ease-in-out infinite 2.5s;
        }

        .dot-bounce-1 {
          animation: dotBounce 1.5s ease-in-out infinite;
        }

        .dot-bounce-2 {
          animation: dotBounce 1.5s ease-in-out infinite 0.2s;
        }

        .dot-bounce-3 {
          animation: dotBounce 1.5s ease-in-out infinite 0.4s;
        }

        .dot-bounce-4 {
          animation: dotBounce 1.5s ease-in-out infinite 0.6s;
        }

        .dot-bounce-5 {
          animation: dotBounce 1.5s ease-in-out infinite 0.8s;
        }

        .background-pulse {
          animation: backgroundPulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const styles = {
  loadingContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FFFFFF',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '300px',
    height: '300px'
  },
  logoContainer: {
    marginBottom: '40px',
    zIndex: 10
  },
  logo: {
    display: 'inline-block',
    padding: '20px',
    borderRadius: '24px',
    background: 'rgba(16, 24, 40, 0.05)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 50px -12px rgba(16, 24, 40, 0.15)',
    border: '1px solid rgba(16, 24, 40, 0.1)'
  },
  ringContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 5
  },
  ring1: {
    position: 'absolute',
    top: '-80px',
    left: '-80px',
    width: '160px',
    height: '160px',
    border: '3px solid rgba(16, 24, 40, 0.1)',
    borderTop: '3px solid #101828',
    borderRadius: '50%'
  },
  ring2: {
    position: 'absolute',
    top: '-100px',
    left: '-100px',
    width: '200px',
    height: '200px',
    border: '2px solid rgba(16, 24, 40, 0.08)',
    borderTop: '2px solid #374151',
    borderRadius: '50%'
  },
  ring3: {
    position: 'absolute',
    top: '-120px',
    left: '-120px',
    width: '240px',
    height: '240px',
    border: '1px solid rgba(16, 24, 40, 0.05)',
    borderRadius: '50%'
  },
  particleContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3
  },
  particle1: {
    position: 'absolute',
    top: '-60px',
    left: '-80px',
    width: '8px',
    height: '8px',
    background: '#101828',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(16, 24, 40, 0.6)'
  },
  particle2: {
    position: 'absolute',
    top: '-40px',
    left: '70px',
    width: '6px',
    height: '6px',
    background: '#374151',
    borderRadius: '50%',
    boxShadow: '0 0 15px rgba(55, 65, 81, 0.6)'
  },
  particle3: {
    position: 'absolute',
    top: '50px',
    left: '-90px',
    width: '10px',
    height: '10px',
    background: '#4B5563',
    borderRadius: '50%',
    boxShadow: '0 0 25px rgba(75, 85, 99, 0.6)'
  },
  particle4: {
    position: 'absolute',
    top: '60px',
    left: '80px',
    width: '7px',
    height: '7px',
    background: '#101828',
    borderRadius: '50%',
    boxShadow: '0 0 18px rgba(16, 24, 40, 0.6)'
  },
  particle5: {
    position: 'absolute',
    top: '-80px',
    left: '20px',
    width: '5px',
    height: '5px',
    background: '#6B7280',
    borderRadius: '50%',
    boxShadow: '0 0 12px rgba(107, 114, 128, 0.6)'
  },
  particle6: {
    position: 'absolute',
    top: '20px',
    left: '0px',
    width: '9px',
    height: '9px',
    background: '#374151',
    borderRadius: '50%',
    boxShadow: '0 0 22px rgba(55, 65, 81, 0.6)'
  },
  dotContainer: {
    position: 'absolute',
    bottom: '20px',
    display: 'flex',
    gap: '12px',
    zIndex: 10
  },
  dot1: {
    width: '12px',
    height: '12px',
    backgroundColor: '#101828',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(16, 24, 40, 0.6)'
  },
  dot2: {
    width: '12px',
    height: '12px',
    backgroundColor: '#374151',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(55, 65, 81, 0.6)'
  },
  dot3: {
    width: '12px',
    height: '12px',
    backgroundColor: '#4B5563',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(75, 85, 99, 0.6)'
  },
  dot4: {
    width: '12px',
    height: '12px',
    backgroundColor: '#6B7280',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(107, 114, 128, 0.6)'
  },
  dot5: {
    width: '12px',
    height: '12px',
    backgroundColor: '#9CA3AF',
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(156, 163, 175, 0.6)'
  }
};