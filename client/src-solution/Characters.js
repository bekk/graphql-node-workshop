import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CHARACTERS } from './queries';
import { withRouter, Link } from 'react-router-dom';

const View = ({ characters }) => {
  return (
    <>
      {characters.map(({ name, image }) => (
        <Link key={name} to={`/character/${name}`}>
          <div className="character-list-item" key={name}>
            <img src={image} alt="" />
            <h1>{name}</h1>
          </div>
        </Link>
      ))}
    </>
  );
};

const Characters = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return <h1>Laster...</h1>;
  }

  if (error) {
    return <h1>Error!</h1>;
  }

  return <View characters={data.characters} />;
};

export default withRouter(Characters);
