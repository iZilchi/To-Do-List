import React, { useState } from 'react';
import '../styles/About.css';

function About({ activeDisplay, isAboutActive, setIsAboutActive }) {
    const [fadeInBackground, setFadeInBackground] = useState(false);

    const handleClose = () => {
        setFadeInBackground(true);
        setTimeout(() => {
            setIsAboutActive(false);
            setFadeInBackground(false);
        }, 500);
    };

    return (
        isAboutActive && (
            <>
                <div className={`background-opacity ${fadeInBackground ? "fade-in" : ""}`} onClick={handleClose}></div>
                <div className={`about-container ${fadeInBackground ? "fade-in" : ""}`}>
                    <h3 className={`about-header ${activeDisplay === "completed" ? "completed-active" : ""}`}>About ProcrastiMate</h3>
                    <button className="about-close-button" onClick={handleClose}>✖</button>
                    <div className={`about-content-container ${activeDisplay === "completed" ? "completed-active" : ""}`}>
                        <div className="about-description">
                            <p><strong>ProcrastiMate</strong> is a smart to-do list application designed to help you conquer procrastination and boost your productivity. By leveraging the powerful Eisenhower Matrix and our custom sorting algorithm, EisenSort, ProcrastiMate empowers you to prioritize tasks effectively.</p>
                        </div>
                        <h2 className="h2-about">EisenHower Matrix</h2>
                        <div className="about-description">
                            <p>The Eisenhower Matrix is a powerful time management tool that helps you prioritize tasks based on their urgency and importance. By categorizing tasks into four quadrants:</p>
                            <ul>
                                <li><strong>Do:</strong> Important, Urgent</li>
                                <li><strong>Schedule:</strong> Important, Not Urgent</li>
                                <li><strong>Delegate:</strong> Not Important, Urgent</li>
                                <li><strong>Delete:</strong> Not Important, Not Urgent</li>
                            </ul>
                            <p>By effectively using the Eisenhower Matrix, you can focus on high-impact tasks, reduce stress, and increase productivity.</p>
                        </div>
                        <img className="eisen-matrix-img" src="../src/assets/eisenhower-matrix-image.png" alt="Eisenhower Matrix" />
                        <h2 className="h2-about">EisenSort</h2>
                        <div className="about-description">
                            <p>EisenSort is a custom sorting algorithm inspired by the Eisenhower Matrix, which categorizes tasks based on their urgency and importance:</p>
                            <ol>
                                <li><strong>Do:</strong> Important, Urgent</li>
                                <li><strong>Attend To:</strong> Not Important, Urgent</li>
                                <li><strong>Schedule:</strong> Important, Not Urgent</li>
                                <li><strong>Do Latest:</strong> Not Important, Not Urgent</li>
                            </ol>
                            <p>This approach ensures that urgent and important tasks are prioritized first, followed by less critical ones, helping optimize time management.</p>
                        </div>
                        <h2 className="h2-about">Developers</h2>
                        <div className="profile-container">
                            <fieldset className={`profile ${activeDisplay === "completed" ? "completed-active" : ""}`}>
                                <legend>Back End Developer</legend>
                                <img className="prof-pic" src="../src/assets/profile/alyssa-pfp.jpg" alt="Alessandra Marie M. Landicho" />
                                <h5 className="name">Alessandra Marie M. Landicho</h5>
                                <a href="https://github.com/alyssaml">Github Profile: "alyssaml"</a>
                            </fieldset>

                            <fieldset className={`profile ${activeDisplay === "completed" ? "completed-active" : ""}`}>
                                <legend>Full Stack Developer</legend>
                                <img className="prof-pic" src="../src/assets/profile/justine-pfp.png" alt="Chris Justine L. Padua" />
                                <h5 className="name">Chris Justine L. Padua</h5>
                                <a href="https://github.com/cjlp13">Github Profile: "Yeti"</a>
                            </fieldset>

                            <fieldset className={`profile ${activeDisplay === "completed" ? "completed-active" : ""}`}>
                                <legend>Front End Developer</legend>
                                <img className="prof-pic" src="../src/assets/profile/zilchi-pfp.jpg" alt="Kent Melard D. Pagcaliuangan" />
                                <h5 className="name">Kent Melard D. Pagcaliuangan</h5>
                                <a href="https://github.com/iZilchi">Github Profile: "iZilchi"</a>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default About;