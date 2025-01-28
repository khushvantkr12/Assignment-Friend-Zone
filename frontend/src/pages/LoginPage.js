// import React from 'react';
// import Login from '../components/auth/login';

// const LoginPage = () => {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <Login />
//         </div>
//     );
// };

// export default LoginPage;


import React from 'react';
import Login from '../components/auth/login';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-600 p-4">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col-reverse md:flex-row max-w-4xl w-full">
                {/* Signup Form */}
                <div className="md:w-1/2 p-8">
                    <Login/>
                </div>
                
                {/* Styled Image */}
                <div className="md:w-1/2 p-8 flex items-center justify-center">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGaLhwgvKWQZBBxNGbAb5rDPLPzdpTuVSfyA&s" 
                        alt="Logo" 
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


