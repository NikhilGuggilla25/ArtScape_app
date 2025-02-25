import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button  from 'react-bootstrap/Button';

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loginMethod, setLoginMethod] = useState('password'); // 'otp' or 'password'
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signup, setSignup] = useState(false);

    const handleSendOtp = async () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
            setMobileError('Please enter a valid 10-digit mobile number.');
            return;
        }
        setMobileError('');
    
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile_number: mobileNumber }),
            });
    
            const data = await response.json();
    
            if (response.status === 200 && data.message === 'OTP sent successfully!') {
                alert('OTP sent successfully!');
            } else {
                alert(data.message || 'Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP.');
        }
    };

    const handleResendOtp = async () => {
        const retryType = "text"; // Can be 'text', 'voice', or 'default'
        
        try {
            const response = await fetch(`/api/resend-otp?mobile_number=${mobileNumber}&retrytype=${retryType}`);
            const data = await response.json();
    
            if (response.status === 200 && data.message === 'OTP resent successfully!') {
                alert('OTP resent successfully!');
            } else {
                alert(data.message || 'Failed to resend OTP.');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            alert('Error resending OTP.');
        }
    };

    const handleValidateOtp = async () => {
        try {
            const response = await fetch(`/api/verify-otp?otp=${otp}&mobile_number=${mobileNumber}`);
            const data = await response.json();

            if (response.status === 200 && data.message === 'OTP verified successfully!') {
                alert('OTP verified successfully!');
            } else {
                alert(data.message || 'Failed to verify OTP.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Error verifying OTP.');
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (signup) {
            if (!name) {
                alert('Please enter your name.');
                return;
            }
            if (!/^\d{10}$/.test(mobileNumber)) {
                setMobileError('Please enter a valid 10-digit mobile number.');
                return;
            }
            setMobileError('');
            if (!email) {
                alert('Please enter your email.');
                return;
            }
            if (password.length < 6) {
                setPasswordError('Password must be at least 6 characters long.');
                return;
            }
            setPasswordError('');

            try {
                const response = await fetch('/api/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        mobile_number: mobileNumber,
                        password,
                    }),
                });
                if (response.ok) {
                    alert('Signup successful!');
                } else {
                    alert('Signup failed!');
                }
            } catch (error) {
                console.error('Error during signup:', error);
            }
        } else {
            if (!/^\d{10}$/.test(mobileNumber)) {
                setMobileError('Please enter a valid 10-digit mobile number.');
                return;
            }
            setMobileError('');

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mobileNumber,
                        password,
                        otp,
                        loginMethod,
                    }),
                });
                if (response.ok) {
                    alert('Login successful!');
                } else {
                    alert('Login failed!');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        {signup ? (
                            <>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="off"
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="off"
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formMobileNumber">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Row>
                                        <Col xs={8}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your mobile number"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                autoComplete="off"
                                                isInvalid={!!mobileError}
                                                style={{ fontSize: '1.2rem' }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {mobileError}
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col xs={4}>
                                            <Button
                                                variant="secondary"
                                                style={{ fontSize: '1.2rem', width: '100%' }}
                                                onClick={handleSendOtp}
                                            >
                                                Send OTP
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col xs={8}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                style={{ fontSize: '1.2rem' }}
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <Button
                                                variant="secondary"
                                                onClick={handleValidateOtp}
                                                style={{ fontSize: '1.2rem', width: '100%' }}
                                            >
                                                Validate
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Create Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!passwordError}
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {passwordError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" className="ml-2" style={{ fontSize: '1.2rem' }} onClick={() => setSignup(false)}>
                                    Go Back
                                </Button>
                                <Button variant="primary" type="submit" style={{ fontSize: '1.2rem' }}>
                                    Submit
                                </Button>
                                
                            </>
                        ) : <>
                                <Form.Group controlId="formMobileNumber">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Row>
                                        <Col xs={loginMethod === 'otp' ? 8 : 12}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your mobile number"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                autoComplete="off"
                                                isInvalid={!!mobileError}
                                                style={{ fontSize: '1.2rem' }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {mobileError}
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col xs={4}>
                                            {loginMethod === 'otp' && (
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleValidateOtp}
                                                    style={{ fontSize: '1.2rem', width: '100%' }}
                                                >
                                                    Send OTP
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Login with</Form.Label>
                                    <div>
                                        <Form.Check 
                                            type="radio"
                                            id="password"
                                            name="loginMethod"
                                            label="Password"
                                            value="password"
                                            checked={loginMethod === 'password'}
                                            onChange={() => setLoginMethod('password')}
                                            style={{ fontSize: '1.2rem', marginRight: '15px' }}
                                        />
                                        <Form.Check 
                                            type="radio"
                                            id="otp"
                                            name="loginMethod"
                                            label="OTP"
                                            value="otp"
                                            checked={loginMethod === 'otp'}
                                            onChange={() => setLoginMethod('otp')}
                                            style={{ fontSize: '1.2rem' }}
                                        />
                                    </div>
                                </Form.Group>
                                {loginMethod === 'otp' ? (
                                    <Form.Group controlId="formOtp">
                                        <Form.Label>OTP</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            style={{ fontSize: '1.2rem' }}
                                        />
                                    </Form.Group>
                                ) : (
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            isInvalid={!!passwordError}
                                            style={{ fontSize: '1.2rem' }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {passwordError}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}
                                <Button variant="primary" className="ml-2" type="submit" style={{ fontSize: '1.2rem' }}>
                                    Login
                                </Button>
                                <Button variant="primary" className="ml-2" style={{ fontSize: '1.2rem' }} onClick={() => setSignup(true)}>
                                    Sign Up
                                </Button>
                            </>    
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
