import { CircleUserRound } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProfileInfo = () => {
  const { user, isUserValid } = useAuth();

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