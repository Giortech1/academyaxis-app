import { useState, useEffect } from 'react';
import { ParentIdentityService } from '../../../core/parent-identity/ParentIdentityService';

export const useMultiSchoolData = (parentId) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadChildrenData();
  }, [parentId]);

  const loadChildrenData = async () => {
    try {
      setLoading(true);
      const childrenData = await ParentIdentityService.getParentChildren(parentId);
      setChildren(childrenData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getChildrenBySchool = () => {
    return children.reduce((acc, child) => {
      if (!acc[child.schoolId]) {
        acc[child.schoolId] = {
          schoolName: child.schoolName,
          children: []
        };
      }
      acc[child.schoolId].children.push(child);
      return acc;
    }, {});
  };

  return {
    children,
    childrenBySchool: getChildrenBySchool(),
    loading,
    error,
    refreshData: loadChildrenData
  };
};