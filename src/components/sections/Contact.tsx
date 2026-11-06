import React, { useState } from 'react';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Phone,
  PhoneCall
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
    details?: string;
  } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) errs.name = 'Please provide your name.';

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const configuredEmail = personalInfo.socialLinks.email.trim();

    if (configuredEmail) {
      const mailtoUrl = `mailto:${configuredEmail}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setStatusMessage({
        type: 'success',
        text: 'Opening your default email application with this prepared message!',
        details: `Recipient: ${configuredEmail}`
      });
    } else {
      setStatusMessage({
        type: 'info',
        text: 'Form validated successfully! Direct messaging fallback prepared.',
        details: 'Because no private email is hardcoded into the client, you can copy your formatted message below or connect directly via LinkedIn / GitHub.'
      });
    }
  };

  const handleCopyMessage = () => {
    const textToCopy = `From: ${formData.name} (${formData.email})\nSubject: ${formData.subject}\n\n${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-1 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,rgba(165,107,255,0.1)_0%,rgba(99,48,160,0.05)_42%,rgba(50,16,82,0.03)_68%,transparent_82%)] blur-[140px] animate-hero-pulse" />
        <div className="absolute top-1/3 right-[15%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[radial-gradient(circle,rgba(165,107,255,0.04)_0%,transparent_70%)] blur-[100px]" />

        {/* Decorative portal rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-violet/15 opacity-35 hidden sm:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-lavender/8 opacity-20 border-dashed hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-xs font-semibold text-lavender uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Have an Idea? Let's Create Something <span className="text-cosmic-shimmer">Extraordinary</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Have an idea, a project, or an opportunity? Let's connect and build something meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Direct Connect */}
          <div className="lg:col-span-5 space-y-6 reveal-on-scroll">

            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-subtle">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lavender" />
                <span>Connect Across the Orbit</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                I am actively seeking internship opportunities, collaborative hackathons, and creative technology projects. Reach out via LinkedIn or inspect recent source repositories on GitHub.
              </p>

              <div className="space-y-3">
                {/* Phone Card */}
                <a
                  href={`tel:${personalInfo.contact.phoneTel}`}
                  className="p-4 rounded-2xl bg-gradient-to-r from-violet/15 via-[#0e0a1e] to-surface border border-violet/35 hover:border-violet text-white transition-all flex items-center justify-between group cursor-pointer shadow-lg shadow-violet/10 hover:shadow-violet/15 hover:-translate-y-0.5"
                  aria-label={`Call Karthiga S. at ${personalInfo.contact.phone}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-violet/20 border border-violet/35 flex items-center justify-center text-lavender group-hover:bg-violet group-hover:text-white group-hover:scale-105 transition-all shadow-inner">
                      <PhoneCall className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-lavender font-semibold uppercase tracking-wider">Call Me</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-violet/15 text-lavender border border-violet/30">
                          Direct Line
                        </span>
                      </div>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-lavender transition-colors font-mono">
                        {personalInfo.contact.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet/15 border border-violet/25 text-xs font-semibold text-lavender group-hover:bg-violet group-hover:text-white transition-all">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-surface/80 hover:bg-surface-raised border border-border-subtle hover:border-violet transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet/15 border border-violet/30 flex items-center justify-center text-violet group-hover:scale-105 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block font-medium">LinkedIn Network</span>
                      <span className="text-sm font-semibold text-white group-hover:text-lavender transition-colors">
                        karthiga-saravanan
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* GitHub */}
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-surface/80 hover:bg-surface-raised border border-border-subtle hover:border-violet transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet/15 border border-violet/30 flex items-center justify-center text-lavender group-hover:scale-105 transition-transform">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block font-medium">GitHub Repositories</span>
                      <span className="text-sm font-semibold text-white group-hover:text-lavender transition-colors">
                        karts34
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-5 rounded-2xl bg-surface-raised/70 border border-violet/20 text-xs text-text-muted leading-relaxed">
              <span className="font-semibold text-white block mb-1">
                Transparency & Security
              </span>
              No server credentials or private passwords are exposed in this client workspace. To link a direct email address, simply configure the <code className="text-lavender">email</code> field in <code className="text-lavender">src/data/personalInfo.ts</code>.
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 reveal-on-scroll">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-subtle relative">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Your Name <span className="text-violet">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-sm text-white placeholder:text-text-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet ${
                      errors.name ? 'border-rose-500/80 bg-rose-950/10' : 'border-border-subtle focus:border-violet'
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Your Email <span className="text-violet">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-sm text-white placeholder:text-text-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet ${
                      errors.email ? 'border-rose-500/80 bg-rose-950/10' : 'border-border-subtle focus:border-violet'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Subject <span className="text-violet">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    placeholder="e.g. Project Collaboration / Internship Opportunity"
                    className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-sm text-white placeholder:text-text-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet ${
                      errors.subject ? 'border-rose-500/80 bg-rose-950/10' : 'border-border-subtle focus:border-violet'
                    }`}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                    Message <span className="text-violet">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Share your thoughts, project overview, or message..."
                    className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-sm text-white placeholder:text-text-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet resize-y ${
                      errors.message ? 'border-rose-500/80 bg-rose-950/10' : 'border-border-subtle focus:border-violet'
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet via-[#8a4af0] to-nebula hover:brightness-110 text-white font-semibold text-sm transition-all shadow-lg shadow-violet/30 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>

              {/* Status */}
              {statusMessage && (
                <div className={`mt-5 p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
                  statusMessage.type === 'success'
                    ? 'bg-violet/10 border-violet/30 text-lavender'
                    : 'bg-surface-raised border-violet/30 text-text-secondary'
                }`}>
                  <div className="flex items-start gap-2.5 mb-2">
                    {statusMessage.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-lavender flex-shrink-0 mt-0.5" />
                    ) : (
                      <MessageSquare className="w-4 h-4 text-lavender flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="text-white block font-medium">{statusMessage.text}</strong>
                      {statusMessage.details && (
                        <p className="text-text-secondary mt-1">{statusMessage.details}</p>
                      )}
                    </div>
                  </div>

                  {statusMessage.type === 'info' && (
                    <div className="mt-3 pt-3 border-t border-border-subtle flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleCopyMessage}
                        className="px-3.5 py-1.5 rounded-lg bg-surface border border-violet/30 hover:border-violet text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-lavender" />
                        <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Formatted Message'}</span>
                      </button>
                      <span className="text-[11px] text-text-muted">
                        Paste directly into LinkedIn message
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
