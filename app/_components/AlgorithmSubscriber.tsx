"use client";

import { useEffect, useState } from "react";
import { subscribeToSearch } from "@/_lib/searchQueue";

export default function SearchSubscriber() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToSearch((newQuery) => {
      setQuery(newQuery); // react to query
      console.log("Received query:", newQuery);
    });

    return () => unsubscribe();
  }, []);

  return query ? (
    <div className="mt-8 text-center text-xl text-blue-600">
      🔍 Received search: <strong>{query}</strong>
    </div>
  ) : null;
}
