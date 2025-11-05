// import axios from 'axios'

// const api = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL,
//     headers:{
//         'Content-Type':'application/json'
//     }
// })

// const getToken = () => localStorage.getItem("token")

// api.interceptors.request.use(
//     (config)=>{
//         const token = getToken()

//         if(token){
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config
//     },
//     (error)=>Promise.reject(error)
// )

// api.interceptors.response.use(
//     (response)=> response,
//     (error)=>{
//         if(error.respionse?.status === 401){
//             console.error("Unauthorized! Redirecting to login...")
//             localStorage.removeItem('token')
//             localStorage.removeItem('isAuthenticated');
//             localStorage.removeItem('user');
//             window.location.href='/#/signin';
//         }
//         return Promise.reject(error.response?.data || error.message);
//     }
// )

// const authApi = {
//     login : (credential) => api.post(`/login`,credential),
//     logout:()=>api.post('/logout')
// }

// const boardApi = {
//     getBoardById:(id)=>api.get(`/get-board-by-id/${id}`),
//     createBoard:(data)=>api.post(`/add-board`,data),
//     updateBoardById:(id)=>api.put(`/update-board/${id}`)
// }

// const roomApi = {
//     getRooms: () => api.get('/get-rooms'),
//     getRoomById: (id) => api.get(`/get-room-by-id/${id}`),
//     createRoom: (data) => api.post('/devices/create-room', data),
//     updateRoom: (id, data) => api.put(`/update-room/${id}`, data),
//     deleteRoom: (id) => api.delete(`/delete-room/${id}`)
// }
// export {authApi,boardApi, roomApi}


import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers:{
        'Content-Type':'application/json'
    }
})

const getToken = () => localStorage.getItem("token")

api.interceptors.request.use(
    (config)=>{
        const token = getToken()

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error)=>Promise.reject(error)
)

api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response?.status === 401){
            console.error("Unauthorized! Redirecting to login...")
            localStorage.removeItem('token')
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            window.location.href='/#/signin';
        }
        return Promise.reject(error.response?.data || error.message);
    }
)

const authApi = {
    login : (credential) => api.post(`/login`,credential),
    logout:()=>api.post('/logout')
}

const boardApi = {
    getBoards: () => api.get(`/get-board`),
    getBoardById:(id)=>api.get(`/get-board-by-id/${id}`),
    createBoard:(data)=>api.post(`/add-board`, {
        board_name: data.name,
        num_switches: data.switches,
        num_fans: data.fans
    }),
    updateBoardById:(id, data)=>api.put(`/update-board/${id}`, {
        board_name: data.name,
        num_switches: data.switches,
        num_fans: data.fans
    }),
    deleteBoard: (id) => api.delete(`/delete-board/${id}`)
}

const roomApi = {
    getRooms: () => api.get('/get-rooms'),
    getRoomById: (id) => api.get(`/get-room-by-id/${id}`),
    createRoom: (data) => api.post('/create-room', data),
    updateRoom: (id, data) => api.put(`/update-room/${id}`, data),
    deleteRoom: (id) => api.delete(`/delete-room/${id}`),
    updateDeviceState: (roomId, data) => api.put(`/update-device-state/${roomId}`, data)
}

const switchApi = {
    // addSwitch: (roomId, data) => api.post(`/add-switches/${roomId}`, data),
    // updateSwitchState: (roomId, switchId, data) => api.put(`/update-switch-state/${roomId}/${switchId}`, data),
    // deleteSwitch: (roomId, switchId) => api.delete(`/delete-switch/${roomId}/${switchId}`)
}

export {authApi, boardApi, roomApi, switchApi}


// import axios from 'axios'

// const api = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL,
//     headers:{
//         'Content-Type':'application/json'
//     }
// })

// const getToken = () => localStorage.getItem("token")

// api.interceptors.request.use(
//     (config)=>{
//         const token = getToken()

//         if(token){
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config
//     },
//     (error)=>Promise.reject(error)
// )

// api.interceptors.response.use(
//     (response)=> response,
//     (error)=>{
//         if(error.response?.status === 401){
//             console.error("Unauthorized! Redirecting to login...")
//             localStorage.removeItem('token')
//             localStorage.removeItem('isAuthenticated');
//             localStorage.removeItem('user');
//             window.location.href='/#/signin';
//         }
//         return Promise.reject(error.response?.data || error.message);
//     }
// )

// const authApi = {
//     login : (credential) => api.post(`/login`,credential),
//     logout:()=>api.post('/logout')
// }

// const boardApi = {
//     // Note: You'll need to create this endpoint on your backend
//     // For now, this might return an error until the backend supports it
//     getBoards: () => api.get(`/get-board`),
    
//     getBoardById:(id)=>api.get(`/get-board-by-id/${id}`),
    
//     createBoard:(data)=>api.post(`/add-board`, {
//         board_name: data.name,
//         num_switches: data.switches,
//         num_fans: data.fans
//     }),
    
//     updateBoardById:(id, data)=>api.put(`/update-board/${id}`, {
//         board_name: data.name,
//         num_switches: data.switches,
//         num_fans: data.fans
//     }),
    
//     // Note: You'll need to create this endpoint on your backend
//     deleteBoard: (id) => api.delete(`/delete-board/${id}`)
// }

// const roomApi = {
//     getRooms: () => api.get('/get-rooms'),
//     getRoomById: (id) => api.get(`/get-room-by-id/${id}`),
//     createRoom: (data) => api.post('/devices/create-room', data),
//     updateRoom: (id, data) => api.put(`/update-room/${id}`, data),
//     deleteRoom: (id) => api.delete(`/delete-room/${id}`)
// }

// export {authApi, boardApi, roomApi}