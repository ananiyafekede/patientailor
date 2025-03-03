
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateProfileForm } from "@/components/profile/UpdateProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateMe, useChangePassword } from "@/hooks/auth";

const Profile = () => {
  const { user } = useAuth();
  const { 
    isPending: isUpdating, 
    updateUser: updateMe
  } = useUpdateMe();

  const { 
    isPending: isChangingPassword, 
    changePasswordMutation: changePassword
  } = useChangePassword();

  return (
    <>
      <Helmet>
        <title>Profile Settings - Hospital Management System</title>
      </Helmet>

      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateProfileForm 
                  user={user} 
                  onSubmit={updateMe} 
                  isLoading={isUpdating} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to maintain security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChangePasswordForm 
                  onSubmit={changePassword} 
                  isLoading={isChangingPassword} 
                />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                After changing your password, you'll be logged out and need to sign in again.
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
