import { ReactNode } from "react";

/**
 * str - Tsani Mazalov, highlighted - Maz
 * startIndex - 6 (M)
 * startString - 'Tsani '
 * endString - 'alov'
 * highlighted - Maz
 */
const getHighlighted = (str: string, highlighted: string): ReactNode[] => {
    // Find the index of the highlighted substring
    const startIndex = str.indexOf(highlighted);

    // If the highlighted substring is not found, return the original string
    if (startIndex === -1) {
        return [str];
    }

    // Extract the start, highlighted, and end parts of the string
    const startString = str.substring(0, startIndex);
    const endString = str.substring(startIndex + highlighted.length);

    // Return the parts wrapped in React elements
    return [
        startString,
        <mark key="highlighted">{highlighted}</mark>,
        endString
    ];
};


export {
    getHighlighted
}