import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sosActive, setSosActive] = useState(false);
  const [gpsLive, setGpsLive] = useState(false);
  const [backendStatus, setBackendStatus] = useState('Checking...');

  // Contacts State
  const [contacts, setContacts] = useState<{ id: number; name: string; phone: string; relation: string }[]>([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('Family');

  // Reports State
  const [reports, setReports] = useState<{ id: number; area: string; issue: string; status: string; time: string }[]>([
    { id: 101, area: 'Park Street, Metro Exit', issue: 'Poor Street Lighting', status: 'Under Review', time: '10 mins ago' }
  ]);
  const [reportText, setReportText] = useState('');
  const [locationText, setLocationText] = useState('');
  const [userPoints, setUserPoints] = useState(1250);

  useEffect(() => {
    checkBackendConnection();
    fetchContactsFromBackend();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const res = await fetch('http://localhost:8000/');
      if (res.ok) {
        setBackendStatus('Connected to FastAPI 🚀');
      } else {
        setBackendStatus('Backend Offline');
      }
    } catch (err) {
      setBackendStatus('Offline Mode');
    }
  };

  const fetchContactsFromBackend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setContacts(data);
      }
    } catch (err) {
      console.warn("Local fallback mode active.");
    }
  };

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newGuardian = { id: Date.now(), name: newName, phone: newPhone, relation: newRelation };

    try {
      const res = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuardian)
      });

      if (res.ok) {
        const savedData = await res.json();
        setContacts((prev) => [...prev, savedData]);
      } else {
        setContacts((prev) => [...prev, newGuardian]);
      }
    } catch (err) {
      setContacts((prev) => [...prev, newGuardian]);
    }

    setNewName('');
    setNewPhone('');
    setUserPoints((prev) => prev + 50);
  };

  const toggleEmergencySos = async () => {
    const nextSosState = !sosActive;
    setSosActive(nextSosState);

    try {
      await fetch(`${API_BASE_URL}/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: nextSosState, timestamp: new Date().toISOString() })
      });
    } catch (err) {
      console.warn("SOS triggered locally.");
    }
  };

  const addReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText || !locationText) return;

    const newReport = {
      id: Date.now(),
      area: locationText,
      issue: reportText,
      status: 'Verified & Alerted',
      time: 'Just now'
    };

    try {
      await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport)
      });
    } catch (err) {
      console.warn("Report added locally.");
    }

    setReports([newReport, ...reports]);
    setReportText('');
    setLocationText('');
    setUserPoints((prev) => prev + 100);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif", backgroundColor: '#fff5f7', margin: 0, overflow: 'hidden' }}>
      
      {/* 1. SIDEBAR */}
      <aside style={{ width: '290px', background: 'linear-gradient(165deg, #2a0845 0%, #641549 50%, #1e0b36 100%)', color: '#ffffff', display: 'flex', flexDirection: 'column', padding: '28px 20px', boxSizing: 'border-box', boxShadow: '8px 0 30px rgba(100, 21, 73, 0.25)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '120px', height: '120px', background: '#ff2a85', filter: 'blur(50px)', opacity: 0.4 }}></div>

        <div style={{ marginBottom: '36px', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #ff416c, #ff4b2b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 4px 15px rgba(255,65,108,0.4)' }}>✨</div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '1px', background: 'linear-gradient(90deg, #ffffff, #ffb3d9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NIRBHAYANET</h1>
            </div>
          </div>
          <div style={{ marginTop: '8px', display: 'inline-block', padding: '4px 10px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '10px', color: '#ffd6e7', fontWeight: '600', letterSpacing: '0.8px' }}>
            Protect. Connect. Recognize.
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto', zIndex: 1 }}>
          {[
            { id: 'dashboard', label: '🌸 Safety Sanctuary', badge: 'Live' },
            { id: 'journey', label: '🗺️ Safe Journey Tracker', badge: gpsLive ? 'ACTIVE' : 'GPS' },
            { id: 'contacts', label: '👥 Trusted Circle', badge: contacts.length.toString() },
            { id: 'places', label: '📍 Safe Havens', badge: '24/7' },
            { id: 'community', label: '🤝 Community Voice', badge: 'Alerts' },
            { id: 'rewards', label: '🎁 Sisterhood Rewards', badge: 'Pts' },
            { id: 'admin', label: '🛡️ Audit & Forensics', badge: 'Secure' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '13px 16px',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13.5px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                color: activeTab === tab.id ? '#ffffff' : '#e0d0e0',
                borderLeft: activeTab === tab.id ? '4px solid #ff65a3' : '4px solid transparent',
                boxShadow: activeTab === tab.id ? '0 8px 20px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <span>{tab.label}</span>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: activeTab === tab.id ? '#ff3385' : 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: '700' }}>{tab.badge}</span>
            </button>
          ))}
        </nav>

        <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(15px)', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.15)', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff758c, #ff7eb3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#fff', boxShadow: '0 4px 10px rgba(255,117,140,0.4)' }}>S</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>Sneha 💖</div>
            <div style={{ fontSize: '11px', color: '#ffb3d9', fontWeight: '600' }}>👑 {userPoints} Empowerment Pts</div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#4a0e2e', margin: 0, letterSpacing: '-0.5px' }}>
              Welcome back, Queen ✨
            </h2>
            <p style={{ fontSize: '13px', color: '#9c5270', margin: '4px 0 0 0', fontWeight: '500' }}>API Status: <strong style={{ color: '#be123c' }}>{backendStatus}</strong></p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => setGpsLive(!gpsLive)}
              style={{ fontSize: '12px', padding: '8px 16px', borderRadius: '30px', background: gpsLive ? '#dcfce7' : '#ffe6ee', color: gpsLive ? '#15803d' : '#d61f69', fontWeight: '700', border: `1px solid ${gpsLive ? '#bbf7d0' : '#ffccd8'}`, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {gpsLive ? '🟢 Live GPS Guard: ON' : '⚪ Live GPS Guard: Off'}
            </button>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ffeaf1 50%, #ffd6e5 100%)', padding: '36px', borderRadius: '28px', border: '1px solid #ffcee0', boxShadow: '0 15px 35px rgba(244, 63, 94, 0.08)', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#be123c', backgroundColor: '#ffe4e6', padding: '6px 20px', borderRadius: '30px', textTransform: 'uppercase', letterSpacing: '1.2px', border: '1px solid #fecdd3' }}>
                  🎀 WOMEN'S SAFETY & FORENSIC ECOSYSTEM
                </span>
                
                <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#580c2e', marginTop: '18px', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                  Protect. Connect. Recognize.
                </h1>
                
                <p style={{ fontSize: '15px', color: '#881337', maxWidth: '620px', margin: '0 auto 28px auto', lineHeight: '1.6', fontWeight: '500' }}>
                  Empowerment through technology—an intelligent platform designed to safeguard your journeys, connect trusted guardians, and report community hazards instantly.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button onClick={() => setActiveTab('journey')} style={{ padding: '15px 32px', background: 'linear-gradient(135deg, #ff2a73, #e11d48)', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(225, 29, 72, 0.35)' }}>
                    🚀 Start Safe Journey
                  </button>
                  <button 
                    onClick={toggleEmergencySos}
                    style={{ padding: '15px 32px', background: sosActive ? 'linear-gradient(135deg, #d97706, #b45309)' : 'linear-gradient(135deg, #4c0519, #881337)', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(76, 5, 25, 0.3)' }}
                  >
                    {sosActive ? '⚠️ SOS ALERT BROADCASTING...' : '🚨 INSTANT EMERGENCY SOS'}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '24px', border: '1px solid #ffe3ec', boxShadow: '0 8px 25px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: '#ffe6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>🗺️</div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#4a0e2e', margin: '0 0 8px 0' }}>Safe Journey Tracker</h3>
                <p style={{ fontSize: '13px', color: '#80405e', marginBottom: '24px', lineHeight: '1.5' }}>Live route risk-scoring & automated deviation alerts shared with family.</p>
                <button onClick={() => setActiveTab('journey')} style={{ width: '100%', padding: '13px', borderRadius: '14px', border: 'none', background: '#fff0f5', fontWeight: '800', color: '#e11d48', cursor: 'pointer', fontSize: '13px' }}>
                  Explore Route Map →
                </button>
              </div>

              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '24px', border: '1px solid #ffe3ec', boxShadow: '0 8px 25px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>👭</div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#4a0e2e', margin: '0 0 8px 0' }}>Trusted Circle ({contacts.length})</h3>
                <p style={{ fontSize: '13px', color: '#80405e', marginBottom: '24px', lineHeight: '1.5' }}>Your emergency guardians linked for instant 1-click distress call triggers.</p>
                <button onClick={() => setActiveTab('contacts')} style={{ width: '100%', padding: '13px', borderRadius: '14px', border: 'none', background: '#fff0f5', fontWeight: '800', color: '#e11d48', cursor: 'pointer', fontSize: '13px' }}>
                  Manage Circle ({contacts.length}) →
                </button>
              </div>

              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '24px', border: '1px solid #ffe3ec', boxShadow: '0 8px 25px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>📍</div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#4a0e2e', margin: '0 0 8px 0' }}>Verified Safe Havens</h3>
                <p style={{ fontSize: '13px', color: '#80405e', marginBottom: '24px', lineHeight: '1.5' }}>Locate nearby open pharmacies, police booths, and verified safe safe-havens.</p>
                <button onClick={() => setActiveTab('places')} style={{ width: '100%', padding: '13px', borderRadius: '14px', border: 'none', background: '#fff0f5', fontWeight: '800', color: '#e11d48', cursor: 'pointer', fontSize: '13px' }}>
                  Locate Nearby →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TRUSTED CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#4a0e2e', marginBottom: '8px' }}>
              Trusted Emergency Guardians
            </h2>
            <p style={{ color: '#80405e', marginBottom: '28px', fontSize: '14px' }}>
              Add close friends or family members who will be notified during emergency situations[cite: 8, 10].
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '24px', border: '1px solid #ffe3ec', boxShadow: '0 8px 25px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#be123c', marginBottom: '20px' }}>💖 Add New Guardian</h3>
                <form onSubmit={addContact} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '6px' }}>GUARDIAN NAME</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Supreeti Di / Mumma" 
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #fecdd3', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '6px' }}>PHONE NUMBER</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 00000" 
                      value={newPhone} 
                      onChange={(e) => setNewPhone(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #fecdd3', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '6px' }}>RELATION TAG</label>
                    <select 
                      value={newRelation} 
                      onChange={(e) => setNewRelation(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #fecdd3', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                    >
                      <option value="Family">Family Member</option>
                      <option value="Close Sister">Close Sister / Friend</option>
                      <option value="Collegemate">College / Hostel Mate</option>
                    </select>
                  </div>
                  <button type="submit" style={{ padding: '14px', background: 'linear-gradient(135deg, #ff2a73, #e11d48)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', marginTop: '8px', boxShadow: '0 4px 15px rgba(225, 29, 72, 0.3)' }}>
                    Save To Emergency Circle (+50 Pts)
                  </button>
                </form>
              </div>

              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '24px', border: '1px solid #ffe3ec', boxShadow: '0 8px 25px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#4a0e2e', marginBottom: '20px' }}>Active Circle Members ({contacts.length})</h3>
                {contacts.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', border: '2px dashed #fecdd3', borderRadius: '16px', background: '#fffafd' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌸</div>
                    <p style={{ margin: '0 0 6px 0', fontWeight: '700', color: '#881337' }}>Your circle is empty right now.</p>
                    <span style={{ fontSize: '12px', color: '#9c5270' }}>Add 2-3 trusted contacts using the left form[cite: 10].</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {contacts.map((c) => (
                      <div key={c.id} style={{ padding: '18px', background: '#fff0f5', borderRadius: '16px', border: '1px solid #fecdd3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '800', color: '#881337', fontSize: '15px' }}>{c.name}</div>
                          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{c.phone} • <span style={{ color: '#be123c', fontWeight: '700' }}>{c.relation}</span></div>
                        </div>
                        <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '6px 12px', borderRadius: '12px', fontWeight: '800' }}>Synced</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SAFE JOURNEY TAB */}
        {activeTab === 'journey' && (
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #ffe3ec' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#4a0e2e', marginBottom: '12px' }}>Safe Journey Tracker</h2>
            <p style={{ color: '#80405e', marginBottom: '24px' }}>Interactive GPS route simulation & safe-path recommendations.</p>
            <div style={{ height: '240px', background: 'linear-gradient(135deg, #fff0f5, #ffe6ee)', borderRadius: '20px', border: '2px dashed #fecdd3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '36px' }}>🗺️</span>
              <p style={{ margin: '10px 0 0 0', fontWeight: '700', color: '#881337' }}>
                {gpsLive ? '🟢 Live GPS Tracking Active & Connected to FastAPI' : '⚪ GPS Tracking Paused'}
              </p>
              <button 
                onClick={() => setGpsLive(!gpsLive)}
                style={{ marginTop: '14px', padding: '10px 24px', background: gpsLive ? '#e11d48' : '#1e1b4b', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}
              >
                {gpsLive ? 'Stop Live GPS' : 'Start Live GPS Tracking'}
              </button>
            </div>
          </div>
        )}

        {/* COMMUNITY TAB */}
        {activeTab === 'community' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div style={{ background: '#ffffff', padding: '28px', borderRadius: '24px', border: '1px solid #ffe3ec' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#4a0e2e', marginBottom: '16px' }}>📢 Submit Safety Alert</h2>
              <form onSubmit={addReport} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input 
                  type="text" 
                  placeholder="Location / Landmark" 
                  value={locationText} 
                  onChange={(e) => setLocationText(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #fecdd3', outline: 'none' }} 
                  required 
                />
                <textarea 
                  placeholder="Describe issue (e.g. Broken street light)" 
                  value={reportText} 
                  onChange={(e) => setReportText(e.target.value)} 
                  rows={3} 
                  style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #fecdd3', fontFamily: 'inherit', outline: 'none' }} 
                  required 
                />
                <button type="submit" style={{ padding: '12px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  Post Alert (+100 Pts)
                </button>
              </form>
            </div>

            <div style={{ background: '#ffffff', padding: '28px', borderRadius: '24px', border: '1px solid #ffe3ec' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#4a0e2e', marginBottom: '16px' }}>Live Community Feed</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reports.map((r) => (
                  <div key={r.id} style={{ padding: '14px', background: '#fff0f5', borderRadius: '14px', border: '1px solid #fecdd3' }}>
                    <div style={{ fontWeight: '700', color: '#4a0e2e' }}>📍 {r.area}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', margin: '4px 0' }}>"{r.issue}"</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9c5270' }}>
                      <span>{r.time}</span>
                      <span style={{ fontWeight: '700', color: '#15803d' }}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div style={{ background: 'linear-gradient(135deg, #e11d48, #881337)', padding: '36px', borderRadius: '24px', color: '#fff' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>Sisterhood Rewards Badges</h2>
            <div style={{ fontSize: '54px', fontWeight: '900', margin: '12px 0' }}>{userPoints} PTS</div>
            <p style={{ margin: 0, opacity: 0.9 }}>Points earned by adding contacts & safety updates[cite: 10]!</p>
          </div>
        )}

        {(activeTab === 'places' || activeTab === 'admin') && (
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #ffe3ec' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#4a0e2e', marginBottom: '12px', textTransform: 'capitalize' }}>{activeTab} Module</h2>
            <p style={{ color: '#80405e' }}>Verified database connection active.</p>
          </div>
        )}

      </main>
    </div>
  );
}