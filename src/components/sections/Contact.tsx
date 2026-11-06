import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

type Fields = { name: string; email: string; subject: string; message: string };
export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const formatted = `From: ${fields.name.trim()} (${fields.email.trim()})\nSubject: ${fields.subject.trim()}\n\n${fields.message.trim()}`;
  const validate = () => {
    const next: Partial<Fields> = {};
    if (!fields.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.';
    if (!fields.subject.trim()) next.subject = 'Please add a subject.';
    if (fields.message.trim().length < 10) next.message = 'Please write at least 10 characters.';
    setErrors(next);
    if (Object.keys(next).length) {
      const key = Object.keys(next)[0];
      form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      return false;
    }
    return true;
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    window.location.href = `mailto:${personalInfo.socialLinks.email}?subject=${encodeURIComponent(fields.subject.trim())}&body=${encodeURIComponent(formatted)}`;
    setStatus('Your email draft is ready. Send it from your email app to complete your message. If no app opens, copy your message and email it to the address shown.');
  };
  const copy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopyFailed(false);
      setStatus('Message copied. Paste it into an email or LinkedIn message to send it.');
    } catch {
      setCopyFailed(true);
      setStatus('Clipboard access is unavailable. Select and copy your prepared message below.');
    }
  };
  const update = (key: keyof Fields, value: string) => {
    setFields(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    setStatus('');
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
        <form ref={form} onSubmit={submit} noValidate>
          <div className="form-pair">{(['name', 'email'] as const).map(key => <div className="form-field" key={key}>
            <label htmlFor={`contact-${key}`}>Your {key} <span>*</span></label>
            <input id={`contact-${key}`} name={key} type={key === 'email' ? 'email' : 'text'} autoComplete={key} required maxLength={120} placeholder={key === 'name' ? 'Your name' : 'you@example.com'} value={fields[key]} onChange={e => update(key, e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />
            {errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}
          </div>)}</div>
          <div className="form-field"><label htmlFor="contact-subject">Subject <span>*</span></label><input id="contact-subject" name="subject" required maxLength={160} placeholder="A project, an opportunity, a hello…" value={fields.subject} onChange={e => update('subject', e.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} />{errors.subject && <p className="field-error" id="subject-error">{errors.subject}</p>}</div>
          <div className="form-field"><label htmlFor="contact-message">Your message <span>*</span></label><textarea id="contact-message" name="message" required rows={4} maxLength={2500} placeholder="Let’s turn an idea into something real." value={fields.message} onChange={e => update('message', e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
          <button type="submit" className="button button-primary form-submit">Start a conversation <ArrowUpRight size={18} /></button>
          <div className="form-note"><span>Opens a draft in your email app.</span><button type="button" onClick={copy}><Copy size={13} />Copy instead</button></div>
        </form>
        <p role="status" className="form-status">{status}</p>
        {copyFailed && <textarea className="copy-fallback" readOnly aria-label="Prepared message to copy" value={formatted} onFocus={event => event.currentTarget.select()} rows={6} />}
      </div>
    </div>
  </section>;
}
