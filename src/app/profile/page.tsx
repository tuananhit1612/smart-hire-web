import { Metadata } from "next";
import { ProfileView } from "@/features/profile/components/profile-view";

export const metadata: Metadata = {
  title: "My Profile | SmartHire",
  description: "Manage your professional identity and portfolio.",
};

export default function ProfilePage() {
  return (
    <main>
      <ProfileView />
    </main>
  );
}
