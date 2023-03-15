import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP } from '../constances/routes';
import { uploadFeed } from '../services/feed';
import { TFormValue } from '../types/feed';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useMutation } from 'react-query';
import Loading from '../components/Loading';
import { isAxiosError } from 'axios';
import Layout from '../components/Layout';
import styles from '../styles/uploadFeed.module.scss';

export default function UploadFeed() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const [preview, setPreview] = useState<string>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormValue>();

  const {
    mutate: uploadFeedMutation,
    isLoading,
    isError,
    error,
  } = useMutation(uploadFeed, {
    onSuccess: () => {
      navigate(APP.HOME);
    },
  });

  const handlePhotoFileChange = async (event: any) => {
    const file = event.target.files[0];
    file && setPreview(URL.createObjectURL(file));
  };

  const onValid: SubmitHandler<TFormValue> = ({
    title,
    text,
    photoFile,
  }: TFormValue) => {
    uploadFeedMutation({ title, text, photoFile: photoFile?.[0] });
  };

  useEffect(() => {
    if (!userLoading && !user) {
      alert('로그인 후 이용할 수 있습니다.');
      navigate(APP.LOGIN);
    } else if (user && !user.verifyEmail) {
      alert('이메일 인증 후 이용할 수 있습니다.');
      navigate(APP.HOME);
    }
  }, [user, userLoading, navigate]);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Layout>
        <h2 className={styles.title}>Upload Feed</h2>
        <form
          method="POST"
          encType="multipart/form-data"
          className="uploadForm"
          onSubmit={handleSubmit(onValid)}
        >
          <div className={styles.inputWrapper}>
            <label htmlFor="title" className={styles.label}>
              제목
            </label>
            <input
              id="title"
              type="text"
              className={styles.input}
              {...register('title', {
                required: '제목은 필수입니다.',
                maxLength: {
                  value: 30,
                  message: '30글자 이하로 작성해주세요.',
                },
              })}
            />
          </div>
          {errors?.title && (
            <p className={styles.errorMsg}>{errors.title?.message}</p>
          )}
          <div className={styles.inputWrapper}>
            <label htmlFor="text" className={styles.label}>
              내용
            </label>
            <textarea
              rows={4}
              className={styles.input}
              {...register('text', {
                required: '내용은 필수입니다.',
                minLength: {
                  value: 3,
                  message: '3글자 이상 작성해주세요.',
                },
              })}
            />
          </div>
          {errors?.text && (
            <p className={styles.errorMsg}>{errors.text?.message}</p>
          )}
          <div className={styles.inputWrapper}>
            <label htmlFor="photoFile" className={styles.label}>
              사진
            </label>
            <input
              id="photoFile"
              type="file"
              accept="image/*"
              className={styles.inputNoBorder}
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
          {isError && isAxiosError(error) && (
            <p className={styles.errorMsg}>{error.response?.data.message}</p>
          )}
          <div className={styles.btnWrapper}>
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? '업로드 중' : '올리기'}
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
}
