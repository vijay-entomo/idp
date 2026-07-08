import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './IdpList.css';

const IdpCard = ({ title, subtitle, progress, status, statusColor, tasksDone, onClick }) => {
  const radius = 28;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorMap = {
    green: '#10b981',
    red: '#ef4444',
    yellow: '#eab308'
  };

  const strokeColor = colorMap[statusColor];

  return (
    <motion.div 
      className="idp-card" 
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="idp-card-body">
        <div className="idp-card-content">
          <h4>{title}</h4>
          <p>{subtitle}</p>
          <div className="idp-card-badges">
            <span className={`idp-badge status-${statusColor}`}>
              <span className="dot"></span> {status}
            </span>
            <span className="idp-badge tasks">{tasksDone}</span>
          </div>
        </div>
        <div className="idp-card-progress">
          <svg className="progress-ring" width="64" height="64">
            <circle
              className="progress-ring-bg"
              stroke="#f1f5f9"
              strokeWidth={stroke}
              fill="transparent"
              r={radius}
              cx="32"
              cy="32"
            />
            <circle
              className="progress-ring-circle"
              stroke={strokeColor}
              strokeWidth={stroke}
              fill="transparent"
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              r={radius}
              cx="32"
              cy="32"
            />
          </svg>
          <span className="progress-text">{progress}%</span>
        </div>
      </div>
      <div className="idp-card-footer">
        <span>Track progress</span>
        <ArrowUpRight size={14} className="footer-icon" />
      </div>
    </motion.div>
  );
};

const IdpList = ({ onSelectPlan }) => {
  const idps = [
    { title: "Executive Leadership Gr...", subtitle: "Develop board-level presentation...", progress: 60, status: "on track", statusColor: "green", tasksDone: "1 of 2 done" },
    { title: "My IDP 2026", subtitle: "Become a Product Manager", progress: 33, status: "critical", statusColor: "red", tasksDone: "1 of 3 done" },
    { title: "Leadership & Communi...", subtitle: "Facilitate product roadmap discus...", progress: 50, status: "needs focus", statusColor: "yellow", tasksDone: "1 of 2 done" }
  ];

  return (
    <div className="idp-list-section">
      <div className="idp-list-header">
        <div className="header-left">
          <h2>My IDPs</h2>
        </div>

      </div>
      <motion.div 
        className="idp-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {idps.map((idp, index) => (
          <IdpCard key={index} {...idp} onClick={() => onSelectPlan('idp-detail')} />
        ))}
      </motion.div>
    </div>
  );
};

export default IdpList;
