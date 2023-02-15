export const capitalizeEachWord = (phrase: string) => {
    const phraseSplit = phrase.split(' ');

    const phraseCapitalized = phraseSplit.map((word) => {
        const wordSplit = word.split('');
        
        const capitalized = [wordSplit[0].toUpperCase(), ...wordSplit.slice(1)];

        return capitalized.join('');
    });

    return phraseCapitalized.join(' ');
}