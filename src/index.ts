import queryString from "query-string";

type SubstituteValue = string | number | undefined | null;

/**
 * Takes a route template and formats it using the passed substitute values.
 * @param base - the base part of the URL that should be left alone.
 * @param routeTemplate - the route part of the URL that should be formatted.
 * @param substitutes - a record with values to substitute into the route template.
 */
export const formatUrl = (
  base: string,
  routeTemplate: string,
  substitutes: Record<string, SubstituteValue>
): string => {
  let queryParams: Record<string, SubstituteValue> = {};

  // Substitute route params.
  const formattedRoute = Object.entries(substitutes).reduce(
    (str, [key, value]) => {
      if (value === undefined || value === null) {
        return str;
      }

      if (str.includes(`:${key}`)) {
        const valueStr = String(value);
        return str.split(`:${key}`).join(valueStr);
      } else {
        queryParams[key] = value;
      }

      return str;
    },
    routeTemplate
  );

  // Make sure no route params remain.
  if (formattedRoute.includes(":")) {
    const missingParam = formattedRoute.match(/:[a-zA-Z]+/);
    throw new Error(
      `Missing substitute for route parameter: '${missingParam}' in '${formattedRoute}'`
    );
  }

  // Add query params.
  const formattedQueryString = queryString.stringify(queryParams);

  const safeBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const safeRoute = formattedRoute.startsWith("/")
    ? formattedRoute.slice(1)
    : formattedRoute;

  const safeQueryString =
    formattedQueryString.length === 0 ? "" : `?${formattedQueryString}`;

  return `${safeBase}/${safeRoute}${safeQueryString}`;
};
