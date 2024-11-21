export function Splash() {
  return (
    <>
      <div>
        <h1>✨ Find the Perfect Recipe to Match Your Mood! ✨</h1>
        <p>
          Feeling happy, tired, adventurous, or just craving comfort food? Let
          MoodMenu guide you! Share your mood and preferences, and we'll serve
          up recipes that are just right for YOU.
        </p>
        <p>
          Start by selecting how you feel today. We'll take care of the rest!
        </p>
        <button>Get Started</button>
      </div>
      <img
        src="/assets/logo.png"
        alt="logo"
        width={24}
        height={24}
        className="mr-2"
      />
      <h1 className="text-2xl font-semibold font-serif text-fuchsia-700">
        MoodMenu
      </h1>
    </>
  );
}
