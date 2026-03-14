"use client";

import { useEffect, useRef, useState } from "react";

export default function VeridaWaitlistPage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open && !submitted) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
      return () => window.clearTimeout(timer);
    }
  }, [open, submitted]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace this with your real endpoint or email platform integration.
      // Examples: /api/waitlist, Formspree, ConvertKit, Mailchimp, Beehiiv.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Waitlist submit failed", error);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setOpen(false);
    setLoading(false);
    window.setTimeout(() => {
      setSubmitted(false);
    }, 180);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#5E6A72]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-6 pt-16 md:px-10 md:pt-24">
        <h1 className="text-center text-[28px] font-extralight uppercase tracking-[0.34em] text-[#5E6A72] md:text-[48px]">
          Verida Labs
        </h1>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="waitlist-modal"
          aria-label="Open waitlist"
          className="group mt-24 outline-none md:mt-32"
        >
          <div className="relative h-[200px] w-[200px] transition duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] group-focus-visible:-translate-y-1.5 group-focus-visible:scale-[1.03] md:h-[280px] md:w-[280px]">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full drop-shadow-[0_10px_18px_rgba(143,163,141,0.05)] transition duration-300 group-hover:drop-shadow-[0_26px_42px_rgba(143,163,141,0.12)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <polygon
                points="100,0 200,50 200,150 100,200 0,150 0,50"
                stroke="#8FA38D"
                strokeWidth="1.05"
                fill="transparent"
              />
            </svg>
          </div>
        </button>
      </section>

      <div
        className={[
          "fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200",
          open ? "pointer-events-auto bg-black/28 opacity-100 backdrop-blur-[1px]"
            : "pointer-events-none bg-black/0 opacity-0",
        ].join(" ")}
        aria-hidden={!open}
        onClick={closeModal}
      >
        <div
          id="waitlist-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-title"
          onClick={(e) => e.stopPropagation()}
          className={[
            "relative w-full max-w-[400px] transition-all duration-200",
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-2 scale-[0.985] opacity-0",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-[24px] top-[6px] z-20 text-[28px] font-extralight leading-none text-[#A4AAAD] transition hover:text-[#7C8387] md:right-[28px] md:top-[10px]"
            aria-label="Close"
          >
            ×
          </button>

          <div className="relative mx-auto h-[320px] w-[320px] md:h-[380px] md:w-[380px]">
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <polygon
                points="100,0 200,50 200,150 100,200 0,150 0,50"
                stroke="#D7DDD8"
                strokeWidth="1.2"
                fill="#FFFFFF"
              />
            </svg>

            {!submitted ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center md:px-12">
                <h2
                  id="waitlist-title"
                  className="text-center text-[22px] font-extralight uppercase tracking-[0.34em] text-[#5E6A72] md:text-[30px]"
                >
                  Join the waitlist
                </h2>

                <form onSubmit={handleSubmit} className="mt-5 w-full">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[12px] border border-[#D9DEDA] bg-white px-5 py-3.5 text-[17px] text-[#5E6A72] outline-none transition placeholder:text-[#A3AAAD] focus:border-[#8FA38D] focus:shadow-[0_0_0_3px_rgba(143,163,141,0.10)]"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 text-[#8FA38D] text-[16px] font-medium tracking-[0.18em] uppercase transition duration-200 hover:-translate-y-0.5 hover:text-[#7F927E] disabled:opacity-60"
                  >
                    {loading ? "Joining…" : "Join"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center md:px-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#DDE4DC] bg-[#F7FAF5] text-[#8FA38D] shadow-[0_8px_18px_rgba(143,163,141,0.08)] md:h-16 md:w-16">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 md:h-8 md:w-8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7.5"
                      stroke="currentColor"
                      strokeWidth="1.05"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h2 className="mt-6 text-[26px] font-medium tracking-[-0.035em] text-[#5E6A72] md:text-[36px]">
                  You’re on the list
                </h2>

                <p className="mx-auto mt-4 max-w-[270px] text-[15px] leading-7 text-[#8C9295] md:max-w-[320px] md:text-[17px]">
                  Thanks for joining Verida Labs. We’ll be in touch when early access opens.
                </p>

                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-8 inline-flex rounded-[12px] border border-[#D9DEDA] px-5 py-3 text-[15px] font-medium text-[#5E6A72] transition hover:border-[#C6CDC8] hover:bg-[#FAFAF7]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
