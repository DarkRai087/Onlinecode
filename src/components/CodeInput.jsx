import { Download, Eraser, Copy, Play, ToggleLeft, ToggleRight } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { autocompletion } from '@codemirror/autocomplete';

const JS_BOILERPLATE = "// Online Javascript Editor for free\n// Write, Edit and Run your Javascript code using JS Online Compiler\nconsole.log(\"Hello world\");";
const PYTHON_BOILERPLATE = "#Online Python Editor for free\n#Write, Edit and Run your Python code using Py Compiler Compiler\nprint(\"Welcome To python\")";
function CodeInput({ language, code, setCode, setOutput, onToggleLanguage }) {
  const getLanguageExtensions = () => {
    if (language === "javascript") {
      return [javascript({ jsx: true }), autocompletion()];
    } else {
      return [python(), autocompletion()];
    }
  };

  const runCode = () => {
    setOutput('');
    try {
      if (language === "javascript") {
        const originalConsoleLog = console.log;
        let outputString = '';

        console.log = function (...args) {
          outputString += args.join(' ') + '\n';
          originalConsoleLog.apply(console, args);
        };

        // eslint-disable-next-line no-eval
        eval(code);

        console.log = originalConsoleLog;

        setOutput(outputString);
      } else {
        setOutput(
          "[Python Execution Simulated]\n" +
            code
              .split("\n")
              .filter((line) => line.trim().startsWith("print("))
              .map((line) => {
                try {
                  const match = line.match(/print\s*\((.*)\)/);
                  if (match && match[1]) {
                    let content = match[1];
                    if (
                      (content.startsWith('"') && content.endsWith('"')) ||
                      (content.startsWith("'") && content.endsWith("'"))
                    ) {
                      return content.substring(1, content.length - 1);
                    }
                    try {
                      return eval(content);
                    } catch {
                      return content;
                    }
                  }
                  return "";
                } catch (e) {
                  return `Error processing: ${line}`;
                }
              })
              .join("\n")
        );
      }
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  const clearCode = () => {
    setCode(language === "javascript" ? JS_BOILERPLATE : PYTHON_BOILERPLATE);
    setOutput('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code).catch((err) => console.error('Could not copy text: ', err));
  };

  const importCode = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = language === 'javascript' ? '.txt,.js' : '.txt,.py';

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const contents = e.target.result;
          setCode(contents);
        };
        reader.readAsText(file);
      }
    });

    fileInput.click();
  };

  return (
    <div className="flex flex-col flex-1 animate-fade-in-down">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 p-2 rounded-t-lg shadow-md animate-gradient-move">
        <div className="flex items-center gap-2 text-white font-bold tracking-wide text-lg">
          <span className="animate-pulse">
            <span className={
              language === "javascript"
                ? "font-bold text-yellow-300 drop-shadow-md"
                : "font-bold text-blue-300 drop-shadow-md"
            }>
              {language === "javascript" ? "Script.js" : "script.py"}
            </span>
          </span>
          <button
            onClick={onToggleLanguage}
            className="ml-4 flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 py-1 px-3 rounded-full transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounce-once"
          >
            {language === "javascript" ? (
              <>
                <span className="text-yellow-300 font-bold">JS</span>
                <ToggleLeft size={18} />
                <span className="text-gray-400">Python</span>
              </>
            ) : (
              <>
                <span className="text-gray-400">JS</span>
                <ToggleRight size={18} />
                <span className="text-blue-300 font-bold">Python</span>
              </>
            )}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={importCode}
            className="bg-gray-800/80 hover:bg-blue-700 active:scale-95 p-2 rounded transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Import"
          >
            <Download size={16} />
          </button>
          <button
            onClick={clearCode}
            className="bg-gray-800/80 hover:bg-pink-700 active:scale-95 p-2 rounded transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            title="Clear"
          >
            <Eraser size={16} />
          </button>
          <button
            onClick={copyCode}
            className="bg-gray-800/80 hover:bg-purple-700 active:scale-95 p-2 rounded transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            title="Copy"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={runCode}
            className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-pink-600 hover:to-blue-600 active:scale-95 p-2 rounded transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounce-once"
            title="Run"
          >
            <Play size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden rounded-b-lg shadow-xl border-2 border-transparent animate-glow-output backdrop-blur-md bg-gray-900/70">
        <CodeMirror
          value={code}
          height="100%"
          theme={dracula}
          extensions={getLanguageExtensions()}
          onChange={(value) => setCode(value)}
          className="h-full text-blue-100 text-lg animate-fade-in-down"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            searchKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
    </div>
  );
}

export default CodeInput;