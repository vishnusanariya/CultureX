const {constants}=require('../constants');
const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    console.log('status in error handler',status);
    // console.log(constants);
  switch (status) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNATHORIZED:
      res.json({
        title: "unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
        console.log("error", err);
      break;
  }
};
module.exports = errorHandler;
