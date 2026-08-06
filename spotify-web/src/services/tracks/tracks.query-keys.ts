export const queryKeys = {
    all: () => ['tracks'],
    id: (id: string) => ['tracks', id]
} as const;