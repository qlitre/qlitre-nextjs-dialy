export const joinClasses = (...names: (string | false | null | undefined)[]) =>
    names.filter(Boolean).join(" ");