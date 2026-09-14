"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PROJECT_LABELS, PROJECT_TIMELINES, PROJECT_TYPES, validateProjectStep, type AuditErrors, type AuditField, type AuditLang, type ProjectDraft } from "@/lib/audit-request";
import styles from "./AnalysisForm.module.css";
import { useAnalysisSession } from "./AnalysisSession";

const COPY = {
  de: {
    steps: ["Unternehmen", "Vorhaben", "Kontakt"], progress: "Schritte zur Analyse", step: "Schritt",
    titles: ["Für wen schauen wir hin?", "Was soll sich verändern?", "Mit wem spreche ich?"],
    intros: ["Ein kurzer Einblick in dein Unternehmen hilft mir, die Analyse vorzubereiten.", "Die Richtung genügt. Was die Webseite im Detail braucht, klären wir gemeinsam.", "Ich lese deine Angaben und melde mich persönlich per E-Mail bei dir. Ilja."],
    company: "Unternehmen oder Marke", companyPlaceholder: "Name deines Unternehmens",
    industry: "Branche", industryPlaceholder: "Zum Beispiel Industrieberatung oder Architektur",
    url: "Aktuelle Webseite", urlPlaceholder: "deine-seite.de", noWebsite: "Wir haben noch keine Webseite",
    noWebsiteHint: "Dann schauen wir auf dein Angebot, deine Zielgruppe und den geplanten Auftritt.",
    projectType: "Worum geht es?", choose: "Bitte auswählen",
    audience: "Wen willst du erreichen?", audiencePlaceholder: "Zum Beispiel Geschäftsführungen im Mittelstand", audienceHint: "Wenn deine Zielgruppe noch nicht klar ist, schreib es dazu.",
    goal: "Was soll die Webseite für dein Unternehmen verändern?", goalPlaceholder: "Zum Beispiel: Unser Auftritt soll die Qualität unserer Beratung zeigen und mehr passende Anfragen bringen.", goalHint: "Ein bis drei Sätze reichen. Was fehlt heute, und was wünschst du dir?",
    timeline: "Wann möchtest du das angehen?", name: "Dein Name", namePlaceholder: "Vor- und Nachname",
    role: "Deine Rolle im Unternehmen", rolePlaceholder: "Zum Beispiel Geschäftsführung oder Marketingleitung",
    email: "Deine E-Mail", emailPlaceholder: "du@firma.de",
    consent: "Ich bin einverstanden, dass meine Angaben zur Vorbereitung der Analyse und zur persönlichen Kontaktaufnahme verarbeitet werden. Details in der", privacy: "Datenschutzerklärung",
    back: "Zurück", next: "Weiter", send: "Kostenlose Analyse anfragen", sending: "Wird gesendet …",
    required: "Alle Angaben sind erforderlich. Die Zielgruppe und der Zeitpunkt dürfen noch offen sein.",
    summary: "Deine Anfrage für", edit: "Angaben ansehen", reassurance: "Kostenlos und unverbindlich. Ein Projekt beauftragst du damit noch nicht.",
    successTitle: "Deine Anfrage ist angekommen.", successText: "Ich schaue mir dein Vorhaben persönlich an und melde mich unter der angegebenen E-Mail-Adresse, um die Analyse und unser Gespräch abzustimmen. Ilja.", successLink: "Auf der Webseite weiterlesen",
    error: "Deine Anfrage konnte gerade nicht gespeichert werden. Deine Angaben bleiben hier erhalten. Versuch es erneut oder schreib mir an sabala@sabala-mentoring.com.",
  },
  en: {
    steps: ["Company", "Project", "Contact"], progress: "Steps to your analysis", step: "Step",
    titles: ["Who are we looking at?", "What would you like to change?", "Who will I be speaking with?"],
    intros: ["A little context about your company helps me prepare the analysis.", "A direction is enough for now. We will work out the details together.", "I will read your answers and get back to you personally by email. Ilja."],
    company: "Company or brand", companyPlaceholder: "Your company name",
    industry: "Industry", industryPlaceholder: "For example, industrial consulting or architecture",
    url: "Current website", urlPlaceholder: "your-site.com", noWebsite: "We do not have a website yet",
    noWebsiteHint: "Then we will look at your offer, your audience and the website you have in mind.",
    projectType: "What do you have in mind?", choose: "Please select",
    audience: "Who do you want to reach?", audiencePlaceholder: "For example, owners of medium-sized businesses", audienceHint: "If your audience is still unclear, say so here.",
    goal: "What should the website change for your business?", goalPlaceholder: "For example: Our website should reflect the quality of our consulting and bring in more relevant enquiries.", goalHint: "One to three sentences are enough. What is missing today, and what would you like instead?",
    timeline: "When would you like to start?", name: "Your name", namePlaceholder: "Full name",
    role: "Your role in the company", rolePlaceholder: "For example, managing director or head of marketing",
    email: "Your email", emailPlaceholder: "you@company.com",
    consent: "I agree that my details may be used to prepare the analysis and contact me personally. Details in the", privacy: "privacy policy",
    back: "Back", next: "Continue", send: "Request the free analysis", sending: "Sending …",
    required: "All fields are required. Your audience and timing can still be open.",
    summary: "Your enquiry for", edit: "Review your answers", reassurance: "Free and without obligation. This does not commit you to a project.",
    successTitle: "Your enquiry has arrived.", successText: "I will look at your project personally and contact you at the email address you provided to arrange the analysis and our conversation. Ilja.", successLink: "Keep exploring the website",
    error: "Your enquiry could not be saved just now. Your answers are still here. Try again or email me at sabala@sabala-mentoring.com.",
  },
};

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return <div className={styles.field}>
    <label htmlFor={id}>{label}</label>
    {hint && <p id={`${id}-hint`} className={styles.hint}>{hint}</p>}
    {children}
    {error && <p id={`${id}-error`} className={styles.fieldError}>{error}</p>}
  </div>;
}

