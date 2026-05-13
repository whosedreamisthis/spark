import React from 'react';
import {LogIn} from "lucide-react";

const SignInButtonInner = () => {
    return (
        <div className="w-full flex items-center justify-center h-11 bg-rose-600 text-white hover:bg-rose-700 transition-colors text-sm font-semibold rounded-md shadow-sm cursor-pointer"><LogIn className="mr-2 h-4 w-4" /><span>Sign In</span></div>
    );
};

export default SignInButtonInner;