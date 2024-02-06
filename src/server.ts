import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";

const startServer = () => {
  try {
    // throw new Error("Something went wrong")
    const PORT = Config.PORT;
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      logger.info(`listening on port ${PORT}`); // can pass additional parameter as well
      logger.debug("I am deburg");
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    if (err instanceof Error) {
      logger.error(err);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

startServer();
