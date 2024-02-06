import app from "./app";
import { Config } from "./config";
import connectDB from "./config/db";
import logger from "./config/logger";

const startServer = async () => {
  try {
    await connectDB();
    const PORT = Config.PORT;
    app.listen(PORT, () => {
      logger.info(`listening on port ${PORT}`); // can pass additional parameter as well
      logger.debug("I am deburg");
    });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

void startServer();
