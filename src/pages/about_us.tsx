import React from "react";

const AboutUsPage: React.FC = () => {
    return (
      <div className="flex flex-col min-h-screen bg-slate-300">
        
        <div>
            <h1>About Us</h1>
            <p>
                {" "}
                <div className="App">
                    <h1 style={{ fontFamily: "Roboto Slab, sans-serif" }}>
                        !! WELCOME TO POMODORO !!
                    </h1>
                </div>
            </p>
            <p>
                <div className="App">
                    <h1 style={{ fontFamily: "Roboto Slab, sans-serif" }}>
                        The Pomodoro Technique is a time management strategy
                        that divides work into manageable chunks called
                        "Pomodoros," which are designed to help people become
                        more productive and focused.  During this time the
                        person can concentrate solely and without interruption
                        on one subject. Following the completion of a Pomodoro,
                        one takes a quick 5-minute break to recuperate.
                    </h1>
                </div>
            </p>
            <p>
                <div className="App">
                    <h1 style={{ fontFamily: "Roboto Slab, sans-serif" }}>
                        The Pomodoro Technique is a time management strategy
                        that divides work into manageable chunks called
                        "Pomodoros," which are designed to help people become
                        more productive and focused. During this time the person
                        can concentrate solely and without interruption on one
                        subject. Following the completion of a Pomodoro, one
                        takes a quick 5-minute break to recuperate.
                    </h1>
                </div>
            </p>
            <p>
                <div className="App">
                    <h1 style={{ fontFamily: "Roboto Slab, sans-serif" }}>
                        {" "}
                        This application uses Rust for Backend and React JS for
                        frontend{" "}
                    </h1>
                </div>
            </p>
        </div>
      </div>
    );
};

export default AboutUsPage;
