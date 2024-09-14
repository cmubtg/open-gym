export const isIn = <T>(values: readonly T[], x: T) => {
    return values.includes(x);
};

export const errorMessage = (error: unknown) => {
    return error instanceof Error ? error.message : "Non-error was thrown and caught";
};