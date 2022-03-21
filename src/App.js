import React from 'react'
import './app.css'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { BsLayoutSplit } from 'react-icons/bs'
import { useEffect } from 'react'
import remarkGfm from 'remark-gfm'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Component from './Component'

function App() {

    const [markdown, setMarkDown] = useState(JSON.parse(localStorage.getItem('markdown'))) 
    const [show, setShow] = useState(false)
    useEffect(() => {
        localStorage.setItem('markdown', JSON.stringify(markdown))
    }, [markdown])

    return (
        <div className="app">
            <div className='top'>
                <i className="icon" onClick={() => setShow(!show)}>
                    <BsLayoutSplit />
                </i>
            </div>
            <div className='container'>
                {show && <textarea autoFocus value={markdown} className="markdown" onChange={(e) => setMarkDown(e.target.value)} />}
                <div className={`show ${!show && 'extend'}`}>
                    <p>default language: JavaScript</p>
                    <ReactMarkdown 
                        children={markdown} 
                        remarkPlugins={[remarkGfm]} 
                        components={{
                            code({children, className, inline}) {
                                const match = /language-(\w+)/.exec(className)
                                console.log(`match:${match}, \nclassName: ${className}`)
                                /*
                                    ``` is empty
                                    match:null, 
                                    className: undefined,

                                    ```is c
                                    match:language-c,c, 
                                    className: language-c

                                */
                                return( 
                                    <Component 
                                        language={match ? match[1]: 'javascript'}
                                        value={children}
                                        theme={docco}
                                    />)
                            }
                        }}
                    />
                </div>
            </div>
        </div>

    )
}

export default App