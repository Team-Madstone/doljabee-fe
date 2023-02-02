import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { uploadFeed } from '../services/feed';
import { TFormValue } from '../types/feed';
import { getErrorState } from '../utils/error';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function UploadFeed() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormValue>();
  const [preview, setPreview] = useState<string>();
  const navigate = useNavigate();

  const handlePhotoFileChange = async (event: any) => {
    const file = event.target.files[0];
    file && setPreview(URL.createObjectURL(file));
  };

  const onValid: SubmitHandler<TFormValue> = ({
    title,
    text,
    photoFile,
  }: TFormValue) => {
    try {
      uploadFeed({ title, text, photoFile: photoFile?.[0] });
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
        onSubmit={handleSubmit(onValid)}
      >
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            {...register('title', {
              required: '제목은 필수입니다.',
              maxLength: {
                value: 30,
                message: '30글자 이하로 작성해주세요.',
              },
            })}
          />
          {errors?.title && <p className="error">{errors.title?.message}</p>}
        </div>
        <div>
          <label htmlFor="text">내용</label>
          <input
            id="text"
            type="text"
            {...register('text', {
              required: '내용은 필수입니다.',
              minLength: {
                value: 3,
                message: '3글자 이상 작성해주세요.',
              },
            })}
          />
          {errors?.text && <p className="error">{errors.text?.message}</p>}
        </div>
        <div>
          <label htmlFor="photoFile">사진</label>
          <input
            id="photoFile"
            type="file"
            accept="image/*"
            {...register('photoFile', {
              onChange: handlePhotoFileChange,
            })}
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
