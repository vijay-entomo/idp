import React from 'react';
import { X, TrendingUp, Compass, Target } from 'lucide-react';
import './IdpModal.css';

const IdpModal = ({ isOpen, onClose, onSelectPath }) => {
  if (!isOpen) return null;

  return (
    <div className="idp-modal-overlay" onClick={onClose}>
      <div className="idp-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="idp-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="idp-modal-header">
          <div className="idp-modal-badge">AI Assistant</div>
          <h2>What would you like help with?</h2>
          <p>Select a path to let the AI build a tailored plan for your career growth.</p>
        </div>

        <div className="idp-modal-body">
          <div className="idp-option-card" onClick={() => { onSelectPath('skill-growth'); onClose(); }}>
            <div className="idp-option-icon">
              <TrendingUp size={24} />
            </div>
            <div className="idp-option-text">
              <h4>Create a skill growth plan</h4>
              <p>Build skills for your current role or prepare for the next one.</p>
            </div>
          </div>

          <div className="idp-option-card">
            <div className="idp-option-icon">
              <Compass size={24} />
            </div>
            <div className="idp-option-text">
              <h4>Grow beyond my role</h4>
              <p>Focus on habits, mindset, or wellbeing beyond my role.</p>
            </div>
          </div>

          <div className="idp-option-card">
            <div className="idp-option-icon">
              <Target size={24} />
            </div>
            <div className="idp-option-text">
              <h4>Improve a performance goal</h4>
              <p>Build a focused plan around a performance or business goal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdpModal;
