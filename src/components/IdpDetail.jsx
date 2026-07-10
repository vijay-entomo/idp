import React, { useState, useEffect } from 'react';
import { Award, Eye, Calendar, ArrowLeft, ChevronDown, ChevronUp, Info, PlayCircle, ArrowRight, Users, BookOpen, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import alexAvatar from '../assets/alex-avatar.png';
import './IdpDetail.css';

const IdpDetail = ({ onBack }) => {
  const [openAccordions, setOpenAccordions] = useState([1]);
  const [idpTitle, setIdpTitle] = useState('UI Designer Growth Plan');
  const [showPlanInfo, setShowPlanInfo] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
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
        { 
          id: 101, 
          name: "Advanced Figma Component Architecture", 
          mode: "Online Course",
          startDate: "Jun 01, 2026",
          due: "Jul 15, 2026", 
          progress: 100,
          details: "Complete the advanced Figma curriculum focusing on variants, component properties, and auto-layout best practices to build robust, scalable design systems."
        },
        { 
          id: 102, 
          name: "Audit & Refactor Core UI Kit", 
          mode: "Project",
          startDate: "Jul 16, 2026",
          due: "Aug 10, 2026", 
          progress: 50, 
          details: "Conduct a comprehensive audit of our existing UI kit. Identify inconsistencies, reduce redundant components, and implement design tokens to streamline the handoff process.",
          recommendation: { type: 'Mentor', title: 'Sarah Jenkins', subtitle: 'Design System Lead' } 
        },
        { 
          id: 103, 
          name: "Pair Design with Principal Designer", 
          mode: "Mentorship",
          startDate: "Aug 11, 2026",
          due: "Aug 30, 2026", 
          progress: 0, 
          details: "Shadow and pair-design with the Principal Designer to learn high-level architectural decision-making, stakeholder management, and cross-functional collaboration strategies.",
          recommendation: { type: 'Learning', title: 'Mastering Auto-Layout', subtitle: '2h Interactive Course' } 
        }
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
          setOpenAccordions(parsedDraft.length > 0 ? [parsedDraft[0].id] : []);
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
        <div className="breadcrumb-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="breadcrumb-nav">
              <span className="breadcrumb-link" onClick={onBack}>My IDPs</span>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">{idpTitle}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 className="breadcrumb-title" style={{ margin: 0 }}>{idpTitle}</h1>
              <div
                style={{ cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
                onClick={() => setShowPlanInfo(true)}
              >
                <Info size={20} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '320px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="overall-label" style={{ margin: 0 }}>OVERALL PROGRESS</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{overallProgressPercentage}%</span>
              </div>
              <div className="progress-bar-bg" style={{ backgroundColor: '#e2e8f0' }}>
                <div className="progress-bar-fill" style={{ width: `${overallProgressPercentage}%`, backgroundColor: '#10b981', transition: 'width 0.3s ease' }}></div>
              </div>
            </div>
            {/* <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', whiteSpace: 'nowrap', alignSelf: 'flex-end', marginBottom: '1px' }}>
              {completedActivitiesOverall} / {totalActivities} Done
            </div> */}
          </div>
        </div>
      </div>

      <div className="idp-detail-container">
        <div className="idp-detail-left">



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
                              <div className="activity-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'start' }}>
                                {plan.activities.map((activity) => (
                                  <div
                                    className="activity-card"
                                    key={activity.id}
                                    onClick={() => setSelectedActivity(activity)}
                                    style={{
                                      cursor: 'pointer',
                                      border: '1px solid #e2e8f0',
                                      borderRadius: '10px',
                                      padding: '12px',
                                      backgroundColor: '#ffffff',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'flex-start',
                                      alignItems: 'stretch',
                                      textAlign: 'left',
                                      gap: '12px',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0', color: '#0f172a', lineHeight: '1.2' }}>{activity.name}</h4>
                                        <span className="due-date" style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Due: {activity.due}</span>
                                      </div>
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          <span style={{ fontSize: '10px', fontWeight: '600', color: '#64748b' }}>Progress</span>
                                          {activity.progress === 100 && <span style={{ fontSize: '9px', fontWeight: '700', color: '#10b981', backgroundColor: '#d1fae5', padding: '2px 6px', borderRadius: '10px' }}>DONE</span>}
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: '700', color: activity.progress === 100 ? '#10b981' : '#0f172a' }}>{activity.progress}%</span>
                                      </div>
                                      <div className="activity-progress-slider-container" style={{ width: '100%' }}>
                                        <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          value={activity.progress}
                                          onChange={(e) => {
                                            e.stopPropagation();
                                            setActivityProgress(plan.id, activity.id, e.target.value);
                                          }}
                                          className={`activity-slider ${activity.progress === 100 ? 'complete' : ''}`}
                                          style={{ '--progress': `${activity.progress}%`, height: '4px' }}
                                        />
                                      </div>
                                    </div>

                                    {activity.recommendation && (
                                      <div style={{ 
                                        marginTop: '4px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0', 
                                        display: 'flex', alignItems: 'center', gap: '8px' 
                                      }}>
                                        <div style={{ backgroundColor: '#eff6ff', padding: '4px', borderRadius: '4px', color: '#3b82f6', display: 'flex' }}>
                                          <Sparkles size={12} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          <div style={{ fontSize: '9px', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
                                            Recommended {activity.recommendation.type}
                                          </div>
                                          <div style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a', lineHeight: '1.2' }}>
                                            {activity.recommendation.title}
                                          </div>
                                          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>
                                            {activity.recommendation.subtitle}
                                          </div>
                                        </div>
                                        <button style={{ 
                                          backgroundColor: '#f8fafc', color: '#3b82f6', border: '1px solid #bfdbfe', borderRadius: '4px', 
                                          padding: '4px 8px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' 
                                        }}>
                                          View
                                        </button>
                                      </div>
                                    )}
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
                {capabilities.map((cap, index) => (
                  <div key={index} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                        {index + 1}. {cap.type}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ backgroundColor: cap.iconBg, padding: '8px', borderRadius: '8px', color: cap.iconColor, flexShrink: 0 }}>
                        {cap.icon}
                      </div>
                      <div>
                        <h5 style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0' }}>{cap.title}</h5>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', lineHeight: '1.4' }}>{cap.desc}</p>
                        <button style={{
                          backgroundColor: cap.btnBg,
                          color: cap.btnColor,
                          border: cap.btnBorder,
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
                          {cap.btnText} {cap.btnIcon}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Info Offcanvas */}
      <AnimatePresence>
        {showPlanInfo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999
              }}
              onClick={() => setShowPlanInfo(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px',
                backgroundColor: '#ffffff', zIndex: 1000, boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Plan Information</h3>
                <button onClick={() => setShowPlanInfo(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>&times;</button>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
                <div className="detail-section" style={{ border: 'none', padding: 0 }}>
                  <h4 className="detail-section-title" style={{ marginBottom: '12px' }}>CREATOR & OWNER</h4>
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
                <div className="detail-section" style={{ border: 'none', padding: 0 }}>
                  <h4 className="detail-section-title" style={{ marginBottom: '12px' }}>PLAN SETTINGS</h4>
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Activity Details Offcanvas */}
      <AnimatePresence>
        {selectedActivity && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999
              }}
              onClick={() => setSelectedActivity(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px',
                backgroundColor: '#f8fafc', zIndex: 1000, boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Activity Details</h3>
                <button onClick={() => setSelectedActivity(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>&times;</button>
              </div>
              
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px', overflowY: 'auto', flex: 1 }}>
                
                {/* Main Details (Seamless Read-only) */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ backgroundColor: selectedActivity.progress === 100 ? '#d1fae5' : '#f1f5f9', color: selectedActivity.progress === 100 ? '#10b981' : '#475569', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                      {selectedActivity.progress === 100 ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  
                  <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px 0', lineHeight: '1.3' }}>{selectedActivity.name}</h2>
                  
                  {/* Additional Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                    
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Development Mode</h4>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Online Course</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Start Date</h4>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} color="#64748b"/> Jun 10, 2026</p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>End Date</h4>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} color="#64748b"/> {selectedActivity.due}</p>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px 0' }}>Activity Details</h4>
                      <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: '1.5' }}>Complete the core curriculum and interactive modules to master the selected skills.</p>
                    </div>

                  </div>

                  {/* Interactive Progress Slider */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>Current Progress</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: selectedActivity.progress === 100 ? '#10b981' : '#3b82f6' }}>{selectedActivity.progress}%</span>
                    </div>
                    <div className="activity-progress-slider-container" style={{ width: '100%' }}>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedActivity.progress}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedActivity(prev => ({...prev, progress: parseInt(val, 10)}));
                          const planId = growthDetails.find(p => p.activities.some(a => a.id === selectedActivity.id))?.id;
                          if(planId) setActivityProgress(planId, selectedActivity.id, val);
                        }}
                        className={`activity-slider ${selectedActivity.progress === 100 ? 'complete' : ''}`}
                        style={{ '--progress': `${selectedActivity.progress}%`, height: '6px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Recommendation Section (Card) */}
                {selectedActivity.recommendation && (
                  <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <Sparkles size={16} color="#3b82f6" />
                      <h4 style={{ fontSize: '11px', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                        AI Recommended {selectedActivity.recommendation.type}
                      </h4>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {selectedActivity.recommendation.type === 'Mentor' ? <Users size={20} /> : <BookOpen size={20} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>{selectedActivity.recommendation.title}</h5>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.4' }}>{selectedActivity.recommendation.subtitle}</p>
                        <button style={{ backgroundColor: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', width: '100%' }}>
                          Connect & Explore
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div >
  );
};

export default IdpDetail;
