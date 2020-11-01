import { Application } from "express";

const port: String | undefined = process.env.API_PORT

const server = (app: Application): void => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
}

export { server }