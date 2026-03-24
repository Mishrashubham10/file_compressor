import { FileList } from "@/components/FileList";
import DashboardLayout from "@/components/layouts/DashboardLayouts";
import { Upload } from "@/components/Upload";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* =========== UPLOAD CARD ============= */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="font-semibold mb-4">Upload File</h2>
          <Upload />
        </div>

        {/* ============= FILE SECTION ============ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="font-semibold mb-4">Your Files</h2>
          <FileList />
        </div>
      </div>
    </DashboardLayout>
  );
}