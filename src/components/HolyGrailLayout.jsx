const HolyGrailLayout = () => {
  return (
    <div className="flex flex-col">
      <header className="header h-[80px] border-b border-black/10 sticky top-0 p-4 z-40 bg-gray-200">
        Header
      </header>

      <main className="flex flex-1">
        {/* LeftSidebar */}
        <div className="w-40 sticky left-0 min-h-screen p-4 border-r border-black/10 hidden md:block bg-green-200">
          LeftSidebar
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 min-h-screen">Main Content</div>

        {/* RightSidebar */}
        <div className="w-40 sticky right-0 h-screen p-4 border-l border-black/10 hidden md:block bg-blue-200">
          RightSidebar
        </div>
      </main>

      <footer className="sticky bottom-0 w-full h-[60px] border-t border-black/10 p-4 bg-pink-200 z-40">
        Footer
      </footer>
    </div>
  );
};

export default HolyGrailLayout;
