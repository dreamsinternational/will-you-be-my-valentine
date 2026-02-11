"use client";
import { useState } from "react";

export default function Page() {
  const fullName = "Sanjana";
  const nickname = "Sanj";
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [selections, setSelections] = useState<Record<string, string | null>>({});
  const [lastReveal, setLastReveal] = useState<{ text: string; icon: string } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRevealOpen, setIsRevealOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<string | null>(null);
  const [wheelAngle, setWheelAngle] = useState(0);
  const yesButtonSize = noCount * 20 + 16;

  const steps = [
    {
      id: "gift",
      title: `Select your Gift, ${nickname}`,
      subtitle: "Pick one or more for your Valentine haul.",
      options: [
        "Apple Headphones",
        "Customized Name Necklace",
        "Handwritten Letter",
        "Chocolate + strawberries",
        "A surprise candlelight dinner",
      ],
      icons: ["🎁", "💌", "🌹", "🍫", "🧸", "✨"],
      mode: "mystery",
    },
    {
      id: "dares",
      title: `Naughty Dares for ${nickname}`,
      subtitle: "Playful, sweet, and a little spicy.",
      options: [
        "5 kisses in 10 seconds",
        "Kiss me in the best way you can do.",
        "Whisper your favorite memory",
        "Pin me against the wall and show me who’s in charge.",
        "Give me a slow, lingering kiss and don’t stop until I say so.",
      ],
      icons: ["🔥", "😈", "💋", "🎯", "🫦", "💫"],
      mode: "mystery",
    },
    {
      id: "date",
      title: `Choose the Date Vibe, ${nickname}`,
      subtitle: "What energy are we bringing?",
      options: [
        "Movie night + snacks",
        "Cafe hopping + photos",
        "Picnic at sunset",
        "Stay in, cook together",
        "Adventure day + ice cream",
      ],
      icons: ["🎬", "☕", "🧺", "🍳", "🍦", "📸"],
      mode: "mystery",
    },
    {
  id: "promise_question",
  title: `Your Promise, ${nickname}`,
  subtitle: `If you could get *one promise* from me, what would it be, ${nickname}?`,
  options: [
    "Always be honest with you, no matter what.",
    "Support you in every dream you chase.",
    "Stand by you through all ups and downs.",
    "Make our love a safe and happy place.",
    "Cherish you every day for the rest of our lives.",
    "Grow with you, not apart, through everything.",
    "Keep choosing you, over and over again.",
    "Love you fiercely, forever and without hesitation.",
    "All of the above."
  ],
  icons: ["🤍","🌟","💪","🏡","❤️","🌱","🔁","💌"],
  mode: "select"
},
    {
  id: "dangerous_compliment",
  title: `Press for a Dangerous Compliment, ${nickname}`,
  subtitle: "Warning: May cause blushing.",
  options: [
    "You have no idea how hard it is to keep my hands to myself around you.",
    "The way you look at me should honestly be illegal.",
    "If tension had a face, it would look exactly like you.",
    "You don’t just enter a room… you take control of it.",
    "Sometimes I replay our moments in my head just to feel that spark again.",
    "You’re the kind of distraction I never want to recover from.",
    "When you stand close to me, my thoughts stop behaving.",
    "You make ‘good girl’ energy feel dangerously tempting."
  ],
  icons: ["🔥", "💋", "😈", "✨", "💞", "🫦"],
  mode: "select",
},

    // {
    //   id: "playlist",
    //   title: "Our Playlist",
    //   subtitle: "Select a mood for the soundtrack.",
    //   options: [
    //     "Soft R&B",
    //     "Throwback love songs",
    //     "Chill lo-fi",
    //     "Upbeat pop",
    //     "Indie romance",
    //   ],
    //   icons: ["🎧", "🎶", "📻", "🪩", "🎹", "✨"],
    //   mode: "mystery",
    // },
   {
  id: "punishment",
  title: `Pick a Romantic Punishment, ${nickname}`,
  subtitle: "Cute consequences, all heart.",
  options: [
    "You owe me 10 slow, unhurried kisses.",
    "Write me a tiny love note… and read it out loud.",
    "Two-minute shoulder massage with no distractions.",
    "Sing one cheesy love line while looking into my eyes.",
    "Make me a sweet treat… and feed me the entire treat with your hands.",
    "One long hug that lasts just a little too long."
  ],
  icons: ["💞", "✍️", "💆", "🎤", "🧁", "🤍"],
  mode: "select",
},

    {
      id: "fantasy",
      title: `Select Your 60-Second Fantasy, ${nickname}`,
      subtitle: "One minute of pure romance.",
      options: [
        "Slow dance with eyes closed",
        "Compliment marathon",
        "Forehead kisses only",
        "Hand-holding + eye contact",
        "Whisper 3 things you love",
      ],
      icons: ["🕺", "💬", "💋", "🤝", "💌", "✨"],
      mode: "select",
    },
    {
      id: "wheel",
      title: `Spin the Love Wheel, ${nickname}`,
      subtitle: "One spin decides the vibe.",
      options: [
        "5 Kisses Anywhere",
        "One Honest Question (must answer truthfully)",
        "Instant Hug Attack",
        "You Choose the Song, I Dance",
        "Secret Compliment",
        "Plan Our Next Date",
        "A Slow Kiss",
        "Recreate Our Favorite Memory",
        "1 Minute Eye Contact Challenge",
      ],
      icons: ["💞", "✨", "🫶", "🎶", "💌", "📅", "💋", "📸", "👀"],
      mode: "wheel",
    },
    {
      id: "hug",
      title: `Claim Your Hug Coupon, ${nickname}`,
      subtitle: "Pick your hug style.",
      options: [
        "60-second bear hug",
        "Back hug with gentle squeezes",
        "Spin + squeeze hug",
        "Couch cuddle hug",
        "Hug + forehead kiss",
      ],
      icons: ["🐻", "🫶", "🌀", "🛋️", "💋", "💖"],
      mode: "select",
    },
  ];

  const revealPick = (stepId: string, pick: string, icon: string) => {
    setSelections((prev) => ({ ...prev, [stepId]: pick }));
    setLastReveal({ text: pick, icon });
    setWheelResult(null);
    setIsRevealOpen(true);
  };

  const revealRandomPick = (stepId: string, options: string[], icons: string[]) => {
    const pick = options[Math.floor(Math.random() * options.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    revealPick(stepId, pick, icon);
  };

  const allComplete = hasStarted && currentStepIndex >= steps.length;
  const activeStep = allComplete ? null : steps[currentStepIndex];
  const advanceStep = () => {
    setIsRevealOpen(false);
    setLastReveal(null);
    setWheelResult(null);
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
      "PLEASE Babe",
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
    <div className="flex min-h-screen flex-col items-center justify-center py-10">
      {yesPressed ? (
        <>
          {!hasStarted ? (
            <>
              <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
              <div className="my-4 text-4xl font-bold">WOOOOOO !!! I love you, {nickname}!! ;))</div>
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
              Choose your surprise, reveal it, then move to the next task.
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
              <div className="rounded-[24px] border border-rose-200 bg-gradient-to-br from-rose-100 via-white to-pink-200 p-4 text-left shadow-xl sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">
                      Final Valentine Plan for {fullName}
                    </div>
                    <h2 className="mt-2 text-3xl font-extrabold text-rose-700 sm:text-4xl">
                      All surprises unlocked for {nickname}
                    </h2>
                    <p className="mt-2 max-w-2xl text-base text-rose-600">
                      Here is everything you revealed, wrapped up in one gorgeous plan for {nickname}.
                    </p>
                  </div>
                  <div className="text-4xl">🎉💖</div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-sm"
                    >
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
                        {step.title}
                      </div>
                      <div className="mt-3 text-xl font-bold text-slate-800">
                        {selections[step.id] ?? ""}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-rose-200/70 p-4 text-center text-base font-semibold text-rose-700">
                  Valentine complete! You just made the cutest plan ever, {nickname}. 💖
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
                  {activeStep.mode === "wheel" ? (
                    <div className="mt-6 flex flex-col items-center gap-4">
                      <div className="love-wheel">
                        <div className="love-wheel__pointer" />
                        <div
                          className={`love-wheel__spin ${isSpinning ? "is-spinning" : ""}`}
                          style={{ transform: `rotate(${wheelAngle}deg)` }}
                        >
                          <div className="love-wheel__ring" />
                          {activeStep.options.map((option, index) => {
                            const angle = (360 / activeStep.options.length) * index;
                            const labelStyle = {
                              "--label-angle": `${angle}deg`,
                              "--wheel-rotation": `${wheelAngle}deg`,
                            } as React.CSSProperties;
                            return (
                              <div
                                key={option}
                                className={`love-wheel__label ${wheelResult === option ? "is-hit" : ""}`}
                                style={labelStyle}
                              >
                                {option}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (isSpinning) return;
                          setWheelResult(null);
                          setIsSpinning(true);
                          const pickIndex = Math.floor(Math.random() * activeStep.options.length);
                          const pick = activeStep.options[pickIndex];
                          const icon = activeStep.icons[pickIndex % activeStep.icons.length];
                          const sliceAngle = 360 / activeStep.options.length;
                          const centerAngle = pickIndex * sliceAngle + sliceAngle / 2;
                          const extraSpins = 3 + Math.floor(Math.random() * 3);
                          const targetAngle = wheelAngle + extraSpins * 360 - centerAngle;
                          setWheelAngle(targetAngle);
                          setTimeout(() => {
                            setIsSpinning(false);
                            setWheelResult(pick);
                            setTimeout(() => {
                              revealPick(activeStep.id, pick, icon);
                            }, 2000);
                          }, 900);
                        }}
                        className="rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-rose-600"
                      >
                        Spin the Love Wheel
                      </button>
                      <div className="text-sm text-slate-600">
                        {wheelResult ? "Wheel stopped... revealing next!" : "One spin decides the vibe."}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {activeStep.options.map((option, index) => {
                          const icon = activeStep.icons[index % activeStep.icons.length];
                          const label =
                            activeStep.mode === "mystery" ? `Mystery pick #${index + 1}` : option;
                          const handleClick =
                            activeStep.mode === "mystery"
                              ? () => revealRandomPick(activeStep.id, activeStep.options, activeStep.icons)
                              : () => revealPick(activeStep.id, option, icon);
                          return (
                            <button
                              key={`${activeStep.id}-${index}`}
                              onClick={handleClick}
                              className="flex items-center justify-between rounded-2xl border border-pink-200 bg-white px-4 py-4 text-left text-sm font-semibold text-slate-700 transition hover:border-pink-400"
                            >
                              <span>{label}</span>
                              <span className="text-xl">{icon}</span>
                            </button>
                          );
                        })}
                      </div>
                      {activeStep.mode === "mystery" ? (
                        <div className="mt-4 text-sm text-slate-600">
                          Tap any mystery choice to reveal your Valentine surprise.
                        </div>
                      ) : null}
                    </>
                  )}
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
          <h1 className="my-4 text-4xl">Will you be my Valentine, {fullName}?</h1>
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
