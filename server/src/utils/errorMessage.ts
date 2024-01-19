export default (error: unknown) => {
    return error instanceof Error ? error.message : "Non-error was thrown and caught";
};
