import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeed, updateFeed } from '../services/feed';
import { getErrorState } from '../utils/error';
import { APP } from '../constances/routes';
import Nav from '../components/Nav';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TFormValue } from '../types/feed';

export default function EditFeed() {
  const params = useParams();
  const id = Number(params.id);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TFormValue>();
  const [preview, setPreview] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const syncGetFeed = async (id: number) => {
      try {
        const response = await getFeed({ id });
        const { title, text, photo } = response.data;
        title && setValue('title', title);
        text && setValue('text', text);
        if (photo) {
          setPreview(`http://localhost:4000/${photo}`);
        }
      } catch (error) {
        const state = getErrorState(error);
        navigate(APP.ERROR, { state });
      }
    };
    syncGetFeed(id);
  }, []);

  const handlePhotoFileChange = (event: any) => {
    const file = event.target.files[0];
    file && setPreview(URL.createObjectURL(file));
  };

  const onValid: SubmitHandler<TFormValue> = ({
    title,
    text,
    photoFile,
  }: TFormValue) => {
    try {
      updateFeed({ id, title, text, photoFile: photoFile?.[0] });
      navigate(APP.HOME);
    } catch (error) {
      const state = getErrorState(error);
      navigate(APP.ERROR, { state });
    }
  };

  return (
    <div>
      <Nav />
      <div>
        <div>Edit Feed</div>
        <form
          method="PUT"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onValid)}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register('title', {
                required: '해당 필드는 필수입니다.',
                maxLength: {
                  value: 30,
                  message: '30글자 이하로 작성해주세요.',
                },
              })}
            />
            {errors?.title && <p className="error">{errors.title?.message}</p>}
          </div>
          <div>
            <label htmlFor="text">text</label>
            <input
              id="text"
              type="text"
              {...register('text', {
                required: '해당 필드는 필수입니다.',
                minLength: {
                  value: 3,
                  message: '3글자 이상 작성해주세요.',
                },
              })}
            />
            {errors?.text && <p className="error">{errors.text?.message}</p>}
          </div>
          <div>
            <label htmlFor="photoFile">Photo</label>
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
              <img style={{ width: '300px' }} src={preview} alt="img" />
            )}
          </div>
          <button type="submit">저장하기</button>
          <button>취소하기</button>
        </form>
      </div>
    </div>
  );
}
