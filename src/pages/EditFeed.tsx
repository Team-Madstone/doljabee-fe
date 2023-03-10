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
  } = useQuery(['getFeed', _id], () => getFeed({ _id }), {
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
    onSuccess: (response) => {
      queryClient.invalidateQueries('getFeed');
      navigate(`/feed/${response.data._id}`);
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
      alert('????????? ??? ????????? ??? ????????????.');
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
            <label htmlFor="title">??????</label>
            <input
              id="title"
              type="text"
              {...register('title', {
                required: '????????? ???????????????.',
                maxLength: {
                  value: 30,
                  message: '30?????? ????????? ??????????????????.',
                },
              })}
            />
            {errors?.title && <p className="error">{errors.title?.message}</p>}
          </div>
          <div>
            <label htmlFor="text">??????</label>
            <input
              id="text"
              type="text"
              {...register('text', {
                required: '????????? ???????????????.',
                minLength: {
                  value: 3,
                  message: '3?????? ?????? ??????????????????.',
                },
              })}
            />
            {errors?.text && <p className="error">{errors.text?.message}</p>}
          </div>
          <div>
            <label htmlFor="photoFile">??????</label>
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
          <button type="submit">????????????</button>
          <button onClick={handleGoBack}>????????????</button>
        </form>
      </div>
    </div>
  );
}
