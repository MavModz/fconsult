import axios from "axios";


export const commonRequest = async (method, url, data = {}, params = {}, headers = {}) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL
        const authToken = useCookie('token'); //abcd
        const authHeader = authToken ? { Authorization: `Bearer ${authToken.value}` } : {};
        const mergeHeaders = { ...headers, ...authHeader };
        const response = await axios({
            method: method,
            url,
            data: data,
            params: params,
            headers: mergeHeaders
        });
        return response.data;
    }
    catch (error) {
        console.error("API Error", error);
        throw error;
    }
}

export const fetchCardData = async () => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL
        const response = await commonRequest("GET", `${backend_url}/header/india`);
        return response;
    }
    catch (error) {
        console.error("Error fetching card data", error)
    }
}


export const fetchCategories = async () => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/filter-sidebar-category`);
        return response;
    }
    catch (error) {
        console.error("Error fetching categories", error);
    }
}

export const fetchCompnayData = async (category, lat, long) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/search-offer-deal?category=${category}&lat=${lat}&long=${long}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching company data", error);
    }
}

export const fetchCountryOffered = async () => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/filter-country`);
        return response
    }
    catch (error) {
        console.error("Error Fetching Countries", error)
    }
}

// export const fetchLocation = async (location) => {
//     try {
// const backend_url = useRuntimeConfig().public.API_URL

//         const response = await commonRequest("GET", `${backend_url}/search-location/${location}`);
//         return response
//     }
//     catch (error) {
//         console.error("Error fetching location", error)
//     }
// }

// export const fetchCompanies = async (category, ratings = [], countries = [], lat, long) => {
//     try {
// const backend_url = useRuntimeConfig().public.API_URL

//         let apiUrl = `${backend_url}/search-filter?category=${category}&lat=${lat}&long=${long}`;

//         // Append ratings if provided (multiple ratings comma-separated)
//         if (ratings.length > 0) {
//             apiUrl += `&rating=${ratings.join(',')}`;
//         }

//         // Append countries if provided (multiple countries comma-separated)
//         if (countries.length > 0) {
//             apiUrl += `&country=${countries.join(',')}`;
//         }

//         const response = await commonRequest("GET", apiUrl);
//         return response;
//     } catch (error) {
//         console.error("Error fetching Companies", error);
//     }
// };

export const fetchCompanies = async (category, lat, long) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/search-filter?category=${category}&lat=${lat}&long=${long}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching Companies", error);
    }
}
export const withoutLatLongfetchCompanies = async (category) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/search-filter?category=${category}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching Companies", error);
    }
}


export const fetchEvents = async (category, lat, long) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/search-event?category=${category}&lat=${lat}&long=${long}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching events", error);
    }
}

export const fetchTouristVisa = async (category, lat, long) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/home-review-Listing-viewall/${category}&lat=${lat}&long=${long}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching Tourist Visa", error);
    }
}

export const fetchJobs = async (category, lat, long) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/home-review-Listing-viewall/${category}&lat=${lat}&long=${long}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching Jobs", error);
    }
}

export const fetchIndiaCities = async () => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/India-city-list`);
        return response;
    }
    catch (error) {
        console.error("Error fetching India cities", error);
    }
}

export const coordinateFunction = async (lo, la) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/user-location/${lo}/${la}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching Coordinates", error);
    }
}

export const fetchSelectedCountryList = async () => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/admin-service-provide-countries`);
        return response;
    }
    catch (error) {
        console.error(error)
    }
}

export const whishlistFunction = async (companyId) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/add-user-wishlist/${companyId}`);
        return response;
    }
    catch (error) {
        console.error("Error adding item to whishlist", error);
    }
}

export const uploadUserDoc = async (documentId, payload) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("POST", `${backend_url}/user-upload-documents/${documentId}`, payload);
        return response;
    }
    catch (error) {
        console.error("Error Uploading Document", error);
    }
}

export const revokeDoc = async (documentId) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("PUT", `${backend_url}/user-revoke-permission/${documentId}`);
        return response;
    } catch (error) {
        console.error("Error Revoking access", error);
    }
}

export const deleteDoc = async (documentId) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL
        const response = await commonRequest("DELETE", `${backend_url}/delete-personal-doc/${documentId}`);
        return response;
    } catch (error) {
        console.error("Error while deleting Document", error);
    }
}

export const viewAgreement = async () => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("GET", `${backend_url}/user-agreements-list`);
        return response;
    } catch (error) {
        console.error('Error while fetching Agreements', error);
    }
}

export const acceptAgreement = async (agreementId, formData) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("PUT", `${backend_url}/accept-agreement/${agreementId}`, {
            name: formData.name,
            location: formData.location,
            user_signature:formData.user_signature
        });
        return response;
    } catch (error) {
        console.error("Error accepting agreement:", error);
    }
};

export const requestDoc = async (formData) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("POST", `${backend_url}/request-documents`, formData);
        return response;
    } catch (error) {
    }
}

// export const userDocList = async (paginationParams) => {
//     try {
//         const backend_url = useRuntimeConfig().public.API_URL

//         const response = await commonRequest("GET", `${backend_url}/my-user-documents?page=${paginationParams.page}&limit=${paginationParams.limit}`, {
//             params: {
//                 page: paginationParams.page,
//                 limit: paginationParams.limit,
//             },
//         });
//         return response;
//     } catch (error) {
//         console.error("Error fetching Documents", error);
//     }
// };

export const userDocList = async (email, type) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/my-documents/${email}/${type}`);
        return response;
    } catch (error) {
        console.error("Error fetching Documents", error);
    }
};

export const companyList = async (documentTitle) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/access-company-list/${documentTitle}`);
        return response;
    }
    catch (error) {
        console.error("Error fetching Companies", error);
    }
};

export const companyAccess = async (companyId, documentTitle, documentLink) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("PUT", `${backend_url}/document-give-access/${companyId}/${documentTitle}`, { link: documentLink });
        return response;
    } catch (error) {
        console.error("Error giving Access", error);
    }
};

export const revokeCompanyAccess = async (companyId, documentTitle) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("PUT", `${backend_url}/document-revoke-access/${companyId}/${documentTitle}`, {
            link: null,
            status: false,
        });
        return response;
    } catch (error) {
        console.error("Error revoking access:", error);
    }
};


export const userAppointement = async (paginationParams) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL

        const response = await commonRequest("GET", `${backend_url}/all-user-appointment?page=${paginationParams.page}&limit=${paginationParams.limit}`, {
            params: {
                page: paginationParams.page,
                limit: paginationParams.limit,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching Appointments", error);
    }
};

export const fetchDigiData = async (code) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("GET", `${backend_url}/OAuth?code=${code}`);
        return response;
    } catch (error) {
        console.error("Error while Fetching Data from Digilocker", error);
    }
}

export const submitAadhar = async (aadhar) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("GET", `${backend_url}/user-verify-aadhar-otp/${aadhar}`);
        return response;
    } catch (error) {
        console.error("Error while submitting Aadhar", error);
    }
}

export const adminusersubmitAadhar = async(id,aadhar) => {
    try {
        const backend_url = useRuntimeConfig().public.API_URL;
        const response = await commonRequest("GET", `${backend_url}/admin-user-verify-aadhar-otp/${id}/${aadhar}`);
        return response;
    } catch(error) {
        console.error("Error while submitting Aadhar", error);
    }
}
