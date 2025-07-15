// src/pages/Dashboard.tsx

import { authService } from '../services/authService';

const Dashboard = () => {
  const user = authService.getCurrentUser();
  
  return (
    <div className="p-4">
      <h1>Welcome, {user?.name}</h1>
      {/* محتوى لوحة التحكم */}
    </div>
  );
};

export default Dashboard;