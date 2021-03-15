import React, { useState } from 'react';
import { Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './index.scss';

const Register = ({ handleIsRegistered }: { handleIsRegistered: () => void }) => {
  const [validated, setValidated] = useState<boolean | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
    } else {
      setValidated(true);
      handleIsRegistered();
    }
  };

  return (
    <div className="register">
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={5}>
            <Jumbotron>
              <h2>Create Account</h2>
              <hr />
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                  />
                  {validated === false && (
                    <Form.Control.Feedback
                      style={{ display: 'block' }}
                      type="invalid"
                    >
                      Please provide a valid email.
                    </Form.Control.Feedback>
                  )}
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                  />
                  {validated === false && (
                    <Form.Control.Feedback
                      style={{ display: 'block' }}
                      type="invalid"
                    >
                      Please provide a valid password.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicPasswordConfirm">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {validated === false && (
                    <Form.Control.Feedback
                      style={{ display: 'block' }}
                      type="invalid"
                    >
                      Please provide a valid password.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>


                <div className="text-right">
                  <Link to="/">
                    <Button variant="secondary">Back to Login</Button>
                  </Link>
                  &nbsp;
                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                </div>

              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
