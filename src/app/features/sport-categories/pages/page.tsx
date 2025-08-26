import MainLayout from "@/app/shared/components/MainLayout";
import SportCategoryList from "../components/SportCategoryList";

export default function HomePage() {
  return (
    <MainLayout>
      <main className="p-6">
        <SportCategoryList />
      </main>
    </MainLayout>
  );
}
