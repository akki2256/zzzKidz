"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  school: z.string().min(2, "Please enter your school or organization."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please share a short message."),
});

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
};

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<FormState>({ status: "idle" });

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
      const fieldErrors: FormState["fieldErrors"] = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof z.infer<typeof contactSchema>;
        fieldErrors[key] = issue.message;
      }
      setState({
        status: "error",
        message: "Please check the highlighted fields.",
        fieldErrors,
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        form.reset();
        setState({
          status: "success",
          message: "Thank you. Your enquiry has been received. We'll be in touch soon.",
        });
      } catch {
        setState({
          status: "error",
          message: "Something went wrong. Please email us directly or try again.",
        });
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required disabled={pending} />
          {state.fieldErrors?.name ? (
            <p className="text-xs text-error">{state.fieldErrors.name}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={pending}
          />
          {state.fieldErrors?.email ? (
            <p className="text-xs text-error">{state.fieldErrors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="school">School / Organization</Label>
          <Input id="school" name="school" required disabled={pending} />
          {state.fieldErrors?.school ? (
            <p className="text-xs text-error">{state.fieldErrors.school}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" disabled={pending} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          required
          disabled={pending}
          placeholder="Tell us about your school, available space, or goals."
        />
        {state.fieldErrors?.message ? (
          <p className="text-xs text-error">{state.fieldErrors.message}</p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Enquire Now"}
      </Button>

      {state.status !== "idle" && state.message ? (
        <p
          role="status"
          className={
            state.status === "success" ? "text-sm text-success" : "text-sm text-error"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
