import React, { useState } from 'react';
import alexAvatar from '../assets/alex-avatar.png';
import IdpModal from './IdpModal';

const IdpBanner = ({ onSelectPlan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="idp-banner-outer">
      <div className="idp-banner-inner">
        <div className="idp-banner-left">
          <div className="idp-coach-profile">
            <div className="idp-coach-avatar-wrapper idp-coach-avatar-yellow">
              <img src={alexAvatar} alt="IDP Coach" className="idp-coach-avatar" />
            </div>
            <div className="idp-coach-status">
              <span className="status-dot"></span>
              <span className="status-text">Agent</span>
            </div>
          </div>
          <div className="idp-text-content">
            <h2 className="idp-headline">Hey. Your career isn't going to build itself — so let's build it together.</h2>
          </div>
        </div>
        
        <div className="idp-banner-right">
          <h3 className="idp-options-title">How would you like me to start?</h3>
          <div className="idp-options-list">
            <div className="idp-option-banner-card" onClick={() => setIsModalOpen(true)}>
              <h4>I already know what I want to work on</h4>
              <p>Build skills for your current role, grow beyond your role, or improve a performance goal.</p>
            </div>
            <div className="idp-option-banner-card">
              <h4>Help me figure out what to work on</h4>
              <p>Not sure? I'll ask you a few questions and suggest the right direction.</p>
            </div>
            <div className="idp-option-banner-card">
              <h4>Create an IDP for one of my reportees</h4>
              <p>Select a team member and design a tailored growth roadmap for their career path.</p>
            </div>
          </div>
        </div>
      </div>
      
      <IdpModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelectPath={onSelectPlan} 
      />
    </div>
  );
};

export default IdpBanner;
