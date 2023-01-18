import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { uploadFeed } from '../services/feed';
import { getErrorState } from '../utils/error';

export default function UploadFeed() {
  const [form, setForm] = useState({ title: '', text: '' });
  const [photo, setPhoto] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setPhoto(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { title, text } = form;

    try {
      uploadFeed({ title, text, photo });
      navigate(APP.HOME);
    } catch (error) {
      const state = getErrorState(error);
      navigate(APP.ERROR, { state });
    }
  };

  return (
    <div>
      <Nav />
      <h1>Upload Feed</h1>
      <form
        method="POST"
        encType="multipart/form-data"
        className="uploadForm"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>
        <div>
          <label htmlFor="text">text</label>
          <input
            id="text"
            type="text"
            name="text"
            onChange={handleChange}
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
          {preview && (
            <img style={{ width: '300px' }} src={preview} alt="preview"></img>
          )}
        </div>
        <button type="submit" className="uploadBtn">
          올리기
        </button>
      </form>
    </div>
  );
}
