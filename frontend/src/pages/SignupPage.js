import React from 'react';
import Signup from '../components/auth/signup';

const SignupPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-indigo-600 p-4">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col-reverse md:flex-row max-w-4xl w-full">
                {/* Signup Form */}
                <div className="md:w-1/2 p-8">
                    <Signup />
                </div>
                
                {/* Styled Image */}
                <div className="md:w-1/2 p-8 flex items-center justify-center">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCLVW5aksCgE0jA5sqMcGzPB_Bm5AfIjr-dw&s" 
                        alt="Logo" 
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

