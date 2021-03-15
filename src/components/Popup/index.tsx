import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { ItemType } from '../Main';

import './index.scss';

type PopupProps = ItemType & {
  handleLike: (event: React.MouseEvent<HTMLElement>, id: number) => void;
};

export const Popup = ({
  id,
  description,
  time,
  likes,
  image,
  handleLike
}: PopupProps) => (
  <div className="popup">
    <Image src={image} thumbnail fluid />
    <small>
      {time > 0
        ? `Posted about ${time} minutes ago`
        : `Posted a few seconds ago`}
    </small>{' '}
    / <small>{likes} Likes</small>
    <p>{description}</p>
    <Button
      className="like-button"
      variant="primary"
      onClick={(event) => handleLike(event, id)}
    >
      Like
    </Button>
  </div>
);

export default Popup;
