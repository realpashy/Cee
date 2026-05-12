"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { SiteMessages } from "@/lib/i18n";

type FormState = {
  fullName: string;
  businessName: string;
  phone: string;
  serviceInterest: string;
  primaryGoal: string;
  biggestChallenge: string;
  urgency: string;
};

type ChannelKey =
  | "Physical Location"
  | "TikTok"
  | "Facebook"
  | "Instagram"
  | "Google Business Profile"
  | "Website";

type BookingDay = {
  dateKey: string;
  label: string;
  subtitle: string;
  slots: string[];
};

const channelOptions: Array<{
  key: ChannelKey;
  placeholder: string;
  hint: string;
}> = [
  {
    key: "Physical Location",
    placeholder: "Store address or area",
    hint: "Shop, clinic, office, or showroom"
  },
  {
    key: "TikTok",
    placeholder: "TikTok channel or URL",
    hint: "Profile, handle, or video page"
  },
  {
    key: "Facebook",
    placeholder: "Facebook page or URL",
    hint: "Business page or campaign profile"
  },
  {
    key: "Instagram",
    placeholder: "Instagram handle or URL",
    hint: "Main account, reels page, or profile"
  },
  {
    key: "Google Business Profile",
    placeholder: "Google Business Profile URL",
    hint: "Maps or business listing presence"
  },
  {
    key: "Website",
    placeholder: "Website URL",
    hint: "Homepage, landing page, or store URL"
  }
];

const serviceOptions = ["Creative Launch", "Growth Engine", "Monthly Partner"] as const;
const urgencyOptions = ["Within 7 days", "This month", "Just exploring"] as const;

const initialState: FormState = {
  fullName: "",
  businessName: "",
  phone: "",
  serviceInterest: "Creative Launch",
  primaryGoal: "",
  biggestChallenge: "",
  urgency: "Within 7 days"
};

function firstNameFrom(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "";
}

