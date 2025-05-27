import { CircleUserRound } from 'lucide-react';
import { getUser } from '../../utils/auth';

const ProfileInfo = () => {
  const user = getUser();

  const isUserValid = user && Object.keys(user).length > 0 && user.name && user.email;

  if (!isUserValid) {
    return (
      <div className="w-full flex justify-center z-10">
      <div className="flex pb-8 pt-10">
        <div className="flex flex-col items-center gap-2">
          <CircleUserRound size={50}/>
          <span className='font-bold'>Guest</span>
          <span>Login untuk melihat profil</span>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="w-full flex justify-center z-10">
      <div className="flex pb-8 pt-10">
        <div className="flex flex-col items-center gap-2">
          <CircleUserRound size={50}/>
          <span className='font-bold'>{user.name}</span>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;