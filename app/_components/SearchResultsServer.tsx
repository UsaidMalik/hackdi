// app/components/SearchResultsServer.tsx
import { Suspense } from "react";
import SearchResultsClient from "./SearchResultsClient";
import {db} from "@/app/_lib/db";
import queryMapper from "@/app/_lib/queryMapper";
import type { Entity } from "@/app/_lib/types";

export default async function SearchResultsServer({ query }: { query: string }) {
  try {

    const cursor = db.collection<Entity>("entities").find({});
    const matches = await queryMapper(query, cursor);
    const plainResults = matches.map((entity) => ({
      ...entity,
      _id: entity._id.toString(),
    }));
    return (
      <Suspense fallback={<div>Loading results…</div>}>
        <SearchResultsClient results={plainResults} />
      </Suspense>
    );
  } catch (error) {
    console.error("Server fetch error:", error);
    return <div>Failed to fetch results.</div>;
  }
}
