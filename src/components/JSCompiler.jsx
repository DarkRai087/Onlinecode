import { useState } from 'react';
import Header from './Header';
import CodeInput from './CodeInput';
import CodeOutput from './CodeOutput';

const JS_BOILERPLATE = "// Online Javascript Editor for free\n// Write, Edit and Run your Javascript code using JS Online Compiler\nconsole.log(\"Hello world\");";
const PYTHON_BOILERPLATE = "#Online Python Editor for free\n#Write, Edit and Run your Python code using Py Compiler Compiler\nprint(\"Welcome To python\")";

export default function JSCompiler() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(JS_BOILERPLATE);
  const [output, setOutput] = useState("");

 const toggleLanguage = (newLang) => {
  if (newLang === "python") {
    setLanguage("python");
    setCode(PYTHON_BOILERPLATE);
  } else if (newLang === "c") {
    setLanguage("c");
    setCode(C_BOILERPLATE);
  } else if (newLang === "cpp") {
    setLanguage("cpp");
    setCode(CPP_BOILERPLATE);
  } else {
    setLanguage("javascript");
    setCode(JS_BOILERPLATE);
  }
  setOutput("");
};
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200">
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 p-4 gap-4">
          <CodeInput
            language={language}
            code={code}
            setCode={setCode}
            setOutput={setOutput}
            onToggleLanguage={toggleLanguage}
          />
          <CodeOutput output={output} />
        </div>
      </div>
    </div>
  );
}