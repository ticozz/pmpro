export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function handleAPIError(error: unknown) {
  console.error(error);

  if (error instanceof APIError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        code: error.code,
      }),
      { status: error.statusCode }
    );
  }

  return new Response(
    JSON.stringify({
      error: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR",
    }),
    { status: 500 }
  );
}
