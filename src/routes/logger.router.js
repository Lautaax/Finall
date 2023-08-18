import {Router} from "express"

const router = Router()
router.get("/loggerTest", (req, res) => {
    req.logger.debug("Request in test endpoint at debug level!");
    req.logger.http("Request in test endpoint at http level!");
    req.logger.info("Request in test endpoint at info level!");
    req.logger.warning("Request in test endpoint at warning level!");
    req.logger.error("Request in test endpoint at error level!");
    req.logger.fatal("Request in test endpoint at fatal level!");
    res.send({ message: "Logger test sent to console" });
  });
export default router;