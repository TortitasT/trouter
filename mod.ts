// deno-lint-ignore-file ban-types
export class Router {
  routes: Route[] = [];

  get(path: string, handler: Function) {
    this.routes.push(new Route("GET", path, handler));
  }

  post(path: string, handler: Function) {
    this.routes.push(new Route("POST", path, handler));
  }

  put(path: string, handler: Function) {
    this.routes.push(new Route("PUT", path, handler));
  }

  delete(path: string, handler: Function) {
    this.routes.push(new Route("DELETE", path, handler));
  }

  patch(path: string, handler: Function) {
    this.routes.push(new Route("PATCH", path, handler));
  }

  options(path: string, handler: Function) {
    this.routes.push(new Route("OPTIONS", path, handler));
  }

  head(path: string, handler: Function) {
    this.routes.push(new Route("HEAD", path, handler));
  }

  connect(path: string, handler: Function) {
    this.routes.push(new Route("CONNECT", path, handler));
  }

  trace(path: string, handler: Function) {
    this.routes.push(new Route("TRACE", path, handler));
  }

  all(path: string, handler: Function) {
    this.routes.push(new Route("ALL", path, handler));
  }

  find(method: string, path: string): Route | undefined {
    const url = new URL(path);

    console.log(url.pathname);

    return this.routes.find((route) => {
      return route.type === method && route.path === url.pathname;
    });
  }

  async handle(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);

    for await (const requestEvent of httpConn) {
      const { request, respondWith } = requestEvent;

      const route = this.find(request.method, request.url);

      if (route) {
        const { handler, contentType, accessControlAllowOrigin } = route;

        const response = new Response(handler(request), {
          status: 200,

          headers: new Headers({
            "content-type": contentType,
            "Access-Control-Allow-Origin": accessControlAllowOrigin,
          }),
        });

        await respondWith(response);
      } else {
        await respondWith(new Response("Not found", { status: 404 }));
      }
    }
  }

  async listen(port: number) {
    const server = Deno.listen({ port });
    console.log(`Server running on port ${port}`);

    for await (const conn of server) {
      await this.handle(conn);
    }

    server.close();
  }

  async listenTls(port: number, options: Deno.ListenTlsOptions) {
    const server = Deno.listenTls(options);
    console.log(`Server running on port ${port}`);

    for await (const conn of server) {
      await this.handle(conn);
    }

    server.close();
  }
}

class Route {
  type: string;
  path: string;
  handler: Function;
  contentType = "text/plain";
  accessControlAllowOrigin = "*";

  constructor(type: string, path: string, handler: Function) {
    this.type = type;
    this.path = path;
    this.handler = handler;
  }
}
