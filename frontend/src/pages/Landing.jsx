import { useNavigate } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Download the Extension',
    desc: 'Download the GformA extension ZIP file from the button above and extract it to a folder on your desktop.',
  },
  {
    num: '02',
    title: 'Open Chrome Extensions',
    desc: 'In Chrome, go to the address bar and type chrome://extensions and press Enter.',
  },
  {
    num: '03',
    title: 'Enable Developer Mode',
    desc: 'Toggle on "Developer mode" from the top-right corner of the Extensions page.',
  },
  {
    num: '04',
    title: 'Load the Extension',
    desc: 'Click "Load unpacked" and select the extracted extension folder from your desktop.',
  },
  {
    num: '05',
    title: 'Pin & Use',
    desc: 'Pin GformA from the Chrome extensions menu. Open any Google Forms quiz result page and click the extension icon.',
  },
];

const features = [
  {
    icon: '📊',
    title: 'Auto Score Detection',
    desc: 'Instantly reads your Google Forms quiz result and extracts correct, wrong, and skipped answers.',
  },
  {
    icon: '➗',
    title: 'Negative Marking Calculator',
    desc: 'Supports CDS, UPSC Prelims, AFCAT, SSC CGL, NEET and custom marking schemes.',
  },
  {
    icon: '📈',
    title: 'Dashboard & History',
    desc: 'Track your performance over time with score trends, accuracy stats, and attempt history.',
  },
  {
    icon: '☁️',
    title: 'Cloud Sync',
    desc: 'Save results to your personal dashboard and access them from anywhere.',
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0a0f1e', minHeight: '100vh', color: '#e2e8f0' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid #1e293b' }}>
        <span style={{ fontWeight: 700, fontSize: '20px', color: '#fff', letterSpacing: '-0.5px' }}>
          Gform<span style={{ color: '#6366f1' }}>A</span>
        </span>
        <button
          onClick={() => navigate('/login')}
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
        >
          Login →
        </button>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 24px 80px' }}>
        <div style={{ display: 'inline-block', background: '#1e1b4b', color: '#818cf8', fontSize: '13px', fontWeight: 600, padding: '6px 16px', borderRadius: '100px', marginBottom: '28px', letterSpacing: '0.5px' }}>
          FREE CHROME EXTENSION
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '24px', color: '#fff' }}>
          Know your real score<br />
          <span style={{ color: '#6366f1' }}>before the result day.</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.7 }}>
          GformA detects your Google Forms quiz results and calculates your negative-marking score for CDS, UPSC, AFCAT, SSC, and NEET — instantly.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/Nikk1012/googleform-project/releases/download/v1.0/GformAextension.zip"
            style={{ background: '#6366f1', color: '#fff', textDecoration: 'none', borderRadius: '10px', padding: '14px 32px', fontWeight: 700, fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            ⬇ Download Extension
          </a>
          <button
            onClick={() => navigate('/login')}
            style={{ background: 'transparent', color: '#e2e8f0', border: '1px solid #334155', borderRadius: '10px', padding: '14px 32px', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}
          >
            Open Dashboard
          </button>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 700, marginBottom: '48px', color: '#fff' }}>Everything you need</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px 24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: '#fff' }}>{f.title}</div>
              <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Install Steps */}
      <section style={{ padding: '80px 24px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>How to install</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '15px' }}>
          Since GformA isn't on the Chrome Web Store yet, follow these steps to load it manually.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', gap: '24px', paddingBottom: i < steps.length - 1 ? '0' : '0' }}>
              {/* Left: number + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1e1b4b', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                  {s.num}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: '2px', background: '#1e293b', flex: 1, minHeight: '40px', margin: '4px 0' }} />
                )}
              </div>
              {/* Right: content */}
              <div style={{ paddingBottom: '32px', paddingTop: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '80px 24px 100px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Ready to get started?</h2>
        <p style={{ color: '#64748b', marginBottom: '36px', fontSize: '16px' }}>Download the extension and start tracking your scores today.</p>
        <a
          href="https://github.com/Nikk1012/googleform-project/releases/download/v1.0/GformAextension.zip"
          style={{ background: '#6366f1', color: '#fff', textDecoration: 'none', borderRadius: '10px', padding: '14px 36px', fontWeight: 700, fontSize: '16px' }}
        >
          ⬇ Download GformA
        </a>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontWeight: 700, color: '#fff' }}>Gform<span style={{ color: '#6366f1' }}>A</span></span>
        <span style={{ color: '#475569', fontSize: '13px' }}>Built for CDS • UPSC • AFCAT • SSC • NEET aspirants</span>
      </footer>
    </div>
  );
};

export default Landing;
