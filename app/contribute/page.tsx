// app/add/page.tsx
import UserAddEntity from "@/app/_components/UserAddEntity";

export default function AddEntityPage() {
  return (
    <main className="p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Contribute an Entity</h1>
        <UserAddEntity />
      </div>
    </main>
  );
}
