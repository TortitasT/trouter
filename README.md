# trouter
Another Deno router.
## Usage

```ts
import { Router } from "https://deno.land/x/trouter@0.1.2/mod.ts";

const router: Router = new Router();

router.get("hello", () => {
  return "Hello World";
});

router.listen(80);
```
