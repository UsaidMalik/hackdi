import queryMapper from "../_lib/queryMapper";
import { Entity } from "../_lib/types";

// Helper to simulate a MongoDB FindCursor using async iterable
function mockCursor(data: Entity[]): AsyncIterable<Entity> {
  return {
    [Symbol.asyncIterator]() {
      let index = 0;
      return {
        async next() {
          if (index < data.length) {
            return { value: data[index++], done: false };
          } else {
            return { done: true, value: undefined };
          }
        },
      };
    },
  };
}

describe("queryMapper", () => {
  const mockData: Entity[] = [
    {
      _id: "1",
      score: 80,
      entity_name: "FashionFi",
      about: "Trendy streetwear for all sizes",
      category: "Clothing",
      tags: ["clothing", "fashion", "trendy"]
    },
    {
      _id: "2",
      score: 70,
      entity_name: "CodeCraft",
      about: "Software tutorials for developers",
      category: "Education",
      tags: ["software", "education"]
    },
    {
      _id: "3",
      score: 90,
      entity_name: "SneakPeek",
      about: "Sneaker drops and hype releases",
      category: "Footwear",
      tags: ["shoes", "footwear", "feet", "clothing"]
    },
  ];

  it("returns matching entities for a keyword", async () => {
    const cursor = mockCursor(mockData);
    const results = await queryMapper("Trendy and cool clothing", cursor);
    console.log("Matched entities:", results);
    expect(results).toEqual([mockData[0], mockData[2]]);
  });

  it("is case-insensitive", async () => {
    const cursor = mockCursor(mockData);
    const results = await queryMapper("SofTwArE", cursor);
    expect(results).toEqual([mockData[1]]);
  });

  it("returns an empty array if no match", async () => {
    const cursor = mockCursor(mockData);
    const results = await queryMapper("cooking", cursor);
    expect(results).toEqual([]);
  });
});
