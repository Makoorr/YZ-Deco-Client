export const formatTNDAmount = (amount: number | null | undefined): string => {
    if (amount == 0) return 'TND 0,000'
    if (amount == null) return 'NaN';
    if (amount == undefined) return 'NaN';
    // if amount is inferior than 1000, return it as 0,xxx ( for example 500 becomes 0,500 )
    if (amount < 1000) {
        return `TND 0,${amount}`
    }
    else {
        // if amount is superior than 1000, return it as xxx,xxx ( for example 1500 becomes 1,500 )
        const amountString = amount.toString()
        const amountLength = amountString.length
        const amountFirstPart = amountString.slice(0, amountLength - 3)
        const amountSecondPart = amountString.slice(amountLength - 3, amountLength)
        return `TND ${amountFirstPart},${amountSecondPart}`
    }
}