import MainLayout from "@/app/shared/components/MainLayout";
import SportCategoryList from "../components/SportCategoryList";
import SportCategoryManagement from "../components/SportCategoryManagement";

export default function HomePage() {
  return (
    <MainLayout>
      {/* <main className="p-6">
        <SportCategoryList />
      </main> */}
      <SportCategoryManagement />
    </MainLayout>
  );
}
