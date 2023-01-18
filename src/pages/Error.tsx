import { useLocation } from 'react-router-dom';
import { AxiosErrorType } from '../constances/axios';
import { TErrorState } from '../types/error';

export default function Error() {
  const location = useLocation();
  const state: TErrorState = location.state;

  return (
    <div>
      <div>Error</div>
      {state.type === AxiosErrorType.NETWORK ? (
        <>
          <p>{state.status}</p>
          <p>{state.message}</p>
        </>
      ) : (
        <>
          <p>클라이언트 에러</p>
          <p>{state.message}</p>
        </>
      )}
    </div>
  );
}
