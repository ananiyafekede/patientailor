import { Helmet } from 'react-helmet-async';
import { Card } from "@/components/ui/card";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile Settings - Hospital Management System</title>
        <meta name="description" content="Update your profile information and manage account settings" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <UpdateProfileForm />
          </Card>
          
          <Card className="p-6">
            <ChangePasswordForm />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;