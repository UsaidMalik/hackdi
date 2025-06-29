// app/entities/[id]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/app/_lib/db";
import EntityModal from "@/app/_components/EntityModal";
import { ObjectId } from "mongodb";

export default async function EntityPage({ params }: { params: { id: string } }) {
  const entityId = params.id;

    const raw = await db.collection("entities").findOne({ _id: new ObjectId(entityId) });
    console.log(raw)
    const entity = {
      ...raw,
      _id: raw._id.toString(), // 👈 convert ObjectId to string
    };


  return (
    <div className="flex justify-center p-6">
      <EntityModal entity={entity} />
    </div>
  );
}
