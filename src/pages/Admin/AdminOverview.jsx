import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { apiService } from '../../services/api';
import '../../layouts/AdminLayout.css';

const AdminOverview = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [statsRes, chartsRes] = await Promise.all([
        apiService.getAdminStats(),
        apiService.getAdminCharts()
      ]);
      setStats(statsRes);
      setChartData(chartsRes);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setExportComplete(false);

    // Simulate API call/Generation
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);

      // Reset success message after 3 seconds
      setTimeout(() => setExportComplete(false), 3000);
    }, 2000);
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading System Overview...</div>;

  return (
    <div className="admin-overview">
      <div className="admin-header">
        <div className="admin-title">
          <h1>System Overview</h1>
          <p>Real-time analytics and student registration performance.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {exportComplete && (
            <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600', animation: 'fadeIn 0.3s' }}>
              <iconify-icon icon="ri:check-line" style={{ verticalAlign: 'middle', marginRight: '5px' }}></iconify-icon>
              Report Downloaded
            </span>
          )}
          <button
            className={`btn-apply ${isExporting ? 'loading' : ''}`}
            style={{ padding: '10px 20px', minWidth: '140px', position: 'relative' }}
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <iconify-icon icon="line-md:loading-twotone-loop" style={{ marginRight: '8px', verticalAlign: 'middle' }}></iconify-icon>
                Generating...
              </>
            ) : (
              <>
                <iconify-icon icon="ri:download-2-line" style={{ marginRight: '8px', verticalAlign: 'middle' }}></iconify-icon>
                Export Report
              </>
            )}
          </button>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrap" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <iconify-icon icon="ri:user-add-line"></iconify-icon>
            </div>
            <div className="stat-trend trend-up">
              <iconify-icon icon="ri:arrow-right-up-line"></iconify-icon> --
            </div>
          </div>
          <div className="stat-value">{stats?.totalStudents?.toLocaleString() || 0}</div>
          <div className="stat-label">Total Students</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrap" style={{ background: '#fef3f2', color: '#ef4444' }}>
              <iconify-icon icon="ri:file-list-3-line"></iconify-icon>
            </div>
            <div className="stat-trend trend-up">
              <iconify-icon icon="ri:arrow-right-up-line"></iconify-icon> --
            </div>
          </div>
          <div className="stat-value">{stats?.applicationsUnderReview?.toLocaleString() || 0}</div>
          <div className="stat-label">Applications Under Review</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrap" style={{ background: '#eff6ff', color: '#3b82f6' }}>
              <iconify-icon icon="ri:message-line"></iconify-icon>
            </div>
            <div className="stat-trend trend-down">
              <iconify-icon icon="ri:arrow-right-down-line"></iconify-icon> --
            </div>
          </div>
          <div className="stat-value">{stats?.totalLeads?.toLocaleString() || 0}</div>
          <div className="stat-label">Total Leads</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrap" style={{ background: '#faf5ff', color: '#9333ea' }}>
              <iconify-icon icon="ri:money-dollar-circle-line"></iconify-icon>
            </div>
            <div className="stat-trend trend-up">
              <iconify-icon icon="ri:arrow-right-up-line"></iconify-icon> --
            </div>
          </div>
          <div className="stat-value">{stats?.revenue || "£0"}</div>
          <div className="stat-label">Estimated Revenue</div>
        </div>
      </div>

      <div className="admin-charts-grid">
        <div className="admin-chart-card">
          <div className="chart-header">
            <h3>Registration Trend</h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData?.weeklyData || []}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#06b6d4" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-chart-card">
          <div className="chart-header">
            <h3>Destination Mix</h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData?.countryData || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {(chartData?.countryData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
