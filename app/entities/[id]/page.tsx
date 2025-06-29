// app/entities/[id]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/app/_lib/db";
import EntityDetails from "@/app/_components/EntityDetails";
import { ObjectId } from "mongodb";
import type { entity } from "@/app/_lib/types";

export default async function EntityPage({ params }: { params: { id: string } }) {
  const entityId = params.id;

  const raw = await db.collection("entities").findOne({ _id: new ObjectId(entityId) });

  if (!raw) {
    notFound();
  }

  const entity: entity = {
    ...raw,
    _id: raw._id.toString(),
  } as entity;


  return (
    <div className="flex justify-center p-6">
      <EntityDetails entity={entity} />
    </div>
  );
}
