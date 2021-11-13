import { connect } from "mongoose";

/**
 * @callback
 * @description takes app.listen() as its parameter
 *              so we can turn on the server after the DB has been connected
 */
export default async function connectDb(fn: VoidFunction) {
  try {
    await connect(process.env.MONGODB_URI || "");

    console.log("MongoDb connected.");

    if (typeof fn === "function") return fn();
    else throw new Error("Error: 'connectDb' function requires a callback with the server connection as its parameter");
  } catch (error) {
    console.log("There has been an error: ", error);
    return process.exit(1);
  }
}
