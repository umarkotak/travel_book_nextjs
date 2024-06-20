class Utils {
  GetSelectStyle() {
    return {
      control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? '#6b7280' : '#d1d5db',
      }),
      option: (baseStyles, state) => ({
        ...baseStyles,
        background: state.isFocused ? '#e5e7eb' : '#ffffff',
        color: "#000000"
      }),
    }
  }

  FormatMoney(number) {
    // Ensure number is a valid number
    number = Number(number);

    // Use Intl.NumberFormat for locale-aware formatting
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // No decimal places by default
    });

    return formatter.format(number);
  }

  FormatDateTime(dt) {
    const date = new Date(dt)

    // Extract year, month, day, hours, and minutes
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month as it's zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the string as YYYY/MM/DD HH:MM
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  FormatDate(dt) {
    const date = new Date(dt)

    // Extract year, month, day, hours, and minutes
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month as it's zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Format the string as YYYY/MM/DD HH:MM
    return `${year}/${month}/${day}`;
  }

  CommonOnChange(fn, val, e, field) {
    if (e?.target?.value) {
      fn({...val, [field]: e.target.value})
    } else if (e?.value) {
      fn({...val, [field]: e.value})
    } else {
      fn({...val, [field]: ""})
    }
  }
}

const utils = new Utils()

export default utils
