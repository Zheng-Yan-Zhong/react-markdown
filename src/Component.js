import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';

function Component({ value, language, theme}) {
    return (
        <SyntaxHighlighter 
            language={language}
            style={theme}
            >
            {value} 
        </SyntaxHighlighter>
    )
}

export default Component

