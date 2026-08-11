export const queryKeys = {
    all: () => ['tracks'],
    id: (id: string) => ['tracks', id],
    mostPlayed: (pageNo: string) => ['tracks', pageNo],
    genre: (genre: string, pageNo: string) => ['tracks', genre, pageNo]
} as const;