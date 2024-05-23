import React, { useState } from 'react';
import { generate } from 'generate-password-browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from '../assets/images/copy.svg';
import activedCopy from '../assets/images/copyActived.svg';
import '../styles/components.css';

function Password() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(10);
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeLowercase, setIncludeLowercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [strength, setStrength] = useState('');
    const [copyActive, setCopyActive] = useState(false);

    const calculateStrength = (password) => {
        const regexes = [
            /[a-z]/,
            /[A-Z]/,
            /[0-9]/,
            /[^A-Za-z0-9]/
        ];

        let passedTests = regexes.filter((regex) => regex.test(password)).length;

        if (password.length > 8) passedTests++;
        if (password.length > 12) passedTests++;

        switch (passedTests) {
            case 0:
            case 1:
            case 2:
                return 'TOO WEAK!';
            case 3:
                return 'WEAK';
            case 4:
                return 'MEDIUM';
            case 5:
            case 6:
                return 'STRONG';
            default:
                return '';
        }
    };

    const generatePassword = () => {
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            alert('Please select at least one character type');
            return;
        }

        const newPassword = generate({
            length: length,
            uppercase: includeUppercase,
            lowercase: includeLowercase,
            numbers: includeNumbers,
            symbols: includeSymbols,
            strict: true,
        });
        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopyActive(true);
        toast.success('Password copied to clipboard!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(() => setCopyActive(false), 2000);
    };

    return (
        <>
            <div className="passwordBar">
                <div className="passwordTitle">
                    <h1 className='titlePass'>Password Generator</h1>
                </div>
                <div className="passwordCreator">
                    <div className="passwordInp">
                        <span className='generatedPass'>{password}</span>
                        <span className='copyImg'>
                            <img src={copyActive ? activedCopy : copy} alt="copy image" onClick={handleCopy} />
                        </span>
                    </div>
                    <div className="bottomBar">
                        <div className="passwordCharacterLeng">
                            <div className="character">
                                <span className='lngthText'>Character Length</span>
                                <span className='characterLngth'>{length}</span>
                            </div>
                            <input
                                className='lngthInp'
                                type="range"
                                min="6"
                                max="20"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                            />
                        </div>
                        <div className="passwordRules">
                            <span>
                                <input
                                    type="checkbox"
                                    checked={includeUppercase}
                                    onChange={() => setIncludeUppercase(!includeUppercase)}
                                    className="customCheckbox"
                                />
                                Include Uppercase Letters
                            </span>
                            <span>
                                <input
                                    type="checkbox"
                                    checked={includeLowercase}
                                    onChange={() => setIncludeLowercase(!includeLowercase)}
                                    className="customCheckbox"
                                />
                                Include Lowercase Letters
                            </span>
                            <span>
                                <input
                                    type="checkbox"
                                    checked={includeNumbers}
                                    onChange={() => setIncludeNumbers(!includeNumbers)}
                                    className="customCheckbox"
                                />
                                Include Numbers
                            </span>
                            <span>
                                <input
                                    type="checkbox"
                                    checked={includeSymbols}
                                    onChange={() => setIncludeSymbols(!includeSymbols)}
                                    className="customCheckbox"
                                />
                                Include Symbols
                            </span>
                        </div>
                        <div className="passwordSecurity">
                            <h2 className='strengthText'>STRENGTH</h2>
                            <span>{strength}</span>
                        </div>
                        <button className='generatePasBtn' onClick={generatePassword}>GENERATE →</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Password;
