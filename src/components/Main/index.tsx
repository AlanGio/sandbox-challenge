import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import { uniqueId } from 'lodash';

import { popupData } from '../../mocks/popups';

import Popup, { PopupProps } from '../Popup';
import { UploadPopup } from '../UploadPopup';
import SearchBox from '../SearchBox';

import './index.scss';

const Main = () => {
  const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
  const [items, setItems] = useState<PopupProps[]>(popupData);
  const [defaultItems, setDefaultItems] = useState<PopupProps[]>(popupData);

  const [image, setImage] = useState<File>();
  const [dropZone, setDropZone] = useState<boolean>(false);

  const handleSearch = (search: string) => {
    if (search.length === 0) {
      setItems(defaultItems);
      return false;
    }
    const foundedItems = items.filter((item) =>
      item.description.toLowerCase().includes(search.toLowerCase())
    );
    setItems(foundedItems);
  };

  const handleAddNewItem = (description: string, image: string) => {
    const newItem = {
      id: popupData.length + parseInt(uniqueId()),
      image: image,
      description: description,
      time: Date.now(),
      likes: 0
    };
    setItems((items) => [newItem, ...items]);
    setDefaultItems((items) => [newItem, ...items]);
    setShowUploadPopup(false);
  };

  return (
    <div className="App main">
      <Container>
        <Row>
          <Col>
            <h1>Pixow Gram</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <div
              className={classnames('drag-drop-zone', {
                'inside-drag-area': dropZone
              })}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setImage(e.dataTransfer.files[0]);
                setShowUploadPopup(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDropZone(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDropZone(false);
              }}
            >
              Drag Image here to post it!
            </div>
          </Col>
          <Col>
            <SearchBox handleSearch={handleSearch} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          {items.map((popup: PopupProps) => (
            <Col xs={6} sm={4} lg={3} key={popup.id}>
              <Popup {...popup} />
            </Col>
          ))}
        </Row>
      </Container>

      {showUploadPopup && (
        <UploadPopup
          show={true}
          image={image}
          onHide={() => setShowUploadPopup(false)}
          postItem={handleAddNewItem}
        />
      )}
    </div>
  );
};

export default Main;
