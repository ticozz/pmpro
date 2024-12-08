import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProperties() {
  const { data, error, isLoading, mutate } = useSWR('/api/properties', fetcher);

  return {
    properties: data,
    isLoading,
    isError: error,
    mutate,
  };
}
