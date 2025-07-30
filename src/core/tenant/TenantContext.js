import React, { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [currentSchool, setCurrentSchool] = useState(null);
  const [userSchools, setUserSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user's school associations
    loadUserSchools();
  }, []);

  const loadUserSchools = async () => {
    try {
      // Fetch schools user has access to
      const schools = await fetchUserSchools();
      setUserSchools(schools);
      
      // Set default school or let user choose
      if (schools.length === 1) {
        setCurrentSchool(schools[0]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load schools:', error);
      setIsLoading(false);
    }
  };

  const switchSchool = (schoolId) => {
    const school = userSchools.find(s => s.id === schoolId);
    setCurrentSchool(school);
  };

  return (
    <TenantContext.Provider value={{
      currentSchool,
      userSchools,
      switchSchool,
      isLoading,
      isMultiSchoolUser: userSchools.length > 1
    }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
};