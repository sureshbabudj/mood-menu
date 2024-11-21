import React from "react";
import { CheckCircle, AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className="py-4" id="termsOfUse">
      <h2 className="text-2xl font-bold mb-4">Terms of Use</h2>
      <ul className="list-inside">
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>App Purpose:</strong> MoodMenu provides recipe suggestions
          based on user inputs such as mood, dietary preferences, and cuisine.
          The app is free to use and provided "as-is."
        </li>
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>User Responsibilities:</strong> You agree not to misuse the
          app or attempt unauthorized access to its data or services.
        </li>
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>Accuracy of Information:</strong> While we strive to provide
          accurate recipe information, we do not guarantee its correctness or
          suitability for your needs.
        </li>
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>Third-Party Services:</strong> MoodMenu uses third-party APIs
          such as TheMealDB for recipe data and Google services for data
          synchronization. We are not responsible for the content provided by
          these services.
        </li>
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>Modifications:</strong> We may update these terms at any time.
          Continued use of the app indicates your acceptance of the changes.
        </li>
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>Liability:</strong> MoodMenu is not liable for any issues,
          including health concerns, arising from the use of recipes or data
          provided by the app.
        </li>
      </ul>
    </div>
  );
};

const CookiePolicy = () => {
  return (
    <div className="py-4" id="cookiePolicy">
      <h2 className="text-2xl font-bold mb-4">Cookie Statement</h2>
      <p>MoodMenu uses cookies for the following purposes:</p>
      <ul className="list-inside">
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>Essential Cookies:</strong> Required for basic app
          functionality.
        </li>
        <li>
          <CheckCircle className="inline-block pr-2 text-primary" />
          <strong>Analytics:</strong> To understand user interaction and improve
          app performance.
        </li>
      </ul>
      <p>
        You can disable cookies via your device or browser settings. Note that
        some features may not work properly if cookies are disabled.
      </p>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="py-4" id="privacyPolicy">
      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
      <p>
        <AlertCircle className="inline-block pr-2 text-destructive" />
        MoodMenu respects your privacy and is committed to protecting your
        personal data.
      </p>

      <div>
        <AlertCircle className="inline-block pr-2 text-destructive" />
        <strong>What We Collect:</strong>
        <ul className="list-inside ml-4">
          <li>
            <CheckCircle className="inline-block pr-2 text-primary" />
            Basic user data such as Google account information (name, email) for
            syncing favorites across devices.
          </li>
          <li>
            <CheckCircle className="inline-block pr-2 text-primary" />
            Recipe preferences and marked favorites, stored locally and
            optionally synced with Google Drive.
          </li>
        </ul>
      </div>
      <div>
        <AlertCircle className="inline-block pr-2 text-destructive" />
        <strong>How We Use Your Data:</strong>
        <ul className="list-inside ml-4">
          <li>
            <CheckCircle className="inline-block pr-2 text-primary" />
            To provide personalized recipe recommendations.
          </li>
          <li>
            <CheckCircle className="inline-block pr-2 text-primary" />
            To sync your favorites across devices.
          </li>
        </ul>
      </div>
      <p>
        <AlertCircle className="inline-block pr-2 text-destructive" />
        <strong>Third-Party Services:</strong> We use Google Drive for optional
        syncing and TheMealDB API for fetching recipes. Both services have their
        own privacy policies.
      </p>
      <p>
        <AlertCircle className="inline-block pr-2 text-destructive" />
        <strong>Data Security:</strong> Your data is encrypted and stored
        securely using CapacitorSQLite. We do not store your data on our
        servers.
      </p>
      <p>
        <AlertCircle className="inline-block pr-2 text-destructive" />
        <strong>Your Rights:</strong> You can delete your data by clearing the
        app or unsyncing your Google Drive.
      </p>
    </div>
  );
};

const About = () => {
  return (
    <div className="py-4" id="about">
      <h2 className="text-2xl font-bold mb-4">About This App</h2>
      <p className="pb-2">
        Welcome to MoodMenu, your companion for discovering recipes based on
        your mood and preferences.
      </p>
      <p className="pb-2">
        MoodMenu is a free-to-use app designed to help you discover recipes that
        match your mood and preferences. This app is non-commercial and uses
        publicly available data to provide a delightful experience for food
        lovers.
      </p>
    </div>
  );
};

const Credits = () => {
  return (
    <div className="py-4" id="credits">
      <h2 className="text-2xl font-bold mb-4">Credits</h2>
      <p>
        <CheckCircle className="inline-block pr-2 text-primary" />
        Recipes powered by{" "}
        <a href="https://www.themealdb.com" className="text-blue-500">
          TheMealDB API
        </a>
        .
      </p>
      <p>
        <CheckCircle className="inline-block pr-2 text-primary" />
        Images sourced from{" "}
        <a href="https://unsplash.com" className="text-blue-500">
          Unsplash
        </a>
        .
      </p>
    </div>
  );
};

const Disclaimer = () => {
  return (
    <div className="py-4" id="disclaimer">
      <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
      <p>
        This app is provided "as-is" without any guarantees of accuracy or
        availability. We do not claim ownership of the recipe data or images
        used. All rights remain with their respective owners.
      </p>
      <h2 className="text-2xl font-bold mb-4">Legal Information</h2>
      <p>
        MoodMenu adheres to the principles of the Creative Commons license for
        non-commercial usage. For more details about these licenses, visit
        <a href="https://creativecommons.org" className="text-blue-500">
          Creative Commons
        </a>
        .
      </p>
      <p>
        This app also complies with the open-source licenses of libraries and
        APIs used. Ensure to review their specific licensing terms.
      </p>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="py-4" id="contact">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <p>
        For any queries or issues, feel free to contact me at
        <a href="mailto:sureshbabu.dj@gmail.com" className="text-blue-500">
          sureshbabu.dj@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

const Information: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        <Button size="icon" onClick={() => navigate(-1)} variant="ghost">
          <ArrowLeft width={24} height={24} />
        </Button>
        <div className="flex flex-row space-x-2 items-center">
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="w-8 h-8 lg:w-12 lg:h-12"
          />
          <a
            href="/"
            className="font-sourgummy text-2xl lg:text-3xl text-emerald-600 font-black leading-4 lg:leading-5"
          >
            Mood
            <br />
            <span className="text-gray-600">Menu</span>
          </a>
        </div>
        <Button size="icon" asChild variant="ghost">
          <a href="#contact">
            <Mail width={24} height={24} />
          </a>
        </Button>
      </div>
      <About />
      <Credits />
      <TermsOfUse />
      <Disclaimer />
      <PrivacyPolicy />
      <CookiePolicy />
      <Contact />
    </div>
  );
};

export default Information;
