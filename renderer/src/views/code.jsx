import { BiCodeAlt } from 'react-icons/bi';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeView = ({ code }) => {
  const codeString = `
int analogPin = A3;
int val = 0;  // variable to store the value read

void setup() {
  Serial.begin(9600);           //  setup serial
} `;
  return (
    <div className="resize resize-rtl codeInitialWidth relative">
      <div className="w-full resize-ltr codeHeader text-white text-center p-2 flex items-center justify-center gap-2">
        <BiCodeAlt />
        কোড
      </div>
      {/* Code will be visible here */}
      <div className="resize-ltr text-sm fixScreen codeTopClearance">
        <SyntaxHighlighter language="arduino" showLineNumbers style={docco}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeView;
