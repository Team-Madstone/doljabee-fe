import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeed, updateFeed } from '../services/feed';
import { getErrorState } from '../utils/error';
import { APP } from '../constances/routes';
import Nav from '../components/Nav';

export default function EditFeed() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<string>();
  const [uploadPreview, setUploadPreview] = useState<string>();
  const [photo, setPhoto] = useState<File>();
  const navigate = useNavigate();

  useEffect(() => {
    const syncGetFeed = async (id: number) => {
      try {
        const response = await getFeed({ id });
        const { title, text, photo } = response.data;
        setTitle(title);
        setText(text);
        setPreview(photo);
      } catch (error) {
        const state = getErrorState(error);
        navigate(APP.ERROR, { state });
      }
    };
    syncGetFeed(Number(id));
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handlePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setUploadPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setPhoto(file);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();
    try {
      updateFeed({ id, title, text, photo });
      navigate(APP.HOME);
    } catch (error) {
      const state = getErrorState(error);
      navigate(APP.ERROR, { state });
    }
  };

  return (
    <div>
      <Nav />
      <div>Edit Feed</div>
      <form method="PUT" onSubmit={(event) => handleSubmit(event, Number(id))}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title || ''}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="text">text</label>
          <input
            id="text"
            name="text"
            type="text"
            value={text || ''}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            name="photo"
          />
        </div>
        <div>
          {preview && !uploadPreview && (
            <img
              style={{ width: '300px' }}
              src={`http://localhost:4000/${preview}`}
              alt="img"
            />
          )}
          {uploadPreview && (
            <img style={{ width: '300px' }} src={uploadPreview} alt="img" />
          )}
        </div>
        <button type="submit">저장하기</button>
        <button>취소하기</button>
      </form>
    </div>
  );
}
