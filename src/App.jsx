import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const IDEA_BANK = [
  { 
    cat: "Postural & Physical Obedience", 
    tasks: [
      "Maintain kneeling posture flat on the floor for 30 consecutive minutes", 
      "Kneel upright with hands locked behind your back until formally dismissed", 
      "Spend 20 minutes in strict kneeling posture while maintaining complete silence",
      "Kneel at her feet unmoving during the entirety of her next phone update",
      "Execute a 45-minute posture endurance log with arms fully extended"
    ] 
  },
  { 
    cat: "Gag & Verbal Restriction", 
    tasks: [
      "Secure the gag tightly and complete 20 minutes of silent tolerance tracking", 
      "Log a 30-minute session remaining fully gagged while processing domestic chores", 
      "Keep the gag active and secure for 15 minutes while listening to her audio commands",
      "Complete an extended 40-minute gag restriction run, logging intermediate comfort checks",
      "Endure strict verbal lockout protocol while maintaining the kneeling profile"
    ] 
  },
  { 
    cat: "Chastity, Denial & Relinquishment", 
    tasks: [
      "Lock into restriction immediately and log a fresh 72-hour denial block", 
      "Submit a formal request documenting your current consecutive days denied", 
      "Acknowledge her absolute, unmitigated ownership of your release schedule",
      "Surrender all personal boundary controls for the entirety of the upcoming week",
      "Log a strict hands-off verification report every 12 hours without exception"
    ] 
  },
  { 
    cat: "Cuckoldry & Dynamic Exploration", 
    tasks: [
      "Log a detailed entry acknowledging her real-life relationship and external dates", 
      "Review and document your specific service rules regarding her outside encounters", 
      "Complete a mindset task focusing on bisexual submission boundaries for her pleasure",
      "Write out 50 lines reinforcing your status as her obedient sissy assistant",
      "Log a validation report celebrating her complete independence and freedom with other partners"
    ] 
  }
];

