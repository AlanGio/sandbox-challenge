import React, { useCallback, useState } from 'react';
import {
  Button,
  Container,
  Col,
  Form,
  Image,
  Row,
  Modal
} from 'react-bootstrap';

import './index.scss';

export type PopupProps = {
  image?: File;
  onHide: () => void;
  show: boolean;
  postItem: (description: string, image: string) => void;
};

export const UploadPopup = ({ image, onHide, show, postItem }: PopupProps) => {
  const [description, setDescription] = useState<string>('');
  const imageToDisplay = URL.createObjectURL(image);

  const handleSendForm = useCallback(() => {
    postItem(description, imageToDisplay);
  }, [description, imageToDisplay, postItem]);

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => onHide()}>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Popup
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Image src={imageToDisplay} thumbnail fluid />
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Enter post here!</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button onClick={handleSendForm}>Post</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadPopup;
