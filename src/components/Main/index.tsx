import React, { useCallback, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import { uniqueId } from 'lodash';

import { popupData } from '../../mocks/popups';

import Popup from '../Popup';
import { UploadPopup } from '../UploadPopup';
import SearchBox from '../SearchBox';

import './index.scss';
import Login from '../Login';

export type ItemType = {
  id: number;
  description: string;
  time: number;
  likes: number;
  image: string;
};

const Main = () => {
  const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType[]>(popupData);
  const [defaultItems, setDefaultItems] = useState<ItemType[]>(popupData);
  const [image, setImage] = useState<File>();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [dropZone, setDropZone] = useState<boolean>(false);

  const handleLike = (_: React.MouseEvent<HTMLElement>, id: number) => {
    const itemsforLike = [...items];

    const itemLikedIndex = itemsforLike.findIndex(
      (item: ItemType) => item.id === id
    );
    const itemLikedLikes = itemsforLike[itemLikedIndex].likes || 0;

    itemsforLike[itemLikedIndex].likes = itemLikedLikes + 1;
    setItems(itemsforLike);
  };

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
      time: 0,
      likes: 0
    };
    setItems((items) => [newItem, ...items]);
    setDefaultItems((items) => [newItem, ...items]);
    setShowUploadPopup(false);
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files[0]);
    setShowUploadPopup(true);
  }, []);

  const handleDropOver = useCallback((event) => {
    event.preventDefault();
    setDropZone(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDropZone(false);
  }, []);

  return !isLogged ? (
    <Login handleIsLogged={() => setIsLogged(true)} />
  ) : (
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
              onDrop={handleDrop}
              onDragOver={handleDropOver}
              onDragLeave={handleDragLeave}
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
          {items.map((item: ItemType) => (
            <Col xs={6} sm={4} lg={3} key={item.id}>
              <Popup {...item} handleLike={handleLike} />
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
