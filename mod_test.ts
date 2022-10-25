import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

Deno.test("test connection to readme example", async () => {
  const server = Deno.run({
    cmd: ["deno", "run", "--allow-net", "example.ts"],
  });

  const response = await fetch("http://localhost:80/hello");

  assertEquals(response.status, 200);
  response.text().then((text) => console.log(text));

  server.close();
});
