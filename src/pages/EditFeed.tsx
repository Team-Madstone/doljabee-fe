import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeed, updateFeed } from '../services/feed';
import { APP } from '../constances/routes';
import Nav from '../components/Nav';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TFormValue } from '../types/feed';
import Loading from '../components/Loading';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SERVER_DOMAIN } from '../constances/domain';
import NotFound from './NotFound';
import { isAxiosError } from 'axios';
import { UserContext } from '../context/UserContext';

export default function EditFeed() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const params = useParams();
  const _id = params.id as string;
  const [preview, setPreview] = useState<string>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TFormValue>();

  const {
    isLoading: getFeedIsLoading,
    isError: getFeedIsError,
    error: getFeedError,
  } = useQuery('getFeed', () => getFeed({ _id }), {
    onSuccess: (response) => {
      setValue('title', response.data.title);
      setValue('text', response.data.text);
      response.data.photo &&
        setPreview(`${SERVER_DOMAIN}/${response.data.photo}`);
    },
  });

  const {
    mutate: updateFeedMutation,
    isError: updateFeedIsError,
    error: updateFeedError,
    isLoading: updateFeedIsLoading,
  } = useMutation(updateFeed, {
    onSuccess: () => {
      queryClient.invalidateQueries('getFeed');
      navigate(APP.HOME);
    },
  });

  const handlePhotoFileChange = (event: any) => {
    const file = event.target.files[0];
    file && setPreview(URL.createObjectURL(file));
  };

  const onValid: SubmitHandler<TFormValue> = ({
    title,
    text,
    photoFile,
  }: TFormValue) => {
    updateFeedMutation({ _id, title, text, photoFile: photoFile?.[0] });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!userLoading && !user) {
      alert('로그인 후 이용할 수 있습니다.');
      navigate(APP.LOGIN);
    }
  }, [user, userLoading, navigate]);

  if (getFeedIsLoading || updateFeedIsLoading) {
    return <Loading />;
  }

  if (getFeedIsError && isAxiosError(getFeedError)) {
    return <NotFound />;
  }

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
              <img style={{ width: '300px' }} src={preview} alt="img" />
            )}
          </div>
          {updateFeedIsError && isAxiosError(updateFeedError) && (
            <p>{updateFeedError.response?.data.message}</p>
          )}
          <button type="submit">저장하기</button>
          <button onClick={handleGoBack}>취소하기</button>
        </form>
      </div>
    </div>
  );
}
