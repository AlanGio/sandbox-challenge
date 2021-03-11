import React, { useReducer, useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Popup, { PopupProps } from '../Popup';
import DragAndDrop from '../DragAndDrop/index.js';
import { uniqueId } from 'lodash';

import { popupData } from '../../mocks/popups';

import './index.scss';
import { UploadPopup } from '../UploadPopup';

type ReducerType = {
  state: {
    dropDepth: number;
    inDropZone: boolean;
    fileList: File[]
  };
  action: {
    type: string;
    dropDepth: number;
    inDropZone: boolean;
    files: File[];
  };
};

const Main = () => {
  const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
  const [items, setItems] = useState<PopupProps[]>(popupData);

  const reducer = (
    state: ReducerType['state'],
    action: ReducerType['action']
  ) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        setShowUploadPopup(true);
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: []
  });

  const handleAddNewItem = (description:string, image: string) => {
    const newItem = {
      id: parseInt(uniqueId()),
      image: image,
      description: description,
      time: Date.now(),
      likes: 0,
    };

    setItems(items => [newItem, ...items]);
    setShowUploadPopup(false);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Pixow Gram</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <DragAndDrop
              copy="+ Drag image here to post it"
              data={data}
              dispatch={dispatch}
            />
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
          image={data.fileList[data.fileList.length - 1]}
          onHide={() => setShowUploadPopup(false)}
          postItem={handleAddNewItem}
        />
       )}
    </div>
  );
};

export default Main;
