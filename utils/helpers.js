module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  decodeString: (string)=>{
    return decodeURIComponent(string)
  },
  capitalizeFirstLetter: (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
};
