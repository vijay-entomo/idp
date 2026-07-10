import React, { useState } from 'react';
import './SkillGrowthPlan.css';
import alexAvatar from '../assets/alex-avatar.png';
import { Send, Bot, Sparkles, ChevronDown, ChevronUp, Plus, Trash2, TrendingUp, Target, Check } from 'lucide-react';

const TargetSkillInput = ({ skills, onAddSkill, onRemoveSkill }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mockSkills = ['React', 'Angular', 'Vue', 'System Design', 'Node.js', 'Advanced CSS', 'GraphQL', 'TypeScript', 'Figma', 'UI Design'];

  const filteredSkills = mockSkills.filter(s => s.toLowerCase().includes(inputValue.toLowerCase()) && !skills.includes(s));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAddSkill(inputValue.trim());
      setInputValue('');
      setIsDropdownOpen(false);
    }
  };

  const handleSelect = (skill) => {
    onAddSkill(skill);
    setInputValue('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="target-skill-container">
      <div className="skill-input-dropdown-wrapper">
        <input
          type="text"
          placeholder="Search or add a skill..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          onKeyDown={handleKeyDown}
        />
        {isDropdownOpen && (filteredSkills.length > 0 || inputValue.trim().length > 0) && (
          <div className="skill-dropdown">
            {filteredSkills.map(skill => (
              <div
                key={skill}
                className="skill-dropdown-item"
                onMouseDown={(e) => { e.preventDefault(); handleSelect(skill); }}
              >
                {skill}
              </div>
            ))}
            {inputValue.trim().length > 0 && !filteredSkills.some(s => s.toLowerCase() === inputValue.trim().toLowerCase()) && (
              <div
                className="skill-dropdown-item add-new-skill"
                onMouseDown={(e) => { e.preventDefault(); handleSelect(inputValue.trim()); }}
                style={{ color: '#4285f4', fontStyle: 'italic' }}
              >
                Press Enter to add "<strong>{inputValue.trim()}</strong>"
              </div>
            )}
          </div>
        )}
      </div>
      <div className="skills-tags" style={{ marginTop: skills.length > 0 ? '8px' : '0' }}>
        {skills.map(skill => (
          <span className="skill-tag" key={skill}>
            {skill} <button type="button" onClick={() => onRemoveSkill(skill)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillGrowthPlan = ({ onComplete }) => {
  const [planTitle, setPlanTitle] = useState('');
  const [appliedPlan, setAppliedPlan] = useState(null);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [growthPlans, setGrowthPlans] = useState([
    { id: 1, isOpen: true, skills: [], outcome: '', activities: [{ id: 101, isOpen: true, name: '', mode: '', details: '' }] }
  ]);

  const toggleAccordion = (id) => {
    setGrowthPlans(plans => plans.map(p =>
      p.id === id ? { ...p, isOpen: !p.isOpen } : p
    ));
  };

  const addGrowthPlan = () => {
    setGrowthPlans([...growthPlans, { id: Date.now(), isOpen: true, skills: [], activities: [{ id: Date.now() + 1, isOpen: true, name: '', mode: '', details: '' }] }]);
  };

  const removeGrowthPlan = (id) => {
    setGrowthPlans(plans => plans.filter(p => p.id !== id));
  };

  const addSkillToPlan = (planId, skill) => {
    setGrowthPlans(plans => plans.map(p =>
      p.id === planId && !p.skills.includes(skill) ? { ...p, skills: [...p.skills, skill] } : p
    ));
  };

  const removeSkillFromPlan = (planId, skill) => {
    setGrowthPlans(plans => plans.map(p =>
      p.id === planId ? { ...p, skills: p.skills.filter(s => s !== skill) } : p
    ));
  };

  const toggleActivity = (planId, activityId) => {
    setGrowthPlans(plans => plans.map(p =>
      p.id === planId ? {
        ...p,
        activities: p.activities.map(a =>
          a.id === activityId ? { ...a, isOpen: !a.isOpen } : a
        )
      } : p
    ));
  };

  const addActivity = (planId) => {
    setGrowthPlans(plans => plans.map(p =>
      p.id === planId ? {
        ...p,
        activities: [...p.activities, { id: Date.now(), isOpen: true, name: '', mode: '', details: '' }]
      } : p
    ));
  };

  const removeActivity = (planId, activityId) => {
    setGrowthPlans(plans => plans.map(p =>
      p.id === planId ? {
        ...p,
        activities: p.activities.filter(a => a.id !== activityId)
      } : p
    ));
  };

  const updateActivity = (planId, activityId, field, value) => {
    setGrowthPlans(plans => plans.map(p =>
      p.id === planId ? {
        ...p,
        activities: p.activities.map(a =>
          a.id === activityId ? { ...a, [field]: value } : a
        )
      } : p
    ));
  };

  const autoFillPlan = (type) => {
    setIsAutoFilled(true);
    setAppliedPlan(type);
    setTimeout(() => setAppliedPlan(null), 2000);

    if (type === 'grow') {
      setPlanTitle('Master Design Systems & Prototyping');
      setGrowthPlans([
        {
          id: Date.now(),
          isOpen: true,
          skills: ['Design Systems', 'Prototyping'],
          outcome: 'Establish myself as a specialized Senior UI Designer by mastering scalable design systems and high-fidelity prototyping.',
          activities: [
            { id: Date.now() + 1, isOpen: false, name: 'Create Component Library', mode: 'On the job', details: 'Build a comprehensive Figma component library for the core product.', startDate: '', endDate: '' },
            { id: Date.now() + 2, isOpen: false, name: 'Advanced Prototyping Course', mode: 'Self-study', details: 'Complete the Framer X advanced prototyping certification.', startDate: '', endDate: '' }
          ]
        }
      ]);
    } else if (type === 'expand') {
      setPlanTitle('Transition to UX/Product Design');
      setGrowthPlans([
        {
          id: Date.now(),
          isOpen: true,
          skills: ['User Research', 'Product Strategy'],
          outcome: 'Broaden my skill set to prepare for a holistic UX/Product role, focusing on user journeys and strategic thinking.',
          activities: [
            { id: Date.now() + 1, isOpen: false, name: 'Conduct User Interviews', mode: 'On the job', details: 'Run 5 generative user interviews for the upcoming Q3 initiative.', startDate: '', endDate: '' },
            { id: Date.now() + 2, isOpen: false, name: 'Product Strategy Mentorship', mode: 'Mentorship', details: 'Bi-weekly 1:1s with the Lead Product Designer.', startDate: '', endDate: '' }
          ]
        }
      ]);
    }
  };

  const handleCreateIDP = () => {
    // Format the growth plans to match the structure expected by IdpDetail
    const formattedPlans = growthPlans.map((plan, index) => ({
      id: plan.id,
      title: planTitle || `Growth Objective ${index + 1}`,
      skills: plan.skills,
      outcome: plan.outcome || 'No outcome specified.',
      activities: plan.activities.map(act => ({
        id: act.id,
        type: act.mode ? act.mode.toUpperCase() : 'ACTIVITY',
        name: act.name || 'Untitled Activity',
        due: act.endDate || 'TBD',
        progress: 0
      }))
    }));

    localStorage.setItem('idp_draft', JSON.stringify(formattedPlans));
    localStorage.setItem('idp_title', planTitle || 'My Growth Plan');

    if (onComplete) {
      onComplete();
    }
  };

  const hasEnteredData = planTitle.trim().length > 0 || (growthPlans.length > 0 && growthPlans[0].skills.length > 0);
  const showGeneratePrompt = hasEnteredData && !isAutoFilled;

  return (
    <div className="sgp-container">
      {/* 70% Form Area */}
      <div className="sgp-form-area">
        <div className="sgp-form-content">
          <div className="sgp-header">
            <h2>Create Skill Growth Plan</h2>
            <p>Define your target skills and build a clear path to achieve your career goals.</p>
          </div>

          <form className="sgp-form">
            <div className="form-group">
              <label>Plan Title</label>
              <input
                type="text"
                placeholder="e.g., Become a Senior Frontend Engineer"
                value={planTitle}
                onChange={(e) => {
                  setPlanTitle(e.target.value);
                  setIsAutoFilled(false);
                }}
              />
            </div>

            {growthPlans.map((plan, index) => (
              <div className="accordion-section" key={plan.id}>
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion(plan.id)}
                >
                  <h3>Growth Details {growthPlans.length > 1 ? `#${index + 1}` : ''}</h3>
                  <div className="accordion-header-actions">
                    {growthPlans.length > 1 && (
                      <button
                        type="button"
                        className="delete-plan-btn"
                        onClick={(e) => { e.stopPropagation(); removeGrowthPlan(plan.id); }}
                        title="Delete Objective"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    <span className="accordion-toggle-icon">
                      {plan.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </div>
                </div>

                <div className={`accordion-content-wrapper ${plan.isOpen ? 'open' : ''}`}>
                  <div className="accordion-content">
                    <div className="accordion-inner">
                      <div className="form-group">
                        <label>Target Skill</label>
                        <TargetSkillInput
                          skills={plan.skills}
                          onAddSkill={(skill) => addSkillToPlan(plan.id, skill)}
                          onRemoveSkill={(skill) => removeSkillFromPlan(plan.id, skill)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Outcome</label>
                        <textarea
                          placeholder="What do you want to achieve with these skills?"
                          value={plan.outcome}
                          onChange={(e) => {
                            setGrowthPlans(plans => plans.map(p =>
                              p.id === plan.id ? { ...p, outcome: e.target.value } : p
                            ));
                          }}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label>Activities</label>
                        <div className="activities-accordion-list">
                          {plan.activities.map((activity) => (
                            <div className="activity-accordion" key={activity.id}>
                              <div
                                className="activity-accordion-header"
                                onClick={() => toggleActivity(plan.id, activity.id)}
                              >
                                {activity.isOpen ? (
                                  <input
                                    type="text"
                                    placeholder="Activity Name (e.g. Online Course)"
                                    className="activity-name-input"
                                    value={activity.name}
                                    onChange={(e) => updateActivity(plan.id, activity.id, 'name', e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                ) : (
                                  <h4 className="activity-name-display">{activity.name || 'Unnamed Activity'}</h4>
                                )}
                                <div className="activity-header-actions">
                                  <button
                                    type="button"
                                    className="delete-activity-btn"
                                    onClick={(e) => { e.stopPropagation(); removeActivity(plan.id, activity.id); }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                  <span className="accordion-toggle-icon">
                                    {activity.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                  </span>
                                </div>
                              </div>

                              <div className={`activity-accordion-content-wrapper ${activity.isOpen ? 'open' : ''}`}>
                                <div className="activity-accordion-content">
                                  <div className="activity-accordion-inner">
                                    <div className="form-group">
                                      <label>What is the Development Mode of your Activity?</label>
                                      <select
                                        value={activity.mode}
                                        onChange={(e) => updateActivity(plan.id, activity.id, 'mode', e.target.value)}
                                        className="activity-select"
                                      >
                                        <option value="">Select mode...</option>
                                        <option value="On the job">On the job</option>
                                        <option value="Self-study">Self-study</option>
                                        <option value="Mentorship">Mentorship</option>
                                        <option value="Training">Training</option>
                                      </select>
                                    </div>
                                    <div className="timeline-group">
                                      <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                          type="date"
                                          value={activity.startDate || ''}
                                          onChange={(e) => updateActivity(plan.id, activity.id, 'startDate', e.target.value)}
                                          className="date-input"
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                          type="date"
                                          value={activity.endDate || ''}
                                          onChange={(e) => updateActivity(plan.id, activity.id, 'endDate', e.target.value)}
                                          className="date-input"
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label>Activity Details</label>
                                      <textarea
                                        placeholder="Provide activity details..."
                                        value={activity.details}
                                        onChange={(e) => updateActivity(plan.id, activity.id, 'details', e.target.value)}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button type="button" className="add-activity-btn" onClick={() => addActivity(plan.id)}>
                            <Plus size={16} /> Add Activity
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-growth-plan-btn"
              onClick={addGrowthPlan}
            >
              <Plus size={18} strokeWidth={2.5} /> Add Another Growth Objective
            </button>
          </form>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">Cancel</button>
          <button type="button" className="btn-primary" onClick={handleCreateIDP}>Create IDP</button>
        </div>
      </div>

      {/* 30% AI Assistant Sidebar */}
      <div className="sgp-ai-sidebar">
        <div className="ai-sidebar-header">
          <img src={alexAvatar} alt="AI Coach" className="ai-coach-small-avatar" />
          <div>
            <h4>IDP Agent</h4>
          </div>
        </div>

        <div className="ai-helper-content">
          {isAutoFilled ? (
            <div className="helper-intro">
              <Sparkles size={18} className="helper-icon" />
              <p>Excellent! I've populated the plan for you. Feel free to tweak the details, or hit <strong>Create IDP</strong> when you're ready.</p>
            </div>
          ) : showGeneratePrompt ? (
            <>
              <div className="helper-intro">
                <Sparkles size={18} className="helper-icon" />
                <p>I see you're building a plan! Should I generate some outcomes and activities for you based on what you've typed?</p>
              </div>
              <button type="button" className="helper-generate-btn">
                <Sparkles size={16} /> Generate Plan Details
              </button>
            </>
          ) : (
            <>
              <div className="helper-intro">
                <Sparkles size={18} className="helper-icon" />
                <p>Select a recommended plan below to get started instantly.</p>
              </div>

              <div className="helper-list">
                <div className="helper-list-item" onClick={() => autoFillPlan('grow')}>
                  <div className="helper-list-icon">
                    <TrendingUp size={16} />
                  </div>
                  <div className="helper-list-text">
                    <h5>Grow in Current Role</h5>
                    <p>Level up as a Senior UI Designer.</p>
                  </div>
                  <button
                    type="button"
                    className={`helper-list-add ${appliedPlan === 'grow' ? 'applied' : ''}`}
                    title="Add plan"
                  >
                    {appliedPlan === 'grow' ? <Check size={14} /> : <Plus size={14} />}
                  </button>
                </div>

                <div className="helper-list-item" onClick={() => autoFillPlan('expand')}>
                  <div className="helper-list-icon">
                    <Target size={16} />
                  </div>
                  <div className="helper-list-text">
                    <h5>Expand to UX Design</h5>
                    <p>Broaden skills into user research.</p>
                  </div>
                  <button
                    type="button"
                    className={`helper-list-add ${appliedPlan === 'expand' ? 'applied' : ''}`}
                    title="Add plan"
                  >
                    {appliedPlan === 'expand' ? <Check size={14} /> : <Plus size={14} />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillGrowthPlan;
