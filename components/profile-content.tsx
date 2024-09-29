import { UserProfile } from "@clerk/nextjs";

export function ProfileContent() {
  return (
    <div className="mt-4">
      <UserProfile />
    </div>
  );
}
