import React, { useReducer } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Popup from '../Popup';
import DragAndDrop from '../DragAndDrop/index.js';

import './index.scss';

const mockItems = [
  {
    id: 1,
    image: 'https://picsum.photos/id/686/800/600',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 3,
    likes: 1
  },
  {
    image: 'https://picsum.photos/id/760/800/600',
    id: 2,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 1,
    likes: 4
  },
  {
    image: 'https://picsum.photos/id/838/800/600',
    id: 3,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 1,
    likes: 5
  },
  {
    image: 'https://picsum.photos/id/371/800/600',
    id: 4,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 2,
    likes: 2
  },
  {
    image: 'https://picsum.photos/id/800/800/600',
    id: 5,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 2,
    likes: 2
  },
  {
    image: 'https://picsum.photos/id/237/800/600',
    id: 6,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 2,
    likes: 2
  },
  {
    image: 'https://picsum.photos/id/890/800/600',
    id: 7,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 2,
    likes: 2
  },
  {
    image: 'https://picsum.photos/id/123/800/600',
    id: 8,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: 2,
    likes: 2
  }
];

type ReducerType = {
  state: { fileList: File[] };
  action: {
    type: string;
    dropDepth: number;
    inDropZone: boolean;
    files: File[];
  };
};

const Main = () => {

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
            <DragAndDrop data={data} dispatch={dispatch} />
            <ol className="dropped-files">
              {data.fileList.map((f) => {
                return <li key={f.name}>{f.name}</li>;
              })}
            </ol>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          {mockItems.map((popup) => (
            <Col xs={6} sm={4} lg={3} key={popup.id}>
              <Popup {...popup} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Main;
