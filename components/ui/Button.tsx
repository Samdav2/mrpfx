import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'danger' | 'cyan';
    className?: string;
    target?: string;
    rel?: string;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    href,
    onClick,
    variant = 'primary',
    className = '',
    target,
    rel,
    fullWidth = false,
}) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold py-3 px-8 rounded-lg transition-all duration-300";

    const variants = {
        primary: "bg-[#312E81] hover:bg-[#3730a3] text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white hover:bg-gray-50 text-black border border-gray-200 shadow-sm",
        outline: "border-2 border-black/10 hover:border-black/30 text-black bg-transparent",
        'outline-white': "border-2 border-white/20 hover:border-white/40 text-white bg-transparent",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
        cyan: "bg-[#06B6D4] hover:bg-[#0891b2] text-white shadow-lg hover:shadow-xl",
    };

    const widthStyles = fullWidth ? "w-full" : "";
    const combinedClassName = `${baseStyles} ${variants[variant]} ${widthStyles} ${className}`;

    if (href) {
        if (href.startsWith('http') || target === '_blank') {
            return (
                <a href={href} className={combinedClassName} target={target} rel={rel}>
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClassName}>
            {children}
        </button>
    );
};

export default Button;
