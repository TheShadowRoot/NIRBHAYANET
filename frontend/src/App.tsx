import React, { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [demoAlertActive, setDemoAlertActive] = useState(false);

  const triggerSos = () => {
    setDemoAlertActive(true);
    setTimeout(() => setDemoAlertActive(false), 5000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', color: '#0B132B', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar */}
      {(currentPage === 'landing' || currentPage === 'login' || currentPage === 'signup') && (
        <header style={{ backgroundColor: '#0B132B', color: '#FFFFFF', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div onClick={() => setCurrentPage('landing')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#FF70A6', padding: '8px 12px', borderRadius: '12px', color: '#fff', fontWeight: 'bold' }}>🛡️</div>
            <div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>NIRBHAYANET</h1>
              <p style={{ margin: 0, fontSize: '12px', color: '#E0AAFF' }}>Protect. Connect. Recognize.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setCurrentPage('login')} style={{ background: 'transparent', border: 'none', color: '#E0AAFF', cursor: 'pointer', fontSize: '14px' }}>Login</button>
            <button onClick={() => setCurrentPage('signup')} style={{ backgroundColor: '#FF70A6', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Get Started</button>
          </div>
        </header>
      )}

      {/* Main Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'signup' && (
          <aside style={{ backgroundColor: '#0B132B', color: '#FFFFFF', width: '260px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '16px', color: '#FF70A6', marginBottom: '20px' }}>NIRBHAYANET MENU</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><button onClick={() => setCurrentPage('dashboard')} style={{ width: '100%', textAlign: 'left', padding: '10px', background: currentPage === 'dashboard' ? '#FF70A6' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>📊 Dashboard</button></li>
                <li><button onClick={() => setCurrentPage('sos')} style={{ width: '100%', textAlign: 'left', padding: '10px', background: currentPage === 'sos' ? '#FF70A6' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🚨 Emergency SOS</button></li>
                <li><button onClick={() => setCurrentPage('journey')} style={{ width: '100%', textAlign: 'left', padding: '10px', background: currentPage === 'journey' ? '#FF70A6' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🗺️ Safe Journey</button></li>
                <li><button onClick={() => setCurrentPage('contacts')} style={{ width: '100%', textAlign: 'left', padding: '10px', background: currentPage === 'contacts' ? '#FF70A6' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>📞 Trusted Contacts</button></li>
                <li><button onClick={() => setCurrentPage('profile')} style={{ width: '100%', textAlign: 'left', padding: '10px', background: currentPage === 'profile' ? '#FF70A6' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>👤 Profile</button></li>
              </ul>
            </div>
            <button onClick={() => setCurrentPage('landing')} style={{ padding: '10px', backgroundColor: 'transparent', border: '1px solid #FF70A6', color: '#FF70A6', borderRadius: '8px', cursor: 'pointer' }}>Sign Out</button>
          </aside>
        )}

        <main style={{ flex: 1, padding: '40px', backgroundColor: '#F8F9FA' }}>
          {demoAlertActive && (
            <div style={{ backgroundColor: '#FF70A6', color: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontWeight: 'bold' }}>
              🚨 DEMO SOS Alert Triggered! Simulated emergency signal broadcasted to trusted contacts.
            </div>
          )}

          {currentPage === 'landing' && (
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ backgroundColor: '#E0AAFF', color: '#0B132B', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', alignSelf: 'center' }}>COMMUNITY-POWERED WOMEN'S SAFETY ECOSYSTEM</span>
              <h1 style={{ fontSize: '48px', fontWeight: 'extrabold', color: '#0B132B', margin: 0 }}>Protect. Connect. Recognize.</h1>
              <p style={{ fontSize: '16px', color: '#555' }}>An advanced safety ecosystem designed to empower communities, secure commutes, and provide instant emergency response assistance.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                <button onClick={() => setCurrentPage('signup')} style={{ padding: '14px 28px', backgroundColor: '#FF70A6', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Get Started</button>
                <button onClick={() => setCurrentPage('sos')} style={{ padding: '14px 28px', backgroundColor: '#0B132B', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Emergency SOS</button>
              </div>
            </div>
          )}

          {currentPage === 'login' && (
            <div style={{ maxWidth: '400px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h2 style={{ textAlign: 'center', color: '#0B132B' }}>Welcome Back</h2>
              <input type="email" placeholder="Email Address" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
              <input type="password" placeholder="Password" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
              <button onClick={() => setCurrentPage('dashboard')} style={{ padding: '12px', backgroundColor: '#FF70A6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Log In</button>
            </div>
          )}

          {currentPage === 'signup' && (
            <div style={{ maxWidth: '400px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h2 style={{ textAlign: 'center', color: '#0B132B' }}>Create Account</h2>
              <input type="text" placeholder="Full Name (Sneha)" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
              <input type="email" placeholder="Email Address" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
              <input type="password" placeholder="Password" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
              <button onClick={() => setCurrentPage('dashboard')} style={{ padding: '12px', backgroundColor: '#FF70A6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
            </div>
          )}

          {currentPage === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#0B132B' }}>Welcome back, Sneha! 👋</h2>
                  <p style={{ color: '#666', margin: '5px 0 0 0' }}>Your safety score is optimal. All trusted contacts are synced.</p>
                </div>
                <button onClick={triggerSos} style={{ padding: '15px 25px', backgroundColor: '#FF70A6', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>🚨 SOS EMERGENCY</button>
              </div>
            </div>
          )}

          {currentPage === 'sos' && (
            <div style={{ maxWidth: '500px', margin: '40px auto', backgroundColor: '#fff', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h2 style={{ color: '#0B132B' }}>Emergency SOS Center</h2>
              <p style={{ color: '#666' }}>Clicking the button below simulates an emergency alert transmission.</p>
              <button onClick={triggerSos} style={{ width: '100%', padding: '20px', backgroundColor: '#FF70A6', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>TRIGGER DEMO SOS ALERT</button>
            </div>
          )}

          {currentPage === 'journey' && (
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ color: '#0B132B' }}>Safe Journey Tracker (DEMO)</h2>
              <input type="text" placeholder="Enter destination address..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '15px' }} />
            </div>
          )}

          {currentPage === 'contacts' && (
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ color: '#0B132B' }}>Trusted Guardians</h2>
              <p style={{ color: '#666' }}>• Aadi (Brother)<br/>• Supreeti (Pre Di)</p>
            </div>
          )}

          {currentPage === 'profile' && (
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#E0AAFF', color: '#0B132B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 15px auto' }}>S</div>
              <h2 style={{ margin: 0, color: '#0B132B' }}>Sneha</h2>
              <p style={{ color: '#666' }}>BTech AIML Student • Community Member</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}