export default function AnalysisForm({ lang, variant = "page", onContinue }: { lang: AuditLang; variant?: "page" | "consultation"; onContinue?: () => void }) {
  const T = COPY[lang];
  const prefix = useId();
  const { draft, setDraft, step, setStep, state, setState, sendingRef } = useAnalysisSession();
  const [errors, setErrors] = useState<AuditErrors>({});
  const focus = useRef<AuditField | "heading" | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const id = (field: AuditField) => `${prefix}-${field}`;
  const update = <K extends AuditField>(field: K, value: ProjectDraft[K]) => {
    setDraft(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
  };
  const props = (field: AuditField, hint = false) => ({
    id: id(field), name: field, required: true, "aria-invalid": !!errors[field],
    "aria-describedby": [hint && `${id(field)}-hint`, errors[field] && `${id(field)}-error`].filter(Boolean).join(" ") || undefined,
  });

  useEffect(() => {
    const requested = focus.current;
    if (!requested) return;
    focus.current = null;
    const node = requested === "heading" ? heading.current : form.current?.elements.namedItem(requested);
    if (!(node instanceof HTMLElement)) return;
    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [step, errors, state]);

  const navigate = (destination: number) => {
    setStep(destination); setErrors({}); focus.current = "heading";
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sendingRef.current || state === "success") return;
    const currentErrors = validateProjectStep(draft, step, lang);
    if (Object.keys(currentErrors).length) {
      setErrors(currentErrors); focus.current = Object.keys(currentErrors)[0] as AuditField; return;
    }
    if (step < 2) { navigate(step + 1); return; }
    for (let page = 0; page < 2; page++) {
      const previousErrors = validateProjectStep(draft, page, lang);
      if (Object.keys(previousErrors).length) {
        setStep(page); setErrors(previousErrors); focus.current = Object.keys(previousErrors)[0] as AuditField; return;
      }
    }
    sendingRef.current = true;
    setState("loading");
    const { url, email, consent, ...qualification } = draft;
    try {
      const response = await fetch("/api/audit-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: draft.noWebsite ? "" : url, email, consent, lang, qualification }) });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Request was not saved");
      setState("success"); focus.current = "heading";
    } catch { setState("error"); }
    finally { sendingRef.current = false; }
  };

  if (state === "success") return <div className={styles.form} data-analysis-state="success" data-variant={variant}>
    <Check className={styles.successIcon} size={28} aria-hidden />
    <h3 ref={heading} tabIndex={-1} className={styles.title}>{T.successTitle}</h3>
    <p className={styles.intro}>{T.successText}</p>
    <a href={onContinue ? "#hebel" : "#pflege"} onClick={onContinue ? event => { event.preventDefault(); onContinue(); } : undefined} className={styles.continueLink}>{T.successLink}<ArrowRight size={16} aria-hidden /></a>
  </div>;

  return <form ref={form} onSubmit={submit} noValidate className={styles.form} data-analysis-step={step + 1} data-variant={variant} aria-busy={state === "loading"}>
    <ol className={styles.progress} aria-label={T.progress}>{T.steps.map((label, i) => <li key={label} aria-current={step === i ? "step" : undefined} data-complete={i < step}><span aria-hidden>{String(i + 1).padStart(2, "0")}</span>{label}</li>)}</ol>
    <h3 ref={heading} tabIndex={-1} className={styles.title}>{variant === "consultation" && step === 2 ? (lang === "de" ? "Wie erreicht Ilja dich?" : "How can Ilja reach you?") : T.titles[step]}</h3>
    <p className={styles.intro}>{variant === "consultation" ? (lang === "de" ? ["Ein kurzer Einblick hilft Ilja, die Analyse vorzubereiten.", "Die Richtung genügt. Die Einzelheiten klärt ihr im persönlichen Gespräch.", "Ilja liest deine Angaben und meldet sich per E-Mail, um einen Termin mit dir abzustimmen."] : ["A little context helps Ilja prepare your analysis.", "A direction is enough. You will work out the details in your conversation.", "Ilja will read your answers and email you to arrange a time to talk."])[step] : T.intros[step]}</p>
    {step === 0 && <p className={styles.required}>{T.required}</p>}

    <fieldset disabled={state === "loading"} className={styles.fields}>
      <legend className={styles.srOnly}>{T.steps[step]}</legend>
      {step === 0 && <>
        <Field id={id("company")} label={T.company} error={errors.company}><input {...props("company")} value={draft.company} onChange={e => update("company", e.target.value)} maxLength={160} autoComplete="organization" placeholder={T.companyPlaceholder} /></Field>
        <Field id={id("industry")} label={T.industry} error={errors.industry}><input {...props("industry")} value={draft.industry} onChange={e => update("industry", e.target.value)} maxLength={160} placeholder={T.industryPlaceholder} /></Field>
        {!draft.noWebsite && <Field id={id("url")} label={T.url} error={errors.url}><input {...props("url")} type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} value={draft.url} onChange={e => update("url", e.target.value)} maxLength={2000} placeholder={T.urlPlaceholder} /></Field>}
        <label className={styles.check}><input type="checkbox" name="noWebsite" checked={draft.noWebsite} onChange={e => { update("noWebsite", e.target.checked); setErrors(previous => ({ ...previous, url: undefined })); }} /><span>{T.noWebsite}</span></label>
        {draft.noWebsite && <p className={styles.hint}>{T.noWebsiteHint}</p>}
      </>}
      {step === 1 && <>
        <Field id={id("projectType")} label={T.projectType} error={errors.projectType}><select {...props("projectType")} value={draft.projectType} onChange={e => update("projectType", e.target.value as ProjectDraft["projectType"])}><option value="">{T.choose}</option>{PROJECT_TYPES.map(value => <option key={value} value={value}>{PROJECT_LABELS[lang].projectType[value]}</option>)}</select></Field>
        <Field id={id("audience")} label={T.audience} hint={T.audienceHint} error={errors.audience}><input {...props("audience", true)} value={draft.audience} onChange={e => update("audience", e.target.value)} maxLength={400} placeholder={T.audiencePlaceholder} /></Field>
        <Field id={id("goal")} label={T.goal} hint={T.goalHint} error={errors.goal}><textarea {...props("goal", true)} value={draft.goal} onChange={e => update("goal", e.target.value)} rows={4} maxLength={2000} placeholder={T.goalPlaceholder} /></Field>
        <Field id={id("timeline")} label={T.timeline} error={errors.timeline}><select {...props("timeline")} value={draft.timeline} onChange={e => update("timeline", e.target.value as ProjectDraft["timeline"])}><option value="">{T.choose}</option>{PROJECT_TIMELINES.map(value => <option key={value} value={value}>{PROJECT_LABELS[lang].timeline[value]}</option>)}</select></Field>
      </>}
      {step === 2 && <>
        <div className={styles.summary}><span>{T.summary}</span><strong>{draft.company}</strong><button type="button" onClick={() => navigate(0)}>{T.edit}</button></div>
        <Field id={id("name")} label={T.name} error={errors.name}><input {...props("name")} autoComplete="name" value={draft.name} onChange={e => update("name", e.target.value)} maxLength={120} placeholder={T.namePlaceholder} /></Field>
        <Field id={id("role")} label={T.role} error={errors.role}><input {...props("role")} autoComplete="organization-title" value={draft.role} onChange={e => update("role", e.target.value)} maxLength={120} placeholder={T.rolePlaceholder} /></Field>
        <Field id={id("email")} label={T.email} error={errors.email}><input {...props("email")} type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} value={draft.email} onChange={e => update("email", e.target.value)} maxLength={254} placeholder={T.emailPlaceholder} /></Field>
        <div><label className={styles.check}><input {...props("consent")} type="checkbox" checked={draft.consent} onChange={e => update("consent", e.target.checked)} /><span>{T.consent} <Link href="/datenschutz">{T.privacy}</Link>.</span></label>{errors.consent && <p id={`${id("consent")}-error`} className={styles.fieldError}>{errors.consent}</p>}</div>
      </>}
    </fieldset>
    {state === "error" && <p role="alert" className={styles.fieldError}>{T.error}</p>}
    <div className={styles.actions}>
      {step > 0 && <button type="button" className={styles.back} disabled={state === "loading"} onClick={() => navigate(step - 1)}><ArrowLeft size={15} aria-hidden />{T.back}</button>}
      <button type="submit" className={styles.next} disabled={state === "loading"}>{state === "loading" ? T.sending : step < 2 ? T.next : variant === "consultation" ? (lang === "de" ? "Analyse und Gespräch anfragen" : "Request analysis and conversation") : T.send}<ArrowRight size={16} aria-hidden /></button>
    </div>
    {step === 2 && <p className={styles.reassurance}>{T.reassurance}</p>}
  </form>;
}
