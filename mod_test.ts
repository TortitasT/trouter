import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

Deno.test("test connection to readme example", async () => {
  const response = await fetch("http://localhost:3000/hello");

  assertEquals(response.status, 200);
  response.text().then((text) => console.log(text));
});
