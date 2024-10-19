// WARNING: THIS HAS TO BE IN THE SERVER
const filterByText = <T extends Record<string, any>>(data: T[], text: string): T[] => {
    const lowerCasedText = text.toLowerCase();

    return data.filter(item => {
        for (const value of Object.values(item)) {
            if (typeof value === 'string' && value.toLowerCase().includes(lowerCasedText)) {
                return true;
            }
        }
        return false;
    });
};

export { filterByText };
