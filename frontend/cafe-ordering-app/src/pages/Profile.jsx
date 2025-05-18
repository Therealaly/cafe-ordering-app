import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileSettings from "../components/profile/ProfileSettings";

const Profile = () => {
  return (
    <div className="pt-20 left-0 right-0 py-4 bg-green-900 h-screen">
      <ProfileInfo/>
      <ProfileSettings/>
    </div>
  );
}
export default Profile;