

const util = {
    reverseString: (str) => {
        return str.split('').reverse().join('');
    },
    formatDate: (str) => {
        const currentDate = new Date(str);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-based
        const year = currentDate.getFullYear();

        // Ensure two digits for day and month
        const formattedDay = (day < 10) ? `0${day}` : day;
        const formattedMonth = (month < 10) ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    }
};

export default util;
