function CodeOutput({ output }) {
  return (
    <div className="flex flex-col flex-1 animate-fade-in-down">
      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 p-2 rounded-t-lg font-bold text-white shadow-md tracking-wide flex items-center gap-2 animate-gradient-move">
        <span className="animate-pulse">Output</span>
      </div>
      <div className="flex-1 bg-gray-900/70 p-5 font-mono whitespace-pre-wrap overflow-auto rounded-b-lg shadow-xl border-2 border-transparent animate-glow-output backdrop-blur-md text-blue-100 text-lg transition-all duration-500">
        {output}
      </div>
    </div>
  );
}

export default CodeOutput;