import { notFound } from "next/navigation";
import { db } from "@/app/_lib/db";
import EntityDetails from "@/app/_components/EntityDetails";
import { ObjectId } from "mongodb";
import type { entity } from "@/app/_lib/types";

export default async function EntityPage({ params }: { params: { id: string } }) {
  // Ensure id is a trimmed string
  const rawId = (params?.id || "").toString().trim();

  // Optional: check if it's a valid ObjectId first
  if (!ObjectId.isValid(rawId)) {
    console.warn("Invalid ObjectId format:", rawId);
    notFound();
  }

  const objId = new ObjectId(rawId);
  console.log("Querying for _id:", objId);

  const raw = await db.collection("entities").findOne({ _id: objId });
  console.log("DB result:", raw);

  if (!raw) {
    notFound();
  }

  const entity: entity = {
    ...raw,
    _id: raw._id.toString(),
  };

  return (
    <div className="flex justify-center p-6">
      <EntityDetails entity={entity} />
    </div>
  );
}
