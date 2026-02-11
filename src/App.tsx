"use client";
import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
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
    },
  ];

  const toggleSelection = (stepId: string, option: string) => {
    setSelections((prev) => {
      const current = prev[stepId] ?? [];
      const exists = current.includes(option);
      const next = exists
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, [stepId]: next };
    });
  };

  const isStepComplete = (stepId: string) => (selections[stepId]?.length ?? 0) > 0;
  const activeStepIndex = steps.findIndex((step) => !isStepComplete(step.id));
  const revealIndex = activeStepIndex === -1 ? steps.length - 1 : activeStepIndex;
  const allComplete = activeStepIndex === -1;

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
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="my-4 text-4xl font-bold">WOOOOOO!!! I love you pookie!! ;))</div>
          <div className="mb-8 max-w-2xl text-center text-lg text-slate-600">
            Let us lock in the perfect Valentine plan. Pick your favorites, and the next step will
            appear after each choice.
          </div>
          <div className="grid w-full max-w-5xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {steps.map((step, index) => {
                if (index > revealIndex) return null;
                const selected = selections[step.id] ?? [];
                return (
                  <div key={step.id} className="rounded-2xl border border-pink-200 bg-pink-50 p-6 text-left shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-pink-700">{step.title}</h2>
                        <p className="text-sm text-pink-600">{step.subtitle}</p>
                      </div>
                      <div className="rounded-full bg-pink-200 px-3 py-1 text-xs font-semibold text-pink-700">
                        Step {index + 1}
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {step.options.map((option) => {
                        const isSelected = selected.includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => toggleSelection(step.id, option)}
                            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                              isSelected
                                ? "border-pink-500 bg-pink-500 text-white"
                                : "border-pink-200 bg-white text-slate-700 hover:border-pink-400"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">Selected:</span>{" "}
                      {selected.length > 0 ? selected.join(", ") : "Nothing yet. Pick at least one!"}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
              <h3 className="text-xl font-bold text-slate-800">Your Valentine Summary</h3>
              <p className="mt-1 text-sm text-slate-500">Updates with every pick you make.</p>
              <div className="mt-4 space-y-4">
                {steps.map((step) => {
                  const selected = selections[step.id] ?? [];
                  return (
                    <div key={step.id}>
                      <div className="text-sm font-semibold text-slate-700">{step.title}</div>
                      <div className="text-sm text-slate-600">
                        {selected.length > 0 ? selected.join(", ") : "Not chosen yet"}
                      </div>
                    </div>
                  );
                })}
              </div>
              {allComplete ? (
                <div className="mt-6 rounded-xl bg-pink-100 p-4 text-sm font-semibold text-pink-700">
                  Valentine complete! You have officially created the cutest plan ever. 
                  <span className="ml-1">💖</span>
                </div>
              ) : (
                <div className="mt-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
                  Keep going... your next surprise unlocks after each step.
                </div>
              )}
            </div>
          </div>
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
