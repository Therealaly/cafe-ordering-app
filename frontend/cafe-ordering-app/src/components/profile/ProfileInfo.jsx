import { CircleUserRound } from 'lucide-react';

const ProfileInfo = () => {
  return (
    <div className="w-full flex justify-center z-10">
      <div className="flex pb-8 pt-10">
        <div className="flex flex-col items-center gap-2">
          <CircleUserRound size={50}/>
          <span className='font-bold'>Lorem Ipsum</span>
          <span>loremIpsum@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo