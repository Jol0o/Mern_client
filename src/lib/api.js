import axios from "axios"

const URL = 'http://localhost:5000'

export const getAllReviews = async (page) => {
    const response = await axios.get(`${URL}/api/reviews/`, {
        params: { page }
    });
    if (response.status === 201) {
        return response
    } else {
        return response
    }
}

export const getUserData = async (token) => {
    try {
        const response = await axios.get(`${URL}/api/reviews/user`, {
            headers: {
                'x-auth-token': token
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return response.data.msg;
        }
    } catch (error) {
        throw error;
    }
};

export const getAllUserReviewsById = async (id, token) => {
    try {
        const response = await axios.get(`${URL}/api/reviews/user/${id}`, {
            headers: {
                'x-auth-token': token
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return response.data.msg;
        }
    } catch (error) {
        throw error;
    }
}

export const createReview = async (data, token) => {

    const response = await axios.post(
        `${URL}/api/reviews/`,
        {
            title: data.title,
            author: data.author,
            reviewText: data.reviewText,
            rating: data.rating
        },
        {
            headers: {
                'x-auth-token': token
            }
        }
    );
    if (response.status === 201) {
        return response
    } else {
        return response
    }
}

export const updateReview = async (id, data, token) => {
    const response = await axios.put(`${URL}/api/reviews/${id}`,
        { title: data.title, author: data.author, reviewText: data.reviewText, rating: data.rating },
        {
            headers: {
                'x-auth-token': token
            }
        }
    )
    console.log(response)
    if (response.status === 200) {
        return response
    } else {
        return response.data.msg
    }
}

export const removeReview = async (id, token) => {
    console.log(token); // Debugging line
    const response = await axios.delete(`${URL}/api/reviews/${id}`,
        {
            headers: {
                'x-auth-token': token
            }
        }
    )
    if (response.status === 200) {
        return response
    } else {
        return response
    }
}

//user authentication
export const createAccount = async (data) => {
    const response = await axios.post(`${URL}/api/auth/register`, { username: data.username, email: data.email, password: data.password })

    return response
}

export const loginUser = async (data) => {
    const response = await axios.post(`${URL}/api/auth/login`, { email: data.email, password: data.password })
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response
}

export const updateUser = async (data, token) => {
    const response = await axios.put(`${URL}/api/auth/updateUser`, data,
        {
            headers: {
                'x-auth-token': token
            }
        }
    )
    if (response.status === 201) {
        return response
    } else {
        return response
    }
}