export default function App() {
  const [role, setRole] = useState(null)
  const [instructions, setInstructions] = useState([])
  const [history, setHistory] = useState([])
  const [milestones, setMilestones] = useState([])

  const [activityType, setActivityType] = useState('Kneeling Session')
  const [duration, setDuration] = useState('')
  const [logNotes, setLogNotes] = useState('')
  const [milestoneType, setMilestoneType] = useState('Subject Orgasm')
  const [milestoneNotes, setMilestoneNotes] = useState('')

  useEffect(() => {
    if (role) {
      fetchData()
      const channel = supabase.channel('laura-updates')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => fetchData())
        .subscribe()
      return () => supabase.removeChannel(channel)
    }
  }, [role])

  async function fetchData() {
    const { data: inst } = await supabase.from('laura_instructions').select('*').order('id', { ascending: false })
    const { data: hist } = await supabase.from('laura_training_history').select('*').order('id', { ascending: false })
    const { data: mile } = await supabase.from('laura_milestones').select('*').order('id', { ascending: false })
    if (inst) setInstructions(inst)
    if (hist) setHistory(hist)
    if (mile) setMilestones(mile)
  }

  async function handleAddInstruction(text, source) {
    await supabase.from('laura_instructions').insert([{ instruction_text: text, issued_by: source }])
  }

  async function handleLogTraining(e) {
    e.preventDefault()
    if (!duration) return
    await supabase.from('laura_training_history').insert([{ activity_type: activityType, duration_minutes: parseInt(duration), notes: logNotes }])
    setDuration(''); setLogNotes('')
  }

  async function handleLogMilestone(e) {
    e.preventDefault()
    await supabase.from('laura_milestones').insert([{ record_type: milestoneType, notes: milestoneNotes }])
    setMilestoneNotes('')
  }

  if (!role) {
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: 'monospace', backgroundColor: '#0d0714', color: '#bfa6e6', minHeight: '100vh' }}>
        <h1 style={{ color: '#d4af37', fontSize: '2.5rem' }}>🔮 LAURA'S TRAINING TERMINAL</h1>
        <p style={{ color: '#8b72b3' }}>System initialization complete. Select operations deck below.</p>
        <div style={{ marginTop: '40px' }}>
          <button onClick={() => setRole('subject')} style={{ padding: '15px 30px', marginRight: '15px', cursor: 'pointer', backgroundColor: '#341f54', color: '#fff', border: '1px solid #6b46b2', borderRadius: '4px', fontSize: '1rem', fontFamily: 'monospace' }}>🛡️ Open Subject Training Deck</button>
          <button onClick={() => {
            const pass = prompt("Enter Goddess Verification Key:")
            if (pass === 'Laura') setRole('goddess')
            else alert("Verification Failed.")
          }} style={{ padding: '15px 30px', cursor: 'pointer', backgroundColor: '#d4af37', color: '#0d0714', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>👑 Goddess Portal Access</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#0d0714', color: '#dcd3eb', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #d4af37', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ color: '#d4af37', margin: 0, fontSize: '1.8rem' }}>
          {role === 'goddess' ? '👑 CONTROL PORTAL // GODDESS LAURA' : '🛡️ TRAINING LOGS // SISSY CUCKOLD TERMINAL'}
        </h1>
        <button onClick={() => setRole(null)} style={{ backgroundColor: '#a63a50', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'monospace' }}>Disconnect</button>
      </header>

      {/* SUBJECT RECORDING PORTAL */}
      {role === 'subject' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h2 style={{ color: '#9d75e3', borderBottom: '1px solid #341f54', paddingBottom: '5px' }}>⚡ Live Data Ingestion</h2>
            
            <form onSubmit={handleLogTraining} style={{ backgroundColor: '#170e22', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #2b1a3e' }}>
              <h3 style={{ marginTop: 0, color: '#fff' }}>Record Physical Session</h3>
              <label style={{ display: 'block', marginBottom: '5px', color: '#a68ec9' }}>Activity Classification:</label>
              <select value={activityType} onChange={(e) => setActivityType(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0d0714', color: '#fff', border: '1px solid #4d317a', marginBottom: '15px' }}>
                <option value="Kneeling Session">Kneeling Duration Log</option>
                <option value="Gag Session">Gag Tolerance Log</option>
                <option value="Postural Duty">Strict Postural Duty</option>
              </select>
              
              <label style={{ display: 'block', marginBottom: '5px', color: '#a68ec9' }}>Total Duration (Minutes):</label>
              <input type="number" required placeholder="Minutes" value={duration} onChange={(e) => setDuration(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0d0714', color: '#fff', border: '1px solid #4d317a', marginBottom: '15px', boxSizing: 'border-box' }} />
              
              <label style={{ display: 'block', marginBottom: '5px', color: '#a68ec9' }}>Submission Report / Notes:</label>
              <textarea placeholder="Report execution metrics, physical response, or mental state..." value={logNotes} onChange={(e) => setLogNotes(e.target.value)} style={{ width: '100%', height: '80px', padding: '10px', backgroundColor: '#0d0714', color: '#fff', border: '1px solid #4d317a', marginBottom: '15px', boxSizing: 'border-box' }} />
              
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#6b46b2', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Commit Session to Vault</button>
            </form>

            <form onSubmit={handleLogMilestone} style={{ backgroundColor: '#170e22', padding: '20px', borderRadius: '8px', border: '1px solid #2b1a3e' }}>
              <h3 style={{ marginTop: 0, color: '#fff' }}>Record Status & Milestones</h3>
              <label style={{ display: 'block', marginBottom: '5px', color: '#a68ec9' }}>Metric Type:</label>
              <select value={milestoneType} onChange={(e) => setMilestoneType(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0d0714', color: '#fff', border: '1px solid #4d317a', marginBottom: '15px' }}>
                <option value="Subject Orgasm">Orgasm Tracker (Last Reset)</option>
                <option value="Goddess Encounter">Goddess External Date / Encounter</option>
                <option value="Denial Cycle Update">Denial Cycle Tracking Note</option>
              </select>
              
              <label style={{ display: 'block', marginBottom: '5px', color: '#a68ec9' }}>Ledger Ledger Details:</label>
              <textarea placeholder="Input dates, specific timelines, outside encounter notes, or restriction observations..." value={milestoneNotes} onChange={(e) => setMilestoneNotes(e.target.value)} style={{ width: '100%', height: '80px', padding: '10px', backgroundColor: '#0d0714', color: '#fff', border: '1px solid #4d317a', marginBottom: '15px', boxSizing: 'border-box' }} />
              
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#db995a', color: '#0d0714', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Transmit Metric Update</button>
            </form>
          </div>

          <div>
            <h2 style={{ color: '#d4af37', borderBottom: '1px solid #341f54', paddingBottom: '5px' }}>📊 Vault Ledger Stream</h2>
            <div style={{ backgroundColor: '#120c1f', border: '1px solid #341f54', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ marginTop: 0, color: '#d4af37' }}>Active Instructions Archive</h3>
              {instructions.length === 0 ? <p style={{ color: '#666' }}>No active directives recorded.</p> : 
                instructions.map(i => (
                  <div key={i.id} style={{ borderBottom: '1px solid #231438', padding: '10px 0' }}>
                    <span style={{ color: '#fff', fontSize: '1.1rem' }}>"{i.instruction_text}"</span>
                    <br/><small style={{ color: '#8b72b3' }}>Issued by {i.issued_by} • {new Date(i.issued_at).toLocaleDateString()}</small>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* GODDESS PORTAL */}
      {role === 'goddess' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
          <div>
            <h2 style={{ color: '#d4af37', borderBottom: '1px solid #341f54', paddingBottom: '5px' }}>💡 Directive Generator & Idea Bank</h2>
            <p style={{ color: '#a68ec9' }}>Click any preset task to instantly broadcast it down to his active log ledger.</p>
            <div style={{ backgroundColor: '#170e22', padding: '20px', borderRadius: '8px', border: '1px solid #2b1a3e', height: '600px', overflowY: 'auto' }}>
              {IDEA_BANK.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '25px' }}>
                  <h3 style={{ color: '#d4af37', borderBottom: '1px solid #4d317a', paddingBottom: '6px', marginTop: 0 }}>{section.cat}</h3>
                  {section.tasks.map((task, tIdx) => (
                    <button key={tIdx} onClick={() => {
                      handleAddInstruction(task, 'Goddess Laura')
                      alert('Directive dispatched down to terminal.')
                    }} style={{ display: 'block', width: '100%', textAlign: 'left', backgroundColor: '#0d0714', border: '1px solid #4d317a', color: '#e2d9f3', padding: '12px', marginBottom: '8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
                      ⚡ {task}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ color: '#9d75e3', borderBottom: '1px solid #341f54', paddingBottom: '5px' }}>📜 Auditing & Tracking Records</h2>
            
            <div style={{ backgroundColor: '#120c1f', border: '1px solid #2b1a3e', padding: '15px', borderRadius: '8px', marginBottom: '20px', maxHeight: '320px', overflowY: 'auto' }}>
              <h3 style={{ marginTop: 0, color: '#9d75e3' }}>Physical Training Metrics</h3>
              {history.length === 0 ? <p style={{ color: '#666' }}>No entries found.</p> : 
                history.map(h => (
                  <div key={h.id} style={{ padding: '8px 0', borderBottom: '1px solid #231438' }}>
                    <span style={{ color: '#fff' }}>⏳ {h.activity_type}</span>: <strong>{h.duration_minutes} mins</strong>
                    <br/><small style={{ color: '#a68ec9' }}>Report: {h.notes || 'No comments attached.'}</small>
                  </div>
                ))
              }
            </div>

            <div style={{ backgroundColor: '#120c1f', border: '1px solid #2b1a3e', padding: '15px', borderRadius: '8px', maxHeight: '320px', overflowY: 'auto' }}>
              <h3 style={{ marginTop: 0, color: '#db995a' }}>Milestone & Encounter Timeline</h3>
              {milestones.length === 0 ? <p style={{ color: '#666' }}>No logged events.</p> : 
                milestones.map(m => (
                  <div key={m.id} style={{ padding: '8px 0', borderBottom: '1px solid #231438' }}>
                    <span style={{ color: '#fff' }}>👑 {m.record_type}</span>
                    <br/><small style={{ color: '#db995a' }}>Details: {m.notes}</small>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
