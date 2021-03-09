import React from 'react';
import Image from 'react-bootstrap/Image'

import './index.scss';

export type PopupProps = {
  id: number,
  description: string,
  time: number,
  likes: number,
  image: string,
};

export const Popup = ({
  id,
  description,
  time,
  likes,
  image,
}: PopupProps) => {
  return (
    <div>
      <Image src={image} thumbnail fluid />
      <small>About {time} minutes ago</small> / <small>{likes} Likes</small>
      <p>{description}</p>
    </div>
  );
}

export default Popup;
