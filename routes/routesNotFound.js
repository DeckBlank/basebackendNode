export const routesNotFound = (req, res) => {
  return res.status(404).json({
    message: "route not found",
    status: 404,
  });
};
