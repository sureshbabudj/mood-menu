export default function Footer() {
  return (
    <footer className="hidden sm:block footer footer-center  w-full p-4 bg-muted">
      <div className="text-center">
        <p>
          Copyright © {new Date().getFullYear()} -
          <a className="font-semibold" href="mailto:m.sureshbabu.dj@gmail.com">
            MoodMenu
          </a>
        </p>
      </div>
    </footer>
  );
}
