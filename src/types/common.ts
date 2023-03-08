export type TCursorPaging<T> = {
  data: {
    items: T[];
    nextCursor: string;
  };
};

export type TCursorPagingVariables = {
  limit?: number;
  cursor?: string;
};
