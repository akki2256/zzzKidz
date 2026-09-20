"use client";

import { useEffect, useId, useRef, useState } from "react";
import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^[+]?[\d\s()-]{7,20}$/.test(value),
    "Enter a valid phone number.",
  )
  .refine((value) => {
    if (value === "") return true;
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }, "Enter a valid phone number.");

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email.")
    .max(200, "Email is too long."),
  school: z
    .string()
    .trim()
    .min(2, "Please enter your school or organization.")
    .max(200, "School name is too long."),
  phone: phoneSchema,
  message: z
    .string()
    .trim()
    .min(10, "Please share a short message (at least 10 characters).")
    .max(5000, "Message is too long."),
});

type FieldName = keyof z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<FieldName, string>>;

export function PulseContactForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const idPrefix = useId();
  const [open, setOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();
  }, [open]);

  function clearFieldError(name: FieldName) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      school: String(formData.get("school") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      setFormError("Please check the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setOpen(true);
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${idPrefix}-name`}
            name="name"
            label="Name"
            autoComplete="name"
            required
            error={fieldErrors.name}
            onValueChange={() => clearFieldError("name")}
          />
          <Field
            id={`${idPrefix}-email`}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            error={fieldErrors.email}
            onValueChange={() => clearFieldError("email")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${idPrefix}-school`}
            name="school"
            label="School / Organization"
            required
            error={fieldErrors.school}
            onValueChange={() => clearFieldError("school")}
          />
          <Field
            id={`${idPrefix}-phone`}
            name="phone"
            label="Phone"
            hint="Optional"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            error={fieldErrors.phone}
            onValueChange={() => clearFieldError("phone")}
          />
        </div>

        <Field
          id={`${idPrefix}-message`}
          name="message"
          label="How can we help?"
          as="textarea"
          required
          placeholder="Tell us about your school, available space, or goals."
          error={fieldErrors.message}
          onValueChange={() => clearFieldError("message")}
        />

        {formError ? (
          <p role="alert" className="text-sm text-[#ff6b7a]">
            {formError}
          </p>
        ) : null}

        <button type="submit" className="pulse-btn mt-1 w-full sm:w-auto">
          Enquire Now
        </button>
      </form>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="pulse-contact-dialog"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="pulse-contact-dialog__panel">
          <p id={titleId} className="font-display text-2xl uppercase tracking-[0.02em]">
            Thanks for reaching out
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Your enquiry details look good. We&apos;ll wire this up to send messages soon —
            for now this is a preview confirmation.
          </p>
          <button
            type="button"
            className="pulse-btn mt-6"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  type = "text",
  autoComplete,
  inputMode,
  required,
  placeholder,
  as = "input",
  error,
  onValueChange,
}: {
  id: string;
  name: FieldName;
  label: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea";
  error?: string;
  onValueChange?: () => void;
}) {
  const errorId = `${id}-error`;
  const invalid = Boolean(error);

  return (
    <div className="pulse-input-slot">
      <div className="mb-2 flex items-baseline justify-between gap-3 px-0.5">
        <label
          htmlFor={id}
          className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white/55"
        >
          {label}
          {required ? <span className="text-[var(--p-accent)]"> *</span> : null}
        </label>
        {hint ? (
          <span className="text-[0.65rem] uppercase tracking-[0.12em] text-white/35">{hint}</span>
        ) : null}
      </div>
      <div
        className={`pulse-input-container${invalid ? " pulse-input-container--error" : ""}`}
      >
        {as === "textarea" ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={5}
            placeholder={placeholder}
            aria-invalid={invalid}
            aria-describedby={invalid ? errorId : undefined}
            className="pulse-input-field pulse-input-field--area"
            onChange={onValueChange}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            inputMode={inputMode}
            required={required}
            placeholder={placeholder}
            aria-invalid={invalid}
            aria-describedby={invalid ? errorId : undefined}
            className="pulse-input-field"
            onChange={onValueChange}
          />
        )}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 px-0.5 text-xs text-[#ff6b7a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
