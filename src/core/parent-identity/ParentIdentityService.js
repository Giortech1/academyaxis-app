import { db } from '../firebase/config';
import { collection, doc, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';

export class ParentIdentityService {
  
  // Create or update global parent profile
  static async createGlobalParent(parentData) {
    const globalParentRef = doc(db, 'global_parents', parentData.parentId);
    
    const parentProfile = {
      parentId: parentData.parentId,
      personalInfo: {
        name: parentData.name,
        phone: parentData.phone,
        email: parentData.email,
        preferredLanguage: parentData.preferredLanguage || 'fr-CM',
        location: parentData.location
      },
      schoolAssociations: [],
      preferences: {
        unifiedDashboard: true,
        consolidatedReports: true,
        notificationMethods: ['sms', 'email']
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(globalParentRef, parentProfile);
    return parentProfile;
  }

  // Add school association to parent
  static async addSchoolAssociation(parentId, schoolAssociation) {
    const parentRef = doc(db, 'global_parents', parentId);
    const parentDoc = await getDoc(parentRef);
    
    if (parentDoc.exists()) {
      const currentData = parentDoc.data();
      const updatedAssociations = [
        ...currentData.schoolAssociations,
        {
          schoolId: schoolAssociation.schoolId,
          schoolName: schoolAssociation.schoolName,
          children: schoolAssociation.children,
          addedAt: new Date(),
          status: 'active'
        }
      ];

      await setDoc(parentRef, {
        ...currentData,
        schoolAssociations: updatedAssociations,
        updatedAt: new Date()
      });
    }
  }

  // Get parent's children across all schools
  static async getParentChildren(parentId) {
    const parentRef = doc(db, 'global_parents', parentId);
    const parentDoc = await getDoc(parentRef);
    
    if (!parentDoc.exists()) return [];

    const parentData = parentDoc.data();
    const allChildren = [];

    // Fetch detailed info for each child from their respective schools
    for (const association of parentData.schoolAssociations) {
      for (const child of association.children) {
        const childData = await this.getChildDetails(association.schoolId, child.studentId);
        allChildren.push({
          ...childData,
          schoolId: association.schoolId,
          schoolName: association.schoolName,
          parentRelationship: child.relationship
        });
      }
    }

    return allChildren;
  }

  // Get detailed child information from specific school
  static async getChildDetails(schoolId, studentId) {
    const studentRef = doc(db, `schools/${schoolId}/students`, studentId);
    const studentDoc = await getDoc(studentRef);
    
    if (studentDoc.exists()) {
      return {
        studentId,
        ...studentDoc.data()
      };
    }
    return null;
  }
}