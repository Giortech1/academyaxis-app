import React from 'react';
import { useMultiSchoolData } from '../hooks/useMultiSchoolData';
import { useAuth } from '../../../core/auth/AuthContext';
import { ChildrenOverview } from '../components/ChildrenOverview';
import { ConsolidatedMessages } from '../components/ConsolidatedMessages';
import { MultiSchoolCalendar } from '../components/MultiSchoolCalendar';

export const UnifiedDashboard = () => {
  const { user } = useAuth();
  const { children, childrenBySchool, loading } = useMultiSchoolData(user.id);

  if (loading) {
    return <div className="loading">Chargement des données des enfants...</div>;
  }

  return (
    <div className="unified-dashboard">
      <header className="dashboard-header">
        <h1>Tableau de Bord - Tous mes Enfants</h1>
        <p>Suivi académique unifié pour tous vos enfants</p>
      </header>

      <div className="dashboard-grid">
        {/* Children Overview Cards */}
        <section className="children-overview">
          <ChildrenOverview childrenBySchool={childrenBySchool} />
        </section>

        {/* Consolidated Messages */}
        <section className="messages-section">
          <ConsolidatedMessages schools={Object.keys(childrenBySchool)} />
        </section>

        {/* Multi-School Calendar */}
        <section className="calendar-section">
          <MultiSchoolCalendar schools={Object.keys(childrenBySchool)} />
        </section>
      </div>
    </div>
  );
};