const showError = (res, e) => {
  res.statusCode = 500;
  const responseError = {
    error: "Internal Server Error",
    mesagge: e.message,
    code: e.code,
  };
  res.end(JSON.stringify(responseError));
};

module.exports = { showError };
