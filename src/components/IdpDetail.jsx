import React, { useState, useEffect } from 'react';
import { Award, Eye, Calendar, ArrowLeft, ChevronDown, ChevronUp, Info, PlayCircle, ArrowRight, Users, BookOpen, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import alexAvatar from '../assets/alex-avatar.png';
import './IdpDetail.css';

const IdpDetail = ({ onBack }) => {
  const [openAccordions, setOpenAccordions] = useState([]);
  const [idpTitle, setIdpTitle] = useState('UI Designer Growth Plan');

  const toggleAccordion = (id) => {
    setOpenAccordions(prev =>
      prev.includes(id) ? prev.filter(aId => aId !== id) : [...prev, id]
    );
  };

  const [growthDetails, setGrowthDetails] = useState([
    {
      id: 1,
      title: "Master Design Systems & Prototyping",
      skills: ["Figma", "Design Systems", "Component Architecture", "Design Tokens"],
      outcome: "Establish myself as a specialized Senior UI Designer by mastering scalable design systems and high-fidelity prototyping.",
      activities: [
        { id: 101, type: "ONLINE COURSE", name: "Advanced Figma Component Architecture", due: "Jul 15, 2026", progress: 100 },
        { id: 102, type: "PROJECT", name: "Audit & Refactor Core UI Kit", due: "Aug 10, 2026", progress: 50 },
        { id: 103, type: "MENTORSHIP", name: "Pair Design with Principal Designer", due: "Aug 30, 2026", progress: 0 }
      ]
    },
    {
      id: 2,
      title: "Transition to UX/Product Strategy",
      skills: ["User Research", "Product Strategy", "Information Architecture", "Data Analytics"],
      outcome: "Broaden my skill set to prepare for a holistic UX/Product role, focusing on user journeys and strategic thinking.",
      activities: [
        { id: 201, type: "WORKSHOP", name: "Generative User Interview Training", due: "Sep 05, 2026", progress: 100 },
        { id: 202, type: "PROJECT", name: "Map Q4 User Journey Flows", due: "Sep 20, 2026", progress: 25 },
        { id: 203, type: "READING", name: "Read 'Inspired' by Marty Cagan", due: "Oct 15, 2026", progress: 0 }
      ]
    },
    {
      id: 3,
      title: "Enhance Technical Communication",
      skills: ["Cross-functional Collaboration", "Agile Methodologies", "Technical Writing"],
      outcome: "Bridge the gap between design and engineering to ensure smoother handoffs and fewer QA iterations.",
      activities: [
        { id: 301, type: "WORKSHOP", name: "Front-end Basics for Designers", due: "Nov 01, 2026", progress: 0 },
        { id: 302, type: "PROJECT", name: "Create Developer Handoff Checklist", due: "Nov 15, 2026", progress: 0 },
        { id: 303, type: "MEETING", name: "Shadow Engineering Sprint Planning", due: "Dec 01, 2026", progress: 0 }
      ]
    }
  ]);

  const setActivityProgress = (planId, activityId, newProgress) => {
    setGrowthDetails(prevDetails => prevDetails.map(plan => {
      if (plan.id !== planId) return plan;
      return {
        ...plan,
        activities: plan.activities.map(act => {
          if (act.id !== activityId) return act;
          return { ...act, progress: parseInt(newProgress, 10) };
        })
      };
    }));
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem('idp_draft');
    const savedTitle = localStorage.getItem('idp_title');
    
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        if (parsedDraft && parsedDraft.length > 0) {
          setGrowthDetails(parsedDraft);
          setOpenAccordions([]);
        }
      } catch (e) {
        console.error("Failed to parse saved IDP draft", e);
      }
    }
    
    if (savedTitle) {
      setIdpTitle(savedTitle);
    }
  }, []);

  const totalActivities = growthDetails.reduce((sum, plan) => sum + plan.activities.length, 0);
  const completedActivitiesOverall = growthDetails.reduce((sum, plan) => sum + plan.activities.filter(a => a.progress === 100).length, 0);
  const overallProgressPercentage = totalActivities === 0 ? 0 : Math.round((completedActivitiesOverall / totalActivities) * 100);

  const [activeCapability, setActiveCapability] = useState(0);
  const capabilities = [
    {
      type: "Action Nudge",
      icon: <PlayCircle size={18} />,
      iconBg: "#eff6ff",
      iconColor: "#3b82f6",
      title: "Build a Design System",
      desc: "You're on a roll! Spend 45 mins today to maintain your momentum.",
      btnText: "Start Activity",
      btnBg: "#0f172a",
      btnColor: "#ffffff",
      btnBorder: "none",
      btnIcon: <ArrowRight size={12} />
    },
    {
      type: "Peer Matching",
      icon: <Users size={18} />,
      iconBg: "#fdf4ff",
      iconColor: "#c026d3",
      title: "Connect with Sarah Jenkins",
      desc: "Sarah recently mastered Figma Auto-Layout. Want me to schedule a 15-minute coffee chat?",
      btnText: "Schedule Sync",
      btnBg: "#c026d3",
      btnColor: "#ffffff",
      btnBorder: "none",
      btnIcon: <ArrowRight size={12} />
    },
    {
      type: "Intelligent Curation",
      icon: <BookOpen size={18} />,
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
      title: "New Resource Found",
      desc: "I found a new internal course on 'Strategic UX Thinking' that perfectly matches your outcome goals.",
      btnText: "Add to Plan",
      btnBg: "#16a34a",
      btnColor: "#ffffff",
      btnBorder: "none",
      btnIcon: <ArrowRight size={12} />
    },
    {
      type: "Adaptive Pacing",
      icon: <Clock size={18} />,
      iconBg: "#fff7ed",
      iconColor: "#ea580c",
      title: "Adjust Deadlines?",
      desc: "You've had a busy week and missed two activity due dates. Let me adjust your timeline for you.",
      btnText: "Re-calibrate Plan",
      btnBg: "#ffffff",
      btnColor: "#0f172a",
      btnBorder: "1px solid #cbd5e1",
      btnIcon: <ArrowRight size={12} />
    }
  ];

  const handlePrevCapability = () => {
    setActiveCapability(prev => (prev === 0 ? capabilities.length - 1 : prev - 1));
  };

  const handleNextCapability = () => {
    setActiveCapability(prev => (prev === capabilities.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="idp-detail-page">
      <div className="breadcrumb-header">
        <div className="breadcrumb-inner">
          <div className="breadcrumb-nav">
            <span className="breadcrumb-link" onClick={onBack}>My IDPs</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{idpTitle}</span>
          </div>
          <h1 className="breadcrumb-title">{idpTitle}</h1>
        </div>
      </div>

      <div className="idp-detail-container">
        <div className="idp-detail-left">

          <div className="detail-sidebar-card" style={{ position: 'relative' }}>
            <div
              style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer', color: '#94a3b8' }}
              onClick={() => toggleAccordion('plan-info')}
            >
              <Info size={20} />
            </div>
            <div className="detail-section">
              <span className="overall-label">OVERALL PROGRESS</span>
              <div className="overall-value">{completedActivitiesOverall} of {totalActivities} Done ({overallProgressPercentage}%)</div>
              <div className="progress-bar-bg" style={{ marginTop: '12px', backgroundColor: '#e2e8f0' }}>
                <div className="progress-bar-fill" style={{ width: `${overallProgressPercentage}%`, backgroundColor: '#10b981', transition: 'width 0.3s ease' }}></div>
              </div>
            </div>

            <div className="detail-section">
              <h4 className="detail-section-title">OVERALL OUTCOME</h4>
              <p className="detail-section-text">{growthDetails[0]?.outcome || 'No outcome defined.'}</p>
            </div>

            {openAccordions.includes('plan-info') && (
              <>
                <div className="detail-section">
                  <h4 className="detail-section-title">CREATOR & OWNER</h4>
                  <div className="detail-creator-grid">
                    <div>
                      <span className="creator-label">Created By</span>
                      <span className="creator-value">Alex (You)</span>
                    </div>
                    <div>
                      <span className="creator-label">Assigned To</span>
                      <span className="creator-value">Alex (You)</span>
                    </div>
                  </div>
                </div>
                <div className="detail-section">
                  <h4 className="detail-section-title">PLAN SETTINGS</h4>
                  <div className="settings-list">
                    <div className="settings-item">
                      <Eye size={16} className="settings-icon" />
                      <span>Visible to: Only Me</span>
                    </div>
                    <div className="settings-item">
                      <Calendar size={16} className="settings-icon" />
                      <span>Duration: Jun 2026 - Sep 2026</span>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          <div className="detail-content-card">
            <div className="card-header">
              <div className="card-header-left">
                <h2>Growth Details</h2>
              </div>
            </div>

            <div className="activities-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {growthDetails.map((plan, index) => {
                const isOpen = openAccordions.includes(plan.id);
                const completedActivities = plan.activities.filter(a => a.progress === 100).length;
                const planProgress = plan.activities.length === 0 ? 0 : Math.round((completedActivities / plan.activities.length) * 100);

                return (
                  <div
                    className="accordion-item"
                    key={plan.id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      transition: 'all 0.2s ease',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      className="accordion-header"
                      onClick={() => toggleAccordion(plan.id)}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        backgroundColor: isOpen ? '#f8fafc' : '#ffffff',
                        borderBottom: isOpen ? '1px solid #e2e8f0' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{plan.title}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>{planProgress}%</span>
                          <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: '100%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: `${planProgress}%`, height: '100%', backgroundColor: '#10b981', position: 'absolute', top: 0, left: 0, transition: 'width 0.3s ease' }} />
                      </div>
                      
                      {index === 0 && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px', padding: '6px 10px', backgroundColor: '#eff6ff', borderRadius: '6px', border: '1px solid #dbeafe' }}>
                          <Sparkles size={12} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span style={{ fontSize: '11px', color: '#1e3a8a', lineHeight: '1.4', fontWeight: '500' }}>
                            <strong>IDP Agent:</strong> {planProgress === 100 ? "Amazing work! This objective is complete." : "You're on track! Focus on your highest priority activities first to maintain momentum."}
                          </span>
                        </div>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="accordion-content" style={{ padding: '16px' }}>

                        {index > 0 && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 16px', backgroundColor: '#eff6ff', borderRadius: '8px', marginBottom: '20px', border: '1px solid #bfdbfe' }}>
                            <Sparkles size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <span style={{ fontSize: '12px', color: '#1e3a8a', lineHeight: '1.5', fontWeight: '500' }}>
                              <strong>IDP Agent:</strong> {planProgress === 100 ? "Amazing work! This objective is complete." : "I recommend dedicating 2 hours this week to push this objective forward."}
                            </span>
                          </div>
                        )}

                        {/* Skills & Outcome Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                          <div>
                            <h5 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Target Skills</h5>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {plan.skills.map(skill => (
                                <span key={skill} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#334155', fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px' }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Desired Outcome</h5>
                            <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: '1.5' }}>{plan.outcome}</p>
                          </div>
                        </div>

                        {/* Activities */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h5 style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', margin: 0, textTransform: 'uppercase' }}>Activities</h5>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b' }}>
                              {completedActivities}/{plan.activities.length} Done
                            </span>
                          </div>
                          <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {plan.activities.map((activity) => (
                              <div
                                className="activity-card"
                                key={activity.id}
                                style={{
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '12px',
                                  padding: '16px',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <div className="activity-left" style={{ flex: 1, paddingRight: '16px', display: 'flex', gap: '12px' }}>
                                  <div style={{ 
                                    width: '36px', height: '36px', borderRadius: '8px', 
                                    backgroundColor: activity.progress === 100 ? '#d1fae5' : '#f1f5f9', 
                                    color: activity.progress === 100 ? '#10b981' : '#64748b',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                                  }}>
                                    <PlayCircle size={20} />
                                  </div>
                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{activity.type}</span>
                                      {activity.progress === 100 && <span style={{ fontSize: '10px', fontWeight: '700', color: '#10b981', backgroundColor: '#d1fae5', padding: '2px 6px', borderRadius: '12px' }}>DONE</span>}
                                    </div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0', color: '#0f172a' }}>{activity.name}</h4>
                                    <span className="due-date" style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Due: {activity.due}</span>
                                  </div>
                                </div>
                                <div className="activity-right" style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                  <span style={{ fontSize: '12px', fontWeight: '700', color: activity.progress === 100 ? '#10b981' : '#0f172a' }}>{activity.progress}%</span>
                                  <div className="activity-progress-slider-container" style={{ width: '100%' }}>
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={activity.progress}
                                      onChange={(e) => setActivityProgress(plan.id, activity.id, e.target.value)}
                                      className={`activity-slider ${activity.progress === 100 ? 'complete' : ''}`}
                                      style={{ '--progress': `${activity.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="idp-detail-right">
          <div className="idp-banner-outer">
            <div className="idp-banner-inner" style={{ flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="idp-coach-avatar-wrapper idp-coach-avatar-yellow" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                  <img src={alexAvatar} alt="Agent" className="idp-coach-avatar" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>IDP Agent</h3>

                  </div>
                  {/* <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '12px' }}>CO-PILOT CAPABILITIES</span> */}
                </div>
              </div>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', textAlign: 'left', position: 'relative' }}>

                  {/* Carousel Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                      {activeCapability + 1}. {capabilities[activeCapability].type}
                    </h4>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={handlePrevCapability} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', borderRadius: '4px' }}>
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={handleNextCapability} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', borderRadius: '4px' }}>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Carousel Content */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ backgroundColor: capabilities[activeCapability].iconBg, padding: '8px', borderRadius: '8px', color: capabilities[activeCapability].iconColor, flexShrink: 0, transition: 'all 0.3s' }}>
                      {capabilities[activeCapability].icon}
                    </div>
                    <div>
                      <h5 style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0' }}>{capabilities[activeCapability].title}</h5>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', lineHeight: '1.4' }}>{capabilities[activeCapability].desc}</p>
                      <button style={{
                        backgroundColor: capabilities[activeCapability].btnBg,
                        color: capabilities[activeCapability].btnColor,
                        border: capabilities[activeCapability].btnBorder,
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}>
                        {capabilities[activeCapability].btnText} {capabilities[activeCapability].btnIcon}
                      </button>
                    </div>
                  </div>

                  {/* Pagination Dots */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
                    {capabilities.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: index === activeCapability ? '#3b82f6' : '#e2e8f0',
                          transition: 'background-color 0.3s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default IdpDetail;
