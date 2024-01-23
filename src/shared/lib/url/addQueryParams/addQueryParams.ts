export function getQueryParams(param: OptionalRecord<string, string>) {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(param).forEach(([name, value]) => {
    if (value) searchParams.set(name, value);
  });

  return `?${searchParams.toString()}`;
}

/**
 * Функция для добавления параметров строки запроса в url
 * @param param
 */

export function addQueryParams(param: OptionalRecord<string, string>) {
  window.history.pushState(null, "", getQueryParams(param));
}
