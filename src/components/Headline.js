import React from 'react';

const Headline = () => {

return (
        <div className="headline-main" style={{position: "relative"}}>
            <div className="headline-neon" onClick={() => {window.location.href="https://davidvendel.com"}}>
                <span className="headline-text" data-text="">davidvendel.com</span>
                <span className="headline-gradient"></span>
                <span className="headline-spotlight"></span>
            </div>
        </div>
    )
}

export default Headline