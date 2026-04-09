

function OverviewSection({ event }) {
  return (
    <section className="pt-20 pb-16 max-w-5xl mx-auto px-6 md:px-8">
      <div className="text-center mb-12">
        <h2 className="text-[#1A1A1A] text-3xl font-bold mb-2">Overview</h2>
        <p className="text-gray-400 text-sm">{event.title}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 text-gray-500 leading-relaxed text-sm">
        <div className="space-y-4">
          <p>
            {event.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. 
          </p>
        </div>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
