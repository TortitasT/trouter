import { Router } from "./mod.ts";

const router: Router = new Router();

router.get("/hello", () => {
  return "Hello World";
});

router.listen(80);
