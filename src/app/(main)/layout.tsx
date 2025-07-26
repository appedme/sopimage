import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FloatingCreateButton } from "@/components/FloatingCreateButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingCreateButton />
    </div>
  );
}