function formatSlotLabel(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${suffix}`;
}

function generateBookingDays() {
  const today = new Date();
  const days: BookingDay[] = [];

  for (let offset = 1; offset <= 2; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    const seed = date.getDate() + date.getMonth() * 3;
    const slotCount = 3 + (seed % 2);
    const hours = [10, 11, 12, 13, 14, 15, 16, 17];
    const startIndex = seed % 3;
    const selectedHours = hours.slice(startIndex, startIndex + slotCount);

    days.push({
      dateKey: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      }),
      subtitle: offset === 1 ? "Next available day" : "Following day",
      slots: selectedHours.map(formatSlotLabel)
    });
  }

  return days;
}

export function EligibilityFlow({ messages }: { messages: SiteMessages }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [selectedChannels, setSelectedChannels] = useState<ChannelKey[]>([]);
  const [channelDetails, setChannelDetails] = useState<Record<ChannelKey, string>>({
    "Physical Location": "",
    TikTok: "",
    Facebook: "",
    Instagram: "",
    "Google Business Profile": "",
    Website: ""
  });
  const bookingDays = useMemo(() => generateBookingDays(), []);
  const [selectedDate, setSelectedDate] = useState(bookingDays[0]?.dateKey ?? "");
  const [selectedSlot, setSelectedSlot] = useState(bookingDays[0]?.slots[0] ?? "");
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsappHref, setWhatsappHref] = useState<string | null>(null);

  useEffect(() => {
    const onPlanSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ planName?: string }>;
      const planName = customEvent.detail?.planName;
      if (!planName) {
        return;
      }

      updateField("serviceInterest", planName);
      setStep((current) => (current < 1 ? 1 : current));
    };

    window.addEventListener("cee-plan-select", onPlanSelect as EventListener);
    return () =>
      window.removeEventListener("cee-plan-select", onPlanSelect as EventListener);
  }, []);

  const activeBookingDay =
    bookingDays.find((day) => day.dateKey === selectedDate) ?? bookingDays[0];

  const steps = useMemo(
    () => [
      {
        title: messages.intake.stepLabel,
        subtitle: messages.intake.subtitle
      },
      {
        title: firstNameFrom(form.fullName)
          ? `Hello ${firstNameFrom(form.fullName)} 👋`
          : "Nice to meet you 👋",
        subtitle: "Let’s map what you actually want to grow first."
      },
      {
        title: "Now let’s identify the bottleneck.",
        subtitle: "The more specific this is, the sharper the proposal will be."
      },
      {
        title: "Last step before WhatsApp.",
        subtitle: "We’ll use this to prepare the lead record and next action."
      }
    ],
    [form.fullName, messages.intake.stepLabel, messages.intake.subtitle]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const currentChannels = selectedChannels
        .map((channel) => {
          const detail = channelDetails[channel]?.trim();
          return detail ? `${channel}: ${detail}` : channel;
        })
        .join(" | ");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          currentChannels,
          qualificationAnswers: {
            selectedDate,
            selectedSlot
          }
        })
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      const data = (await response.json()) as { whatsappHref: string };
      setWhatsappHref(data.whatsappHref);

      window.setTimeout(() => {
        window.location.assign(data.whatsappHref);
      }, 1800);
    } catch {
      setSubmitError("Submission failed. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function toggleChannel(channel: ChannelKey) {
    setSelectedChannels((current) => {
      if (current.includes(channel)) {
        return current.filter((item) => item !== channel);
      }

      return [...current, channel];
    });
  }

  function updateChannelDetail(channel: ChannelKey, value: string) {
    setChannelDetails((current) => ({
      ...current,
      [channel]: value
    }));
  }

  const progress = ((step + 1) / steps.length) * 100;

  function renderChoiceIndicator(active: boolean) {
    return (
      <span
        className={[
          "flex h-5 w-5 items-center justify-center rounded-full border transition",
          active
            ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]"
            : "border-white/18 bg-black/20"
        ].join(" ")}
      >
        <Image
          src="/brand/plus.png"
          alt=""
          aria-hidden="true"
          width={12}
          height={12}
          className={active ? "h-3 w-3 object-contain" : "h-3 w-3 object-contain opacity-55"}
        />
      </span>
    );
  }

  if (whatsappHref) {
    return (
      <section
        id="intake"
        className="glass-panel relative mx-auto max-w-[760px] overflow-hidden rounded-[10px] p-6 md:p-8"
      >
        <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.2),transparent_66%)] blur-2xl" />
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
          You&apos;re Eligible
        </p>
        <h2 className="mt-4 text-3xl font-black md:text-5xl">
          Your business looks like a strong fit.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--brand-silver)]">
          We&apos;ve received your details and we&apos;ll get back to you within 24
          hours, usually within 30 minutes. If WhatsApp does not open automatically,
          you can continue manually below.
        </p>
        <a href={whatsappHref} className="btn-primary mt-6">
          {messages.intake.successCta}
        </a>
      </section>
    );
  }

  return (
    <section
      id="intake"
      className="glass-panel relative mx-auto max-w-[920px] overflow-hidden rounded-[10px]"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[32%] border-l border-white/6 bg-[linear-gradient(180deg,rgba(149,223,30,0.08),rgba(149,223,30,0.02))] lg:block" />
      <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.18),transparent_68%)] blur-3xl" />

      <div className="relative flex items-center justify-between rounded-t-[10px] border-b border-white/8 bg-white/3 px-6 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]">
            {messages.intake.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
            {messages.intake.title}
          </h2>
        </div>
        <div className="min-w-24">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-full bg-[var(--brand-lime)]"
            />
          </div>
        </div>
      </div>

      <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={[
                    "rounded-[10px] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-all",
                    index === step
                      ? "bg-[var(--brand-lime)] text-[var(--brand-black)]"
                      : "border border-white/8 bg-black/20 text-[var(--brand-silver)]"
                  ].join(" ")}
                >
                  0{index + 1}
                </span>
              ))}
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white">
              {steps[step]?.title}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--brand-silver)]">
              {steps[step]?.subtitle}
            </p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              {step === 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    placeholder={messages.intake.formLabels.fullName}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                  <input
                    value={form.businessName}
                    onChange={(event) => updateField("businessName", event.target.value)}
                    placeholder={messages.intake.formLabels.businessName}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-4">
                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {messages.intake.formLabels.serviceInterest}
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      {serviceOptions.map((option) => {
                        const active = form.serviceInterest === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField("serviceInterest", option)}
                            className={[
                              "flex min-h-[88px] items-start gap-3 rounded-[10px] border px-4 py-4 text-left transition",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] hover:border-white/18"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-black text-white">
                                {option}
                              </span>
                              <span className="mt-2 block text-xs leading-6 text-[var(--brand-silver)]">
                                {option === "Creative Launch"
                                  ? "Fast premium creative testing."
                                  : option === "Growth Engine"
                                    ? "Ongoing content and campaign assets."
                                    : "Hands-on strategic monthly support."}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <input
                    value={form.primaryGoal}
                    onChange={(event) => updateField("primaryGoal", event.target.value)}
                    placeholder={messages.intake.formLabels.primaryGoal}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-4">
                  <input
                    value={form.biggestChallenge}
                    onChange={(event) => updateField("biggestChallenge", event.target.value)}
                    placeholder={messages.intake.formLabels.biggestChallenge}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-4 outline-none transition focus:border-[var(--brand-lime)]"
                  />
                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {messages.intake.formLabels.currentChannels}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {channelOptions.map((channel) => {
                        const active = selectedChannels.includes(channel.key);

                        return (
                          <button
                            key={channel.key}
                            type="button"
                            onClick={() => toggleChannel(channel.key)}
                            className={[
                              "flex min-h-[88px] items-start gap-3 rounded-[10px] border px-4 py-4 text-left transition",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/10 bg-[rgb(24_25_24)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                                {channel.key}
                              </span>
                              <span className="mt-2 block text-xs leading-5 text-[var(--brand-silver)]">
                                {channel.hint}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {selectedChannels.length ? (
                      <div className="mt-4 grid gap-3">
                        {selectedChannels.map((channel) => {
                          const channelMeta = channelOptions.find((item) => item.key === channel);

                          return (
                            <div
                              key={channel}
                              className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] p-3"
                            >
                              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-lime)]">
                                {channel}
                              </p>
                              <input
                                value={channelDetails[channel]}
                                onChange={(event) =>
                                  updateChannelDetail(channel, event.target.value)
                                }
                                placeholder={channelMeta?.placeholder}
                                className="w-full rounded-[10px] border border-white/8 bg-[rgb(17_18_17)] px-4 py-3 outline-none transition focus:border-[var(--brand-lime)]"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-[var(--brand-silver)]">
                        Select every active channel you currently use.
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder={messages.intake.formLabels.phone}
                    className="rounded-[10px] border border-white/8 bg-[rgb(24_25_24)] px-4 py-3 outline-none transition focus:border-[var(--brand-lime)] md:col-span-2"
                  />
                  <div className="md:col-span-2">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      {messages.intake.formLabels.urgency}
                    </p>
                    <div className="grid gap-3">
                      {urgencyOptions.map((option) => {
                        const active = form.urgency === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField("urgency", option)}
                            className={[
                              "flex items-start gap-3 rounded-[10px] border px-4 py-4 text-left transition",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.14),rgba(149,223,30,0.05))] text-white shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] text-[var(--brand-silver)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-bold text-white">
                                {option}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-[var(--brand-silver)]">
                                {option === "Within 7 days"
                                  ? "Best for fast deployment and immediate momentum."
                                  : option === "This month"
                                    ? "Good for businesses preparing their next move."
                                    : "Best if you are still comparing directions."}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      Preferred Strategy Call Day
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {bookingDays.map((day) => {
                        const active = selectedDate === day.dateKey;

                        return (
                          <button
                            key={day.dateKey}
                            type="button"
                            onClick={() => {
                              setSelectedDate(day.dateKey);
                              setSelectedSlot(day.slots[0] ?? "");
                            }}
                            className={[
                              "flex min-h-[92px] items-start gap-3 rounded-[10px] border px-4 py-4 text-left transition",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-black text-white">
                                {day.label}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-[var(--brand-silver)]">
                                {day.subtitle}
                              </span>
                              <span className="mt-2 block text-xs leading-5 text-[var(--brand-lime)]">
                                {day.slots.length} available slots
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-silver)]">
                      Preferred Time Slot
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {activeBookingDay?.slots.map((slot) => {
                        const active = selectedSlot === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={[
                              "flex min-h-[72px] items-center gap-3 rounded-[10px] border px-4 py-4 text-left transition",
                              active
                                ? "border-[var(--brand-lime)] bg-[linear-gradient(180deg,rgba(149,223,30,0.16),rgba(149,223,30,0.06))] shadow-[0_18px_40px_rgba(149,223,30,0.08)]"
                                : "border-white/8 bg-[rgb(24_25_24)] hover:border-white/20"
                            ].join(" ")}
                          >
                            <span className="mt-0.5">{renderChoiceIndicator(active)}</span>
                            <span className="block">
                              <span className="block text-sm font-black text-white">
                                {slot}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-[var(--brand-silver)]">
                                1-hour strategy session
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="rounded-[10px] border border-[var(--brand-lime)]/14 bg-[var(--brand-lime)]/6 p-4 md:col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-lime)]">
                      Summary
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                      {form.businessName || "Your business"} wants to{" "}
                      {form.primaryGoal || "grow faster"} and is currently blocked by{" "}
                      {form.biggestChallenge || "an unclear bottleneck"}.
                    </p>
                    {selectedChannels.length ? (
                      <p className="mt-2 text-sm leading-7 text-[var(--brand-silver)]">
                        Active channels: {selectedChannels.join(", ")}.
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm leading-7 text-[var(--brand-silver)]">
                      Preferred call: {activeBookingDay?.label} at {selectedSlot}.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  disabled={step === 0}
                  className="btn-outline disabled:opacity-35"
                >
                  Back
                </button>

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setStep((current) => Math.min(steps.length - 1, current + 1))
                    }
                    className="btn-primary"
                  >
                    {messages.intake.nextStep}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-60"
                  >
                    {isSubmitting ? "Preparing..." : "Continue to WhatsApp"}
                  </button>
                )}
              </div>

              {submitError ? <p className="text-sm text-red-300">{submitError}</p> : null}
            </form>
          </motion.div>
        </AnimatePresence>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="hidden lg:flex lg:min-h-full lg:items-center lg:justify-center"
        >
          <div className="glass-panel relative mx-auto w-full max-w-[264px] rounded-[10px] p-5">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/cee-wordmark.png"
                alt="Cee+"
                width={136}
                height={48}
                className="h-auto w-[88px]"
              />
              <span className="rounded-full border border-white/8 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--brand-silver)]">
                Intake Live
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-[10px] border border-white/8 bg-black/25 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-lime)]">
                  Lead Snapshot
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                  {form.businessName || "Your business"} is building toward{" "}
                  {form.primaryGoal || "a sharper growth direction"}.
                </p>
              </div>
              <div className="rounded-[10px] border border-white/8 bg-black/25 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-lime)]">
                  Current Focus
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--brand-silver)]">
                  Service: {form.serviceInterest}
                </p>
                <p className="mt-1 text-sm leading-7 text-[var(--brand-silver)]">
                  Urgency: {form.urgency}
                </p>
                {selectedChannels.length ? (
                  <p className="mt-1 text-sm leading-7 text-[var(--brand-silver)]">
                    Channels: {selectedChannels.join(", ")}
                  </p>
                ) : null}
                <p className="mt-1 text-sm leading-7 text-[var(--brand-silver)]">
                  Call: {activeBookingDay?.label} at {selectedSlot}
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
