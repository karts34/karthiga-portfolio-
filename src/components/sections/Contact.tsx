import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import '../../styles/contact.css';

type Fields = { name: string; email: string; subject: string; message: string };
type FormNotice = { type: 'success' | 'error'; text: string };
const emptyFields: Fields = { name: '', email: '', subject: '', message: '' };

function createSubmissionId() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return [...bytes].map((byte, index) => `${[4, 6, 8, 10].includes(index) ? '-' : ''}${byte.toString(16).padStart(2, '0')}`).join('');
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [notice, setNotice] = useState<FormNotice | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [website, setWebsite] = useState('');
  const [submissionId, setSubmissionId] = useState(createSubmissionId);
  const form = useRef<HTMLFormElement>(null);
  const formatted = `From: ${fields.name.trim()} (${fields.email.trim()})\nSubject: ${fields.subject.trim()}\n\n${fields.message.trim()}`;
  const validate = () => {
    const next: Partial<Fields> = {};
    if (!fields.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.';
    if (!fields.subject.trim()) next.subject = 'Please add a subject.';
    if (fields.message.trim().length < 10) next.message = 'Please write at least 10 characters.';
    setErrors(next);
    setNotice(null);
    if (Object.keys(next).length) {
      const key = Object.keys(next)[0];
      form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      return false;
    }
    return true;
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting || !validate()) return;
    setIsSubmitting(true);
    setCopyStatus('');
    setCopyFailed(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, website, submissionId }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        if (result?.fields && typeof result.fields === 'object') {
          setErrors(previous => ({ ...previous, ...result.fields }));
        }
        throw new Error(typeof result?.error === 'string' ? result.error : 'Your message could not be sent. Please try again.');
      }
      setFields(emptyFields);
      setWebsite('');
      setSubmissionId(createSubmissionId());
      setNotice({ type: 'success', text: "Your message has been sent successfully! I'll get back to you soon." });
    } catch (error) {
      const message = error instanceof Error && error.message !== 'Failed to fetch'
        ? error.message
        : 'We could not connect to the contact service. Your message is still here; please try again shortly.';
      setNotice({ type: 'error', text: message });
    } finally {
      setIsSubmitting(false);
    }
  };
  const copy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopyFailed(false);
      setCopyStatus('Copied successfully');
    } catch {
      setCopyFailed(true);
      setNotice({ type: 'error', text: 'Clipboard access is unavailable. Select and copy your prepared message below.' });
    }
  };
  const update = (key: keyof Fields, value: string) => {
    setFields(previous => ({ ...previous, [key]: value }));
    setSubmissionId(createSubmissionId());
    setErrors(previous => ({ ...previous, [key]: undefined }));
    setNotice(null);
    setCopyStatus('');
    setCopyFailed(false);
  };
  return <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
    <div className="contact-planet" aria-hidden="true" />
    <div className="container contact-grid">
      <div className="contact-copy reveal-on-scroll">
        <p className="section-kicker">06 / MAKE CONTACT</p>
        <h2 id="contact-title" className="section-heading">Let’s build the<br />next universe<br /><span>together.</span></h2>
        <p className="section-intro">A curious idea. A meaningful project. A new possibility. Every great collaboration starts with a conversation.</p>
        <a className="contact-email" href={`mailto:${personalInfo.socialLinks.email}`}>{personalInfo.socialLinks.email}<ArrowUpRight size={20} /></a>
        <a className="contact-phone" href={`tel:${personalInfo.contact.phoneTel}`}><Phone size={15} />{personalInfo.contact.phone}</a>
        <div className="contact-social"><a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer"><Github size={18} />GitHub<ArrowUpRight size={14} /></a><a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn<ArrowUpRight size={14} /></a></div>
      </div>
      <div className="contact-form-panel reveal-on-scroll">
        <div className="form-heading"><span className="small-orbit"><Mail size={20} /></span><div><h3>Start a conversation</h3><p>Tell me what you have in mind.</p></div></div>
        <form ref={form} onSubmit={submit} noValidate aria-busy={isSubmitting}>
          <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field blank</label><input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></div>
          <div className="form-pair">{(['name', 'email'] as const).map(key => <div className="form-field" key={key}>
            <label htmlFor={`contact-${key}`}>Your {key} <span>*</span></label>
            <input id={`contact-${key}`} name={key} type={key === 'email' ? 'email' : 'text'} autoComplete={key} required maxLength={key === 'email' ? 254 : 120} placeholder={key === 'name' ? 'Your name' : 'you@example.com'} value={fields[key]} onChange={e => update(key, e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} disabled={isSubmitting} />
            {errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}
          </div>)}</div>
          <div className="form-field"><label htmlFor="contact-subject">Subject <span>*</span></label><input id="contact-subject" name="subject" required maxLength={160} placeholder="A project, an opportunity, a hello…" value={fields.subject} onChange={e => update('subject', e.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} disabled={isSubmitting} />{errors.subject && <p className="field-error" id="subject-error">{errors.subject}</p>}</div>
          <div className="form-field"><label htmlFor="contact-message">Your message <span>*</span></label><textarea id="contact-message" name="message" required rows={4} maxLength={2500} placeholder="Let’s turn an idea into something real." value={fields.message} onChange={e => update('message', e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} disabled={isSubmitting} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
          <button type="submit" className="button button-primary form-submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Start a conversation'} <ArrowUpRight size={18} /></button>
          <div className="form-note"><span>Sends directly to my inbox.</span><div className="form-note-actions"><span className="form-copy-status" role="status">{copyStatus}</span><button type="button" onClick={copy}><Copy size={13} />Copy instead</button></div></div>
        </form>
        <p role="status" aria-live="polite" className="form-status" data-state={notice?.type ?? 'empty'}>{notice?.text ?? ''}</p>
        {copyFailed && <textarea className="copy-fallback" readOnly aria-label="Prepared message to copy" value={formatted} onFocus={event => event.currentTarget.select()} rows={6} />}
      </div>
    </div>
  </section>;
}
