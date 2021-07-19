import React from 'react';
import ReactDOM from 'react-dom';

require('./index.scss');

function App() {
    return (
        <div className="main">
            <p>Hello</p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
