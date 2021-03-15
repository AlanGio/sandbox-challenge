import React, { useState } from 'react';
import { Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';

import './index.scss';

const Login = ({ handleIsLogged }: { handleIsLogged: () => void }) => {
  const [validated, setValidated] = useState<boolean | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
    } else {
      setValidated(true);
      handleIsLogged();
    }
  };

  return (
    <div className="login">
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={5}>
            <Jumbotron>
              <h2>Login</h2>
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
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
