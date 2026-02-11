"use client";
import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [selections, setSelections] = useState<Record<string, string | null>>({});
  const [lastReveal, setLastReveal] = useState<{ text: string; icon: string } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRevealOpen, setIsRevealOpen] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const steps = [
    {
      id: "gift",
      title: "Select your Gift",
      subtitle: "Pick one or more for your Valentine haul.",
      options: [
        "A bouquet of pink roses",
        "A cozy hoodie date",
        "Handwritten love letter",
        "Chocolate + strawberries",
        "A surprise candlelight dinner",
      ],
      icons: ["🎁", "💌", "🌹", "🍫", "🧸", "✨"],
    },
    {
      id: "dares",
      title: "Naughty Dares",
      subtitle: "Playful, sweet, and a little spicy.",
      options: [
        "5 kisses in 10 seconds",
        "Slow dance in the kitchen",
        "Whisper your favorite memory",
        "Back massage for 10 minutes",
        "Pick a secret nickname",
      ],
      icons: ["🔥", "😈", "💋", "🎯", "🫦", "💫"],
    },
    {
      id: "date",
      title: "Choose the Date Vibe",
      subtitle: "What energy are we bringing?",
      options: [
        "Movie night + snacks",
        "Cafe hopping + photos",
        "Picnic at sunset",
        "Stay in, cook together",
        "Adventure day + ice cream",
      ],
      icons: ["🎬", "☕", "🧺", "🍳", "🍦", "📸"],
    },
    {
      id: "playlist",
      title: "Our Playlist",
      subtitle: "Select a mood for the soundtrack.",
      options: [
        "Soft R&B",
        "Throwback love songs",
        "Chill lo-fi",
        "Upbeat pop",
        "Indie romance",
      ],
      icons: ["🎧", "🎶", "📻", "🪩", "🎹", "✨"],
    },
  ];

  const revealMysteryPick = (stepId: string, options: string[], icons: string[]) => {
    const pick = options[Math.floor(Math.random() * options.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    setSelections((prev) => ({ ...prev, [stepId]: pick }));
    setLastReveal({ text: pick, icon });
    setIsRevealOpen(true);
  };

  const allComplete = hasStarted && currentStepIndex >= steps.length;
  const activeStep = allComplete ? null : steps[currentStepIndex];
  const advanceStep = () => {
    setIsRevealOpen(false);
    setLastReveal(null);
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please",
      "With a chocolate rice cake on top",
      "What about a matcha frostie",
      "PLEASE POOKIE",
      "But :*(",
      "I am going to die",
      "Yep im dead",
      "ok ur talking to nathan's ghost",
      "please babe",
      ":((((",
      "PRETTY PLEASE",
      "Estoy muerto",
      "No :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          {!hasStarted ? (
            <>
              <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
              <div className="my-4 text-4xl font-bold">WOOOOOO!!! I love you pookie!! ;))</div>
              <button
                onClick={() => setHasStarted(true)}
                className="mt-4 rounded-full bg-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-pink-600"
              >
                Ready for surprises?
              </button>
            </>
          ) : null}
          {hasStarted && !allComplete ? (
            <div className="mb-8 max-w-2xl text-center text-lg text-slate-600">
              Mystery choices are hidden. Pick one, reveal your surprise, then move to the next task.
            </div>
          ) : null}
          {hasStarted && isRevealOpen && lastReveal ? (
            <div className="reveal-pop mb-8 w-full max-w-3xl rounded-3xl border border-pink-200 bg-gradient-to-r from-pink-100 via-white to-rose-100 px-6 py-6 text-center shadow-sm">
              <div className="text-4xl">{lastReveal.icon}</div>
              <div className="mt-3 text-sm uppercase tracking-[0.3em] text-pink-500">Surprise reveal</div>
              <div className="mt-3 text-3xl font-bold text-pink-700 sm:text-4xl">{lastReveal.text}</div>
              <button
                onClick={advanceStep}
                className="mt-6 rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-rose-600"
              >
                Show me the next surprise
              </button>
            </div>
          ) : null}
          {allComplete ? (
            <div className="w-full max-w-6xl px-4">
              <div className="min-h-[70vh] rounded-[32px] border border-rose-200 bg-gradient-to-br from-rose-100 via-white to-pink-200 p-8 text-left shadow-xl sm:p-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">
                      Final Valentine Plan
                    </div>
                    <h2 className="mt-3 text-4xl font-extrabold text-rose-700 sm:text-5xl">
                      All surprises unlocked
                    </h2>
                    <p className="mt-3 max-w-2xl text-lg text-rose-600">
                      Here is everything you revealed, wrapped up in one gorgeous plan.
                    </p>
                  </div>
                  <div className="text-4xl">🎉💖</div>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-sm"
                    >
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
                        {step.title}
                      </div>
                      <div className="mt-4 text-2xl font-bold text-slate-800">
                        {selections[step.id] ?? ""}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl bg-rose-200/70 p-5 text-center text-lg font-semibold text-rose-700">
                  Valentine complete! You just made the cutest plan ever. 💖
                </div>
              </div>
            </div>
          ) : null}
          {hasStarted && !allComplete && !isRevealOpen ? (
            <div className="w-full max-w-3xl">
              {activeStep ? (
                <div className="rounded-2xl border border-pink-200 bg-pink-50 p-6 text-left shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-pink-700">{activeStep.title}</h2>
                      <p className="text-sm text-pink-600">{activeStep.subtitle}</p>
                    </div>
                    <div className="rounded-full bg-pink-200 px-3 py-1 text-xs font-semibold text-pink-700">
                      Step {currentStepIndex + 1}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {activeStep.options.map((_, index) => (
                      <button
                        key={`${activeStep.id}-${index}`}
                        onClick={() => revealMysteryPick(activeStep.id, activeStep.options, activeStep.icons)}
                        className="flex items-center justify-between rounded-2xl border border-pink-200 bg-white px-4 py-4 text-left text-sm font-semibold text-slate-700 transition hover:border-pink-400"
                      >
                        <span>Mystery pick #{index + 1}</span>
                        <span className="text-xl">{activeStep.icons[index % activeStep.icons.length]}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-slate-600">
                    Tap any mystery choice to reveal your Valentine surprise.
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://gifdb.com/images/high/hello-animated-milk-and-mocha-mad-poke-wczos5085dw6qo6c.webp"
          />
          <h1 className="my-4 text-4xl">Will you be my Valentine?</h1>
          <div className="flex items-center">
            <button
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
