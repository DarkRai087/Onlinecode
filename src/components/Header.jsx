import { Github } from 'lucide-react';

function Header({ language, onToggleLanguage }) {
  const redirectToGithub = () => {
    window.open('https://github.com/DarkRai087/Onlinecode', '_blank');
  };

  return (
    <div className="bg-gray-900/95 p-6 flex justify-between items-center shadow-2xl animate-fade-in-down transition-all duration-700 rounded-b-2xl border-b-4 border-purple-500/60 backdrop-blur-md">
      <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-move drop-shadow-lg tracking-tight">
        {language === "javascript" ? (
          <>
            <span className="text-yellow-300">Javascript</span>
            <span className="text-white"> Online Compiler</span>
          </>
        ) : (
          <>
            <span className="text-blue-300">Python</span>
            <span className="text-white"> Online Compiler</span>
          </>
        )}
      </div>
      <button
        onClick={redirectToGithub}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-7 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400/50 animate-bounce-once border border-white/10 backdrop-blur-md"
      >
        <span className="animate-spin-slow"><Github size={24} /></span>
        <span className="font-semibold tracking-wide text-lg">GitHub</span>
      </button>
    </div>
  );
}

export default Header;