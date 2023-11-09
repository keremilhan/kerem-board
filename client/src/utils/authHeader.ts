import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';

const AuthHeader = () => {
    const { accessToken } = useAppSelector(selectAuth);
    return {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    };
};

export default AuthHeader;
