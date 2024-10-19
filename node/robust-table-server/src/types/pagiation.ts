const hasEmptyPagination = (
  query: any
): query is { skip?: number; limit?: number } => {
  const { skip, limit } = query;

  const isValidSkip =
    skip === undefined ||
    (typeof skip === "string" && !isNaN(Number(skip)) && Number(skip) >= 0);
  const isValidLimit =
    limit === undefined ||
    (typeof limit === "string" && !isNaN(Number(limit)) && Number(limit) > 0);

  return isValidSkip && isValidLimit;
};

export { hasEmptyPagination };
