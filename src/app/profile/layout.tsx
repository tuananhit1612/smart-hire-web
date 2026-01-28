export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
       {/* We can add specific navigations for profile settings here later */}
      {children}
    </div>
  );
}
