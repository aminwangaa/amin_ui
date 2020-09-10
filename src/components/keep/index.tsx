import React, { useState } from "react";
import { render } from "react-dom";
import KeepAlive, { AliveScope } from "./keep";
import { withRouter } from "react-router-dom"

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            count: {count}
            <button onClick={() => setCount((count) => count + 1)}>add</button>
        </div>
    );
}

function App() {
    const [show, setShow] = useState(true);
    return (
        <AliveScope>
            <div>
                <button onClick={() => setShow((show) => !show)}>Toggle</button>
                <p>无 KeepAlive</p>
                {show && <Counter />}
                <p>有 KeepAlive</p>
                {show && (
                    <KeepAlive id="Test">
                        <Counter />
                    </KeepAlive>
                )}
                {show && (
                    <KeepAlive id="Test1">
                        <Counter />
                    </KeepAlive>
                )}
            </div>
        </AliveScope>
    );
};

export default App;

// render(<App />, document.getElementById("root"));
