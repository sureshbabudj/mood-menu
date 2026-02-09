import { useState } from "react";
import { useAtomValue } from "jotai";
import { sessionAtom } from "@/lib/store";
import { auth } from "@/lib/firebaseClient";
import { updateProfile, updatePassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LogOut, User, Lock, Mail } from "lucide-react";
import SEO from "@/components/seo";

export default function Account() {
  const session = useAtomValue(sessionAtom);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(session?.user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName });
      toast({ title: "Success", description: "Profile updated successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !newPassword) return;
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      setNewPassword("");
      toast({ title: "Success", description: "Password updated successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 space-y-8">
      <SEO title="Account Settings" noindex={true} />
      <h1 className="text-3xl font-bold font-sourgummy text-primary">Account Settings</h1>
      
      {/* Profile Section */}
      <section className="bg-muted p-6 rounded-lg shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2 text-cyan-900">
          <User className="text-primary" />
          <h2>Profile Information</h2>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <Input id="email" value={session?.user?.email || ""} disabled className="bg-gray-100" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Display Name</Label>
            <Input 
              id="name" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <Button type="submit" disabled={loading}>
            Update Profile
          </Button>
        </form>
      </section>

      {/* Password Section - Only for Email users */}
      {session?.isEmailUser && (
        <section className="bg-muted p-6 rounded-lg shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2 text-cyan-900">
            <Lock className="text-primary" />
            <h2>Security</h2>
          </div>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <Button type="submit" variant="secondary" disabled={loading || !newPassword}>
              Change Password
            </Button>
          </form>
        </section>
      )}

      {/* Logout Section */}
      <section className="pt-4">
        <Button 
          variant="destructive" 
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={() => auth.signOut()}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </section>
    </div>
  );
}
