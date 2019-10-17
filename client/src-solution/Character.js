import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { ADD_CHARACTER_TITLE, GET_CHARACTER, PUSH_CHARACTER } from './queries';

const Push = ({ name }) => {
  const [pushFromWindow] = useMutation(PUSH_CHARACTER);

  return (
    <button
      className="button-bad"
      onClick={() => {
        pushFromWindow({ variables: { name } });
        window.location.reload();
      }}
    >
      Push
    </button>
  );
};

const AddTitle = ({ name }) => {
  const [titleInput, setTitleInput] = useState('');
  const [addTitle] = useMutation(ADD_CHARACTER_TITLE);

  return (
    <div>
      <input
        type="text"
        placeholder="Title..."
        value={titleInput}
        onChange={event => setTitleInput(event.currentTarget.value)}
      />
      <button
        className="button-good"
        onClick={() => {
          addTitle({ variables: { name, title: titleInput } });
          window.location.reload();
        }}
      >
        Add title
      </button>
    </div>
  );
};

const View = ({ character }) => {
  const { name, image, titles = [], isHealthy = true } = character;

  return (
    <section className="character">
      <div className="character-image">
        <img src={image} alt="" className="image-large" />
        {!isHealthy && <div className="hurt">X</div>}
      </div>
      <div className="character-info">
        <h1>{name}</h1>
        {titles.length === 0 && <h2>No titles</h2>}
        {titles.length > 0 && (
          <>
            <h2>Titles</h2>
            <ul>
              {titles.map(title => (
                <li>{title}</li>
              ))}
            </ul>
          </>
        )}
        <div className="character-actions">
          <AddTitle name={name} />
          <Push name={name} />
        </div>
      </div>
    </section>
  );
};

const Character = props => {
  const paramName = props.match.params.name;
  const { loading, error, data } = useQuery(GET_CHARACTER, { variables: { name: paramName } });

  if (loading) {
    return <h1>Laster...</h1>;
  }

  if (error) {
    return <h1>Error!</h1>;
  }

  return <View character={data.character} />;
};

export default withRouter(Character);
