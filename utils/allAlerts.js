
export function errorAlert(i, title = "Error") {
    useNuxtApp().$toast.add({ severity: 'error', summary: title, detail: i, life: 3000 });
}

export async function successAlert(i, title = "Success") {
    useNuxtApp().$toast.add({ severity: 'success', summary: title, detail: i, life: 3000 });
}

export async function warningAlert(i, title = "Warning") {
    useNuxtApp().$toast.add({ severity: 'warn', summary: title, detail: i, life: 3000 });
}

export function deleteConfirm(message, title = "Confirm Delete") {
    return new Promise((resolve, reject) => {
        useNuxtApp().$confirm.require({
            message: message,
            header: title,
            icon: 'pi pi-info-circle',
             class: "custom-confirm-dialog",
            rejectLabel: 'Cancel',
            acceptLabel: 'Delete',
            rejectClass: 'p-button-secondary p-button-outlined delete-cancel',
            acceptClass: 'p-button-danger delete-delete',
            accept: () => resolve(true),
            reject: () => resolve(false),
        });
    });
}

export function askConfirm(message, title = "Confirmation", btn = "Yes", cn = 'Cancel') {
    return new Promise((resolve, reject) => {
        useNuxtApp().$confirm.require({
            message: message,
            header: title,
            icon: 'pi pi-info-circle',
            rejectLabel: cn,
            acceptLabel: btn,
            rejectClass: 'p-button-secondary p-button-outlined delete-cancel',
            acceptClass: 'p-button-danger delete-delete',
            accept: () => resolve(true),
            reject: () => resolve(false),
              onHide: () => resolve(false)
        });
    });
}

export function serverErrorMessage(callme, message = "Unexpected error! Our team has been notified and is working to fix it", title = "Internal Server Error", rej='Retry') {
    return new Promise((resolve, reject) => {
        useNuxtApp().$confirm.require({
            message: message,
            header: title,
            icon: 'pi pi-info-circle',
            rejectLabel: rej,
            acceptLabel: 'Close',
            rejectClass: 'p-button-secondary p-button-outlined delete-cancel',
            acceptClass: 'p-button-danger delete-delete',
            accept: () => resolve(true),
            reject: () => {
                if (typeof callme === 'function') {
                    callme()
                } else {
                }

            }
        });
    });
}


// export async function successAlert(i) {
//     const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//         }
//     });
//     Toast.fire({
//         icon: "success",
//         title: i
//     });
// }


export function restrictToNumbers(event) {
    // Check if the pressed key is not a number (keys: 48-57 are numbers in ASCII)
    const charCode = event.charCode || event.keyCode;

    // Allow numeric characters only (ASCII values for 0-9 are 48-57)
    if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Prevent any non-numeric key from being typed
    }
}
// time formate will 03:00 PM

export function formateTime12Hours(time12Hr) {
    if (!time12Hr) return '';
    if (time12Hr.length <= 5 && !time12Hr.includes('T')) {
        time12Hr = '1970-01-01T' + time12Hr;  // Prepend a default date
      }
    const time = new Date(time12Hr);
    if (isNaN(time.getTime())) {
        return ''; // Return an empty string if the time is invalid
    }
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

}

// date formate will 03-01-2025
export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Return formatted date in DD-MM-YYYY
}

// date and time formate will 03-01-2025, 03:00 PM
export function formateDateAndTime(timing){
    const date=formatDate(timing)
    const time=formateTime12Hours(timing)
    return `${date}, ${time}`;
  }

  export function getSlicedContent(content, maxLength) {
    const plainText = stripHtmlTags(content);
    return plainText.length > maxLength ? plainText.slice(0, maxLength) + "..." : plainText;
  }

  
  export function stripHtmlTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  }

//   date formate will be January 1, 2025
  export function formatDateinString(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

